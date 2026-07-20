import CompositionRenderer from "./renderers/CompositionRenderer.jsx";
import TaxonomyTreeRenderer from "./renderers/TaxonomyTreeRenderer.jsx";
import SamplesRenderer from "./renderers/SamplesRenderer.jsx";
import TaxonomySearchRenderer from "./renderers/TaxonomySearchRenderer.jsx";

const VisualizationRegistry = ({ responseData }) => {
  if (!responseData) {
    return (
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        minHeight: "320px",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        backgroundColor: "var(--surface)",
        textAlign: "center",
        padding: "24px",
      }}>
        <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
          No active query response loaded
        </p>
        <p style={{ fontSize: "12px", color: "var(--ink-muted)", marginTop: "4px", margin: 0 }}>
          Select an endpoint and click "Execute Request" to preview response.
        </p>
      </div>
    );
  }

  const vizType = detectVisualizationType(responseData);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {vizType === "taxonomyTree" ? (
        <TaxonomyTreeRenderer responseData={responseData} />
      ) : vizType === "composition" ? (
        <CompositionRenderer responseData={responseData} />
      ) : vizType === "taxonomySearch" ? (
        <TaxonomySearchRenderer responseData={responseData} />
      ) : (
        <SamplesRenderer responseData={responseData} />
      )}
    </div>
  );
};

function detectVisualizationType(data) {
  if (data?.tree || data?.children) return "taxonomyTree";
  
  // Extract data listing
  const list = data?.data || data?.matches || data;
  
  if (Array.isArray(list) && list.length > 0) {
    // Check if flat array contains parent_id mapping (meaning it is a hierarchy tree list)
    if (list[0]?.parent_id !== undefined || list[0]?.parent_tax_id !== undefined) {
      return "taxonomyTree";
    }
    // Check if it is a microbial abundance composition listing
    if (list[0]?.relative_abundance !== undefined || list[0]?.taxon_name !== undefined || list[0]?.value !== undefined) {
      return "composition";
    }
    // Check if it is search results
    if (
      list[0]?.ncbi_tax_id !== undefined || 
      list[0]?.tax_id !== undefined ||
      list[0]?.ncbiTaxId !== undefined ||
      list[0]?.taxonomyId !== undefined ||
      list[0]?.scientificName !== undefined ||
      list[0]?.path !== undefined
    ) {
      return "taxonomySearch";
    }
  }

  // Check if it has dominant taxonomic levels
  if (data?.dominant_within_each_level || data?.data?.dominant_within_each_level) {
    return "composition";
  }

  return "samples";
}

export default VisualizationRegistry;
