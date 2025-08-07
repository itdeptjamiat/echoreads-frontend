import AsyncStorage from '@react-native-async-storage/async-storage';
import { attachAuthToken } from '../axios';

// Token storage keys
const TOKEN_KEY = 'auth-token';
const REFRESH_TOKEN_KEY = 'refresh-token';

// Save token to AsyncStorage and attach to API client
export const saveAndAttachToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    attachAuthToken(token);
    console.log('🔐 Token saved and attached');
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

// Load token from AsyncStorage and attach to API client
export const loadAndAttachToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (token) {
      attachAuthToken(token);
      console.log('🔐 Token loaded and attached');
      return token;
    }
    return null;
  } catch (error) {
    console.error('Error loading token:', error);
    return null;
  }
};

// Clear token from storage and API client
export const clearToken = async () => {
  try {
    await AsyncStorage.multiRemove([TOKEN_KEY, REFRESH_TOKEN_KEY]);
    attachAuthToken(null);
    console.log('🗑️ Token cleared');
  } catch (error) {
    console.error('Error clearing token:', error);
  }
};

// Check if token exists in storage
export const hasStoredToken = async (): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return Boolean(token);
  } catch (error) {
    console.error('Error checking token:', error);
    return false;
  }
};