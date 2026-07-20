// ── Shangpliang et al. 2018 ──────────────────────────────────────────────────
// "Bacterial community in naturally fermented milk products of Arunachal Pradesh
//  and Sikkim of India analysed by high-throughput amplicon sequencing"
// Scientific Reports, 2018. DOI: 10.1038/s41598-018-19524-6
// ─────────────────────────────────────────────────────────────────────────────
// High-throughput Illumina MiSeq amplicon sequencing (V4-V5 region) of 54
// naturally fermented milk (NFM) product samples: chhurpi (n=21), churkam (n=15),
// gheu/mar (n=14), and dahi (n=4) from Arunachal Pradesh and Sikkim.
// ─────────────────────────────────────────────────────────────────────────────

const ACCESSION = "MG-RAST ID 4732361 to 4732414";
const COMMON_INFO = {
  fermentation_type: "spontaneous fermentation and back-sloping method",
  dna_extraction_kit: "Keisam et al. (2016) sodium citrate/bead-beating method for casein samples; petroleum ether:hexane (1:1) fat-dissolving method for gheu/mar",
  primers: "F563-577 (5'-AYTGGGYDTAAAGNG-3') / R924-907 (5'-CCGTCAATTCMTTTRAGT-3') with 8bp barcode",
  read_type: "Illumina MiSeq 2x300 bp paired-end; 7,614,683 post-filtering sequences across 54 samples",
  sequencing_facility: "NGS facility at Xcelris Genomics (Ahmedabad, India)",
  bioinformatics_pipeline: "QIIME v1.8.0, MG-RAST server, Canoco v4.52 (PCA), PAST v2.17 (ANOSIM Bray-Curtis), BoxPlotR",
  database: "SILVA SSU database via MG-RAST",
  otu_clustering: "OTU clustering via MG-RAST SILVA SSU pipeline; rarefied at depth 50 to 6482 sequences/sample",
  classifier: "MG-RAST taxonomy assignment with SILVA SSU database",
};

