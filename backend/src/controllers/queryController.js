import {fetchNcbiXML} from '../services/ncbi.fetch.lineage.js' ;
import {getNcbiTaxId} from '../services/ncbi.fetch.taxonId.js' ;
import {extractLineage} from '../services/parseLineageXML.js' ;
import {saveLineageToDB} from '../services/sqlQuery.insert.lineage.into.taxonomy_lineage.js' ;

export const enrichOne = async(req, res) =>{
    const name = req.query.name ;
    try{
        const ncbiId = await getNcbiTaxId(name);

        if (!ncbiId) {
            return res.json({ error: "No NCBI ID found" });
        }

        const xml = await fetchNcbiXML(ncbiId);
        const lineage = await extractLineage(xml);

        if (!lineage) {
            return res.json({ error: "Lineage extraction failed" });
        }

        await saveLineageToDB(name, ncbiId, lineage);  

        res.json({
            name,
            ncbiId,
            lineage,
            status: "stored"
        });

    }catch(err){
         res.status(500).json({ error: err.message });
    }
} ;
