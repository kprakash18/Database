const metadataRows = [
  ["Genome size", "genomeSize"],
  ["GC content", "gcContent"],
  ["Habitat", "habitat"],
  ["Pathogenicity", "pathogenicity"],
  ["Sequencing status", "sequencingStatus"],
];

const SidebarDetails = ({ node }) => {
  const details = node?.metadata || {};

  return (
    <aside className="border-l border-slate-300 bg-slate-50 p-4 lg:w-80">
      <div className="mb-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-blue-700">
          Selected Taxon
        </div>
        <h2 className="mt-1 text-lg font-semibold text-slate-950">
          {node?.scientificName || node?.name || "Life"}
        </h2>
        <p className="text-sm text-slate-500">
          {node?.rank || "root"} · {node?.childCount ?? 0} child nodes
        </p>
      </div>

      <div className="space-y-3 text-sm">
        <Detail label="Taxonomy ID" value={node?.taxonomyId || node?.ncbiTaxId || "Not available"} />
        <Detail label="Parent" value={node?.parentName || "Root"} />
        {metadataRows.map(([label, key]) => (
          <Detail key={key} label={label} value={details[key] || "Not available"} />
        ))}
      </div>
    </aside>
  );
};

const Detail = ({ label, value }) => (
  <div className="border-b border-slate-200 pb-2">
    <div className="text-xs text-slate-500">{label}</div>
    <div className="mt-1 font-medium text-slate-900">{value}</div>
  </div>
);

export default SidebarDetails;