// 54 Samples tuple: [code, product, animal, state, district, location, altitude, pH]
const RAW_SAMPLES = [
  // Chhurpi (Soft cottage cheese-like)
  ["Ch1Cc", "Chhurpi", "Cow", "Arunachal Pradesh", "Tawang", "Cheghar", 1705, 5.32],
  ["Ch1Sc", "Chhurpi", "Cow", "Arunachal Pradesh", "Tawang", "Samchin", 1650, 5.32],
  ["Ch1Tc", "Chhurpi", "Cow", "Arunachal Pradesh", "Tawang", "Tawang", 2587, 5.33],
  ["Ch2Bc", "Chhurpi", "Cow", "Arunachal Pradesh", "West Kameng", "Dirang", 2095, 5.35],
  ["Ch2Tc", "Chhurpi", "Cow", "Arunachal Pradesh", "Tawang", "Tawang", 2587, 5.32],
  ["Ch6Bc", "Chhurpi", "Cow", "Arunachal Pradesh", "West Kameng", "Bomdila", 2339, 5.33],
  ["SCCD",  "Chhurpi", "Cow", "Sikkim", "West Sikkim", "Dentam", 1500, 6.05],
  ["SCCLG", "Chhurpi", "Cow", "Sikkim", "South Sikkim", "Lingee", 1370, 6.03],
  ["SCCNT", "Chhurpi", "Cow", "Sikkim", "East Sikkim", "Nimtar", 619, 5.89],
  ["SCCPK", "Chhurpi", "Cow", "Sikkim", "East Sikkim", "Pakyong", 1120, 6.03],
  ["SCCS",  "Chhurpi", "Cow", "Sikkim", "East Sikkim", "Singtam", 381, 5.89],
  ["SCCTH", "Chhurpi", "Cow", "Sikkim", "West Sikkim", "Thingling", 1780, 5.89],
  ["SC1CYG","Chhurpi", "Cow", "Sikkim", "South Sikkim", "Yangang", 1370, 6.11],
  ["Ch1By", "Chhurpi", "Yak", "Arunachal Pradesh", "West Kameng", "Dirang", 2061, 5.42],
  ["Ch3Ty", "Chhurpi", "Yak", "Arunachal Pradesh", "Tawang", "Tawang", 2587, 5.35],
  ["Ch4Ty", "Chhurpi", "Yak", "Arunachal Pradesh", "Tawang", "Tawang", 2587, 5.41],
  ["Ch5By", "Chhurpi", "Yak", "Arunachal Pradesh", "West Kameng", "Bomdila", 2340, 5.42],
  ["SC1YYS","Chhurpi", "Yak", "Sikkim", "North Sikkim", "Yumesamdong", 4878, 5.87],
  ["SC2YYS","Chhurpi", "Yak", "Sikkim", "North Sikkim", "Yumesamdong", 4878, 5.88],
  ["SC3YYS","Chhurpi", "Yak", "Sikkim", "North Sikkim", "Yumesamdong", 4878, 5.89],
  ["SC4YYS","Chhurpi", "Yak", "Sikkim", "North Sikkim", "Yumesamdong", 4878, 5.90],

  // Churkam (Hard dehydrated cheese)
  ["Ck1Bc", "Churkam", "Cow", "Arunachal Pradesh", "West Kameng", "Bomdila", 2339, 5.71],
  ["Ck1Kc", "Churkam", "Cow", "Arunachal Pradesh", "Tawang", "Kudung", 1695, 5.71],
  ["Ck1Sc", "Churkam", "Cow", "Arunachal Pradesh", "Tawang", "Samchin", 1650, 5.72],
  ["Ck1Tc", "Churkam", "Cow", "Arunachal Pradesh", "Tawang", "Tawang", 2587, 5.71],
  ["Ck2Bc", "Churkam", "Cow", "Arunachal Pradesh", "West Kameng", "Bomdila", 2339, 5.72],
  ["Ck2Kc", "Churkam", "Cow", "Arunachal Pradesh", "Tawang", "Kudung", 1695, 5.73],
  ["Ck2Sc", "Churkam", "Cow", "Arunachal Pradesh", "Tawang", "Samchin", 1650, 5.72],
  ["Ck3Kc", "Churkam", "Cow", "Arunachal Pradesh", "Tawang", "Kudung", 1695, 5.72],
  ["Ck3Sc", "Churkam", "Cow", "Arunachal Pradesh", "Tawang", "Samchin", 1650, 5.72],
  ["Ck4Bc", "Churkam", "Cow", "Arunachal Pradesh", "West Kameng", "Dirang", 2095, 5.74],
  ["Ck4Sc", "Churkam", "Cow", "Arunachal Pradesh", "Tawang", "Samchin", 1650, 5.71],
  ["DCCLA", "Churkam", "Cow", "Sikkim", "North Sikkim", "Lachung", 2700, 6.34],
  ["Ck1Ty", "Churkam", "Yak", "Arunachal Pradesh", "Tawang", "Tawang", 2587, 5.82],
  ["Ck5By", "Churkam", "Yak", "Arunachal Pradesh", "West Kameng", "Bomdila", 2340, 5.82],
  ["Ck6By", "Churkam", "Yak", "Arunachal Pradesh", "West Kameng", "Bomdila", 2340, 5.87],

  // Gheu / Mar (Crude butter)
  ["Gh1Bc", "Gheu/Mar", "Cow", "Arunachal Pradesh", "West Kameng", "Dirang", 2088, 6.53],
  ["Gh3Kc", "Gheu/Mar", "Cow", "Arunachal Pradesh", "Tawang", "Kudung", 1695, 6.52],
  ["Gh3Sc", "Gheu/Mar", "Cow", "Arunachal Pradesh", "Tawang", "Samchin", 1650, 6.52],
  ["Gh4Cc", "Gheu/Mar", "Cow", "Arunachal Pradesh", "Tawang", "Cheghar", 1705, 6.55],
  ["Gh5Bc", "Gheu/Mar", "Cow", "Arunachal Pradesh", "West Kameng", "Dirang", 2095, 6.53],
  ["Gh5Tc", "Gheu/Mar", "Cow", "Arunachal Pradesh", "Tawang", "Tawang", 2587, 6.55],
  ["Gh7Bc", "Gheu/Mar", "Cow", "Arunachal Pradesh", "West Kameng", "Bomdila", 2339, 6.53],
  ["Gh2By", "Gheu/Mar", "Yak", "Arunachal Pradesh", "West Kameng", "Bomdila", 2339, 6.62],
  ["Gh2Ty", "Gheu/Mar", "Yak", "Arunachal Pradesh", "Tawang", "Tawang", 2587, 6.62],
  ["Gh4By", "Gheu/Mar", "Yak", "Arunachal Pradesh", "West Kameng", "Dirang", 2102, 6.56],
  ["Gh6Ty", "Gheu/Mar", "Yak", "Arunachal Pradesh", "Tawang", "Tawang", 2587, 6.61],
  ["GH1YYS","Gheu/Mar", "Yak", "Sikkim", "North Sikkim", "Yumesamdong", 4878, 6.62],
  ["GH2YYS","Gheu/Mar", "Yak", "Sikkim", "North Sikkim", "Yumesamdong", 4878, 6.63],
  ["GH3YYS","Gheu/Mar", "Yak", "Sikkim", "North Sikkim", "Yumesamdong", 4878, 6.63],

  // Dahi (Fermented milk / curd)
  ["DHCLA", "Dahi", "Cow", "Sikkim", "North Sikkim", "Lachung", 2700, 4.14],
  ["DHCT",  "Dahi", "Cow", "Sikkim", "East Sikkim", "Tadong", 1649, 4.23],
  ["DHCTH", "Dahi", "Cow", "Sikkim", "West Sikkim", "Thingling", 1780, 4.12],
  ["DHYYS", "Dahi", "Yak", "Sikkim", "North Sikkim", "Yumesamdong", 4878, 4.33],
];

