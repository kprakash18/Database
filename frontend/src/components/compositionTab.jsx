import { useEffect, useState } from "react";
import { getCompositionByRank } from "../api/compositionApi";

const ranks = ["phylum", "class", "order", "family", "genus", "species"];
const chartColors = [
  "#0f766e",
  "#2563eb",
  "#f97316",
  "#9333ea",
  "#16a34a",
  "#dc2626",
  "#0891b2",
  "#ca8a04",
  "#7c3aed",
  "#475569",
  "#db2777",
  "#65a30d",
];

const formatPercent = (value) => {
  const number = Number(value ?? 0);
  return `${number.toFixed(number >= 10 ? 1 : 2)}%`;
};

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

const getDonutSegments = (items) => {
  const total = items.reduce((sum, item) => sum + item.value, 0);
  let cursor = 0;

  return items.map((item, index) => {
    const start = cursor;
    const size = total > 0 ? (item.value / total) * 360 : 0;
    cursor += size;
    return {
      ...item,
      color: chartColors[index % chartColors.length],
      path: describeArc(50, 40, start, cursor === 360 ? 359.99 : cursor),
    };
  });
};

const CompositionTab = ({ sampleId }) => {
  const [rank, setRank] = useState("genus");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTaxon, setActiveTaxon] = useState(null);

  useEffect(() => {
    const fetchComposition = async () => {
      try {
        setLoading(true);

        const res = await getCompositionByRank(sampleId, rank);

        const rows = Array.isArray(res)
          ? res
          : Array.isArray(res.data)
          ? res.data
          : [];

        setData(rows);
      } catch (err) {
        console.error("Composition fetch error:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchComposition();
  }, [sampleId, rank]);

  if (loading) {
    return <p className="text-sm text-slate-600">Loading composition...</p>;
  }

  const composition = data
    .map((item) => ({
      label: item.label || item.taxon_name || "Unknown",
      value: Number(item.value ?? item.relative_abundance ?? 0),
    }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value);

  const visibleComposition = composition.slice(0, 11);
  const remainingValue = composition
    .slice(11)
    .reduce((total, item) => total + item.value, 0);
  const chartData =
    remainingValue > 0
      ? [...visibleComposition, { label: "Other taxa", value: remainingValue }]
      : visibleComposition;
  const dominantTaxon = composition[0];
  const totalAbundance = composition.reduce((total, item) => total + item.value, 0);
  const chartTotal = chartData.reduce((total, item) => total + item.value, 0);
  const labels = chartData.map((item) => item.label);
  const highlightedTaxon = activeTaxon || dominantTaxon;
  const donutSegments = getDonutSegments(chartData);

  return (
    <div>
      <div className="mb-5 flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-end">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Taxonomy Level
          </label>

          <select
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            className="min-w-40 rounded border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 shadow-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
          >
            {ranks.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="text-sm text-slate-600 sm:text-right">
          <div className="font-semibold text-slate-800">
            {composition.length} taxa at {rank} level
          </div>
          <div>Total abundance shown: {formatPercent(totalAbundance)}</div>
        </div>
      </div>

      {composition.length === 0 ? (
        <div className="rounded border border-slate-300 bg-slate-50 p-6 text-center text-slate-500">
          No composition data found.
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.8fr)]">
          <section className="rounded border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Composition Donut Chart
                </h3>
                <p className="text-sm text-slate-500">
                  Relative abundance by {rank}
                </p>
              </div>

              {dominantTaxon && (
                <div className="rounded border border-teal-100 bg-teal-50 px-3 py-2 text-sm">
                  <span className="block text-xs font-semibold uppercase tracking-wide text-teal-700">
                    Dominant taxon
                  </span>
                  <span className="font-semibold italic text-slate-900">
                    {dominantTaxon.label}
                  </span>{" "}
                  <span className="text-slate-700">
                    {formatPercent(dominantTaxon.value)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center gap-6 py-4">
              <div className="relative flex aspect-square w-full max-w-[430px] items-center justify-center rounded-full transition duration-300 hover:scale-[1.02] hover:shadow-2xl">
                <svg
                  className="h-full w-full overflow-visible"
                  viewBox="0 0 100 100"
                  role="img"
                  aria-label={`${rank} composition pie chart for ${labels.join(", ")}`}
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="18"
                  />

                  {donutSegments.map((segment) => {
                    const isActive = activeTaxon?.label === segment.label;

                    return (
                      <path
                        key={`${segment.label}-slice`}
                        d={segment.path}
                        fill="none"
                        stroke={segment.color}
                        strokeWidth={isActive ? "21" : "18"}
                        strokeLinecap="butt"
                        className="cursor-pointer transition-all duration-200 hover:brightness-110"
                        onMouseEnter={() => setActiveTaxon(segment)}
                        onMouseLeave={() => setActiveTaxon(null)}
                      >
                        <title>
                          {segment.label}: {formatPercent(segment.value)}
                        </title>
                      </path>
                    );
                  })}
                </svg>

                <div className="absolute inset-[22%] flex flex-col items-center justify-center rounded-full border border-slate-200 bg-white text-center shadow-lg transition duration-300">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {activeTaxon ? "Selected taxon" : rank}
                  </span>
                  <span className="mt-1 max-w-[72%] truncate text-lg font-semibold italic text-slate-900">
                    {highlightedTaxon.label}
                  </span>
                  <span className="text-sm text-slate-600">
                    Composition: {formatPercent(highlightedTaxon.value)}
                  </span>
                </div>
              </div>

              <div className="grid w-full gap-2 sm:grid-cols-2">
                {chartData.map((item, index) => {
                  const isActive = activeTaxon?.label === item.label;

                  return (
                    <div
                      key={`${item.label}-legend`}
                      className={`flex cursor-default items-center justify-between gap-3 rounded border px-3 py-2 text-sm transition duration-200 hover:-translate-y-0.5 hover:border-teal-300 hover:bg-white hover:shadow-md ${
                        isActive
                          ? "border-teal-400 bg-teal-50 shadow-sm"
                          : "border-slate-200 bg-slate-50"
                      }`}
                      title={`${item.label}: ${formatPercent(item.value)}`}
                      onMouseEnter={() => setActiveTaxon(item)}
                      onMouseLeave={() => setActiveTaxon(null)}
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <span
                          className="h-3 w-3 shrink-0 rounded-sm transition duration-200 group-hover:scale-110"
                          style={{
                            backgroundColor:
                              chartColors[index % chartColors.length],
                          }}
                        />
                        <span className="truncate italic text-slate-800">
                          {item.label}
                        </span>
                      </div>
                      <span className="shrink-0 font-semibold text-slate-900">
                        {formatPercent(item.value)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="text-xs text-slate-500">
                Chart share total: {formatPercent(chartTotal)}
              </div>
            </div>
          </section>

          <section className="rounded border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-4 py-3">
              <h3 className="text-base font-semibold text-slate-900">
                Ranked Composition
              </h3>
              <p className="text-sm text-slate-500">
                Highest abundance taxa first
              </p>
            </div>

            <div className="max-h-[560px] overflow-y-auto p-4">
              <div className="space-y-3">
                {composition.map((item, index) => {
                  const color = chartColors[index % chartColors.length];
                  const width = Math.min((item.value / dominantTaxon.value) * 100, 100);
                  const isActive = activeTaxon?.label === item.label;

                  return (
                    <div
                      key={`${item.label}-${index}`}
                      className={`rounded px-2 py-2 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-sm ${
                        isActive ? "bg-teal-50 shadow-sm" : ""
                      }`}
                      onMouseEnter={() => setActiveTaxon(item)}
                      onMouseLeave={() => setActiveTaxon(null)}
                    >
                      <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                        <div className="flex min-w-0 items-center gap-2">
                          <span
                            className={`h-3 w-3 shrink-0 rounded-sm transition duration-200 ${
                              isActive ? "scale-125" : ""
                            }`}
                            style={{ backgroundColor: color }}
                          />
                          <span
                            className={`truncate italic ${
                              isActive
                                ? "font-semibold text-slate-950"
                                : "text-slate-800"
                            }`}
                          >
                            {item.label}
                          </span>
                        </div>
                        <span className="shrink-0 font-semibold text-slate-900">
                          {formatPercent(item.value)}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded bg-slate-100">
                        <div
                          className="h-full rounded transition-all duration-300"
                          style={{ width: `${width}%`, backgroundColor: color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default CompositionTab;
