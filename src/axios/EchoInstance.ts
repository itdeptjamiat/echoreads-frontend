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

// Global Axios response interceptor for 401
APIIns.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // If unauthorized and request not retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await AsyncStorage.removeItem('auth-token');
        attachAuthToken(null);
        return Promise.reject(error);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default APIIns;