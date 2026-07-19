/**
 * Seed sample sequences for Dataset 1
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedSampleSequences(prisma) {
  console.log("Seeding sample sequences (Dataset 1)...");

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

  const sequencesData = [
    { sample_id: idCup, notes: "Data will be made available on request" },
    { sample_id: idPouch, notes: "Data will be made available on request" },
    { sample_id: idPot, notes: "Data will be made available on request" },
  ];

  for (const seq of sequencesData) {
    const existing = await prisma.sample_sequences.findFirst({
      where: {
        sample_id: seq.sample_id,
        notes: seq.notes,
      },
    });

    if (!existing) {
      await prisma.sample_sequences.create({
        data: seq,
      });
      console.log(`Created sample sequence for sample ID ${seq.sample_id}`);
    } else {
      console.log(`Sample sequence already exists for sample ID ${seq.sample_id}`);
    }
  }

  console.log(`Seeded ${sequencesData.length} sample sequences.`);
}
