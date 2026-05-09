import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb.jsx";
import SearchBar from "../components/SearchBar.jsx";
import SidebarDetails from "../components/SidebarDetails.jsx";
import SunburstChart from "../components/SunburstChart.jsx";
import Tooltip from "../components/Tooltip.jsx";
import { getSunburstTaxonomyTree, searchSunburstTaxonomy } from "../api/visualizationApi.js";

const TaxonomyExplorerPage = () => {
  const [searchParams] = useSearchParams();
  const sampleId = searchParams.get("sampleId");

  const [tree, setTree] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [breadcrumb, setBreadcrumb] = useState(["Life"]);
  const [focusPath, setFocusPath] = useState(["Life"]);
  const [highlightPath, setHighlightPath] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [matches, setMatches] = useState([]);
  const [searching, setSearching] = useState(false);

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
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-100 text-slate-950 dark:bg-slate-900 dark:text-slate-100">
        <header className="border-b border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-950">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Link to={sampleId ? `/samples/${sampleId}` : "/"} className="text-sm text-teal-700 hover:underline dark:text-teal-300">
                {sampleId ? "Back to sample" : "Back to samples"}
              </Link>
              <h1 className="mt-1 text-2xl font-semibold">Biological Taxonomy Explorer</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Zoomable sunburst navigation for Domain to Species taxonomy.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {sampleId ? `Sample #${sampleId}` : "All samples"}
              </span>
              <button
                type="button"
                onClick={() => setDarkMode((value) => !value)}
                className="h-10 border border-slate-300 px-3 text-sm font-medium hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                {darkMode ? "Light mode" : "Dark mode"}
              </button>
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
            <div className="border border-slate-300 bg-white px-3 py-2 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
              Click any arc to drill down. Search results auto-focus and highlight the matching taxon.
            </div>
          </div>

          <section className="overflow-hidden border border-slate-300 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <Breadcrumb path={breadcrumb} onSelect={selectBreadcrumb} />

            {loading && <div className="p-8 text-sm text-slate-500">Loading taxonomy visualization...</div>}
            {error && <div className="p-8 text-sm text-red-600">{error}</div>}

            {!loading && !error && tree && (
              <div className="grid bg-slate-950 lg:grid-cols-[minmax(690px,1fr)_320px]">
                <SunburstChart
                  data={tree}
                  darkMode={darkMode}
                  focusPath={focusPath}
                  highlightPath={highlightPath}
                  onBreadcrumbChange={setBreadcrumb}
                  onHover={setTooltip}
                  onSelectNode={setSelectedNode}
                />
                <SidebarDetails node={selectedNode} />
              </div>
            )}
          </section>
        </main>

        <Tooltip tooltip={tooltip} />
      </div>
    </div>
  );
};

export default TaxonomyExplorerPage;
