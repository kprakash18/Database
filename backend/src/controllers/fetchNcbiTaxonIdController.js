import { getNcbiTaxId } from "../services/ncbi.fetch.taxonId.js";

export const testNcbi = async (req, res) => {
    const  name  = req.query.name;
    const id = await getNcbiTaxId(name);
  
    res.json({ name, ncbi_id: id });
  };