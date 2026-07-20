import { useState } from "react";
import { ENDPOINTS } from "./endpointsConfig.js";

const METHOD_COLORS = {
  GET: { color: "#047857", bg: "#ecfdf5", border: "#a7f3d0" },
  POST: { color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
  PUT: { color: "#b45309", bg: "#fffbeb", border: "#fde68a" },
  DELETE: { color: "#b91c1c", bg: "#fef2f2", border: "#fca5a5" },
};

const EndpointNav = ({
  selectedEndpoint,
  onSelectEndpoint,
  favorites = [],
  onToggleFavorite,
  recentRequests = [],
  onSelectRecent,
}) => {
  const categories = ["Samples", "Composition", "Taxonomy", "Visualization", "Analytics"];
  const [collapsedCategories, setCollapsedCategories] = useState({});

  const toggleCategory = (cat) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  return (
    <aside style={{
      width: "260px",
      flexShrink: 0,
      fontFamily: "var(--sans)",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      borderRight: "1px solid var(--border)",
      paddingRight: "20px",
      minHeight: "calc(100vh - 120px)",
    }}>
      {/* Search sidebar filter */}
      <div style={{ position: "relative" }}>
        <p style={{
          fontSize: "11px", fontWeight: 600,
          letterSpacing: "0.08em", textTransform: "uppercase",
          color: "var(--ink-muted)", margin: "0 0 8px",
        }}>
          API Endpoints
        </p>
      </div>

      {/* Navigation Groups */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", overflowY: "auto", flex: 1 }}>
        
        {/* Collapsible Categories */}
        {categories.map((cat) => {
          const items = ENDPOINTS.filter((e) => e.category === cat);
          const isCollapsed = collapsedCategories[cat];

          return (
            <div key={cat} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(cat)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  padding: "4px 0",
                  cursor: "pointer",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "var(--ink-muted)",
                }}
              >
                <span>{cat}</span>
                <span style={{ fontSize: "9px", transition: "transform 150ms", transform: isCollapsed ? "rotate(-90deg)" : "none" }}>
                  ▼
                </span>
              </button>

              {/* Collapsible Items */}
              {!isCollapsed && (
                <div style={{ display: "flex", flexDirection: "column", gap: "2px", paddingLeft: "4px" }}>
                  {items.map((ep) => {
                    const isSelected = selectedEndpoint.id === ep.id;
                    const methodStyle = METHOD_COLORS[ep.method] || METHOD_COLORS.GET;
                    const isFav = favorites.includes(ep.id);

                    return (
                      <div
                        key={ep.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          borderRadius: "var(--radius)",
                          backgroundColor: isSelected ? "var(--accent-muted)" : "transparent",
                          border: isSelected ? "1px solid var(--accent-border)" : "1px solid transparent",
                          transition: "all 120ms ease",
                          padding: "2px 6px",
                        }}
                      >
                        <button
                          onClick={() => onSelectEndpoint(ep)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            flex: 1,
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "6px 0",
                            textAlign: "left",
                            fontSize: "13px",
                            fontWeight: isSelected ? 600 : 500,
                            color: isSelected ? "var(--accent)" : "var(--text-secondary)",
                            overflow: "hidden",
                          }}
                        >
                          {/* Method Badge */}
                          <span style={{
                            fontSize: "9px",
                            fontWeight: 700,
                            padding: "2px 5px",
                            borderRadius: "var(--radius-sm)",
                            backgroundColor: methodStyle.bg,
                            color: methodStyle.color,
                            border: `1px solid ${methodStyle.border}`,
                            width: "34px",
                            textAlign: "center",
                            flexShrink: 0,
                          }}>
                            {ep.method}
                          </span>

                          <span style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}>
                            {ep.name}
                          </span>
                        </button>

                        {/* Favorite Star Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(ep.id);
                          }}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "13px",
                            color: isFav ? "#eab308" : "var(--ink-faint)",
                            padding: "4px",
                            transition: "transform 100ms",
                          }}
                          onMouseEnter={(e) => e.target.style.transform = "scale(1.2)"}
                          onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                        >
                          {isFav ? "★" : "☆"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "12px" }}>
            <p style={{
              fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.05em", textTransform: "uppercase",
              color: "var(--ink-muted)", margin: "4px 0",
            }}>
              ⭐ Favorites
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {favorites.map((favId) => {
                const ep = ENDPOINTS.find((e) => e.id === favId);
                if (!ep) return null;
                const isSelected = selectedEndpoint.id === ep.id;
                return (
                  <button
                    key={favId}
                    onClick={() => onSelectEndpoint(ep)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      width: "100%",
                      padding: "6px 8px",
                      borderRadius: "var(--radius)",
                      backgroundColor: isSelected ? "var(--accent-muted)" : "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: isSelected ? 600 : 500,
                      color: isSelected ? "var(--accent)" : "var(--text-secondary)",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ color: "#eab308" }}>★</span>
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {ep.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Recent Requests Section */}
        {recentRequests.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "12px" }}>
            <p style={{
              fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.05em", textTransform: "uppercase",
              color: "var(--ink-muted)", margin: "4px 0",
            }}>
              🕒 Recent Requests
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {recentRequests.slice(0, 5).map((req, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectRecent(req)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "100%",
                    padding: "6px 8px",
                    borderRadius: "var(--radius)",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "12px",
                    color: "var(--ink-muted)",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--row-hover)"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <span style={{
                    fontWeight: 600,
                    fontSize: "10px",
                    color: "var(--text-secondary)",
                    fontFamily: "var(--mono)",
                  }}>
                    {req.name}
                  </span>
                  <span style={{
                    fontFamily: "var(--mono)",
                    fontSize: "11px",
                    color: "var(--ink-faint)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    width: "100%",
                  }}>
                    {req.url}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default EndpointNav;
