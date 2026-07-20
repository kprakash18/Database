import { useState } from "react";

const JsonViewer = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState("pretty"); // pretty, raw

  if (!data) {
    return (
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        minHeight: "320px",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        backgroundColor: "var(--surface)",
        textAlign: "center",
        gap: "8px",
      }}>
        <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink)", margin: 0 }}>
          No response payload available
        </p>
        <p style={{ fontSize: "13px", color: "var(--ink-muted)", margin: 0 }}>
          Execute an API request to inspect the raw JSON response.
        </p>
      </div>
    );
  }

  const prettyJson = JSON.stringify(data, null, 2);
  const rawJson = JSON.stringify(data);
  const activeJson = viewMode === "pretty" ? prettyJson : rawJson;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([prettyJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "response.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const btnStyle = (active) => ({
    padding: "4px 10px",
    fontSize: "12px", fontWeight: 500,
    fontFamily: "var(--sans)",
    color: active ? "#f9fafb" : "#6b7280",
    backgroundColor: active ? "#1f2937" : "transparent",
    border: "none",
    borderRadius: "var(--radius-sm)",
    cursor: "pointer",
    transition: "color 100ms, background-color 100ms",
  });

  // Calculate lines for Pretty mode line numbers
  const lines = activeJson.split("\n");

  return (
    <div style={{
      backgroundColor: "#0f1117",
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      fontFamily: "var(--mono)",
      border: "1px solid #1f2937",
    }}>
      {/* Header toolbar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 16px",
        borderBottom: "1px solid #1f2937",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <button style={btnStyle(viewMode === "pretty")} onClick={() => setViewMode("pretty")}>
            Pretty
          </button>
          <button style={btnStyle(viewMode === "raw")} onClick={() => setViewMode("raw")}>
            Raw
          </button>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button style={btnStyle(false)} onClick={handleCopy}
            onMouseEnter={e => e.currentTarget.style.color = "#d1d5db"}
            onMouseLeave={e => e.currentTarget.style.color = copied ? "#6ee7b7" : "#6b7280"}
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
          <button style={btnStyle(false)} onClick={handleDownload}
            onMouseEnter={e => e.currentTarget.style.color = "#d1d5db"}
            onMouseLeave={e => e.currentTarget.style.color = "#6b7280"}
          >
            Download ↓
          </button>
        </div>
      </div>

      {/* Code body with optional Line numbers */}
      <div style={{
        display: "flex",
        fontSize: "13px",
        lineHeight: 1.7,
        maxHeight: "520px",
        overflowY: "auto",
        backgroundColor: "#0f1117",
      }}>
        {/* Line numbers column (only for pretty mode) */}
        {viewMode === "pretty" && (
          <div style={{
            padding: "20px 0 20px 16px",
            color: "#374151",
            textAlign: "right",
            userSelect: "none",
            borderRight: "1px solid #1f2937",
            backgroundColor: "#0f1117",
            minWidth: "40px",
          }}>
            {lines.map((_, idx) => (
              <div key={idx} style={{ paddingRight: "8px" }}>{idx + 1}</div>
            ))}
          </div>
        )}

        <pre style={{
          margin: 0,
          padding: "20px",
          color: "#6ee7b7",
          overflowX: "auto",
          flex: 1,
        }}>
          <code>{activeJson}</code>
        </pre>
      </div>
    </div>
  );
};

export default JsonViewer;
