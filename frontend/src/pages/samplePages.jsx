import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSamples } from "../api/sampleApi";
import SampleTable from "../components/sampleTable.jsx";
import { SWAGGER_DOCS_URL } from "../config/api.js";

/* ─────────────────────────────────────────────
   Skeleton loader — matches table structure exactly
   so the layout doesn't shift on data load.
───────────────────────────────────────────── */
const Bone = ({ width, height = "12px" }) => (
  <div style={{
    width, height,
    backgroundColor: "var(--border-faint)",
    borderRadius: "var(--radius-sm)",
    animation: "shimmer 1.4s ease-in-out infinite",
  }} />
);

const LoadingSkeleton = () => (
  <div style={{
    backgroundColor: "var(--surface)",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--border)",
    boxShadow: "var(--shadow-card)",
    overflow: "hidden",
    fontFamily: "var(--sans)",
  }}>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {["Sample ID", "Food Sample", "Location", "Description", ""].map((col) => (
            <th key={col} style={{
              padding: "9px 20px",
              fontSize: "var(--text-label)", fontWeight: 600,
              letterSpacing: "0.06em", textTransform: "uppercase",
              color: "var(--ink-muted)", textAlign: "left",
              borderBottom: "1px solid var(--border)",
              backgroundColor: "var(--surface-raised)",
              whiteSpace: "nowrap",
            }}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 8 }).map((_, i) => (
          <tr key={i} style={{
            borderBottom: i < 7 ? "1px solid var(--border-faint)" : "none",
          }}>
            <td style={{ padding: "13px 20px" }}><Bone width="76px" /></td>
            <td style={{ padding: "13px 20px" }}><Bone width="128px" /></td>
            <td style={{ padding: "13px 20px" }}><Bone width="90px" /></td>
            <td style={{ padding: "13px 20px" }}><Bone width={i % 2 === 0 ? "220px" : "180px"} /></td>
            <td style={{ padding: "13px 20px" }} />
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ─────────────────────────────────────────────
   Main page
───────────────────────────────────────────── */
const SamplesPage = () => {
  const [samples, setSamples] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSamples = async () => {
      try {
        setLoading(true);
        const res = await getSamples(page, limit);
        if (res && res.data && Array.isArray(res.data)) {
          setSamples(res.data);
          setTotal(res.total || res.data.length);
          setTotalPages(res.totalPages || Math.ceil((res.total || res.data.length) / limit));
        } else if (Array.isArray(res)) {
          setSamples(res);
          setTotal(res.length);
          setTotalPages(Math.ceil(res.length / limit));
        } else {
          setSamples([]);
          setTotal(0);
          setTotalPages(1);
        }
      } catch (err) {
        console.error("Error fetching samples:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSamples();
  }, [page, limit]);

  const filteredSamples = samples.filter((sample) => {
    const text = `${sample.accession_code || ""} ${sample.sample_id} ${sample.food_name} ${sample.description}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  const displayTotal = search ? filteredSamples.length : total;
  const displayPages = search ? Math.ceil(filteredSamples.length / limit) || 1 : totalPages;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--page-bg)", fontFamily: "var(--sans)" }}>

      {/* ── Sticky top nav ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        backgroundColor: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        padding: "0 2rem",
        height: "52px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <span style={{
            fontSize: "var(--text-caption)", fontWeight: 700,
            letterSpacing: "-0.01em", color: "var(--ink)",
          }}>
            Indian Food Microbiome Database
          </span>
          <span style={{
            fontSize: "var(--text-label)", fontWeight: 500,
            color: "var(--ink-muted)", fontFamily: "var(--mono)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)", padding: "1px 6px",
          }}>
            v1.0
          </span>
        </div>

        <nav style={{ display: "flex", alignItems: "center", gap: "var(--space-6)" }}>
          <Link to="/explorer" style={{
            fontSize: "var(--text-caption)", fontWeight: 500,
            color: "var(--ink-muted)", textDecoration: "none",
            transition: "color 120ms ease",
          }}
            onMouseEnter={e => e.target.style.color = "var(--ink)"}
            onMouseLeave={e => e.target.style.color = "var(--ink-muted)"}
          >
            API Explorer
          </Link>
          <Link to="/taxonomy" style={{
            fontSize: "var(--text-caption)", fontWeight: 500,
            color: "var(--ink-muted)", textDecoration: "none",
            transition: "color 120ms ease",
          }}
            onMouseEnter={e => e.target.style.color = "var(--ink)"}
            onMouseLeave={e => e.target.style.color = "var(--ink-muted)"}
          >
            Taxonomy Tree
          </Link>
          <a href={SWAGGER_DOCS_URL} target="_blank" rel="noreferrer" style={{
            fontSize: "var(--text-caption)", fontWeight: 500,
            color: "var(--accent)", textDecoration: "none",
            transition: "color 120ms ease",
          }}
            onMouseEnter={e => e.target.style.color = "var(--accent-hover)"}
            onMouseLeave={e => e.target.style.color = "var(--accent)"}
          >
            API Docs ↗
          </a>
        </nav>
      </header>

      {/* ── Page header band ──────────────────────────────────
          White surface, border-faint bottom.
          Sits between the sticky nav and the page body —
          creates the surface hierarchy:
          surface (nav) → surface (page header) → page-bg (content).
          The faint border is enough to signal the transition
          without adding visual weight.
      ──────────────────────────────────────────────────────── */}
      <div style={{
        backgroundColor: "var(--surface)",
        borderBottom: "1px solid var(--border-faint)",
      }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          padding: "var(--space-8) 2rem var(--space-6)",
        }}>
          <h1 style={{
            fontSize: "var(--text-title)", fontWeight: 700,
            letterSpacing: "-0.02em", lineHeight: 1.25,
            color: "var(--ink)", margin: 0,
          }}>
            Food Metagenome Records
          </h1>
          <p style={{
            marginTop: "var(--space-1)",
            fontSize: "var(--text-caption)", fontWeight: 400,
            color: "var(--ink-muted)", margin: "var(--space-1) 0 0",
          }}>
            Metagenomic sample registry · Indian Food Microbiome Database
          </p>
        </div>
      </div>

      {/* ── Content area — on page-bg ── */}
      <main style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "var(--space-6) 2rem var(--space-16)",
      }}>

        {/* Toolbar: search + record count */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "var(--space-4)", marginBottom: "var(--space-4)",
        }}>

          {/* Search */}
          <div style={{ position: "relative", maxWidth: "360px", width: "100%" }}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
              style={{
                position: "absolute", left: "10px", top: "50%",
                transform: "translateY(-50%)",
                width: "13px", height: "13px",
                color: "var(--ink-faint)", pointerEvents: "none", flexShrink: 0,
              }}
            >
              <circle cx="6.5" cy="6.5" r="5" />
              <path d="M10 10l3.5 3.5" strokeLinecap="round" />
            </svg>
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search accession, food name…"
              style={{
                width: "100%",
                paddingLeft: "32px",
                paddingRight: search ? "32px" : "12px",
                paddingTop: "7px", paddingBottom: "7px",
                fontSize: "var(--text-caption)", fontWeight: 400,
                color: "var(--ink)",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                outline: "none",
                fontFamily: "var(--sans)",
                transition: "border-color 120ms ease, box-shadow 120ms ease",
                boxSizing: "border-box",
              }}
              onFocus={e => {
                e.target.style.borderColor = "var(--accent)";
                e.target.style.boxShadow = "0 0 0 3px rgba(26,86,219,0.08)";
              }}
              onBlur={e => {
                e.target.style.borderColor = "var(--border)";
                e.target.style.boxShadow = "none";
              }}
            />
            {search && (
              <button
                onClick={() => { setSearch(""); setPage(1); }}
                style={{
                  position: "absolute", right: "10px", top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--ink-faint)", fontSize: "14px", lineHeight: 1,
                  padding: 0, display: "flex", alignItems: "center",
                }}
                title="Clear search"
              >
                ×
              </button>
            )}
          </div>

          {/* Record count — shown only after load */}
          {!loading && (
            <span style={{
              fontSize: "var(--text-caption)", fontWeight: 400,
              color: "var(--ink-faint)",
              fontVariantNumeric: "tabular-nums",
              whiteSpace: "nowrap", flexShrink: 0,
            }}>
              {displayTotal.toLocaleString()} {displayTotal === 1 ? "record" : "records"}
            </span>
          )}
        </div>

        {/* Table / skeleton */}
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <SampleTable
            samples={filteredSamples}
            total={displayTotal}
            page={page}
            limit={limit}
            totalPages={displayPages}
            onPageChange={setPage}
            onLimitChange={(l) => { setLimit(l); setPage(1); }}
            onClearSearch={search ? () => { setSearch(""); setPage(1); } : null}
            hasSearch={!!search}
          />
        )}
      </main>
    </div>
  );
};

export default SamplesPage;