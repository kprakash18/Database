/**
 * Seed metadata for Dataset 1
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedMetadata(prisma) {
  console.log("Seeding metadata (Dataset 1)...");

  // Helper to dynamically get the assigned database ID using the natural key
  const getSampleId = async (description) => {
    const sample = await prisma.samples.findFirst({
      where: { food_name: "Sour Curd", description }
    });
    if (!sample) {
      throw new Error(`Could not find seeded sample for description: ${description}`);
    }
    return sample.sample_id;
  };

  const idCup = await getSampleId("sour curd sample packaged in plastic cup");
  const idPouch = await getSampleId("sour curd sample packaged in plastic pouch");
  const idPot = await getSampleId("sour curd sample packaged in an earthen pot");

  const metadataList = [
    {
      sample_id: idCup,
      location: "Malda, India",
      collection_date: new Date("2021-07-10"),
    },
    {
      sample_id: idPouch,
      location: "Malda, India",
      collection_date: new Date("2021-07-10"),
    },
    {
      sample_id: idPot,
      location: "Malda, India",
      collection_date: new Date("2021-07-10"),
    },
  ];

  for (const meta of metadataList) {
    const existing = await prisma.metadata.findFirst({
      where: { sample_id: meta.sample_id },
    });

    if (!existing) {
      await prisma.metadata.create({
        data: meta,
      });
      console.log(`Created metadata for sample ID ${meta.sample_id}`);
    } else {
      await prisma.metadata.update({
        where: { metadata_id: existing.metadata_id },
        data: meta,
      });
      console.log(`Updated metadata for sample ID ${meta.sample_id}`);
    }
  }

  console.log(`Seeded ${metadataList.length} metadata records.`);
}
