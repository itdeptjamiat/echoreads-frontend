import axios, { AxiosResponse, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../redux/store';
import { logout } from '../redux/slices/authSlice';
import { router } from 'expo-router';

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
    // If unauthorized, handle logout
    if (error.response?.status === 401) {
      try {
        // Clear token from AsyncStorage
        await AsyncStorage.removeItem('auth-token');
        
        // Dispatch logout action to clear Redux state, token, and navigate
        store.dispatch(logout());
        
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