/**
 * Seed bacterial composition for Dataset 3 (Mizoram Fermented Foods - 9 Time-Series Samples: 3D, 5D, 7D)
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedBacterialComposition(prisma) {
  console.log("Seeding bacterial composition (Dataset 3)...");

  // Generic helper function to resolve sample_id dynamically from food_name and description
  const getSampleId = async (food_name, description) => {
    const sample = await prisma.samples.findFirst({
      where: { food_name, description },
    });
    if (!sample) {
      throw new Error(`Sample not found for food_name: "${food_name}", description: "${description}"`);
    }
    return sample.sample_id;
  };

  // Generic helper function to resolve tax_id dynamically from taxon_name
  const getTaxId = async (taxon_name) => {
    const taxon = await prisma.taxonomy.findFirst({
      where: { normalized_name: taxon_name.toLowerCase().trim() },
    });
    return taxon ? taxon.tax_id : null;
  };

  const compositionData = [
    // ==========================================
    // 1. PHYLUM LEVEL DATA (3rd Day — FBS-3D, FSB-3D, FPF-3D)
    // ==========================================

    // --- Tuaither (Bamboo Shoot - FBS-3D) ---
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (3rd day)", taxon_name: "Firmicutes", reported_rank: "phylum", relative_abundance: 94.99, is_dominant: true, measurement_type: "relative_abundance", notes: "Bamboo Shoot (FBS-3D)" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (3rd day)", taxon_name: "Proteobacteria", reported_rank: "phylum", relative_abundance: 4.67, is_dominant: false, measurement_type: "relative_abundance", notes: "Bamboo Shoot (FBS-3D)" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (3rd day)", taxon_name: "Bacteroidetes", reported_rank: "phylum", relative_abundance: 0.13, is_dominant: false, measurement_type: "relative_abundance", notes: "Bamboo Shoot (FBS-3D)" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (3rd day)", taxon_name: "Actinobacteria", reported_rank: "phylum", relative_abundance: 0.077, is_dominant: false, measurement_type: "relative_abundance", notes: "Bamboo Shoot (FBS-3D)" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (3rd day)", taxon_name: "Verrucomicrobia", reported_rank: "phylum", relative_abundance: 0.023, is_dominant: false, measurement_type: "relative_abundance", notes: "Bamboo Shoot (FBS-3D)" },

    // --- Bekang (Soybean - FSB-3D) ---
    { food_name: "Bekang", description: "Fermented Soybean (3rd day)", taxon_name: "Firmicutes", reported_rank: "phylum", relative_abundance: 82.72, is_dominant: true, measurement_type: "relative_abundance", notes: "Soybean (FSB-3D)" },
    { food_name: "Bekang", description: "Fermented Soybean (3rd day)", taxon_name: "Proteobacteria", reported_rank: "phylum", relative_abundance: 15.01, is_dominant: false, measurement_type: "relative_abundance", notes: "Soybean (FSB-3D)" },
    { food_name: "Bekang", description: "Fermented Soybean (3rd day)", taxon_name: "Bacteroidetes", reported_rank: "phylum", relative_abundance: 0.027, is_dominant: false, measurement_type: "relative_abundance", notes: "Soybean (FSB-3D)" },
    { food_name: "Bekang", description: "Fermented Soybean (3rd day)", taxon_name: "Actinobacteria", reported_rank: "phylum", relative_abundance: 2.14, is_dominant: false, measurement_type: "relative_abundance", notes: "Soybean (FSB-3D)" },
    { food_name: "Bekang", description: "Fermented Soybean (3rd day)", taxon_name: "Verrucomicrobia", reported_rank: "phylum", relative_abundance: 0.002, is_dominant: false, measurement_type: "relative_abundance", notes: "Soybean (FSB-3D)" },

    // --- Sa-um (Pork Fat - FPF-3D) ---
    { food_name: "Sa-um", description: "Fermented Pork Fat (3rd day)", taxon_name: "Firmicutes", reported_rank: "phylum", relative_abundance: 92.91, is_dominant: true, measurement_type: "relative_abundance", notes: "Pork Fat (FPF-3D)" },
    { food_name: "Sa-um", description: "Fermented Pork Fat (3rd day)", taxon_name: "Proteobacteria", reported_rank: "phylum", relative_abundance: 6.82, is_dominant: false, measurement_type: "relative_abundance", notes: "Pork Fat (FPF-3D)" },
    { food_name: "Sa-um", description: "Fermented Pork Fat (3rd day)", taxon_name: "Bacteroidetes", reported_rank: "phylum", relative_abundance: 0.038, is_dominant: false, measurement_type: "relative_abundance", notes: "Pork Fat (FPF-3D)" },
    { food_name: "Sa-um", description: "Fermented Pork Fat (3rd day)", taxon_name: "Actinobacteria", reported_rank: "phylum", relative_abundance: 0.18, is_dominant: false, measurement_type: "relative_abundance", notes: "Pork Fat (FPF-3D)" },
    { food_name: "Sa-um", description: "Fermented Pork Fat (3rd day)", taxon_name: "Verrucomicrobia", reported_rank: "phylum", relative_abundance: 0.0049, is_dominant: false, measurement_type: "relative_abundance", notes: "Pork Fat (FPF-3D)" },

    // ==========================================
    // 2. GENUS LEVEL DATA — TUAITHER (FBS-3D, FBS-5D, FBS-7D)
    // ==========================================

    // --- FBS-3D ---
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (3rd day)", taxon_name: "Lactobacillus", reported_rank: "genus", relative_abundance: 91.64, is_dominant: true, measurement_type: "relative_abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (3rd day)", taxon_name: "Weissella", reported_rank: "genus", relative_abundance: 1.27, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (3rd day)", taxon_name: "Pediococcus", reported_rank: "genus", relative_abundance: 1.17, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (3rd day)", taxon_name: "Pseudomonas", reported_rank: "genus", relative_abundance: 0.36, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (3rd day)", taxon_name: "Chromobacterium", reported_rank: "genus", relative_abundance: 0.27, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (3rd day)", taxon_name: "Acinetobacter", reported_rank: "genus", relative_abundance: 0.0, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (3rd day)", taxon_name: "Corynebacterium", reported_rank: "genus", relative_abundance: 0.0, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (3rd day)", taxon_name: "Sphingobacterium", reported_rank: "genus", relative_abundance: 0.0, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (3rd day)", taxon_name: "Unclassified", reported_rank: "unknown", relative_abundance: 3.13, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (3rd day)", taxon_name: "Others", reported_rank: "unknown", relative_abundance: 1.86, is_dominant: false, measurement_type: "relative_abundance" },

    // --- FBS-5D ---
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (5th day)", taxon_name: "Lactobacillus", reported_rank: "genus", relative_abundance: 77.16, is_dominant: true, measurement_type: "relative_abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (5th day)", taxon_name: "Weissella", reported_rank: "genus", relative_abundance: 0.0, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (5th day)", taxon_name: "Pediococcus", reported_rank: "genus", relative_abundance: 2.80, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (5th day)", taxon_name: "Pseudomonas", reported_rank: "genus", relative_abundance: 2.24, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (5th day)", taxon_name: "Chromobacterium", reported_rank: "genus", relative_abundance: 2.29, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (5th day)", taxon_name: "Acinetobacter", reported_rank: "genus", relative_abundance: 1.35, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (5th day)", taxon_name: "Corynebacterium", reported_rank: "genus", relative_abundance: 0.0, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (5th day)", taxon_name: "Sphingobacterium", reported_rank: "genus", relative_abundance: 0.0, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (5th day)", taxon_name: "Unclassified", reported_rank: "unknown", relative_abundance: 2.28, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (5th day)", taxon_name: "Others", reported_rank: "unknown", relative_abundance: 11.58, is_dominant: false, measurement_type: "relative_abundance" },

    // --- FBS-7D ---
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (7th day)", taxon_name: "Lactobacillus", reported_rank: "genus", relative_abundance: 78.88, is_dominant: true, measurement_type: "relative_abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (7th day)", taxon_name: "Weissella", reported_rank: "genus", relative_abundance: 0.0, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (7th day)", taxon_name: "Pediococcus", reported_rank: "genus", relative_abundance: 0.0, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (7th day)", taxon_name: "Pseudomonas", reported_rank: "genus", relative_abundance: 1.25, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (7th day)", taxon_name: "Chromobacterium", reported_rank: "genus", relative_abundance: 0.0, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (7th day)", taxon_name: "Acinetobacter", reported_rank: "genus", relative_abundance: 1.14, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (7th day)", taxon_name: "Corynebacterium", reported_rank: "genus", relative_abundance: 6.58, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (7th day)", taxon_name: "Sphingobacterium", reported_rank: "genus", relative_abundance: 2.74, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (7th day)", taxon_name: "Unclassified", reported_rank: "unknown", relative_abundance: 2.27, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (7th day)", taxon_name: "Others", reported_rank: "unknown", relative_abundance: 7.11, is_dominant: false, measurement_type: "relative_abundance" },

    // ==========================================
    // 3. GENUS LEVEL DATA — SA-UM (FPF-3D, FPF-5D, FPF-7D)
    // ==========================================

    // --- FPF-3D ---
    { food_name: "Sa-um", description: "Fermented Pork Fat (3rd day)", taxon_name: "Clostridium", reported_rank: "genus", relative_abundance: 72.48, is_dominant: true, measurement_type: "relative_abundance" },
    { food_name: "Sa-um", description: "Fermented Pork Fat (3rd day)", taxon_name: "Sutterella", reported_rank: "genus", relative_abundance: 12.54, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Sa-um", description: "Fermented Pork Fat (3rd day)", taxon_name: "Lactobacillus", reported_rank: "genus", relative_abundance: 4.81, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Sa-um", description: "Fermented Pork Fat (3rd day)", taxon_name: "Enterococcus", reported_rank: "genus", relative_abundance: 1.92, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Sa-um", description: "Fermented Pork Fat (3rd day)", taxon_name: "Trabulsiella", reported_rank: "genus", relative_abundance: 1.81, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Sa-um", description: "Fermented Pork Fat (3rd day)", taxon_name: "Unclassified", reported_rank: "unknown", relative_abundance: 2.07, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Sa-um", description: "Fermented Pork Fat (3rd day)", taxon_name: "Others", reported_rank: "unknown", relative_abundance: 3.17, is_dominant: false, measurement_type: "relative_abundance" },

    // --- FPF-5D ---
    { food_name: "Sa-um", description: "Fermented Pork Fat (5th day)", taxon_name: "Clostridium", reported_rank: "genus", relative_abundance: 59.48, is_dominant: true, measurement_type: "relative_abundance" },
    { food_name: "Sa-um", description: "Fermented Pork Fat (5th day)", taxon_name: "Sutterella", reported_rank: "genus", relative_abundance: 7.01, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Sa-um", description: "Fermented Pork Fat (5th day)", taxon_name: "Lactobacillus", reported_rank: "genus", relative_abundance: 4.44, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Sa-um", description: "Fermented Pork Fat (5th day)", taxon_name: "Enterococcus", reported_rank: "genus", relative_abundance: 2.67, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Sa-um", description: "Fermented Pork Fat (5th day)", taxon_name: "Trabulsiella", reported_rank: "genus", relative_abundance: 18.45, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Sa-um", description: "Fermented Pork Fat (5th day)", taxon_name: "Unclassified", reported_rank: "unknown", relative_abundance: 3.26, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Sa-um", description: "Fermented Pork Fat (5th day)", taxon_name: "Others", reported_rank: "unknown", relative_abundance: 4.67, is_dominant: false, measurement_type: "relative_abundance" },

    // --- FPF-7D ---
    { food_name: "Sa-um", description: "Fermented Pork Fat (7th day)", taxon_name: "Clostridium", reported_rank: "genus", relative_abundance: 55.40, is_dominant: true, measurement_type: "relative_abundance" },
    { food_name: "Sa-um", description: "Fermented Pork Fat (7th day)", taxon_name: "Sutterella", reported_rank: "genus", relative_abundance: 4.85, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Sa-um", description: "Fermented Pork Fat (7th day)", taxon_name: "Lactobacillus", reported_rank: "genus", relative_abundance: 4.41, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Sa-um", description: "Fermented Pork Fat (7th day)", taxon_name: "Enterococcus", reported_rank: "genus", relative_abundance: 5.28, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Sa-um", description: "Fermented Pork Fat (7th day)", taxon_name: "Trabulsiella", reported_rank: "genus", relative_abundance: 13.36, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Sa-um", description: "Fermented Pork Fat (7th day)", taxon_name: "Unclassified", reported_rank: "unknown", relative_abundance: 5.24, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Sa-um", description: "Fermented Pork Fat (7th day)", taxon_name: "Others", reported_rank: "unknown", relative_abundance: 11.43, is_dominant: false, measurement_type: "relative_abundance" },

    // ==========================================
    // 4. GENUS LEVEL DATA — BEKANG (FSB-3D, FSB-5D, FSB-7D)
    // ==========================================

    // --- FSB-3D ---
    { food_name: "Bekang", description: "Fermented Soybean (3rd day)", taxon_name: "Staphylococcus", reported_rank: "genus", relative_abundance: 52.36, is_dominant: true, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (3rd day)", taxon_name: "Bacillus", reported_rank: "genus", relative_abundance: 38.47, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (3rd day)", taxon_name: "Pseudomonas", reported_rank: "genus", relative_abundance: 6.40, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (3rd day)", taxon_name: "Enterococcus", reported_rank: "genus", relative_abundance: 0.47, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (3rd day)", taxon_name: "Paenibacillus", reported_rank: "genus", relative_abundance: 0.19, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (3rd day)", taxon_name: "Proteus", reported_rank: "genus", relative_abundance: 0.0, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (3rd day)", taxon_name: "Ignatzschineria", reported_rank: "genus", relative_abundance: 0.0, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (3rd day)", taxon_name: "Corynebacterium", reported_rank: "genus", relative_abundance: 0.0, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (3rd day)", taxon_name: "Brevibacterium", reported_rank: "genus", relative_abundance: 0.0, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (3rd day)", taxon_name: "Unclassified", reported_rank: "unknown", relative_abundance: 1.12, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (3rd day)", taxon_name: "Others", reported_rank: "unknown", relative_abundance: 0.95, is_dominant: false, measurement_type: "relative_abundance" },

    // --- FSB-5D ---
    { food_name: "Bekang", description: "Fermented Soybean (5th day)", taxon_name: "Staphylococcus", reported_rank: "genus", relative_abundance: 39.48, is_dominant: true, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (5th day)", taxon_name: "Bacillus", reported_rank: "genus", relative_abundance: 35.56, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (5th day)", taxon_name: "Pseudomonas", reported_rank: "genus", relative_abundance: 0.0, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (5th day)", taxon_name: "Enterococcus", reported_rank: "genus", relative_abundance: 0.0, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (5th day)", taxon_name: "Paenibacillus", reported_rank: "genus", relative_abundance: 0.0, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (5th day)", taxon_name: "Proteus", reported_rank: "genus", relative_abundance: 5.89, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (5th day)", taxon_name: "Ignatzschineria", reported_rank: "genus", relative_abundance: 5.49, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (5th day)", taxon_name: "Corynebacterium", reported_rank: "genus", relative_abundance: 4.35, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (5th day)", taxon_name: "Brevibacterium", reported_rank: "genus", relative_abundance: 0.0, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (5th day)", taxon_name: "Unclassified", reported_rank: "unknown", relative_abundance: 2.98, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (5th day)", taxon_name: "Others", reported_rank: "unknown", relative_abundance: 6.23, is_dominant: false, measurement_type: "relative_abundance" },

    // --- FSB-7D ---
    { food_name: "Bekang", description: "Fermented Soybean (7th day)", taxon_name: "Staphylococcus", reported_rank: "genus", relative_abundance: 17.90, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (7th day)", taxon_name: "Bacillus", reported_rank: "genus", relative_abundance: 37.87, is_dominant: true, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (7th day)", taxon_name: "Pseudomonas", reported_rank: "genus", relative_abundance: 9.67, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (7th day)", taxon_name: "Enterococcus", reported_rank: "genus", relative_abundance: 0.0, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (7th day)", taxon_name: "Paenibacillus", reported_rank: "genus", relative_abundance: 0.0, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (7th day)", taxon_name: "Proteus", reported_rank: "genus", relative_abundance: 0.0, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (7th day)", taxon_name: "Ignatzschineria", reported_rank: "genus", relative_abundance: 0.0, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (7th day)", taxon_name: "Corynebacterium", reported_rank: "genus", relative_abundance: 18.13, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (7th day)", taxon_name: "Brevibacterium", reported_rank: "genus", relative_abundance: 2.77, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (7th day)", taxon_name: "Unclassified", reported_rank: "unknown", relative_abundance: 3.61, is_dominant: false, measurement_type: "relative_abundance" },
    { food_name: "Bekang", description: "Fermented Soybean (7th day)", taxon_name: "Others", reported_rank: "unknown", relative_abundance: 10.02, is_dominant: false, measurement_type: "relative_abundance" },

    // ==========================================
    // 5. QUALITATIVE PRESENCE DATA (Text/Figure Mentions)
    // ==========================================

    // --- Phyla Context ---
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (3rd day)", taxon_name: "Planctomycetes", reported_rank: "phylum", presence: true, measurement_type: "presence_only", notes: "Mentioned as <1% abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (3rd day)", taxon_name: "Fusobacteria", reported_rank: "phylum", presence: true, measurement_type: "presence_only", notes: "Mentioned as <1% abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (5th day)", taxon_name: "Chloroflexi", reported_rank: "phylum", presence: true, measurement_type: "presence_only", notes: "Detected on 5th and 7th day" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (7th day)", taxon_name: "Chloroflexi", reported_rank: "phylum", presence: true, measurement_type: "presence_only", notes: "Detected on 5th and 7th day" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (3rd day)", taxon_name: "Acidobacteria", reported_rank: "phylum", presence: true, measurement_type: "presence_only", notes: "Mentioned as <1% abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (3rd day)", taxon_name: "Nitrospirae", reported_rank: "phylum", presence: true, measurement_type: "presence_only", notes: "Mentioned as <1% abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (3rd day)", taxon_name: "Spirochaetes", reported_rank: "phylum", presence: true, measurement_type: "presence_only", notes: "Mentioned as <1% abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (3rd day)", taxon_name: "Gemmatimonadetes", reported_rank: "phylum", presence: true, measurement_type: "presence_only", notes: "Mentioned as <1% abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (3rd day)", taxon_name: "Synergistetes", reported_rank: "phylum", presence: true, measurement_type: "presence_only", notes: "Mentioned as <1% abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (3rd day)", taxon_name: "Lentisphaerae", reported_rank: "phylum", presence: true, measurement_type: "presence_only", notes: "Mentioned as <1% abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (3rd day)", taxon_name: "Elusimicrobia", reported_rank: "phylum", presence: true, measurement_type: "presence_only", notes: "Mentioned as <1% abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (3rd day)", taxon_name: "Chlorobi", reported_rank: "phylum", presence: true, measurement_type: "presence_only", notes: "Mentioned as <1% abundance" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (5th day)", taxon_name: "Tenericutes", reported_rank: "phylum", presence: true, measurement_type: "presence_only", notes: "Detected on 5th and 7th day" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (7th day)", taxon_name: "Tenericutes", reported_rank: "phylum", presence: true, measurement_type: "presence_only", notes: "Detected on 5th and 7th day" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (5th day)", taxon_name: "Fibrobacteres", reported_rank: "phylum", presence: true, measurement_type: "presence_only", notes: "Detected on 5th and 7th day" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (7th day)", taxon_name: "Fibrobacteres", reported_rank: "phylum", presence: true, measurement_type: "presence_only", notes: "Detected on 5th and 7th day" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (5th day)", taxon_name: "Caldiserica", reported_rank: "phylum", presence: true, measurement_type: "presence_only", notes: "Detected on 5th and 7th day" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (7th day)", taxon_name: "Caldiserica", reported_rank: "phylum", presence: true, measurement_type: "presence_only", notes: "Detected on 5th and 7th day" },
  ];

  for (const item of compositionData) {
    const sample_id = item.sample_id ?? await getSampleId(item.food_name, item.description);
    const tax_id = item.tax_id ?? await getTaxId(item.taxon_name);

    const dataObj = {
      sample_id,
      tax_id,
      taxon_name: item.taxon_name,
      relative_abundance: item.relative_abundance,
      read_count: item.read_count,
      presence: item.presence,
      is_dominant: item.is_dominant,
      reported_rank: item.reported_rank,
      measurement_type: item.measurement_type || "relative_abundance",
      confidence_score: item.confidence_score,
      normalization_method: item.normalization_method,
      notes: item.notes,
      created_at: item.created_at,
    };

    await prisma.bacterial_composition.upsert({
      where: {
        sample_id_taxon_name_reported_rank_measurement_type: {
          sample_id,
          taxon_name: item.taxon_name,
          reported_rank: item.reported_rank,
          measurement_type: dataObj.measurement_type,
        },
      },
      update: dataObj,
      create: dataObj,
    });
  }

  console.log(`Seeded ${compositionData.length} bacterial composition records.`);
}
