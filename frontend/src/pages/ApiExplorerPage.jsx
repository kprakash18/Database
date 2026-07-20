import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
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
  const isProd = import.meta.env.MODE === "production";
  const defaultBaseUrl = isProd ? "https://database-jvw0.onrender.com" : "http://localhost:3000";
  const apiBase = import.meta.env.VITE_API_BASE_URL || defaultBaseUrl;
  return `${apiBase}${relativePath}`;
};

const fetchApi = async (relativePath) => {
  const targetUrl = resolveFullApiUrl(relativePath);
  const res = await fetch(targetUrl, { headers: { Accept: "application/json" } });
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error(`Non-JSON response (${res.status}): ${text.substring(0, 120)}`);
  }
  return await res.json();
};

const EXPLORER_TABS = [
  { key: "table", label: "Table View" },
  { key: "visualization", label: "Visualization" },
  { key: "json", label: "JSON" },
  { key: "metadata", label: "Metadata" },
  { key: "downloads", label: "Downloads" },
];

const ApiExplorerPage = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState(ENDPOINTS[0]);
  const [paramValues, setParamValues] = useState(() => getEndpointDefaults(ENDPOINTS[0]));
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("table");
  const [latency, setLatency] = useState(0);
  const [payloadSize, setPayloadSize] = useState(0);
  const [favorites, setFavorites] = useState(["get-samples", "visualization-sunburst"]);
  const [recentRequests, setRecentRequests] = useState([
    { name: "List Metagenome Records", url: "/api/samples?page=1&limit=10" },
    { name: "Dominant Taxa Summary", url: "/api/composition/summary/INDF001" },
  ]);

  // Table configurations
  const [tableSearch, setTableSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "value", direction: "descending" });

  // Sidebar interaction handlers
  const handleSelectEndpoint = (endpoint) => {
    setSelectedEndpoint(endpoint);
    setParamValues(getEndpointDefaults(endpoint));
    setResponseData(null);
  };

  const handleToggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectRecent = (req) => {
    // Find matching endpoint template by path pattern matching
    const match = ENDPOINTS.find((ep) => {
      const basePattern = ep.path.split("/")[2];
      return req.url.includes(basePattern);
    });
    if (match) {
      setSelectedEndpoint(match);
      setResponseData(null);
    }
  };

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
    const qs = queryParams.toString();
    return qs ? `${path}?${qs}` : path;
  }, [selectedEndpoint, paramValues]);

  const handleExecute = async () => {
    const startTime = performance.now();
    setLoading(true);
    try {
      const url = buildRequestUrl();
      const data = await fetchApi(url);
      const endTime = performance.now();

      // Record request metrics
      setLatency(Math.round(endTime - startTime));
      const size = new Blob([JSON.stringify(data)]).size;
      setPayloadSize(size);

      // Add to recents
      setRecentRequests((prev) => {
        const item = { name: selectedEndpoint.name, url };
        const filtered = prev.filter((r) => r.url !== url);
        return [item, ...filtered].slice(0, 5);
      });

      setResponseData(data);
    } catch (err) {
      console.error(err);
      setResponseData({ error: err.message });
      setLatency(0);
      setPayloadSize(0);
    } finally {
      setLoading(false);
    }
  };

  // Run automatically on mount or endpoint template switch
  useEffect(() => {
    let isMounted = true;
    const fetchInitial = async () => {
      const startTime = performance.now();
      setLoading(true);
      try {
        let path = selectedEndpoint.path;
        const queryParams = new URLSearchParams();
        const defaults = getEndpointDefaults(selectedEndpoint);
        (selectedEndpoint.params || []).forEach((p) => {
          const val = defaults[p.name];
          if (val !== undefined && val !== "") {
            if (path.includes(`:${p.name}`)) {
              path = path.replace(`:${p.name}`, encodeURIComponent(val));
            } else {
              queryParams.append(p.name, val);
            }
          }
        });
        const qs = queryParams.toString();
        const url = qs ? `${path}?${qs}` : path;
        const data = await fetchApi(url);
        const endTime = performance.now();

        if (isMounted) {
          setLatency(Math.round(endTime - startTime));
          setPayloadSize(new Blob([JSON.stringify(data)]).size);
          setResponseData(data);
        }
      } catch (err) {
        if (isMounted) {
          setResponseData({ error: err.message });
          setLatency(0);
          setPayloadSize(0);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchInitial();
    return () => {
      isMounted = false;
    };
  }, [selectedEndpoint]);

  const requestUrl = buildRequestUrl();
  const displayUrl = resolveFullApiUrl(requestUrl);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(displayUrl);
  };

  const handleCopyCurl = () => {
    const curlCmd = `curl -X GET "${displayUrl}" \\\n  -H "Accept: application/json"`;
    navigator.clipboard.writeText(curlCmd);
  };

  const handleDownloadSpec = () => {
    const specUrl = resolveFullApiUrl("/api/docs.json");
    const a = document.createElement("a");
    a.href = specUrl;
    a.download = "openapi_specification.json";
    a.target = "_blank";
    a.click();
  };

  // Reset form values to default templates
  const handleReset = () => {
    setParamValues(getEndpointDefaults(selectedEndpoint));
  };

  // Retrieve flattened records list from nesting response formats
  const getFlatDataList = () => {
    if (!responseData) return [];
    const raw = responseData.data || responseData.matches || responseData;
    if (Array.isArray(raw)) return raw;
    if (typeof raw === "object") {
      // Composition chart or nested structures
      if (Array.isArray(raw.values)) {
        return raw.values.map((v, i) => ({
          label: raw.labels?.[i] || `Taxon ${i + 1}`,
          value: v,
          reads: raw.reads?.[i] || 0,
        }));
      }
      return [raw];
    }
    return [];
  };

  // Sort and filter helper
  const tableData = getFlatDataList()
    .filter((row) => {
      const text = Object.values(row).join(" ").toLowerCase();
      return text.includes(tableSearch.toLowerCase());
    })
    .sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];
      if (valA === undefined || valB === undefined) return 0;
      if (typeof valA === "number") {
        return sortConfig.direction === "ascending" ? valA - valB : valB - valA;
      }
      return sortConfig.direction === "ascending"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Export action
  const exportDataset = (type) => {
    const list = getFlatDataList();
    if (list.length === 0) return;
    const jsonStr = JSON.stringify(list, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dataset.${type}`;
    a.click();
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "var(--page-bg)",
      fontFamily: "var(--sans)",
      color: "var(--ink)",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* ── Dashboard Header ── */}
      <header style={{
        backgroundColor: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        {/* Left branding */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "24px", height: "24px",
            borderRadius: "50%",
            backgroundColor: "var(--accent)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#ffffff", fontWeight: 800, fontSize: "12px",
          }}>
            I
          </div>
          <span style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "-0.01em" }}>
            Indian Food Microbiome Database
          </span>
          <span style={{
            fontSize: "10px", fontWeight: 700,
            color: "var(--accent)", backgroundColor: "var(--accent-muted)",
            border: "1px solid var(--accent-border)",
            borderRadius: "var(--radius-sm)", padding: "1px 6px",
            letterSpacing: "0.05em", textTransform: "uppercase",
          }}>
            Explorer
          </span>
        </div>

        {/* Global Search Bar */}
        <div style={{ position: "relative", width: "320px" }}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
            style={{
              position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)",
              width: "13px", height: "13px", color: "var(--ink-faint)", pointerEvents: "none",
            }}
          >
            <circle cx="6.5" cy="6.5" r="5" />
            <path d="M10 10l3.5 3.5" strokeLinecap="round" />
          </svg>
          <input
            placeholder="Search by Sample, Taxonomy, Accession..."
            style={{
              width: "100%",
              padding: "6px 12px 6px 32px",
              fontSize: "12px",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              backgroundColor: "var(--page-bg)",
              outline: "none",
            }}
          />
        </div>

        {/* Header Action menu */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link to="/" style={{
            fontSize: "13px", fontWeight: 500, color: "var(--ink-muted)", textDecoration: "none",
            transition: "color 100ms ease",
          }}
            onMouseEnter={e => e.target.style.color = "var(--ink)"}
            onMouseLeave={e => e.target.style.color = "var(--ink-muted)"}
          >
            Database
          </Link>
          <a href="/api/docs" target="_blank" rel="noreferrer" style={{
            fontSize: "13px", fontWeight: 500, color: "var(--accent)", textDecoration: "none",
            transition: "color 120ms ease",
          }}
            onMouseEnter={e => e.target.style.color = "var(--accent-hover)"}
            onMouseLeave={e => e.target.style.color = "var(--accent)"}
          >
            API Docs ↗
          </a>
          <button
            onClick={handleDownloadSpec}
            style={{
              background: "none", border: "1px solid var(--border)",
              borderRadius: "var(--radius)", padding: "4px 10px",
              fontSize: "12px", color: "var(--ink-muted)", cursor: "pointer",
            }}
          >
            Download
          </button>
          <a href="https://github.com" target="_blank" rel="noreferrer" style={{
            color: "var(--ink-muted)", textDecoration: "none", fontSize: "14px",
          }}>
            GitHub
          </a>
        </div>
      </header>

      {/* ── Main Workspace Body ── */}
      <div style={{
        display: "flex",
        flex: 1,
        maxWidth: "1440px",
        margin: "0 auto",
        width: "100%",
        padding: "20px",
        gap: "24px",
      }}>
        {/* Left Sidebar navigation */}
        <EndpointNav
          selectedEndpoint={selectedEndpoint}
          onSelectEndpoint={handleSelectEndpoint}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          recentRequests={recentRequests}
          onSelectRecent={handleSelectRecent}
        />

        {/* Core panel workspace area */}
        <main style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px", minWidth: 0 }}>
          
          {/* Section 1 — Endpoint Info Header card */}
          <div style={{
            backgroundColor: "var(--surface)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border)",
            padding: "20px",
            boxShadow: "var(--shadow-card)",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{
                  fontSize: "11px", fontWeight: 700,
                  backgroundColor: "var(--ink)", color: "var(--surface)",
                  borderRadius: "var(--radius-sm)", padding: "3px 8px",
                  fontFamily: "var(--mono)",
                }}>
                  {selectedEndpoint.method}
                </span>
                <code style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary)", fontFamily: "var(--mono)" }}>
                  {selectedEndpoint.path}
                </code>
              </div>

              {/* Action shortcuts */}
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={handleCopyUrl} style={{
                  padding: "6px 12px", border: "1px solid var(--border)",
                  borderRadius: "var(--radius)", background: "none",
                  fontSize: "12px", cursor: "pointer",
                }}>
                  🔗 Copy URL
                </button>
                <button onClick={handleCopyCurl} style={{
                  padding: "6px 12px", border: "1px solid var(--border)",
                  borderRadius: "var(--radius)", background: "none",
                  fontSize: "12px", cursor: "pointer",
                }}>
                  📋 Copy cURL
                </button>
              </div>
            </div>
            <p style={{
              fontSize: "13px", color: "var(--ink-muted)",
              marginTop: "12px", lineHeight: 1.6,
            }}>
              {selectedEndpoint.description}
            </p>
          </div>

          {/* Grid panel: Parameters + Code Snippet side-by-side */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "24px" }}>
            
            {/* Section 2 — Parameters Card */}
            <div style={{
              backgroundColor: "var(--surface)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border)",
              padding: "20px",
              boxShadow: "var(--shadow-card)",
              display: "flex", flexDirection: "column", justifyBetween: "space-between",
            }}>
              <div>
                <h3 style={{ fontSize: "14px", fontWeight: 700, margin: "0 0 14px 0" }}>Query Parameters</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {selectedEndpoint.params && selectedEndpoint.params.length > 0 ? (
                    selectedEndpoint.params.map((p) => (
                      <div key={p.name}>
                        <label style={{
                          display: "block", fontSize: "11px", fontWeight: 600,
                          color: "var(--ink-muted)", marginBottom: "4px",
                        }}>
                          {p.name.toUpperCase()} ({p.type})
                        </label>
                        {p.type === "select" ? (
                          <select
                            value={paramValues[p.name] ?? p.default}
                            onChange={(e) => setParamValues({ ...paramValues, [p.name]: e.target.value })}
                            style={{
                              width: "100%", padding: "7px 10px",
                              fontSize: "13px", borderRadius: "var(--radius)",
                              border: "1px solid var(--border)", outline: "none",
                            }}
                          >
                            {p.options.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={p.type === "number" ? "number" : "text"}
                            value={paramValues[p.name] ?? ""}
                            onChange={(e) => setParamValues({ ...paramValues, [p.name]: e.target.value })}
                            placeholder={p.description}
                            style={{
                              width: "100%", padding: "7px 10px",
                              fontSize: "13px", borderRadius: "var(--radius)",
                              border: "1px solid var(--border)", outline: "none",
                              fontFamily: "var(--mono)",
                            }}
                          />
                        )}
                      </div>
                    ))
                  ) : (
                    <span style={{ fontSize: "12px", color: "var(--ink-faint)" }}>No query parameters required.</span>
                  )}
                </div>
              </div>

              {/* Form buttons */}
              <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
                <button
                  onClick={handleExecute}
                  disabled={loading}
                  style={{
                    flex: 1, backgroundColor: "var(--accent)", color: "#ffffff",
                    border: "none", borderRadius: "var(--radius)",
                    padding: "8px 16px", fontSize: "13px", fontWeight: 600,
                    cursor: "pointer", transition: "background-color 100ms",
                  }}
                >
                  {loading ? "Executing..." : "Execute Request"}
                </button>
                <button
                  onClick={handleReset}
                  style={{
                    backgroundColor: "transparent", border: "1px solid var(--border)",
                    color: "var(--ink-muted)", borderRadius: "var(--radius)",
                    padding: "8px 16px", fontSize: "13px", fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Section 3 — Auto Code Snippets Panel */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <CodeSnippetGenerator method={selectedEndpoint.method} url={requestUrl} />
            </div>
          </div>

          {/* Section 4 — Response Overview Summary Cards */}
          {responseData && !responseData.error && (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "16px",
            }}>
              {[
                { label: "HTTP Status", value: "200 OK", color: "#059669" },
                { label: "Latency", value: `${latency} ms`, color: "var(--ink)" },
                { label: "Payload Size", value: `${(payloadSize / 1024).toFixed(2)} KB`, color: "var(--ink)" },
                { label: "Returned Records", value: getFlatDataList().length, color: "var(--ink)" },
              ].map((card, i) => (
                <div key={i} style={{
                  backgroundColor: "var(--surface)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border)",
                  padding: "14px",
                  boxShadow: "var(--shadow-card)",
                }}>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    {card.label}
                  </span>
                  <div style={{ fontSize: "18px", fontWeight: 700, marginTop: "4px", color: card.color }}>
                    {card.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Section 5 — Output/Explorer Tabs Card */}
          <div style={{
            backgroundColor: "var(--surface)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-card)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}>
            {/* Tabs Header bar */}
            <div style={{
              display: "flex", borderBottom: "1px solid var(--border)",
              backgroundColor: "var(--surface-raised)",
            }}>
              {EXPLORER_TABS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  style={{
                    padding: "12px 20px",
                    fontSize: "13px",
                    fontWeight: activeTab === key ? 600 : 500,
                    color: activeTab === key ? "var(--accent)" : "var(--ink-muted)",
                    background: "none",
                    border: "none",
                    borderBottom: activeTab === key ? "2px solid var(--accent)" : "2px solid transparent",
                    cursor: "pointer",
                    marginBottom: "-1px",
                    transition: "all 120ms ease",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Tab content screens */}
            <div style={{ padding: "20px" }}>
              {loading ? (
                /* Dynamic Skeleton load */
                <div style={{ padding: "40px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ height: "16px", width: "40%", backgroundColor: "var(--border-faint)", borderRadius: "var(--radius-sm)", animation: "shimmer 1.4s infinite" }} />
                  <div style={{ height: "12px", width: "80%", backgroundColor: "var(--border-faint)", borderRadius: "var(--radius-sm)", animation: "shimmer 1.4s infinite" }} />
                  <div style={{ height: "12px", width: "60%", backgroundColor: "var(--border-faint)", borderRadius: "var(--radius-sm)", animation: "shimmer 1.4s infinite" }} />
                </div>
              ) : responseData?.error ? (
                /* Error card */
                <div style={{
                  border: "1px solid #fca5a5", backgroundColor: "#fef2f2",
                  borderRadius: "var(--radius)", padding: "16px", color: "#b91c1c",
                }}>
                  <h4 style={{ fontWeight: 700, margin: "0 0 6px 0" }}>API Request Failure</h4>
                  <p style={{ fontSize: "13px", margin: 0 }}>{responseData.error}</p>
                </div>
              ) : !responseData ? (
                /* Empty query state */
                <div style={{ textAlign: "center", padding: "60px 20px" }}>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink-muted)", margin: 0 }}>
                    Execute a template request query to view live bioinformatic visualizations.
                  </p>
                </div>
              ) : (
                /* Main active tab panels */
                <>
                  {activeTab === "table" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {/* Grid toolbar */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                        <input
                          placeholder="Filter records..."
                          value={tableSearch}
                          onChange={(e) => setTableSearch(e.target.value)}
                          style={{
                            padding: "6px 12px", fontSize: "12px",
                            border: "1px solid var(--border)", borderRadius: "var(--radius)",
                            width: "220px", outline: "none",
                          }}
                        />
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button onClick={() => exportDataset("json")} style={{
                            padding: "4px 10px", fontSize: "12px",
                            border: "1px solid var(--border)", borderRadius: "var(--radius)",
                            background: "none", cursor: "pointer",
                          }}>
                            Export JSON
                          </button>
                        </div>
                      </div>

                      {/* Responsive tabular data */}
                      <div style={{ overflowX: "auto", border: "1px solid var(--border)", borderRadius: "var(--radius)" }}>
                        {(() => {
                          const getDynamicColumns = (dataRows) => {
                            if (!Array.isArray(dataRows) || dataRows.length === 0) return [];
                            const keySet = new Set();
                            dataRows.forEach(row => {
                              Object.keys(row).forEach(key => {
                                if (typeof row[key] !== "object" && row[key] !== null) {
                                  keySet.add(key);
                                }
                              });
                            });
                            return Array.from(keySet);
                          };

                          const formatColumnHeader = (key) => {
                            return key
                              .split("_")
                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(" ");
                          };

                          const excludedKeys = ["comp_id", "created_at", "updated_at", "parent_id"];
                          const dynamicCols = getDynamicColumns(tableData).filter(c => !excludedKeys.includes(c));

                          if (dynamicCols.length === 0) {
                            return (
                              <div style={{ padding: "32px", textAlign: "center", color: "var(--ink-faint)" }}>
                                No displayable fields returned from this query.
                              </div>
                            );
                          }

                          const getColAlignment = (colName, sampleVal) => {
                            const colLower = colName.toLowerCase();
                            if (colLower.includes("id")) return "left";
                            if (colLower.includes("abundance") || colLower.includes("value") || colLower.includes("reads") || colLower.includes("count")) {
                              return "right";
                            }
                            return typeof sampleVal === "number" ? "right" : "left";
                          };

                          return (
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                              <thead style={{ backgroundColor: "var(--surface-raised)", borderBottom: "1px solid var(--border)" }}>
                                <tr>
                                  {dynamicCols.map((col) => (
                                    <th
                                      key={col}
                                      onClick={() => requestSort(col)}
                                      style={{
                                        padding: "10px 16px",
                                        textAlign: getColAlignment(col, tableData[0]?.[col]),
                                        cursor: "pointer",
                                        fontWeight: 600,
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {formatColumnHeader(col)} {sortConfig.key === col ? (sortConfig.direction === "ascending" ? " ▲" : " ▼") : ""}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {tableData.map((row, idx) => (
                                  <tr key={idx} style={{ borderBottom: idx < tableData.length - 1 ? "1px solid var(--border-faint)" : "none" }}>
                                    {dynamicCols.map((col) => {
                                      const val = row[col];
                                      return (
                                        <td
                                          key={col}
                                          style={{
                                            padding: "10px 16px",
                                            textAlign: getColAlignment(col, val),
                                            fontFamily: typeof val === "number" || col.includes("code") || col.includes("id") ? "var(--mono)" : "var(--sans)",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            maxWidth: "280px",
                                          }}
                                        >
                                          {typeof val === "number"
                                            ? col.includes("abundance") || col.includes("value")
                                              ? `${parseFloat(val).toFixed(2)}%`
                                              : col.toLowerCase().includes("id")
                                                ? String(val)
                                                : val.toLocaleString()
                                            : String(val ?? "—")}
                                        </td>
                                      );
                                    })}
                                  </tr>
                                ))}
                                {tableData.length === 0 && (
                                  <tr>
                                    <td colSpan={dynamicCols.length || 1} style={{ padding: "32px", textAlign: "center", color: "var(--ink-faint)" }}>
                                      No records match the active filters.
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          );
                        })()}
                      </div>
                    </div>
                  )}

                  {activeTab === "visualization" && (
                    <VisualizationRegistry responseData={responseData} />
                  )}

                  {activeTab === "json" && (
                    <JsonViewer data={responseData} />
                  )}

                  {activeTab === "metadata" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px" }}>
                      <div>
                        <strong>Endpoint Name:</strong> {selectedEndpoint.name}
                      </div>
                      <div>
                        <strong>NCBI Entrez Query Equivalent:</strong>
                        <code style={{ display: "block", backgroundColor: "var(--surface-raised)", padding: "8px", borderRadius: "var(--radius)", marginTop: "4px" }}>
                          {selectedEndpoint.entrezCommand}
                        </code>
                      </div>
                      <div>
                        <strong>HTTP Method:</strong> {selectedEndpoint.method}
                      </div>
                      <div>
                        <strong>Content-Type:</strong> application/json
                      </div>
                    </div>
                  )}

                  {activeTab === "downloads" && (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button onClick={() => exportDataset("json")} style={{
                        padding: "8px 16px", backgroundColor: "var(--accent)", color: "#ffffff",
                        border: "none", borderRadius: "var(--radius)", fontSize: "13px", cursor: "pointer",
                      }}>
                        Download Dataset JSON
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* ── Bottom Information Panel status strip ── */}
      <footer style={{
        backgroundColor: "var(--surface)",
        borderTop: "1px solid var(--border)",
        padding: "10px 20px",
        fontSize: "12px",
        color: "var(--ink-muted)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div style={{ display: "flex", gap: "16px" }}>
          <span><strong>Host:</strong> Localhost</span>
          <span><strong>Status:</strong> {responseData?.error ? "500 Error" : responseData ? "200 OK" : "Idle"}</span>
        </div>
        <div>
          <span><strong>API Version:</strong> v1.0</span>
        </div>
      </footer>
    </div>
  );
};

export default ApiExplorerPage;
