const Tooltip = ({ tooltip }) => {
  if (!tooltip) return null;

  const rows = [
    ["Scientific Name", tooltip.scientificName || tooltip.name],
    ["Taxonomic Rank", tooltip.rank],
    ["Taxonomy ID", tooltip.taxonomyId || tooltip.ncbiTaxId || "Not available"],
    ["Parent Name", tooltip.parentName || "Root"],
    ["Child Nodes", tooltip.childCount ?? 0],
  ];

  return (
    <div
      className="pointer-events-none fixed z-50 w-64 border border-slate-700 bg-white/95 p-3 text-xs text-slate-900 shadow-xl backdrop-blur dark:border-slate-600 dark:bg-slate-950/95 dark:text-slate-100"
      style={{ left: tooltip.x + 14, top: tooltip.y + 14 }}
    >
      <div className="mb-2 text-sm font-semibold">{tooltip.scientificName || tooltip.name}</div>
      <div className="space-y-1">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-3">
            <span className="text-slate-500 dark:text-slate-400">{label}</span>
            <span className="text-right font-medium">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tooltip;
