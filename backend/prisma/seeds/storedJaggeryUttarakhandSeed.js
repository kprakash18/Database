// ── Verma et al. 2012 ────────────────────────────────────────────────────────
// "16S rDNA Sequence Based Characterization of Bacteria in Stored Jaggery in
//  Indian Jaggery Manufacturing Units"
// Sugar Tech, 2012
// https://link.springer.com/article/10.1007/s12355-012-0162-0
// ─────────────────────────────────────────────────────────────────────────────
// Culture-dependent Sanger sequencing study; 9 isolates from 24 pooled samples
// collected from Himalayan Tarai region jaggery manufacturing units.
// All composition entries are presence_only (no relative abundance data).
// ─────────────────────────────────────────────────────────────────────────────

const LOCATION = "Himalayan Tarai region, Uttarakhand, India (rural jaggery manufacturing units)";
const ACCESSION_BASE = "NCBI GenBank";
const COMMON_INFO = {
  fermentation_type: "none (stored food product)",
  dna_extraction_kit: "Phenol-chloroform extraction and ethanol precipitation (Newman 1998)",
  primers: "Com1 / Com2 (V4-V5 region of 16S rDNA)",
  read_type: "Sanger sequencing (single read)",
  sequencing_facility: "Genei Pvt. Ltd., India",
  bioinformatics_pipeline: "BLAST (NCBI), FASTA search (EMBL), MEGA 3 (phylogenetic tree)",
  database: "NCBI nucleotide database, EMBL database",
  otu_clustering: "Not applicable (culture-dependent isolate identification)",
  classifier: "BLAST homology search",
};

// Individual isolates: [sample_code, accession_id, taxon_name, notes]
const ISOLATES = [
  ["J1", "GU723497", "Stenotrophomonas maltophilia", "Gram-negative rod; CFU: 0.4×10⁶/g; 98% 16S rDNA homology; multidrug-resistant nosocomial pathogen; plasmid absent"],
  ["J2", "GU723498", "Acinetobacter baumannii",      "Gram-negative pleomorphic rod; CFU: 4.1×10⁶/g; 98% 16S rDNA homology; ubiquitous nosocomial pathogen; plasmid present"],
  ["J3", "GU723499", "Acinetobacter baumannii",      "Gram-negative pleomorphic rod; CFU: 8.5×10⁶/g; 98% 16S rDNA homology; highest CFU among Acinetobacter isolates; plasmid present"],
  ["J4", "GU723500", "Acinetobacter baumannii",      "Gram-negative pleomorphic rod; CFU: 4.8×10⁶/g; 98% 16S rDNA homology; plasmid present"],
  ["J5", "GU723505", "Ralstonia pickettii",           "Gram-negative pleomorphic rod; CFU: 0.8×10⁵/g; 99% 16S rDNA homology; environmental bacterium; susceptible to cephalexin, resistant to polymyxin B; plasmid absent"],
  ["J6", "GU723501", "Acinetobacter baumannii",      "Gram-negative small rod; CFU: 2.1×10⁵/g; 99% 16S rDNA homology; plasmid present"],
  ["J7", "GU723502", "Acinetobacter baumannii",      "Gram-negative pleomorphic rod; CFU: 0.2×10⁵/g; 97% 16S rDNA homology; lowest CFU among isolates; plasmid present"],
  ["J8", "GU723503", "Acinetobacter baumannii",      "Gram-negative pleomorphic rod; CFU: 4.8×10⁵/g; 98% 16S rDNA homology; susceptible to cephalexin, resistant to polymyxin B; plasmid present"],
  ["J9", "GU723504", "Ralstonia pickettii",           "Gram-negative small rod; CFU: 4.6×10⁵/g; 99% 16S rDNA homology; plasmid absent"],
];

