import { useState } from "react";

const CodeSnippetGenerator = ({ method = "GET", url = "", entrezCommand = "" }) => {
  const [activeLang, setActiveLang] = useState("entrez"); // "entrez" | "python" | "r" | "curl"
  const [copied, setCopied] = useState(false);

  const fullUrl = url.startsWith("http") ? url : `${window.location.origin}${url}`;

  const snippets = {
    entrez: entrezCommand
      ? `# NCBI Entrez Direct (EDirect) Command:\n${entrezCommand}\n\n# Direct URL:\n${fullUrl}`
      : `# NCBI Entrez Direct Query:\nefetch -url "${fullUrl}"`,
    python: `from Bio import Entrez\nimport requests\n\n# Configure NCBI User Contact\nEntrez.email = "researcher@example.org"\n\nurl = "${fullUrl}"\nheaders = {"Accept": "application/json"}\n\nresponse = requests.get(url, headers=headers)\ndata = response.json()\n\nprint("Record Title:", data.get("meta", {}).get("title"))\nprint("Fetched Records:", len(data.get("data", [])))`,
    r: `# R Bioconductor / httr2 Script\nlibrary(httr2)\nlibrary(jsonlite)\n\nreq <- request("${fullUrl}") %>%\n  req_headers(Accept = "application/json")\n\nresp <- req_perform(req)\ndata <- resp_body_json(resp)\n\nprint(data$meta$title)`,
    curl: `curl -X ${method} "${fullUrl}" \\\n  -H "Accept: application/json"`,
  };

  const currentSnippet = snippets[activeLang] || snippets.entrez;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-slate-300 bg-slate-900 overflow-hidden font-mono text-xs shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-2">
        <div className="flex items-center gap-1">
          {[
            ["entrez", "NCBI EDirect"],
            ["python", "Python (BioPython)"],
            ["r", "R (Bioconductor)"],
            ["curl", "cURL"],
          ].map(([lang, label]) => (
            <button
              key={lang}
              onClick={() => setActiveLang(lang)}
              className={`rounded px-2.5 py-1 text-[11px] font-semibold transition ${
                activeLang === lang
                  ? "bg-blue-600 text-white font-bold"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={handleCopy}
          className="rounded border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition"
        >
          {copied ? "✓ Copied!" : "Copy Code"}
        </button>
      </div>

      <pre className="p-4 overflow-x-auto text-blue-300 leading-relaxed">
        <code>{currentSnippet}</code>
      </pre>
    </div>
  );
};

export default CodeSnippetGenerator;
