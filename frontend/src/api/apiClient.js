import axios from "axios";

const isProd = import.meta.env.MODE === "production";
const defaultBaseUrl = isProd ? "https://database-jvw0.onrender.com" : "http://localhost:3000";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL || defaultBaseUrl}/api`,
});

export default apiClient;
