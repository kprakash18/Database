import apiClient from "./apiClient";

export const getSamples = async (page, limit) => {
  const params = {};
  if (page) params.page = page;
  if (limit) params.limit = limit;

  const res = await apiClient.get("/samples", { params });
  return res.data;
};

export const getSampleById = async (sampleId) => {
  const res = await apiClient.get(`/samples/${sampleId}`);
  return res.data;
};
