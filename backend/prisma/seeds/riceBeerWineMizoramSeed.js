export default {
  "source_paper": {
    "title": "Data on the microbial diversity of traditional rice beer (Zufang) and wine of Mizoram, Northeast India",
    "authors": "Benjamin Lalbiakmawia, Sowmya Pulapet, Sowmiya Kathir, R. Lalengkimi, Kesavan Markkandan, Michael V L Chhandama, Nachimuthu Senthil Kumar, John Zothanzama",
    "journal": "Data in Brief",
    "year": 2024,
    "doi": "10.1016/j.dib.2024.110932",
    "link": "https://doi.org/10.1016/j.dib.2024.110932"
  },
  "sequencing_methods": [
    {
      "method_name": "16S rRNA amplicon sequencing",
      "platform": "Illumina NovaSeq 6000",
      "target_region": "V3-V4"
    }
  ],
  "samples": [
    {
      "sample_code": "B1",
      "food_name": "Zufang (rice beer - B1)",
      "description": "Fermented rice beer (Zufang) sample B1 from Aizawl, Mizoram",
      "raw_material": "Mizo sticky rice (buhban), Oryza sativa var. kawng lawng",
      "location": "Aizawl, Mizoram, India (23°43′38″N 92°43′04″E)",
      "collection_day": "Fermented 3-4 days (summer, August, ~30°C ambient temperature)",
      "replicates": "Single sample from one brewery location",
      "accession_id": "PRJNA1008667, SRX21467461",
      "additional_info": {
        "fermentation_type": "Spontaneous fermentation with commercial starter yeast (Saccharomyces cerevisiae, chawl) imported from Myanmar",
        "dna_extraction_kit": "Modified method from ONEOMICS PRIVATE LIMITED, Tiruchirappalli, Tamil Nadu, India",
        "primers": "341F: CCTAYGGGRBGCASCAG and 806R: GGACTACNNGGGTATCTAAT",
        "read_type": "250 bp paired-end",
        "sequencing_facility": "ONEOMICS PRIVATE LIMITED, Tiruchirappalli, Tamil Nadu, India",
        "bioinformatics_pipeline": "QIIME2 v2020.2, Deblur algorithm, q2-feature-classifier",
        "database": "SILVA v132",
        "otu_clustering": "Deblur algorithm (ASVs)",
        "classifier": "Trained Naïve Bayes classifier (q2-feature-classifier)",
        "raw_reads": 110632,
        "sequences_bp": 27658000,
        "gc_percent": 51,
        "q30_score": 33.2
      }
    },
    {
      "sample_code": "C1",
      "food_name": "Zufang (rice beer - C1)",
      "description": "Fermented rice beer (Zufang) sample C1 from Aizawl, Mizoram (used regular Indian rice instead of sticky rice)",
      "raw_material": "Regular normal rice of Indian variety",
      "location": "Aizawl, Mizoram, India (23°43′38″N 92°43′04″E)",
      "collection_day": "Fermented 3-4 days (summer, August, ~30°C ambient temperature)",
      "replicates": "Single sample from second brewery location",
      "accession_id": "PRJNA1008667, SRX21467462",
      "additional_info": {
        "fermentation_type": "Spontaneous fermentation with commercial starter yeast (Saccharomyces cerevisiae, chawl) imported from Myanmar",
        "dna_extraction_kit": "Modified method from ONEOMICS PRIVATE LIMITED, Tiruchirappalli, Tamil Nadu, India",
        "primers": "341F: CCTAYGGGRBGCASCAG and 806R: GGACTACNNGGGTATCTAAT",
        "read_type": "250 bp paired-end",
        "sequencing_facility": "ONEOMICS PRIVATE LIMITED, Tiruchirappalli, Tamil Nadu, India",
        "bioinformatics_pipeline": "QIIME2 v2020.2, Deblur algorithm, q2-feature-classifier",
        "database": "SILVA v132",
        "otu_clustering": "Deblur algorithm (ASVs)",
        "classifier": "Trained Naïve Bayes classifier (q2-feature-classifier)",
        "raw_reads": 230398,
        "sequences_bp": 57599500,
        "gc_percent": 52,
        "q30_score": 31.4
      }
    },
    {
      "sample_code": "D1",
      "food_name": "Isabella wine (grape wine)",
      "description": "Fermented grape wine (Isabella) from Mizoram",
      "raw_material": "Vitis labrusca (Isabella grapes) grown locally in Mizoram",
      "location": "Aizawl, Mizoram, India (23°43′38″N 92°43′04″E)",
      "collection_day": "Fermented about 1 week",
      "replicates": "Single sample purchased from local market",
      "accession_id": "PRJNA1008667, SRX21467463",
      "additional_info": {
        "fermentation_type": "Controlled fermentation with added Saccharomyces cerevisiae yeast in stainless-steel fermenter; sugar added to increase Brix value from ~14; timed punch downs during fermentation",
        "dna_extraction_kit": "Modified method from ONEOMICS PRIVATE LIMITED, Tiruchirappalli, Tamil Nadu, India",
        "primers": "341F: CCTAYGGGRBGCASCAG and 806R: GGACTACNNGGGTATCTAAT",
        "read_type": "250 bp paired-end",
        "sequencing_facility": "ONEOMICS PRIVATE LIMITED, Tiruchirappalli, Tamil Nadu, India",
        "bioinformatics_pipeline": "QIIME2 v2020.2, Deblur algorithm, q2-feature-classifier",
        "database": "SILVA v132",
        "otu_clustering": "Deblur algorithm (ASVs)",
        "classifier": "Trained Naïve Bayes classifier (q2-feature-classifier)",
        "raw_reads": 123796,
        "sequences_bp": 30949000,
        "gc_percent": 53,
        "q30_score": 31.3
      }
    }
  ],
  "taxonomy_list": [
    {
      "name": "Firmicutes",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Bacteroidetes",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Actinobacteria",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Proteobacteria",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Others",
      "rank": "unknown",
      "reported_rank": "Phylum"
    },
    {
      "name": "Bacilli",
      "rank": "class",
      "reported_rank": "Class"
    },
    {
      "name": "Clostridia",
      "rank": "class",
      "reported_rank": "Class"
    },
    {
      "name": "Bacteroidia",
      "rank": "class",
      "reported_rank": "Class"
    },
    {
      "name": "Actinobacteria",
      "rank": "class",
      "reported_rank": "Class"
    },
    {
      "name": "Gammaproteobacteria",
      "rank": "class",
      "reported_rank": "Class"
    },
    {
      "name": "Alphaproteobacteria",
      "rank": "class",
      "reported_rank": "Class"
    },
    {
      "name": "Lactobacillales",
      "rank": "order",
      "reported_rank": "Order"
    },
    {
      "name": "Bacillales",
      "rank": "order",
      "reported_rank": "Order"
    },
    {
      "name": "Clostridiales",
      "rank": "order",
      "reported_rank": "Order"
    },
    {
      "name": "Bacteroidales",
      "rank": "order",
      "reported_rank": "Order"
    },
    {
      "name": "Actinomycetales",
      "rank": "order",
      "reported_rank": "Order"
    },
    {
      "name": "Enterobacterales",
      "rank": "order",
      "reported_rank": "Order"
    },
    {
      "name": "Pseudomonadales",
      "rank": "order",
      "reported_rank": "Order"
    },
    {
      "name": "Rhodospirillales",
      "rank": "order",
      "reported_rank": "Order"
    },
    {
      "name": "Rhizobiales",
      "rank": "order",
      "reported_rank": "Order"
    },
    {
      "name": "Burkholderiales",
      "rank": "order",
      "reported_rank": "Order"
    },
    {
      "name": "Xanthomonadales",
      "rank": "order",
      "reported_rank": "Order"
    },
    {
      "name": "Caulobacterales",
      "rank": "order",
      "reported_rank": "Order"
    },
    {
      "name": "Sphingomonadales",
      "rank": "order",
      "reported_rank": "Order"
    },
    {
      "name": "Lactobacillaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Bacillaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Clostridiaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Bacteroidaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Actinomycetaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Enterobacteriaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Pseudomonadaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Acetobacteraceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Burkholderiaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Xanthomonadaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Caulobacteraceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Sphingomonadaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Lactobacillus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Bacillus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Clostridium",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Bacteroides",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Actinomyces",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Enterobacter",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Pseudomonas",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Acetobacter",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Gluconobacter",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Burkholderia",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Stenotrophomonas",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Caulobacter",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Sphingomonas",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Weissella",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Pediococcus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Leuconostoc",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Lactococcus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Streptococcus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Bacillus subtilis",
      "rank": "species",
      "reported_rank": "Species"
    }
  ],
  "bacterial_composition": [
    {
      "sample_code": "B1",
      "food_name": "Zufang (rice beer - B1)",
      "description": "Fermented rice beer sample B1 from Aizawl, Mizoram",
      "taxon_name": "Firmicutes",
      "reported_rank": "phylum",
      "relative_abundance": null,
      "is_dominant": true,
      "measurement_type": "presence_only",
      "notes": "Prominent phylum in B1; dominant bacterial phylum"
    },
    {
      "sample_code": "B1",
      "food_name": "Zufang (rice beer - B1)",
      "description": "Fermented rice beer sample B1 from Aizawl, Mizoram",
      "taxon_name": "Bacteroidetes",
      "reported_rank": "phylum",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "<0.50% of reads"
    },
    {
      "sample_code": "B1",
      "food_name": "Zufang (rice beer - B1)",
      "description": "Fermented rice beer sample B1 from Aizawl, Mizoram",
      "taxon_name": "Actinobacteria",
      "reported_rank": "phylum",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "<0.50% of reads"
    },
    {
      "sample_code": "B1",
      "food_name": "Zufang (rice beer - B1)",
      "description": "Fermented rice beer sample B1 from Aizawl, Mizoram",
      "taxon_name": "Lactobacillales",
      "reported_rank": "order",
      "relative_abundance": null,
      "is_dominant": true,
      "measurement_type": "presence_only",
      "notes": "Only order with >99% relative abundance in all three samples"
    },
    {
      "sample_code": "B1",
      "food_name": "Zufang (rice beer - B1)",
      "description": "Fermented rice beer sample B1 from Aizawl, Mizoram",
      "taxon_name": "Lactobacillus",
      "reported_rank": "genus",
      "relative_abundance": 44.0,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Most abundant genus in B1 rice beer sample"
    },
    {
      "sample_code": "B1",
      "food_name": "Zufang (rice beer - B1)",
      "description": "Fermented rice beer sample B1 from Aizawl, Mizoram",
      "taxon_name": "Bacillus",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Present; Bacillus subtilis identified - produces enzymes that hydrolyse complex carbohydrates"
    },
    {
      "sample_code": "B1",
      "food_name": "Zufang (rice beer - B1)",
      "description": "Fermented rice beer sample B1 from Aizawl, Mizoram",
      "taxon_name": "Bacillus subtilis",
      "reported_rank": "species",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Identified in rice beer; produces enzymes that hydrolyse complex carbohydrates into simple sugars, facilitating fermentation"
    },
    {
      "sample_code": "C1",
      "food_name": "Zufang (rice beer - C1)",
      "description": "Fermented rice beer sample C1 from Aizawl, Mizoram (regular Indian rice variety)",
      "taxon_name": "Firmicutes",
      "reported_rank": "phylum",
      "relative_abundance": null,
      "is_dominant": true,
      "measurement_type": "presence_only",
      "notes": "Prominent phylum in C1; dominant bacterial phylum"
    },
    {
      "sample_code": "C1",
      "food_name": "Zufang (rice beer - C1)",
      "description": "Fermented rice beer sample C1 from Aizawl, Mizoram (regular Indian rice variety)",
      "taxon_name": "Bacteroidetes",
      "reported_rank": "phylum",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "<0.50% of reads"
    },
    {
      "sample_code": "C1",
      "food_name": "Zufang (rice beer - C1)",
      "description": "Fermented rice beer sample C1 from Aizawl, Mizoram (regular Indian rice variety)",
      "taxon_name": "Actinobacteria",
      "reported_rank": "phylum",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "<0.50% of reads"
    },
    {
      "sample_code": "C1",
      "food_name": "Zufang (rice beer - C1)",
      "description": "Fermented rice beer sample C1 from Aizawl, Mizoram (regular Indian rice variety)",
      "taxon_name": "Lactobacillales",
      "reported_rank": "order",
      "relative_abundance": null,
      "is_dominant": true,
      "measurement_type": "presence_only",
      "notes": "Only order with >99% relative abundance in all three samples"
    },
    {
      "sample_code": "C1",
      "food_name": "Zufang (rice beer - C1)",
      "description": "Fermented rice beer sample C1 from Aizawl, Mizoram (regular Indian rice variety)",
      "taxon_name": "Lactobacillus",
      "reported_rank": "genus",
      "relative_abundance": 38.0,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Most abundant genus in C1 rice beer sample"
    },
    {
      "sample_code": "C1",
      "food_name": "Zufang (rice beer - C1)",
      "description": "Fermented rice beer sample C1 from Aizawl, Mizoram (regular Indian rice variety)",
      "taxon_name": "Bacillus",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Present; Bacillus subtilis identified"
    },
    {
      "sample_code": "C1",
      "food_name": "Zufang (rice beer - C1)",
      "description": "Fermented rice beer sample C1 from Aizawl, Mizoram (regular Indian rice variety)",
      "taxon_name": "Bacillus subtilis",
      "reported_rank": "species",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Identified in rice beer; produces enzymes that hydrolyse complex carbohydrates"
    },
    {
      "sample_code": "D1",
      "food_name": "Isabella wine (grape wine)",
      "description": "Fermented grape wine (Isabella) from Mizoram",
      "taxon_name": "Firmicutes",
      "reported_rank": "phylum",
      "relative_abundance": null,
      "is_dominant": true,
      "measurement_type": "presence_only",
      "notes": "Prominent phylum in D1; dominant bacterial phylum"
    },
    {
      "sample_code": "D1",
      "food_name": "Isabella wine (grape wine)",
      "description": "Fermented grape wine (Isabella) from Mizoram",
      "taxon_name": "Bacteroidetes",
      "reported_rank": "phylum",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "<0.50% of reads"
    },
    {
      "sample_code": "D1",
      "food_name": "Isabella wine (grape wine)",
      "description": "Fermented grape wine (Isabella) from Mizoram",
      "taxon_name": "Actinobacteria",
      "reported_rank": "phylum",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "<0.50% of reads"
    },
    {
      "sample_code": "D1",
      "food_name": "Isabella wine (grape wine)",
      "description": "Fermented grape wine (Isabella) from Mizoram",
      "taxon_name": "Lactobacillales",
      "reported_rank": "order",
      "relative_abundance": null,
      "is_dominant": true,
      "measurement_type": "presence_only",
      "notes": "Only order with >99% relative abundance in all three samples"
    },
    {
      "sample_code": "D1",
      "food_name": "Isabella wine (grape wine)",
      "description": "Fermented grape wine (Isabella) from Mizoram",
      "taxon_name": "Lactobacillus",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Present but less abundant compared to rice beer samples"
    },
    {
      "sample_code": "D1",
      "food_name": "Isabella wine (grape wine)",
      "description": "Fermented grape wine (Isabella) from Mizoram",
      "taxon_name": "Bacillus",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Present in wine sample"
    },
    {
      "sample_code": "ALL",
      "food_name": "Mizoram rice beer & wine (pooled)",
      "description": "Combined data across B1, C1, and D1 samples",
      "taxon_name": "Firmicutes",
      "reported_rank": "phylum",
      "relative_abundance": null,
      "is_dominant": true,
      "measurement_type": "presence_only",
      "notes": "Prominent in all three samples; 5 phyla detected total"
    },
    {
      "sample_code": "ALL",
      "food_name": "Mizoram rice beer & wine (pooled)",
      "description": "Combined data across B1, C1, and D1 samples",
      "taxon_name": "Bacteroidetes",
      "reported_rank": "phylum",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "<0.50% of reads in all samples"
    },
    {
      "sample_code": "ALL",
      "food_name": "Mizoram rice beer & wine (pooled)",
      "description": "Combined data across B1, C1, and D1 samples",
      "taxon_name": "Actinobacteria",
      "reported_rank": "phylum",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "<0.50% of reads in all samples"
    },
    {
      "sample_code": "ALL",
      "food_name": "Mizoram rice beer & wine (pooled)",
      "description": "Combined data across B1, C1, and D1 samples",
      "taxon_name": "Proteobacteria",
      "reported_rank": "phylum",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "<0.50% of reads in all samples"
    },
    {
      "sample_code": "ALL",
      "food_name": "Mizoram rice beer & wine (pooled)",
      "description": "Combined data across B1, C1, and D1 samples",
      "taxon_name": "Lactobacillales",
      "reported_rank": "order",
      "relative_abundance": null,
      "is_dominant": true,
      "measurement_type": "presence_only",
      "notes": "Only order with >99% relative abundance; 14 orders recorded total"
    },
    {
      "sample_code": "ALL",
      "food_name": "Mizoram rice beer & wine (pooled)",
      "description": "Combined data across B1, C1, and D1 samples",
      "taxon_name": "Lactobacillus",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": true,
      "measurement_type": "presence_only",
      "notes": "Abundant in rice beer samples (B1: 44%, C1: 38%); 21 genera detected total; most abundant genus overall"
    },
    {
      "sample_code": "ALL",
      "food_name": "Mizoram rice beer & wine (pooled)",
      "description": "Combined data across B1, C1, and D1 samples",
      "taxon_name": "Bacillus",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Present in all samples; Bacillus subtilis produces enzymes for carbohydrate hydrolysis"
    },
    {
      "sample_code": "ALL",
      "food_name": "Mizoram rice beer & wine (pooled)",
      "description": "Combined data across B1, C1, and D1 samples",
      "taxon_name": "Weissella",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Detected in samples"
    },
    {
      "sample_code": "ALL",
      "food_name": "Mizoram rice beer & wine (pooled)",
      "description": "Combined data across B1, C1, and D1 samples",
      "taxon_name": "Pediococcus",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Detected in samples"
    },
    {
      "sample_code": "ALL",
      "food_name": "Mizoram rice beer & wine (pooled)",
      "description": "Combined data across B1, C1, and D1 samples",
      "taxon_name": "Leuconostoc",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Detected in samples"
    },
    {
      "sample_code": "ALL",
      "food_name": "Mizoram rice beer & wine (pooled)",
      "description": "Combined data across B1, C1, and D1 samples",
      "taxon_name": "Lactococcus",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Detected in samples"
    },
    {
      "sample_code": "ALL",
      "food_name": "Mizoram rice beer & wine (pooled)",
      "description": "Combined data across B1, C1, and D1 samples",
      "taxon_name": "Streptococcus",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Detected in samples"
    },
    {
      "sample_code": "ALL",
      "food_name": "Mizoram rice beer & wine (pooled)",
      "description": "Combined data across B1, C1, and D1 samples",
      "taxon_name": "Clostridium",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Detected in samples"
    },
    {
      "sample_code": "ALL",
      "food_name": "Mizoram rice beer & wine (pooled)",
      "description": "Combined data across B1, C1, and D1 samples",
      "taxon_name": "Bacteroides",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Detected in samples"
    },
    {
      "sample_code": "ALL",
      "food_name": "Mizoram rice beer & wine (pooled)",
      "description": "Combined data across B1, C1, and D1 samples",
      "taxon_name": "Actinomyces",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Detected in samples"
    },
    {
      "sample_code": "ALL",
      "food_name": "Mizoram rice beer & wine (pooled)",
      "description": "Combined data across B1, C1, and D1 samples",
      "taxon_name": "Enterobacter",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Detected in samples"
    },
    {
      "sample_code": "ALL",
      "food_name": "Mizoram rice beer & wine (pooled)",
      "description": "Combined data across B1, C1, and D1 samples",
      "taxon_name": "Pseudomonas",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Detected in samples"
    },
    {
      "sample_code": "ALL",
      "food_name": "Mizoram rice beer & wine (pooled)",
      "description": "Combined data across B1, C1, and D1 samples",
      "taxon_name": "Acetobacter",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Detected in samples"
    },
    {
      "sample_code": "ALL",
      "food_name": "Mizoram rice beer & wine (pooled)",
      "description": "Combined data across B1, C1, and D1 samples",
      "taxon_name": "Gluconobacter",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Detected in samples"
    },
    {
      "sample_code": "ALL",
      "food_name": "Mizoram rice beer & wine (pooled)",
      "description": "Combined data across B1, C1, and D1 samples",
      "taxon_name": "Burkholderia",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Detected in samples"
    },
    {
      "sample_code": "ALL",
      "food_name": "Mizoram rice beer & wine (pooled)",
      "description": "Combined data across B1, C1, and D1 samples",
      "taxon_name": "Stenotrophomonas",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Detected in samples"
    },
    {
      "sample_code": "ALL",
      "food_name": "Mizoram rice beer & wine (pooled)",
      "description": "Combined data across B1, C1, and D1 samples",
      "taxon_name": "Caulobacter",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Detected in samples"
    },
    {
      "sample_code": "ALL",
      "food_name": "Mizoram rice beer & wine (pooled)",
      "description": "Combined data across B1, C1, and D1 samples",
      "taxon_name": "Sphingomonas",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Detected in samples"
    },
    {
      "sample_code": "ALL",
      "food_name": "Mizoram rice beer & wine (pooled)",
      "description": "Combined data across B1, C1, and D1 samples",
      "taxon_name": "Bacillus subtilis",
      "reported_rank": "species",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Identified in rice beer; produces enzymes that hydrolyse complex carbohydrates into simple sugars, facilitating fermentation and enhancing nutrient availability"
    }
  ]
};
