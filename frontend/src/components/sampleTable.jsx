import { useState } from "react";
import { Link } from "react-router-dom";

/* ── helpers ── */
const isPooledSample = (sample) => {
  const text = `${sample.food_name} ${sample.description}`.toLowerCase();
  return (
    text.includes("pooled") ||
    text.includes("combined") ||
    text.includes("all products") ||
    text.includes("all samples")
  );
};

/* ── TableRow — isolated hover state per row ── */
const TableRow = ({ sample, pooled, isLast }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <tr
      style={{
        borderBottom: isLast ? "none" : `1px solid var(--border-faint)`,
        backgroundColor: hovered
          ? pooled ? "var(--pooled-hover)" : "var(--row-hover)"
          : pooled ? "var(--pooled-bg)" : "transparent",
        transition: "background-color 80ms ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Accession */}
      <td style={{ padding: "10px 20px", verticalAlign: "middle", width: "150px" }}>
        <Link
          to={`/samples/${sample.sample_id}`}
          style={{
            fontFamily: "var(--mono)",
            fontSize: "12px", fontWeight: 600,
            color: hovered ? "var(--accent)" : "var(--text-secondary)",
            textDecoration: "none",
            letterSpacing: "0.01em",
            transition: "color 80ms ease",
          }}
        >
          {sample.accession_code || `#${sample.sample_id}`}
        </Link>
      </td>

      {/* Food name */}
      <td style={{ padding: "10px 20px", verticalAlign: "middle" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Link
            to={`/samples/${sample.sample_id}`}
            style={{
              fontSize: "14px", fontWeight: 500,
              color: "var(--text-primary)",
              textDecoration: "none",
              transition: "color 80ms ease",
            }}
          >
            {sample.food_name}
          </Link>
          {pooled && (
            <span style={{
              fontFamily: "var(--mono)",
              fontSize: "10px", fontWeight: 600,
              letterSpacing: "0.04em", textTransform: "uppercase",
              color: "var(--pooled-badge-text)",
              backgroundColor: "var(--pooled-badge-bg)",
              border: "1px solid var(--pooled-badge-border)",
              borderRadius: "var(--radius-sm)",
              padding: "1px 5px",
              flexShrink: 0,
            }}>
              pooled
            </span>
          )}
        </div>
      </td>

      {/* Location */}
      <td style={{
        padding: "10px 20px", verticalAlign: "middle",
        color: "var(--text-secondary)",
        fontSize: "13px", fontWeight: 400,
        whiteSpace: "nowrap",
      }}>
        {sample.metadata?.[0]?.location || "N/A"}
      </td>
      {/* Description */}
      <td style={{
        padding: "10px 20px", verticalAlign: "middle",
        color: "var(--ink-muted)",
        fontSize: "13px", fontWeight: 400,
        maxWidth: "340px",
      }}>
        <span style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          lineHeight: 1.6,
        }}>
          {sample.description}
        </span>
      </td>

      {/* Action */}
      <td style={{ padding: "10px 20px", verticalAlign: "middle", textAlign: "right", minWidth: "80px" }}>
        <Link
          to={`/samples/${sample.sample_id}`}
          style={{
            fontSize: "13px", fontWeight: 500,
            color: hovered ? "var(--ink)" : "var(--ink-faint)",
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "color 80ms ease",
          }}
        >
          View →
        </Link>
      </td>
    </tr>
  );
};

/* ── SampleTable ── */
const SampleTable = ({
  samples = [],
  total = 0,
  page = 1,
  limit = 20,
  totalPages = 1,
  onPageChange,
  onLimitChange,
  onClearSearch,
}) => {
  const startItem = total > 0 ? (page - 1) * limit + 1 : 0;
  const endItem = Math.min(page * limit, total);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 7;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const thStyle = {
    padding: "9px 20px",
    fontSize: "11px", fontWeight: 600,
    letterSpacing: "0.06em", textTransform: "uppercase",
    color: "var(--ink-muted)",
    textAlign: "left",
    borderBottom: "1px solid var(--border)",
    whiteSpace: "nowrap",
    backgroundColor: "var(--surface-raised)",
  };

  const navBtnStyle = (disabled) => ({
    padding: "4px 10px",
    fontSize: "13px", fontWeight: 500,
    color: disabled ? "var(--border-strong)" : "var(--ink-muted)",
    background: "none", border: "none",
    cursor: disabled ? "default" : "pointer",
    fontFamily: "var(--sans)",
    transition: "color 100ms ease",
  });

  return (
    <div style={{
      backgroundColor: "var(--surface)",
      borderRadius: "var(--radius-md)",
      border: "1px solid var(--border)",
      boxShadow: "0 1px 4px rgba(16,24,40,0.06), 0 1px 2px -1px rgba(16,24,40,0.04)",
      overflow: "hidden",
      fontFamily: "var(--sans)",
    }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
          <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
            <tr>
              <th style={thStyle}>Sample ID</th>
              <th style={thStyle}>Food Sample</th>
              <th style={thStyle}>Location</th>
              <th style={thStyle}>Description</th>
              <th style={{ ...thStyle, textAlign: "right", width: "120px" }}></th>
            </tr>
          </thead>

          <tbody>
            {samples.map((sample, idx) => {
              const pooled = isPooledSample(sample);
              return (
                <TableRow
                  key={sample.sample_id}
                  sample={sample}
                  pooled={pooled}
                  isLast={idx === samples.length - 1}
                />
              );
            })}

            {samples.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: "64px 24px", textAlign: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                    <svg viewBox="0 0 20 20" fill="none" stroke="var(--border-strong)" strokeWidth="1.5"
                      style={{ width: "28px", height: "28px", marginBottom: "4px" }}>
                      <circle cx="8.5" cy="8.5" r="6" />
                      <path d="M13 13l4 4" strokeLinecap="round" />
                    </svg>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
                      No records found
                    </span>
                    <span style={{ fontSize: "13px", color: "var(--ink-faint)" }}>
                      Try a different keyword or clear the filter
                    </span>
                    {onClearSearch && (
                      <button
                        onClick={onClearSearch}
                        style={{
                          marginTop: "8px",
                          padding: "6px 14px",
                          fontSize: "13px", fontWeight: 500,
                          color: "var(--ink)",
                          backgroundColor: "var(--surface-raised)",
                          border: "1px solid var(--border)",
                          borderRadius: "var(--radius)",
                          cursor: "pointer",
                          fontFamily: "var(--sans)",
                          transition: "background-color 100ms",
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--border-faint)"}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = "var(--surface-raised)"}
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination — card footer */}
      {onPageChange && totalPages > 0 && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderTop: "1px solid var(--border-faint)",
          padding: "12px 20px",
          flexWrap: "wrap", gap: "12px",
          backgroundColor: "var(--surface)",
        }}>
          {/* Count + per page */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{
              fontSize: "13px", fontWeight: 400,
              color: "var(--ink-faint)",
              fontVariantNumeric: "tabular-nums",
            }}>
              {startItem}–{endItem} of {total.toLocaleString()}
            </span>
            {onLimitChange && (
              <label style={{
                display: "flex", alignItems: "center", gap: "6px",
                fontSize: "13px", color: "var(--ink-muted)", cursor: "pointer",
              }}>
                Per page
                <select
                  value={limit}
                  onChange={e => onLimitChange(Number(e.target.value))}
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                    padding: "2px 6px",
                    fontSize: "13px",
                    color: "var(--ink)",
                    background: "var(--surface)",
                    outline: "none",
                    cursor: "pointer",
                    fontFamily: "var(--sans)",
                  }}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </label>
            )}
          </div>

          {/* Page numbers */}
          <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
              style={navBtnStyle(page === 1)}
              onMouseEnter={e => { if (page !== 1) e.target.style.color = "var(--ink)"; }}
              onMouseLeave={e => { e.target.style.color = page === 1 ? "var(--border-strong)" : "var(--ink-muted)"; }}
            >
              ← Prev
            </button>

            {getPageNumbers().map((num) => (
              <button
                key={num}
                onClick={() => onPageChange(num)}
                style={{
                  padding: "4px 8px", paddingBottom: "2px",
                  fontSize: "13px",
                  fontWeight: num === page ? 700 : 400,
                  color: num === page ? "var(--ink)" : "var(--ink-muted)",
                  background: "none", border: "none",
                  borderBottom: num === page ? "2px solid var(--ink)" : "2px solid transparent",
                  cursor: num === page ? "default" : "pointer",
                  fontFamily: "var(--sans)",
                  transition: "color 100ms ease",
                }}
                onMouseEnter={e => { if (num !== page) e.target.style.color = "var(--ink)"; }}
                onMouseLeave={e => { if (num !== page) e.target.style.color = "var(--ink-muted)"; }}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
              style={navBtnStyle(page === totalPages)}
              onMouseEnter={e => { if (page !== totalPages) e.target.style.color = "var(--ink)"; }}
              onMouseLeave={e => { e.target.style.color = page === totalPages ? "var(--border-strong)" : "var(--ink-muted)"; }}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SampleTable;