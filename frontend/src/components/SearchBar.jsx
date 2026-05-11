import { useEffect, useState } from "react";

const SearchBar = ({ onSearch, matches = [], onSelectMatch, loading }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const id = window.setTimeout(() => {
      onSearch?.(query.trim());
    }, 250);

    return () => window.clearTimeout(id);
  }, [query, onSearch]);

  return (
    <div className="relative">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search scientific name, taxonomy ID, genus, or species"
        className="h-11 w-full border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-700"
      />

      {(loading || matches.length > 0) && (
        <div className="absolute left-0 right-0 top-12 z-30 max-h-72 overflow-auto border border-slate-300 bg-white shadow-lg">
          {loading && <div className="px-3 py-2 text-sm text-slate-500">Searching...</div>}
          {!loading &&
            matches.map((match) => (
              <button
                key={`${match.taxonomyId}-${match.scientificName}`}
                type="button"
                onClick={() => onSelectMatch?.(match)}
                className="block w-full border-b border-slate-100 px-3 py-2 text-left text-sm hover:bg-slate-50"
              >
                <span className="block font-medium text-slate-900">
                  {match.scientificName}
                </span>
                <span className="block text-xs text-slate-500">
                  {match.rank} · Tax ID {match.taxonomyId || match.ncbiTaxId || "unknown"}
                </span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
