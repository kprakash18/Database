/**
 * Seed sample-paper relationships for Dataset 1
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedSamplePapers(prisma) {
  console.log("Seeding sample-paper relationships (Dataset 1)...");

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

  const paper = await prisma.source_papers.findFirst({
    where: { doi: "14 October 2025" },
  });

  if (!paper) {
    throw new Error("Could not find seeded source paper with DOI '14 October 2025'");
  }

  const relations = [
    { sample_id: idCup, paper_id: paper.paper_id },
    { sample_id: idPouch, paper_id: paper.paper_id },
    { sample_id: idPot, paper_id: paper.paper_id },
  ];

  for (const rel of relations) {
    await prisma.sample_papers.upsert({
      where: {
        sample_id_paper_id: {
          sample_id: rel.sample_id,
          paper_id: rel.paper_id,
        },
      },
      update: {},
      create: rel,
    });
    console.log(`Linked sample ID ${rel.sample_id} to paper ID ${rel.paper_id}`);
  }

  console.log(`Seeded ${relations.length} sample-paper relationships.`);
}
