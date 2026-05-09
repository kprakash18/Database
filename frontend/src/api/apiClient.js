import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5173/api",
});

export default apiClient;