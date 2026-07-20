export default {
  "source_paper" : {
    "title": "High-throughput sequence analysis of bacterial communities and their predictive functionalities in traditionally preserved fish products of Sikkim, India",
    "authors": "Meera Ongmu Bhutia, Namrata Thapa, H. Nakibapher Jones Shangpliang, Jyoti Prakash Tamang",
    "journal": "Food Research International",
    "year": 2021,
    "doi": "10.1016/j.foodres.2020.109885",
    "link": "https://doi.org/10.1016/j.foodres.2020.109885"
  },
  "sequencing_methods": [
    {
      "method_name": "16S rRNA amplicon sequencing",
      "platform": "Illumina MiSeq",
      "target_region": "V3-V4"
    }
  ],
  "samples": [
    {
      "sample_code": "SM1",
      "food_name": "Suka ko maacha",
      "description": "Smoked fish product (Suka ko maacha) - replicate 1",
      "raw_material": "Schizothorax spp.",
      "location": "Gangtok, Singtam, Namchi, Sikkim, India",
      "collection_day": "Not specified (final product)",
      "replicates": "Triplicates (SM1, SM2, SM3)",
      "accession_id": "PRJNA600094 (SRR10857170-SRR10857178)",
      "additional_info": {
        "fermentation_type": "Traditional smoking (7-10 days in kitchen earthen-oven)",
        "dna_extraction_kit": "Nucleospin Food kit (Macherey-Nagel GmbH & Co. KG)",
        "primers": "341F: 5'-GCCTACGGGNGGCWGCAG-3' and 785R: 5'-ACTACHVGGGTATCTAATCC-3'",
        "read_type": "2x 300 bp paired-end",
        "sequencing_facility": "Illumina-MiSeq platform",
        "bioinformatics_pipeline": "QIIME2 version 2019.10, FastQC, Trim Galore, PEAR, q2-quality-filter, q2-deblur denoise-16S, mafft, fasttree2",
        "database": "Greengenes 13_8_99% OTUs",
        "otu_clustering": "Deblur algorithm (sOTUs)",
        "classifier": "q2-feature-classifier classify-consensus-vsearch"
      }
    },
    {
      "sample_code": "SM2",
      "food_name": "Suka ko maacha",
      "description": "Smoked fish product (Suka ko maacha) - replicate 2",
      "raw_material": "Schizothorax spp.",
      "location": "Gangtok, Singtam, Namchi, Sikkim, India",
      "collection_day": "Not specified (final product)",
      "replicates": "Triplicates (SM1, SM2, SM3)",
      "accession_id": "PRJNA600094 (SRR10857170-SRR10857178)",
      "additional_info": {
        "fermentation_type": "Traditional smoking (7-10 days in kitchen earthen-oven)",
        "dna_extraction_kit": "Nucleospin Food kit (Macherey-Nagel GmbH & Co. KG)",
        "primers": "341F: 5'-GCCTACGGGNGGCWGCAG-3' and 785R: 5'-ACTACHVGGGTATCTAATCC-3'",
        "read_type": "2x 300 bp paired-end",
        "sequencing_facility": "Illumina-MiSeq platform",
        "bioinformatics_pipeline": "QIIME2 version 2019.10, FastQC, Trim Galore, PEAR, q2-quality-filter, q2-deblur denoise-16S, mafft, fasttree2",
        "database": "Greengenes 13_8_99% OTUs",
        "otu_clustering": "Deblur algorithm (sOTUs)",
        "classifier": "q2-feature-classifier classify-consensus-vsearch"
      }
    },
    {
      "sample_code": "SM3",
      "food_name": "Suka ko maacha",
      "description": "Smoked fish product (Suka ko maacha) - replicate 3",
      "raw_material": "Schizothorax spp.",
      "location": "Gangtok, Singtam, Namchi, Sikkim, India",
      "collection_day": "Not specified (final product)",
      "replicates": "Triplicates (SM1, SM2, SM3)",
      "accession_id": "PRJNA600094 (SRR10857170-SRR10857178)",
      "additional_info": {
        "fermentation_type": "Traditional smoking (7-10 days in kitchen earthen-oven)",
        "dna_extraction_kit": "Nucleospin Food kit (Macherey-Nagel GmbH & Co. KG)",
        "primers": "341F: 5'-GCCTACGGGNGGCWGCAG-3' and 785R: 5'-ACTACHVGGGTATCTAATCC-3'",
        "read_type": "2x 300 bp paired-end",
        "sequencing_facility": "Illumina-MiSeq platform",
        "bioinformatics_pipeline": "QIIME2 version 2019.10, FastQC, Trim Galore, PEAR, q2-quality-filter, q2-deblur denoise-16S, mafft, fasttree2",
        "database": "Greengenes 13_8_99% OTUs",
        "otu_clustering": "Deblur algorithm (sOTUs)",
        "classifier": "q2-feature-classifier classify-consensus-vsearch"
      }
    },
    {
      "sample_code": "SD1",
      "food_name": "Sidra",
      "description": "Sun-dried fish product (Sidra) - replicate 1",
      "raw_material": "Puntius sarana",
      "location": "Gangtok, Singtam, Namchi, Sikkim, India",
      "collection_day": "Not specified (final product)",
      "replicates": "Triplicates (SD1, SD2, SD3)",
      "accession_id": "PRJNA600094 (SRR10857170-SRR10857178)",
      "additional_info": {
        "fermentation_type": "Traditional sun-drying (4-7 days)",
        "dna_extraction_kit": "Nucleospin Food kit (Macherey-Nagel GmbH & Co. KG)",
        "primers": "341F: 5'-GCCTACGGGNGGCWGCAG-3' and 785R: 5'-ACTACHVGGGTATCTAATCC-3'",
        "read_type": "2x 300 bp paired-end",
        "sequencing_facility": "Illumina-MiSeq platform",
        "bioinformatics_pipeline": "QIIME2 version 2019.10, FastQC, Trim Galore, PEAR, q2-quality-filter, q2-deblur denoise-16S, mafft, fasttree2",
        "database": "Greengenes 13_8_99% OTUs",
        "otu_clustering": "Deblur algorithm (sOTUs)",
        "classifier": "q2-feature-classifier classify-consensus-vsearch"
      }
    },
    {
      "sample_code": "SD2",
      "food_name": "Sidra",
      "description": "Sun-dried fish product (Sidra) - replicate 2",
      "raw_material": "Puntius sarana",
      "location": "Gangtok, Singtam, Namchi, Sikkim, India",
      "collection_day": "Not specified (final product)",
      "replicates": "Triplicates (SD1, SD2, SD3)",
      "accession_id": "PRJNA600094 (SRR10857170-SRR10857178)",
      "additional_info": {
        "fermentation_type": "Traditional sun-drying (4-7 days)",
        "dna_extraction_kit": "Nucleospin Food kit (Macherey-Nagel GmbH & Co. KG)",
        "primers": "341F: 5'-GCCTACGGGNGGCWGCAG-3' and 785R: 5'-ACTACHVGGGTATCTAATCC-3'",
        "read_type": "2x 300 bp paired-end",
        "sequencing_facility": "Illumina-MiSeq platform",
        "bioinformatics_pipeline": "QIIME2 version 2019.10, FastQC, Trim Galore, PEAR, q2-quality-filter, q2-deblur denoise-16S, mafft, fasttree2",
        "database": "Greengenes 13_8_99% OTUs",
        "otu_clustering": "Deblur algorithm (sOTUs)",
        "classifier": "q2-feature-classifier classify-consensus-vsearch"
      }
    },
    {
      "sample_code": "SD3",
      "food_name": "Sidra",
      "description": "Sun-dried fish product (Sidra) - replicate 3",
      "raw_material": "Puntius sarana",
      "location": "Gangtok, Singtam, Namchi, Sikkim, India",
      "collection_day": "Not specified (final product)",
      "replicates": "Triplicates (SD1, SD2, SD3)",
      "accession_id": "PRJNA600094 (SRR10857170-SRR10857178)",
      "additional_info": {
        "fermentation_type": "Traditional sun-drying (4-7 days)",
        "dna_extraction_kit": "Nucleospin Food kit (Macherey-Nagel GmbH & Co. KG)",
        "primers": "341F: 5'-GCCTACGGGNGGCWGCAG-3' and 785R: 5'-ACTACHVGGGTATCTAATCC-3'",
        "read_type": "2x 300 bp paired-end",
        "sequencing_facility": "Illumina-MiSeq platform",
        "bioinformatics_pipeline": "QIIME2 version 2019.10, FastQC, Trim Galore, PEAR, q2-quality-filter, q2-deblur denoise-16S, mafft, fasttree2",
        "database": "Greengenes 13_8_99% OTUs",
        "otu_clustering": "Deblur algorithm (sOTUs)",
        "classifier": "q2-feature-classifier classify-consensus-vsearch"
      }
    },
    {
      "sample_code": "SK1",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - replicate 1",
      "raw_material": "Harpodon nehereus",
      "location": "Gangtok, Singtam, Namchi, Sikkim, India",
      "collection_day": "Not specified (final product)",
      "replicates": "Triplicates (SK1, SK2, SK3)",
      "accession_id": "PRJNA600094 (SRR10857170-SRR10857178)",
      "additional_info": {
        "fermentation_type": "Traditional sun-drying (4-7 days)",
        "dna_extraction_kit": "Nucleospin Food kit (Macherey-Nagel GmbH & Co. KG)",
        "primers": "341F: 5'-GCCTACGGGNGGCWGCAG-3' and 785R: 5'-ACTACHVGGGTATCTAATCC-3'",
        "read_type": "2x 300 bp paired-end",
        "sequencing_facility": "Illumina-MiSeq platform",
        "bioinformatics_pipeline": "QIIME2 version 2019.10, FastQC, Trim Galore, PEAR, q2-quality-filter, q2-deblur denoise-16S, mafft, fasttree2",
        "database": "Greengenes 13_8_99% OTUs",
        "otu_clustering": "Deblur algorithm (sOTUs)",
        "classifier": "q2-feature-classifier classify-consensus-vsearch"
      }
    },
    {
      "sample_code": "SK2",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - replicate 2",
      "raw_material": "Harpodon nehereus",
      "location": "Gangtok, Singtam, Namchi, Sikkim, India",
      "collection_day": "Not specified (final product)",
      "replicates": "Triplicates (SK1, SK2, SK3)",
      "accession_id": "PRJNA600094 (SRR10857170-SRR10857178)",
      "additional_info": {
        "fermentation_type": "Traditional sun-drying (4-7 days)",
        "dna_extraction_kit": "Nucleospin Food kit (Macherey-Nagel GmbH & Co. KG)",
        "primers": "341F: 5'-GCCTACGGGNGGCWGCAG-3' and 785R: 5'-ACTACHVGGGTATCTAATCC-3'",
        "read_type": "2x 300 bp paired-end",
        "sequencing_facility": "Illumina-MiSeq platform",
        "bioinformatics_pipeline": "QIIME2 version 2019.10, FastQC, Trim Galore, PEAR, q2-quality-filter, q2-deblur denoise-16S, mafft, fasttree2",
        "database": "Greengenes 13_8_99% OTUs",
        "otu_clustering": "Deblur algorithm (sOTUs)",
        "classifier": "q2-feature-classifier classify-consensus-vsearch"
      }
    },
    {
      "sample_code": "SK3",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - replicate 3",
      "raw_material": "Harpodon nehereus",
      "location": "Gangtok, Singtam, Namchi, Sikkim, India",
      "collection_day": "Not specified (final product)",
      "replicates": "Triplicates (SK1, SK2, SK3)",
      "accession_id": "PRJNA600094 (SRR10857170-SRR10857178)",
      "additional_info": {
        "fermentation_type": "Traditional sun-drying (4-7 days)",
        "dna_extraction_kit": "Nucleospin Food kit (Macherey-Nagel GmbH & Co. KG)",
        "primers": "341F: 5'-GCCTACGGGNGGCWGCAG-3' and 785R: 5'-ACTACHVGGGTATCTAATCC-3'",
        "read_type": "2x 300 bp paired-end",
        "sequencing_facility": "Illumina-MiSeq platform",
        "bioinformatics_pipeline": "QIIME2 version 2019.10, FastQC, Trim Galore, PEAR, q2-quality-filter, q2-deblur denoise-16S, mafft, fasttree2",
        "database": "Greengenes 13_8_99% OTUs",
        "otu_clustering": "Deblur algorithm (sOTUs)",
        "classifier": "q2-feature-classifier classify-consensus-vsearch"
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
      "name": "Proteobacteria",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Bacteroidetes",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Others",
      "rank": "unknown",
      "reported_rank": "Phylum"
    },
    {
      "name": "Moraxellaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Bacillaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Enterobacteriaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Staphylococcaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Clostridiaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Planococcaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Peptostreptococcaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Enterococcaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Pseudomonadaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Vibrionaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Flavobacteriaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Bartonellaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Alcaligenaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Halomonadaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Fusobacteriaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Tissierellaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Psychrobacter",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Bacillus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Staphylococcus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Serratia",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Clostridium",
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
      "name": "Rummeliibacillus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Enterococcus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Photobacterium",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Myroides",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Peptostreptococcus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Plesiomonas",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Achromobacter",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Acinetobacter",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Kushneria",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Cetobacterium",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Proteus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Oceanimonas",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Vagococcus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Vibrio",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Others",
      "rank": "unknown",
      "reported_rank": "Genus"
    }
  ],
  "bacterial_composition": [
    {
      "sample_code": "SM",
      "food_name": "Suka ko maacha",
      "description": "Smoked fish product (Suka ko maacha) - pooled replicates",
      "taxon_name": "Firmicutes",
      "reported_rank": "phylum",
      "relative_abundance": 65.9,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Most abundant phylum in Suka ko maacha"
    },
    {
      "sample_code": "SM",
      "food_name": "Suka ko maacha",
      "description": "Smoked fish product (Suka ko maacha) - pooled replicates",
      "taxon_name": "Proteobacteria",
      "reported_rank": "phylum",
      "relative_abundance": 33.56,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Second most abundant phylum in Suka ko maacha"
    },
    {
      "sample_code": "SM",
      "food_name": "Suka ko maacha",
      "description": "Smoked fish product (Suka ko maacha) - pooled replicates",
      "taxon_name": "Others",
      "reported_rank": "phylum",
      "relative_abundance": 0.54,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Phylum level Others category"
    },
    {
      "sample_code": "SM",
      "food_name": "Suka ko maacha",
      "description": "Smoked fish product (Suka ko maacha) - pooled replicates",
      "taxon_name": "Bacillaceae",
      "reported_rank": "family",
      "relative_abundance": 32.28,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Most abundant family in Suka ko maacha"
    },
    {
      "sample_code": "SM",
      "food_name": "Suka ko maacha",
      "description": "Smoked fish product (Suka ko maacha) - pooled replicates",
      "taxon_name": "Staphylococcaceae",
      "reported_rank": "family",
      "relative_abundance": 26.52,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Second most abundant family in Suka ko maacha"
    },
    {
      "sample_code": "SM",
      "food_name": "Suka ko maacha",
      "description": "Smoked fish product (Suka ko maacha) - pooled replicates",
      "taxon_name": "Enterobacteriaceae",
      "reported_rank": "family",
      "relative_abundance": 23.89,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Third most abundant family in Suka ko maacha"
    },
    {
      "sample_code": "SM",
      "food_name": "Suka ko maacha",
      "description": "Smoked fish product (Suka ko maacha) - pooled replicates",
      "taxon_name": "Enterococcaceae",
      "reported_rank": "family",
      "relative_abundance": 3.70,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Family level abundance"
    },
    {
      "sample_code": "SM",
      "food_name": "Suka ko maacha",
      "description": "Smoked fish product (Suka ko maacha) - pooled replicates",
      "taxon_name": "Alcaligenaceae",
      "reported_rank": "family",
      "relative_abundance": 2.68,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Family level abundance"
    },
    {
      "sample_code": "SM",
      "food_name": "Suka ko maacha",
      "description": "Smoked fish product (Suka ko maacha) - pooled replicates",
      "taxon_name": "Moraxellaceae",
      "reported_rank": "family",
      "relative_abundance": 2.56,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Family level abundance"
    },
    {
      "sample_code": "SM",
      "food_name": "Suka ko maacha",
      "description": "Smoked fish product (Suka ko maacha) - pooled replicates",
      "taxon_name": "Bartonellaceae",
      "reported_rank": "family",
      "relative_abundance": 2.22,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Family level abundance"
    },
    {
      "sample_code": "SM",
      "food_name": "Suka ko maacha",
      "description": "Smoked fish product (Suka ko maacha) - pooled replicates",
      "taxon_name": "Halomonadaceae",
      "reported_rank": "family",
      "relative_abundance": 1.68,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Family level abundance"
    },
    {
      "sample_code": "SM",
      "food_name": "Suka ko maacha",
      "description": "Smoked fish product (Suka ko maacha) - pooled replicates",
      "taxon_name": "Pseudomonadaceae",
      "reported_rank": "family",
      "relative_abundance": 1.08,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Family level abundance"
    },
    {
      "sample_code": "SM",
      "food_name": "Suka ko maacha",
      "description": "Smoked fish product (Suka ko maacha) - pooled replicates",
      "taxon_name": "Others",
      "reported_rank": "family",
      "relative_abundance": 3.39,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Family level Others category"
    },
    {
      "sample_code": "SM",
      "food_name": "Suka ko maacha",
      "description": "Smoked fish product (Suka ko maacha) - pooled replicates",
      "taxon_name": "Bacillus",
      "reported_rank": "genus",
      "relative_abundance": 32.62,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Most abundant genus in Suka ko maacha"
    },
    {
      "sample_code": "SM",
      "food_name": "Suka ko maacha",
      "description": "Smoked fish product (Suka ko maacha) - pooled replicates",
      "taxon_name": "Staphylococcus",
      "reported_rank": "genus",
      "relative_abundance": 28.33,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Second most abundant genus in Suka ko maacha"
    },
    {
      "sample_code": "SM",
      "food_name": "Suka ko maacha",
      "description": "Smoked fish product (Suka ko maacha) - pooled replicates",
      "taxon_name": "Serratia",
      "reported_rank": "genus",
      "relative_abundance": 23.07,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Third most abundant genus in Suka ko maacha"
    },
    {
      "sample_code": "SM",
      "food_name": "Suka ko maacha",
      "description": "Smoked fish product (Suka ko maacha) - pooled replicates",
      "taxon_name": "Enterococcus",
      "reported_rank": "genus",
      "relative_abundance": 3.7,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Genus level abundance"
    },
    {
      "sample_code": "SM",
      "food_name": "Suka ko maacha",
      "description": "Smoked fish product (Suka ko maacha) - pooled replicates",
      "taxon_name": "Achromobacter",
      "reported_rank": "genus",
      "relative_abundance": 2.7,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Genus level abundance"
    },
    {
      "sample_code": "SM",
      "food_name": "Suka ko maacha",
      "description": "Smoked fish product (Suka ko maacha) - pooled replicates",
      "taxon_name": "Kushneria",
      "reported_rank": "genus",
      "relative_abundance": 1.81,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Unique genus to Suka ko maacha"
    },
    {
      "sample_code": "SM",
      "food_name": "Suka ko maacha",
      "description": "Smoked fish product (Suka ko maacha) - pooled replicates",
      "taxon_name": "Psychrobacter",
      "reported_rank": "genus",
      "relative_abundance": 1.45,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Core genus shared among all products"
    },
    {
      "sample_code": "SM",
      "food_name": "Suka ko maacha",
      "description": "Smoked fish product (Suka ko maacha) - pooled replicates",
      "taxon_name": "Acinetobacter",
      "reported_rank": "genus",
      "relative_abundance": 1.23,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Unique genus to Suka ko maacha"
    },
    {
      "sample_code": "SM",
      "food_name": "Suka ko maacha",
      "description": "Smoked fish product (Suka ko maacha) - pooled replicates",
      "taxon_name": "Pseudomonas",
      "reported_rank": "genus",
      "relative_abundance": 1.11,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Genus level abundance"
    },
    {
      "sample_code": "SM",
      "food_name": "Suka ko maacha",
      "description": "Smoked fish product (Suka ko maacha) - pooled replicates",
      "taxon_name": "Others",
      "reported_rank": "genus",
      "relative_abundance": 3.98,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Genus level Others category"
    },
    {
      "sample_code": "SD",
      "food_name": "Sidra",
      "description": "Sun-dried fish product (Sidra) - pooled replicates",
      "taxon_name": "Firmicutes",
      "reported_rank": "phylum",
      "relative_abundance": 62.67,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Most abundant phylum in Sidra"
    },
    {
      "sample_code": "SD",
      "food_name": "Sidra",
      "description": "Sun-dried fish product (Sidra) - pooled replicates",
      "taxon_name": "Proteobacteria",
      "reported_rank": "phylum",
      "relative_abundance": 36.26,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Second most abundant phylum in Sidra"
    },
    {
      "sample_code": "SD",
      "food_name": "Sidra",
      "description": "Sun-dried fish product (Sidra) - pooled replicates",
      "taxon_name": "Others",
      "reported_rank": "phylum",
      "relative_abundance": 1.07,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Phylum level Others category"
    },
    {
      "sample_code": "SD",
      "food_name": "Sidra",
      "description": "Sun-dried fish product (Sidra) - pooled replicates",
      "taxon_name": "Bacillaceae",
      "reported_rank": "family",
      "relative_abundance": 30.42,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Most abundant family in Sidra"
    },
    {
      "sample_code": "SD",
      "food_name": "Sidra",
      "description": "Sun-dried fish product (Sidra) - pooled replicates",
      "taxon_name": "Enterobacteriaceae",
      "reported_rank": "family",
      "relative_abundance": 24.95,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Second most abundant family in Sidra"
    },
    {
      "sample_code": "SD",
      "food_name": "Sidra",
      "description": "Sun-dried fish product (Sidra) - pooled replicates",
      "taxon_name": "Clostridiaceae",
      "reported_rank": "family",
      "relative_abundance": 17.06,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Third most abundant family in Sidra"
    },
    {
      "sample_code": "SD",
      "food_name": "Sidra",
      "description": "Sun-dried fish product (Sidra) - pooled replicates",
      "taxon_name": "Moraxellaceae",
      "reported_rank": "family",
      "relative_abundance": 8.88,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Family level abundance"
    },
    {
      "sample_code": "SD",
      "food_name": "Sidra",
      "description": "Sun-dried fish product (Sidra) - pooled replicates",
      "taxon_name": "Peptostreptococcaceae",
      "reported_rank": "family",
      "relative_abundance": 6.65,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Family level abundance"
    },
    {
      "sample_code": "SD",
      "food_name": "Sidra",
      "description": "Sun-dried fish product (Sidra) - pooled replicates",
      "taxon_name": "Planococcaceae",
      "reported_rank": "family",
      "relative_abundance": 4.64,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Family level abundance"
    },
    {
      "sample_code": "SD",
      "food_name": "Sidra",
      "description": "Sun-dried fish product (Sidra) - pooled replicates",
      "taxon_name": "Enterococcaceae",
      "reported_rank": "family",
      "relative_abundance": 1.64,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Family level abundance"
    },
    {
      "sample_code": "SD",
      "food_name": "Sidra",
      "description": "Sun-dried fish product (Sidra) - pooled replicates",
      "taxon_name": "Others",
      "reported_rank": "family",
      "relative_abundance": 5.78,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Family level Others category"
    },
    {
      "sample_code": "SD",
      "food_name": "Sidra",
      "description": "Sun-dried fish product (Sidra) - pooled replicates",
      "taxon_name": "Bacillus",
      "reported_rank": "genus",
      "relative_abundance": 30.91,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Most abundant genus in Sidra"
    },
    {
      "sample_code": "SD",
      "food_name": "Sidra",
      "description": "Sun-dried fish product (Sidra) - pooled replicates",
      "taxon_name": "Clostridium",
      "reported_rank": "genus",
      "relative_abundance": 22.74,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Second most abundant genus in Sidra"
    },
    {
      "sample_code": "SD",
      "food_name": "Sidra",
      "description": "Sun-dried fish product (Sidra) - pooled replicates",
      "taxon_name": "Psychrobacter",
      "reported_rank": "genus",
      "relative_abundance": 11.96,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Core genus shared among all products"
    },
    {
      "sample_code": "SD",
      "food_name": "Sidra",
      "description": "Sun-dried fish product (Sidra) - pooled replicates",
      "taxon_name": "Enterobacter",
      "reported_rank": "genus",
      "relative_abundance": 9.28,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Genus level abundance"
    },
    {
      "sample_code": "SD",
      "food_name": "Sidra",
      "description": "Sun-dried fish product (Sidra) - pooled replicates",
      "taxon_name": "Rummeliibacillus",
      "reported_rank": "genus",
      "relative_abundance": 6.13,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Unique genus to Sidra"
    },
    {
      "sample_code": "SD",
      "food_name": "Sidra",
      "description": "Sun-dried fish product (Sidra) - pooled replicates",
      "taxon_name": "Plesiomonas",
      "reported_rank": "genus",
      "relative_abundance": 3.45,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Unique genus to Sidra"
    },
    {
      "sample_code": "SD",
      "food_name": "Sidra",
      "description": "Sun-dried fish product (Sidra) - pooled replicates",
      "taxon_name": "Enterococcus",
      "reported_rank": "genus",
      "relative_abundance": 2.12,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Shared genus between Suka ko maacha and Sidra"
    },
    {
      "sample_code": "SD",
      "food_name": "Sidra",
      "description": "Sun-dried fish product (Sidra) - pooled replicates",
      "taxon_name": "Others",
      "reported_rank": "genus",
      "relative_abundance": 7.61,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Genus level Others category"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Proteobacteria",
      "reported_rank": "phylum",
      "relative_abundance": 72.97,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Most abundant phylum in Sukuti"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Firmicutes",
      "reported_rank": "phylum",
      "relative_abundance": 20.84,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Second most abundant phylum in Sukuti"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Bacteroidetes",
      "reported_rank": "phylum",
      "relative_abundance": 3.93,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Third phylum in Sukuti"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Others",
      "reported_rank": "phylum",
      "relative_abundance": 2.25,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Phylum level Others category"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Moraxellaceae",
      "reported_rank": "family",
      "relative_abundance": 52.35,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Most abundant family in Sukuti"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Planococcaceae",
      "reported_rank": "family",
      "relative_abundance": 8.11,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Second most abundant family in Sukuti"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Pseudomonadaceae",
      "reported_rank": "family",
      "relative_abundance": 6.05,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Family level abundance"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Enterobacteriaceae",
      "reported_rank": "family",
      "relative_abundance": 5.79,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Family level abundance"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Peptostreptococcaceae",
      "reported_rank": "family",
      "relative_abundance": 4.37,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Family level abundance"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Vibrionaceae",
      "reported_rank": "family",
      "relative_abundance": 4.28,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Family level abundance"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Flavobacteriaceae",
      "reported_rank": "family",
      "relative_abundance": 3.71,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Family level abundance"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Staphylococcaceae",
      "reported_rank": "family",
      "relative_abundance": 2.32,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Family level abundance"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Enterococcaceae",
      "reported_rank": "family",
      "relative_abundance": 2.30,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Family level abundance"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Halomonadaceae",
      "reported_rank": "family",
      "relative_abundance": 2.08,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Family level abundance"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Fusobacteriaceae",
      "reported_rank": "family",
      "relative_abundance": 1.70,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Family level abundance"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Clostridiaceae",
      "reported_rank": "family",
      "relative_abundance": 1.68,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Family level abundance"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Tissierellaceae",
      "reported_rank": "family",
      "relative_abundance": 1.19,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Family level abundance"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Others",
      "reported_rank": "family",
      "relative_abundance": 4.06,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Family level Others category"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Psychrobacter",
      "reported_rank": "genus",
      "relative_abundance": 59.16,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Most abundant genus in Sukuti; core genus shared among all products; significantly higher in Sukuti"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Pseudomonas",
      "reported_rank": "genus",
      "relative_abundance": 7.57,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Genus level abundance"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Photobacterium",
      "reported_rank": "genus",
      "relative_abundance": 5.27,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Unique genus to Sukuti"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Myroides",
      "reported_rank": "genus",
      "relative_abundance": 4.64,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Unique genus to Sukuti"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Peptostreptococcus",
      "reported_rank": "genus",
      "relative_abundance": 4.63,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Unique genus to Sukuti"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Vagococcus",
      "reported_rank": "genus",
      "relative_abundance": 2.65,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Unique genus to Sukuti"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Oceanimonas",
      "reported_rank": "genus",
      "relative_abundance": 2.61,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Unique genus to Sukuti"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Staphylococcus",
      "reported_rank": "genus",
      "relative_abundance": 2.16,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Shared genus between Suka ko maacha and Sukuti"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Cetobacterium",
      "reported_rank": "genus",
      "relative_abundance": 2.02,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Unique genus to Sukuti"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Proteus",
      "reported_rank": "genus",
      "relative_abundance": 2.02,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Unique genus to Sukuti"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Vibrio",
      "reported_rank": "genus",
      "relative_abundance": 1.10,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Unique genus to Sukuti"
    },
    {
      "sample_code": "SK",
      "food_name": "Sukuti",
      "description": "Sun-dried fish product (Sukuti) - pooled replicates",
      "taxon_name": "Others",
      "reported_rank": "genus",
      "relative_abundance": 6.18,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Genus level Others category"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Firmicutes",
      "reported_rank": "phylum",
      "relative_abundance": 49.8,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Most abundant phylum overall; from Figure 2a heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Proteobacteria",
      "reported_rank": "phylum",
      "relative_abundance": 47.6,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Second most abundant phylum overall; from Figure 2a heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Bacteroidetes",
      "reported_rank": "phylum",
      "relative_abundance": 1.41,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "From Figure 2a heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Others",
      "reported_rank": "phylum",
      "relative_abundance": 1.19,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Phylum level Others category; from Figure 2a heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Moraxellaceae",
      "reported_rank": "family",
      "relative_abundance": 21.26,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Most abundant family overall; from Figure 2b heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Bacillaceae",
      "reported_rank": "family",
      "relative_abundance": 20.91,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Second most abundant family overall; from Figure 2b heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Enterobacteriaceae",
      "reported_rank": "family",
      "relative_abundance": 18.21,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "From Figure 2b heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Staphylococcaceae",
      "reported_rank": "family",
      "relative_abundance": 9.75,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "From Figure 2b heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Clostridiaceae",
      "reported_rank": "family",
      "relative_abundance": 6.25,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "From Figure 2b heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Planococcaceae",
      "reported_rank": "family",
      "relative_abundance": 4.35,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "From Figure 2b heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Peptostreptococcaceae",
      "reported_rank": "family",
      "relative_abundance": 3.69,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "From Figure 2b heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Enterococcaceae",
      "reported_rank": "family",
      "relative_abundance": 2.55,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "From Figure 2b heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Pseudomonadaceae",
      "reported_rank": "family",
      "relative_abundance": 2.48,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "From Figure 2b heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Vibrionaceae",
      "reported_rank": "family",
      "relative_abundance": 1.55,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "From Figure 2b heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Flavobacteriaceae",
      "reported_rank": "family",
      "relative_abundance": 1.26,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "From Figure 2b heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Bartonellaceae",
      "reported_rank": "family",
      "relative_abundance": 1.09,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "From Figure 2b heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Alcaligenaceae",
      "reported_rank": "family",
      "relative_abundance": 1.06,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "From Figure 2b heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Others",
      "reported_rank": "family",
      "relative_abundance": 5.59,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Family level Others category; from Figure 2b heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Psychrobacter",
      "reported_rank": "genus",
      "relative_abundance": 24.19,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Most abundant genus overall; core genus shared among all products; from Figure 2c heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Bacillus",
      "reported_rank": "genus",
      "relative_abundance": 21.19,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Second most abundant genus overall; from Figure 2c heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Staphylococcus",
      "reported_rank": "genus",
      "relative_abundance": 10.32,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "From Figure 2c heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Serratia",
      "reported_rank": "genus",
      "relative_abundance": 9.70,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "From Figure 2c heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Clostridium",
      "reported_rank": "genus",
      "relative_abundance": 7.71,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "From Figure 2c heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Enterobacter",
      "reported_rank": "genus",
      "relative_abundance": 3.20,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "From Figure 2c heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Pseudomonas",
      "reported_rank": "genus",
      "relative_abundance": 3.03,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "From Figure 2c heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Rummeliibacillus",
      "reported_rank": "genus",
      "relative_abundance": 2.06,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "From Figure 2c heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Enterococcus",
      "reported_rank": "genus",
      "relative_abundance": 1.98,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "From Figure 2c heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Photobacterium",
      "reported_rank": "genus",
      "relative_abundance": 1.86,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "From Figure 2c heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Myroides",
      "reported_rank": "genus",
      "relative_abundance": 1.57,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "From Figure 2c heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Peptostreptococcus",
      "reported_rank": "genus",
      "relative_abundance": 1.56,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "From Figure 2c heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Plesiomonas",
      "reported_rank": "genus",
      "relative_abundance": 1.15,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "From Figure 2c heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Achromobacter",
      "reported_rank": "genus",
      "relative_abundance": 1.11,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "From Figure 2c heatmap"
    },
    {
      "sample_code": "ALL",
      "food_name": "All products combined",
      "description": "Overall bacterial composition across all traditionally preserved fish products of Sikkim",
      "taxon_name": "Others",
      "reported_rank": "genus",
      "relative_abundance": 9.36,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Genus level Others category; from Figure 2c heatmap"
    }
  ]
};