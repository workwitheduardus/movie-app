import axios, {type AxiosError} from 'axios';

// Environment variables
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;

if (!API_KEY) {
  console.warn('TMDB API key is not set. Please set VITE_TMDB_API_KEY in your environment variables. or Copy .env.example → .env and add your key from https://www.themoviedb.org/settings/api');
}

// Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor to add API key to every request
api.interceptors.request.use(
  (config) => {
    config.params = {
      api_key: API_KEY,
      language: 'en-US',
      ...config.params,
    };
    return config;
  },
  (error) => {Promise.reject(error); }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ status_message: string }>) =>{ 
    if (error.response) {
      const status = error.response.status
      const message = error.response.data?.status_message ?? error.message

      if (status === 401) {
        console.error('[TMDB] 401 Unauthorized — check VITE_TMDB_API_KEY in .env');
      } else if (status === 404) {
        console.warn(`[TMDB] 404 Not Found:`, error.config?.url);
      } else {
        console.error(`[TMDB] ${status}:`, message);
      }
    } else if (error.request) {
      console.error('[TMDB] No response received - check your network connection');
    }
    return
    }
  );

export default api;