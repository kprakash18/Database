/**
 * Seed samples for Dataset 1
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedSamples(prisma) {
  console.log("Seeding samples (Dataset 1)...");

  const samplesData = [
    {
      food_name: "Sour Curd",
      description: "sour curd sample packaged in plastic cup",
    },
    {
      food_name: "Sour Curd",
      description: "sour curd sample packaged in plastic pouch",
    },
    {
      food_name: "Sour Curd",
      description: "sour curd sample packaged in an earthen pot",
    },
  ];

  for (const sample of samplesData) {
    const existing = await prisma.samples.findFirst({
      where: {
        food_name: sample.food_name,
        description: sample.description,
      },
    });

    if (!existing) {
      const created = await prisma.samples.create({
        data: sample,
      });
      console.log(`Created sample: "${sample.food_name}" (${sample.description}) with ID ${created.sample_id}`);
    } else {
      console.log(`Sample already exists: "${sample.food_name}" (${sample.description}) with ID ${existing.sample_id}`);
    }
  }

  console.log(`Seeded ${samplesData.length} samples.`);
}
