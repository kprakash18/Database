import { parseStringPromise } from "xml2js";

export async function extractLineage(xml) {
  try {
    // 1. Convert XML → JSON
    const data = await parseStringPromise(xml);

    // 2. Navigate structure
    const taxon = data?.TaxaSet?.Taxon?.[0];

    if (!taxon) {
      console.log("No taxon found in XML");
      return null;
    }

    // 3. Get lineage array
    const lineageArr = taxon.LineageEx?.[0]?.Taxon || [];

    // 4. Helper function
    const get = (rank) =>
      lineageArr.find(t => t.Rank?.[0] === rank)?.ScientificName?.[0] || null;

    // 5. Extract fields
    const result = {
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

      ncbi_rank: taxon.Rank?.[0],
      raw_lineage: lineageArr
    };

    console.log("Extracted:", result);

    return result;

  } catch (err) {
    console.error("XML parsing error:", err.message);
    return null;
  }
}