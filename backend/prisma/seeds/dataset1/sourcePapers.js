/**
 * Seed source papers for Dataset 1
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedSourcePapers(prisma) {
  console.log("Seeding source papers (Dataset 1)...");

  const paperData = {
    title: "Bacterial taxonomic and functional diversity analysis by 16S-rRNA-based metagenomic next generation sequencing of sour curd from Malda, India",
    authors: "Suchhanda Nandi and Shyamapada Mandal",
    journal: "ScienceDirect",
    year: 2025,
    doi: "14 October 2025",
    link: "https://www.sciencedirect.com/science/article/abs/pii/S2950199725002642",
  };

  const existing = await prisma.source_papers.findFirst({
    where: {
      doi: paperData.doi,
      title: paperData.title,
    },
  });

  if (!existing) {
    const created = await prisma.source_papers.create({
      data: paperData,
    });
    console.log(`Created paper: "${paperData.title}" with ID ${created.paper_id}`);
  } else {
    console.log(`Paper already exists: "${paperData.title}" with ID ${existing.paper_id}`);
  }

  console.log("Seeded 1 source paper.");
}
