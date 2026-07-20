import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSamples } from "../api/sampleApi";
import SampleTable from "../components/sampleTable.jsx";

const SamplesPage = () => {
  const [samples, setSamples] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
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
          // Standard paginated response
          setSamples(res.data);
          setTotal(res.total || res.data.length);
          setTotalPages(res.totalPages || Math.ceil((res.total || res.data.length) / limit));
        } else if (Array.isArray(res)) {
          // Direct array response fallback
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

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1); // Reset to page 1 on limit change
  };

  const filteredSamples = samples.filter((sample) => {
    const text = `${sample.accession_code || ''} ${sample.sample_id} ${sample.food_name} ${sample.description}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-5 rounded border border-slate-300 bg-white px-5 py-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Indian Food Microbiome Database
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Browse food samples and open records for taxonomy and composition.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/explorer"
              className="inline-flex items-center gap-1.5 rounded border border-teal-600 bg-teal-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-teal-700"
            >
              <span>⚡ API Explorer</span>
            </Link>
            <Link
              to="/taxonomy"
              className="inline-flex items-center gap-1.5 rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              <span>Sunburst Tree</span>
            </Link>
          </div>
        </header>

        <section className="mb-5 rounded border border-slate-300 bg-white shadow-sm">
          <div className="border-b border-slate-300 bg-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-700">
            Filter & Search Samples
          </div>

          <div className="p-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by sample ID, food name, or description..."
              className="w-full rounded border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            />
          </div>
        </section>

        {loading ? (
          <div className="rounded border border-slate-300 bg-white p-8 text-center text-sm font-medium text-slate-600 shadow-sm">
            Loading samples data...
          </div>
        ) : (
          <SampleTable
            samples={filteredSamples}
            total={search ? filteredSamples.length : total}
            page={page}
            limit={limit}
            totalPages={search ? Math.ceil(filteredSamples.length / limit) || 1 : totalPages}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        )}
      </div>
    </div>
  );
};

export default SamplesPage;