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
export const getClassLevelCompositionBySampleId = async (sampleId,rank) => {
    if (!allowedRanks.includes(rank)) {
        throw new Error("Invalid taxonomy rank");
    }
  const result  = await pool.query(`
    SELECT
      bc.comp_id,
      bc.sample_id,
      s.food_name,
      s.description,
      bc.taxon_name,
      bc.tax_id,
      bc.relative_abundance,
      bc.presence,
      bc.is_dominant,
      bc.reported_rank,
      bc.measurement_type
      FROM bacterial_composition bc
      JOIN samples s 
      ON bc.sample_id = s.sample_id
      WHERE bc.sample_id = $1
      AND bc.reported_rank = $2
      ORDER BY bc.relative_abundance DESC NULLS LAST;
  `,
  [sampleId, rank]);
  return result.rows;
};