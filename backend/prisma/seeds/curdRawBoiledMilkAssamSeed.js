// ── Joishy et al. 2019  ─────────────────────────────────────────────────────
// "Bacterial diversity and metabolite profiles of curd prepared by natural
//  fermentation of raw milk and back sloping of boiled milk"
// World Journal of Microbiology and Biotechnology, 2019
// DOI: 10.1007/s11274-019-2677-y
// ────────────────────────────────────────────────────────────────────────────

// Column order for Table 1
const SAMPLE_COLS = [
  ["RM-AM",  "Raw Milk (Aanthmile)",        "Raw milk from Aanthmile farm"],
  ["RM-JR",  "Raw Milk (Jagiroad)",          "Raw milk from Jagiroad farm"],
  ["RM-PG",  "Raw Milk (Pathgaon)",          "Raw milk from Pathgaon farm"],
  ["RMC-AM", "Raw Milk Curd (Aanthmile)",    "Curd from raw milk, Aanthmile, natural fermentation"],
  ["RMC-JR", "Raw Milk Curd (Jagiroad)",     "Curd from raw milk, Jagiroad, natural fermentation"],
  ["RMC-PG", "Raw Milk Curd (Pathgaon)",     "Curd from raw milk, Pathgaon, natural fermentation"],
  ["BM-AM",  "Boiled Milk (Aanthmile)",      "Boiled milk from Aanthmile farm"],
  ["BM-JR",  "Boiled Milk (Jagiroad)",       "Boiled milk from Jagiroad farm"],
  ["BM-PG",  "Boiled Milk (Pathgaon)",       "Boiled milk from Pathgaon farm"],
  ["BMC-AM", "Boiled Milk Curd (Aanthmile)", "Curd from boiled milk, Aanthmile, back slopping"],
  ["BMC-JR", "Boiled Milk Curd (Jagiroad)",  "Curd from boiled milk, Jagiroad, back slopping"],
  ["BMC-PG", "Boiled Milk Curd (Pathgaon)",  "Curd from boiled milk, Pathgaon, back slopping"],
];

// Table 1: genus-level relative abundances [genus, ...12 values matching SAMPLE_COLS]
// Zero values are skipped during composition generation
const T1 = [
  //                      RM-AM  RM-JR  RM-PG  RMC-AM RMC-JR RMC-PG BM-AM  BM-JR  BM-PG  BMC-AM BMC-JR BMC-PG
  ["Chryseobacterium",    10.3,   0.9,   0.0,   0.2,   0.2,   0.8,   3.6,   1.1,   0.6,   0.0,   0.0,   0.0],
  ["Staphylococcus",       3.8,  27.4,   0.4,   0.0,   0.6,   0.3,  21.5,  17.9,   0.5,   0.0,   0.0,   0.0],
  ["Enterococcus",         8.1,   2.8,   2.9,   0.6,   1.1,  12.6,   6.7,   0.0,   1.7,   0.0,   2.1,   0.3],
  ["Lactobacillus",        0.0,   0.0,   0.0,  55.9,   1.0,   0.1,   0.0,   0.0,   0.0,  73.5,   0.1,   0.4],
  ["Leuconostoc",          0.0,   0.0,   0.0,   8.9,   2.9,  13.7,   0.0,   0.0,   0.0,   7.0,  30.5,  20.4],
  ["Lactococcus",          0.2,   2.1,   0.1,   1.7,  45.7,   5.6,   0.0,   0.0,   0.0,   6.1,  49.8,   0.1],
  ["Streptococcus",       13.3,   1.5,  23.4,   4.3,   7.1,  13.2,   7.6,   0.3,  13.8,   0.5,   0.0,   8.1],
  ["Klebsiella",           0.9,   0.0,   3.3,   0.2,   0.3,   2.7,   0.0,   0.0,   0.0,   0.0,   0.0,   0.0],
  ["Acinetobacter",        3.9,   0.1,   5.4,   1.2,   0.5,   7.6,   6.3,  14.9,  47.6,   0.0,   0.0,   0.0],
  ["Enhydrobacter",       23.3,   0.0,   0.1,   1.4,   0.2,   0.3,  19.4,   0.6,   3.5,   0.0,   0.0,   0.0],
  ["Pseudomonas",          0.0,   0.2,   0.4,   0.1,   1.1,   1.7,   0.0,   0.0,   0.0,   0.0,   0.0,   0.0],
  ["Acetobacter",          0.0,   0.0,   0.0,   0.0,   0.0,   0.0,   0.0,   0.0,   0.0,   0.7,   0.8,   3.6],
  ["Corynebacterium",      0.0,   0.0,   0.0,   0.0,   0.0,   0.0,   0.3,   0.0,   0.2,   0.0,   0.0,   0.0],
  ["Brachybacterium",      0.0,   0.0,   0.0,   0.0,   0.0,   0.0,   0.1,   0.0,   0.2,   0.0,   0.0,   0.0],
  ["Micrococcus",          0.0,   0.0,   0.0,   0.0,   0.0,   0.0,   0.1,   0.0,   0.2,   0.0,   0.0,   0.0],
  ["Bacillus",             0.0,   0.0,   0.0,   0.0,   0.0,   0.0,  13.2,   0.0,   1.2,   0.0,   0.0,   0.0],
  ["Jeotgalicoccus",       0.0,   0.0,   0.0,   0.0,   0.0,   0.0,   0.2,   0.2,   0.1,   0.0,   0.0,   0.0],
  ["Salinicoccus",         0.0,   0.0,   0.0,   0.0,   0.0,   0.0,   0.1,   0.2,   0.1,   0.0,   0.0,   0.0],
  ["Aerococcus",           0.0,   0.0,   0.0,   0.0,   0.0,   0.0,   1.5,   0.1,   0.3,   0.0,   0.0,   0.0],
  ["Stenotrophomonas",     0.0,   0.0,   0.0,   0.0,   0.0,   0.0,   0.1,  39.8,   0.0,   0.0,   0.0,   0.0],
];

