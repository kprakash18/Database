import apiClient from "./apiClient";

export const getSunburstTaxonomyTree = async ({ sampleId, limit = 5000 } = {}) => {
  const res = await apiClient.get("/visualization/taxonomy/sunburst", {
    params: { sampleId, limit },
  });
  return res.data;
};

export const searchSunburstTaxonomy = async ({ query, sampleId } = {}) => {
  const res = await apiClient.get("/visualization/taxonomy/search", {
    params: { q: query, sampleId },
  });
  return res.data;
};
