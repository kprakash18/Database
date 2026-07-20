const SamplesRenderer = ({ responseData }) => {
  const meta = responseData?.meta || {};
  const isDetail = meta.visualization === "sampleDetail";

  if (isDetail) {
    const sample = responseData?.data || responseData;
    return (
      <div className="rounded-lg border border-slate-300 bg-white p-5 space-y-4 shadow-sm">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <div>
            <span className="font-mono text-xs font-bold text-blue-900 bg-blue-100 border border-blue-300 px-2.5 py-0.5 rounded">
              ACCESSION: {sample.accession_code || `INDF${String(sample.sample_id).padStart(3, "0")}`}
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-1">{sample.food_name}</h3>
          </div>
          <span className="font-mono text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded border border-slate-200">
            NCBI Sample ID: #{sample.sample_id}
          </span>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed font-normal">{sample.description}</p>

        {sample.metadata && sample.metadata.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Metagenomic Metadata Parameters</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded bg-slate-50 p-2.5 border border-slate-200">
                <span className="block text-[10px] text-slate-500 font-bold uppercase">Geographic Location</span>
                <span className="font-semibold text-slate-900">{sample.metadata[0].location || "N/A"}</span>
              </div>
              <div className="rounded bg-slate-50 p-2.5 border border-slate-200">
                <span className="block text-[10px] text-slate-500 font-bold uppercase">pH Level</span>
                <span className="font-bold text-blue-900 font-mono">{sample.metadata[0].ph ?? "N/A"}</span>
              </div>
              <div className="rounded bg-slate-50 p-2.5 border border-slate-200">
                <span className="block text-[10px] text-slate-500 font-bold uppercase">Temperature (°C)</span>
                <span className="font-semibold text-slate-900 font-mono">{sample.metadata[0].temperature ? `${sample.metadata[0].temperature}°C` : "N/A"}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  const list = Array.isArray(responseData?.data)
    ? responseData.data
    : Array.isArray(responseData)
    ? responseData
    : [];

  return (
    <div className="rounded-lg border border-slate-300 bg-white p-5 space-y-3 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase text-blue-900 bg-blue-100 border border-blue-300 px-2 py-0.5 rounded">
            NCBI BIOPROJECT DIRECTORY
          </span>
          <h3 className="text-sm font-bold text-slate-900 mt-1">{meta.title || "Metagenomic Samples Directory"}</h3>
        </div>
        <span className="text-xs font-mono text-slate-600 font-bold">{list.length} records retrieved</span>
      </div>

      <div className="overflow-x-auto rounded border border-slate-300">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 text-slate-700 font-mono text-[11px] uppercase border-b border-slate-300">
            <tr>
              <th className="p-2.5">NCBI Accession</th>
              <th className="p-2.5">Food Sample Name</th>
              <th className="p-2.5">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {list.map((sample) => (
              <tr key={sample.sample_id} className="hover:bg-slate-50 transition">
                <td className="p-2.5 whitespace-nowrap font-mono font-bold text-blue-900">
                  {sample.accession_code || `INDF${String(sample.sample_id).padStart(3, "0")}`}
                </td>
                <td className="p-2.5 font-bold text-slate-900">{sample.food_name}</td>
                <td className="p-2.5 text-slate-600 max-w-xs truncate">{sample.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SamplesRenderer;
