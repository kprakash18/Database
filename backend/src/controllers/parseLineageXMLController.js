import { getNcbiTaxId } from "../services/ncbi.fetch.taxonId.js";
import { fetchNcbiXML } from "../services/ncbi.fetch.lineage.js";
import { extractLineage } from "../services/parseLineageXML.js";


  
  export const testLineage = async (req, res) => {
    const name = req.query.name;
  
    const ncbiId = await getNcbiTaxId(name);
    const xml = await fetchNcbiXML(ncbiId);
    const lineage = await extractLineage(xml);
  
    res.json({ name, ncbiId, lineage });
  };