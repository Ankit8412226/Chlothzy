import axios from 'axios';
import toast from 'react-hot-toast';


const baseURL = import.meta.env.VITE_API_BASE_URL
console.log('✅ VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);



const api = axios.create({
  baseURL,
  timeout: 10000,
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      toast.error('Session expired. Please login again.');

    }
    return Promise.reject(error);
  }
);

export default api;
