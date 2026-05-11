const Breadcrumb = ({ path = [], onSelect }) => {
  const visiblePath = path.length ? path : ["Life"];

  return (
    <nav className="flex min-h-10 flex-wrap items-center gap-2 border-b border-slate-300 bg-white px-4 py-2 text-sm">
      {visiblePath.map((item, index) => (
        <span key={`${item}-${index}`} className="flex items-center gap-2">
          {index > 0 && <span className="text-slate-400">›</span>}
          <button
            type="button"
            onClick={() => onSelect?.(index)}
            className="font-medium text-slate-700 hover:text-blue-700"
          >
            {item}
          </button>
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
