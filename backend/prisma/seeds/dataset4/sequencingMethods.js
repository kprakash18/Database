/**
 * Seed sequencing methods for Dataset 4
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedSequencingMethods(prisma) {
  console.log("Seeding sequencing methods (Dataset 4)...");

  const methodsData = [
    {
      method_name: "16S rRNA",
      platform: "Illumina MiSeq",
      target_region: "V3-V4",
    },
  ];

  for (const method of methodsData) {
    if (method.method_id) {
      await prisma.sequencing_methods.upsert({
        where: { method_id: method.method_id },
        update: method,
        create: method,
      });
    } else {
      const existing = await prisma.sequencing_methods.findFirst({
        where: {
          method_name: method.method_name,
          platform: method.platform,
          target_region: method.target_region,
        },
      });
      if (!existing) {
        await prisma.sequencing_methods.create({ data: method });
      } else {
        await prisma.sequencing_methods.update({
          where: { method_id: existing.method_id },
          data: method,
        });
      }
    }
  }

  await prisma.$executeRawUnsafe(
    "SELECT setval('public.sequencing_methods_method_id_seq', (SELECT COALESCE(MAX(method_id), 1) FROM public.sequencing_methods));"
  );

  console.log(`Seeded ${methodsData.length} sequencing methods for Dataset 4.`);
}
