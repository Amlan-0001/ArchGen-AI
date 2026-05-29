import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";

const api = axios.create({
  timeout: 90000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function generateArchitecture(prompt) {
  const response = await api.post(API_ENDPOINTS.generate, { prompt });
  return response.data;
}


