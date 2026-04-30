import axios from "axios";

const PROD_API_FALLBACK =
  "https://hotel-booking-system-production-f1d1.up.railway.app/api";
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? PROD_API_FALLBACK : "http://localhost:5433/api");

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

/* Request Interceptor */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("staylux_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* Response Interceptor */
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";
    return Promise.reject(message);
  }
);

export default api;