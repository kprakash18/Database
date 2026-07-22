import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const levelColors = ["#1d4ed8", "#0891b2", "#059669", "#ca8a04", "#dc2626", "#7c3aed", "#be123c", "#4d7c0f"];

const CollapsibleTreeChart = ({ data, highlightPath = [], onSelectNode, onHover }) => {
  const svgRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const zoomBehaviorRef = useRef(null);
  const rootRef = useRef(null);
  const updateRef = useRef(null);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    const width = 900, height = 650, dx = 180, dy = 45;
    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .attr("width", "100%")
      .attr("height", height)
      .style("font-family", "Inter, sans-serif")
      .style("user-select", "none");

    svg.selectAll("*").remove();

    const gContainer = svg.append("g").attr("class", "zoom-container");
    const gLink = gContainer.append("g").attr("fill", "none").attr("stroke-opacity", 0.6);
    const gNode = gContainer.append("g").attr("cursor", "pointer").attr("pointer-events", "all");

    const root = d3.hierarchy(data);

    // Initial state: collapse all nodes below depth 2
    root.descendants().forEach((d) => {
      if (d.depth >= 2 && d.children) {
        d._children = d.children;
        d.children = null;
      }
    });

    // Auto-expand parents for search highlighted path
    if (highlightPath?.length > 0) {
      const pathSet = new Set(highlightPath);
      root.descendants().forEach((d) => {
        if (pathSet.has(d.data.name)) {
          let parent = d.parent;
          while (parent) {
            if (parent._children) {
              parent.children = parent._children;
              parent._children = null;
            }
            parent = parent.parent;
          }
        }
      });
    }

    const zoomBehavior = d3.zoom()
      .scaleExtent([0.15, 3])
      .on("zoom", (event) => {
        gContainer.attr("transform", event.transform);
        setZoomLevel(event.transform.k);
      });

    svg.call(zoomBehavior);
    zoomBehaviorRef.current = zoomBehavior;
    svg.call(zoomBehavior.transform, d3.zoomIdentity.translate(80, height / 2).scale(0.85));

    const linkGenerator = d3.linkHorizontal().x((d) => d.y).y((d) => d.x);
    const getNodeColor = (d) => levelColors[d.depth % levelColors.length];
    const isHigh = (d) => highlightPath.includes(d.data.name);
    const isHighLink = (d) => highlightPath.includes(d.source.data.name) && highlightPath.includes(d.target.data.name);

    function update(source) {
      d3.tree().nodeSize([dy, dx])(root);
      const nodes = root.descendants();
      const links = root.links();

      nodes.forEach((d) => { d.y = d.depth * dx; });

      // ---- 1. LINKS ----
      const link = gLink.selectAll("path")
        .data(links, (d) => d.target.id || (d.target.id = Math.random().toString(36)));

      const linkEnter = link.enter().append("path")
        .attr("d", () => {
          const o = { x: source.x0 ?? source.x, y: source.y0 ?? source.y };
          return linkGenerator({ source: o, target: o });
        });

      link.merge(linkEnter)
        .transition().duration(650)
        .attr("d", linkGenerator)
        .attr("stroke", (d) => isHighLink(d) ? "#10b981" : "#e2e8f0")
        .attr("stroke-width", (d) => isHighLink(d) ? 4 : 2);

      link.exit().transition().duration(650)
        .attr("d", () => linkGenerator({ source: source, target: source }))
        .remove();

      // ---- 2. NODES ----
      const node = gNode.selectAll("g")
        .data(nodes, (d) => d.id || (d.id = Math.random().toString(36)));

      const nodeEnter = node.enter().append("g")
        .attr("transform", () => `translate(${source.y0 ?? source.y},${source.x0 ?? source.x})`)
        .on("click", (event, d) => {
          if (onSelectNode) onSelectNode(d.data);
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else {
            d.children = d._children;
            d._children = null;
          }
          update(d);
        })
        .on("mouseover", (event, d) => {
          if (onHover) {
            onHover({
              x: event.clientX,
              y: event.clientY,
              title: d.data.name,
              content: `Rank: ${d.data.rank || "Unknown"}\nNCBI ID: ${d.data.ncbiTaxId || "N/A"}`,
            });
          }
        })
        .on("mouseout", () => { if (onHover) onHover(null); });

      nodeEnter.append("circle")
        .attr("r", 6)
        .style("filter", "drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.15))");

      nodeEnter.append("text")
        .attr("dy", "0.31em")
        .text((d) => d.data.name)
        .style("font-size", "11px")
        .clone(true).lower()
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 3.5);

      const nodeUpdate = node.merge(nodeEnter);
      nodeUpdate.transition().duration(650)
        .attr("transform", (d) => `translate(${d.y},${d.x})`);

      nodeUpdate.select("circle")
        .attr("fill", (d) => (d._children ? getNodeColor(d) : "#ffffff"))
        .attr("stroke", (d) => isHigh(d) ? "#10b981" : getNodeColor(d))
        .attr("stroke-width", (d) => isHigh(d) ? 4.5 : 2.5)
        .attr("r", (d) => isHigh(d) ? 8 : 6);

      nodeUpdate.select("text")
        .attr("x", (d) => (d._children || d.children ? -12 : 12))
        .attr("text-anchor", (d) => (d._children || d.children ? "end" : "start"))
        .style("font-weight", (d) => (isHigh(d) ? "700" : "500"))
        .attr("fill", (d) => (isHigh(d) ? "#047857" : "#0f172a"));

      node.exit().transition().duration(650)
        .attr("transform", () => `translate(${source.y},${source.x})`)
        .remove();

      nodes.forEach((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    rootRef.current = root;
    updateRef.current = update;
    update(root);

  }, [data, highlightPath, onHover, onSelectNode]);

  const handleZoom = (factor) => {
    if (!zoomBehaviorRef.current || !svgRef.current) return;
    const svg = d3.select(svgRef.current);
    if (factor === 0) {
      svg.transition().duration(400)
        .call(zoomBehaviorRef.current.transform, d3.zoomIdentity.translate(80, 325).scale(0.85));
    } else {
      svg.transition().duration(250).call(zoomBehaviorRef.current.scaleBy, factor);
    }
  };

  const handleExpandAll = () => {
    if (!rootRef.current || !updateRef.current) return;
    const expand = (d) => {
      if (d._children) { d.children = d._children; d._children = null; }
      if (d.children) d.children.forEach(expand);
    };
    expand(rootRef.current);
    updateRef.current(rootRef.current);
  };

  const handleCollapseAll = () => {
    if (!rootRef.current || !updateRef.current) return;
    const collapse = (d) => {
      if (d.children) { d.children.forEach(collapse); d._children = d.children; d.children = null; }
    };
    collapse(rootRef.current);
    updateRef.current(rootRef.current);
  };

  return (
    <div className="relative w-full overflow-hidden bg-slate-50">
      <svg ref={svgRef} className="block w-full border-r border-slate-200" />
      <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-1.5 shadow-md">
        <button onClick={() => handleZoom(1.2)} className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-700 transition hover:bg-slate-100 active:scale-95" title="Zoom In">＋</button>
        <button onClick={() => handleZoom(0.8)} className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-700 transition hover:bg-slate-100 active:scale-95" title="Zoom Out">－</button>
        <button onClick={() => handleZoom(0)} className="flex h-8 px-2.5 items-center justify-center rounded-md border border-slate-200 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 active:scale-95" title="Reset Zoom">Reset View</button>
        <div className="h-5 w-px bg-slate-200 mx-1" />
        <button onClick={handleExpandAll} className="flex h-8 px-2.5 items-center justify-center rounded-md border border-slate-200 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 active:scale-95" title="Expand All Nodes">Expand All</button>
        <button onClick={handleCollapseAll} className="flex h-8 px-2.5 items-center justify-center rounded-md border border-slate-200 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 active:scale-95" title="Collapse All Nodes">Collapse All</button>
        <span className="px-2 text-xs font-medium text-slate-400">{(zoomLevel * 100).toFixed(0)}%</span>
      </div>
    </div>
  );
};

export default CollapsibleTreeChart;
