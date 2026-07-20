/**
 * Seed sample sequences for Dataset 3 (Mizoram Fermented Foods - 9 Time-Point Samples)
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedSampleSequences(prisma) {
  console.log("Seeding sample sequences (Dataset 3)...");

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
    // --- Bamboo Shoot (Tuaither) ---
    {
      food_name: "Tuaither",
      description: "Fermented Bamboo Shoot (3rd day)",
      notes: "Sample Code: FBS-3D, Target Gene: 16S rRNA, Sequencing Platform: Illumina MiSeq, Primers: 16SrRNAF & 16SrRNAR, Read Type: 2x 300 bp paired-end",
    },
    {
      food_name: "Tuaither",
      description: "Fermented Bamboo Shoot (5th day)",
      notes: "Sample Code: FBS-5D, Target Gene: 16S rRNA, Sequencing Platform: Illumina MiSeq, Primers: 16SrRNAF & 16SrRNAR, Read Type: 2x 300 bp paired-end",
    },
    {
      food_name: "Tuaither",
      description: "Fermented Bamboo Shoot (7th day)",
      notes: "Sample Code: FBS-7D, Target Gene: 16S rRNA, Sequencing Platform: Illumina MiSeq, Primers: 16SrRNAF & 16SrRNAR, Read Type: 2x 300 bp paired-end",
    },

    // --- Soybean (Bekang) ---
    {
      food_name: "Bekang",
      description: "Fermented Soybean (3rd day)",
      notes: "Sample Code: FSB-3D, Target Gene: 16S rRNA, Sequencing Platform: Illumina MiSeq, Primers: 16SrRNAF & 16SrRNAR, Read Type: 2x 300 bp paired-end",
    },
    {
      food_name: "Bekang",
      description: "Fermented Soybean (5th day)",
      notes: "Sample Code: FSB-5D, Target Gene: 16S rRNA, Sequencing Platform: Illumina MiSeq, Primers: 16SrRNAF & 16SrRNAR, Read Type: 2x 300 bp paired-end",
    },
    {
      food_name: "Bekang",
      description: "Fermented Soybean (7th day)",
      notes: "Sample Code: FSB-7D, Target Gene: 16S rRNA, Sequencing Platform: Illumina MiSeq, Primers: 16SrRNAF & 16SrRNAR, Read Type: 2x 300 bp paired-end",
    },

    // --- Pork Fat (Sa-um) ---
    {
      food_name: "Sa-um",
      description: "Fermented Pork Fat (3rd day)",
      notes: "Sample Code: FPF-3D, Target Gene: 16S rRNA, Sequencing Platform: Illumina MiSeq, Primers: 16SrRNAF & 16SrRNAR, Read Type: 2x 300 bp paired-end",
    },
    {
      food_name: "Sa-um",
      description: "Fermented Pork Fat (5th day)",
      notes: "Sample Code: FPF-5D, Target Gene: 16S rRNA, Sequencing Platform: Illumina MiSeq, Primers: 16SrRNAF & 16SrRNAR, Read Type: 2x 300 bp paired-end",
    },
    {
      food_name: "Sa-um",
      description: "Fermented Pork Fat (7th day)",
      notes: "Sample Code: FPF-7D, Target Gene: 16S rRNA, Sequencing Platform: Illumina MiSeq, Primers: 16SrRNAF & 16SrRNAR, Read Type: 2x 300 bp paired-end",
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

  console.log(`Seeded ${sequencesData.length} sample sequence records.`);
}
