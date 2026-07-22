import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { searchSunburstTaxonomy } from "../api/visualizationApi.js";

const SearchBar = ({ sampleId, onSelectMatch }) => {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [errorMsg, setErrorMsg] = useState("");

  const containerRef = useRef(null);
  const cacheRef = useRef({});
  const timerRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (event) => {
    const val = event.target.value;
    setQuery(val);

    const trimmed = val.trim();

    // 1. Min 3 characters check
    if (trimmed.length < 3) {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      setMatches([]);
      setLoading(false);
      setErrorMsg("");
      setIsOpen(false);
      setFocusedIndex(-1);
      return;
    }

    // Indicate loading immediately
    setLoading(true);
    setErrorMsg("");
    setIsOpen(true);
    setFocusedIndex(-1);

    if (timerRef.current) clearTimeout(timerRef.current);

    // 2. Debounce 300ms
    timerRef.current = setTimeout(async () => {
      const cacheKey = `${sampleId || "all"}:${trimmed.toLowerCase()}`;

      // 3. Cache check
      if (cacheRef.current[cacheKey]) {
        setMatches(cacheRef.current[cacheKey]);
        setLoading(false);
        return;
      }

      // 4. Cancel previous requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      try {
        const data = await searchSunburstTaxonomy({
          query: trimmed,
          sampleId,
          signal: abortControllerRef.current.signal,
        });

        const results = data.matches || [];
        // 5. Limit suggestions to 20
        const limited = results.slice(0, 20);

        // Cache the results
        cacheRef.current[cacheKey] = limited;

        setMatches(limited);
        setErrorMsg("");
      } catch (err) {
        if (axios.isCancel(err)) {
          // Ignore cancelled requests
          return;
        }
        console.error("Search error:", err);
        setMatches([]);
        setErrorMsg("Unable to fetch suggestions");
      } finally {
        setLoading(false);
      }
    }, 300);
  };

  const handleSelect = (match) => {
    onSelectMatch?.(match);
    setQuery("");
    setMatches([]);
    setLoading(false);
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const handleKeyDown = (event) => {
    if (!isOpen) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setFocusedIndex((prev) => (prev + 1 < matches.length ? prev + 1 : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setFocusedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : matches.length - 1));
    } else if (event.key === "Enter") {
      if (focusedIndex >= 0 && focusedIndex < matches.length) {
        event.preventDefault();
        handleSelect(matches[focusedIndex]);
      }
    } else if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
    }
  };

  const showDropdown = isOpen && (loading || matches.length > 0 || (query.trim().length >= 3 && (matches.length === 0 || errorMsg)));

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative flex items-center">
        <input
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (query.trim().length >= 3) setIsOpen(true);
          }}
          placeholder="Search scientific name"
          className="h-11 w-full border border-slate-300 bg-white pl-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-blue-700"
        />
        {loading && (
          <div className="absolute right-3">
            <svg className="animate-spin h-5 w-5 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
      </div>

      {showDropdown && (
        <div className="absolute left-0 right-0 top-12 z-30 max-h-72 overflow-auto border border-slate-300 bg-white shadow-lg">
          {loading && matches.length === 0 && (
            <div className="px-3 py-4 text-sm text-slate-500 text-center flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </div>
          )}

          {errorMsg && (
            <div className="px-3 py-3 text-sm text-red-600 text-center font-medium">
              {errorMsg}
            </div>
          )}

          {!loading && !errorMsg && query.trim().length >= 3 && matches.length === 0 && (
            <div className="px-3 py-3 text-sm text-slate-500 text-center italic">
              No taxonomy found
            </div>
          )}

          {matches.map((match, index) => {
            const isFocused = index === focusedIndex;
            const parentName = match.path && match.path.length >= 2 ? match.path[match.path.length - 2] : null;

            return (
              <button
                key={`${match.taxonomyId}-${match.scientificName}`}
                type="button"
                onClick={() => handleSelect(match)}
                onMouseEnter={() => setFocusedIndex(index)}
                className={`block w-full border-b border-slate-100 px-3 py-2.5 text-left transition-colors outline-none ${
                  isFocused ? "bg-slate-100" : "hover:bg-slate-50"
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-semibold text-slate-900 text-sm">
                    {match.scientificName}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                    {match.rank}
                  </span>
                </div>

                <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                  <span>
                    Tax ID: <span className="font-mono text-slate-700">{match.ncbiTaxId || match.taxonomyId || "unknown"}</span>
                  </span>
                  {parentName && (
                    <span className="text-[11px] italic">
                      Parent: <span className="font-medium text-slate-600">{parentName}</span>
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
