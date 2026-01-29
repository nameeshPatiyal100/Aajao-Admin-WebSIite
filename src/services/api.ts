import axios from "axios";
import { API_BASE_URL_LOCAL } from "../configs/apiConfigs";

const api = axios.create({
  baseURL: API_BASE_URL_LOCAL,
  // withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