// Product level pooled summary samples
const PRODUCT_POOLED = [
  ["ALL",      "Naturally Fermented Milk (pooled)", "Pooled dataset across all 54 samples of chhurpi, churkam, gheu/mar and dahi"],
  ["CHHURPI",  "Chhurpi (pooled soft cheese)",      "Pooled dataset of 21 cottage cheese-like soft chhurpi samples from AP and Sikkim"],
  ["CHURKAM",  "Churkam (pooled hard cheese)",      "Pooled dataset of 15 hard masticatory churkam samples from AP and Sikkim"],
  ["GHEU_MAR", "Gheu/Mar (pooled crude butter)",    "Pooled dataset of 14 crude butter gheu/mar samples from AP and Sikkim"],
  ["DAHI",     "Dahi (pooled fermented milk)",      "Pooled dataset of 4 dahi (curd) samples from Sikkim"],
];

// Relative abundance entries for overall pooled ALL sample
const COMP_ALL = [
  // Dominant Species
  ["Lactococcus lactis",        "species", 19.7, true,  "Predominant lactic acid bacterium across NFM products"],
  ["Lactobacillus helveticus",  "species",  9.6, true,  "Predominant lactobacillus species; high in churkam"],
  ["Leuconostoc mesenteroides", "species",  4.5, false, "Predominant in dahi samples"],
  ["Acetobacter lovaniensis",   "species",  5.8, false, "Predominant acetic acid bacterium in gheu/mar"],
  ["Acetobacter pasteurianus",  "species",  5.7, false, "Predominant acetic acid bacterium in gheu/mar"],
  ["Gluconobacter oxydans",     "species",  5.3, false, "Predominant acetic acid bacterium in gheu/mar"],
  ["Acetobacter syzygii",       "species",  4.8, false, "Acetic acid bacterium present in NFM products"],
  // Major Families
  ["Acetobacteraceae",  "family", 26.8, true,  "Predominant family overall; highest in crude butter (gheu/mar)"],
  ["Streptococcaceae",  "family", 24.2, true,  "Predominant LAB family overall; highest in chhurpi and dahi"],
  ["Lactobacillaceae",  "family", 16.8, true,  "Major LAB family; builds up in churkam"],
  ["Leuconostocaceae",  "family",  8.0, false, "Major LAB family; prominent in dahi"],
  ["Staphylococcaceae", "family",  6.8, false, "Present at minor abundance across samples"],
  ["Pseudomonadaceae",  "family",  3.3, false, "Present as environmental contaminant in NFM products"],
  ["Bacillaceae",       "family",  1.6, false, "Minor component of NFM microbiota"],
  ["Clostridiaceae",    "family",  1.3, false, "Minor component; significant difference between chhurpi and churkam (p=0.0004)"],
  ["Enterobacteriaceae","family",  1.2, false, "Minor handling/environmental contaminant in NFM products"],
  // Genera
  ["Lactococcus",     "genus", 19.7, true,  "Dominant LAB genus across products"],
  ["Acetobacter",     "genus", 16.3, true,  "Dominant AAB genus, especially in gheu/mar"],
  ["Lactobacillus",   "genus",  9.6, true,  "Dominant in churkam"],
  ["Gluconobacter",   "genus",  5.3, false, "Predominant AAB genus in gheu/mar"],
  ["Leuconostoc",     "genus",  4.5, false, "Predominant in dahi"],
  ["Staphylococcus",  "genus",  6.8, false, "Minor contributor across products"],
  ["Pseudomonas",     "genus",  3.3, false, "Minor contaminant (e.g. Pseudomonas fluorescens)"],
  ["Bacillus",        "genus",  1.6, false, "Minor component"],
  ["Clostridium",     "genus",  1.3, false, "Minor component (e.g. Clostridium tyrobutyricum)"],
  ["Enterococcus",    "genus",  0.4, false, "Present below 0.5% (Enterococcus faecium, E. faecalis)"],
  ["Streptococcus",   "genus",  0.1, false, "Streptococcus thermophilus present below 0.1%"],
];

