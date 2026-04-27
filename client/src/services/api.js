import axios from "axios";

const api = axios.create({
  // Point directly to your backend port 5433
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5433/api", 
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