// Pooled "ALL" sample composition entries: [taxon_name, rank, is_dominant, notes]
const POOLED = [
  // Detected in this study
  ["Acinetobacter baumannii",    "species", true,  "Most predominant (6/9 isolates: J2-J4, J6-J8); first report in stored jaggery; multidrug-resistant nosocomial pathogen"],
  ["Ralstonia pickettii",        "species", false, "2/9 isolates (J5, J9); environmental bacterium from water/soil/plants; occasionally isolated from clinical respiratory specimens"],
  ["Stenotrophomonas maltophilia","species",false, "1/9 isolates (J1); multidrug-resistant Gram-negative bacillus; emerging nosocomial pathogen"],
  ["Acinetobacter",              "genus",   true,  "Most abundant genus; 6 isolates all identified as A. baumannii; first report in stored jaggery"],
  ["Ralstonia",                  "genus",   false, "2 isolates (J5, J9) identified as R. pickettii; 99% homology"],
  ["Stenotrophomonas",           "genus",   false, "1 isolate (J1) identified as S. maltophilia; 98% homology"],
  // Previously reported in raw sugars (Owen 1990) — not detected in this study
  ["Bacillus subtilis",          "species", false, "Commonly occurring in raw sugars (Owen 1990); not detected in this study"],
  ["Bacillus mesentericus",      "species", false, "Commonly occurring in raw sugars (Owen 1990); not detected in this study"],
  ["Aerobacter aerogenes",       "species", false, "Commonly occurring in raw sugars (Owen 1990); not detected in this study"],
  ["Leuconostoc mesenteroides",  "species", false, "Previously identified in fresh sugarcane juice (Owen 1990); not detected in stored jaggery"],
  ["Leuconostoc dextranicum",    "species", false, "Previously identified in fresh sugarcane juice (Owen 1990); not detected in stored jaggery"],
  ["Actinomyces",                "genus",   false, "Commonly occurring in raw sugars (Owen 1990); not detected in this study"],
  ["Saccharomyces",              "genus",   false, "Commonly occurring in raw sugars (Owen 1990); yeast; not detected in this study"],
  ["Penicillium",                "genus",   false, "Commonly occurring in raw sugars (Owen 1990); mold; not detected in this study"],
  ["Mucor",                      "genus",   false, "Commonly occurring in raw sugars (Owen 1990); mold; not detected in this study"],
  ["Aspergillus",                "genus",   false, "Commonly occurring in raw sugars (Owen 1990); mold; not detected in this study"],
];

const FOOD_ALL  = "Stored Jaggery (pooled)";
const DESC_ALL  = "Pooled bacterial characterization from 24 stored jaggery samples across multiple manufacturing units in Himalayan Tarai, Uttarakhand";

// Build bacterial_composition
const bacterial_composition = [
  // Individual isolates
  ...ISOLATES.map(([sample_code, , taxon_name, notes]) => ({
    sample_code,
    food_name: `Stored Jaggery (Isolate ${sample_code})`,
    description: "Bacterial isolate from surface of stored jaggery, Himalayan Tarai, Uttarakhand",
    taxon_name, reported_rank: "species",
    relative_abundance: null, is_dominant: false,
    measurement_type: "presence_only", notes,
  })),
  // Pooled entries
  ...POOLED.map(([taxon_name, reported_rank, is_dominant, notes]) => ({
    sample_code: "ALL", food_name: FOOD_ALL, description: DESC_ALL,
    taxon_name, reported_rank,
    relative_abundance: null, is_dominant,
    measurement_type: "presence_only", notes,
  })),
];

