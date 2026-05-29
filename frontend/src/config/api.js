const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://archgen-ai-backend.onrender.com";

export const API_URL = API_BASE_URL;

export const API_ENDPOINTS = {
  generate: `${API_BASE_URL}/generate`,
};