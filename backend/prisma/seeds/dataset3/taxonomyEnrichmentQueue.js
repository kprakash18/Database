/**
 * Seed taxonomy enrichment queue for Dataset 3
 * Mirrors backend queue population logic (populateQueue in fetchLineageBatchWise)
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedTaxonomyEnrichmentQueue(prisma) {
  console.log("Seeding taxonomy enrichment queue (Dataset 3)...");

  // Auto-enqueues unlinked taxa from taxonomy table into taxonomy_enrichment_queue
  const unlinkedTaxa = await prisma.taxonomy.findMany({
    where: { taxonomy_lineage: null },
  });

  let enqueuedCount = 0;
  for (const taxon of unlinkedTaxa) {
    const existingInQueue = await prisma.taxonomy_enrichment_queue.findUnique({
      where: { tax_id: taxon.tax_id },
    });

    if (!existingInQueue) {
      await prisma.taxonomy_enrichment_queue.create({
        data: {
          tax_id: taxon.tax_id,
          taxon_name: taxon.name,
          status: "pending",
          attempts: 0,
        },
      });
      enqueuedCount++;
    }
  }

  console.log(`Enqueued ${enqueuedCount} pending items into taxonomy enrichment queue.`);
}
