import { useEffect, useState, useCallback } from "react";
import EndpointNav from "../components/explorer/EndpointNav.jsx";
import { ENDPOINTS } from "../components/explorer/endpointsConfig.js";
import CodeSnippetGenerator from "../components/explorer/CodeSnippetGenerator.jsx";
import JsonViewer from "../components/explorer/JsonViewer.jsx";
import VisualizationRegistry from "../components/explorer/VisualizationRegistry.jsx";

const getEndpointDefaults = (endpoint) => {
  const defaults = {};
  (endpoint.params || []).forEach((p) => {
    defaults[p.name] = p.default ?? "";
  });
  return defaults;
};

const resolveFullApiUrl = (relativePath) => {
  const apiBase =
    import.meta.env.VITE_API_BASE_URL ||
    (typeof window !== "undefined" && (window.location.port === "5173" || window.location.port === "5174")
      ? "http://localhost:3000"
      : "");
  return `${apiBase}${relativePath}`;
};

const fetchApi = async (relativePath) => {
  const targetUrl = resolveFullApiUrl(relativePath);
  const res = await fetch(targetUrl, {
    headers: { Accept: "application/json" },
  });
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error(`API returned non-JSON (${res.status}): ${text.substring(0, 100)}`);
  }
  return await res.json();
};

