import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";

const majorGroupColors = [
  "#0f766e",
  "#2563eb",
  "#be123c",
  "#7c3aed",
  "#ca8a04",
  "#059669",
  "#c2410c",
  "#0891b2",
  "#9333ea",
  "#4d7c0f",
];

const chartSize = 700;
const outerRadius = 314;
const visibleDepth = 5;
const transitionMs = 780;

const getNodePath = (node) => node.ancestors().reverse().map((item) => item.data.name);

const pathsEqual = (left = [], right = []) =>
  left.length === right.length && left.every((item, index) => item === right[index]);

const compactName = (value = "") => (value.length > 24 ? `${value.slice(0, 22)}...` : value);

const findByPath = (root, path = []) => {
  if (!path.length) return root;
  let current = root;

  for (const name of path.slice(1)) {
    current = current.children?.find((child) => child.data.name === name);
    if (!current) return null;
  }

  return current;
};

const SunburstChart = ({
  data,
  focusPath = ["Life"],
  highlightPath = [],
  darkMode,
  onBreadcrumbChange,
  onSelectNode,
  onHover,
}) => {
  const svgRef = useRef(null);
  const stateRef = useRef({});
  const highlightPathRef = useRef(highlightPath);

  const color = useMemo(() => {
    const scale = d3.scaleOrdinal(majorGroupColors);
    return (node) => {
      const major = node.ancestors().reverse()[2] || node.ancestors().reverse()[1] || node;
      const base = d3.color(scale(major.data.name));
      const depthShade = Math.min(node.depth * 0.08, 0.38);
      return darkMode ? base.brighter(depthShade * 4).formatHex() : base.darker(depthShade).formatHex();
    };
  }, [darkMode]);

  useEffect(() => {
    highlightPathRef.current = highlightPath;
  }, [highlightPath]);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    const root = d3
      .hierarchy(data)
      .sum((node) => node.value || 1)
      .sort((a, b) => b.value - a.value);

    d3.partition().size([2 * Math.PI, root.height + 1])(root);
    root.each((node) => {
      node.current = node;
      node.target = node;
    });

    stateRef.current.root = root;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg
      .attr("viewBox", [-chartSize / 2, -chartSize / 2, chartSize, chartSize])
      .attr("width", chartSize)
      .attr("height", chartSize)
      .attr("role", "img")
      .attr("aria-label", "Zoomable biological taxonomy sunburst chart");

    const arc = d3
      .arc()
      .startAngle((node) => node.x0)
      .endAngle((node) => node.x1)
      .padAngle((node) => Math.min((node.x1 - node.x0) / 2, 0.005))
      .padRadius(outerRadius)
      .innerRadius((node) => Math.max(42, node.y0 * (outerRadius / visibleDepth)))
      .outerRadius((node) =>
        Math.max(42, node.y1 * (outerRadius / visibleDepth) - 1.4)
      );

    const isVisible = (node) =>
      node.y1 <= visibleDepth &&
      node.y0 >= 0.72 &&
      node.x1 > node.x0 &&
      node.x1 - node.x0 > 0.0005;
    const labelVisible = (node) =>
      isVisible(node) &&
      (node.y1 - node.y0) * (node.x1 - node.x0) > 0.034 &&
      node.x1 - node.x0 > 0.018;
    const labelTransform = (node) => {
      const x = (((node.x0 + node.x1) / 2) * 180) / Math.PI;
      const y = ((node.y0 + node.y1) / 2) * (outerRadius / visibleDepth);
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    };

    const depthShade = (node) => {
      const shade = Math.min(node.depth * 0.08, 0.35);
      const base = d3.color(color(node));
      return darkMode ? base.brighter(shade * 3).formatHex() : base.darker(shade).formatHex();
    };

    const displayedNodes = root.descendants().slice(1);

    const path = svg
      .append("g")
      .selectAll("path")
      .data(displayedNodes)
      .join("path")
      .attr("display", (node) => (isVisible(node.current) ? null : "none"))
      .attr("fill", (node) => depthShade(node))
      .attr("pointer-events", (node) => (isVisible(node.current) ? "auto" : "none"))
      .attr("d", (node) => arc(node.current))
      .attr("stroke", darkMode ? "#0f172a" : "#ffffff")
      .attr("stroke-width", 0.8)
      .attr("shape-rendering", "geometricPrecision")
      .style("cursor", "pointer")
      .on("mouseenter", function (event, node) {
        d3.select(this)
          .attr("fill", d3.color(depthShade(node)).brighter(0.42).formatHex())
          .attr("stroke", "#ffffff")
          .attr("stroke-width", 1.8);
        onHover?.({
          ...node.data,
          x: event.clientX,
          y: event.clientY,
        });
      })
      .on("mousemove", (event, node) => {
        onHover?.({
          ...node.data,
          x: event.clientX,
          y: event.clientY,
        });
      })
      .on("mouseleave", function () {
        d3.select(this)
          .attr("fill", (node) => depthShade(node))
          .attr("stroke", (node) =>
            highlightPathRef.current.length && pathsEqual(getNodePath(node), highlightPathRef.current)
              ? "#facc15"
              : darkMode
                ? "#0f172a"
                : "#ffffff"
          )
          .attr("stroke-width", (node) =>
            highlightPathRef.current.length && pathsEqual(getNodePath(node), highlightPathRef.current)
              ? 2.6
              : 0.8
          );
        onHover?.(null);
      })
      .on("click", (event, node) => {
        event.stopPropagation();
        zoomTo(node);
      });

    const label = svg
      .append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .style("user-select", "none")
      .selectAll("text")
      .data(displayedNodes)
      .join("text")
      .attr("dy", "0.35em")
      .attr("display", (node) => (labelVisible(node.current) ? null : "none"))
      .attr("fill", darkMode ? "#f8fafc" : "#0f172a")
      .attr("transform", (node) => labelTransform(node.current))
      .style("font-size", "9.5px")
      .style("font-weight", 600)
      .style("paint-order", "stroke")
      .style("stroke", darkMode ? "#020617" : "#ffffff")
      .style("stroke-width", 2.6)
      .text((node) => node.data.name);

    const parent = svg
      .append("circle")
      .datum(root)
      .attr("r", 42)
      .attr("fill", darkMode ? "#020617" : "#f8fafc")
      .attr("stroke", darkMode ? "#1e293b" : "#cbd5e1")
      .attr("stroke-width", 1)
      .attr("pointer-events", "all")
      .on("click", (event, node) => zoomTo(node.parent || root));

    const centerLabel = svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("fill", darkMode ? "#f8fafc" : "#0f172a")
      .style("font-size", "13px")
      .style("font-weight", 700)
      .style("pointer-events", "none")
      .text("Life");

    function zoomTo(node) {
      parent.datum(node.parent || root);
      onSelectNode?.(node.data);
      onBreadcrumbChange?.(getNodePath(node));
      centerLabel.text(compactName(node.data.name));

      root.each((item) => {
        item.target = {
          x0: Math.max(0, Math.min(1, (item.x0 - node.x0) / (node.x1 - node.x0))) * 2 * Math.PI,
          x1: Math.max(0, Math.min(1, (item.x1 - node.x0) / (node.x1 - node.x0))) * 2 * Math.PI,
          y0: Math.max(0, item.y0 - node.depth),
          y1: Math.max(0, item.y1 - node.depth),
        };
      });

      const transition = svg.transition().duration(transitionMs).ease(d3.easeCubicInOut);

      path
        .attr("display", (item) =>
          isVisible(item.current) || isVisible(item.target) ? null : "none"
        )
        .transition(transition)
        .tween("data", (item) => {
          const interpolator = d3.interpolate(item.current, item.target);
          return (time) => {
            item.current = interpolator(time);
          };
        })
        .attrTween("d", (item) => () => arc(item.current))
        .attr("pointer-events", (item) => (isVisible(item.target) ? "auto" : "none"))
        .on("end", function (item) {
          d3.select(this).attr("display", isVisible(item.current) ? null : "none");
        });

      label
        .attr("display", (item) =>
          labelVisible(item.current) || labelVisible(item.target) ? null : "none"
        )
        .transition(transition)
        .attrTween("transform", (item) => () => labelTransform(item.current))
        .on("end", function (item) {
          d3.select(this).attr("display", labelVisible(item.current) ? null : "none");
        });
    }

    stateRef.current.zoomTo = zoomTo;
    onSelectNode?.(root.data);
    onBreadcrumbChange?.(["Life"]);
  }, [color, data, darkMode, onBreadcrumbChange, onHover, onSelectNode]);

  useEffect(() => {
    const { root, zoomTo } = stateRef.current;
    if (!root || !zoomTo) return;

    const focused = findByPath(root, focusPath);
    if (focused) zoomTo(focused);
  }, [focusPath]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const { root } = stateRef.current;
    if (!root) return;

    svg
      .selectAll("path")
      .attr("stroke", (node) =>
        highlightPath.length && pathsEqual(getNodePath(node), highlightPath)
          ? "#facc15"
          : darkMode
            ? "#0f172a"
            : "#ffffff"
      )
      .attr("stroke-width", (node) =>
        highlightPath.length && pathsEqual(getNodePath(node), highlightPath) ? 2.6 : 0.8
      );
  }, [highlightPath, darkMode]);

  return (
    <div className="flex items-center justify-center bg-slate-950 p-5">
      <div className="flex aspect-square w-[min(72vw,700px)] min-w-[650px] max-w-[750px] items-center justify-center border border-slate-800 bg-slate-950 shadow-2xl shadow-black/25 max-[900px]:min-w-0 max-[900px]:w-[min(92vw,680px)]">
        <svg ref={svgRef} className="h-full w-full" />
      </div>
    </div>
  );
};

export default SunburstChart;
