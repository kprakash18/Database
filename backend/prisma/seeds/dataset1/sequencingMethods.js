/**
 * Seed sequencing methods for Dataset 1
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedSequencingMethods(prisma) {
  console.log("Seeding sequencing methods (Dataset 1)...");

  const methodsData = [
    {
      method_name: "16S rRNA",
      platform: "Illumina MiSeq",
      target_region: "V3-V4",
    },
    {
      method_name: "16S rRNA",
      platform: "Illumina MiSeq",
      target_region: "V3-V4",
    },
    {
      method_name: "16S rRNA",
      platform: "Illumina MiSeq",
      target_region: "V3-V4",
    },
  ];

  // Since all three methods are identical, we check the current count of matching methods in the database
  const existingCount = await prisma.sequencing_methods.count({
    where: {
      method_name: "16S rRNA",
      platform: "Illumina MiSeq",
      target_region: "V3-V4",
    },
  });

  const toCreateCount = Math.max(0, methodsData.length - existingCount);

  for (let i = 0; i < toCreateCount; i++) {
    const created = await prisma.sequencing_methods.create({
      data: {
        method_name: "16S rRNA",
        platform: "Illumina MiSeq",
        target_region: "V3-V4",
      },
    });
    console.log(`Created method: "16S rRNA" on "Illumina MiSeq" with ID ${created.method_id}`);
  }

  console.log(`Seeding sequencing methods completed. Total matched: ${methodsData.length}`);
}
