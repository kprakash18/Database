import apiClient from "./apiClient";

export const getSamples = async () => {
  const res = await apiClient.get("/samples");
  return res.data;
};

export const getSampleById = async (sampleId) => {
  const res = await apiClient.get(`/samples/${sampleId}`);
  return res.data;
};