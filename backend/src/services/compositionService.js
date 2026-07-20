import { prisma } from '../config/db.js';
import { parseSampleId, formatSampleId } from '../utils/formatters.js';

const ALLOWED_RANKS = ['domain', 'phylum', 'class', 'order', 'family', 'genus', 'species', 'strain', 'unknown'];

export const getCompositionChartDataService = async (rawSampleId, rank) => {
  const sampleId = parseSampleId(rawSampleId);
  const targetRank = rank?.toLowerCase();

  if (!sampleId) {
    throw new Error('Invalid sample ID');
  }

  if (!ALLOWED_RANKS.includes(targetRank)) {
    throw new Error(`Invalid taxonomy rank: ${rank}`);
  }

  const rows = await prisma.bacterial_composition.findMany({
    where: {
      sample_id: sampleId,
      reported_rank: targetRank,
    },
    include: {
      taxonomy: {
        include: {
          taxonomy_lineage: true,
        },
      },
    },
    orderBy: [
      { is_dominant: 'desc' },
      { relative_abundance: 'desc' },
      { taxon_name: 'asc' },
    ],
  });

  return rows.map((r) => {
    const lineage = r.taxonomy?.taxonomy_lineage;
    return {
      label: r.taxon_name,
      value: r.relative_abundance,
      rank: r.reported_rank,
      is_dominant: r.is_dominant,
      presence: r.presence,
      measurement_type: r.measurement_type,
      notes: r.notes,
      phylum: lineage?.phylum || null,
      class: lineage?.class || null,
      order: lineage?.order || null,
      family: lineage?.family || null,
      genus: lineage?.genus || null,
      species: lineage?.species || null,
    };
  });
};

export const getCompositionSummaryService = async (rawSampleId) => {
  const sampleId = parseSampleId(rawSampleId);
  if (!sampleId) {
    throw new Error('Invalid sample ID');
  }

  const ranks = ['phylum', 'class', 'order', 'family', 'genus', 'species'];
  const dominantWithinEachLevel = [];

  for (const r of ranks) {
    const dominant = await prisma.bacterial_composition.findFirst({
      where: {
        sample_id: sampleId,
        reported_rank: r,
      },
      select: {
        taxon_name: true,
        relative_abundance: true,
        reported_rank: true,
        is_dominant: true,
      },
      orderBy: [
        { is_dominant: 'desc' },
        { relative_abundance: 'desc' },
      ],
    });

    if (dominant) {
      dominantWithinEachLevel.push(dominant);
    }
  }

  return {
    sample_id: sampleId,
    accession_code: formatSampleId(sampleId),
    dominant_within_each_level: dominantWithinEachLevel,
  };
};

export const getFullCompositionService = async (rawSampleId, rank) => {
  const sampleId = parseSampleId(rawSampleId);
  const targetRank = rank?.toLowerCase();

  if (!sampleId) {
    throw new Error('Invalid sample ID');
  }

  if (!ALLOWED_RANKS.includes(targetRank)) {
    throw new Error(`Invalid taxonomy rank: ${rank}`);
  }

  const rows = await prisma.bacterial_composition.findMany({
    where: {
      sample_id: sampleId,
      reported_rank: targetRank,
    },
    include: {
      samples: {
        select: { food_name: true },
      },
      taxonomy: {
        include: {
          taxonomy_lineage: true,
        },
      },
    },
    orderBy: {
      relative_abundance: 'desc',
    },
  });

  return rows.map((r) => {
    const lineage = r.taxonomy?.taxonomy_lineage;
    return {
      comp_id: r.comp_id,
      sample_id: r.sample_id,
      food_name: r.samples?.food_name,
      taxon_name: r.taxon_name,
      relative_abundance: r.relative_abundance,
      presence: r.presence,
      is_dominant: r.is_dominant,
      domain: lineage?.domain || null,
      phylum: lineage?.phylum || null,
      class: lineage?.class || null,
      order: lineage?.order || null,
      family: lineage?.family || null,
      genus: lineage?.genus || null,
      species: lineage?.species || null,
    };
  });
};
