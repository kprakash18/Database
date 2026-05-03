import fetch from 'node-fetch' ;
import { parseStringPromise } from "xml2js";  // parse xml -> extract lineage


export async function fetchNcbiXML(ncbiId) {
    try {
      const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=taxonomy&id=${ncbiId}`;
  
      const res = await fetch(url);
      const xml = await res.text();
  
      return xml;
  
    } catch (err) {
      console.error("XML fetch error:", err.message);
      return null;
    }
  }




export async function extractLineage(xml) {
  try {
    const data = await parseStringPromise(xml);

    const taxon = data?.TaxaSet?.Taxon?.[0];

    if (!taxon) return null;

    const lineage = taxon.LineageEx?.[0]?.Taxon || [];

    const get = (rank) =>
      lineage.find(t => t.Rank?.[0] === rank)?.ScientificName?.[0] || null;

    return {
      domain: get("superkingdom"),
      phylum: get("phylum"),
      class: get("class"),
      order: get("order"),
      family: get("family"),
      genus: get("genus"),
      species:
        taxon.Rank?.[0] === "species"
          ? taxon.ScientificName?.[0]
          : null,
      raw_lineage: lineage
    };

  } catch (err) {
    console.error("XML parse error:", err.message);
    return null;
  }
}
