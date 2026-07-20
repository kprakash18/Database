export const ENDPOINTS = [
  /* ── Samples ── */
  {
    id: "get-samples",
    category: "Samples",
    name: "Get All Samples",
    method: "GET",
    path: "/api/samples",
    entrezCommand: "esearch -db sample -query 'Indian Fermented Foods'",
    description: "Query and retrieve paginated metagenomic sample records, sequencing metadata, and food sample origins.",
    params: [
      { name: "page", type: "number", default: 1, description: "Page index [1..N]" },
      { name: "limit", type: "number", default: 10, description: "Records per query [10..100]" },
      { name: "search", type: "string", default: "", description: "Metagenome keyword filter" },
    ],
  },
  {
    id: "get-sample-by-id",
    category: "Samples",
    name: "Sample Details",
    method: "GET",
    path: "/api/samples/:id",
    entrezCommand: "efetch -db sample -id INDF001",
    description: "Fetch comprehensive metagenomic sample record metadata by NCBI Accession Code (e.g. INDF001).",
    params: [
      { name: "id", type: "string", default: "INDF001", description: "NCBI Accession Code" },
    ],
  },

  /* ── Composition ── */
  {
    id: "get-composition-summary",
    category: "Composition",
    name: "Summary",
    method: "GET",
    path: "/api/composition/summary/:sampleId",
    entrezCommand: "efetch -db composition -id INDF001 -mode summary",
    description: "Analyze and summarize dominant microbial taxa across all taxonomic ranks for a selected sample.",
    params: [
      { name: "sampleId", type: "string", default: "INDF001", description: "Sample Accession Code" },
    ],
  },
  {
    id: "get-composition-chart",
    category: "Composition",
    name: "Chart",
    method: "GET",
    path: "/api/composition/:id/:rank/chart",
    entrezCommand: "efetch -db composition -id INDF001 -rank genus",
    description: "Fetch relative abundance breakdown (% abundance) for a sample at a specific rank (genus, phylum, etc.).",
    params: [
      { name: "id", type: "string", default: "INDF001", description: "NCBI Accession Code" },
      { name: "rank", type: "select", default: "genus", options: ["phylum", "class", "order", "family", "genus", "species"], description: "Taxonomic Rank" },
    ],
  },
  {
    id: "get-composition-full",
    category: "Composition",
    name: "Relative Abundance",
    method: "GET",
    path: "/api/composition/:id/:rank/full",
    entrezCommand: "efetch -db composition -id INDF001 -rank genus -format full",
    description: "Fetch full relative abundance tables including raw read counts and percentages for all detected taxa.",
    params: [
      { name: "id", type: "string", default: "INDF001", description: "NCBI Accession Code" },
      { name: "rank", type: "select", default: "genus", options: ["phylum", "class", "order", "family", "genus", "species"], description: "Taxonomic Rank" },
    ],
  },

  /* ── Taxonomy ── */
  {
    id: "taxonomy-search",
    category: "Taxonomy",
    name: "Search",
    method: "GET",
    path: "/api/taxonomy/search",
    entrezCommand: "esearch -db taxonomy -term 'Lactococcus'",
    description: "Search NCBI taxonomy database by scientific name, lineage, or taxonomic rank.",
    params: [
      { name: "q", type: "string", default: "Lactococcus", description: "Scientific name query" },
    ],
  },
  {
    id: "taxonomy-tree",
    category: "Taxonomy",
    name: "Tree",
    method: "GET",
    path: "/api/taxonomy/:sampleId",
    entrezCommand: "efetch -db taxonomy -id INDF001 -format tree",
    description: "Fetch full taxonomy lineage data tree structure for a specified metagenome sample.",
    params: [
      { name: "sampleId", type: "string", default: "INDF001", description: "NCBI Accession Code" },
    ],
  },
  {
    id: "visualization-sunburst",
    category: "Taxonomy",
    name: "Sunburst",
    method: "GET",
    path: "/api/visualization/taxonomy/sunburst",
    entrezCommand: "efetch -db taxonomy -id INDF001 -format sunburst",
    description: "Generate multi-level D3 Sunburst hierarchy tree data for a sample or dataset.",
    params: [
      { name: "sampleId", type: "string", default: "INDF001", description: "Sample Accession Code" },
    ],
  },

  /* ── Visualization ── */
  {
    id: "visualization-rank",
    category: "Visualization",
    name: "Composition",
    method: "GET",
    path: "/api/visualization/:rank/:sampleId",
    entrezCommand: "efetch -db visualization -id INDF001 -mode phylum",
    description: "Get relative taxon abundance data for any taxonomic rank formatted for interactive composition rendering.",
    params: [
      { name: "rank", type: "select", default: "phylum", options: ["phylum", "class", "order", "family", "genus", "species"], description: "Taxonomic Rank" },
      { name: "sampleId", type: "string", default: "INDF001", description: "Sample Accession Code" },
    ],
  },
  {
    id: "visualization-taxonomy-search",
    category: "Visualization",
    name: "Taxonomy",
    method: "GET",
    path: "/api/visualization/taxonomy/search",
    entrezCommand: "esearch -db taxonomy -term 'Lactobacillus' -format sunburst",
    description: "Retrieve searchable taxonomy visualization nodes and nested lineages.",
    params: [
      { name: "q", type: "string", default: "Lactobacillus", description: "Scientific name query" },
    ],
  },

  {
    id: "visualization-stacked",
    category: "Visualization",
    name: "Stacked Distribution",
    method: "GET",
    path: "/api/visualization/stacked/:rank",
    entrezCommand: "efetch -db analytics -mode stacked-phylum",
    description: "Fetch cross-sample stacked distribution matrix of major microbial taxa.",
    params: [
      { name: "rank", type: "select", default: "phylum", options: ["phylum", "class", "order", "family", "genus", "species"], description: "Taxonomic Rank" },
    ],
  },
];
