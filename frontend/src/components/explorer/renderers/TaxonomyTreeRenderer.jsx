import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const TaxonomyTreeRenderer = ({ responseData }) => {
  const [chartType, setChartType] = useState("sunburst"); // "sunburst" | "collapsibleTree"
  const svgRef = useRef(null);
  const meta = responseData?.meta || {};
  const treeData = responseData?.tree || responseData?.data || responseData;

  useEffect(() => {
    if (!treeData || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    if (chartType === "sunburst") {
      renderSunburst(svg, treeData);
    } else {
      renderCollapsibleTree(svg, treeData);
    }
  }, [treeData, chartType]);

  return (
    <div className="rounded-lg border border-slate-300 bg-white p-5 space-y-4 shadow-sm">
      {/* View Mode Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase text-blue-900 bg-blue-100 border border-blue-300 px-2 py-0.5 rounded">
            NCBI TAXONOMY HIERARCHY
          </span>
          <h3 className="text-sm font-bold text-slate-900 mt-1">
            {meta.title || "Taxonomy Hierarchy Explorer"}
          </h3>
          <p className="text-xs text-slate-500">
            Interactive bacterial lineage hierarchy tree
          </p>
        </div>

        <div className="inline-flex rounded-md border border-slate-300 bg-slate-100 p-0.5 text-xs font-bold shadow-xs">
          <button
            onClick={() => setChartType("sunburst")}
            className={`rounded px-3 py-1.5 transition ${
              chartType === "sunburst"
                ? "bg-blue-700 text-white shadow-xs"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            Sunburst Wheel
          </button>
          <button
            onClick={() => setChartType("collapsibleTree")}
            className={`rounded px-3 py-1.5 transition ${
              chartType === "collapsibleTree"
                ? "bg-blue-700 text-white shadow-xs"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            Hierarchy Tree
          </button>
        </div>
      </div>

      {/* SVG Container */}
      <div className="flex items-center justify-center min-h-[420px] rounded border border-slate-200 bg-slate-50 p-4">
        <svg ref={svgRef} className="max-w-full h-auto" />
      </div>
    </div>
  );
};

function renderSunburst(svg, data) {
  const width = 450;
  const radius = width / 2;

  svg
    .attr("width", width)
    .attr("height", width)
    .attr("viewBox", `-${radius} -${radius} ${width} ${width}`);

  const color = d3.scaleOrdinal(
    d3.quantize(d3.interpolateRainbow, data.children ? data.children.length + 1 : 1)
  );

  const hierarchy = d3
    .hierarchy(data)
    .sum((d) => d.value || (d.children ? 0 : 1))
    .sort((a, b) => (b.value || 0) - (a.value || 0));

  const root = d3.partition().size([2 * Math.PI, hierarchy.height + 1])(hierarchy);
  root.each((d) => (d.current = d));

  const arc = d3
    .arc()
    .startAngle((d) => d.x0)
    .endAngle((d) => d.x1)
    .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius / 2)
    .innerRadius((d) => d.y0 * (radius / (root.height + 1)))
    .outerRadius((d) => Math.max(d.y0 * (radius / (root.height + 1)), d.y1 * (radius / (root.height + 1)) - 1));

  const g = svg.append("g");

  g.append("g")
    .selectAll("path")
    .data(root.descendants().slice(1))
    .join("path")
    .attr("fill", (d) => {
      let p = d;
      while (p.depth > 1) p = p.parent;
      return color(p.data.name);
    })
    .attr("fill-opacity", (d) => (d.children ? 0.8 : 0.65))
    .attr("d", (d) => arc(d.current))
    .append("title")
    .text((d) => `${d.data.scientificName || d.data.name} (${d.data.rank || "taxon"})`);
}

function renderCollapsibleTree(svg, data) {
  const width = 600;
  const height = 400;

  svg
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", `0 0 ${width} ${height}`);

  const root = d3.hierarchy(data);
  const treeLayout = d3.tree().size([height - 40, width - 160]);
  treeLayout(root);

  const g = svg.append("g").attr("transform", "translate(80,20)");

  g.selectAll(".link")
    .data(root.links())
    .join("path")
    .attr("class", "link")
    .attr("fill", "none")
    .attr("stroke", "#94a3b8")
    .attr("stroke-width", 1.5)
    .attr(
      "d",
      d3
        .linkHorizontal()
        .x((d) => d.y)
        .y((d) => d.x)
    );

  const node = g
    .selectAll(".node")
    .data(root.descendants())
    .join("g")
    .attr("transform", (d) => `translate(${d.y},${d.x})`);

  node
    .append("circle")
    .attr("r", 4.5)
    .attr("fill", (d) => (d.children ? "#1d4ed8" : "#0284c7"));

  node
    .append("text")
    .attr("dy", "0.31em")
    .attr("x", (d) => (d.children ? -8 : 8))
    .attr("text-anchor", (d) => (d.children ? "end" : "start"))
    .text((d) => d.data.name)
    .attr("fill", "#0f172a")
    .attr("font-weight", "600")
    .attr("font-size", "10px");
}

export default TaxonomyTreeRenderer;