// Product-specific composition highlights
const COMP_PRODUCT = [
  // Chhurpi
  ["CHHURPI", "Lactococcus lactis",       "species", 22.0, true,  "Predominant LAB species in soft chhurpi"],
  ["CHHURPI", "Streptococcaceae",         "family",  30.0, true,  "Dominant family in chhurpi"],
  ["CHHURPI", "Lactobacillus helveticus", "species",  7.0, false, "Secondary LAB species in chhurpi"],
  // Churkam
  ["CHURKAM", "Lactobacillus helveticus", "species", 25.0, true,  "Predominant species in dehydrated hard churkam"],
  ["CHURKAM", "Lactobacillaceae",         "family",  32.0, true,  "Dominant family build-up during extended churkam fermentation"],
  ["CHURKAM", "Lactococcus lactis",       "species", 15.0, true,  "Co-dominant LAB species in churkam"],
  // Gheu/Mar
  ["GHEU_MAR","Acetobacteraceae",         "family",  45.0, true,  "Predominant family in crude butter (gheu/mar) prior to heating"],
  ["GHEU_MAR","Acetobacter lovaniensis",  "species", 12.0, true,  "Major acetic acid bacterium in gheu/mar"],
  ["GHEU_MAR","Acetobacter pasteurianus", "species", 11.0, true,  "Major acetic acid bacterium in gheu/mar"],
  ["GHEU_MAR","Gluconobacter oxydans",    "species", 10.0, true,  "Major acetic acid bacterium in gheu/mar"],
  // Dahi
  ["DAHI",    "Leuconostoc mesenteroides","species", 20.0, true,  "Predominant species in dahi samples"],
  ["DAHI",    "Lactococcus lactis",       "species", 18.0, true,  "Co-dominant LAB species in dahi"],
  ["DAHI",    "Leuconostocaceae",         "family",  22.0, true,  "Dominant family in dahi"],
];

const bacterial_composition = [
  // Overall pooled ALL
  ...COMP_ALL.map(([taxon_name, reported_rank, relative_abundance, is_dominant, notes]) => ({
    sample_code: "ALL",
    food_name: "Naturally Fermented Milk (pooled)",
    description: "Pooled dataset across all 54 samples of NFM products from Arunachal Pradesh and Sikkim",
    taxon_name, reported_rank, relative_abundance, is_dominant,
    measurement_type: "relative_abundance", notes,
  })),
  // Product level pooled
  ...COMP_PRODUCT.map(([sample_code, taxon_name, reported_rank, relative_abundance, is_dominant, notes]) => ({
    sample_code,
    food_name: PRODUCT_POOLED.find(p => p[0] === sample_code)[1],
    description: PRODUCT_POOLED.find(p => p[0] === sample_code)[2],
    taxon_name, reported_rank, relative_abundance, is_dominant,
    measurement_type: "relative_abundance", notes,
  })),
];

