/**
 * Seed sample sequences for Dataset 4 (Sikkim Fermented/Smoked Fish Products - SRA Accessions)
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedSampleSequences(prisma) {
  console.log("Seeding sample sequences (Dataset 4)...");

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

  const sequencesData = [
    // --- Suka ko maacha ---
    {
      food_name: "Suka ko maacha",
      description: "Smoked fish product made from Schizothorax spp. (Replicate SM1)",
      accession_id: "SRR10857170",
      external_link: "https://www.ncbi.nlm.nih.gov/sra/SRR10857170",
      notes: "Sample Code: SM1, BioProject: PRJNA600094, Species: Schizothorax spp.",
    },
    {
      food_name: "Suka ko maacha",
      description: "Smoked fish product made from Schizothorax spp. (Replicate SM2)",
      accession_id: "SRR10857171",
      external_link: "https://www.ncbi.nlm.nih.gov/sra/SRR10857171",
      notes: "Sample Code: SM2, BioProject: PRJNA600094, Species: Schizothorax spp.",
    },
    {
      food_name: "Suka ko maacha",
      description: "Smoked fish product made from Schizothorax spp. (Replicate SM3)",
      accession_id: "SRR10857172",
      external_link: "https://www.ncbi.nlm.nih.gov/sra/SRR10857172",
      notes: "Sample Code: SM3, BioProject: PRJNA600094, Species: Schizothorax spp.",
    },

    // --- Sidra ---
    {
      food_name: "Sidra",
      description: "Sun-dried fish product made from Puntius sarana (Replicate SD1)",
      accession_id: "SRR10857173",
      external_link: "https://www.ncbi.nlm.nih.gov/sra/SRR10857173",
      notes: "Sample Code: SD1, BioProject: PRJNA600094, Species: Puntius sarana",
    },
    {
      food_name: "Sidra",
      description: "Sun-dried fish product made from Puntius sarana (Replicate SD2)",
      accession_id: "SRR10857174",
      external_link: "https://www.ncbi.nlm.nih.gov/sra/SRR10857174",
      notes: "Sample Code: SD2, BioProject: PRJNA600094, Species: Puntius sarana",
    },
    {
      food_name: "Sidra",
      description: "Sun-dried fish product made from Puntius sarana (Replicate SD3)",
      accession_id: "SRR10857175",
      external_link: "https://www.ncbi.nlm.nih.gov/sra/SRR10857175",
      notes: "Sample Code: SD3, BioProject: PRJNA600094, Species: Puntius sarana",
    },

    // --- Sukuti ---
    {
      food_name: "Sukuti",
      description: "Sun-dried fish product made from Harpodon nehereus (Replicate SK1)",
      accession_id: "SRR10857176",
      external_link: "https://www.ncbi.nlm.nih.gov/sra/SRR10857176",
      notes: "Sample Code: SK1, BioProject: PRJNA600094, Species: Harpodon nehereus",
    },
    {
      food_name: "Sukuti",
      description: "Sun-dried fish product made from Harpodon nehereus (Replicate SK2)",
      accession_id: "SRR10857177",
      external_link: "https://www.ncbi.nlm.nih.gov/sra/SRR10857177",
      notes: "Sample Code: SK2, BioProject: PRJNA600094, Species: Harpodon nehereus",
    },
    {
      food_name: "Sukuti",
      description: "Sun-dried fish product made from Harpodon nehereus (Replicate SK3)",
      accession_id: "SRR10857178",
      external_link: "https://www.ncbi.nlm.nih.gov/sra/SRR10857178",
      notes: "Sample Code: SK3, BioProject: PRJNA600094, Species: Harpodon nehereus",
    },
  ];

  for (const item of sequencesData) {
    const sample_id = item.sample_id ?? await getSampleId(item.food_name, item.description);

    const dataObj = {
      sample_id,
      accession_id: item.accession_id,
      external_link: item.external_link,
      notes: item.notes,
    };

    const existing = await prisma.sample_sequences.findFirst({
      where: { sample_id },
    });

    if (!existing) {
      await prisma.sample_sequences.create({ data: dataObj });
    } else {
      await prisma.sample_sequences.update({
        where: { sequence_id: existing.sequence_id },
        data: dataObj,
      });
    }
  }

  console.log(`Seeded ${sequencesData.length} sample sequence records for Dataset 4.`);
}
