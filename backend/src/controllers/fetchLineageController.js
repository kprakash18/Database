import { fetchNcbiXML, extractLineage } from "../services/ncbi.fetch.lineage.js";
import { getNcbiTaxId } from '../services/ncbi.fetch.taxonId.js' ;
export const testLineage = async (req, res) => {
  const name = req.query.name;

  const ncbiId = await getNcbiTaxId(name);

  const xml = await fetchNcbiXML(ncbiId);

  const lineage = await extractLineage(xml);

  res.json({
    name,
    ncbiId,
    lineage
  });
};