/**
 * Seed samples for Dataset 3 (Mizoram Fermented Foods - 9 Time-Point Samples)
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedSamples(prisma) {
  console.log("Seeding samples (Dataset 3)...");

  const samplesData = [
    // Fermented Bamboo Shoot (Tuaither)
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (3rd day)" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (5th day)" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (7th day)" },

    // Fermented Soybean (Bekang)
    { food_name: "Bekang", description: "Fermented Soybean (3rd day)" },
    { food_name: "Bekang", description: "Fermented Soybean (5th day)" },
    { food_name: "Bekang", description: "Fermented Soybean (7th day)" },

    // Fermented Pork Fat (Sa-um)
    { food_name: "Sa-um", description: "Fermented Pork Fat (3rd day)" },
    { food_name: "Sa-um", description: "Fermented Pork Fat (5th day)" },
    { food_name: "Sa-um", description: "Fermented Pork Fat (7th day)" },
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

  console.log(`Seeded ${samplesData.length} samples.`);
}
