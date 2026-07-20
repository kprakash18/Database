/**
 * Seed bacterial composition for Dataset 4 (Sikkim Fermented/Smoked Fish Products)
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedBacterialComposition(prisma) {
  console.log("Seeding bacterial composition (Dataset 4)...");

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
    // Add bacterial composition relative abundance and presence records for Dataset 4 here
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

  console.log(`Seeded ${compositionData.length} bacterial composition records for Dataset 4.`);
}
