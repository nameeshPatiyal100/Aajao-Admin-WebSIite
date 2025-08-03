import Axios, { InternalAxiosRequestConfig } from "axios";
import storage from "../utils/storage";
import { API_BASE_URL } from "../configs/apis";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = storage.getToken();
  if (config && config.headers) {
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    config.headers.Accept = "application/json";
  }
  

  return config;
}
const API_URL = "https://aajaodev.onrender.com"
export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {    
    if (error?.response?.status === 401) {
      storage.clearToken();
      window.location.assign(window.location.origin as unknown as string);
    }

    const message = error.response?.data?.message || error.message;
    useNotificationStore.getState().addNotification({
      type: "error",
      title: "Failure",
      message,
    });

    return Promise.reject(error);
  }
);
