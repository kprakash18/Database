import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb.jsx";
import SearchBar from "../components/SearchBar.jsx";
import SidebarDetails from "../components/SidebarDetails.jsx";
import SunburstChart from "../components/SunburstChart.jsx";
import CollapsibleTreeChart from "../components/CollapsibleTreeChart.jsx";
import Tooltip from "../components/Tooltip.jsx";
import { getSunburstTaxonomyTree, searchSunburstTaxonomy } from "../api/visualizationApi.js";

const TaxonomyExplorerPage = () => {
  const [searchParams] = useSearchParams();
  const sampleId = searchParams.get("sampleId");

  const [tree, setTree] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [labelOrientation, setLabelOrientation] = useState("auto");
  const [breadcrumb, setBreadcrumb] = useState(["Life"]);
  const [focusPath, setFocusPath] = useState(["Life"]);
  const [highlightPath, setHighlightPath] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [matches, setMatches] = useState([]);
  const [searching, setSearching] = useState(false);
  const [viewMode, setViewMode] = useState("sunburst");

  useEffect(() => {
    const fetchTree = async () => {
      try {
        setLoading(true);
        const data = await getSunburstTaxonomyTree({ sampleId });
        setTree(data.tree);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Unable to load taxonomy tree.");
      } finally {
        setLoading(false);
      }
    };

    fetchTree();
  }, [sampleId]);

  const handleSearch = useCallback(
    async (query) => {
      if (!query) {
        setMatches([]);
        setHighlightPath([]);
        return;
      }

      try {
        setSearching(true);
        const data = await searchSunburstTaxonomy({ query, sampleId });
        setMatches(data.matches || []);
      } catch (err) {
        console.error(err);
        setMatches([]);
      } finally {
        setSearching(false);
      }
    },
    [sampleId]
  );

  const selectMatch = (match) => {
    setFocusPath(match.path);
    setHighlightPath(match.path);
    setBreadcrumb(match.path);
    setMatches([]);
  };

  const selectBreadcrumb = (index) => {
    const nextPath = breadcrumb.slice(0, index + 1);
    setFocusPath(nextPath);
    setHighlightPath([]);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <header className="border-b border-slate-300 bg-slate-200 px-5 py-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link to={sampleId ? `/samples/${sampleId}` : "/"} className="text-sm text-blue-700 underline">
              {sampleId ? "Back to sample" : "Back to samples"}
            </Link>
            <h1 className="mt-1 text-2xl font-semibold">Biological Taxonomy Explorer</h1>
            <p className="text-sm text-slate-600">
              Zoomable sunburst navigation for Domain to Species taxonomy.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-slate-600">
              {sampleId ? `Sample #${sampleId}` : "All samples"}
            </span>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              Text
              <select
                value={labelOrientation}
                onChange={(event) => setLabelOrientation(event.target.value)}
                className="h-10 border border-slate-300 bg-white px-2 text-sm text-slate-900 outline-none focus:border-blue-700"
              >
                <option value="auto">Auto</option>
                <option value="horizontal">Horizontal</option>
                <option value="radial">Radial</option>
                <option value="tangential">Tangential</option>
              </select>
            </label>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-5">
        <div className="mb-4 grid gap-4 lg:grid-cols-[1fr_320px]">
          <SearchBar
            loading={searching}
            matches={matches}
            onSearch={handleSearch}
            onSelectMatch={selectMatch}
          />
          <div className="border border-slate-300 bg-white px-3 py-2 text-sm text-slate-600">
            Click any arc to drill down. Search results auto-focus and highlight the matching taxon.
          </div>
        </div>

        <section className="overflow-hidden border border-slate-300 bg-white shadow-sm">
          <Breadcrumb path={breadcrumb} onSelect={selectBreadcrumb} />

          {/* Premium Visual Switcher Tabs */}
          {!loading && !error && tree && (
            <div className="flex border-b border-slate-200 bg-slate-50 px-4">
              <button
                onClick={() => setViewMode("sunburst")}
                className={`py-3 px-6 text-sm font-semibold transition-colors focus:outline-none ${
                  viewMode === "sunburst"
                    ? "text-blue-700 border-b-2 border-blue-700"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Sunburst Wheel
              </button>
              <button
                onClick={() => setViewMode("tree")}
                className={`py-3 px-6 text-sm font-semibold transition-colors focus:outline-none ${
                  viewMode === "tree"
                    ? "text-blue-700 border-b-2 border-blue-700"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Taxonomy Tree (Collapsible)
              </button>
            </div>
          )}

          {loading && <div className="p-8 text-sm text-slate-500">Loading taxonomy visualization...</div>}
          {error && <div className="p-8 text-sm text-red-600">{error}</div>}

          {!loading && !error && tree && (
            <div className="grid bg-white lg:grid-cols-[minmax(690px,1fr)_320px]">
              {viewMode === "sunburst" ? (
                <SunburstChart
                  data={tree}
                  focusPath={focusPath}
                  highlightPath={highlightPath}
                  labelOrientation={labelOrientation}
                  onBreadcrumbChange={setBreadcrumb}
                  onHover={setTooltip}
                  onSelectNode={setSelectedNode}
                />
              ) : (
                <CollapsibleTreeChart
                  data={tree}
                  highlightPath={highlightPath}
                  onHover={setTooltip}
                  onSelectNode={setSelectedNode}
                />
              )}
              <SidebarDetails node={selectedNode} />
            </div>
          )}
        </section>
      </main>

      <Tooltip tooltip={tooltip} />
    </div>
  );
};

export default TaxonomyExplorerPage;
