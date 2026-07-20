import { useState } from "react";

const JsonViewer = ({ data }) => {
  const [copied, setCopied] = useState(false);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[320px] rounded-lg border border-slate-300 bg-white p-6 text-center text-xs text-slate-500 shadow-sm">
        <p className="font-semibold text-slate-700">No NCBI data response loaded.</p>
        <p className="mt-1 text-[11px] text-slate-500">Execute query to inspect JSON payload.</p>
      </div>
    );
  }

  const jsonString = JSON.stringify(data, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ncbi-record-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCsv = () => {
    const list = Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data?.matches)
      ? data.matches
      : Array.isArray(data)
      ? data
      : null;

    if (!list || list.length === 0) {
      alert("No tabular array data found in response to export CSV.");
      return;
    }

    const headers = Object.keys(list[0]).filter((k) => typeof list[0][k] !== "object");
    const csvRows = [
      headers.join(","),
      ...list.map((row) =>
        headers.map((h) => JSON.stringify(row[h] ?? "")).join(",")
      ),
    ];

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ncbi-microbiome-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-lg border border-slate-300 bg-white overflow-hidden shadow-sm flex flex-col h-full min-h-[420px]">
      {/* Action Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 bg-slate-100 px-4 py-2.5 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-slate-700 font-bold">JSON Payload Inspector</span>
          <span className="text-[10px] font-mono text-slate-500">({jsonString.length} bytes)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="rounded border border-slate-300 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            {copied ? "✓ Copied!" : "Copy JSON"}
          </button>
          <button
            onClick={handleDownloadJson}
            className="rounded border border-slate-300 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            Download JSON
          </button>
          <button
            onClick={handleExportCsv}
            className="rounded border border-blue-600 bg-blue-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-blue-700 transition"
          >
            Export CSV/TSV
          </button>
        </div>
      </div>

      <pre className="p-4 overflow-auto font-mono text-xs leading-relaxed max-h-[500px] flex-1 bg-slate-950 text-emerald-400">
        <code>{jsonString}</code>
      </pre>
    </div>
  );
};

export default JsonViewer;
