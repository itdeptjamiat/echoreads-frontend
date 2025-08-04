import axios, { AxiosResponse, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_BASE_URL = 'https://api.echoreads.online'; // EchoReads API base URL

const APIIns = axios.create({
  baseURL: API_BASE_URL,
});

// Attach auth token to axios instance
export const attachAuthToken = (token?: string | null) => {
  if (token) {
    APIIns.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete APIIns.defaults.headers.common['Authorization'];
  }
};

// Optional: Save token to AsyncStorage for persistent login
export const attachAuthTokenToAsyncStorage = async (token: string) => {
  if (token) {
    await AsyncStorage.setItem('auth-token', token);
  }
};

// Store logout handler function - will be set by auth slice
let logoutHandler: (() => void) | null = null;

// Function to set the logout handler (called from auth slice)
export const setLogoutHandler = (handler: () => void) => {
  logoutHandler = handler;
};

// Global Axios response interceptor for 401
APIIns.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    // If unauthorized, handle logout
    if (error.response?.status === 401) {
      try {
        // Clear token from AsyncStorage
        await AsyncStorage.removeItem('auth-token');
        
        // Clear authorization header
        attachAuthToken(null);
        
        // Call logout handler if available
        if (logoutHandler) {
          logoutHandler();
        }
        
        return Promise.reject(error);
      } catch (logoutError) {
        console.error('Error during logout:', logoutError);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default APIIns;