import apiClient from "./apiClient";

export const getCompositionSummary = async (sampleId) => {
  const res = await apiClient.get(`/composition/${sampleId}/summary`);
  return res.data;
};

export const getCompositionByRank = async (sampleId, rank) => {
  const res = await apiClient.get(`/composition/${sampleId}/${rank}/chart`);
  return res.data;
};