/**
 * Seed metadata for Dataset 4 (Sikkim Fermented/Smoked Fish Products)
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedMetadata(prisma) {
  console.log("Seeding metadata (Dataset 4)...");

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

  const sharedInfo = {
    ncbi_bioproject_id: "PRJNA600094",
    collection_locations: "Gangtok, Singtam, Namchi (Sikkim, India)",
    collection_method: "Aseptically collected in sterile poly-bags, kept in icebox carrier",
    storage: "−20°C",
    moisture_content: "7.6–11.3%",
    shelf_life: "6–8 months at room temperature in moist-free place",
    consumption: "Eaten as curry, fried, pickles, and soup in local diets",
  };

  const metadataData = [
    // --- Suka ko maacha ---
    {
      food_name: "Suka ko maacha",
      description: "Smoked fish product made from Schizothorax spp. (Replicate SM1)",
      location: "Gangtok, Singtam, Namchi (Sikkim, India)",
      additional_info: {
        sample_code: "SM1",
        product_type: "Smoked fish",
        fish_species: "Schizothorax spp.",
        processing_method: "Smoking in kitchen earthen-oven (7–10 days)",
        sra_accession: "SRR10857170",
        ...sharedInfo,
      },
    },
    {
      food_name: "Suka ko maacha",
      description: "Smoked fish product made from Schizothorax spp. (Replicate SM2)",
      location: "Gangtok, Singtam, Namchi (Sikkim, India)",
      additional_info: {
        sample_code: "SM2",
        product_type: "Smoked fish",
        fish_species: "Schizothorax spp.",
        processing_method: "Smoking in kitchen earthen-oven (7–10 days)",
        sra_accession: "SRR10857171",
        ...sharedInfo,
      },
    },
    {
      food_name: "Suka ko maacha",
      description: "Smoked fish product made from Schizothorax spp. (Replicate SM3)",
      location: "Gangtok, Singtam, Namchi (Sikkim, India)",
      additional_info: {
        sample_code: "SM3",
        product_type: "Smoked fish",
        fish_species: "Schizothorax spp.",
        processing_method: "Smoking in kitchen earthen-oven (7–10 days)",
        sra_accession: "SRR10857172",
        ...sharedInfo,
      },
    },

    // --- Sidra ---
    {
      food_name: "Sidra",
      description: "Sun-dried fish product made from Puntius sarana (Replicate SD1)",
      location: "Gangtok, Singtam, Namchi (Sikkim, India)",
      additional_info: {
        sample_code: "SD1",
        product_type: "Sun-dried fish",
        fish_species: "Puntius sarana",
        processing_method: "Sun-drying on bamboo trays (4–7 days)",
        sra_accession: "SRR10857173",
        ...sharedInfo,
      },
    },
    {
      food_name: "Sidra",
      description: "Sun-dried fish product made from Puntius sarana (Replicate SD2)",
      location: "Gangtok, Singtam, Namchi (Sikkim, India)",
      additional_info: {
        sample_code: "SD2",
        product_type: "Sun-dried fish",
        fish_species: "Puntius sarana",
        processing_method: "Sun-drying on bamboo trays (4–7 days)",
        sra_accession: "SRR10857174",
        ...sharedInfo,
      },
    },
    {
      food_name: "Sidra",
      description: "Sun-dried fish product made from Puntius sarana (Replicate SD3)",
      location: "Gangtok, Singtam, Namchi (Sikkim, India)",
      additional_info: {
        sample_code: "SD3",
        product_type: "Sun-dried fish",
        fish_species: "Puntius sarana",
        processing_method: "Sun-drying on bamboo trays (4–7 days)",
        sra_accession: "SRR10857175",
        ...sharedInfo,
      },
    },

    // --- Sukuti ---
    {
      food_name: "Sukuti",
      description: "Sun-dried fish product made from Harpodon nehereus (Replicate SK1)",
      location: "Gangtok, Singtam, Namchi (Sikkim, India)",
      additional_info: {
        sample_code: "SK1",
        product_type: "Sun-dried fish",
        fish_species: "Harpodon nehereus",
        processing_method: "Sun-drying on bamboo trays (4–7 days)",
        sra_accession: "SRR10857176",
        ...sharedInfo,
      },
    },
    {
      food_name: "Sukuti",
      description: "Sun-dried fish product made from Harpodon nehereus (Replicate SK2)",
      location: "Gangtok, Singtam, Namchi (Sikkim, India)",
      additional_info: {
        sample_code: "SK2",
        product_type: "Sun-dried fish",
        fish_species: "Harpodon nehereus",
        processing_method: "Sun-drying on bamboo trays (4–7 days)",
        sra_accession: "SRR10857177",
        ...sharedInfo,
      },
    },
    {
      food_name: "Sukuti",
      description: "Sun-dried fish product made from Harpodon nehereus (Replicate SK3)",
      location: "Gangtok, Singtam, Namchi (Sikkim, India)",
      additional_info: {
        sample_code: "SK3",
        product_type: "Sun-dried fish",
        fish_species: "Harpodon nehereus",
        processing_method: "Sun-drying on bamboo trays (4–7 days)",
        sra_accession: "SRR10857178",
        ...sharedInfo,
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

  console.log(`Seeded ${metadataData.length} metadata records for Dataset 4.`);
}
