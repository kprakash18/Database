import { useState } from "react";

const LANGS = [
  { key: "curl", label: "cURL" },
  { key: "js", label: "JavaScript" },
  { key: "python", label: "Python" },
  { key: "r", label: "R" },
  { key: "node", label: "Node.js" },
];

const CodeSnippetGenerator = ({ method = "GET", url = "" }) => {
  const [activeLang, setActiveLang] = useState("curl");
  const [copied, setCopied] = useState(false);

  const fullUrl = url.startsWith("http") ? url : `${window.location.origin}${url}`;

  const snippets = {
    curl: `curl -X ${method} "${fullUrl}" \\\n  -H "Accept: application/json"`,
    js: `const response = await fetch("${fullUrl}", {\n  headers: { "Accept": "application/json" },\n});\nconst data = await response.json();\nconsole.log(data);`,
    python: `import requests\n\nurl = "${fullUrl}"\nheaders = {"Accept": "application/json"}\n\nresponse = requests.get(url, headers=headers)\ndata = response.json()\nprint(data)`,
    r: `library(httr2)\nlibrary(jsonlite)\n\nreq <- request("${fullUrl}") |>\n  req_headers(Accept = "application/json")\n\nresp <- req_perform(req)\ndata <- resp_body_json(resp)\nprint(data)`,
    node: `const axios = require('axios');\n\naxios.get('${fullUrl}', {\n  headers: { 'Accept': 'application/json' }\n})\n.then(response => {\n  console.log(response.data);\n})\n.catch(error => {\n  console.error(error);\n});`,
  };

  const currentSnippet = snippets[activeLang];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = activeLang === "python" ? "py" : activeLang === "r" ? "R" : activeLang === "curl" ? "sh" : "js";
    const blob = new Blob([currentSnippet], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `api_example.${ext}`;
    link.click();
  };

  return (
    <div style={{
      backgroundColor: "#0f1117",
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      fontFamily: "var(--mono)",
      border: "1px solid #1f2937",
    }}>
      {/* Tab bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 14px",
        borderBottom: "1px solid #1f2937",
      }}>
        <div style={{ display: "flex", gap: "4px" }}>
          {LANGS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveLang(key)}
              style={{
                padding: "4px 12px",
                fontSize: "12px", fontWeight: 500,
                fontFamily: "var(--sans)",
                color: activeLang === key ? "#f9fafb" : "#6b7280",
                backgroundColor: activeLang === key ? "#1f2937" : "transparent",
                border: "none",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                transition: "color 100ms, background-color 100ms",
              }}
              onMouseEnter={e => { if (activeLang !== key) e.currentTarget.style.color = "#d1d5db"; }}
              onMouseLeave={e => { if (activeLang !== key) e.currentTarget.style.color = "#6b7280"; }}
            >
              {label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={handleCopy}
            style={{
              padding: "4px 12px",
              fontSize: "12px", fontWeight: 500,
              fontFamily: "var(--sans)",
              color: copied ? "#6ee7b7" : "#6b7280",
              background: "none", border: "none",
              cursor: "pointer",
              transition: "color 100ms",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#d1d5db"}
            onMouseLeave={e => e.currentTarget.style.color = copied ? "#6ee7b7" : "#6b7280"}
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
          <button
            onClick={handleDownload}
            style={{
              padding: "4px 12px",
              fontSize: "12px", fontWeight: 500,
              fontFamily: "var(--sans)",
              color: "#6b7280",
              background: "none", border: "none",
              cursor: "pointer",
              transition: "color 100ms",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#d1d5db"}
            onMouseLeave={e => e.currentTarget.style.color = "#6b7280"}
          >
            Download
          </button>
        </div>
      </div>

      {/* Code */}
      <pre style={{
        margin: 0,
        padding: "20px",
        fontSize: "13px", lineHeight: 1.7,
        color: "#a5f3fc",
        overflowX: "auto",
        maxHeight: "220px",
      }}>
        <code>{currentSnippet}</code>
      </pre>
    </div>
  );
};

export default CodeSnippetGenerator;
