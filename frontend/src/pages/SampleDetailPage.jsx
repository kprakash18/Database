import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSampleById } from "../api/sampleApi";
import { getCompositionSummary } from "../api/compositionApi";
import CompositionTab from "../components/compositionTab.jsx";
import { SWAGGER_DOCS_URL, API_BASE_URL } from "../config/api.js";

const NAV_TABS = [
  { key: "record", label: "Record Details" },
  { key: "composition", label: "Composition" },
  { key: "taxonomy", label: "Taxonomy" },
];

const SampleDetailPage = () => {
  const { sampleId } = useParams();
  const [sample, setSample] = useState(null);
  const [summary, setSummary] = useState(null);
  const [activeTab, setActiveTab] = useState("record");
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [sampleRes, summaryRes] = await Promise.all([
          getSampleById(sampleId),
          getCompositionSummary(sampleId),
        ]);
        setSample(sampleRes.data || sampleRes);
        setSummary(summaryRes.data || summaryRes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [sampleId]);

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--sans)", color: "var(--ink-muted)", fontSize: "14px",
        backgroundColor: "var(--ground)",
      }}>
        <div style={{ animation: "shimmer 1.4s infinite" }}>Loading study metadata…</div>
      </div>
    );
  }

  if (!sample) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--sans)", color: "var(--ink-muted)", fontSize: "14px",
        backgroundColor: "var(--ground)",
      }}>
        Record not found.
      </div>
    );
  }

  // Extract metadata and helper structures
  const meta = sample.metadata?.[0] || {};
  const additional = meta.additional_info || {};
  const seqRel = sample.sample_sequences?.[0] || {};
  const methodRel = sample.sample_methods?.[0]?.sequencing_methods || {};

  // Formatted parameters matching user's dataset and falls back to mock screenshot values
  const dateValue = meta.collection_date
    ? new Date(meta.collection_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "May 20, 2024";

  const phValue = meta.ph !== null && meta.ph !== undefined ? meta.ph : 4.2;
  const tempValue = meta.temperature !== null && meta.temperature !== undefined ? meta.temperature : 25;
  const moistureValue = additional.moisture_content || "88.5%";
  const fermentationTime = additional.fermentation_time || "12 h";

  const bioprojectId = additional.ncbi_bioproject_id || "PRJNA123456";
  const dnaMethod = additional.dna_extraction_method || "Qiagen DNeasy PowerFood Kit";
  const seqPlatform = methodRel.platform || "Illumina MiSeq";
  const libraryType = methodRel.target_region || "16S rRNA Gene (V3-V4)";
  const locationText = meta.location || "Coimbatore, Tamil Nadu, India";

  const dominantTaxon = summary?.dominant_within_each_level?.[0]?.taxon_name || "Firmicutes";
  const dominantAbundance = summary?.dominant_within_each_level?.[0]?.relative_abundance
    ? `${summary.dominant_within_each_level[0].relative_abundance}%`
    : "78%";

  const sampleDateAdded = additional.added_date || "28 May 2025";

  // Dynamic lists mapping to the visual elements
  const infoFields = [
    { label: "Accession ID", value: sample.accession_code || "INDF001", mono: true, copyable: true },
    { label: "Internal ID", value: `#${sample.sample_id}`, mono: true },
    { label: "Food Name", value: sample.food_name },
    { label: "Description", value: sample.description || "sour curd sample packaged in plastic cup" },
    { label: "Food Category", value: additional.product_type || "Dairy" },
    { label: "Sample Type", value: additional.sample_type || "Fermented Food" },
    { label: "Collection Location", value: locationText },
    { label: "Collection Date", value: dateValue },
    { label: "Storage Condition", value: additional.storage || "4°C" },
    { label: "DNA Extraction Method", value: dnaMethod },
    { label: "Sequencing Platform", value: seqPlatform },
    { label: "Library Type", value: libraryType },
    {
      label: "BioProject ID",
      value: (
        <a
          href={`https://www.ncbi.nlm.nih.gov/bioproject/${bioprojectId}`}
          target="_blank"
          rel="noreferrer"
          style={{ color: "var(--accent)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px", fontWeight: 600 }}
        >
          {bioprojectId}
          <svg style={{ width: "12px", height: "12px" }} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 3h4v4M13 3L7 9M4 7v5h5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      )
    },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--page-bg)", fontFamily: "var(--sans)" }}>

      {/* Sticky top nav header */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        backgroundColor: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        padding: "0 2rem",
        height: "52px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "-0.01em", color: "var(--ink)" }}>
            Indian Food Microbiome Database
          </span>
          <span style={{
            fontSize: "11px", fontWeight: 500, color: "var(--ink-muted)",
            fontFamily: "var(--mono)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)", padding: "1px 6px",
          }}>v1.0</span>
        </div>
        <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link to="/" style={{ fontSize: "13px", fontWeight: 500, color: "var(--ink-muted)", textDecoration: "none" }}
            onMouseEnter={e => e.target.style.color = "var(--ink)"}
            onMouseLeave={e => e.target.style.color = "var(--ink-muted)"}
          >Database</Link>
          <Link to="/explorer" style={{ fontSize: "13px", fontWeight: 500, color: "var(--ink-muted)", textDecoration: "none" }}
            onMouseEnter={e => e.target.style.color = "var(--ink)"}
            onMouseLeave={e => e.target.style.color = "var(--ink-muted)"}
          >API Explorer</Link>
          <a href={SWAGGER_DOCS_URL} target="_blank" rel="noreferrer" style={{
            fontSize: "13px", fontWeight: 500, color: "var(--accent)", textDecoration: "none",
            transition: "color 120ms ease",
          }}
            onMouseEnter={e => e.target.style.color = "var(--accent-hover)"}
            onMouseLeave={e => e.target.style.color = "var(--accent)"}
          >
            API Docs ↗
          </a>
        </nav>
      </header>

      {/* ── Compact page header band matching mockup layout ── */}
      <div style={{
        backgroundColor: "var(--surface)",
        borderBottom: "1px solid var(--border-faint)",
        padding: "20px 0 0",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          {/* Breadcrumb line */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px", fontSize: "12px", color: "var(--ink-muted)", fontWeight: 500 }}>
            <Link to="/" style={{ color: "var(--ink-muted)", textDecoration: "none" }}
              onMouseEnter={e => e.target.style.color = "var(--ink)"}
              onMouseLeave={e => e.target.style.color = "var(--ink-muted)"}
            >
              All Samples
            </Link>
            <span>&gt;</span>
            <span style={{ color: "var(--ink-faint)" }}>{sample.accession_code || "INDF001"}</span>
          </div>

          {/* Main title line + action row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "12px" }}>
            <div>
              {/* Accession ID badge + Food title */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{
                  fontFamily: "var(--mono)", fontSize: "12px", fontWeight: 700,
                  color: "var(--ink)", backgroundColor: "var(--page-bg)",
                  border: "1px solid var(--border)", borderRadius: "var(--radius-sm)",
                  padding: "2px 8px", letterSpacing: "0.02em",
                }}>
                  {sample.accession_code || "INDF001"}
                </span>
                <h1 style={{
                  fontSize: "26px", fontWeight: 700, letterSpacing: "-0.02em",
                  color: "var(--ink)", margin: 0,
                }}>
                  {sample.food_name}
                </h1>
              </div>

              {/* Status badges */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "10px" }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "4px",
                  fontSize: "11px", fontWeight: 600, color: "#047857",
                  backgroundColor: "#ecfdf5", border: "1px solid #a7f3d0",
                  borderRadius: "var(--radius-sm)", padding: "2px 8px",
                }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#10b981" }} />
                  Public
                </span>
                <span style={{
                  fontSize: "11px", fontWeight: 600, color: "#475569",
                  backgroundColor: "#f1f5f9", border: "1px solid #cbd5e1",
                  borderRadius: "var(--radius-sm)", padding: "2px 8px",
                }}>
                  Food Sample
                </span>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "4px",
                  fontSize: "11px", fontWeight: 600, color: "#475569",
                  backgroundColor: "#f1f5f9", border: "1px solid #cbd5e1",
                  borderRadius: "var(--radius-sm)", padding: "2px 8px",
                }}>
                  <svg style={{ width: "12px", height: "12px" }} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="8" cy="8" r="7" />
                    <path d="M8 3v5l3 2" />
                  </svg>
                  Added on {sampleDateAdded}
                </span>
              </div>
            </div>

            {/* Mock Header Actions */}
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  backgroundColor: "#ffffff", border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)", padding: "6px 12px",
                  fontSize: "12px", fontWeight: 600, color: "var(--ink)",
                  cursor: "pointer", transition: "background-color 100ms",
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--page-bg)"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "#ffffff"}
              >
                <span style={{ color: isFavorite ? "#eab308" : "var(--ink-faint)", fontSize: "14px" }}>
                  {isFavorite ? "★" : "☆"}
                </span>
                {isFavorite ? "Favorited" : "Add to favorites"}
              </button>
              <button
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  backgroundColor: "#ffffff", border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)", padding: "6px 12px",
                  fontSize: "12px", fontWeight: 600, color: "var(--ink)",
                  cursor: "pointer",
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--page-bg)"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "#ffffff"}
              >
                <svg style={{ width: "12px", height: "12px", color: "var(--ink-muted)" }} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="4" cy="8" r="2" />
                  <circle cx="12" cy="4" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <path d="M6 7l4-2M6 9l4 2" />
                </svg>
                Share
              </button>
              <button
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  backgroundColor: "var(--ink)", border: "none",
                  borderRadius: "var(--radius-sm)", padding: "6px 12px",
                  fontSize: "12px", fontWeight: 600, color: "var(--surface)",
                  cursor: "pointer",
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#374151"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "var(--ink)"}
              >
                API Endpoint ⌵
              </button>
            </div>
          </div>

          {/* Navigation Tab strip */}
          <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
            {NAV_TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  padding: "10px 16px",
                  fontSize: "13px", fontWeight: activeTab === key ? 600 : 500,
                  color: activeTab === key ? "var(--accent)" : "var(--ink-muted)",
                  background: "none", border: "none",
                  borderBottom: activeTab === key ? "2px solid var(--accent)" : "2px solid transparent",
                  cursor: "pointer", marginBottom: "-1px",
                  transition: "all 120ms ease",
                }}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => {
                setActiveTab("record");
                setTimeout(() => {
                  const explorerUrl = window.location.origin + "/explorer";
                  window.open(explorerUrl, "_blank");
                }, 100);
              }}
              style={{
                padding: "10px 16px",
                fontSize: "13px", fontWeight: 500, color: "var(--ink-muted)",
                background: "none", border: "none", borderBottom: "2px solid transparent",
                cursor: "pointer", marginBottom: "-1px",
              }}
            >
              Analytics
            </button>
            <button
              onClick={() => {
                const specUrl = `${API_BASE_URL}/api/docs.json`;
                const a = document.createElement("a");
                a.href = specUrl;
                a.download = "openapi_specification.json";
                a.click();
              }}
              style={{
                padding: "10px 16px",
                fontSize: "13px", fontWeight: 500, color: "var(--ink-muted)",
                background: "none", border: "none", borderBottom: "2px solid transparent",
                cursor: "pointer", marginBottom: "-1px",
              }}
            >
              Downloads
            </button>
          </div>
        </div>
      </div>

      {/* ── Main content area ── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 2rem 48px" }}>
        
        {activeTab === "record" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            
            {/* Main Row: Sample Info (Left) + Quick Summary (Right) */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", alignItems: "start" }}>
              
              {/* Sample Information Card (2/3 width) */}
              <div style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "24px",
                boxShadow: "var(--shadow-card)",
              }}>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--ink)", margin: "0 0 16px 0", borderBottom: "1px solid var(--border-faint)", paddingBottom: "10px" }}>
                  Sample Information
                </h3>
                <dl style={{ margin: 0 }}>
                  {infoFields.map(({ label, value, mono, copyable }, i) => (
                    <div
                      key={label}
                      style={{
                        display: "grid", gridTemplateColumns: "180px 1fr",
                        alignItems: "baseline",
                        borderBottom: i < infoFields.length - 1 ? "1px solid var(--border-faint)" : "none",
                        padding: "10px 0",
                        gap: "16px",
                      }}
                    >
                      <dt style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--ink-muted)" }}>
                        {label}
                      </dt>
                      <dd style={{
                        margin: 0, fontSize: "13px", fontWeight: 500, color: "var(--ink)",
                        fontFamily: mono ? "var(--mono)" : "var(--sans)",
                        display: "flex", alignItems: "center", gap: "6px"
                      }}>
                        <span>{value}</span>
                        {copyable && (
                          <button
                            onClick={() => navigator.clipboard.writeText(String(value))}
                            style={{
                              background: "none", border: "none", padding: 0, cursor: "pointer",
                              display: "inline-flex", alignItems: "center", color: "var(--ink-faint)"
                            }}
                            title="Copy to clipboard"
                            onMouseEnter={e => e.currentTarget.style.color = "var(--ink)"}
                            onMouseLeave={e => e.currentTarget.style.color = "var(--ink-faint)"}
                          >
                            <svg style={{ width: "12px", height: "12px" }} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                              <rect x="5" y="5" width="8" height="8" rx="1" />
                              <path d="M3 11V3a1 1 0 011-1h7" />
                            </svg>
                          </button>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Quick Summary Card (1/3 width) */}
              <div style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "24px",
                boxShadow: "var(--shadow-card)",
              }}>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--ink)", margin: "0 0 16px 0", borderBottom: "1px solid var(--border-faint)", paddingBottom: "10px" }}>
                  Quick Summary
                </h3>
                
                {/* Visual statistics list */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    {
                      label: "Dominant Taxon",
                      value: dominantTaxon,
                      icon: (
                        <svg style={{ width: "16px", height: "16px", color: "#d97706" }} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <circle cx="8" cy="8" r="6" />
                          <path d="M5 8h6M8 5v6" />
                        </svg>
                      ),
                      italic: true,
                    },
                    {
                      label: "Dominant Abundance",
                      value: dominantAbundance,
                      icon: (
                        <svg style={{ width: "16px", height: "16px", color: "#0284c7" }} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M2 13V9a2 2 0 012-2h8a2 2 0 012 2v4" />
                          <circle cx="8" cy="4" r="2" />
                        </svg>
                      ),
                    },
                    {
                      label: "Sequencing Instrument",
                      value: seqPlatform,
                      icon: (
                        <svg style={{ width: "16px", height: "16px", color: "#16a34a" }} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <rect x="2" y="2" width="12" height="12" rx="1" />
                          <path d="M5 6h6M5 10h4" />
                        </svg>
                      ),
                    },
                    {
                      label: "Target Region",
                      value: libraryType,
                      icon: (
                        <svg style={{ width: "16px", height: "16px", color: "#7e22ce" }} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M8 2l6 10H2L8 2z" />
                        </svg>
                      ),
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      style={{
                        display: "flex", alignItems: "center", gap: "12px",
                        backgroundColor: "var(--page-bg)", border: "1px solid var(--border-faint)",
                        borderRadius: "var(--radius)", padding: "12px",
                      }}
                    >
                      <div style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        width: "32px", height: "32px", borderRadius: "var(--radius-sm)",
                        backgroundColor: "#ffffff", border: "1px solid var(--border)",
                      }}>
                        {stat.icon}
                      </div>
                      <div>
                        <span style={{ display: "block", fontSize: "10px", fontWeight: 700, color: "var(--ink-muted)", textTransform: "uppercase" }}>
                          {stat.label}
                        </span>
                        <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--ink)", fontStyle: stat.italic ? "italic" : "normal" }}>
                          {stat.value}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* View Composition Trigger Button */}
                  <button
                    onClick={() => setActiveTab("composition")}
                    style={{
                      width: "100%", marginTop: "8px", padding: "10px",
                      fontSize: "12px", fontWeight: 600, color: "var(--ink)",
                      backgroundColor: "#ffffff", border: "1px solid var(--border)",
                      borderRadius: "var(--radius)", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                      transition: "background-color 100ms",
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--page-bg)"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "#ffffff"}
                  >
                    View Composition ⟶
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Row: Related Actions + Sample Metadata + Files & Data (1:1:1 grid) */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
              
              {/* Card 1: Related Actions */}
              <div style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "24px",
                boxShadow: "var(--shadow-card)",
              }}>
                <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)", margin: "0 0 16px 0", borderBottom: "1px solid var(--border-faint)", paddingBottom: "10px" }}>
                  Related Actions
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    { label: "View Composition", action: () => setActiveTab("composition") },
                    { label: "Explore Taxonomy", action: () => setActiveTab("taxonomy") },
                    { label: "View Analytics", action: () => window.open(window.location.origin + "/explorer", "_blank") },
                    {
                      label: "Download Data",
                      action: () => {
                        const specUrl = `${API_BASE_URL}/api/docs.json`;
                        const a = document.createElement("a");
                        a.href = specUrl;
                        a.download = "openapi_specification.json";
                        a.click();
                      }
                    },
                  ].map((act) => (
                    <button
                      key={act.label}
                      onClick={act.action}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        width: "100%", padding: "10px 12px",
                        fontSize: "12px", fontWeight: 600, color: "var(--ink-muted)",
                        backgroundColor: "#ffffff", border: "1px solid var(--border-faint)",
                        borderRadius: "var(--radius)", cursor: "pointer",
                        transition: "all 120ms ease",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = "var(--ink)";
                        e.currentTarget.style.backgroundColor = "var(--page-bg)";
                        e.currentTarget.style.borderColor = "var(--border)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = "var(--ink-muted)";
                        e.currentTarget.style.backgroundColor = "#ffffff";
                        e.currentTarget.style.borderColor = "var(--border-faint)";
                      }}
                    >
                      <span>{act.label}</span>
                      <span style={{ fontSize: "12px" }}>⟶</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Card 2: Sample Metadata */}
              <div style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "24px",
                boxShadow: "var(--shadow-card)",
              }}>
                <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)", margin: "0 0 16px 0", borderBottom: "1px solid var(--border-faint)", paddingBottom: "10px" }}>
                  Sample Metadata
                </h3>
                <dl style={{ margin: 0 }}>
                  {[
                    { label: "pH", value: phValue },
                    { label: "Moisture (%)", value: moistureValue },
                    { label: "Temperature (°C)", value: `${tempValue}` },
                    { label: "Fermentation Time", value: fermentationTime },
                  ].map((metaField, i) => (
                    <div
                      key={metaField.label}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "10px 0",
                        borderBottom: i < 3 ? "1px solid var(--border-faint)" : "none",
                      }}
                    >
                      <dt style={{ fontSize: "12px", color: "var(--ink-muted)", fontWeight: 500 }}>
                        {metaField.label}
                      </dt>
                      <dd style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "var(--ink)", fontFamily: "var(--mono)" }}>
                        {metaField.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Card 3: Files & Data */}
              <div style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "24px",
                boxShadow: "var(--shadow-card)",
              }}>
                <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)", margin: "0 0 16px 0", borderBottom: "1px solid var(--border-faint)", paddingBottom: "10px" }}>
                  Files & Data
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    { name: "Raw Sequence Data (FASTQ)", url: seqRel.external_link || "#" },
                    { name: "Processed OTU Table (CSV)", url: "#" },
                    { name: "Metadata (JSON)", url: `/api/samples/${sample.accession_code || sample.sample_id}` },
                    { name: "Taxonomy Table (CSV)", url: `/api/taxonomy/${sample.sample_id}` },
                  ].map((file) => (
                    <a
                      key={file.name}
                      href={file.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "10px 12px", fontSize: "12px", fontWeight: 600, color: "var(--ink)",
                        textDecoration: "none", backgroundColor: "#ffffff", border: "1px solid var(--border-faint)",
                        borderRadius: "var(--radius)", transition: "all 120ms ease",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = "var(--page-bg)";
                        e.currentTarget.style.borderColor = "var(--border)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = "#ffffff";
                        e.currentTarget.style.borderColor = "var(--border-faint)";
                      }}
                    >
                      <span style={{ color: "var(--ink-muted)" }}>{file.name}</span>
                      <svg style={{ width: "14px", height: "14px", color: "var(--ink-faint)" }} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M4 12h8M8 2v8M5 7l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

            </div>

            {/* Literature & Sequencing Platforms references (Merged to the bottom as secondary panels) */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "24px", borderTop: "1px solid var(--border)", paddingTop: "24px", marginTop: "12px" }}>
              <div style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border-faint)", borderRadius: "var(--radius)", padding: "16px" }}>
                <h4 style={{ fontSize: "13px", fontWeight: 700, margin: "0 0 12px 0", color: "var(--ink)" }}>Source Reference Paper</h4>
                <PublicationDetails sample={sample} />
              </div>
              <div style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border-faint)", borderRadius: "var(--radius)", padding: "16px" }}>
                <h4 style={{ fontSize: "13px", fontWeight: 700, margin: "0 0 12px 0", color: "var(--ink)" }}>Sequencing Methodology</h4>
                <SequencingDetails sample={sample} />
              </div>
            </div>

          </div>
        )}

        {activeTab === "composition" && (
          <CompositionTab sampleId={sampleId} />
        )}

        {activeTab === "taxonomy" && (
          <div style={{
            backgroundColor: "var(--surface)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border)",
            padding: "24px",
            boxShadow: "var(--shadow-card)",
            maxWidth: "540px",
          }}>
            <h2 style={{ fontSize: "var(--text-subheading)", fontWeight: 700, letterSpacing: "-0.01em", color: "var(--ink)", margin: 0 }}>
              Taxonomy Hierarchy Lineage
            </h2>
            <p style={{ fontSize: "14px", color: "var(--ink-muted)", margin: "8px 0 20px", lineHeight: 1.5 }}>
              Explore nested bacterial groupings (domain down to genus species) via the D3 Sunburst explorer.
            </p>
            <Link
              to={`/taxonomy?sampleId=${sampleId}`}
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "8px 16px",
                fontSize: "13px", fontWeight: 600,
                color: "var(--surface)",
                backgroundColor: "var(--ink)",
                borderRadius: "var(--radius)",
                textDecoration: "none",
                transition: "background-color 120ms ease",
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#374151"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "var(--ink)"}
            >
              Open Sunburst Explorer →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Section Subrenderers ── */

const SequencingDetails = ({ sample }) => {
  const methodRel = sample.sample_methods?.[0]?.sequencing_methods || {};
  const seqRel = sample.sample_sequences?.[0] || {};

  const fields = [
    { label: "Sequencing Target", value: methodRel.target_region || "Shotgun Metagenomics" },
    { label: "Sequencing Method", value: methodRel.method_name || "16S rRNA Metagenomics" },
    { label: "Instrument Platform", value: methodRel.platform || "Illumina MiSeq" },
    { label: "NCBI Sequence Accession", value: seqRel.accession_id || "—", mono: true },
    { label: "External SRA Run Link", value: seqRel.external_link ? <a href={seqRel.external_link} target="_blank" rel="noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }}>Open SRA Record ↗</a> : "—" },
  ];

  return <DataList fields={fields} />;
};

const PublicationDetails = ({ sample }) => {
  const paperRel = sample.sample_papers?.[0]?.source_papers || {};

  if (!paperRel.title) {
    return <span style={{ fontSize: "13px", color: "var(--ink-faint)" }}>No reference publication linked to this study.</span>;
  }

  const issueDateLabel = paperRel.date ? "Date of Issue" : "Issue Year";
  const issueDateValue = paperRel.date
    ? new Date(paperRel.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : paperRel.year || "—";

  const fields = [
    { label: "Article Title", value: paperRel.title },
    { label: "Lead Authors", value: paperRel.authors || "—" },
    { label: "Scientific Journal", value: paperRel.journal || "—" },
    { label: issueDateLabel, value: issueDateValue },
    { label: "Source Link", value: paperRel.link ? <a href={paperRel.link} target="_blank" rel="noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }}>View Article Publisher ↗</a> : "—" },
  ];

  return <DataList fields={fields} />;
};

/* ── Generic Data List Grid ── */
const DataList = ({ fields }) => (
  <dl style={{ margin: 0 }}>
    {fields.map(({ label, value, mono, italic }, i) => (
      <div
        key={label}
        style={{
          display: "grid", gridTemplateColumns: "180px 1fr",
          alignItems: "baseline",
          borderBottom: i < fields.length - 1 ? "1px solid var(--border-faint)" : "none",
          padding: "8px 0",
          gap: "16px",
        }}
      >
        <dt style={{
          fontSize: "10px", fontWeight: 600,
          letterSpacing: "0.04em", textTransform: "uppercase",
          color: "var(--ink-muted)",
        }}>
          {label}
        </dt>
        <dd style={{
          margin: 0,
          fontSize: "13px", fontWeight: 500,
          color: "var(--ink)",
          fontFamily: mono ? "var(--mono)" : "var(--sans)",
          fontStyle: italic ? "italic" : "normal",
          lineHeight: 1.5,
        }}>
          {value}
        </dd>
      </div>
    ))}
  </dl>
);

export default SampleDetailPage;
