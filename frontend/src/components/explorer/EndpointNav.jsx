import { ENDPOINTS } from "./endpointsConfig.js";

const EndpointNav = ({ selectedEndpoint, onSelectEndpoint }) => {
  const categories = Array.from(new Set(ENDPOINTS.map((e) => e.category)));

  return (
    <aside className="w-full lg:w-72 rounded-lg border border-slate-300 bg-white p-4 shadow-sm space-y-4">
      {/* NCBI Sidebar Header */}
      <div className="border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-blue-900 bg-blue-100 border border-blue-300 px-2 py-0.5 rounded">
            NCBI / ENTREZ
          </span>
        </div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 mt-1.5">
          API Endpoint Directory
        </h2>
        <p className="text-[11px] text-slate-500">Bioinformatic Data Resources</p>
      </div>

      {/* Endpoint Groups */}
      <div className="space-y-4">
        {categories.map((cat) => {
          const items = ENDPOINTS.filter((e) => e.category === cat);
          return (
            <div key={cat} className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                {cat}
              </span>
              <div className="space-y-1">
                {items.map((ep) => {
                  const isSelected = selectedEndpoint.id === ep.id;
                  return (
                    <button
                      key={ep.id}
                      onClick={() => onSelectEndpoint(ep)}
                      className={`w-full text-left rounded-md px-3 py-2 text-xs transition flex items-center justify-between border ${
                        isSelected
                          ? "bg-blue-50 border-blue-600 text-blue-900 font-bold border-l-4"
                          : "bg-white border-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <span className="truncate">{ep.name}</span>
                      <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 text-slate-700">
                        {ep.method}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default EndpointNav;
