/**
 * Seed samples for Dataset 4 (Sikkim Fermented/Smoked Fish Products - 9 Replicate Samples)
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedSamples(prisma) {
  console.log("Seeding samples (Dataset 4)...");

  const samplesData = [
    // Suka ko maacha (SM1, SM2, SM3)
    {
      food_name: "Suka ko maacha",
      description: "Smoked fish product made from Schizothorax spp. (Replicate SM1)",
    },
    {
      food_name: "Suka ko maacha",
      description: "Smoked fish product made from Schizothorax spp. (Replicate SM2)",
    },
    {
      food_name: "Suka ko maacha",
      description: "Smoked fish product made from Schizothorax spp. (Replicate SM3)",
    },

    // Sidra (SD1, SD2, SD3)
    {
      food_name: "Sidra",
      description: "Sun-dried fish product made from Puntius sarana (Replicate SD1)",
    },
    {
      food_name: "Sidra",
      description: "Sun-dried fish product made from Puntius sarana (Replicate SD2)",
    },
    {
      food_name: "Sidra",
      description: "Sun-dried fish product made from Puntius sarana (Replicate SD3)",
    },

    // Sukuti (SK1, SK2, SK3)
    {
      food_name: "Sukuti",
      description: "Sun-dried fish product made from Harpodon nehereus (Replicate SK1)",
    },
    {
      food_name: "Sukuti",
      description: "Sun-dried fish product made from Harpodon nehereus (Replicate SK2)",
    },
    {
      food_name: "Sukuti",
      description: "Sun-dried fish product made from Harpodon nehereus (Replicate SK3)",
    },
  ];

  for (const sample of samplesData) {
    if (sample.sample_id) {
      await prisma.samples.upsert({
        where: { sample_id: sample.sample_id },
        update: sample,
        create: sample,
      });
    } else {
      const existing = await prisma.samples.findFirst({
        where: { food_name: sample.food_name, description: sample.description },
      });
      if (!existing) {
        await prisma.samples.create({ data: sample });
      } else {
        await prisma.samples.update({
          where: { sample_id: existing.sample_id },
          data: sample,
        });
      }
    }
  }

  await prisma.$executeRawUnsafe(
    "SELECT setval('public.samples_sample_id_seq', (SELECT COALESCE(MAX(sample_id), 1) FROM public.samples));"
  );

  console.log(`Seeded ${samplesData.length} samples for Dataset 4.`);
}
