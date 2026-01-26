// src/services/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  // Optional: set headers or interceptors
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
