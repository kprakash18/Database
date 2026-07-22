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

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

async function fetchAndSaveLineage(taxId, ncbiTaxId, taxonName) {
  const apiKeyParam = process.env.NCBI_API_KEY ? `&api_key=${process.env.NCBI_API_KEY}` : "";
  const fetchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=taxonomy&id=${ncbiTaxId}${apiKeyParam}`;
  
  const fetchRes = await fetchWithRetry(fetchUrl);
  if (!fetchRes.ok) throw new Error(`NCBI efetch failed with status ${fetchRes.status}`);

  const parsed = await parseStringPromise(await fetchRes.text());
  const taxon = parsed?.TaxaSet?.Taxon?.[0];
  if (!taxon) throw new Error(`Empty response returned from NCBI for Tax ID ${ncbiTaxId}`);

  const allTaxa = [...(taxon.LineageEx?.[0]?.Taxon || []), { Rank: taxon.Rank, ScientificName: taxon.ScientificName }];
  const getRankName = (rank) => allTaxa.find((item) => item.Rank?.[0] === rank)?.ScientificName?.[0] || null;

  const lineageData = {
    ncbi_tax_id: ncbiTaxId,
    domain: getRankName("superkingdom") || "Bacteria",
    phylum: getRankName("phylum"),
    class: getRankName("class"),
    order: getRankName("order"),
    family: getRankName("family"),
    genus: getRankName("genus"),
    species: getRankName("species"),
    enrichment_status: "completed",
  };

  await prisma.taxonomy_lineage.upsert({
    where: { tax_id: taxId },
    update: { ...lineageData, last_updated: new Date() },
    create: { ...lineageData, tax_id: taxId, source: "ncbi" }
  });

  const queueItem = await prisma.taxonomy_enrichment_queue.findUnique({ where: { tax_id: taxId } });
  if (queueItem) {
    await prisma.taxonomy_enrichment_queue.update({
      where: { queue_id: queueItem.queue_id },
      data: { status: "completed", attempts: { increment: 1 }, last_attempt: new Date() }
    });
  }

  await prisma.taxonomy.update({ where: { tax_id: taxId }, data: { is_linked: true } });
}

async function enrichExistingNcbiIds() {
  console.log("\n--- Checking for Taxonomy records with existing NCBI Tax IDs ---");
  const taxRecords = await prisma.taxonomy.findMany({
    where: { ncbi_tax_id: { not: null } },
    include: { taxonomy_lineage: true }
  });

  const pendingRecords = taxRecords.filter((rec) => {
    if (!rec.taxonomy_lineage) return true;
    if (rec.taxonomy_lineage.enrichment_status !== "completed") return true;
    const rank = rec.rank?.toLowerCase();
    return rank && !rec.taxonomy_lineage[rank];
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
    await delay(350);
  }
}

async function enrichQueueItems() {
  console.log("\n--- Processing remaining pending items in Taxonomy Enrichment Queue ---");
  const pendingItems = await prisma.taxonomy_enrichment_queue.findMany({
    where: { status: "pending" },
    take: 100
  });

  console.log(`Found ${pendingItems.length} pending items in the search queue.`);

  for (const item of pendingItems) {
    const { taxon_name: taxonName, tax_id: taxId } = item;
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
          data: { status: "failed", attempts: { increment: 1 }, last_attempt: new Date() }
        });
        continue;
      }

      const ncbiTaxId = Number(idList[0]);
      console.log(`Resolved "${taxonName}" to NCBI Tax ID: ${ncbiTaxId}`);

      await prisma.taxonomy.update({ where: { tax_id: taxId }, data: { ncbi_tax_id: ncbiTaxId } });
      await delay(350);
      await fetchAndSaveLineage(taxId, ncbiTaxId, taxonName);
      console.log(`SUCCESS: Successfully resolved and enriched: "${taxonName}"`);

    } catch (err) {
      console.error(`ERROR: Failed to resolve and enrich "${taxonName}": ${err.message}`);
      await prisma.taxonomy_enrichment_queue.update({
        where: { queue_id: item.queue_id },
        data: { status: "failed", attempts: { increment: 1 }, last_attempt: new Date() }
      });
    }
    await delay(350);
  }
}

async function main() {
  console.log("=== Starting Taxonomy Enrichment Process ===");
  await enrichExistingNcbiIds();
  await enrichQueueItems();
  console.log("\n=== Enrichment Process Completed ===");
}

main()
  .catch((e) => console.error("Critical error in enrichment script:", e))
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
