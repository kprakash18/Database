import { pool } from "../config/db.js";
const allowedRanks = [
  'domain',
  'phylum',
  'class',
  'order',
  'family',
  'genus',
  'species',
  'strain',
  'unknown'
];
export const getClassLevelCompositionBySampleId = async (sampleId,rank) =>{
    if(!allowedRanks.includes(rank)) {
      throw new Error("Invalid Taxonomy Rank") ;
    }
    const result = await pool.query(`
      SELECT
        bc.comp_id,
        bc.sample_id,
        bc.tax_id,
        bc.taxon_name,
        bc.reported_rank,
        bc.relative_abundance
      FROM bacterial_composition bc
      WHERE bc.sample_id = $1
        AND bc.reported_rank = $2
      ORDER BY bc.relative_abundance DESC NULLS LAST;
      `,
      [sampleId, rank] );
      return result.rows ;
    } ;