// src/services/ncbi.fetch.taxonId.js

import fetch from 'node-fetch' ;
export async function getNcbiTaxId(taxonName) {
    try {
      if (!taxonName) {
        console.log("No taxon name provided");
        return null;
      }
  
      // Clean input
      const cleanName = taxonName.trim();
  
      // Exact match using [All Names]
      const query = `"${cleanName}"[All Names]`; // Wrap in quotes to preserve spaces(word with spaces )
  
      const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=taxonomy&term=${encodeURIComponent(query)}&retmode=json`;
  
      console.log("Query:", query);
  
      const res = await fetch(url);
      const data = await res.json();
  
      console.log("Response:", JSON.stringify(data, null, 2));
  
      const ids = data.esearchresult?.idlist;
  
      if (!ids || ids.length === 0) {
        console.log(`No match for ${taxonName}`);
        return null;
      }
  
      const ncbiId = ids[0];
  
      console.log(`${taxonName} → ${ncbiId}`);
  
      return ncbiId;
  
    } catch (err) {
      console.error("Error:", err.message);
      return null;
    }
  }