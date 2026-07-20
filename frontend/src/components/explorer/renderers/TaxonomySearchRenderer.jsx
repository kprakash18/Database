import { useState } from "react";

const RankColors = {
  root: "#475569",
  domain: "#1d4ed8",
  phylum: "#0284c7",
  class: "#0d9488",
  order: "#7e22ce",
  family: "#16a34a",
  genus: "#d97706",
  species: "#dc2626",
};

const getRankLabel = (depth) => {
  const ranks = ["Root", "Domain", "Phylum", "Class", "Order", "Family", "Genus", "Species"];
  return ranks[depth] || "Taxon";
};

const TaxonomySearchRenderer = ({ responseData }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const meta = responseData?.meta || {};
  
  const matches =
    Array.isArray(responseData?.data)
      ? responseData.data
      : Array.isArray(responseData?.matches)
      ? responseData.matches
      : Array.isArray(responseData)
      ? responseData
      : [];

  const activeMatch = matches[selectedIdx] || matches[0];

  return (
    <div className="rounded-lg border border-slate-300 bg-white p-5 space-y-4 shadow-sm" style={{ fontFamily: "var(--sans)" }}>
      {/* Header card */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase text-blue-900 bg-blue-100 border border-blue-300 px-2 py-0.5 rounded">
            NCBI TAXONOMY BROWSER
          </span>
          <h3 className="text-sm font-bold text-slate-900 mt-1">{meta.title || "Taxonomy Search Results"}</h3>
        </div>
        <span className="text-xs font-mono font-bold text-slate-600">{matches.length} taxonomy records matched</span>
      </div>

      {/* Interactive Lineage Path Visualization */}
      {activeMatch && activeMatch.path && activeMatch.path.length > 0 && (
        <div style={{
          padding: "16px",
          backgroundColor: "var(--page-bg)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--shadow-sm)",
        }}>
          <h4 style={{ margin: "0 0 12px 0", fontSize: "11px", fontWeight: 700, color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.02em" }}>
            Visual Lineage Path: <span style={{ fontStyle: "italic", color: "var(--ink)", fontWeight: 800 }}>{activeMatch.name || activeMatch.scientificName}</span>
          </h4>
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            flexWrap: "wrap", padding: "4px 0",
          }}>
            {activeMatch.path.map((nodeName, idx) => {
              const rank = getRankLabel(idx).toLowerCase();
              const bgColor = RankColors[rank] || "#64748b";
              return (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {idx > 0 && (
                    <span style={{ fontSize: "16px", color: "var(--ink-faint)", fontWeight: 900 }}>⟶</span>
                  )}
                  <div style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    backgroundColor: "#ffffff", border: `1px solid ${bgColor}`,
                    borderRadius: "var(--radius)", padding: "8px 12px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    minWidth: "90px",
                    textAlign: "center",
                  }}>
                    <span style={{ fontSize: "8px", fontWeight: 800, color: bgColor, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {getRankLabel(idx)}
                    </span>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--ink)", marginTop: "2px", fontStyle: idx >= 6 ? "italic" : "normal" }}>
                      {nodeName}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Grid Table Selection */}
      <div className="overflow-x-auto rounded border border-slate-300">
        <table className="w-full text-left text-xs" style={{ borderCollapse: "collapse" }}>
          <thead className="bg-slate-100 text-slate-700 font-mono text-[11px] uppercase border-b border-slate-300">
            <tr>
              <th className="p-2.5">Scientific Name</th>
              <th className="p-2.5">Taxonomic Rank</th>
              <th className="p-2.5">Internal ID</th>
              <th className="p-2.5">NCBI Taxonomy ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {matches.map((item, idx) => {
              const taxId = item.tax_id || item.taxonomyId;
              const name = item.name || item.scientificName || "Unknown";
              const ncbiTaxId = item.ncbi_tax_id ?? item.ncbiTaxId;
              const isSelected = (activeMatch === item) || (matches[selectedIdx] === item) || (selectedIdx === idx);
              return (
                <tr
                  key={`${taxId}-${name}`}
                  onClick={() => setSelectedIdx(idx)}
                  className="hover:bg-slate-50 transition"
                  style={{
                    cursor: "pointer",
                    backgroundColor: isSelected ? "var(--border-faint)" : "transparent",
                    transition: "background-color 100ms",
                  }}
                >
                  <td className="p-2.5 font-bold italic text-blue-950">
                    {isSelected && <span style={{ marginRight: "6px", color: "var(--accent)" }}>●</span>}
                    {name}
                  </td>
                  <td className="p-2.5">
                    <span className="rounded bg-slate-100 border border-slate-300 px-2 py-0.5 font-bold uppercase text-[10px] text-slate-700">
                      {item.rank || "taxon"}
                    </span>
                  </td>
                  <td className="p-2.5 font-mono text-slate-600">#{taxId}</td>
                  <td className="p-2.5 font-mono font-bold text-blue-700">
                    {ncbiTaxId ? `NCBI:${ncbiTaxId}` : "N/A"}
                  </td>
                </tr>
              );
            })}

            {matches.length === 0 && (
              <tr>
                <td colSpan="4" className="p-6 text-center text-slate-500 text-xs">
                  No NCBI taxonomy records matched your query.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: "11px", color: "var(--ink-muted)", margin: 0, fontStyle: "italic" }}>
        * Click on any microbe row in the table above to visualize its position in the evolutionary hierarchy.
      </p>
    </div>
  );
};

export default TaxonomySearchRenderer;
