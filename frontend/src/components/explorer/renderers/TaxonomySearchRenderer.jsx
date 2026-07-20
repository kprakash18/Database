const TaxonomySearchRenderer = ({ responseData }) => {
  const meta = responseData?.meta || {};
  const matches =
    Array.isArray(responseData?.data)
      ? responseData.data
      : Array.isArray(responseData?.matches)
      ? responseData.matches
      : Array.isArray(responseData)
      ? responseData
      : [];

  return (
    <div className="rounded-lg border border-slate-300 bg-white p-5 space-y-3 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase text-blue-900 bg-blue-100 border border-blue-300 px-2 py-0.5 rounded">
            NCBI TAXONOMY BROWSER
          </span>
          <h3 className="text-sm font-bold text-slate-900 mt-1">{meta.title || "Taxonomy Search Results"}</h3>
        </div>
        <span className="text-xs font-mono font-bold text-slate-600">{matches.length} taxonomy records matched</span>
      </div>

      <div className="overflow-x-auto rounded border border-slate-300">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 text-slate-700 font-mono text-[11px] uppercase border-b border-slate-300">
            <tr>
              <th className="p-2.5">Scientific Name</th>
              <th className="p-2.5">Taxonomic Rank</th>
              <th className="p-2.5">Internal Tax ID</th>
              <th className="p-2.5">NCBI Taxonomy ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {matches.map((item) => (
              <tr key={`${item.tax_id}-${item.name}`} className="hover:bg-slate-50 transition">
                <td className="p-2.5 font-bold italic text-blue-950">{item.name || item.scientificName}</td>
                <td className="p-2.5">
                  <span className="rounded bg-slate-100 border border-slate-300 px-2 py-0.5 font-bold uppercase text-[10px] text-slate-700">
                    {item.rank || "taxon"}
                  </span>
                </td>
                <td className="p-2.5 font-mono text-slate-600">#{item.tax_id || item.taxonomyId}</td>
                <td className="p-2.5 font-mono font-bold text-blue-700">
                  {item.ncbi_tax_id ? `NCBI:${item.ncbi_tax_id}` : "N/A"}
                </td>
              </tr>
            ))}

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
    </div>
  );
};

export default TaxonomySearchRenderer;