export default {
  source_paper: {
    title: "Bacterial community in naturally fermented milk products of Arunachal Pradesh and Sikkim of India analysed by high-throughput amplicon sequencing",
    authors: "H. Nakibapher Jones Shangpliang, Ranjita Rai, Santosh Keisam, Kumaraswamy Jeyaram, Jyoti Prakash Tamang",
    journal: "Scientific Reports",
    year: 2018,
    doi: "10.1038/s41598-018-19524-6",
    link: "https://doi.org/10.1038/s41598-018-19524-6",
  },
  sequencing_methods: [
    { method_name: "16S rRNA amplicon sequencing", platform: "Illumina MiSeq (2 x 300 bp paired-end)", target_region: "V4-V5" },
  ],
  samples: [
    // 54 Individual samples
    ...RAW_SAMPLES.map(([sample_code, product, animal, state, district, location, altitude, pH]) => ({
      sample_code,
      food_name: `${product} (${animal} milk, ${location}, ${state})`,
      description: `Ethnic naturally fermented milk product (${product}) prepared from ${animal.toLowerCase()} milk in ${location}, ${district}, ${state}, India. Altitude: ${altitude} m, pH: ${pH}.`,
      raw_material: `${animal} milk (${animal === 'Cow' ? 'Bos taurus' : 'Bos grunniens'})`,
      location: `${location}, ${district}, ${state}, India`,
      collection_day: "Fermented milk product collected from traditional production centers",
      replicates: "Single sample collected in ice-box and stored at -20°C",
      accession_id: ACCESSION,
      additional_info: { ...COMMON_INFO, altitude_m: altitude, ph_value: pH, product_type: product, milk_source: animal },
    })),
    // 5 Product-level / overall pooled summary samples
    ...PRODUCT_POOLED.map(([sample_code, food_name, description]) => ({
      sample_code, food_name, description,
      raw_material: "Cow milk (Bos taurus) and Yak milk (Bos grunniens)",
      location: "Arunachal Pradesh and Sikkim, India",
      collection_day: "Pooled across samples",
      replicates: "Pooled dataset",
      accession_id: ACCESSION,
      additional_info: COMMON_INFO,
    })),
  ],
  taxonomy_list: [
    // Phyla
    { name: "Firmicutes",       rank: "phylum", reported_rank: "Phylum" },
    { name: "Proteobacteria",   rank: "phylum", reported_rank: "Phylum" },
    // Families
    { name: "Streptococcaceae",  rank: "family", reported_rank: "Family" },
    { name: "Lactobacillaceae",  rank: "family", reported_rank: "Family" },
    { name: "Leuconostocaceae",  rank: "family", reported_rank: "Family" },
    { name: "Staphylococcaceae", rank: "family", reported_rank: "Family" },
    { name: "Bacillaceae",       rank: "family", reported_rank: "Family" },
    { name: "Clostridiaceae",    rank: "family", reported_rank: "Family" },
    { name: "Acetobacteraceae",  rank: "family", reported_rank: "Family" },
    { name: "Pseudomonadaceae",  rank: "family", reported_rank: "Family" },
    { name: "Enterobacteriaceae",rank: "family", reported_rank: "Family" },
    // Genera
    { name: "Lactococcus",      rank: "genus", reported_rank: "Genus" },
    { name: "Lactobacillus",    rank: "genus", reported_rank: "Genus" },
    { name: "Leuconostoc",      rank: "genus", reported_rank: "Genus" },
    { name: "Acetobacter",      rank: "genus", reported_rank: "Genus" },
    { name: "Gluconobacter",    rank: "genus", reported_rank: "Genus" },
    { name: "Staphylococcus",   rank: "genus", reported_rank: "Genus" },
    { name: "Pseudomonas",      rank: "genus", reported_rank: "Genus" },
    { name: "Bacillus",         rank: "genus", reported_rank: "Genus" },
    { name: "Clostridium",      rank: "genus", reported_rank: "Genus" },
    { name: "Enterococcus",     rank: "genus", reported_rank: "Genus" },
    { name: "Streptococcus",    rank: "genus", reported_rank: "Genus" },
    // Species
    { name: "Lactococcus lactis",        rank: "species", reported_rank: "Species" },
    { name: "Lactobacillus helveticus",  rank: "species", reported_rank: "Species" },
    { name: "Leuconostoc mesenteroides", rank: "species", reported_rank: "Species" },
    { name: "Acetobacter lovaniensis",   rank: "species", reported_rank: "Species" },
    { name: "Acetobacter pasteurianus",  rank: "species", reported_rank: "Species" },
    { name: "Gluconobacter oxydans",     rank: "species", reported_rank: "Species" },
    { name: "Acetobacter syzygii",       rank: "species", reported_rank: "Species" },
    { name: "Pseudomonas fluorescens",   rank: "species", reported_rank: "Species" },
    { name: "Clostridium tyrobutyricum", rank: "species", reported_rank: "Species" },
    { name: "Enterococcus faecalis",     rank: "species", reported_rank: "Species" },
    { name: "Enterococcus faecium",      rank: "species", reported_rank: "Species" },
    { name: "Streptococcus thermophilus",rank: "species", reported_rank: "Species" },
    { name: "Staphylococcus cohnii",     rank: "species", reported_rank: "Species" },
  ],
  bacterial_composition,
};