const ApiExplorerPage = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState(ENDPOINTS[3]); // Default to Composition Chart
  const [paramValues, setParamValues] = useState(() => getEndpointDefaults(ENDPOINTS[3]));
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("visualization"); // "visualization" | "json" | "code"
  const [quickQuery, setQuickQuery] = useState("INDF001");

  // Select new endpoint and set parameter defaults
  const handleSelectEndpoint = (endpoint) => {
    setSelectedEndpoint(endpoint);
    setParamValues(getEndpointDefaults(endpoint));
    setResponseData(null);
  };

  // Construct request URL
  const buildRequestUrl = useCallback(() => {
    let path = selectedEndpoint.path;
    const queryParams = new URLSearchParams();

    (selectedEndpoint.params || []).forEach((p) => {
      const val = paramValues[p.name];
      if (val !== undefined && val !== "") {
        if (path.includes(`:${p.name}`)) {
          path = path.replace(`:${p.name}`, encodeURIComponent(val));
        } else {
          queryParams.append(p.name, val);
        }
      }
    });

    const queryString = queryParams.toString();
    return queryString ? `${path}?${queryString}` : path;
  }, [selectedEndpoint, paramValues]);

  const handleExecute = async () => {
    try {
      setLoading(true);
      const url = buildRequestUrl();
      const data = await fetchApi(url);
      setResponseData(data);
    } catch (err) {
      console.error("API Explorer Execution Error:", err);
      setResponseData({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial data when selected endpoint changes
  useEffect(() => {
    let isMounted = true;

    const fetchInitial = async () => {
      try {
        setLoading(true);
        let path = selectedEndpoint.path;
        const queryParams = new URLSearchParams();
        const initialDefaults = getEndpointDefaults(selectedEndpoint);

        (selectedEndpoint.params || []).forEach((p) => {
          const val = initialDefaults[p.name];
          if (val !== undefined && val !== "") {
            if (path.includes(`:${p.name}`)) {
              path = path.replace(`:${p.name}`, encodeURIComponent(val));
            } else {
              queryParams.append(p.name, val);
            }
          }
        });

        const queryString = queryParams.toString();
        const url = queryString ? `${path}?${queryString}` : path;

        const data = await fetchApi(url);
        if (isMounted) setResponseData(data);
      } catch (err) {
        if (isMounted) setResponseData({ error: err.message });
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchInitial();

    return () => {
      isMounted = false;
    };
  }, [selectedEndpoint]);

  const requestUrl = buildRequestUrl();
  const displayUrl = resolveFullApiUrl(requestUrl);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* NCBI Top Banner */}
      <div className="bg-[#14233c] text-white border-b border-slate-700 px-6 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 font-semibold">
            <span className="bg-blue-600 text-white px-2 py-0.5 rounded font-mono text-[10px] font-bold">NIH</span>
            <span>National Center for Biotechnology Information</span>
            <span className="text-slate-400">|</span>
            <span className="text-blue-200">Indian Food Microbiome Portal</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-300">
            <a href="/" className="hover:text-white transition">Database Home</a>
            <a href="/taxonomy" className="hover:text-white transition">Taxonomy Browser</a>
            <a href="/api/docs" target="_blank" rel="noreferrer" className="text-blue-300 font-bold hover:underline">Swagger Specs ↗</a>
          </div>
        </div>
      </div>

      {/* NCBI Entrez Search Bar Header */}
      <header className="border-b border-slate-300 bg-white px-6 py-4 shadow-xs sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-900 font-mono font-extrabold text-white text-base shadow-sm">
              NCBI
            </div>
            <div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-semibold">
                <span>NCBI Home</span> &gt; <span>BioProject</span> &gt; <span className="text-slate-900 font-bold">API Explorer Sandbox</span>
              </div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight mt-0.5">
                Indian Food Microbiome API Explorer & Sandbox
              </h1>
            </div>
          </div>

          {/* NCBI Entrez Quick Search Bar */}
          <div className="flex items-center rounded-md border border-slate-300 bg-slate-50 p-1 text-xs shadow-inner">
            <span className="px-2.5 font-bold text-slate-600 uppercase text-[10px]">Database:</span>
            <select className="bg-white border border-slate-300 rounded px-2 py-1 text-slate-800 font-semibold outline-none text-xs">
              <option>Microbiome API</option>
              <option>Taxonomy Lineages</option>
              <option>16S Composition</option>
            </select>
            <input
              value={quickQuery}
              onChange={(e) => setQuickQuery(e.target.value)}
              placeholder="Search Accession (e.g. INDF001)"
              className="bg-white border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-800 ml-1.5 outline-none font-mono"
            />
            <button
              onClick={() => {
                if (selectedEndpoint.params?.[0]) {
                  setParamValues({ ...paramValues, [selectedEndpoint.params[0].name]: quickQuery });
                  handleExecute();
                }
              }}
              className="ml-1.5 rounded bg-blue-700 hover:bg-blue-800 px-3 py-1 font-bold text-white transition text-xs shadow-xs"
            >
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col lg:flex-row gap-6">
        {/* Endpoint Sidebar */}
        <EndpointNav
          selectedEndpoint={selectedEndpoint}
          onSelectEndpoint={handleSelectEndpoint}
        />

        {/* Execution & Display Workspace */}
        <section className="flex-1 space-y-5">
          {/* NCBI Entrez Query Builder Card */}
          <div className="rounded-lg border border-slate-300 bg-white p-5 space-y-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-extrabold px-2.5 py-1 rounded bg-blue-900 text-white">
                  {selectedEndpoint.method}
                </span>
                <span className="font-mono text-sm font-bold text-blue-950">
                  {selectedEndpoint.path}
                </span>
                <span className="text-[10px] font-mono font-semibold text-slate-500 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded">
                  NCBI BioProject
                </span>
              </div>

              <button
                onClick={handleExecute}
                disabled={loading}
                className="rounded-md bg-blue-700 hover:bg-blue-800 px-5 py-2 text-xs font-bold text-white shadow-sm transition disabled:opacity-50 flex items-center gap-2"
              >
                {loading && <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent"></span>}
                <span>{loading ? "Fetching Entrez Data..." : "Run Query (Entrez Direct ⚡)"}</span>
              </button>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              {selectedEndpoint.description}
            </p>

            {/* Parameter Input Controls */}
            {selectedEndpoint.params && selectedEndpoint.params.length > 0 && (
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  NCBI Entrez Search Builder Parameters
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  {selectedEndpoint.params.map((p) => (
                    <div key={p.name} className="space-y-1 rounded border border-slate-200 bg-slate-50 p-2.5">
                      <label className="block text-slate-800 font-bold">
                        {p.name}{" "}
                        <span className="text-[10px] text-blue-800 font-mono font-semibold">[{p.type.toUpperCase()}]</span>
                      </label>
                      {p.type === "select" ? (
                        <select
                          value={paramValues[p.name] ?? p.default}
                          onChange={(e) =>
                            setParamValues({ ...paramValues, [p.name]: e.target.value })
                          }
                          className="w-full rounded border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 font-semibold outline-none focus:border-blue-600 shadow-xs"
                        >
                          {p.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt.toUpperCase()}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={p.type === "number" ? "number" : "text"}
                          value={paramValues[p.name] ?? ""}
                          onChange={(e) =>
                            setParamValues({ ...paramValues, [p.name]: e.target.value })
                          }
                          placeholder={p.description}
                          className="w-full rounded border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-mono text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 shadow-xs"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Formatted Request URL Bar */}
            <div className="rounded bg-slate-900 border border-slate-800 p-2.5 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 truncate">NCBI URL: <span className="text-blue-300 font-bold">{displayUrl}</span></span>
            </div>
          </div>

          {/* Synchronized Workspace Output Tabs */}
          <div className="space-y-4">
            <div className="flex border-b border-slate-300 bg-white rounded-t-lg px-2 text-xs font-bold text-slate-700 shadow-xs">
              {[
                ["visualization", "📊 NCBI Visual Analytics"],
                ["json", "🔍 Entrez JSON Payload"],
                ["code", "💻 Bioinformatic Code Snippets"],
              ].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-4 py-3 transition border-b-2 ${
                    activeTab === key
                      ? "border-blue-600 text-blue-900 font-extrabold bg-blue-50/60"
                      : "border-transparent text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Tab Workspace 1: Live Interactive Visualization */}
            {activeTab === "visualization" && (
              <VisualizationRegistry responseData={responseData} />
            )}

            {/* Tab Workspace 2: Raw JSON Response */}
            {activeTab === "json" && (
              <JsonViewer data={responseData} />
            )}

            {/* Tab Workspace 3: Code Snippets */}
            {activeTab === "code" && (
              <CodeSnippetGenerator
                method={selectedEndpoint.method}
                url={displayUrl}
                entrezCommand={selectedEndpoint.entrezCommand}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ApiExplorerPage;