// Presence-only taxa [sample_code, food_name, description, taxon_name, rank, notes]
const PRESENCE = [
  // Culture-dependent isolates from RM-AM
  ["RM-AM", "Raw Milk (Aanthmile)", "Raw milk from Aanthmile farm", "Lactobacillus",    "genus", "Culture-dependent isolate from RM"],
  ["RM-AM", "Raw Milk (Aanthmile)", "Raw milk from Aanthmile farm", "Lactococcus",      "genus", "Culture-dependent isolate from RM"],
  ["RM-AM", "Raw Milk (Aanthmile)", "Raw milk from Aanthmile farm", "Leuconostoc",      "genus", "Culture-dependent isolate from RM"],
  ["RM-AM", "Raw Milk (Aanthmile)", "Raw milk from Aanthmile farm", "Enterococcus",     "genus", "Culture-dependent isolate from RM"],
  ["RM-AM", "Raw Milk (Aanthmile)", "Raw milk from Aanthmile farm", "Bacillus",         "genus", "Environmental bacteria from RM"],
  ["RM-AM", "Raw Milk (Aanthmile)", "Raw milk from Aanthmile farm", "Staphylococcus",   "genus", "Environmental bacteria from RM"],
  ["RM-AM", "Raw Milk (Aanthmile)", "Raw milk from Aanthmile farm", "Acetobacter",      "genus", "Environmental bacteria from RM"],
  ["RM-AM", "Raw Milk (Aanthmile)", "Raw milk from Aanthmile farm", "Chryseobacterium", "genus", "Environmental bacteria from RM"],
  ["RM-AM", "Raw Milk (Aanthmile)", "Raw milk from Aanthmile farm", "Streptococcus",    "genus", "Environmental bacteria from RM"],
  ["RM-AM", "Raw Milk (Aanthmile)", "Raw milk from Aanthmile farm", "Acinetobacter",    "genus", "Environmental bacteria from RM"],
  ["RM-AM", "Raw Milk (Aanthmile)", "Raw milk from Aanthmile farm", "Kocuria",          "genus", "Environmental bacteria from RM"],
  ["RM-AM", "Raw Milk (Aanthmile)", "Raw milk from Aanthmile farm", "Klebsiella",       "genus", "Environmental bacteria from RM"],
  ["RM-AM", "Raw Milk (Aanthmile)", "Raw milk from Aanthmile farm", "Macrococcus",      "genus", "Environmental bacteria from RM"],
  // NGS phyla (pooled across all samples)
  ["ALL", "Assam Dairy Products (pooled)", "Pooled dataset across all samples and farms", "Firmicutes",    "phylum", "Major phylum by NGS"],
  ["ALL", "Assam Dairy Products (pooled)", "Pooled dataset across all samples and farms", "Proteobacteria","phylum", "Major phylum by NGS"],
  ["ALL", "Assam Dairy Products (pooled)", "Pooled dataset across all samples and farms", "Bacteroidetes", "phylum", "Major phylum by NGS"],
  ["ALL", "Assam Dairy Products (pooled)", "Pooled dataset across all samples and farms", "Actinobacteria","phylum", "Major phylum by NGS"],
  // Genera significantly higher in BM vs RM (p<0.05)
  ["BM-ALL", "Boiled Milk (pooled)", "Pooled boiled milk across farms", "Prevotella",           "genus", "Significantly higher in BM vs RM (p<0.05)"],
  ["BM-ALL", "Boiled Milk (pooled)", "Pooled boiled milk across farms", "Oscillospira",         "genus", "Significantly higher in BM vs RM (p<0.05)"],
  ["BM-ALL", "Boiled Milk (pooled)", "Pooled boiled milk across farms", "Phascolarctobacterium","genus", "Significantly higher in BM vs RM (p<0.05)"],
  ["BM-ALL", "Boiled Milk (pooled)", "Pooled boiled milk across farms", "Akkermansia",          "genus", "Significantly higher in BM vs RM (p<0.05); next-generation beneficial microbe"],
  ["BM-ALL", "Boiled Milk (pooled)", "Pooled boiled milk across farms", "Georgenia",            "genus", "Significantly higher in BM vs RM (p<0.05)"],
  ["BM-ALL", "Boiled Milk (pooled)", "Pooled boiled milk across farms", "Xylanimicrobium",      "genus", "Significantly higher in BM vs RM (p<0.05)"],
  ["BM-ALL", "Boiled Milk (pooled)", "Pooled boiled milk across farms", "Paludibacter",         "genus", "Significantly higher in BM vs RM (p<0.05)"],
  ["BM-ALL", "Boiled Milk (pooled)", "Pooled boiled milk across farms", "Jeotgalicoccus",       "genus", "Significantly higher in BM vs RM (p<0.05)"],
  ["BM-ALL", "Boiled Milk (pooled)", "Pooled boiled milk across farms", "Dorea",                "genus", "Significantly higher in BM vs RM (p<0.05)"],
  ["BM-ALL", "Boiled Milk (pooled)", "Pooled boiled milk across farms", "Hylemonella",          "genus", "Significantly higher in BM vs RM (p<0.05)"],
  ["BM-ALL", "Boiled Milk (pooled)", "Pooled boiled milk across farms", "Acrobacter",           "genus", "Significantly higher in BM vs RM (p<0.05)"],
  ["BM-ALL", "Boiled Milk (pooled)", "Pooled boiled milk across farms", "Sphingobacterium",     "genus", "Significantly higher in BM vs RM (p<0.05)"],
  // Genera significantly higher in RMC vs BMC (p<0.05)
  ["RMC-ALL", "Raw Milk Curd (pooled)", "Pooled raw milk curd across farms", "Corynebacterium",  "genus", "Significantly higher in RMC vs BMC (p<0.05)"],
  ["RMC-ALL", "Raw Milk Curd (pooled)", "Pooled raw milk curd across farms", "Kocuria",          "genus", "Significantly higher in RMC vs BMC (p<0.05)"],
  ["RMC-ALL", "Raw Milk Curd (pooled)", "Pooled raw milk curd across farms", "Sphingobacterium", "genus", "Significantly higher in RMC vs BMC (p<0.05)"],
  ["RMC-ALL", "Raw Milk Curd (pooled)", "Pooled raw milk curd across farms", "Salinicoccus",     "genus", "Significantly higher in RMC vs BMC (p<0.05)"],
  ["RMC-ALL", "Raw Milk Curd (pooled)", "Pooled raw milk curd across farms", "Sphingomonas",     "genus", "Significantly higher in RMC vs BMC (p<0.05)"],
  ["RMC-ALL", "Raw Milk Curd (pooled)", "Pooled raw milk curd across farms", "Comamonas",        "genus", "Significantly higher in RMC vs BMC (p<0.05)"],
  ["RMC-ALL", "Raw Milk Curd (pooled)", "Pooled raw milk curd across farms", "Enhydrobacter",    "genus", "Significantly higher in RMC vs BMC (p<0.05)"],
  ["RMC-ALL", "Raw Milk Curd (pooled)", "Pooled raw milk curd across farms", "Pseudomonas",      "genus", "Significantly higher in RMC vs BMC (p<0.05)"],
  // Oligotypes (species-level, from oligotyping pipeline)
  ["RMC-ALL",  "Raw Milk Curd (pooled)",     "Pooled raw milk curd across farms",               "Lactobacillus delbrueckii",        "species", "Dominant oligotype in Aanthmile RMC"],
  ["RMC-ALL",  "Raw Milk Curd (pooled)",     "Pooled raw milk curd across farms",               "Lactobacillus paracasei",          "species", "Dominant oligotype in Jagiroad and Pathgaon RMC"],
  ["RMC-ALL",  "Raw Milk Curd (pooled)",     "Pooled raw milk curd across farms",               "Lactobacillus brevis",             "species", "Dominant oligotype in Jagiroad and Pathgaon RMC; non-starter LAB with probiotic properties"],
  ["BMC-ALL",  "Boiled Milk Curd (pooled)",  "Pooled boiled milk curd across farms",            "Lactobacillus fermentum",          "species", "Dominant oligotype in Aanthmile BMC"],
  ["ALL-CURD", "Curd (pooled RMC+BMC)",      "Pooled curd samples across both types and farms", "Leuconostoc pseudomesenteroides",  "species", "Dominant oligotype in both RMC and BMC across all three farms"],
  ["ALL-CURD", "Curd (pooled RMC+BMC)",      "Pooled curd samples across both types and farms", "Lactococcus lactis subsp. cremoris","species","Most dominant oligotype in both RMC and BMC across all three farms"],
  // Culture-dependent species
  ["BMC-AM", "Boiled Milk Curd (Aanthmile)", "Curd from boiled milk, Aanthmile, back slopping", "Staphylococcus sciuri",           "species", "Isolated from both BM and BMC of Aanthmile; heat-tolerant"],
  ["BMC-PG", "Boiled Milk Curd (Pathgaon)",  "Curd from boiled milk, Pathgaon, back slopping",  "Corynebacterium nuruki",          "species", "Isolated from BMC of Pathgaon"],
  ["BM-PG",  "Boiled Milk (Pathgaon)",       "Boiled milk from Pathgaon farm",                  "Corynebacterium ureicelerivorans","species", "Isolated from BM of Pathgaon"],
];

