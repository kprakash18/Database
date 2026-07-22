import fetch from "node-fetch";
import { parseStringPromise } from "xml2js";
import { pool, prisma } from '../config/db.js' ;

// Helper to pause execution
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

const TAXONOMY_RANKS = [
  "domain",
  "kingdom",
  "phylum",
  "class",
  "order",
  "family",
  "genus",
  "species",
];

const ncbiLineageCache = new Map();

export async function getRankDistributionService(sampleId, rank) {
  const cleanRank = rank?.toLowerCase();
  const allowed = ["domain", "phylum", "class", "order", "family", "genus", "species"];
  if (!allowed.includes(cleanRank)) {
    throw new Error(`Invalid taxonomy rank: ${rank}`);
  }

  // Quote rank identifier to keep SQL syntax valid and protect against injection
  const query = `
    SELECT 
      COALESCE(tl."${cleanRank}", bc.taxon_name, 'Unknown') AS label,
      SUM(bc.relative_abundance) AS value
    FROM bacterial_composition bc
    LEFT JOIN taxonomy_lineage tl ON bc.tax_id = tl.tax_id
    WHERE bc.sample_id = $1 AND bc.reported_rank = $2
    GROUP BY tl."${cleanRank}", bc.taxon_name
    ORDER BY value DESC;
  `;
  const result = await pool.query(query, [sampleId, cleanRank]);
  return result.rows;
}

export async function getTaxonomyStackedDataService(rank) {
  const cleanRank = rank?.toLowerCase();
  const allowed = ["domain", "phylum", "class", "order", "family", "genus", "species"];
  if (!allowed.includes(cleanRank)) {
    throw new Error(`Invalid taxonomy rank: ${rank}`);
  }

  const query = `
    SELECT 
      s.sample_id,
      s.food_name,
      COALESCE(tl."${cleanRank}", 'Unknown') AS label,
      SUM(bc.relative_abundance) AS value
    FROM samples s
    JOIN bacterial_composition bc ON s.sample_id = bc.sample_id
    LEFT JOIN taxonomy_lineage tl ON bc.tax_id = tl.tax_id
    WHERE bc.reported_rank = $1
    GROUP BY s.sample_id, s.food_name, tl."${cleanRank}"
    ORDER BY s.sample_id, value DESC;
  `;
  const result = await pool.query(query, [cleanRank]);
  return result.rows;
}

function normalizeTaxonName(value, fallback = "Unknown") {
  if (!value || typeof value !== "string") return fallback;
  return value.trim() || fallback;
}

function createTreeNode({ name, rank, parentName = null, taxonomyId = null, ncbiTaxId = null }) {
  return {
    name,
    scientificName: name,
    rank,
    taxonomyId,
    ncbiTaxId,
    parentName,
    childCount: 0,
    value: 0,
    metadata: {
      genomeSize: null,
      gcContent: null,
      habitat: null,
      pathogenicity: "Unknown",
      sequencingStatus: "Unknown",
    },
    children: [],
  };
}

function getOrCreateChild(parent, key, factory) {
  if (!parent._childrenByKey) parent._childrenByKey = new Map();

  if (!parent._childrenByKey.has(key)) {
    const child = factory();
    parent._childrenByKey.set(key, child);
    parent.children.push(child);
  }

  return parent._childrenByKey.get(key);
}

function stripInternalMaps(node) {
  delete node._childrenByKey;
  node.childCount = node.children.length;

  if (node.children.length === 0) {
    delete node.children;
    node.value = Number(node.value.toFixed(6)) || 1;
    return node;
  }

  node.children = node.children.map(stripInternalMaps);
  node.value = Number(
    node.children.reduce((total, child) => total + (child.value || 0), 0).toFixed(6)
  );
  return node;
}

