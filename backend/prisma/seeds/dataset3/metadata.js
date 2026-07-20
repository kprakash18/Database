/**
 * Seed metadata for Dataset 3 (Mizoram Fermented Foods - 9 Time-Point Samples)
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedMetadata(prisma) {
  console.log("Seeding metadata (Dataset 3)...");

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

  const sharedProtocol = {
    sampling_method: "Collected from local vendors in Aizawl city market places",
    fermentation_type: "Natural/spontaneous (uncontrolled)",
    dna_extraction_kit: "QIAGEN DNeasy Kit",
    sequencing_platform: "Illumina MiSeq",
    target_region: "V3-V4 variable region of 16S rRNA gene",
    primers: "16SrRNAF (5′-GCCTACGGGNGGCWGCAG-3′) and 16SrRNAR (5′-ACTACHVGGGTATCTAATCC-3′)",
    read_type: "2× 300 bp paired-end reads",
    sequencing_facility: "Eurofins",
    bioinformatics_pipeline: "QIIME v1.9.1, Trimmomatic v0.38, FLASH v1.2.11",
    database: "Greengene (v13_8)",
    otu_clustering: "97% similarity cutoff",
    classifier: "RDP classifier (v2.2)",
    storage: "Stored at 4°C and used immediately for analysis",
  };

  const metadataData = [
    // --- Bamboo Shoot (Tuaither) ---
    {
      food_name: "Tuaither",
      description: "Fermented Bamboo Shoot (3rd day)",
      location: "Aizawl city market places, Mizoram state, North-East India",
      additional_info: {
        sample_code: "FBS-3D",
        food_type: "Fermented Bamboo Shoot",
        local_name: "Tuaither",
        raw_material: "Bamboo shoots",
        collection_day: "3rd day",
        replicates: "Triplicates pooled",
        ...sharedProtocol,
      },
    },
    {
      food_name: "Tuaither",
      description: "Fermented Bamboo Shoot (5th day)",
      location: "Aizawl city market places, Mizoram state, North-East India",
      additional_info: {
        sample_code: "FBS-5D",
        food_type: "Fermented Bamboo Shoot",
        local_name: "Tuaither",
        raw_material: "Bamboo shoots",
        collection_day: "5th day",
        replicates: "Triplicates pooled",
        ...sharedProtocol,
      },
    },
    {
      food_name: "Tuaither",
      description: "Fermented Bamboo Shoot (7th day)",
      location: "Aizawl city market places, Mizoram state, North-East India",
      additional_info: {
        sample_code: "FBS-7D",
        food_type: "Fermented Bamboo Shoot",
        local_name: "Tuaither",
        raw_material: "Bamboo shoots",
        collection_day: "7th day",
        replicates: "Triplicates pooled",
        ...sharedProtocol,
      },
    },

    // --- Soybean (Bekang) ---
    {
      food_name: "Bekang",
      description: "Fermented Soybean (3rd day)",
      location: "Aizawl city market places, Mizoram state, North-East India",
      additional_info: {
        sample_code: "FSB-3D",
        food_type: "Fermented Soybean",
        local_name: "Bekang",
        raw_material: "Soybean",
        collection_day: "3rd day",
        replicates: "Triplicates pooled",
        ...sharedProtocol,
      },
    },
    {
      food_name: "Bekang",
      description: "Fermented Soybean (5th day)",
      location: "Aizawl city market places, Mizoram state, North-East India",
      additional_info: {
        sample_code: "FSB-5D",
        food_type: "Fermented Soybean",
        local_name: "Bekang",
        raw_material: "Soybean",
        collection_day: "5th day",
        replicates: "Triplicates pooled",
        ...sharedProtocol,
      },
    },
    {
      food_name: "Bekang",
      description: "Fermented Soybean (7th day)",
      location: "Aizawl city market places, Mizoram state, North-East India",
      additional_info: {
        sample_code: "FSB-7D",
        food_type: "Fermented Soybean",
        local_name: "Bekang",
        raw_material: "Soybean",
        collection_day: "7th day",
        replicates: "Triplicates pooled",
        ...sharedProtocol,
      },
    },

    // --- Pork Fat (Sa-um) ---
    {
      food_name: "Sa-um",
      description: "Fermented Pork Fat (3rd day)",
      location: "Aizawl city market places, Mizoram state, North-East India",
      additional_info: {
        sample_code: "FPF-3D",
        food_type: "Fermented Pork Fat",
        local_name: "Sa-um",
        raw_material: "Pork fat",
        collection_day: "3rd day",
        replicates: "Triplicates pooled",
        ...sharedProtocol,
      },
    },
    {
      food_name: "Sa-um",
      description: "Fermented Pork Fat (5th day)",
      location: "Aizawl city market places, Mizoram state, North-East India",
      additional_info: {
        sample_code: "FPF-5D",
        food_type: "Fermented Pork Fat",
        local_name: "Sa-um",
        raw_material: "Pork fat",
        collection_day: "5th day",
        replicates: "Triplicates pooled",
        ...sharedProtocol,
      },
    },
    {
      food_name: "Sa-um",
      description: "Fermented Pork Fat (7th day)",
      location: "Aizawl city market places, Mizoram state, North-East India",
      additional_info: {
        sample_code: "FPF-7D",
        food_type: "Fermented Pork Fat",
        local_name: "Sa-um",
        raw_material: "Pork fat",
        collection_day: "7th day",
        replicates: "Triplicates pooled",
        ...sharedProtocol,
      },
    },
  ];

  for (const item of metadataData) {
    const sample_id = item.sample_id ?? await getSampleId(item.food_name, item.description);

    const dataObj = {
      sample_id,
      location: item.location,
      collection_date: item.collection_date,
      temperature: item.temperature,
      ph: item.ph,
      additional_info: item.additional_info,
      created_at: item.created_at,
    };

    const existing = await prisma.metadata.findFirst({
      where: { sample_id },
    });

    if (!existing) {
      await prisma.metadata.create({ data: dataObj });
    } else {
      await prisma.metadata.update({
        where: { metadata_id: existing.metadata_id },
        data: dataObj,
      });
    }
  }

  console.log(`Seeded ${metadataData.length} metadata records.`);
}
