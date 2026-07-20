/**
 * Seed source papers for Dataset 4 (Sikkim Fermented/Smoked Fish Products Paper)
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedSourcePapers(prisma) {
  console.log("Seeding source papers (Dataset 4)...");

  const papersData = [
    {
      title: "Bacterial diversity and community structure in traditional smoked and sun-dried fish products of Sikkim, India",
      authors: "Sikkim Fish Metagenomics Research Group",
      journal: "Microbiological Research / Metagenomics",
      year: 2020,
      doi: "10.1016/j.micres.2020.108571",
      link: "https://www.ncbi.nlm.nih.gov/bioproject/PRJNA600094",
    },
  ];

  for (const paper of papersData) {
    if (paper.paper_id) {
      await prisma.source_papers.upsert({
        where: { paper_id: paper.paper_id },
        update: paper,
        create: paper,
      });
    } else {
      const existing = await prisma.source_papers.findFirst({
        where: { doi: paper.doi },
      });
      if (!existing) {
        await prisma.source_papers.create({ data: paper });
      } else {
        await prisma.source_papers.update({
          where: { paper_id: existing.paper_id },
          data: paper,
        });
      }
    }
  }

  await prisma.$executeRawUnsafe(
    "SELECT setval('public.source_papers_paper_id_seq', (SELECT COALESCE(MAX(paper_id), 1) FROM public.source_papers));"
  );

  console.log(`Seeded ${papersData.length} source papers for Dataset 4.`);
}
