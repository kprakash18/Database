import { prisma } from '../config/db.js';
import { parseSampleId } from '../utils/formatters.js';

export const getTaxonomyBySampleIdService = async (rawSampleId) => {
  const sampleId = parseSampleId(rawSampleId);
  if (!sampleId) {
    throw new Error('Invalid sample ID');
  }

  const compositionRows = await prisma.bacterial_composition.findMany({
    where: {
      sample_id: sampleId,
      tax_id: { not: null },
    },
    include: {
      taxonomy: {
        select: {
          tax_id: true,
          name: true,
          rank: true,
          ncbi_tax_id: true,
        },
      },
    },
  });

  const taxonomyMap = new Map();
  for (const r of compositionRows) {
    if (r.taxonomy && !taxonomyMap.has(r.taxonomy.tax_id)) {
      taxonomyMap.set(r.taxonomy.tax_id, r.taxonomy);
    }
  }

  return Array.from(taxonomyMap.values()).sort((a, b) => {
    if (a.rank !== b.rank) return (a.rank || '').localeCompare(b.rank || '');
    return a.name.localeCompare(b.name);
  });
};

export const searchTaxonomyService = async ({ query = '', sampleId = null } = {}) => {
  const cleanQuery = String(query).trim();
  if (!cleanQuery) return [];

  const parsedSampleId = sampleId ? parseSampleId(sampleId) : null;

  if (parsedSampleId) {
    const compositionRows = await prisma.bacterial_composition.findMany({
      where: {
        sample_id: parsedSampleId,
        taxonomy: {
          OR: [
            { name: { contains: cleanQuery, mode: 'insensitive' } },
            { rank: { contains: cleanQuery, mode: 'insensitive' } },
          ],
        },
      },
      include: {
        taxonomy: {
          select: {
            tax_id: true,
            name: true,
            rank: true,
            ncbi_tax_id: true,
          },
        },
      },
      take: 100,
    });

    const taxonomyMap = new Map();
    for (const r of compositionRows) {
      if (r.taxonomy && !taxonomyMap.has(r.taxonomy.tax_id)) {
        taxonomyMap.set(r.taxonomy.tax_id, r.taxonomy);
      }
    }
    return Array.from(taxonomyMap.values());
  }

  return prisma.taxonomy.findMany({
    where: {
      OR: [
        { name: { contains: cleanQuery, mode: 'insensitive' } },
        { rank: { contains: cleanQuery, mode: 'insensitive' } },
      ],
    },
    select: {
      tax_id: true,
      name: true,
      rank: true,
      ncbi_tax_id: true,
    },
    orderBy: { name: 'asc' },
    take: 100,
  });
};
