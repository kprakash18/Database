/**
 * Seed source papers for Dataset 3 (Mizoram Fermented Foods Paper)
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedSourcePapers(prisma) {
  console.log("Seeding source papers (Dataset 3)...");

  const papersData = [
    {
      title: "Metagenomic Analysis of Bacterial Diversity in Traditional Fermented Foods Reveals Food-Specific Dominance of Specific Bacterial Taxa",
      authors: "Purbajyoti Deka, Gajanan T. Mehetre, Esther Lalnunmawii, Kalidas Upadhyaya, Garima Singh, Abeer Hashem, Al-Bandari Fahad Al-Arjani, Elsayed Fathi Abd_Allah, Bhim Pratap Singh",
      journal: "Fermentation",
      year: 2021,
      doi: "10.3390/fermentation7030167",
      link: "https://doi.org/10.3390/fermentation7030167",
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

  console.log(`Seeded ${papersData.length} source papers.`);
}