function buildTaxonomyTree(rows) {
  const root = createTreeNode({
    name: "Life",
    rank: "root",
    parentName: null,
    taxonomyId: "root",
  });

  rows.forEach((row) => {
    let parent = root;
    let parentName = root.name;

    TAXONOMY_RANKS.forEach((rank) => {
      const rawName =
        rank === "kingdom"
          ? row.kingdom || row.domain
          : rank === "order"
            ? row.order_name
            : row[rank];

      const name = normalizeTaxonName(rawName, null);
      if (!name) return;

      const key = `${rank}:${name.toLowerCase()}`;
      parent = getOrCreateChild(parent, key, () =>
        createTreeNode({
          name,
          rank,
          parentName,
          taxonomyId: rank === row.rank ? row.tax_id : null,
          ncbiTaxId: rank === row.rank ? row.ncbi_tax_id : null,
        })
      );

      if (!parent.taxonomyId && rank === row.rank) {
        parent.taxonomyId = row.tax_id;
        parent.ncbiTaxId = row.ncbi_tax_id;
      }

      parentName = name;
    });

    const abundance = Number(row.relative_abundance);
    parent.value += Number.isFinite(abundance) && abundance > 0 ? abundance : 1;
  });

  return stripInternalMaps(root);
}

export async function getSunburstTaxonomyTree({ sampleId = null, limit = 5000 }) {
  const values = [];
  const filters = [];

  if (sampleId) {
    values.push(sampleId);
    filters.push(`bc.sample_id = $${values.length}`);
  }

  values.push(limit);

  const result = await pool.query(
    `
    SELECT
      t.tax_id,
      t.name,
      t.rank,
      t.ncbi_tax_id,
      bc.relative_abundance,
      COALESCE(tl.domain, 'Bacteria') AS domain,
      COALESCE(tl.domain, 'Bacteria') AS kingdom,
      tl.phylum,
      tl.class,
      tl."order" AS order_name,
      tl.family,
      tl.genus,
      COALESCE(tl.species, t.name, bc.taxon_name) AS species
    FROM bacterial_composition bc
    LEFT JOIN taxonomy t ON bc.tax_id = t.tax_id
    LEFT JOIN taxonomy_lineage tl ON bc.tax_id = tl.tax_id
    ${filters.length ? `WHERE ${filters.join(" AND ")}` : ""}
    ORDER BY bc.relative_abundance DESC NULLS LAST, bc.read_count DESC NULLS LAST
    LIMIT $${values.length};
    `,
    values
  );

  return {
    ranks: TAXONOMY_RANKS,
    totalRows: result.rowCount,
    tree: buildTaxonomyTree(result.rows),
  };
}

export async function searchSunburstTaxonomy({ query, sampleId = null, limit = 25 }) {
  const values = [`%${query.toLowerCase()}%`, query.toLowerCase()];
  const sampleFilter = sampleId ? `AND bc.sample_id = $${values.push(sampleId)}` : "";
  values.push(limit);

  const result = await pool.query(
    `
    SELECT DISTINCT
      t.tax_id,
      t.name,
      t.rank,
      t.ncbi_tax_id,
      COALESCE(tl.domain, 'Bacteria') AS domain,
      COALESCE(tl.domain, 'Bacteria') AS kingdom,
      tl.phylum,
      tl.class,
      tl."order" AS order_name,
      tl.family,
      tl.genus,
      COALESCE(tl.species, t.name, bc.taxon_name) AS species
    FROM bacterial_composition bc
    LEFT JOIN taxonomy t ON bc.tax_id = t.tax_id
    LEFT JOIN taxonomy_lineage tl ON bc.tax_id = tl.tax_id
    WHERE (
      LOWER(COALESCE(t.name, '')) LIKE $1
      OR CAST(COALESCE(t.tax_id, 0) AS TEXT) = $2
      OR CAST(COALESCE(t.ncbi_tax_id, 0) AS TEXT) = $2
      OR LOWER(COALESCE(tl.genus, '')) LIKE $1
      OR LOWER(COALESCE(tl.species, '')) LIKE $1
    )
    ${sampleFilter}
    ORDER BY t.name ASC NULLS LAST
    LIMIT $${values.length};
    `,
    values
  );

  return result.rows.map((row) => {
    const path = TAXONOMY_RANKS
      .map((rank) => (rank === "order" ? row.order_name : row[rank]))
      .filter(Boolean);

    return {
      taxonomyId: row.tax_id,
      ncbiTaxId: row.ncbi_tax_id,
      scientificName: row.name || row.species || row.genus,
      rank: row.rank || "unknown",
      path: ["Life", ...path],
    };
  });
}

