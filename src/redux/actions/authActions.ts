import { createAsyncThunk } from '@reduxjs/toolkit';
import APIIns, { attachAuthToken } from '../../axios/EchoInstance';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
}

interface ConfirmEmailData {
  email: string;
  code: string;
}

// Login async thunk
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      // Real API call using configured EchoInstance
      const response = await APIIns.post('/api/v1/user/login', credentials);
      
      // Attach token to future requests
      if (response.data.token) {
        attachAuthToken(response.data.token);
      }  
      
      // Toast.show('Login successful!', Toast.LONG);
      console.log('Success: Login successful!');
      
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      
      // Toast.show(message, Toast.LONG);
      console.error('Error:', message);
      
      return rejectWithValue(message);
    }
  }
);

// Signup async thunk
export const signupUser = createAsyncThunk(
  'auth/signup',
  async (signupData: SignupData, { rejectWithValue }) => {
    try {
      // Real API call using configured EchoInstance
      const response = await APIIns.post('/api/v1/user/signup', signupData);
      
      // Toast.show('Account created! Check your email.', Toast.LONG);
      console.log('Success: Account created! Check your email.');
      
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Signup failed';
      
      // Toast.show(message, Toast.LONG);
      console.error('Error:', message);
      
      return rejectWithValue(message);
    }
  }
);

// Confirm email async thunk
export const confirmEmail = createAsyncThunk(
  'auth/confirmEmail',
  async (confirmData: ConfirmEmailData, { rejectWithValue }) => {
    try {
      // Real API call using configured EchoInstance
      const response = await APIIns.post('/api/v1/user/confirm-email', confirmData);
      
      // Attach token to future requests
      if (response.data.token) {
        attachAuthToken(response.data.token);
      }
      
      // Toast.show('Email verified successfully!', Toast.LONG);
      console.log('Success: Email verified successfully!');
      
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Email verification failed';
      
      // Toast.show(message, Toast.LONG);
      console.error('Error:', message);
      
      return rejectWithValue(message);
    }
  }
);