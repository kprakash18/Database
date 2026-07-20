/**
 * Seed taxonomy lineage for Dataset 4
 * Mirrors backend lineage service behavior (saveLineageToDB)
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedTaxonomyLineage(prisma) {
  console.log("Seeding taxonomy lineage (Dataset 4)...");

  const lineageDataList = [];

  for (const item of lineageDataList) {
    const taxon = await prisma.taxonomy.findFirst({
      where: { normalized_name: item.taxonName.toLowerCase().trim() },
    });

    if (!taxon) continue;

    const dataObj = {
      tax_id: taxon.tax_id,
      domain: item.domain,
      phylum: item.phylum,
      class: item.class,
      order: item.order,
      family: item.family,
      genus: item.genus,
      species: item.species,
      strain: item.strain,
      ncbi_tax_id: item.ncbi_tax_id,
      lineage_json: item.lineage_json,
    };

    await prisma.taxonomy_lineage.upsert({
      where: { tax_id: taxon.tax_id },
      update: dataObj,
      create: dataObj,
    });

    await prisma.taxonomy.update({
      where: { tax_id: taxon.tax_id },
      data: {
        ncbi_tax_id: item.ncbi_tax_id,
        is_linked: true,
      },
    });
  }

  console.log(`Seeded ${lineageDataList.length} taxonomy lineage records for Dataset 4.`);
}
