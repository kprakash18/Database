/**
 * Seed sample methods join table for Dataset 4 (Sikkim Fermented/Smoked Fish Products)
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedSampleMethods(prisma) {
  console.log("Seeding sample-method relationships (Dataset 4)...");

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
    // Suka ko maacha (SM1, SM2, SM3)
    { food_name: "Suka ko maacha", description: "Smoked fish product made from Schizothorax spp. (Replicate SM1)", method_name: "16S rRNA", platform: "Illumina MiSeq" },
    { food_name: "Suka ko maacha", description: "Smoked fish product made from Schizothorax spp. (Replicate SM2)", method_name: "16S rRNA", platform: "Illumina MiSeq" },
    { food_name: "Suka ko maacha", description: "Smoked fish product made from Schizothorax spp. (Replicate SM3)", method_name: "16S rRNA", platform: "Illumina MiSeq" },

    // Sidra (SD1, SD2, SD3)
    { food_name: "Sidra", description: "Sun-dried fish product made from Puntius sarana (Replicate SD1)", method_name: "16S rRNA", platform: "Illumina MiSeq" },
    { food_name: "Sidra", description: "Sun-dried fish product made from Puntius sarana (Replicate SD2)", method_name: "16S rRNA", platform: "Illumina MiSeq" },
    { food_name: "Sidra", description: "Sun-dried fish product made from Puntius sarana (Replicate SD3)", method_name: "16S rRNA", platform: "Illumina MiSeq" },

    // Sukuti (SK1, SK2, SK3)
    { food_name: "Sukuti", description: "Sun-dried fish product made from Harpodon nehereus (Replicate SK1)", method_name: "16S rRNA", platform: "Illumina MiSeq" },
    { food_name: "Sukuti", description: "Sun-dried fish product made from Harpodon nehereus (Replicate SK2)", method_name: "16S rRNA", platform: "Illumina MiSeq" },
    { food_name: "Sukuti", description: "Sun-dried fish product made from Harpodon nehereus (Replicate SK3)", method_name: "16S rRNA", platform: "Illumina MiSeq" },
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

  console.log(`Seeded ${sampleMethodsData.length} sample-method relationships for Dataset 4.`);
}
