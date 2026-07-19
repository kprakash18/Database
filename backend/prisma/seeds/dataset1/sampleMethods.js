/**
 * Seed sample-method relationships for Dataset 1
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedSampleMethods(prisma) {
  console.log("Seeding sample-method relationships (Dataset 1)...");

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

  const methods = await prisma.sequencing_methods.findMany({
    where: {
      method_name: "16S rRNA",
      platform: "Illumina MiSeq",
      target_region: "V3-V4",
    },
    orderBy: { method_id: "asc" },
  });

  if (methods.length < 3) {
    throw new Error(`Expected at least 3 sequencing methods, but found ${methods.length}`);
  }

  const relations = [
    { sample_id: idCup, method_id: methods[0].method_id },
    { sample_id: idPouch, method_id: methods[1].method_id },
    { sample_id: idPot, method_id: methods[2].method_id },
  ];

  for (const rel of relations) {
    await prisma.sample_methods.upsert({
      where: {
        sample_id_method_id: {
          sample_id: rel.sample_id,
          method_id: rel.method_id,
        },
      },
      update: {},
      create: rel,
    });
    console.log(`Linked sample ID ${rel.sample_id} to method ID ${rel.method_id}`);
  }

  console.log(`Seeded ${relations.length} sample-method relationships.`);
}
