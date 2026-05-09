import apiClient from "./apiClient";

export const getSamples = async () => {
  const res = await apiClient.get("/getallSamples");
  return res.data;
};

export const getSampleById = async (sampleId) => {
  const res = await apiClient.get(`/getSamples/${sampleId}`);
  return res.data;
};
