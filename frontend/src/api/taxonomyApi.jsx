import apiClient from "./apiClient";

export const getTaxonomyTree = async (sampleId) => {
  const res = await apiClient.get(`/taxonomy/tree/${sampleId}`);
  return res.data;
};