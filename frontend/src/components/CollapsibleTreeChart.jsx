import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const levelColors = [
  "#1d4ed8", // Domain - Blue
  "#0891b2", // Phylum - Cyan
  "#059669", // Class - Emerald
  "#ca8a04", // Order - Yellow/Gold
  "#dc2626", // Family - Red
  "#7c3aed", // Genus - Violet
  "#be123c", // Species - Rose
  "#4d7c0f", // Strain - Lime
];

const CollapsibleTreeChart = ({
  data,
  highlightPath = [],
  onSelectNode,
  onHover,
}) => {
  const svgRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const zoomBehaviorRef = useRef(null);
  const rootRef = useRef(null);
  const updateRef = useRef(null);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    const width = 900;
    const height = 650;
    const dx = 180; // horizontal spacing between levels
    const dy = 45;  // vertical spacing between adjacent nodes

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .attr("width", "100%")
      .attr("height", height)
      .style("font-family", "Inter, sans-serif")
      .style("user-select", "none");

    svg.selectAll("*").remove();

    // Create main grouping layer that will be zoomed and panned
    const gContainer = svg.append("g").attr("class", "zoom-container");
    const gLink = gContainer.append("g")
      .attr("fill", "none")
      .attr("stroke", "#cbd5e1")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2.0);

    const gNode = gContainer.append("g")
      .attr("cursor", "pointer")
      .attr("pointer-events", "all");

    // Setup Hierarchy
    const root = d3.hierarchy(data);

    // Initial state: collapse all nodes below depth 2 to keep layout neat initially
    root.descendants().forEach((d) => {
      if (d.depth >= 2) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        }
      }
    });

    // Helper: auto-expand parents to reveal the search highlighted path
    const expandHighlightPath = () => {
      if (highlightPath && highlightPath.length > 0) {
        let pathSet = new Set(highlightPath);
        root.descendants().forEach((d) => {
          if (pathSet.has(d.data.name)) {
            // Expand all parents of this node
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
    };

    // Apply first zoom & pan behavior
    const zoomBehavior = d3.zoom()
      .scaleExtent([0.15, 3])
      .on("zoom", (event) => {
        gContainer.attr("transform", event.transform);
        setZoomLevel(event.transform.k);
      });

    svg.call(zoomBehavior);
    zoomBehaviorRef.current = zoomBehavior;

    // Center tree initially: push right by 80px and vertically center
    svg.call(zoomBehavior.transform, d3.zoomIdentity.translate(80, height / 2).scale(0.85));

    // Link curvature builder
    const linkGenerator = d3.linkHorizontal()
      .x((d) => d.y)
      .y((d) => d.x);

    // Color helper
    const getNodeColor = (d) => {
      return levelColors[d.depth % levelColors.length];
    };

    // Render tree function
    function update(source) {
      // Re-run tree layout spacing calculations dynamically
      const treeLayout = d3.tree().nodeSize([dy, dx]);
      treeLayout(root);

      const nodes = root.descendants();
      const links = root.links();

      // Compute coordinate shift: make horizontal left-to-right (depth is horizontal, height vertical)
      nodes.forEach((d) => {
        d.y = d.depth * dx;
      });

      // ---- 1. LINKS ----
      const link = gLink.selectAll("path")
        .data(links, (d) => d.target.id || (d.target.id = Math.random().toString(36)));

      // Transition entering links
      const linkEnter = link.enter().append("path")
        .attr("d", () => {
          const o = { x: source.x0 ?? source.x, y: source.y0 ?? source.y };
          return linkGenerator({ source: o, target: o });
        });

      // Update existing and new links
      link.merge(linkEnter)
        .transition()
        .duration(650)
        .attr("d", linkGenerator)
        .attr("stroke", (d) => {
          // Highlight paths connecting highlighted elements
          const srcName = d.source.data.name;
          const tgtName = d.target.data.name;
          if (highlightPath.includes(srcName) && highlightPath.includes(tgtName)) {
            return "#10b981"; // Emerald highlighting path
          }
          return "#e2e8f0"; // slate-200 standard links
        })
        .attr("stroke-width", (d) => {
          const srcName = d.source.data.name;
          const tgtName = d.target.data.name;
          return (highlightPath.includes(srcName) && highlightPath.includes(tgtName)) ? 4 : 2;
        });

      // Remove links exiting
      link.exit()
        .transition()
        .duration(650)
        .attr("d", () => {
          const o = { x: source.x, y: source.y };
          return linkGenerator({ source: o, target: o });
        })
        .remove();

      // ---- 2. NODES ----
      const node = gNode.selectAll("g")
        .data(nodes, (d) => d.id || (d.id = Math.random().toString(36)));

      const nodeEnter = node.enter().append("g")
        .attr("transform", () => `translate(${source.y0 ?? source.y},${source.x0 ?? source.x})`)
        .on("click", (event, d) => {
          // Select clicked node
          if (onSelectNode) {
            onSelectNode(d.data);
          }

          // Expand / Collapse children
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
        .on("mouseout", () => {
          if (onHover) onHover(null);
        });

      // Glowing badge for node circles
      nodeEnter.append("circle")
        .attr("r", 6)
        .attr("fill", (d) => (d._children ? getNodeColor(d) : "#ffffff"))
        .attr("stroke", getNodeColor)
        .attr("stroke-width", 2.5)
        .style("filter", "drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.15))");

      // Label text
      nodeEnter.append("text")
        .attr("dy", "0.31em")
        .attr("x", (d) => (d._children || d.children ? -12 : 12))
        .attr("text-anchor", (d) => (d._children || d.children ? "end" : "start"))
        .text((d) => d.data.name)
        .attr("fill", "#0f172a")
        .style("font-size", "11px")
        .style("font-weight", (d) => (highlightPath.includes(d.data.name) ? "700" : "500"))
        .clone(true).lower()
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 3.5);

      // Transition merged nodes to target positions
      const nodeUpdate = node.merge(nodeEnter);

      nodeUpdate.transition()
        .duration(650)
        .attr("transform", (d) => `translate(${d.y},${d.x})`);

      nodeUpdate.select("circle")
        .attr("fill", (d) => (d._children ? getNodeColor(d) : "#ffffff"))
        .attr("stroke", (d) => highlightPath.includes(d.data.name) ? "#10b981" : getNodeColor(d))
        .attr("stroke-width", (d) => highlightPath.includes(d.data.name) ? 4.5 : 2.5)
        .attr("r", (d) => highlightPath.includes(d.data.name) ? 8 : 6);

      nodeUpdate.select("text")
        .attr("x", (d) => (d._children || d.children ? -12 : 12))
        .attr("text-anchor", (d) => (d._children || d.children ? "end" : "start"))
        .style("font-weight", (d) => (highlightPath.includes(d.data.name) ? "700" : "500"))
        .attr("fill", (d) => (highlightPath.includes(d.data.name) ? "#047857" : "#0f172a"));

      // Transition exiting nodes to source position
      node.exit().transition()
        .duration(650)
        .attr("transform", () => `translate(${source.y},${source.x})`)
        .remove();

      // Record coordinate positions for layout transitions
      nodes.forEach((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    // Trigger highlight path expansion
    expandHighlightPath();

    rootRef.current = root;
    updateRef.current = update;

    // Kick off tree render
    update(root);

  }, [data, highlightPath, onHover, onSelectNode]);

  // Zoom actions
  const handleZoom = (factor) => {
    if (!zoomBehaviorRef.current || !svgRef.current) return;
    const svg = d3.select(svgRef.current);
    if (factor === 0) {
      // Reset position
      svg.transition().duration(400)
        .call(zoomBehaviorRef.current.transform, d3.zoomIdentity.translate(80, 325).scale(0.85));
    } else {
      svg.transition().duration(250).call(zoomBehaviorRef.current.scaleBy, factor);
    }
  };

  const handleExpandAll = () => {
    if (!rootRef.current || !updateRef.current) return;

    const expandNode = (d) => {
      if (d._children) {
        d.children = d._children;
        d._children = null;
      }
      if (d.children) {
        d.children.forEach(expandNode);
      }
    };

    expandNode(rootRef.current);
    updateRef.current(rootRef.current);
  };

  const handleCollapseAll = () => {
    if (!rootRef.current || !updateRef.current) return;

    const collapseNode = (d) => {
      if (d.children) {
        d.children.forEach(collapseNode);
        d._children = d.children;
        d.children = null;
      }
    };

    collapseNode(rootRef.current);
    updateRef.current(rootRef.current);
  };

  return (
    <div className="relative w-full overflow-hidden bg-slate-50">
      <svg ref={svgRef} className="block w-full border-r border-slate-200" />
      
      {/* Premium Floating Zoom Panel */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-1.5 shadow-md">
        <button
          onClick={() => handleZoom(1.2)}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-700 transition hover:bg-slate-100 active:scale-95"
          title="Zoom In"
        >
          ＋
        </button>
        <button
          onClick={() => handleZoom(0.8)}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-700 transition hover:bg-slate-100 active:scale-95"
          title="Zoom Out"
        >
          －
        </button>
        <button
          onClick={() => handleZoom(0)}
          className="flex h-8 px-2.5 items-center justify-center rounded-md border border-slate-200 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 active:scale-95"
          title="Reset Zoom"
        >
          Reset View
        </button>

        {/* Control Divider */}
        <div className="h-5 w-px bg-slate-200 mx-1" />

        <button
          onClick={handleExpandAll}
          className="flex h-8 px-2.5 items-center justify-center rounded-md border border-slate-200 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 active:scale-95"
          title="Expand All Nodes"
        >
          Expand All
        </button>
        <button
          onClick={handleCollapseAll}
          className="flex h-8 px-2.5 items-center justify-center rounded-md border border-slate-200 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 active:scale-95"
          title="Collapse All Nodes"
        >
          Collapse All
        </button>

        <span className="px-2 text-xs font-medium text-slate-400">
          {(zoomLevel * 100).toFixed(0)}%
        </span>
      </div>
    </div>
  );
};

export default CollapsibleTreeChart;
