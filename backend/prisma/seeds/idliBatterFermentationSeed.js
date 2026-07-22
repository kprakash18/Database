export default {
  "source_paper": {
    "title": "Bacterial diversity of traditional fermented food, Idli by high thorough-put sequencing",
    "authors": "Digambar Kavitake, Mangesh V. Suryavanshi, Sujatha Kandasamy, Palanisamy Bruntha Devi, Yogesh Shouche, Prathapkumar Halady Shetty",
    "journal": "Journal of Food Science and Technology",
    "year": 2022,
    "doi": "10.1007/s13197-022-05421-4",
    "link": "https://doi.org/10.1007/s13197-022-05421-4"
  },
  "sequencing_methods": [
    {
      "method_name": "16S rRNA amplicon sequencing",
      "platform": "Ion Torrent Personal Genome Machine (PGM)",
      "target_region": "V3"
    }
  ],
  "samples": [
    {
      "sample_code": "IB-0",
      "food_name": "Idli batter (0h)",
      "description": "Freshly ground and mixed idli batter before fermentation (just ground and mixed batter)",
      "raw_material": "Rice and black gram (1:4 ratio)",
      "location": "Pondicherry University, Pondicherry, India",
      "collection_day": "0h (initial, unfermented)",
      "replicates": "Triplicates (n=3)",
      "accession_id": "SRP174635 / PRJNA511947",
      "additional_info": {
        "fermentation_type": "spontaneous",
        "dna_extraction_kit": "Conventional phenol-chloroform method (Gaikwad 2002 with modifications)",
        "primers": "341F (5'-CCTACGGGAGGCAGCAG-3') / 518R (5'-ATTACCGCGGCTGCTGG-3')",
        "read_type": "130 cycles single-end",
        "sequencing_facility": "Not specified",
        "bioinformatics_pipeline": "Mothur (pre-processing) + QIIME v1.9",
        "database": "Greengenes 13.8",
        "otu_clustering": "97% OTU (UCLUST algorithm)",
        "classifier": "RDP Classifier 2.2 (confidence score 80%)"
      }
    },
    {
      "sample_code": "IB-06",
      "food_name": "Idli batter (6h)",
      "description": "Idli batter after 6 hours of fermentation under ambient conditions (30±2°C)",
      "raw_material": "Rice and black gram (1:4 ratio)",
      "location": "Pondicherry University, Pondicherry, India",
      "collection_day": "6h fermentation",
      "replicates": "Triplicates (n=3)",
      "accession_id": "SRP174635 / PRJNA511947",
      "additional_info": {
        "fermentation_type": "spontaneous",
        "dna_extraction_kit": "Conventional phenol-chloroform method (Gaikwad 2002 with modifications)",
        "primers": "341F (5'-CCTACGGGAGGCAGCAG-3') / 518R (5'-ATTACCGCGGCTGCTGG-3')",
        "read_type": "130 cycles single-end",
        "sequencing_facility": "Not specified",
        "bioinformatics_pipeline": "Mothur (pre-processing) + QIIME v1.9",
        "database": "Greengenes 13.8",
        "otu_clustering": "97% OTU (UCLUST algorithm)",
        "classifier": "RDP Classifier 2.2 (confidence score 80%)"
      }
    },
    {
      "sample_code": "IB-12",
      "food_name": "Idli batter (12h)",
      "description": "Idli batter after 12 hours of fermentation under ambient conditions (30±2°C)",
      "raw_material": "Rice and black gram (1:4 ratio)",
      "location": "Pondicherry University, Pondicherry, India",
      "collection_day": "12h fermentation",
      "replicates": "Triplicates (n=3)",
      "accession_id": "SRP174635 / PRJNA511947",
      "additional_info": {
        "fermentation_type": "spontaneous",
        "dna_extraction_kit": "Conventional phenol-chloroform method (Gaikwad 2002 with modifications)",
        "primers": "341F (5'-CCTACGGGAGGCAGCAG-3') / 518R (5'-ATTACCGCGGCTGCTGG-3')",
        "read_type": "130 cycles single-end",
        "sequencing_facility": "Not specified",
        "bioinformatics_pipeline": "Mothur (pre-processing) + QIIME v1.9",
        "database": "Greengenes 13.8",
        "otu_clustering": "97% OTU (UCLUST algorithm)",
        "classifier": "RDP Classifier 2.2 (confidence score 80%)"
      }
    },
    {
      "sample_code": "IB-15",
      "food_name": "Idli batter (15h)",
      "description": "Idli batter after 15 hours of fermentation under ambient conditions (30±2°C), representing over-fermentation stage",
      "raw_material": "Rice and black gram (1:4 ratio)",
      "location": "Pondicherry University, Pondicherry, India",
      "collection_day": "15h fermentation",
      "replicates": "Triplicates (n=3)",
      "accession_id": "SRP174635 / PRJNA511947",
      "additional_info": {
        "fermentation_type": "spontaneous",
        "dna_extraction_kit": "Conventional phenol-chloroform method (Gaikwad 2002 with modifications)",
        "primers": "341F (5'-CCTACGGGAGGCAGCAG-3') / 518R (5'-ATTACCGCGGCTGCTGG-3')",
        "read_type": "130 cycles single-end",
        "sequencing_facility": "Not specified",
        "bioinformatics_pipeline": "Mothur (pre-processing) + QIIME v1.9",
        "database": "Greengenes 13.8",
        "otu_clustering": "97% OTU (UCLUST algorithm)",
        "classifier": "RDP Classifier 2.2 (confidence score 80%)"
      }
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled dataset across all fermentation time points (0h, 6h, 12h, 15h). Total 358,724 raw reads, 165,154 high-quality reads, 1298 OTUs after removing cyanobacteria and chloroplast hits.",
      "raw_material": "Rice and black gram (1:4 ratio)",
      "location": "Pondicherry University, Pondicherry, India",
      "collection_day": "0-15h fermentation (all stages)",
      "replicates": "12 samples total (3 replicates x 4 time points)",
      "accession_id": "SRP174635 / PRJNA511947",
      "additional_info": {
        "fermentation_type": "spontaneous",
        "dna_extraction_kit": "Conventional phenol-chloroform method (Gaikwad 2002 with modifications)",
        "primers": "341F (5'-CCTACGGGAGGCAGCAG-3') / 518R (5'-ATTACCGCGGCTGCTGG-3')",
        "read_type": "130 cycles single-end",
        "sequencing_facility": "Not specified",
        "bioinformatics_pipeline": "Mothur (pre-processing) + QIIME v1.9",
        "database": "Greengenes 13.8",
        "otu_clustering": "97% OTU (UCLUST algorithm)",
        "classifier": "RDP Classifier 2.2 (confidence score 80%)"
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
      "name": "Fusobacteria",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Actinobacteria",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Bacteroidetes",
      "rank": "phylum",
      "reported_rank": "Phylum"
    },
    {
      "name": "Bacilli",
      "rank": "class",
      "reported_rank": "Class"
    },
    {
      "name": "Gammaproteobacteria",
      "rank": "class",
      "reported_rank": "Class"
    },
    {
      "name": "Betaproteobacteria",
      "rank": "class",
      "reported_rank": "Class"
    },
    {
      "name": "Flavobacteriia",
      "rank": "class",
      "reported_rank": "Class"
    },
    {
      "name": "Bacillales",
      "rank": "order",
      "reported_rank": "Order"
    },
    {
      "name": "Lactobacillales",
      "rank": "order",
      "reported_rank": "Order"
    },
    {
      "name": "Pseudomonadales",
      "rank": "order",
      "reported_rank": "Order"
    },
    {
      "name": "Vibrionales",
      "rank": "order",
      "reported_rank": "Order"
    },
    {
      "name": "Enterobacteriales",
      "rank": "order",
      "reported_rank": "Order"
    },
    {
      "name": "Aeromonadales",
      "rank": "order",
      "reported_rank": "Order"
    },
    {
      "name": "Burkholderiales",
      "rank": "order",
      "reported_rank": "Order"
    },
    {
      "name": "Flavobacteriales",
      "rank": "order",
      "reported_rank": "Order"
    },
    {
      "name": "Bacillaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Enterococcaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Lactobacillaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Leuconostocaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Streptococcaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Staphylococcaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Planococcaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Carnobacteriaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Clostridiaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Paenibacillaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Veillonellaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Enterobacteriaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Moraxellaceae",
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
      "name": "Pseudoalteromonadaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Aeromonadaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Comamonadaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Burkholderiaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Flavobacteriaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Weeksellaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Sphingobacteriaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Micrococcaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Corynebacteriaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Propionibacteriaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Nocardioidaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Dermabacteraceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Cellulomonadaceae",
      "rank": "family",
      "reported_rank": "Family"
    },
    {
      "name": "Lactococcus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Weissella",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Lactobacillus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Enterococcus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Bacillus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Macrococcus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Staphylococcus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Lysinibacillus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Paenibacillus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Clostridium",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Desemzia",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Vagococcus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Pediococcus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Enterobacter",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Erwinia",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Serratia",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Pseudoalteromonas",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Vibrio",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Klebsiella",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Acinetobacter",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Pseudomonas",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Plesiomonas",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Citrobacter",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Comamonas",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Shewanella",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Chryseobacterium",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Sphingobacterium",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Corynebacterium",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Micrococcus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Exiguobacterium",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Achromobacter",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Stenotrophomonas",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Paracoccus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Ferrimonas",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Hahella",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Photobacterium",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Xenorhabdus",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Wautersiella",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Acinetobacter_lwoffii",
      "rank": "species",
      "reported_rank": "Species"
    },
    {
      "name": "Acinetobacter_johnsonii",
      "rank": "species",
      "reported_rank": "Species"
    },
    {
      "name": "Acinetobacter_rhizosphaerae",
      "rank": "species",
      "reported_rank": "Species"
    },
    {
      "name": "Enhydrobacter",
      "rank": "genus",
      "reported_rank": "Genus"
    },
    {
      "name": "Plesiomonas_shigelloides",
      "rank": "species",
      "reported_rank": "Species"
    },
    {
      "name": "Erwinia_dispersa",
      "rank": "species",
      "reported_rank": "Species"
    },
    {
      "name": "Enterobacter_cloacae",
      "rank": "species",
      "reported_rank": "Species"
    },
    {
      "name": "Macrococcus_caseolyticus",
      "rank": "species",
      "reported_rank": "Species"
    },
    {
      "name": "Lysinibacillus_boronitolerans",
      "rank": "species",
      "reported_rank": "Species"
    },
    {
      "name": "Bacillus_cereus",
      "rank": "species",
      "reported_rank": "Species"
    },
    {
      "name": "Bacillus_flexus",
      "rank": "species",
      "reported_rank": "Species"
    },
    {
      "name": "Vagococcus_salmoninarum",
      "rank": "species",
      "reported_rank": "Species"
    }
  ],
  "bacterial_composition": [
    {
      "sample_code": "IB-0",
      "food_name": "Idli batter (0h)",
      "description": "Freshly ground and mixed idli batter before fermentation",
      "taxon_name": "Proteobacteria",
      "reported_rank": "phylum",
      "relative_abundance": 97.0,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Dominant phylum at initial stage; reversed to 93% in abstract and 97% in results"
    },
    {
      "sample_code": "IB-0",
      "food_name": "Idli batter (0h)",
      "description": "Freshly ground and mixed idli batter before fermentation",
      "taxon_name": "Firmicutes",
      "reported_rank": "phylum",
      "relative_abundance": 3.0,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Low abundance at initial stage; increased during fermentation"
    },
    {
      "sample_code": "IB-06",
      "food_name": "Idli batter (6h)",
      "description": "Idli batter after 6 hours fermentation",
      "taxon_name": "Proteobacteria",
      "reported_rank": "phylum",
      "relative_abundance": 93.0,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Still dominant at 6h; Proteobacteria remained high"
    },
    {
      "sample_code": "IB-06",
      "food_name": "Idli batter (6h)",
      "description": "Idli batter after 6 hours fermentation",
      "taxon_name": "Firmicutes",
      "reported_rank": "phylum",
      "relative_abundance": 7.0,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Low but increasing abundance at 6h"
    },
    {
      "sample_code": "IB-12",
      "food_name": "Idli batter (12h)",
      "description": "Idli batter after 12 hours fermentation",
      "taxon_name": "Firmicutes",
      "reported_rank": "phylum",
      "relative_abundance": 50.0,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Firmicutes and Proteobacteria roughly equal at 12h; major shift point in fermentation"
    },
    {
      "sample_code": "IB-12",
      "food_name": "Idli batter (12h)",
      "description": "Idli batter after 12 hours fermentation",
      "taxon_name": "Proteobacteria",
      "reported_rank": "phylum",
      "relative_abundance": 50.0,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Equal with Firmicutes at 12h; transition point in bacterial community"
    },
    {
      "sample_code": "IB-15",
      "food_name": "Idli batter (15h)",
      "description": "Idli batter after 15 hours fermentation",
      "taxon_name": "Firmicutes",
      "reported_rank": "phylum",
      "relative_abundance": 68.0,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Dominant phylum at end of fermentation; increased from 3% to 68% (70% in discussion)"
    },
    {
      "sample_code": "IB-15",
      "food_name": "Idli batter (15h)",
      "description": "Idli batter after 15 hours fermentation",
      "taxon_name": "Proteobacteria",
      "reported_rank": "phylum",
      "relative_abundance": 31.0,
      "is_dominant": true,
      "measurement_type": "relative_abundance",
      "notes": "Decreased from 93-97% to 31% (29% in discussion) due to organic acid production by LAB"
    },
    {
      "sample_code": "IB-15",
      "food_name": "Idli batter (15h)",
      "description": "Idli batter after 15 hours fermentation",
      "taxon_name": "Bacteroidetes",
      "reported_rank": "phylum",
      "relative_abundance": 1.0,
      "is_dominant": false,
      "measurement_type": "relative_abundance",
      "notes": "Trace amount observed at 15h; also present at 6h and 12h"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Firmicutes",
      "reported_rank": "phylum",
      "relative_abundance": null,
      "is_dominant": true,
      "measurement_type": "presence_only",
      "notes": "One of two predominant bacterial phyla; increased from 3-7% to 68-70% during fermentation"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Proteobacteria",
      "reported_rank": "phylum",
      "relative_abundance": null,
      "is_dominant": true,
      "measurement_type": "presence_only",
      "notes": "One of two predominant bacterial phyla; decreased from 93-97% to 29-31% during fermentation"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Fusobacteria",
      "reported_rank": "phylum",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Present in various proportions throughout fermentation"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Actinobacteria",
      "reported_rank": "phylum",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Trace amounts observed at 6h and 12h intervals"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Bacteroidetes",
      "reported_rank": "phylum",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "1% observed at 6h, 12h and 15h intervals"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Lactococcus",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": true,
      "measurement_type": "presence_only",
      "notes": "Major genus from Firmicutes; increased after 12h, potential starter culture candidate"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Weissella",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": true,
      "measurement_type": "presence_only",
      "notes": "Major genus from Firmicutes; increased after 12h, known for EPS production and probiotic potential"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Lactobacillus",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": true,
      "measurement_type": "presence_only",
      "notes": "Major genus from Firmicutes; lactic acid producer, potential starter culture"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Enterococcus",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": true,
      "measurement_type": "presence_only",
      "notes": "Major genus from Firmicutes; increased after 12h, bacteriocin producer"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Bacillus",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": true,
      "measurement_type": "presence_only",
      "notes": "Major genus from Firmicutes; present throughout fermentation"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Macrococcus",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus from Firmicutes; observed in idli batter"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Enterobacter",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": true,
      "measurement_type": "presence_only",
      "notes": "Major genus from Proteobacteria; dominant in early fermentation, decreased over time"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Erwinia",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus from Proteobacteria; present in early fermentation stages"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Serratia",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus from Proteobacteria; present in idli batter"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Pseudoalteromonas",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus from Proteobacteria; present in idli batter"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Vibrio",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus from Proteobacteria; present in idli batter"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Klebsiella",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus from Proteobacteria; present in idli batter"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Acinetobacter",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus from Proteobacteria; highest fold change decrease after 12h"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Pseudomonas",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus from Proteobacteria; increased after 12h"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Pediococcus",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus from Firmicutes; present in idli batter, known bacteriocin producer"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Staphylococcus",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus from Firmicutes; depleted after 12h"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Micrococcus",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus observed in initial 12h interval, depleted after 12h"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Corynebacterium",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus observed after 12h"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Clostridium",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus observed after 12h"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Sphingobacterium",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus observed after 12h"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Wautersiella",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus observed after 12h"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Lysinibacillus",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus observed after 12h"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Paenibacillus",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus observed after 12h"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Comamonas",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus observed after 12h"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Shewanella",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus observed after 12h"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Chryseobacterium",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus observed in initial 12h interval, depleted after 12h"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Exiguobacterium",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus observed in initial 12h interval, depleted after 12h"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Achromobacter",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus observed in initial 12h interval, depleted after 12h"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Citrobacter",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus observed in initial 12h interval, depleted after 12h"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Enhydrobacter",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus observed in initial 12h interval, depleted after 12h"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Ferrimonas",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus observed in initial 12h interval, depleted after 12h"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Paracoccus",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus observed in initial 12h interval, depleted after 12h"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Plesiomonas",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus observed in initial 12h interval, depleted after 12h"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Serratia",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus observed in initial 12h interval, depleted after 12h"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Stenotrophomonas",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus observed in initial 12h interval, depleted after 12h"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Vibrio",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus observed in initial 12h interval, depleted after 12h"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Xenorhabdus",
      "reported_rank": "genus",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Genus observed in initial 12h interval, depleted after 12h"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Bacillaceae",
      "reported_rank": "family",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Family within Firmicutes; present throughout fermentation"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Enterococcaceae",
      "reported_rank": "family",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Family within Firmicutes; present in idli batter"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Lactobacillaceae",
      "reported_rank": "family",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Family within Firmicutes; present in idli batter"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Leuconostocaceae",
      "reported_rank": "family",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Family within Firmicutes; present in idli batter"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Streptococcaceae",
      "reported_rank": "family",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Family within Firmicutes; present in idli batter"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Enterobacteriaceae",
      "reported_rank": "family",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Family within Proteobacteria; dominant in early fermentation"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Moraxellaceae",
      "reported_rank": "family",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Family within Proteobacteria; present in idli batter"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Pseudomonadaceae",
      "reported_rank": "family",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Family within Proteobacteria; present in idli batter"
    },
    {
      "sample_code": "ALL",
      "food_name": "Idli batter (pooled)",
      "description": "Pooled across all fermentation time points",
      "taxon_name": "Vibrionaceae",
      "reported_rank": "family",
      "relative_abundance": null,
      "is_dominant": false,
      "measurement_type": "presence_only",
      "notes": "Family within Proteobacteria; present in idli batter"
    },
    {
      "sample_code": "IB-0",
      "food_name": "Idli batter (0h)",
      "description": "Freshly ground and mixed idli batter before fermentation",
      "taxon_name": "Enterobacteriaceae",
      "reported_rank": "family",
      "relative_abundance": null,
      "is_dominant": true,
      "measurement_type": "presence_only",
      "notes": "Dominant family at 0h; 8 species phylotypes observed"
    },
    {
      "sample_code": "IB-06",
      "food_name": "Idli batter (6h)",
      "description": "Idli batter after 6 hours fermentation",
      "taxon_name": "Enterobacteriaceae",
      "reported_rank": "family",
      "relative_abundance": null,
      "is_dominant": true,
      "measurement_type": "presence_only",
      "notes": "Dominant family at 6h; 8 species phylotypes observed"
    },
    {
      "sample_code": "IB-12",
      "food_name": "Idli batter (12h)",
      "description": "Idli batter after 12 hours fermentation",
      "taxon_name": "Enterobacteriaceae",
      "reported_rank": "family",
      "relative_abundance": null,
      "is_dominant": true,
      "measurement_type": "presence_only",
      "notes": "Dominant family at 12h; 8 species phylotypes observed"
    },
    {
      "sample_code": "IB-15",
      "food_name": "Idli batter (15h)",
      "description": "Idli batter after 15 hours fermentation",
      "taxon_name": "Enterobacteriaceae",
      "reported_rank": "family",
      "relative_abundance": null,
      "is_dominant": true,
      "measurement_type": "presence_only",
      "notes": "Dominant family at 15h; 7 species phylotypes observed"
    }
  ]
}
