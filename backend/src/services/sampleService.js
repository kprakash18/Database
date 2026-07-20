import { prisma } from '../config/db.js';
import { parseSampleId, attachFormattedId } from '../utils/formatters.js';

export const getAllSamplesService = async ({ limit = 20, offset = 0, search = '' } = {}) => {
  const where = search
    ? {
        OR: [
          { food_name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }
    : {};

  const [total, rows] = await Promise.all([
    prisma.samples.count({ where }),
    prisma.samples.findMany({
      where,
      orderBy: { sample_id: 'asc' },
      take: limit,
      skip: offset,
      include: {
        metadata: true,
        sample_papers: {
          include: {
            source_papers: true,
          },
        },
      },
    }),
  ]);

  return {
    total,
    rows: rows.map(attachFormattedId),
  };
};

export const getSampleByIdService = async (rawId) => {
  const sampleId = parseSampleId(rawId);
  if (!sampleId) {
    throw new Error('Invalid sample ID');
  }

  const sample = await prisma.samples.findUnique({
    where: { sample_id: sampleId },
    include: {
      metadata: true,
      sample_sequences: true,
      sample_methods: {
        include: {
          sequencing_methods: true,
        },
      },
      sample_papers: {
        include: {
          source_papers: true,
        },
      },
    },
  });

  if (!sample) {
    return null;
  }

  return attachFormattedId(sample);
};
