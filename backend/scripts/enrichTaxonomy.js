import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
import { parseStringPromise } from "xml2js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const connectionString = process.env.SUPABASE_URI || process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Helper to pause execution between requests
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper for fetch with exponential backoff retry on HTTP 429 rate limits
async function fetchWithRetry(url, options = {}, retries = 3, backoffMs = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.status === 429) {
        const waitTime = backoffMs * Math.pow(2, i);
        console.warn(`WARNING: NCBI rate limit hit (429). Retrying in ${waitTime}ms (Attempt ${i + 1}/${retries})...`);
        await delay(waitTime);
        continue;
      }
      return response;
    } catch (err) {
      if (i === retries - 1) throw err;
      const waitTime = backoffMs * Math.pow(2, i);
      console.warn(`WARNING: Fetch network error: ${err.message}. Retrying in ${waitTime}ms (Attempt ${i + 1}/${retries})...`);
      await delay(waitTime);
    }
  }
  throw new Error(`Failed to fetch after ${retries} retries`);
}

// Shared logic to fetch NCBI lineage and save it to the database
async function fetchAndSaveLineage(taxId, ncbiTaxId, taxonName) {
  const apiKeyParam = process.env.NCBI_API_KEY ? `&api_key=${process.env.NCBI_API_KEY}` : "";
  const fetchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=taxonomy&id=${ncbiTaxId}${apiKeyParam}`;
  
  const fetchRes = await fetchWithRetry(fetchUrl);
  if (!fetchRes.ok) {
    throw new Error(`NCBI efetch failed with status ${fetchRes.status}`);
  }

  const xml = await fetchRes.text();
  const parsed = await parseStringPromise(xml);
  const taxon = parsed?.TaxaSet?.Taxon?.[0];

  if (!taxon) {
    throw new Error(`Empty response returned from NCBI for Tax ID ${ncbiTaxId}`);
  }

  const lineage = taxon.LineageEx?.[0]?.Taxon || [];
  
  // Combine the queried taxon itself as the leaf node to ensure we get its rank right
  const allTaxa = [
    ...lineage,
    {
      Rank: taxon.Rank,
      ScientificName: taxon.ScientificName
    }
  ];

  const domainName = allTaxa.find((item) => item.Rank?.[0] === "superkingdom")?.ScientificName?.[0] || "Bacteria";
  const phylumName = allTaxa.find((item) => item.Rank?.[0] === "phylum")?.ScientificName?.[0] || null;
  const className = allTaxa.find((item) => item.Rank?.[0] === "class")?.ScientificName?.[0] || null;
  const orderName = allTaxa.find((item) => item.Rank?.[0] === "order")?.ScientificName?.[0] || null;
  const familyName = allTaxa.find((item) => item.Rank?.[0] === "family")?.ScientificName?.[0] || null;
  const genusName = allTaxa.find((item) => item.Rank?.[0] === "genus")?.ScientificName?.[0] || null;
  const speciesName = allTaxa.find((item) => item.Rank?.[0] === "species")?.ScientificName?.[0] || null;

  // Upsert the full parsed lineage record
  await prisma.taxonomy_lineage.upsert({
    where: { tax_id: taxId },
    update: {
      ncbi_tax_id: ncbiTaxId,
      domain: domainName,
      phylum: phylumName,
      class: className,
      order: orderName,
      family: familyName,
      genus: genusName,
      species: speciesName,
      enrichment_status: "completed",
      last_updated: new Date(),
    },
    create: {
      tax_id: taxId,
      ncbi_tax_id: ncbiTaxId,
      domain: domainName,
      phylum: phylumName,
      class: className,
      order: orderName,
      family: familyName,
      genus: genusName,
      species: speciesName,
      enrichment_status: "completed",
      source: "ncbi",
    }
  });

  // If there is an existing queue item for this taxon, mark it as completed
  const queueItem = await prisma.taxonomy_enrichment_queue.findUnique({
    where: { tax_id: taxId }
  });
  if (queueItem) {
    await prisma.taxonomy_enrichment_queue.update({
      where: { queue_id: queueItem.queue_id },
      data: {
        status: "completed",
        attempts: { increment: 1 },
        last_attempt: new Date()
      }
    });
  }

  // Update taxonomy to mark it as linked/resolved
  await prisma.taxonomy.update({
    where: { tax_id: taxId },
    data: { is_linked: true }
  });
}

// 1. Process records that ALREADY have an NCBI Tax ID but are missing a complete lineage
async function enrichExistingNcbiIds() {
  console.log("\n--- Checking for Taxonomy records with existing NCBI Tax IDs ---");
  
  const taxRecords = await prisma.taxonomy.findMany({
    where: {
      ncbi_tax_id: { not: null }
    },
    include: {
      taxonomy_lineage: true
    }
  });

  // Filter for records with missing or incomplete lineages, or lineages affected by the leaf-node parser bug
  const pendingRecords = taxRecords.filter((rec) => {
    if (!rec.taxonomy_lineage) return true;
    if (rec.taxonomy_lineage.enrichment_status !== "completed") return true;

    // Check if lineage lacks the rank value corresponding to the taxon's own rank
    const rank = rec.rank?.toLowerCase();
    const lineage = rec.taxonomy_lineage;
    
    if (rank === "phylum" && !lineage.phylum) return true;
    if (rank === "class" && !lineage.class) return true;
    if (rank === "order" && !lineage.order) return true;
    if (rank === "family" && !lineage.family) return true;
    if (rank === "genus" && !lineage.genus) return true;
    if (rank === "species" && !lineage.species) return true;

    return false;
  });

  console.log(`Found ${pendingRecords.length} records with existing NCBI Tax IDs lacking completed lineages.`);

  for (const rec of pendingRecords) {
    console.log(`Enriching taxon: "${rec.name}" via existing NCBI Tax ID: ${rec.ncbi_tax_id}...`);
    try {
      await fetchAndSaveLineage(rec.tax_id, rec.ncbi_tax_id, rec.name);
      console.log(`SUCCESS: Successfully enriched lineage for "${rec.name}"`);
    } catch (err) {
      console.error(`ERROR: Failed to enrich lineage for "${rec.name}" using NCBI Tax ID ${rec.ncbi_tax_id}: ${err.message}`);
    }
    await delay(350); // Respect NCBI rate limit (approx 3 req/sec)
  }
}

// 2. Process records in the queue that have status 'pending' (resolve name -> ID first)
async function enrichQueueItems() {
  console.log("\n--- Processing remaining pending items in Taxonomy Enrichment Queue ---");
  const pendingItems = await prisma.taxonomy_enrichment_queue.findMany({
    where: { status: "pending" },
    take: 100
  });

  console.log(`Found ${pendingItems.length} pending items in the search queue.`);

  for (const item of pendingItems) {
    const taxonName = item.taxon_name;
    const taxId = item.tax_id;
    console.log(`Resolving name: "${taxonName}" (ID: ${taxId})...`);

    try {
      const apiKeyParam = process.env.NCBI_API_KEY ? `&api_key=${process.env.NCBI_API_KEY}` : "";
      const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=taxonomy&term=${encodeURIComponent(taxonName)}&retmode=json${apiKeyParam}`;
      const searchRes = await fetchWithRetry(searchUrl);
      
      if (!searchRes.ok) throw new Error(`NCBI esearch failed with status ${searchRes.status}`);

      const searchData = await searchRes.json();
      const idList = searchData?.esearchresult?.idlist || [];

      if (idList.length === 0) {
        console.warn(`WARNING: No NCBI Tax ID found for "${taxonName}"`);
        await prisma.taxonomy_enrichment_queue.update({
          where: { queue_id: item.queue_id },
          data: {
            status: "failed",
            attempts: { increment: 1 },
            last_attempt: new Date()
          }
        });
        continue;
      }

      const ncbiTaxId = Number(idList[0]);
      console.log(`Resolved "${taxonName}" to NCBI Tax ID: ${ncbiTaxId}`);

      // Update taxonomy record with resolved ID
      await prisma.taxonomy.update({
        where: { tax_id: taxId },
        data: { ncbi_tax_id: ncbiTaxId }
      });

      // Now fetch and save lineage
      await delay(350);
      await fetchAndSaveLineage(taxId, ncbiTaxId, taxonName);
      console.log(`SUCCESS: Successfully resolved and enriched: "${taxonName}"`);

    } catch (err) {
      console.error(`ERROR: Failed to resolve and enrich "${taxonName}": ${err.message}`);
      await prisma.taxonomy_enrichment_queue.update({
        where: { queue_id: item.queue_id },
        data: {
          status: "failed",
          attempts: { increment: 1 },
          last_attempt: new Date()
        }
      });
    }
    await delay(350);
  }
}

async function main() {
  console.log("=== Starting Taxonomy Enrichment Process ===");
  
  // Phase 1: Process records with existing NCBI Tax IDs first (faster, skips search)
  await enrichExistingNcbiIds();
  
  // Phase 2: Process remaining queue items needing name search
  await enrichQueueItems();

  console.log("\n=== Enrichment Process Completed ===");
}

main()
  .catch((e) => {
    console.error("Critical error in enrichment script:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
