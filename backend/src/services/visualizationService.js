import { pool } from '../config/db.js' ;

export async function getPhylumDistribution(sample_id) {
    const result = await pool.query(`
        SELECT 
        COALESCE(tl.phylum, 'Unknown') AS phylum,
        SUM(bc.relative_abundance) AS total_abundance
        FROM bacterial_composition bc
        LEFT JOIN taxonomy_lineage tl ON bc.tax_id = tl.tax_id
        WHERE bc.sample_id = $1
        GROUP BY tl.phylum
        ORDER BY total_abundance DESC;
        `,
        [sample_id]
    );
    return result.rows[0] ;
};

export async function getGenusDistribution(sampleId) {
    const result = await pool.query(
      `
      SELECT 
        COALESCE(tl.genus, bc.taxon_name, 'Unknown') AS genus,
        SUM(bc.relative_abundance) AS total_abundance
      FROM bacterial_composition bc
      LEFT JOIN taxonomy_lineage tl ON bc.tax_id = tl.tax_id
      WHERE bc.sample_id = $1
      GROUP BY tl.genus, bc.taxon_name
      ORDER BY total_abundance DESC;
      `,
      [sampleId]
    );
  
    return result.rows;
  }

  export async function getTaxonomyStackedData() {
    const result = await pool.query(
      `
      SELECT 
        s.sample_id,
        s.food_name,
        COALESCE(tl.phylum, 'Unknown') AS phylum,
        SUM(bc.relative_abundance) AS total_abundance
      FROM samples s
      JOIN bacterial_composition bc ON s.sample_id = bc.sample_id
      LEFT JOIN taxonomy_lineage tl ON bc.tax_id = tl.tax_id
      GROUP BY s.sample_id, s.food_name, tl.phylum
      ORDER BY s.sample_id, total_abundance DESC;
      `
    );
  
    return result.rows;
  }  