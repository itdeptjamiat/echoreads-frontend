import { createAsyncThunk } from '@reduxjs/toolkit';
import APIIns from '../../axios/EchoInstance';
import { API_URLS } from '../../axios/apiEndpoints';

// Types
interface PlanSelectionData {
  planId: string;
  userId: string;
}

interface PaymentData {
  planId: string;
  userId: string;
  paymentMethod: string;
  amount: number;
}

interface UserPreferencesData {
  userId: string;
  interests: string[];
  readingGoal: 'casual' | 'moderate' | 'avid';
  notificationSettings: {
    dailyDigest: boolean;
    weeklyRecommendations: boolean;
    newContent: boolean;
  };
}

// 1. Select Plan
export const selectPlan = createAsyncThunk(
  'onboarding/selectPlan',
  async (data: PlanSelectionData, { rejectWithValue }) => {
    try {
      const response = await APIIns.post(API_URLS.onboarding.selectPlan, data);
      console.log('Plan selection successful:', response.data);
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Failed to select plan';
      console.error('Plan selection error:', message);
      return rejectWithValue(message);
    }
  }
);

// 2. Process Payment
export const processPayment = createAsyncThunk(
  'onboarding/processPayment',
  async (data: PaymentData, { rejectWithValue }) => {
    try {
      const response = await APIIns.post(API_URLS.onboarding.processPayment, data);
      console.log('Payment processed successfully:', response.data);
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Payment processing failed';
      console.error('Payment error:', message);
      return rejectWithValue(message);
    }
  }
);

// 3. Save User Preferences
export const saveUserPreferences = createAsyncThunk(
  'onboarding/saveUserPreferences',
  async (data: UserPreferencesData, { rejectWithValue }) => {
    try {
      const response = await APIIns.post(API_URLS.onboarding.savePreferences, data);
      console.log('User preferences saved successfully:', response.data);
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Failed to save preferences';
      console.error('Save preferences error:', message);
      return rejectWithValue(message);
    }
  }
);

// 4. Complete Onboarding
export const completeOnboarding = createAsyncThunk(
  'onboarding/completeOnboarding',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await APIIns.post(API_URLS.onboarding.complete, { userId });
      console.log('Onboarding completed successfully:', response.data);
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Failed to complete onboarding';
      console.error('Complete onboarding error:', message);
      return rejectWithValue(message);
    }
  }
);

// 5. Get Onboarding Status
export const getOnboardingStatus = createAsyncThunk(
  'onboarding/getStatus',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await APIIns.get(API_URLS.onboarding.getStatus(userId));
      console.log('Onboarding status retrieved:', response.data);
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Failed to get onboarding status';
      console.error('Get onboarding status error:', message);
      return rejectWithValue(message);
    }
  }
); 