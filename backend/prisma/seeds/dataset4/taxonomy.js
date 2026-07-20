/**
 * Seed taxonomy for Dataset 4 (Sikkim Fermented/Smoked Fish Products)
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedTaxonomy(prisma) {
  console.log("Seeding taxonomy (Dataset 4)...");

  const taxonomyData = [
    // Add bacteria phyla and genera from Dataset 4 paper here
  ];

  for (const taxon of taxonomyData) {
    const normalized = taxon.name.toLowerCase().trim();

    let parentId = taxon.parent_id ?? null;
    if (!parentId && taxon.parentName) {
      const parent = await prisma.taxonomy.findFirst({
        where: { normalized_name: taxon.parentName.toLowerCase().trim() },
      });
      if (parent) parentId = parent.tax_id;
    }

    const dataObj = {
      name: taxon.name,
      rank: taxon.rank,
      parent_id: parentId,
      ncbi_tax_id: taxon.ncbi_tax_id,
      lineage: taxon.lineage,
      is_curated: taxon.is_curated ?? false,
      reported_rank: taxon.reported_rank,
      is_linked: taxon.is_linked ?? false,
      created_at: taxon.created_at,
    };

    if (taxon.tax_id) {
      await prisma.taxonomy.upsert({
        where: { tax_id: taxon.tax_id },
        update: dataObj,
        create: { tax_id: taxon.tax_id, ...dataObj },
      });
    } else {
      const existing = await prisma.taxonomy.findFirst({
        where: { normalized_name: normalized, rank: taxon.rank },
      });
      if (!existing) {
        await prisma.taxonomy.create({ data: dataObj });
      } else {
        await prisma.taxonomy.update({
          where: { tax_id: existing.tax_id },
          data: dataObj,
        });
      }
    }
  }

  await prisma.$executeRawUnsafe(
    "SELECT setval('public.taxonomy_tax_id_seq', (SELECT COALESCE(MAX(tax_id), 1) FROM public.taxonomy));"
  );

  console.log(`Seeded ${taxonomyData.length} taxonomy terms for Dataset 4.`);
}
