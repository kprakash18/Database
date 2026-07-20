/**
 * Seed taxonomy lineage for Dataset 3
 * Mirrors backend lineage service behavior (saveLineageToDB)
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedTaxonomyLineage(prisma) {
  console.log("Seeding taxonomy lineage (Dataset 3)...");

  const lineageDataList = [
    // Provide your taxonomy lineage records here if seeding offline/curated lineage data
  ];

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
      is_complete: true,
      enrichment_status: "completed",
      source: item.source || "ncbi",
      last_updated: new Date(),
    };

    await prisma.taxonomy_lineage.upsert({
      where: { tax_id: taxon.tax_id },
      update: dataObj,
      create: dataObj,
    });
  }

  console.log(`Seeded ${lineageDataList.length} taxonomy lineage records.`);
}
