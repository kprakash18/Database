import { pool } from '../config/db.js' ;

export async function saveLineageToDB(taxoName, ncbiID, lineageData){
    try{
        const {
            domain,
            phylum,
            class: className,
            order,
            family,
            genus,
            species,
            raw_lineage
          } = lineageData;

          const lineageText = [
            domain,
            phylum,
            className,
            order,
            family,
            genus,
            species
          ].filter(Boolean).join("; ");

          const query = `
          INSERT INTO taxonomy_lineage (
            tax_id, domain, phylum, class, "order",
            family, genus, species,
            ncbi_tax_id, lineage_json,
            is_complete, enrichment_status
          )
          SELECT
            t.tax_id, $1,$2,$3,$4,$5,$6,$7,
            $8,$9,true,'completed'
            FROM taxonomy t
            WHERE LOWER(t.name) = LOWER($10)
            ON CONFLICT (tax_id) DO UPDATE SET
            domain = EXCLUDED.domain,
            phylum = EXCLUDED.phylum,
            class = EXCLUDED.class,
            "order" = EXCLUDED."order",
            family = EXCLUDED.family,
            genus = EXCLUDED.genus,
            species = EXCLUDED.species,
            ncbi_tax_id = EXCLUDED.ncbi_tax_id,
            lineage_json = EXCLUDED.lineage_json,
            enrichment_status = 'completed',
            last_updated = CURRENT_TIMESTAMP;
        `;  

        const values = [
            domain,
            phylum,
            className,
            order,
            family,
            genus,
            species,
            ncbiID,
            JSON.stringify(raw_lineage),
            taxoName
          ];
          
          const result = await pool.query(query, values);

          await pool.query(
            `UPDATE taxonomy
             SET ncbi_tax_id = $1,
                 lineage = $2,
                 is_linked = TRUE
             WHERE LOWER(name) = LOWER($3)`,
            [ncbiID, lineageText, taxoName]
          );

          console.log("Inserted/Updated:", taxoName);
    return result; 
    }catch (err){
        console.error("DB Error :", err.message) ;
        
    }
}
