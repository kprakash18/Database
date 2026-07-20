/**
 * Seeder for seedFromJson.js dataset
 * @param {import('@prisma/client').PrismaClient} prisma
 * @param {object} datasetData
 */
export async function seedFromJsonData(prisma, datasetData) {
  console.log("=== Starting Seeding from seedFromJson.js ===");

  // 1. Seed Source Paper
  let paperId = null;
  if (datasetData.source_paper) {
    const sp = datasetData.source_paper;
    console.log(`Seeding source paper: "${sp.title}"...`);
    const existing = await prisma.source_papers.findFirst({
      where: {
        OR: [
          { doi: sp.doi },
          { title: sp.title }
        ]
      }
    });
    if (existing) {
      const updated = await prisma.source_papers.update({
        where: { paper_id: existing.paper_id },
        data: {
          title: sp.title,
          authors: sp.authors,
          journal: sp.journal,
          year: sp.year,
          doi: sp.doi,
          link: sp.link,
        }
      });
      paperId = updated.paper_id;
    } else {
      const created = await prisma.source_papers.create({
        data: {
          title: sp.title,
          authors: sp.authors,
          journal: sp.journal,
          year: sp.year,
          doi: sp.doi,
          link: sp.link,
        }
      });
      paperId = created.paper_id;
    }
    console.log(`Source paper seeded with ID: ${paperId}`);
  }

  // 2. Seed Sequencing Methods
  const methodIds = [];
  if (Array.isArray(datasetData.sequencing_methods)) {
    for (const sm of datasetData.sequencing_methods) {
      console.log(`Seeding sequencing method: "${sm.method_name}"...`);
      const existing = await prisma.sequencing_methods.findFirst({
        where: {
          method_name: sm.method_name,
          platform: sm.platform
        }
      });
      if (existing) {
        methodIds.push(existing.method_id);
      } else {
        const created = await prisma.sequencing_methods.create({
          data: {
            method_name: sm.method_name,
            platform: sm.platform,
            target_region: sm.target_region,
          }
        });
        methodIds.push(created.method_id);
      }
    }
  }

  // 3. Seed Taxonomy List
  console.log("Seeding taxonomy list...");
  if (Array.isArray(datasetData.taxonomy_list)) {
    for (const tax of datasetData.taxonomy_list) {
      const normName = tax.name.toLowerCase().trim();
      const rankLower = tax.rank ? tax.rank.toLowerCase() : null;
      const existing = await prisma.taxonomy.findFirst({
        where: {
          normalized_name: normName,
          rank: rankLower
        }
      });

      let taxId;
      if (existing) {
        taxId = existing.tax_id;
      } else {
        const created = await prisma.taxonomy.create({
          data: {
            name: tax.name,
            rank: rankLower,
            reported_rank: tax.reported_rank ? tax.reported_rank.toLowerCase() : null,
          }
        });
        taxId = created.tax_id;
      }

      // Ensure item is in taxonomy_enrichment_queue
      await prisma.taxonomy_enrichment_queue.upsert({
        where: { tax_id: taxId },
        update: { taxon_name: tax.name },
        create: {
          tax_id: taxId,
          taxon_name: tax.name,
          status: "pending",
        }
      });
    }
  }

  // Helper function to find or create sample
  const getOrCreateSample = async (sampleCode, foodName, description, extraInfo = {}) => {
    let sample = await prisma.samples.findFirst({
      where: { food_name: foodName, description: description }
    });

    if (!sample) {
      sample = await prisma.samples.create({
        data: {
          food_name: foodName,
          description: description,
        }
      });
    }

    const sampleId = sample.sample_id;

    // Seed metadata if extra info provided
    if (extraInfo.location || extraInfo.additional_info || extraInfo.raw_material) {
      const existingMeta = await prisma.metadata.findFirst({
        where: { sample_id: sampleId }
      });

      const combinedInfo = {
        ...(extraInfo.raw_material && { raw_material: extraInfo.raw_material }),
        ...(extraInfo.collection_day && { collection_day: extraInfo.collection_day }),
        ...(extraInfo.replicates && { replicates: extraInfo.replicates }),
        ...(extraInfo.additional_info || {})
      };

      if (!existingMeta) {
        await prisma.metadata.create({
          data: {
            sample_id: sampleId,
            location: extraInfo.location || null,
            additional_info: combinedInfo,
          }
        });
      }
    }

    // Seed sample accession sequence
    if (extraInfo.accession_id) {
      const existingSeq = await prisma.sample_sequences.findFirst({
        where: { sample_id: sampleId, accession_id: extraInfo.accession_id }
      });
      if (!existingSeq) {
        await prisma.sample_sequences.create({
          data: {
            sample_id: sampleId,
            accession_id: extraInfo.accession_id,
          }
        });
      }
    }

    // Seed sample_methods links
    for (const mId of methodIds) {
      await prisma.sample_methods.upsert({
        where: {
          sample_id_method_id: { sample_id: sampleId, method_id: mId }
        },
        update: {},
        create: { sample_id: sampleId, method_id: mId }
      });
    }

    // Seed sample_papers links
    if (paperId) {
      await prisma.sample_papers.upsert({
        where: {
          sample_id_paper_id: { sample_id: sampleId, paper_id: paperId }
        },
        update: {},
        create: { sample_id: sampleId, paper_id: paperId }
      });
    }

    return sampleId;
  };

  // 4. Seed Individual Samples
  console.log("Seeding individual samples...");
  if (Array.isArray(datasetData.samples)) {
    for (const s of datasetData.samples) {
      await getOrCreateSample(s.sample_code, s.food_name, s.description, {
        raw_material: s.raw_material,
        location: s.location,
        collection_day: s.collection_day,
        replicates: s.replicates,
        accession_id: s.accession_id,
        additional_info: s.additional_info,
      });
    }
  }

  // 5. Seed Bacterial Composition
  console.log("Seeding bacterial composition for all associated samples...");
  if (Array.isArray(datasetData.bacterial_composition)) {
    for (const comp of datasetData.bacterial_composition) {
      // Create/ensure pooled sample entry exists
      await getOrCreateSample(comp.sample_code, comp.food_name, comp.description);

      // Target all sample IDs with this food_name (e.g. Suka ko maacha -> SM1, SM2, SM3, SM)
      const matchingSamples = await prisma.samples.findMany({
        where: { food_name: comp.food_name },
        select: { sample_id: true }
      });
      const targetSampleIds = matchingSamples.map(s => s.sample_id);

      // Find or create taxon ID
      const normTaxon = comp.taxon_name.toLowerCase().trim();
      let taxon = await prisma.taxonomy.findFirst({
        where: { normalized_name: normTaxon }
      });

      if (!taxon) {
        taxon = await prisma.taxonomy.create({
          data: {
            name: comp.taxon_name,
            reported_rank: comp.reported_rank ? comp.reported_rank.toLowerCase() : null,
            rank: comp.reported_rank ? comp.reported_rank.toLowerCase() : null,
          }
        });

        await prisma.taxonomy_enrichment_queue.upsert({
          where: { tax_id: taxon.tax_id },
          update: { taxon_name: comp.taxon_name },
          create: {
            tax_id: taxon.tax_id,
            taxon_name: comp.taxon_name,
            status: "pending",
          }
        });
      }

      const measurementType = comp.measurement_type || "relative_abundance";
      const reportedRank = comp.reported_rank ? comp.reported_rank.toLowerCase() : "unknown";

      for (const targetId of targetSampleIds) {
        await prisma.bacterial_composition.upsert({
          where: {
            sample_id_taxon_name_reported_rank_measurement_type: {
              sample_id: targetId,
              taxon_name: comp.taxon_name,
              reported_rank: reportedRank,
              measurement_type: measurementType,
            }
          },
          update: {
            tax_id: taxon.tax_id,
            relative_abundance: comp.relative_abundance,
            is_dominant: comp.is_dominant,
            notes: comp.notes,
          },
          create: {
            sample_id: targetId,
            tax_id: taxon.tax_id,
            taxon_name: comp.taxon_name,
            reported_rank: reportedRank,
            relative_abundance: comp.relative_abundance,
            is_dominant: comp.is_dominant,
            measurement_type: measurementType,
            notes: comp.notes,
          }
        });
      }
    }
  }

  // Reset auto-increment sequence counters for primary key tables
  const sequenceQueries = [
    "SELECT setval('public.source_papers_paper_id_seq', (SELECT COALESCE(MAX(paper_id), 1) FROM public.source_papers));",
    "SELECT setval('public.sequencing_methods_method_id_seq', (SELECT COALESCE(MAX(method_id), 1) FROM public.sequencing_methods));",
    "SELECT setval('public.samples_sample_id_seq', (SELECT COALESCE(MAX(sample_id), 1) FROM public.samples));",
    "SELECT setval('public.taxonomy_tax_id_seq', (SELECT COALESCE(MAX(tax_id), 1) FROM public.taxonomy));",
    "SELECT setval('public.bacterial_composition_comp_id_seq', (SELECT COALESCE(MAX(comp_id), 1) FROM public.bacterial_composition));",
    "SELECT setval('public.metadata_metadata_id_seq', (SELECT COALESCE(MAX(metadata_id), 1) FROM public.metadata));",
    "SELECT setval('public.sample_sequences_sequence_id_seq', (SELECT COALESCE(MAX(sequence_id), 1) FROM public.sample_sequences));",
  ];

  for (const q of sequenceQueries) {
    try {
      await prisma.$executeRawUnsafe(q);
    } catch (e) {
      // Ignore sequence reset if non-existent or table mismatch
    }
  }

  console.log("=== Completed Seeding from seedFromJson.js Successfully ===");
}
