import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";

const levelColors = [
  "#1d4ed8",
  "#0891b2",
  "#059669",
  "#ca8a04",
  "#dc2626",
  "#7c3aed",
  "#be123c",
  "#4d7c0f",
];

const chartSize = 700;
const outerRadius = 314;
const visibleDepth = 5;
const transitionMs = 780;
const labelOrientationOptions = new Set(["auto", "horizontal", "radial", "tangential"]);

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
  labelOrientation = "auto",
  onBreadcrumbChange,
  onSelectNode,
  onHover,
}) => {
  const svgRef = useRef(null);
  const stateRef = useRef({});
  const highlightPathRef = useRef(highlightPath);

  const color = useMemo(() => {
    return (node) => {
      const base = d3.color(levelColors[Math.max(0, node.depth - 1) % levelColors.length]);
      const siblingIndex = node.parent?.children?.indexOf(node) ?? 0;
      const shade = (siblingIndex % 4) * 0.14;
      return siblingIndex % 2 === 0
        ? base.brighter(shade).formatHex()
        : base.darker(shade).formatHex();
    };
  }, []);

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
    const getLabelOrientation = (node) => {
      if (labelOrientationOptions.has(labelOrientation) && labelOrientation !== "auto") {
        return labelOrientation;
      }

      return node.x1 - node.x0 > 0.13 ? "tangential" : "radial";
    };

    const labelTransform = (node) => {
      const angle = (node.x0 + node.x1) / 2;
      const angleDegrees = (angle * 180) / Math.PI;
      const radius = ((node.y0 + node.y1) / 2) * (outerRadius / visibleDepth);
      const x = Math.cos(angle - Math.PI / 2) * radius;
      const y = Math.sin(angle - Math.PI / 2) * radius;
      const orientation = getLabelOrientation(node);

      if (orientation === "horizontal") {
        return `translate(${x},${y})`;
      }

      if (orientation === "tangential") {
        const rotation = angleDegrees < 180 ? angleDegrees : angleDegrees + 180;
        return `translate(${x},${y}) rotate(${rotation})`;
      }

      return `translate(${x},${y}) rotate(${angleDegrees - 90}) rotate(${angleDegrees < 180 ? 0 : 180})`;
    };

    const depthShade = (node) => {
      const base = d3.color(color(node));
      return base.darker(Math.min(node.depth * 0.035, 0.22)).formatHex();
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
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 1)
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
      .attr("fill", "#102a43")
      .attr("transform", (node) => labelTransform(node.current))
      .style("font-size", "9.5px")
      .style("font-weight", 600)
      .style("paint-order", "stroke")
      .style("stroke", "#ffffff")
      .style("stroke-width", 2.6)
      .text((node) => node.data.name);

    const parent = svg
      .append("circle")
      .datum(root)
      .attr("r", 42)
      .attr("fill", "#ffffff")
      .attr("stroke", "#cbd5e1")
      .attr("stroke-width", 1)
      .attr("pointer-events", "all")
      .on("click", (event, node) => zoomTo(node.parent || root));

    const centerLabel = svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("fill", "#102a43")
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
  }, [color, data, labelOrientation, onBreadcrumbChange, onHover, onSelectNode]);

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
          : "#ffffff"
      )
      .attr("stroke-width", (node) =>
        highlightPath.length && pathsEqual(getNodePath(node), highlightPath) ? 2.6 : 0.8
      );
  }, [highlightPath]);

  return (
    <div className="flex items-center justify-center bg-white p-5">
      <div className="flex aspect-square w-[min(72vw,700px)] min-w-[650px] max-w-[750px] items-center justify-center border border-slate-300 bg-white shadow-xl shadow-slate-300/40 max-[900px]:min-w-0 max-[900px]:w-[min(92vw,680px)]">
        <svg ref={svgRef} className="h-full w-full" />
      </div>
    </div>
  );
};

export default SunburstChart;
