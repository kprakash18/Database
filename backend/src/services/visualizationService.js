import fetch from "node-fetch";
import { parseStringPromise } from "xml2js";
import { pool } from '../config/db.js' ;

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

export async function getPhylumDistribution(sample_id) {
    const result = await pool.query(`
        SELECT 
        COALESCE(tl.phylum, 'Unknown') AS phylum,
        SUM(bc.relative_abundance) AS total_abundance
        FROM bacterial_composition bc
        LEFT JOIN taxonomy_lineage tl ON bc.tax_id = tl.tax_id
        WHERE bc.sample_id = $1
        GROUP BY tl.phylum
        ORDER BY total_abundance DESC;
        `,
        [sample_id]
    );
    return result.rows[0] ;
};

export async function getGenusDistribution(sampleId) {
    const result = await pool.query(
      `
      SELECT 
        COALESCE(tl.genus, bc.taxon_name, 'Unknown') AS genus,
        SUM(bc.relative_abundance) AS total_abundance
      FROM bacterial_composition bc
      LEFT JOIN taxonomy_lineage tl ON bc.tax_id = tl.tax_id
      WHERE bc.sample_id = $1
      GROUP BY tl.genus, bc.taxon_name
      ORDER BY total_abundance DESC;
      `,
      [sampleId]
    );
  
    return result.rows;
  }

  export async function getTaxonomyStackedData() {
    const result = await pool.query(
      `
      SELECT 
        s.sample_id,
        s.food_name,
        COALESCE(tl.phylum, 'Unknown') AS phylum,
        SUM(bc.relative_abundance) AS total_abundance
      FROM samples s
      JOIN bacterial_composition bc ON s.sample_id = bc.sample_id
      LEFT JOIN taxonomy_lineage tl ON bc.tax_id = tl.tax_id
      GROUP BY s.sample_id, s.food_name, tl.phylum
      ORDER BY s.sample_id, total_abundance DESC;
      `
    );
  
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
  if (ncbiLineageCache.has(ncbiTaxId)) {
    return ncbiLineageCache.get(ncbiTaxId);
  }

  const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=taxonomy&id=${ncbiTaxId}`;
  const response = await fetch(url);

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
  const rows = [
    {
      tax_id: null,
      name: taxon.ScientificName?.[0],
      rank: taxon.Rank?.[0],
      ncbi_tax_id: Number(taxon.TaxId?.[0]),
      relative_abundance: 1,
      domain: lineage.find((item) => item.Rank?.[0] === "superkingdom")?.ScientificName?.[0],
      kingdom: lineage.find((item) => item.Rank?.[0] === "kingdom")?.ScientificName?.[0],
      phylum: lineage.find((item) => item.Rank?.[0] === "phylum")?.ScientificName?.[0],
      class: lineage.find((item) => item.Rank?.[0] === "class")?.ScientificName?.[0],
      order_name: lineage.find((item) => item.Rank?.[0] === "order")?.ScientificName?.[0],
      family: lineage.find((item) => item.Rank?.[0] === "family")?.ScientificName?.[0],
      genus: lineage.find((item) => item.Rank?.[0] === "genus")?.ScientificName?.[0],
      species: taxon.Rank?.[0] === "species" ? taxon.ScientificName?.[0] : null,
    },
  ];

  const payload = {
    ranks: TAXONOMY_RANKS,
    source: "ncbi",
    cached: false,
    tree: buildTaxonomyTree(rows),
  };

  ncbiLineageCache.set(ncbiTaxId, { ...payload, cached: true });
  return payload;
}
