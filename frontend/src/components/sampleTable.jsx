import { Link } from "react-router-dom";

const SampleTable = ({
  samples = [],
  total = 0,
  page = 1,
  limit = 10,
  totalPages = 1,
  onPageChange,
  onLimitChange,
}) => {
  const startItem = total > 0 ? (page - 1) * limit + 1 : 0;
  const endItem = Math.min(page * limit, total);

  // Helper to detect if a sample is pooled/combined dataset metadata
  const isPooledSample = (sample) => {
    const text = `${sample.food_name} ${sample.description}`.toLowerCase();
    return text.includes("pooled") || text.includes("combined") || text.includes("all products") || text.includes("all samples");
  };

  // Generate page numbers array for pagination buttons
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="overflow-hidden border border-slate-300 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-slate-200 text-left text-xs uppercase text-slate-700">
            <tr>
              <th className="border border-slate-300 px-4 py-3 font-semibold">ID</th>
              <th className="border border-slate-300 px-4 py-3 font-semibold">Sample Name</th>
              <th className="border border-slate-300 px-4 py-3 font-semibold">Description</th>
              <th className="border border-slate-300 px-4 py-3 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {samples.map((sample) => {
              const pooled = isPooledSample(sample);

              return (
                <tr
                  key={sample.sample_id}
                  className={`transition duration-150 ${
                    pooled
                      ? "bg-amber-50/40 hover:bg-amber-100/50"
                      : "odd:bg-white even:bg-slate-50 hover:bg-teal-50/50"
                  }`}
                >
                  <td className="border border-slate-300 px-4 py-2.5 font-semibold text-teal-700">
                    <Link
                      to={`/samples/${sample.sample_id}`}
                      className="hover:underline"
                    >
                      #{sample.sample_id}
                    </Link>
                  </td>

                  <td className="border border-slate-300 px-4 py-2.5 font-medium text-slate-900">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        to={`/samples/${sample.sample_id}`}
                        className="hover:text-teal-700 hover:underline"
                      >
                        {sample.food_name}
                      </Link>

                      {pooled && (
                        <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-800 border border-amber-300">
                          Pooled Data
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="border border-slate-300 px-4 py-2.5 text-slate-600">
                    {sample.description}
                  </td>

                  <td className="border border-slate-300 px-4 py-2.5">
                    <Link
                      to={`/samples/${sample.sample_id}`}
                      className="inline-flex items-center rounded border border-teal-600 bg-white px-2.5 py-1 text-xs font-semibold text-teal-700 shadow-sm transition hover:bg-teal-600 hover:text-white"
                    >
                      Open Record &rarr;
                    </Link>
                  </td>
                </tr>
              );
            })}

            {samples.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="border border-slate-300 px-4 py-8 text-center text-slate-500"
                >
                  No samples found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {onPageChange && totalPages > 0 && (
        <div className="flex flex-col justify-between gap-4 border-t border-slate-300 bg-slate-50 px-4 py-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3 text-xs text-slate-600">
            <span>
              Showing <strong className="font-semibold text-slate-900">{startItem}</strong> to{" "}
              <strong className="font-semibold text-slate-900">{endItem}</strong> of{" "}
              <strong className="font-semibold text-slate-900">{total}</strong> samples
            </span>

            {onLimitChange && (
              <label className="ml-2 flex items-center gap-1.5 text-xs text-slate-600">
                Per page:
                <select
                  value={limit}
                  onChange={(e) => onLimitChange(Number(e.target.value))}
                  className="rounded border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-800 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </label>
            )}
          </div>

          <div className="flex items-center gap-1">
            {/* First & Prev Buttons */}
            <button
              onClick={() => onPageChange(1)}
              disabled={page === 1}
              className="rounded border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              title="First Page"
            >
              &laquo; First
            </button>
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
              className="rounded border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              title="Previous Page"
            >
              &lsaquo; Prev
            </button>

            {/* Page Number Buttons */}
            {getPageNumbers().map((num) => (
              <button
                key={num}
                onClick={() => onPageChange(num)}
                className={`min-w-7 rounded border px-2.5 py-1 text-xs font-semibold transition ${
                  num === page
                    ? "border-teal-600 bg-teal-600 text-white shadow-sm"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                {num}
              </button>
            ))}

            {/* Next & Last Buttons */}
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
              className="rounded border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              title="Next Page"
            >
              Next &rsaquo;
            </button>
            <button
              onClick={() => onPageChange(totalPages)}
              disabled={page === totalPages}
              className="rounded border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              title="Last Page"
            >
              Last &raquo;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SampleTable;