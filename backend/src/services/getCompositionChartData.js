import { pool } from '../config/db.js' ;
export const getCompositionChartData = async (sampleId, rank) => {
    const allowedRanks = [
      "domain", "phylum", "class", "order",
      "family", "genus", "species", "strain", "unknown"
    ];
  
    if (!allowedRanks.includes(rank)) {
      throw new Error("Invalid taxonomy rank");
    }
  
    const result = await pool.query(
      `
      SELECT
        bc.taxon_name AS label,
        bc.relative_abundance AS value,
        bc.reported_rank AS rank,
        tl.phylum,
        tl.class,
        tl."order",
        tl.family,
        tl.genus,
        tl.species
      FROM bacterial_composition bc
      LEFT JOIN taxonomy_lineage tl
        ON bc.tax_id = tl.tax_id
      WHERE bc.sample_id = $1
        AND bc.reported_rank = $2
        AND bc.relative_abundance IS NOT NULL
      ORDER BY bc.relative_abundance DESC;
      `,
      [sampleId, rank]
    );
  
    return result.rows;
  };