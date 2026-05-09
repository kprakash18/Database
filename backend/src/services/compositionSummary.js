import { pool } from "../config/db.js";

const allowedRanks = [
  "domain",
  "phylum",
  "class",
  "order",
  "family",
  "genus",
  "species",
  "strain",
  "unknown",
];

export const getAdvancedCompositionSummary = async (sampleId) => {
  const levelWiseCountQuery = `
    SELECT
      reported_rank,
      COUNT(DISTINCT taxon_name) AS bacteria_count
    FROM bacterial_composition
    WHERE sample_id = $1
    GROUP BY reported_rank
    ORDER BY reported_rank;
  `;

  const levelWiseCompositionQuery = `
    SELECT
      reported_rank,
      taxon_name,
      relative_abundance,
      presence,
      measurement_type
    FROM bacterial_composition
    WHERE sample_id = $1
    ORDER BY reported_rank, relative_abundance DESC NULLS LAST;
  `;

  const dominantWithinEachLevelQuery = `
    SELECT DISTINCT ON (reported_rank)
      reported_rank,
      taxon_name,
      relative_abundance
    FROM bacterial_composition
    WHERE sample_id = $1
      AND relative_abundance IS NOT NULL
    ORDER BY reported_rank, relative_abundance DESC;
  `;

  const sampleWiseDominantQuery = `
    SELECT DISTINCT ON (bc.sample_id)
      bc.sample_id,
      s.food_name,
      s.description,
      bc.reported_rank,
      bc.taxon_name,
      bc.relative_abundance
    FROM bacterial_composition bc
    JOIN samples s
      ON bc.sample_id = s.sample_id
    WHERE bc.relative_abundance IS NOT NULL
    ORDER BY bc.sample_id, bc.relative_abundance DESC;
  `;

  const [
    levelWiseCount,
    levelWiseComposition,
    dominantWithinEachLevel,
    sampleWiseDominant,
  ] = await Promise.all([
    pool.query(levelWiseCountQuery, [sampleId]),
    pool.query(levelWiseCompositionQuery, [sampleId]),
    pool.query(dominantWithinEachLevelQuery, [sampleId]),
    pool.query(sampleWiseDominantQuery),
  ]);

  return {
    level_wise_bacteria_count: levelWiseCount.rows,
    composition_within_each_level: groupByRank(levelWiseComposition.rows),
    dominant_within_each_level: dominantWithinEachLevel.rows,
    sample_wise_dominant: sampleWiseDominant.rows,
  };
};

const groupByRank = (rows) => {
  const grouped = {};

  for (const row of rows) {
    const rank = row.reported_rank || "unknown";

    if (!grouped[rank]) {
      grouped[rank] = [];
    }

    grouped[rank].push({
      taxon_name: row.taxon_name,
      relative_abundance: row.relative_abundance,
      presence: row.presence,
      measurement_type: row.measurement_type,
    });
  }

  return grouped;
};