export async function fetchNcbiLineageTree(ncbiTaxId) {
  // 1. Check in-memory cache
  if (ncbiLineageCache.has(ncbiTaxId)) {
    return ncbiLineageCache.get(ncbiTaxId);
  }

  // 2. Check local database first
  const dbLineage = await prisma.taxonomy_lineage.findFirst({
    where: { ncbi_tax_id: ncbiTaxId, enrichment_status: "completed" },
    include: { taxonomy: true }
  });

  if (dbLineage) {
    const rows = [{
      tax_id: dbLineage.tax_id,
      name: dbLineage.taxonomy?.name || dbLineage.species || dbLineage.genus,
      rank: dbLineage.taxonomy?.rank,
      ncbi_tax_id: dbLineage.ncbi_tax_id,
      relative_abundance: 1,
      domain: dbLineage.domain,
      kingdom: dbLineage.domain,
      phylum: dbLineage.phylum,
      class: dbLineage.class,
      order_name: dbLineage.order,
      family: dbLineage.family,
      genus: dbLineage.genus,
      species: dbLineage.species,
    }];

    const payload = {
      ranks: TAXONOMY_RANKS,
      source: "local_db",
      cached: true,
      tree: buildTaxonomyTree(rows),
    };
    ncbiLineageCache.set(ncbiTaxId, payload);
    return payload;
  }

  // 3. Fallback to API if not in DB
  try {
    const apiKeyParam = process.env.NCBI_API_KEY ? `&api_key=${process.env.NCBI_API_KEY}` : "";
    const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=taxonomy&id=${ncbiTaxId}${apiKeyParam}`;
    const response = await fetchWithRetry(url);

    if (!response.ok) {
      throw new Error(`NCBI request failed with status ${response.status}`);
    }

    const xml = await response.text();
    const data = await parseStringPromise(xml);
    const taxon = data?.TaxaSet?.Taxon?.[0];

    if (!taxon) {
      throw new Error("No NCBI taxonomy record found");
    }

    const lineage = taxon.LineageEx?.[0]?.Taxon || [];
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

    const rowObj = {
      tax_id: null,
      name: taxon.ScientificName?.[0],
      rank: taxon.Rank?.[0],
      ncbi_tax_id: Number(taxon.TaxId?.[0]),
      relative_abundance: 1,
      domain: domainName,
      kingdom: domainName,
      phylum: phylumName,
      class: className,
      order_name: orderName,
      family: familyName,
      genus: genusName,
      species: speciesName,
    };

    // 4. Save/Persist to DB in background
    const dbTaxon = await prisma.taxonomy.findFirst({
      where: { ncbi_tax_id: ncbiTaxId }
    });

    if (dbTaxon) {
      await prisma.taxonomy_lineage.upsert({
        where: { tax_id: dbTaxon.tax_id },
        update: {
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
          tax_id: dbTaxon.tax_id,
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
      rowObj.tax_id = dbTaxon.tax_id;
    }

    const payload = {
      ranks: TAXONOMY_RANKS,
      source: "ncbi",
      cached: false,
      tree: buildTaxonomyTree([rowObj]),
    };

    ncbiLineageCache.set(ncbiTaxId, { ...payload, cached: true });
    return payload;

  } catch (err) {
    // 5. Robust Fallback: If NCBI fails but we have the taxon locally, return a stub tree instead of 500ing
    const localTaxon = await prisma.taxonomy.findFirst({
      where: { ncbi_tax_id: ncbiTaxId }
    });

    if (localTaxon) {
      const fallbackRow = {
        tax_id: localTaxon.tax_id,
        name: localTaxon.name,
        rank: localTaxon.rank,
        ncbi_tax_id: ncbiTaxId,
        relative_abundance: 1,
        domain: "Bacteria",
        kingdom: "Bacteria",
      };

      return {
        ranks: TAXONOMY_RANKS,
        source: "local_fallback",
        cached: false,
        tree: buildTaxonomyTree([fallbackRow]),
        error: err.message,
      };
    }

    throw err;
  }
}
