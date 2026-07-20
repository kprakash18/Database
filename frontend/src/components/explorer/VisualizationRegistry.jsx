import CompositionRenderer from "./renderers/CompositionRenderer.jsx";
import TaxonomyTreeRenderer from "./renderers/TaxonomyTreeRenderer.jsx";
import SamplesRenderer from "./renderers/SamplesRenderer.jsx";
import TaxonomySearchRenderer from "./renderers/TaxonomySearchRenderer.jsx";

const VisualizationRegistry = ({ responseData }) => {
  if (!responseData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[320px] rounded-lg border border-slate-300 bg-white p-6 text-center text-xs text-slate-500 shadow-sm">
        <p className="font-bold text-slate-700">No active NCBI API query response loaded.</p>
        <p className="mt-1 text-[11px] text-slate-500">Select an endpoint and click "Run Query (Entrez Direct ⚡)" to view live bioinformatic visualizations.</p>
      </div>
    );
  }

  const meta = responseData?.meta || {};
  const vizType = meta.visualization || detectVisualizationType(responseData);

  return (
    <div className="space-y-4">
      {vizType === "composition" || vizType === "compositionSummary" || vizType === "compositionTable" ? (
        <CompositionRenderer responseData={responseData} />
      ) : vizType === "taxonomyTree" ? (
        <TaxonomyTreeRenderer responseData={responseData} />
      ) : vizType === "taxonomySearch" ? (
        <TaxonomySearchRenderer responseData={responseData} />
      ) : vizType === "samples" || vizType === "sampleDetail" ? (
        <SamplesRenderer responseData={responseData} />
      ) : (
        <SamplesRenderer responseData={responseData} />
      )}
    </div>
  );
};

function detectVisualizationType(data) {
  if (data?.tree || data?.children) return "taxonomyTree";
  if (data?.labels || (Array.isArray(data?.data) && data?.data?.[0]?.relative_abundance !== undefined)) return "composition";
  if (data?.matches || (Array.isArray(data?.data) && data?.data?.[0]?.ncbi_tax_id !== undefined)) return "taxonomySearch";
  return "samples";
}

export default VisualizationRegistry;
