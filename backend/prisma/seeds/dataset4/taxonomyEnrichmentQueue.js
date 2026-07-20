/**
 * Seed taxonomy enrichment queue for Dataset 4
 * Mirrors backend fetchLineageBatchWise service behavior (populateQueue)
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedTaxonomyEnrichmentQueue(prisma) {
  console.log("Seeding taxonomy enrichment queue (Dataset 4)...");

  // Dynamically find taxonomy entries that do not have lineage records yet
  const unlinkedTaxa = await prisma.$queryRaw`
    SELECT t.tax_id, t.name
    FROM taxonomy t
    LEFT JOIN taxonomy_lineage tl ON t.tax_id = tl.tax_id
    WHERE tl.tax_id IS NULL
  `;

  let count = 0;
  for (const taxon of unlinkedTaxa) {
    const existing = await prisma.taxonomy_enrichment_queue.findUnique({
      where: { tax_id: taxon.tax_id },
    });

    if (!existing) {
      await prisma.taxonomy_enrichment_queue.create({
        data: {
          tax_id: taxon.tax_id,
          taxon_name: taxon.name,
          status: "pending",
          attempts: 0,
        },
      });
      count++;
    }
  }

  console.log(`Enqueued ${count} pending items into taxonomy enrichment queue for Dataset 4.`);
}
