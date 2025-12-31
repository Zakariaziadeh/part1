import axios from 'axios';

// Create axios instance with base URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Note: baseURL already includes /api
  timeout: 15000, // 15 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add token to all requests automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(`📨 ${config.method.toUpperCase()} ${config.baseURL}${config.url}`, config.data || '');
  return config;
}, (error) => {
  console.error('❌ Request error:', error);
  return Promise.reject(error);
});

// Handle response errors
API.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}:`, response.data);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });
    
    // Handle token expiration
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.log('🔐 Token expired or invalid, clearing local storage...');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      
      // Only redirect if not already on auth page
      if (!window.location.pathname.includes('/auth')) {
        setTimeout(() => {
          window.location.href = '/auth/login';
        }, 1000);
      }
    }
    
    return Promise.reject(error);
  }
);

// Direct API functions for debugging
export const testConnection = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/test');
    return await response.json();
  } catch (error) {
    console.error('Connection test failed:', error);
    return null;
  }
};

export default API;
