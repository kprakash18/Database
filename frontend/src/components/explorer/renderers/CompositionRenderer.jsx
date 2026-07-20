import { useState } from "react";

const chartColors = [
  "#1d4ed8",
  "#0284c7",
  "#0d9488",
  "#7e22ce",
  "#16a34a",
  "#dc2626",
  "#b45309",
  "#475569",
  "#db2777",
  "#0f766e",
];

const polarToCartesian = (center, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: center + radius * Math.cos(angleInRadians),
    y: center + radius * Math.sin(angleInRadians),
  };
};

const describeArc = (center, radius, startAngle, endAngle) => {
  const start = polarToCartesian(center, radius, endAngle);
  const end = polarToCartesian(center, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
};

const CompositionRenderer = ({ responseData }) => {
  const [viewMode, setViewMode] = useState("pie"); // "pie" | "bar" | "table"
  const [activeItem, setActiveItem] = useState(null);

  const meta = responseData?.meta || {};
  const rawList =
    Array.isArray(responseData?.data)
      ? responseData.data
      : Array.isArray(responseData?.values)
      ? responseData.values.map((v, i) => ({
          label: responseData.labels?.[i] || `Taxon ${i + 1}`,
          value: v,
        }))
      : [];

  const items = rawList
    .map((item) => ({
      label: item.label || item.taxon_name || "Unknown",
      value: item.value ?? item.relative_abundance ?? 0,
      is_dominant: item.is_dominant || (typeof item.value === "number" && item.value >= 10),
      measurement_type: item.measurement_type,
    }))
    .sort((a, b) => b.value - a.value);

  const totalValue = items.reduce((sum, item) => sum + (typeof item.value === "number" ? item.value : 0), 0);

  // Calculate donut segments purely using reduce
  const donutSegments = items.slice(0, 10).reduce((acc, item, index) => {
    const startAngle = acc.length > 0 ? acc[acc.length - 1].endAngle : 0;
    const size = totalValue > 0 ? (item.value / totalValue) * 360 : 0;
    const endAngle = startAngle + size;

    acc.push({
      ...item,
      color: chartColors[index % chartColors.length],
      startAngle,
      endAngle,
      path: describeArc(50, 50, startAngle, endAngle >= 360 ? 359.99 : endAngle),
    });
    return acc;
  }, []);

  return (
    <div className="rounded-lg border border-slate-300 bg-white p-5 space-y-4 shadow-sm">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase text-blue-900 bg-blue-100 border border-blue-300 px-2 py-0.5 rounded">
            NCBI METAGENOMIC PROFILE
          </span>
          <h3 className="text-sm font-bold text-slate-900 mt-1">
            {meta.title || "Microbial Composition Abundance"}
          </h3>
          <p className="text-xs text-slate-500">
            {items.length} taxa identified · Total Abundance: {totalValue.toFixed(1)}%
          </p>
        </div>

        {/* View Mode Toggle Controls */}
        <div className="inline-flex rounded-md border border-slate-300 bg-slate-100 p-0.5 text-xs font-bold shadow-xs">
          <button
            onClick={() => setViewMode("pie")}
            className={`rounded px-3 py-1.5 transition ${
              viewMode === "pie"
                ? "bg-blue-700 text-white shadow-xs"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            Pie Chart
          </button>
          <button
            onClick={() => setViewMode("bar")}
            className={`rounded px-3 py-1.5 transition ${
              viewMode === "bar"
                ? "bg-blue-700 text-white shadow-xs"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            Bar Chart
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`rounded px-3 py-1.5 transition ${
              viewMode === "table"
                ? "bg-blue-700 text-white shadow-xs"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            Data Table
          </button>
        </div>
      </div>

      {/* Render View: Pie / Donut Chart */}
      {viewMode === "pie" && (
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 items-center py-2">
          <div className="relative flex aspect-square w-full max-w-[260px] mx-auto items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="18" />
              {donutSegments.map((segment) => (
                <path
                  key={segment.label}
                  d={segment.path}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth="18"
                  className="cursor-pointer transition-all hover:opacity-85"
                  onMouseEnter={() => setActiveItem(segment)}
                  onMouseLeave={() => setActiveItem(null)}
                />
              ))}
            </svg>
            <div className="absolute inset-[24%] flex flex-col items-center justify-center rounded-full bg-white border border-slate-300 text-center p-2 shadow-xs">
              <span className="text-[9px] font-bold uppercase text-slate-500">
                {activeItem ? "Hovered" : "Dominant"}
              </span>
              <span className="truncate max-w-[90%] text-xs font-bold italic text-blue-900">
                {(activeItem || items[0])?.label || "Taxa"}
              </span>
              <span className="text-xs font-mono font-bold text-slate-900">
                {((activeItem || items[0])?.value || 0).toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Legend Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {donutSegments.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-2 rounded border border-slate-200 bg-slate-50 p-2.5 shadow-xs"
                onMouseEnter={() => setActiveItem(item)}
                onMouseLeave={() => setActiveItem(null)}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="h-3 w-3 rounded-xs shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="truncate italic font-semibold text-slate-900">{item.label}</span>
                </div>
                <span className="font-mono font-bold text-blue-900 shrink-0">{item.value.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Render View: Bar Chart */}
      {viewMode === "bar" && (
        <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1 text-xs">
          {items.map((item, idx) => {
            const color = chartColors[idx % chartColors.length];
            const maxVal = items[0]?.value || 100;
            const pct = Math.min((item.value / maxVal) * 100, 100);

            return (
              <div key={item.label} className="rounded border border-slate-200 bg-slate-50 p-2.5 space-y-1.5 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-500">#{idx + 1}</span>
                    <span className="font-bold italic text-slate-900">{item.label}</span>
                  </div>
                  <span className="font-mono font-bold text-blue-900">{item.value.toFixed(1)}%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-200 rounded overflow-hidden">
                  <div className="h-full rounded" style={{ width: `${pct}%`, backgroundColor: color }} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Render View: Data Table */}
      {viewMode === "table" && (
        <div className="overflow-x-auto rounded border border-slate-300">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-mono text-[11px] uppercase border-b border-slate-300">
              <tr>
                <th className="p-2.5">#</th>
                <th className="p-2.5">Scientific Name</th>
                <th className="p-2.5">Dominance Status</th>
                <th className="p-2.5 text-right">Relative Abundance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {items.map((item, idx) => (
                <tr key={item.label} className="hover:bg-slate-50 transition">
                  <td className="p-2.5 font-mono text-slate-500">#{idx + 1}</td>
                  <td className="p-2.5 font-bold italic text-slate-900">{item.label}</td>
                  <td className="p-2.5">
                    {item.is_dominant ? (
                      <span className="rounded bg-emerald-100 border border-emerald-300 px-2 py-0.5 text-[10px] font-bold text-emerald-900">
                        DOMINANT (&ge;10%)
                      </span>
                    ) : (
                      <span className="rounded bg-slate-100 border border-slate-300 px-2 py-0.5 text-[10px] text-slate-600">
                        MINOR (&lt;10%)
                      </span>
                    )}
                  </td>
                  <td className="p-2.5 text-right font-mono font-bold text-blue-900">{item.value.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompositionRenderer;