export default {
  source_paper: {
    title: "16S rDNA Sequence Based Characterization of Bacteria in Stored Jaggery in Indian Jaggery Manufacturing Units",
    authors: "A.K. Verma, Shubhra Singh, Shalini Singh, Ashutosh Dubey",
    journal: "Sugar Tech",
    year: 2012,
    doi: null,
    link: "https://link.springer.com/article/10.1007/s12355-012-0162-0",
  },
  sequencing_methods: [
    { method_name: "16S rDNA sequencing (culture-dependent, Sanger sequencing)", platform: "Sanger sequencing (Genei Pvt. Ltd.)", target_region: "V4-V5" },
  ],
  samples: [
    // Individual isolates
    ...ISOLATES.map(([sample_code, accession_id]) => ({
      sample_code,
      food_name: `Stored Jaggery (Isolate ${sample_code})`,
      description: `Bacterial isolate ${sample_code} from surface of stored jaggery collected from jaggery manufacturing unit in Himalayan Tarai region, Uttarakhand, India`,
      raw_material: "Stored jaggery (Gur) - solid unrefined cane sugar product",
      location: LOCATION,
      collection_day: "Stored jaggery (post-manufacturing, surface scraped for isolation)",
      replicates: "Single isolate from pooled 24 samples",
      accession_id: `${accession_id} (${ACCESSION_BASE})`,
      additional_info: COMMON_INFO,
    })),
    // Pooled virtual sample
    {
      sample_code: "ALL",
      food_name: FOOD_ALL,
      description: DESC_ALL,
      raw_material: "Stored jaggery (Gur) - solid unrefined cane sugar product",
      location: LOCATION,
      collection_day: "24 pooled samples from multiple manufacturing units",
      replicates: "24 pooled samples; 9 isolates characterised",
      accession_id: "GU723497–GU723505 (NCBI GenBank)",
      additional_info: { ...COMMON_INFO, note: "Pooled summary sample for study-level taxa" },
    },
  ],
  taxonomy_list: [
    // Phyla
    { name: "Proteobacteria",        rank: "phylum",  reported_rank: "Phylum" },
    // Classes
    { name: "Gammaproteobacteria",   rank: "class",   reported_rank: "Class" },
    { name: "Betaproteobacteria",    rank: "class",   reported_rank: "Class" },
    // Orders
    { name: "Pseudomonadales",       rank: "order",   reported_rank: "Order" },
    { name: "Burkholderiales",       rank: "order",   reported_rank: "Order" },
    { name: "Xanthomonadales",       rank: "order",   reported_rank: "Order" },
    // Families
    { name: "Moraxellaceae",         rank: "family",  reported_rank: "Family" },
    { name: "Burkholderiaceae",      rank: "family",  reported_rank: "Family" },
    { name: "Xanthomonadaceae",      rank: "family",  reported_rank: "Family" },
    // Genera
    { name: "Acinetobacter",         rank: "genus",   reported_rank: "Genus" },
    { name: "Ralstonia",             rank: "genus",   reported_rank: "Genus" },
    { name: "Stenotrophomonas",      rank: "genus",   reported_rank: "Genus" },
    { name: "Pseudomonas",           rank: "genus",   reported_rank: "Genus" },
    { name: "Burkholderia",          rank: "genus",   reported_rank: "Genus" },
    { name: "Bacillus",              rank: "genus",   reported_rank: "Genus" },
    { name: "Aerobacter",            rank: "genus",   reported_rank: "Genus" },
    { name: "Actinomyces",           rank: "genus",   reported_rank: "Genus" },
    { name: "Saccharomyces",         rank: "genus",   reported_rank: "Genus" },
    { name: "Penicillium",           rank: "genus",   reported_rank: "Genus" },
    { name: "Mucor",                 rank: "genus",   reported_rank: "Genus" },
    { name: "Aspergillus",           rank: "genus",   reported_rank: "Genus" },
    { name: "Leuconostoc",           rank: "genus",   reported_rank: "Genus" },
    // Species
    { name: "Acinetobacter baumannii",     rank: "species", reported_rank: "Species" },
    { name: "Ralstonia pickettii",         rank: "species", reported_rank: "Species" },
    { name: "Stenotrophomonas maltophilia",rank: "species", reported_rank: "Species" },
    { name: "Ralstonia sp.",               rank: "species", reported_rank: "Species" },
    { name: "Ralstonia detusculanense",    rank: "species", reported_rank: "Species" },
    { name: "Ralstonia thomasii",          rank: "species", reported_rank: "Species" },
    { name: "Ralstonia mannitolilytica",   rank: "species", reported_rank: "Species" },
    { name: "Acinetobacter calcoaceticus", rank: "species", reported_rank: "Species" },
    { name: "Burkholderia mallei",         rank: "species", reported_rank: "Species" },
    { name: "Stenotrophomonas sp.",        rank: "species", reported_rank: "Species" },
    { name: "Pseudomonas sp.",             rank: "species", reported_rank: "Species" },
    { name: "Bacillus subtilis",           rank: "species", reported_rank: "Species" },
    { name: "Bacillus mesentericus",       rank: "species", reported_rank: "Species" },
    { name: "Aerobacter aerogenes",        rank: "species", reported_rank: "Species" },
    { name: "Leuconostoc mesenteroides",   rank: "species", reported_rank: "Species" },
    { name: "Leuconostoc dextranicum",     rank: "species", reported_rank: "Species" },
  ],
  bacterial_composition,
};