// Build bacterial_composition from Table 1
const bacterial_composition = [];
for (const [genus, ...vals] of T1) {
  for (let i = 0; i < SAMPLE_COLS.length; i++) {
    const v = vals[i];
    if (v === 0) continue;
    const [sample_code, food_name, description] = SAMPLE_COLS[i];
    bacterial_composition.push({
      sample_code, food_name, description,
      taxon_name: genus, reported_rank: "genus",
      relative_abundance: v, is_dominant: v > 10,
      measurement_type: "relative_abundance",
      notes: `Table 1 genus in ${sample_code}`,
    });
  }
}
// Append presence-only entries
for (const [sample_code, food_name, description, taxon_name, reported_rank, notes] of PRESENCE) {
  bacterial_composition.push({
    sample_code, food_name, description,
    taxon_name, reported_rank,
    relative_abundance: null, is_dominant: false,
    measurement_type: "presence_only", notes,
  });
}

// Common sequencing additional_info fields
const seqInfo = (pipeline = "QIIME v1.9.1, MG-RAST", db = "SILVA 128") => ({
  dna_extraction_kit: "Sambrook et al. (1989) protocol (phenol-chloroform method)",
  primers: "V3-V4 region primers",
  read_type: "2 x 300 bp paired-end",
  sequencing_facility: "Macrogen (Seoul, Korea)",
  bioinformatics_pipeline: pipeline,
  database: db,
  otu_clustering: "97% OTU threshold",
  classifier: "QIIME (SILVA 128)",
});
const ACCESSION = "MG-RAST (details in Supplementary Table S1)";

