import { pool } from '../config/db.js' ;

const allowedRanks = [
    'domain',
    'class',
    'phylum',
    'order',
    'genus',
    'family',
    'species',
    'strain',
    'unknown',
];

export const getFullCompositionByRank = async (sampleId, rank)=>{
    if(!allowedRanks.includes(rank)){
        throw new Error("Invalid taxonomy rank");
    }
    const result = await pool.query(`
        SELECT bc.comp_id,
        bc.sample_id,
        s.food_name,
        

        bc.taxon_name,
        bc.relative_abundance,
        bc.presence,
        bc.is_dominant,

        tl.domain,
        tl.phylum,
        tl.class,
        tl.order,
        tl.family,
        tl.genus,
        tl.species

        FROM bacterial_composition bc
        JOIN samples s
        ON bc.sample_id = s.sample_id

        LEFT JOIN taxonomy_lineage tl
        ON bc.tax_id = tl.tax_id

        WHERE bc.sample_id = $1
        AND bc.reported_rank = $2

        ORDER BY bc.relative_abundance DESC NULLS LAST
        `,
    [sampleId,rank]
) ;

    return result.rows ;
};