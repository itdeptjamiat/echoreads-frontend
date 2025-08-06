import { createAsyncThunk } from '@reduxjs/toolkit';
import APIIns, { attachAuthToken } from '../../axios/EchoInstance';
import { API_URLS } from '../../axios/apiEndpoints';

// Types
interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  email: string;
  username: string;
  password: string;
  name: string;
}

interface ForgotPasswordData {
  email: string;
}

interface ConfirmEmailData {
  email: string;
  otp: string;
}

interface ResetPasswordData {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
}

// 1. Login User
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await APIIns.post(API_URLS.auth.login, credentials);
      console.log('Login response:', response.data);
      
      // Handle the actual response structure
      const responseData = response.data;
      
      // Extract token and user data from the nested structure
      const token = responseData.user?.token || responseData.token;
      const userData = responseData.user?.user || responseData.user;
      
      // Attach token to Axios headers
      if (token) {
        attachAuthToken(token);
      }
      
      console.log('Success: Login successful!');
      return {
        token,
        user: userData,
        message: responseData.message
      };
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Something went wrong';
      console.error('Error:', message);
      return rejectWithValue(message);
    }
  }
);

// 2. Signup User
export const signupUser = createAsyncThunk(
  'auth/signup',
  async (userData: SignupData, { rejectWithValue }) => {
    try {
      const response = await APIIns.post(API_URLS.auth.signup, userData);
      
      console.log('Success: Signup successful!');
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Something went wrong';
      console.error('Error:', message);
      return rejectWithValue(message);
    }
  }
);

// 3. Forgot Password
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (data: ForgotPasswordData, { rejectWithValue }) => {
    try {
      const response = await APIIns.post(API_URLS.auth.forgotPassword, data);
      
      console.log('Success: Password reset email sent!');
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Something went wrong';
      console.error('Error:', message);
      return rejectWithValue(message);
    }
  }
);

// 4. Confirm Email
export const confirmEmail = createAsyncThunk(
  'auth/confirmEmail',
  async (data: ConfirmEmailData, { rejectWithValue }) => {
    try {
      const response = await APIIns.post(API_URLS.auth.verifyOTP, data);
      
      console.log('Success: Email verified successfully!');
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Something went wrong';
      console.error('Error:', message);
      return rejectWithValue(message);
    }
  }
);

// 5. Reset Password
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data: ResetPasswordData, { rejectWithValue }) => {
    try {
      const response = await APIIns.post(API_URLS.auth.resetPassword, data);
      
      console.log('Success: Password reset successful!');
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Something went wrong';
      console.error('Error:', message);
      return rejectWithValue(message);
    }
  }
);

// 6. Get User Data
export const getUserData = createAsyncThunk(
  'auth/getUserData',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await APIIns.get(API_URLS.auth.profile(userId));
      
      console.log('Success: User data fetched!');
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Something went wrong';
      console.error('Error:', message);
      return rejectWithValue(message);
    }
  }
);