/**
 * Seed sample papers join table for Dataset 4 (Sikkim Fermented/Smoked Fish Products)
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedSamplePapers(prisma) {
  console.log("Seeding sample-paper relationships (Dataset 4)...");

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
    // Suka ko maacha (SM1, SM2, SM3)
    { food_name: "Suka ko maacha", description: "Smoked fish product made from Schizothorax spp. (Replicate SM1)", doi: "10.1016/j.micres.2020.108571" },
    { food_name: "Suka ko maacha", description: "Smoked fish product made from Schizothorax spp. (Replicate SM2)", doi: "10.1016/j.micres.2020.108571" },
    { food_name: "Suka ko maacha", description: "Smoked fish product made from Schizothorax spp. (Replicate SM3)", doi: "10.1016/j.micres.2020.108571" },

    // Sidra (SD1, SD2, SD3)
    { food_name: "Sidra", description: "Sun-dried fish product made from Puntius sarana (Replicate SD1)", doi: "10.1016/j.micres.2020.108571" },
    { food_name: "Sidra", description: "Sun-dried fish product made from Puntius sarana (Replicate SD2)", doi: "10.1016/j.micres.2020.108571" },
    { food_name: "Sidra", description: "Sun-dried fish product made from Puntius sarana (Replicate SD3)", doi: "10.1016/j.micres.2020.108571" },

    // Sukuti (SK1, SK2, SK3)
    { food_name: "Sukuti", description: "Sun-dried fish product made from Harpodon nehereus (Replicate SK1)", doi: "10.1016/j.micres.2020.108571" },
    { food_name: "Sukuti", description: "Sun-dried fish product made from Harpodon nehereus (Replicate SK2)", doi: "10.1016/j.micres.2020.108571" },
    { food_name: "Sukuti", description: "Sun-dried fish product made from Harpodon nehereus (Replicate SK3)", doi: "10.1016/j.micres.2020.108571" },
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

  console.log(`Seeded ${samplePapersData.length} sample-paper relationships for Dataset 4.`);
}