export default {
  source_paper: {
    title: "Bacterial diversity and metabolite profiles of curd prepared by natural fermentation of raw milk and back sloping of boiled milk",
    authors: "Tulsi K. Joishy, Madhusmita Dehingia, Mojibur R. Khan",
    journal: "World Journal of Microbiology and Biotechnology",
    year: 2019,
    doi: "10.1007/s11274-019-2677-y",
    link: "https://doi.org/10.1007/s11274-019-2677-y",
  },
  sequencing_methods: [
    { method_name: "16S rRNA amplicon sequencing", platform: "Illumina MiSeq", target_region: "V3-V4" },
  ],
  samples: [
    // ── Raw Milk ──────────────────────────────────────────────────────────────
    { sample_code: "RM-AM", food_name: "Raw Milk (Aanthmile)",     description: "Raw milk collected from Aanthmile farm, Assam, India; no heat treatment applied",  raw_material: "Raw cow milk", location: "Aanthmile, Assam, India",  collection_day: "Fresh collection; processed within 3-4h", replicates: "Triplicates", accession_id: ACCESSION, additional_info: { fermentation_type: "none (raw milk)", ...seqInfo() } },
    { sample_code: "RM-JR", food_name: "Raw Milk (Jagiroad)",      description: "Raw milk collected from Jagiroad farm, Assam, India; no heat treatment applied",   raw_material: "Raw cow milk", location: "Jagiroad, Assam, India",   collection_day: "Fresh collection; processed within 3-4h", replicates: "Triplicates", accession_id: ACCESSION, additional_info: { fermentation_type: "none (raw milk)", ...seqInfo() } },
    { sample_code: "RM-PG", food_name: "Raw Milk (Pathgaon)",      description: "Raw milk collected from Pathgaon farm, Assam, India; no heat treatment applied",   raw_material: "Raw cow milk", location: "Pathgaon, Assam, India",   collection_day: "Fresh collection; processed within 3-4h", replicates: "Triplicates", accession_id: ACCESSION, additional_info: { fermentation_type: "none (raw milk)", ...seqInfo() } },
    // ── Boiled Milk ───────────────────────────────────────────────────────────
    { sample_code: "BM-AM", food_name: "Boiled Milk (Aanthmile)",  description: "Boiled milk from Aanthmile farm; milk boiled at 100°C for 10 min", raw_material: "Boiled cow milk (100°C for 10 min)", location: "Aanthmile, Assam, India",  collection_day: "Fresh collection after boiling; processed within 3-4h", replicates: "Triplicates", accession_id: ACCESSION, additional_info: { fermentation_type: "none (boiled milk)", ...seqInfo() } },
    { sample_code: "BM-JR", food_name: "Boiled Milk (Jagiroad)",   description: "Boiled milk from Jagiroad farm; milk boiled at 100°C for 10 min",  raw_material: "Boiled cow milk (100°C for 10 min)", location: "Jagiroad, Assam, India",   collection_day: "Fresh collection after boiling; processed within 3-4h", replicates: "Triplicates", accession_id: ACCESSION, additional_info: { fermentation_type: "none (boiled milk)", ...seqInfo() } },
    { sample_code: "BM-PG", food_name: "Boiled Milk (Pathgaon)",   description: "Boiled milk from Pathgaon farm; milk boiled at 100°C for 10 min",  raw_material: "Boiled cow milk (100°C for 10 min)", location: "Pathgaon, Assam, India",   collection_day: "Fresh collection after boiling; processed within 3-4h", replicates: "Triplicates", accession_id: ACCESSION, additional_info: { fermentation_type: "none (boiled milk)", ...seqInfo() } },
    // ── Raw Milk Curd (spontaneous) ───────────────────────────────────────────
    { sample_code: "RMC-AM", food_name: "Raw Milk Curd (Aanthmile)", description: "Curd prepared from raw milk by natural fermentation at room temperature (25-30°C) without starter culture, from Aanthmile farm",  raw_material: "Raw cow milk, naturally fermented", location: "Aanthmile, Assam, India",  collection_day: "Natural fermentation at RT (25-30°C) without starter culture", replicates: "Triplicates", accession_id: ACCESSION, additional_info: { fermentation_type: "spontaneous (natural fermentation)", ...seqInfo("QIIME v1.9.1, MG-RAST, oligotyping pipeline v2.2", "SILVA 128, NCBI (for oligotyping BLAST)") } },
    { sample_code: "RMC-JR", food_name: "Raw Milk Curd (Jagiroad)",  description: "Curd prepared from raw milk by natural fermentation at room temperature (25-30°C) without starter culture, from Jagiroad farm",   raw_material: "Raw cow milk, naturally fermented", location: "Jagiroad, Assam, India",   collection_day: "Natural fermentation at RT (25-30°C) without starter culture", replicates: "Triplicates", accession_id: ACCESSION, additional_info: { fermentation_type: "spontaneous (natural fermentation)", ...seqInfo("QIIME v1.9.1, MG-RAST, oligotyping pipeline v2.2", "SILVA 128, NCBI (for oligotyping BLAST)") } },
    { sample_code: "RMC-PG", food_name: "Raw Milk Curd (Pathgaon)",  description: "Curd prepared from raw milk by natural fermentation at room temperature (25-30°C) without starter culture, from Pathgaon farm",   raw_material: "Raw cow milk, naturally fermented", location: "Pathgaon, Assam, India",   collection_day: "Natural fermentation at RT (25-30°C) without starter culture", replicates: "Triplicates", accession_id: ACCESSION, additional_info: { fermentation_type: "spontaneous (natural fermentation)", ...seqInfo("QIIME v1.9.1, MG-RAST, oligotyping pipeline v2.2", "SILVA 128, NCBI (for oligotyping BLAST)") } },
    // ── Boiled Milk Curd (back slopping) ─────────────────────────────────────
    { sample_code: "BMC-AM", food_name: "Boiled Milk Curd (Aanthmile)", description: "Curd prepared from boiled milk using back slopping technique (inoculum from previous batch) for 48h, from Aanthmile farm",  raw_material: "Boiled cow milk (100°C for 10 min), back slopped", location: "Aanthmile, Assam, India",  collection_day: "Back slopping fermentation for 48h after adding inoculum from previous batch", replicates: "Triplicates", accession_id: ACCESSION, additional_info: { fermentation_type: "back slopping", ...seqInfo("QIIME v1.9.1, MG-RAST, oligotyping pipeline v2.2", "SILVA 128, NCBI (for oligotyping BLAST)") } },
    { sample_code: "BMC-JR", food_name: "Boiled Milk Curd (Jagiroad)",  description: "Curd prepared from boiled milk using back slopping technique (inoculum from previous batch) for 48h, from Jagiroad farm",   raw_material: "Boiled cow milk (100°C for 10 min), back slopped", location: "Jagiroad, Assam, India",   collection_day: "Back slopping fermentation for 48h after adding inoculum from previous batch", replicates: "Triplicates", accession_id: ACCESSION, additional_info: { fermentation_type: "back slopping", ...seqInfo("QIIME v1.9.1, MG-RAST, oligotyping pipeline v2.2", "SILVA 128, NCBI (for oligotyping BLAST)") } },
    { sample_code: "BMC-PG", food_name: "Boiled Milk Curd (Pathgaon)",  description: "Curd prepared from boiled milk using back slopping technique (inoculum from previous batch) for 48h, from Pathgaon farm",   raw_material: "Boiled cow milk (100°C for 10 min), back slopped", location: "Pathgaon, Assam, India",   collection_day: "Back slopping fermentation for 48h after adding inoculum from previous batch", replicates: "Triplicates", accession_id: ACCESSION, additional_info: { fermentation_type: "back slopping", ...seqInfo("QIIME v1.9.1, MG-RAST, oligotyping pipeline v2.2", "SILVA 128, NCBI (for oligotyping BLAST)") } },
    // ── Pooled virtual samples (referenced in bacterial_composition) ──────────
    { sample_code: "ALL",      food_name: "Assam Dairy Products (pooled)", description: "Pooled dataset across all samples and farms (Joishy et al., 2019)",              raw_material: "Raw and boiled cow milk; raw milk curd; back-slopped boiled milk curd", location: "Assam, India", collection_day: "Pooled", replicates: "Pooled triplicates", accession_id: ACCESSION, additional_info: { fermentation_type: "pooled (various)" } },
    { sample_code: "BM-ALL",   food_name: "Boiled Milk (pooled)",          description: "Pooled boiled milk samples across all three farms",                               raw_material: "Boiled cow milk (100°C for 10 min)", location: "Assam, India", collection_day: "Pooled across farms", replicates: "Pooled triplicates", accession_id: ACCESSION, additional_info: { fermentation_type: "none (boiled milk, pooled)" } },
    { sample_code: "RMC-ALL",  food_name: "Raw Milk Curd (pooled)",        description: "Pooled raw milk curd samples across all three farms",                            raw_material: "Raw cow milk, naturally fermented", location: "Assam, India", collection_day: "Pooled across farms", replicates: "Pooled triplicates", accession_id: ACCESSION, additional_info: { fermentation_type: "spontaneous (natural fermentation, pooled)" } },
    { sample_code: "BMC-ALL",  food_name: "Boiled Milk Curd (pooled)",     description: "Pooled boiled milk curd samples across all three farms",                         raw_material: "Boiled cow milk, back slopped", location: "Assam, India", collection_day: "Pooled across farms", replicates: "Pooled triplicates", accession_id: ACCESSION, additional_info: { fermentation_type: "back slopping (pooled)" } },
    { sample_code: "ALL-CURD", food_name: "Curd (pooled RMC+BMC)",         description: "Pooled curd samples across both raw milk curd and boiled milk curd types and all three farms", raw_material: "Raw and boiled cow milk, fermented", location: "Assam, India", collection_day: "Pooled across types and farms", replicates: "Pooled triplicates", accession_id: ACCESSION, additional_info: { fermentation_type: "spontaneous and back slopping (pooled)" } },
  ],
  taxonomy_list: [
    // Phyla
    { name: "Firmicutes",       rank: "phylum", reported_rank: "Phylum" },
    { name: "Proteobacteria",   rank: "phylum", reported_rank: "Phylum" },
    { name: "Bacteroidetes",    rank: "phylum", reported_rank: "Phylum" },
    { name: "Actinobacteria",   rank: "phylum", reported_rank: "Phylum" },
    { name: "Verrucomicrobia",  rank: "phylum", reported_rank: "Phylum" },
    // Families
    { name: "Micrococcaceae",     rank: "family", reported_rank: "Family" },
    { name: "Staphylococcaceae",  rank: "family", reported_rank: "Family" },
    { name: "Enterococcaceae",    rank: "family", reported_rank: "Family" },
    { name: "Streptococcaceae",   rank: "family", reported_rank: "Family" },
    { name: "Enterobacteriaceae", rank: "family", reported_rank: "Family" },
    { name: "Leuconostocaceae",   rank: "family", reported_rank: "Family" },
    { name: "Weeksellaceae",      rank: "family", reported_rank: "Family" },
    { name: "Moraxellaceae",      rank: "family", reported_rank: "Family" },
    { name: "Bacillaceae",        rank: "family", reported_rank: "Family" },
    { name: "Planococcaceae",     rank: "family", reported_rank: "Family" },
    { name: "Aerococcaceae",      rank: "family", reported_rank: "Family" },
    { name: "Xanthomonadaceae",   rank: "family", reported_rank: "Family" },
    { name: "Comamonadaceae",     rank: "family", reported_rank: "Family" },
    { name: "Lactobacillaceae",   rank: "family", reported_rank: "Family" },
    { name: "Pseudomonadaceae",   rank: "family", reported_rank: "Family" },
    { name: "Acetobacteraceae",   rank: "family", reported_rank: "Family" },
    { name: "Bifidobacteriaceae", rank: "family", reported_rank: "Family" },
    { name: "Clostridiaceae",     rank: "family", reported_rank: "Family" },
    { name: "Ruminococcaceae",    rank: "family", reported_rank: "Family" },
    // Genera
    { name: "Lactococcus",           rank: "genus", reported_rank: "Genus" },
    { name: "Enterococcus",          rank: "genus", reported_rank: "Genus" },
    { name: "Lactobacillus",         rank: "genus", reported_rank: "Genus" },
    { name: "Leuconostoc",           rank: "genus", reported_rank: "Genus" },
    { name: "Bacillus",              rank: "genus", reported_rank: "Genus" },
    { name: "Staphylococcus",        rank: "genus", reported_rank: "Genus" },
    { name: "Acetobacter",           rank: "genus", reported_rank: "Genus" },
    { name: "Chryseobacterium",      rank: "genus", reported_rank: "Genus" },
    { name: "Streptococcus",         rank: "genus", reported_rank: "Genus" },
    { name: "Acinetobacter",         rank: "genus", reported_rank: "Genus" },
    { name: "Kocuria",               rank: "genus", reported_rank: "Genus" },
    { name: "Klebsiella",            rank: "genus", reported_rank: "Genus" },
    { name: "Macrococcus",           rank: "genus", reported_rank: "Genus" },
    { name: "Prevotella",            rank: "genus", reported_rank: "Genus" },
    { name: "Oscillospira",          rank: "genus", reported_rank: "Genus" },
    { name: "Phascolarctobacterium", rank: "genus", reported_rank: "Genus" },
    { name: "Akkermansia",           rank: "genus", reported_rank: "Genus" },
    { name: "Georgenia",             rank: "genus", reported_rank: "Genus" },
    { name: "Xylanimicrobium",       rank: "genus", reported_rank: "Genus" },
    { name: "Paludibacter",          rank: "genus", reported_rank: "Genus" },
    { name: "Jeotgalicoccus",        rank: "genus", reported_rank: "Genus" },
    { name: "Dorea",                 rank: "genus", reported_rank: "Genus" },
    { name: "Hylemonella",           rank: "genus", reported_rank: "Genus" },
    { name: "Acrobacter",            rank: "genus", reported_rank: "Genus" },
    { name: "Sphingobacterium",      rank: "genus", reported_rank: "Genus" },
    { name: "Escherichia",           rank: "genus", reported_rank: "Genus" },
    { name: "Corynebacterium",       rank: "genus", reported_rank: "Genus" },
    { name: "Salinicoccus",          rank: "genus", reported_rank: "Genus" },
    { name: "Sphingomonas",          rank: "genus", reported_rank: "Genus" },
    { name: "Comamonas",             rank: "genus", reported_rank: "Genus" },
    { name: "Enhydrobacter",         rank: "genus", reported_rank: "Genus" },
    { name: "Pseudomonas",           rank: "genus", reported_rank: "Genus" },
    { name: "Pediococcus",           rank: "genus", reported_rank: "Genus" },
    { name: "Aerococcus",            rank: "genus", reported_rank: "Genus" },
    { name: "Ruminococcus",          rank: "genus", reported_rank: "Genus" },
    { name: "Paracoccus",            rank: "genus", reported_rank: "Genus" },
    { name: "Brachybacterium",       rank: "genus", reported_rank: "Genus" },
    { name: "Micrococcus",           rank: "genus", reported_rank: "Genus" },
    { name: "Stenotrophomonas",      rank: "genus", reported_rank: "Genus" },
    // Species
    { name: "Lactobacillus delbrueckii",         rank: "species", reported_rank: "Species" },
    { name: "Lactobacillus paracasei",           rank: "species", reported_rank: "Species" },
    { name: "Lactobacillus brevis",              rank: "species", reported_rank: "Species" },
    { name: "Lactobacillus fermentum",           rank: "species", reported_rank: "Species" },
    { name: "Leuconostoc pseudomesenteroides",   rank: "species", reported_rank: "Species" },
    { name: "Lactococcus lactis subsp. cremoris",rank: "species", reported_rank: "Species" },
    { name: "Streptococcus thermophilus",        rank: "species", reported_rank: "Species" },
    { name: "Enterococcus faecium",              rank: "species", reported_rank: "Species" },
    { name: "Leuconostoc mesenteroides",         rank: "species", reported_rank: "Species" },
    { name: "Staphylococcus sciuri",             rank: "species", reported_rank: "Species" },
    { name: "Corynebacterium ureicelerivorans",  rank: "species", reported_rank: "Species" },
    { name: "Corynebacterium nuruki",            rank: "species", reported_rank: "Species" },
  ],
  bacterial_composition,
};