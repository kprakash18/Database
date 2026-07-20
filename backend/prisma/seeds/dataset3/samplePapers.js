/**
 * Seed sample papers join table for Dataset 3 (Mizoram Fermented Foods - 9 Time-Point Samples)
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedSamplePapers(prisma) {
  console.log("Seeding sample-paper relationships (Dataset 3)...");

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

  // Generic helper function to resolve paper_id dynamically from doi or title
  const getPaperId = async (titleOrDoi) => {
    const paper = await prisma.source_papers.findFirst({
      where: { OR: [{ doi: titleOrDoi }, { title: titleOrDoi }] },
    });
    if (!paper) {
      throw new Error(`Paper not found for title/DOI: "${titleOrDoi}"`);
    }
    return paper.paper_id;
  };

  const samplePapersData = [
    // Tuaither (3d, 5d, 7d)
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (3rd day)", doi: "10.3390/fermentation7030167" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (5th day)", doi: "10.3390/fermentation7030167" },
    { food_name: "Tuaither", description: "Fermented Bamboo Shoot (7th day)", doi: "10.3390/fermentation7030167" },

    // Bekang (3d, 5d, 7d)
    { food_name: "Bekang", description: "Fermented Soybean (3rd day)", doi: "10.3390/fermentation7030167" },
    { food_name: "Bekang", description: "Fermented Soybean (5th day)", doi: "10.3390/fermentation7030167" },
    { food_name: "Bekang", description: "Fermented Soybean (7th day)", doi: "10.3390/fermentation7030167" },

    // Sa-um (3d, 5d, 7d)
    { food_name: "Sa-um", description: "Fermented Pork Fat (3rd day)", doi: "10.3390/fermentation7030167" },
    { food_name: "Sa-um", description: "Fermented Pork Fat (5th day)", doi: "10.3390/fermentation7030167" },
    { food_name: "Sa-um", description: "Fermented Pork Fat (7th day)", doi: "10.3390/fermentation7030167" },
  ];

  for (const item of samplePapersData) {
    const sample_id = item.sample_id ?? await getSampleId(item.food_name, item.description);
    const paper_id = item.paper_id ?? await getPaperId(item.doi || item.title);

    await prisma.sample_papers.upsert({
      where: {
        sample_id_paper_id: { sample_id, paper_id },
      },
      update: {},
      create: { sample_id, paper_id },
    });
  }

  console.log(`Seeded ${samplePapersData.length} sample-paper relationships.`);
}
