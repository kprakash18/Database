import { pool } from "../config/db.js";

export const getClassLevelCompositionBySampleId = async (sampleId) => {
  const query = `
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
      AND bc.reported_rank = 'class'
      ORDER BY bc.relative_abundance DESC NULLS LAST;
  `;

  const result = await pool.query(query, [sampleId]);
  return result.rows;
};