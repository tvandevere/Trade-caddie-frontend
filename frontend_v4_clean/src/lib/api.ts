import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'; // Default to 5000 for local Flask dev

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = async (userData: any) => {
  return apiClient.post('/auth/register', userData);
};

export const loginUser = async (credentials: any) => {
  return apiClient.post('/auth/login', credentials);
};

export const getCurrentUser = async () => {
  return apiClient.get('/auth/me');
};

// Add other API functions as needed for different features
// Example for fetching trade ideas (to be implemented later)
export const getTradeIdeas = async (params: any) => {
  return apiClient.get('/api/market/trade-ideas', { params });
};

export default apiClient;

