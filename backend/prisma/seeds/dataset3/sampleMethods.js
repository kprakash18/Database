/**
 * Seed sample methods join table for Dataset 3 (Mizoram Fermented Foods - 9 Time-Point Samples)
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedSampleMethods(prisma) {
  console.log("Seeding sample-method relationships (Dataset 3)...");

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

  // Generic helper function to resolve method_id dynamically from method_name and platform
  const getMethodId = async (method_name, platform) => {
    const method = await prisma.sequencing_methods.findFirst({
      where: { method_name, platform },
    });
    if (!method) {
      throw new Error(`Sequencing method not found for method_name: "${method_name}", platform: "${platform}"`);
    }
    return method.method_id;
  };

  const sampleMethodsData = [
    // Tuaither (3d, 5d, 7d)
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (3rd day)", method_name: "16S rRNA", platform: "Illumina MiSeq" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (5th day)", method_name: "16S rRNA", platform: "Illumina MiSeq" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (7th day)", method_name: "16S rRNA", platform: "Illumina MiSeq" },

    // Bekang (3d, 5d, 7d)
    { food_name: "Bekang", description: "Fermented Soybean (3rd day)", method_name: "16S rRNA", platform: "Illumina MiSeq" },
    { food_name: "Bekang", description: "Fermented Soybean (5th day)", method_name: "16S rRNA", platform: "Illumina MiSeq" },
    { food_name: "Bekang", description: "Fermented Soybean (7th day)", method_name: "16S rRNA", platform: "Illumina MiSeq" },

    // Sa-um (3d, 5d, 7d)
    { food_name: "Sa-um", description: "Fermented Pork Fat (3rd day)", method_name: "16S rRNA", platform: "Illumina MiSeq" },
    { food_name: "Sa-um", description: "Fermented Pork Fat (5th day)", method_name: "16S rRNA", platform: "Illumina MiSeq" },
    { food_name: "Sa-um", description: "Fermented Pork Fat (7th day)", method_name: "16S rRNA", platform: "Illumina MiSeq" },
  ];

  for (const item of sampleMethodsData) {
    const sample_id = item.sample_id ?? await getSampleId(item.food_name, item.description);
    const method_id = item.method_id ?? await getMethodId(item.method_name, item.platform);

    await prisma.sample_methods.upsert({
      where: {
        sample_id_method_id: { sample_id, method_id },
      },
      update: {},
      create: { sample_id, method_id },
    });
  }

  console.log(`Seeded ${sampleMethodsData.length} sample-method relationships.`);
}
