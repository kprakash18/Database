export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const SWAGGER_DOCS_URL =
  import.meta.env.VITE_SWAGGER_URL ||
  `${API_BASE_URL}/api/docs`;
