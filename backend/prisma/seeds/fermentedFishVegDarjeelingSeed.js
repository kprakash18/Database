export default {
  "source_paper": {
    "title": "Distinct bacterial and fungal communities linked to functional potential in fermented fish and vegetables",
    "authors": "Namrata Jiya, Shankar Prasad Sha, Wormirin Khudai, Shretima Yadav, Rohit Sasane, Sumit Prasad Sah, Kriti Ghatani, Avinash Sharma",
    "journal": "Frontiers in Microbiology",
    "year": 2026,
    "doi": "10.3389/fmicb.2026.1850075",
    "link": "https://doi.org/10.3389/fmicb.2026.1850075"
  },
  "sequencing_methods": [
    {
      "method_name": "16S rRNA amplicon sequencing",
      "platform": "Illumina MiSeq",
      "target_region": "V4"
    },
    {
      "method_name": "ITS amplicon sequencing",
      "platform": "Illumina MiSeq",
      "target_region": "ITS1"
    }
  ],
  "samples": [
    {
      "sample_code": "FF2",
      "food_name": "Sukuti (fermented fish)",
      "description": "Native fermented fish delicacy of Darjeeling hills, prepared by washing fishes, mixing with salt, turmeric and spices, followed by sun-drying for 2 weeks",
      "raw_material": "Fish, salt, turmeric, spices",
      "location": "Darjeeling, North Bengal, India",
      "collection_day": "Final product (sun-dried for 2 weeks)",
      "replicates": "Triplicates",
      "accession_id": "PRJNA1256673 (SAMN48189686 for 16S; SAMN48199445 for ITS)",
      "additional_info": {
        "fermentation_type": "spontaneous (salt preservation and sun-drying)",
        "dna_extraction_kit": "QIAamp DNA Micro kit (Qiagen, The Netherlands)",
        "primers": "16S: 515F (GTGYCAGCMGCCGCGGTAA) / 806R (GGACTACNVGGGTWTCTAAT); ITS: ITS1F (CTTGGTCATTTAGAGGAAGTAA) / ITS2R (GCTGCGTTCTTCATCGATGC)",
        "read_type": "2x250 bp paired-end (v2 chemistry)",
        "sequencing_facility": "In-house Illumina MiSeq platform",
        "bioinformatics_pipeline": "FASTQC + DADA2 (R v4.4.2)",
        "database": "SILVA v.138.2 (bacteria); UNITE v10 (fungi)",
        "otu_clustering": "ASVs (DADA2)",
        "classifier": "DADA2 taxonomy assignment"
      }
    },
    {
      "sample_code": "FF3",
      "food_name": "Puthi (fermented fish)",
      "description": "Locally consumed fermented fish of North Bengal (Siliguri region)",
      "raw_material": "Fish",
      "location": "Siliguri, North Bengal, India",
      "collection_day": "Final product",
      "replicates": "Triplicates",
      "accession_id": "PRJNA1256673 (SAMN48189687 for 16S; SAMN48199446 for ITS)",
      "additional_info": {
        "fermentation_type": "spontaneous",
        "dna_extraction_kit": "QIAamp DNA Micro kit (Qiagen, The Netherlands)",
        "primers": "16S: 515F (GTGYCAGCMGCCGCGGTAA) / 806R (GGACTACNVGGGTWTCTAAT); ITS: ITS1F (CTTGGTCATTTAGAGGAAGTAA) / ITS2R (GCTGCGTTCTTCATCGATGC)",
        "read_type": "2x250 bp paired-end (v2 chemistry)",
        "sequencing_facility": "In-house Illumina MiSeq platform",
        "bioinformatics_pipeline": "FASTQC + DADA2 (R v4.4.2)",
        "database": "SILVA v.138.2 (bacteria); UNITE v10 (fungi)",
        "otu_clustering": "ASVs (DADA2)",
        "classifier": "DADA2 taxonomy assignment"
      }
    },
    {
      "sample_code": "FF4",
      "food_name": "Shidal (fermented fish cake)",
      "description": "Fermented fish cake prepared by washing, sun-drying and grinding fish using mortar and pestle (Okhali), mixed with ginger, garlic, onion and spices, fermented 4-6h, shaped into cakes and sun-dried. Consumed by Rajbangshi community.",
      "raw_material": "Fish, ginger, garlic, onion, spices",
      "location": "Jalpaiguri, North Bengal, India",
      "collection_day": "Final product (sun-dried cakes)",
      "replicates": "Triplicates",
      "accession_id": "PRJNA1256673 (SAMN48189688 for 16S; SAMN48199447 for ITS)",
      "additional_info": {
        "fermentation_type": "spontaneous (4-6h fermentation before sun-drying)",
        "dna_extraction_kit": "QIAamp DNA Micro kit (Qiagen, The Netherlands)",
        "primers": "16S: 515F (GTGYCAGCMGCCGCGGTAA) / 806R (GGACTACNVGGGTWTCTAAT); ITS: ITS1F (CTTGGTCATTTAGAGGAAGTAA) / ITS2R (GCTGCGTTCTTCATCGATGC)",
        "read_type": "2x250 bp paired-end (v2 chemistry)",
        "sequencing_facility": "In-house Illumina MiSeq platform",
        "bioinformatics_pipeline": "FASTQC + DADA2 (R v4.4.2)",
        "database": "SILVA v.138.2 (bacteria); UNITE v10 (fungi)",
        "otu_clustering": "ASVs (DADA2)",
        "classifier": "DADA2 taxonomy assignment"
      }
    },
    {
      "sample_code": "Sin1",
      "food_name": "Sinki (fermented radish) - Kurseong",
      "description": "Traditionally fermented leafy vegetable radish taproot (Raphanus sativus L.). Radishes wilted for 3 days, crushed coarsely, placed in 2-3 feet deep pits for natural pit fermentation for 22-30 days, then cut and sun-dried 3-5 days.",
      "raw_material": "Radish taproot (Raphanus sativus L.)",
      "location": "Kurseong, North Bengal, India",
      "collection_day": "Final product (after pit fermentation and sun-drying)",
      "replicates": "Triplicates",
      "accession_id": "PRJNA1256673 (SAMN48189689 for 16S; SAMN48199448 for ITS)",
      "additional_info": {
        "fermentation_type": "spontaneous (pit fermentation, 22-30 days)",
        "dna_extraction_kit": "QIAamp DNA Micro kit (Qiagen, The Netherlands)",
        "primers": "16S: 515F (GTGYCAGCMGCCGCGGTAA) / 806R (GGACTACNVGGGTWTCTAAT); ITS: ITS1F (CTTGGTCATTTAGAGGAAGTAA) / ITS2R (GCTGCGTTCTTCATCGATGC)",
        "read_type": "2x250 bp paired-end (v2 chemistry)",
        "sequencing_facility": "In-house Illumina MiSeq platform",
        "bioinformatics_pipeline": "FASTQC + DADA2 (R v4.4.2)",
        "database": "SILVA v.138.2 (bacteria); UNITE v10 (fungi)",
        "otu_clustering": "ASVs (DADA2)",
        "classifier": "DADA2 taxonomy assignment"
      }
    },
    {
      "sample_code": "Sin2",
      "food_name": "Sinki (fermented radish) - Kalimpong",
      "description": "Traditionally fermented leafy vegetable radish taproot (Raphanus sativus L.) from Kalimpong. Process varies by region.",
      "raw_material": "Radish taproot (Raphanus sativus L.)",
      "location": "Kalimpong, North Bengal, India",
      "collection_day": "Final product (after pit fermentation and sun-drying)",
      "replicates": "Triplicates",
      "accession_id": "PRJNA1256673 (SAMN48189690 for 16S; SAMN48199449 for ITS)",
      "additional_info": {
        "fermentation_type": "spontaneous (pit fermentation, 22-30 days)",
        "dna_extraction_kit": "QIAamp DNA Micro kit (Qiagen, The Netherlands)",
        "primers": "16S: 515F (GTGYCAGCMGCCGCGGTAA) / 806R (GGACTACNVGGGTWTCTAAT); ITS: ITS1F (CTTGGTCATTTAGAGGAAGTAA) / ITS2R (GCTGCGTTCTTCATCGATGC)",
        "read_type": "2x250 bp paired-end (v2 chemistry)",
        "sequencing_facility": "In-house Illumina MiSeq platform",
        "bioinformatics_pipeline": "FASTQC + DADA2 (R v4.4.2)",
        "database": "SILVA v.138.2 (bacteria); UNITE v10 (fungi)",
        "otu_clustering": "ASVs (DADA2)",
        "classifier": "DADA2 taxonomy assignment"
      }
    },
    {
      "sample_code": "Sin4",
      "food_name": "Sinki (fermented radish) - Darjeeling",
      "description": "Traditionally fermented leafy vegetable radish taproot (Raphanus sativus L.) from Darjeeling. Process varies by region.",
      "raw_material": "Radish taproot (Raphanus sativus L.)",
      "location": "Darjeeling, North Bengal, India",
      "collection_day": "Final product (after pit fermentation and sun-drying)",
      "replicates": "Triplicates",
      "accession_id": "PRJNA1256673 (SAMN48189691 for 16S; SAMN48199450 for ITS)",
      "additional_info": {
        "fermentation_type": "spontaneous (pit fermentation, 22-30 days)",
        "dna_extraction_kit": "QIAamp DNA Micro kit (Qiagen, The Netherlands)",
        "primers": "16S: 515F (GTGYCAGCMGCCGCGGTAA) / 806R (GGACTACNVGGGTWTCTAAT); ITS: ITS1F (CTTGGTCATTTAGAGGAAGTAA) / ITS2R (GCTGCGTTCTTCATCGATGC)",
        "read_type": "2x250 bp paired-end (v2 chemistry)",
        "sequencing_facility": "In-house Illumina MiSeq platform",
        "bioinformatics_pipeline": "FASTQC + DADA2 (R v4.4.2)",
        "database": "SILVA v.138.2 (bacteria); UNITE v10 (fungi)",
        "otu_clustering": "ASVs (DADA2)",
        "classifier": "DADA2 taxonomy assignment"
      }
    },
    {
      "sample_code": "Sin5",
      "food_name": "Sinki (fermented radish) - Rohini",
      "description": "Traditionally fermented leafy vegetable radish taproot (Raphanus sativus L.) from Rohini. Process varies by region. Widely consumed by Nepali community.",
      "raw_material": "Radish taproot (Raphanus sativus L.)",
      "location": "Rohini, North Bengal, India",
      "collection_day": "Final product (after pit fermentation and sun-drying)",
      "replicates": "Triplicates",
      "accession_id": "PRJNA1256673 (SAMN48189692 for 16S; SAMN48199451 for ITS)",
      "additional_info": {
        "fermentation_type": "spontaneous (pit fermentation, 22-30 days)",
        "dna_extraction_kit": "QIAamp DNA Micro kit (Qiagen, The Netherlands)",
        "primers": "16S: 515F (GTGYCAGCMGCCGCGGTAA) / 806R (GGACTACNVGGGTWTCTAAT); ITS: ITS1F (CTTGGTCATTTAGAGGAAGTAA) / ITS2R (GCTGCGTTCTTCATCGATGC)",
        "read_type": "2x250 bp paired-end (v2 chemistry)",
        "sequencing_facility": "In-house Illumina MiSeq platform",
        "bioinformatics_pipeline": "FASTQC + DADA2 (R v4.4.2)",
        "database": "SILVA v.138.2 (bacteria); UNITE v10 (fungi)",
        "otu_clustering": "ASVs (DADA2)",
        "classifier": "DADA2 taxonomy assignment"
      }
    },
    {
      "sample_code": "ALL-FISH",
      "food_name": "Fermented fish (pooled)",
      "description": "Pooled dataset of three fermented fish samples (Sukuti, Puthi, Shidal). Total 1,019,679 raw bacterial reads, 939,782 raw fungal reads. After DADA2: 703,086 bacterial paired non-chimeric reads, 517,364 fungal paired non-chimeric reads. 71 bacterial ASVs, 91 fungal ASVs at genus level.",
      "raw_material": "Fish, salt, spices",
      "location": "North Bengal, India",
      "collection_day": "Final products",
      "replicates": "9 samples total (3 replicates x 3 fish types)",
      "accession_id": "PRJNA1256673",
      "additional_info": {
        "fermentation_type": "spontaneous",
        "dna_extraction_kit": "QIAamp DNA Micro kit (Qiagen, The Netherlands)",
        "primers": "16S: 515F / 806R; ITS: ITS1F / ITS2R",
        "read_type": "2x250 bp paired-end",
        "sequencing_facility": "In-house Illumina MiSeq platform",
        "bioinformatics_pipeline": "FASTQC + DADA2 (R v4.4.2) + PICRUSt2 v2.6.3",
        "database": "SILVA v.138.2; UNITE v10",
        "otu_clustering": "ASVs (DADA2)",
        "classifier": "DADA2 taxonomy assignment"
      }
    },
    {
      "sample_code": "ALL-VEG",
      "food_name": "Fermented vegetables (pooled)",
      "description": "Pooled dataset of four fermented vegetable Sinki samples (Sin1, Sin2, Sin4, Sin5). 180 bacterial ASVs, 109 fungal ASVs at genus level. Higher bacterial diversity than fermented fishes.",
      "raw_material": "Radish taproot (Raphanus sativus L.)",
      "location": "North Bengal, India",
      "collection_day": "Final products",
      "replicates": "12 samples total (3 replicates x 4 vegetable samples)",
      "accession_id": "PRJNA1256673",
      "additional_info": {
        "fermentation_type": "spontaneous (pit fermentation)",
        "dna_extraction_kit": "QIAamp DNA Micro kit (Qiagen, The Netherlands)",
        "primers": "16S: 515F / 806R; ITS: ITS1F / ITS2R",
        "read_type": "2x250 bp paired-end",
        "sequencing_facility": "In-house Illumina MiSeq platform",
        "bioinformatics_pipeline": "FASTQC + DADA2 (R v4.4.2) + PICRUSt2 v2.6.3",
        "database": "SILVA v.138.2; UNITE v10",
        "otu_clustering": "ASVs (DADA2)",
        "classifier": "DADA2 taxonomy assignment"
      }
    }
  ],
  "taxonomy_list": [
    {
      "name": "Pseudomonadota",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Bacillota",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Actinomycetota",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Ascomycota",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Basidiomycota",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Mortierellomycota",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Acidobacteriota",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Bacteroidota",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Bdellovibrionota",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Campylobacterota",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Chlamydiota",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Chloroflexota",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Cyanobacteriota",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Deinococcota",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Fusobacteriota",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Gemmatimonadota",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Methylomirabilota",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Myxococcota",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Patescibacteria",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Planctomycetota",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Thermodesulfobacteriota",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Verrucomicrobiota",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Chytridiomycota",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Mucoromycota",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Olpidiomycota",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Rozellomycota",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Vibrio",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Clostridium",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Staphylococcus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Photobacterium",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Psychrobacter",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Aliivibrio",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Pseudoalteromonas",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Lactiplantibacillus",
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
      "name": "Levilactobacillus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Paucilactobacillus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Latilactobacillus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Companilactobacillus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Klebsiella",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Lactobacillus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Lysinibacillus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Macrococcus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Lactococcus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Leuconostoc",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Bacillus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Pantoea",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Acinetobacter",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Acetobacter",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Brevibacterium",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Dialister",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Enterococcus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Jeotgalicoccus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Kocuria",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Loigolactobacillus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Methylobacterium",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Priestia",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Pseudomonas",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Salinicoccus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Savagea",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Serratia",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Bisifusarium",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Aspergillus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Wallemia",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Cladosporium",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Alternaria",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Cystofilobasidium",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Papiliotrema",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Cutaneotrichosporon",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Hannaella",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Paraxerochrysium",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Linnemannia",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Neopestalotiopsis",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Debaryomyces",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Penicillium",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Pichia",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Rhodotorula",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Sterigmatomyces",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Nigrospora",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Fusarium",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Botrytis",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Bullera",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Cryptococcus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Mortierella",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Naganishia",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Periconia",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Pleurotus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Podila",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Preussia",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Tausonia",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Trichosporon",
      "rank": "genus",
      "reported_rank": "Genus"
    }
  ],
  "bacterial_composition": [
    {
      "sample_code": "ALL-FISH",
      "food_name": "Fermented fish (pooled)",
      "description": "Pooled dataset of three fermented fish samples (Sukuti, Puthi, Shidal). Total 1,019,679 raw bacterial reads, 939,782 raw fungal reads. After DADA2: 703,086 bacterial paired non-chimeric reads, 517,364 fungal paired non-chimeric reads. 71 bacterial ASVs, 91 fungal ASVs at genus level.",
      "taxon_name": "Pseudomonadota",
      "reported_rank": "phylum",
      "relative_abundance": 23.05,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Dominant phylum in fermented fishes; previously known as Proteobacteria"
    },
    {
      "sample_code": "ALL-FISH",
      "food_name": "Fermented fish (pooled)",
      "description": "Pooled dataset of three fermented fish samples (Sukuti, Puthi, Shidal). Total 1,019,679 raw bacterial reads, 939,782 raw fungal reads. After DADA2: 703,086 bacterial paired non-chimeric reads, 517,364 fungal paired non-chimeric reads. 71 bacterial ASVs, 91 fungal ASVs at genus level.",
      "taxon_name": "Bacillota",
      "reported_rank": "phylum",
      "relative_abundance": 19.56,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Second most abundant phylum in fermented fishes; previously known as Firmicutes"
    },
    {
      "sample_code": "ALL-FISH",
      "food_name": "Fermented fish (pooled)",
      "description": "Pooled dataset of three fermented fish samples (Sukuti, Puthi, Shidal). Total 1,019,679 raw bacterial reads, 939,782 raw fungal reads. After DADA2: 703,086 bacterial paired non-chimeric reads, 517,364 fungal paired non-chimeric reads. 71 bacterial ASVs, 91 fungal ASVs at genus level.",
      "taxon_name": "Actinomycetota",
      "reported_rank": "phylum",
      "relative_abundance": 0.23,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Present abundantly in fermented fishes; previously known as Actinobacteria"
    },
    {
      "sample_code": "ALL-VEG",
      "food_name": "Fermented vegetables (pooled)",
      "description": "Pooled dataset of four fermented vegetable Sinki samples (Sin1, Sin2, Sin4, Sin5). 180 bacterial ASVs, 109 fungal ASVs at genus level. Higher bacterial diversity than fermented fishes.",
      "taxon_name": "Bacillota",
      "reported_rank": "phylum",
      "relative_abundance": 32.17,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Dominant phylum in fermented vegetables; enriched compared to fermented fishes"
    },
    {
      "sample_code": "ALL-VEG",
      "food_name": "Fermented vegetables (pooled)",
      "description": "Pooled dataset of four fermented vegetable Sinki samples (Sin1, Sin2, Sin4, Sin5). 180 bacterial ASVs, 109 fungal ASVs at genus level. Higher bacterial diversity than fermented fishes.",
      "taxon_name": "Pseudomonadota",
      "reported_rank": "phylum",
      "relative_abundance": 24.54,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Second most abundant phylum in fermented vegetables"
    },
    {
      "sample_code": "ALL-VEG",
      "food_name": "Fermented vegetables (pooled)",
      "description": "Pooled dataset of four fermented vegetable Sinki samples (Sin1, Sin2, Sin4, Sin5). 180 bacterial ASVs, 109 fungal ASVs at genus level. Higher bacterial diversity than fermented fishes.",
      "taxon_name": "Actinomycetota",
      "reported_rank": "phylum",
      "relative_abundance": 0.32,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Present in fermented vegetables"
    },
    {
      "sample_code": "ALL-FISH",
      "food_name": "Fermented fish (pooled)",
      "description": "Pooled dataset of three fermented fish samples (Sukuti, Puthi, Shidal). Total 1,019,679 raw bacterial reads, 939,782 raw fungal reads. After DADA2: 703,086 bacterial paired non-chimeric reads, 517,364 fungal paired non-chimeric reads. 71 bacterial ASVs, 91 fungal ASVs at genus level.",
      "taxon_name": "Vibrio",
      "reported_rank": "genus",
      "relative_abundance": 18.98,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Most prevalent bacterial genus in fermented fishes; common aquatic inhabitant; potentially pathogenic"
    },
    {
      "sample_code": "ALL-FISH",
      "food_name": "Fermented fish (pooled)",
      "description": "Pooled dataset of three fermented fish samples (Sukuti, Puthi, Shidal). Total 1,019,679 raw bacterial reads, 939,782 raw fungal reads. After DADA2: 703,086 bacterial paired non-chimeric reads, 517,364 fungal paired non-chimeric reads. 71 bacterial ASVs, 91 fungal ASVs at genus level.",
      "taxon_name": "Clostridium",
      "reported_rank": "genus",
      "relative_abundance": 13.32,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Second most prevalent genus in fermented fishes; potentially pathogenic; linked to botulism and food poisoning"
    },
    {
      "sample_code": "ALL-FISH",
      "food_name": "Fermented fish (pooled)",
      "description": "Pooled dataset of three fermented fish samples (Sukuti, Puthi, Shidal). Total 1,019,679 raw bacterial reads, 939,782 raw fungal reads. After DADA2: 703,086 bacterial paired non-chimeric reads, 517,364 fungal paired non-chimeric reads. 71 bacterial ASVs, 91 fungal ASVs at genus level.",
      "taxon_name": "Staphylococcus",
      "reported_rank": "genus",
      "relative_abundance": 3.1,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Potentially pathogenic genus; halotolerant nature supports persistence in high-salt fermented fish"
    },
    {
      "sample_code": "ALL-FISH",
      "food_name": "Fermented fish (pooled)",
      "description": "Pooled dataset of three fermented fish samples (Sukuti, Puthi, Shidal). Total 1,019,679 raw bacterial reads, 939,782 raw fungal reads. After DADA2: 703,086 bacterial paired non-chimeric reads, 517,364 fungal paired non-chimeric reads. 71 bacterial ASVs, 91 fungal ASVs at genus level.",
      "taxon_name": "Photobacterium",
      "reported_rank": "genus",
      "relative_abundance": 2.2,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Major in Puthi sample; recognized fish spoilage organism; P. damselae implicated in histamine fish poisoning"
    },
    {
      "sample_code": "ALL-FISH",
      "food_name": "Fermented fish (pooled)",
      "description": "Pooled dataset of three fermented fish samples (Sukuti, Puthi, Shidal). Total 1,019,679 raw bacterial reads, 939,782 raw fungal reads. After DADA2: 703,086 bacterial paired non-chimeric reads, 517,364 fungal paired non-chimeric reads. 71 bacterial ASVs, 91 fungal ASVs at genus level.",
      "taxon_name": "Psychrobacter",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Prevalent in fermented fishes; one of 48 unique bacterial genera in fermented fishes; enhanced lipolytic and proteolytic activities"
    },
    {
      "sample_code": "ALL-FISH",
      "food_name": "Fermented fish (pooled)",
      "description": "Pooled dataset of three fermented fish samples (Sukuti, Puthi, Shidal). Total 1,019,679 raw bacterial reads, 939,782 raw fungal reads. After DADA2: 703,086 bacterial paired non-chimeric reads, 517,364 fungal paired non-chimeric reads. 71 bacterial ASVs, 91 fungal ASVs at genus level.",
      "taxon_name": "Aliivibrio",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Prevalent in fermented fishes; associated with fish fermentation"
    },
    {
      "sample_code": "ALL-FISH",
      "food_name": "Fermented fish (pooled)",
      "description": "Pooled dataset of three fermented fish samples (Sukuti, Puthi, Shidal). Total 1,019,679 raw bacterial reads, 939,782 raw fungal reads. After DADA2: 703,086 bacterial paired non-chimeric reads, 517,364 fungal paired non-chimeric reads. 71 bacterial ASVs, 91 fungal ASVs at genus level.",
      "taxon_name": "Pseudoalteromonas",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Prevalent in fermented fishes; one of 48 unique bacterial genera in fermented fishes"
    },
    {
      "sample_code": "ALL-VEG",
      "food_name": "Fermented vegetables (pooled)",
      "description": "Pooled dataset of four fermented vegetable Sinki samples (Sin1, Sin2, Sin4, Sin5). 180 bacterial ASVs, 109 fungal ASVs at genus level. Higher bacterial diversity than fermented fishes.",
      "taxon_name": "Lactiplantibacillus",
      "reported_rank": "genus",
      "relative_abundance": 10.17,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Most prevalent bacterial genus in fermented vegetables; lactic acid bacteria; central to organic acid production"
    },
    {
      "sample_code": "ALL-VEG",
      "food_name": "Fermented vegetables (pooled)",
      "description": "Pooled dataset of four fermented vegetable Sinki samples (Sin1, Sin2, Sin4, Sin5). 180 bacterial ASVs, 109 fungal ASVs at genus level. Higher bacterial diversity than fermented fishes.",
      "taxon_name": "Weissella",
      "reported_rank": "genus",
      "relative_abundance": 9.73,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Second most prevalent genus in fermented vegetables; lactic acid bacteria; potential starter culture"
    },
    {
      "sample_code": "ALL-VEG",
      "food_name": "Fermented vegetables (pooled)",
      "description": "Pooled dataset of four fermented vegetable Sinki samples (Sin1, Sin2, Sin4, Sin5). 180 bacterial ASVs, 109 fungal ASVs at genus level. Higher bacterial diversity than fermented fishes.",
      "taxon_name": "Pediococcus",
      "reported_rank": "genus",
      "relative_abundance": 4.62,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Lactic acid bacteria; used as starter cultures for vegetable fermentation"
    },
    {
      "sample_code": "ALL-VEG",
      "food_name": "Fermented vegetables (pooled)",
      "description": "Pooled dataset of four fermented vegetable Sinki samples (Sin1, Sin2, Sin4, Sin5). 180 bacterial ASVs, 109 fungal ASVs at genus level. Higher bacterial diversity than fermented fishes.",
      "taxon_name": "Levilactobacillus",
      "reported_rank": "genus",
      "relative_abundance": 3.59,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Lactic acid bacteria; involved in SCFA and organic acid production"
    },
    {
      "sample_code": "ALL-VEG",
      "food_name": "Fermented vegetables (pooled)",
      "description": "Pooled dataset of four fermented vegetable Sinki samples (Sin1, Sin2, Sin4, Sin5). 180 bacterial ASVs, 109 fungal ASVs at genus level. Higher bacterial diversity than fermented fishes.",
      "taxon_name": "Staphylococcus",
      "reported_rank": "genus",
      "relative_abundance": 2.95,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Potentially pathogenic genus present in fermented vegetables"
    },
    {
      "sample_code": "ALL-VEG",
      "food_name": "Fermented vegetables (pooled)",
      "description": "Pooled dataset of four fermented vegetable Sinki samples (Sin1, Sin2, Sin4, Sin5). 180 bacterial ASVs, 109 fungal ASVs at genus level. Higher bacterial diversity than fermented fishes.",
      "taxon_name": "Klebsiella",
      "reported_rank": "genus",
      "relative_abundance": 2.52,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Potentially pathogenic genus; multidrug resistant; linked to gastrointestinal colonization"
    },
    {
      "sample_code": "ALL-VEG",
      "food_name": "Fermented vegetables (pooled)",
      "description": "Pooled dataset of four fermented vegetable Sinki samples (Sin1, Sin2, Sin4, Sin5). 180 bacterial ASVs, 109 fungal ASVs at genus level. Higher bacterial diversity than fermented fishes.",
      "taxon_name": "Vibrio",
      "reported_rank": "genus",
      "relative_abundance": 2.2,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Potentially pathogenic genus in fermented vegetables"
    },
    {
      "sample_code": "ALL-VEG",
      "food_name": "Fermented vegetables (pooled)",
      "description": "Pooled dataset of four fermented vegetable Sinki samples (Sin1, Sin2, Sin4, Sin5). 180 bacterial ASVs, 109 fungal ASVs at genus level. Higher bacterial diversity than fermented fishes.",
      "taxon_name": "Acinetobacter",
      "reported_rank": "genus",
      "relative_abundance": 1.5,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Potentially pathogenic genus; multidrug resistant; associated with gastroenteritis"
    },
    {
      "sample_code": "ALL-FISH",
      "food_name": "Fermented fish (pooled)",
      "description": "Pooled dataset of three fermented fish samples (Sukuti, Puthi, Shidal). Total 1,019,679 raw bacterial reads, 939,782 raw fungal reads. After DADA2: 703,086 bacterial paired non-chimeric reads, 517,364 fungal paired non-chimeric reads. 71 bacterial ASVs, 91 fungal ASVs at genus level.",
      "taxon_name": "Ascomycota",
      "reported_rank": "phylum",
      "relative_abundance": 32.13,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Dominant fungal phylum in fermented fishes; contributes to fermentation of alcoholic beverages, bread, cheese and fish products"
    },
    {
      "sample_code": "ALL-FISH",
      "food_name": "Fermented fish (pooled)",
      "description": "Pooled dataset of three fermented fish samples (Sukuti, Puthi, Shidal). Total 1,019,679 raw bacterial reads, 939,782 raw fungal reads. After DADA2: 703,086 bacterial paired non-chimeric reads, 517,364 fungal paired non-chimeric reads. 71 bacterial ASVs, 91 fungal ASVs at genus level.",
      "taxon_name": "Basidiomycota",
      "reported_rank": "phylum",
      "relative_abundance": 9.44,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Major fungal phylum in fermented fishes"
    },
    {
      "sample_code": "ALL-FISH",
      "food_name": "Fermented fish (pooled)",
      "description": "Pooled dataset of three fermented fish samples (Sukuti, Puthi, Shidal). Total 1,019,679 raw bacterial reads, 939,782 raw fungal reads. After DADA2: 703,086 bacterial paired non-chimeric reads, 517,364 fungal paired non-chimeric reads. 71 bacterial ASVs, 91 fungal ASVs at genus level.",
      "taxon_name": "Mortierellomycota",
      "reported_rank": "phylum",
      "relative_abundance": 1.06,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Found in fermented fishes; also isolated from sauerkraut and rice wine"
    },
    {
      "sample_code": "ALL-VEG",
      "food_name": "Fermented vegetables (pooled)",
      "description": "Pooled dataset of four fermented vegetable Sinki samples (Sin1, Sin2, Sin4, Sin5). 180 bacterial ASVs, 109 fungal ASVs at genus level. Higher bacterial diversity than fermented fishes.",
      "taxon_name": "Ascomycota",
      "reported_rank": "phylum",
      "relative_abundance": 44.57,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Dominant fungal phylum in fermented vegetables; higher abundance than in fermented fishes"
    },
    {
      "sample_code": "ALL-VEG",
      "food_name": "Fermented vegetables (pooled)",
      "description": "Pooled dataset of four fermented vegetable Sinki samples (Sin1, Sin2, Sin4, Sin5). 180 bacterial ASVs, 109 fungal ASVs at genus level. Higher bacterial diversity than fermented fishes.",
      "taxon_name": "Basidiomycota",
      "reported_rank": "phylum",
      "relative_abundance": 12.1,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Major fungal phylum in fermented vegetables; higher abundance than in fermented fishes"
    },
    {
      "sample_code": "ALL-FISH",
      "food_name": "Fermented fish (pooled)",
      "description": "Pooled dataset of three fermented fish samples (Sukuti, Puthi, Shidal). Total 1,019,679 raw bacterial reads, 939,782 raw fungal reads. After DADA2: 703,086 bacterial paired non-chimeric reads, 517,364 fungal paired non-chimeric reads. 71 bacterial ASVs, 91 fungal ASVs at genus level.",
      "taxon_name": "Bisifusarium",
      "reported_rank": "genus",
      "relative_abundance": 13.18,
      "is_dominant": true,
      "relative_abundance": 13.18,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Most abundant fungal genus in fermented fishes; previously isolated from cheese fermentation"
    },
    {
      "sample_code": "ALL-FISH",
      "food_name": "Fermented fish (pooled)",
      "description": "Pooled dataset of three fermented fish samples (Sukuti, Puthi, Shidal). Total 1,019,679 raw bacterial reads, 939,782 raw fungal reads. After DADA2: 703,086 bacterial paired non-chimeric reads, 517,364 fungal paired non-chimeric reads. 71 bacterial ASVs, 91 fungal ASVs at genus level.",
      "taxon_name": "Aspergillus",
      "reported_rank": "genus",
      "relative_abundance": 8.28,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Major fungal genus; drives fermentation of Asian fermented products; produces proteolytic enzymes"
    },
    {
      "sample_code": "ALL-FISH",
      "food_name": "Fermented fish (pooled)",
      "description": "Pooled dataset of three fermented fish samples (Sukuti, Puthi, Shidal). Total 1,019,679 raw bacterial reads, 939,782 raw fungal reads. After DADA2: 703,086 bacterial paired non-chimeric reads, 517,364 fungal paired non-chimeric reads. 71 bacterial ASVs, 91 fungal ASVs at genus level.",
      "taxon_name": "Wallemia",
      "reported_rank": "genus",
      "relative_abundance": 6.34,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Major fungal genus; found in soybean product fermentation"
    },
    {
      "sample_code": "ALL-FISH",
      "food_name": "Fermented fish (pooled)",
      "description": "Pooled dataset of three fermented fish samples (Sukuti, Puthi, Shidal). Total 1,019,679 raw bacterial reads, 939,782 raw fungal reads. After DADA2: 703,086 bacterial paired non-chimeric reads, 517,364 fungal paired non-chimeric reads. 71 bacterial ASVs, 91 fungal ASVs at genus level.",
      "taxon_name": "Cladosporium",
      "reported_rank": "genus",
      "relative_abundance": 4.86,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Major fungal genus in fermented fishes"
    },
    {
      "sample_code": "ALL-FISH",
      "food_name": "Fermented fish (pooled)",
      "description": "Pooled dataset of three fermented fish samples (Sukuti, Puthi, Shidal). Total 1,019,679 raw bacterial reads, 939,782 raw fungal reads. After DADA2: 703,086 bacterial paired non-chimeric reads, 517,364 fungal paired non-chimeric reads. 71 bacterial ASVs, 91 fungal ASVs at genus level.",
      "taxon_name": "Alternaria",
      "reported_rank": "genus",
      "relative_abundance": 1.63,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Fungal genus in fermented fishes"
    },
    {
      "sample_code": "ALL-VEG",
      "food_name": "Fermented vegetables (pooled)",
      "description": "Pooled dataset of four fermented vegetable Sinki samples (Sin1, Sin2, Sin4, Sin5). 180 bacterial ASVs, 109 fungal ASVs at genus level. Higher bacterial diversity than fermented fishes.",
      "taxon_name": "Aspergillus",
      "reported_rank": "genus",
      "relative_abundance": 37.85,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Most abundant fungal genus in fermented vegetables; linked to riboflavin production"
    },
    {
      "sample_code": "ALL-VEG",
      "food_name": "Fermented vegetables (pooled)",
      "description": "Pooled dataset of four fermented vegetable Sinki samples (Sin1, Sin2, Sin4, Sin5). 180 bacterial ASVs, 109 fungal ASVs at genus level. Higher bacterial diversity than fermented fishes.",
      "taxon_name": "Wallemia",
      "reported_rank": "genus",
      "relative_abundance": 6.98,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Major fungal genus in fermented vegetables"
    },
    {
      "sample_code": "ALL-VEG",
      "food_name": "Fermented vegetables (pooled)",
      "description": "Pooled dataset of four fermented vegetable Sinki samples (Sin1, Sin2, Sin4, Sin5). 180 bacterial ASVs, 109 fungal ASVs at genus level. Higher bacterial diversity than fermented fishes.",
      "taxon_name": "Cladosporium",
      "reported_rank": "genus",
      "relative_abundance": 2.15,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Fungal genus in fermented vegetables"
    },
    {
      "sample_code": "ALL-VEG",
      "food_name": "Fermented vegetables (pooled)",
      "description": "Pooled dataset of four fermented vegetable Sinki samples (Sin1, Sin2, Sin4, Sin5). 180 bacterial ASVs, 109 fungal ASVs at genus level. Higher bacterial diversity than fermented fishes.",
      "taxon_name": "Cystofilobasidium",
      "reported_rank": "genus",
      "relative_abundance": 1.73,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Fungal genus in fermented vegetables; plays roles in wine fermentation"
    },
    {
      "sample_code": "ALL-VEG",
      "food_name": "Fermented vegetables (pooled)",
      "description": "Pooled dataset of four fermented vegetable Sinki samples (Sin1, Sin2, Sin4, Sin5). 180 bacterial ASVs, 109 fungal ASVs at genus level. Higher bacterial diversity than fermented fishes.",
      "taxon_name": "Alternaria",
      "reported_rank": "genus",
      "relative_abundance": 1.51,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Fungal genus in fermented vegetables"
    }
  ]
}
