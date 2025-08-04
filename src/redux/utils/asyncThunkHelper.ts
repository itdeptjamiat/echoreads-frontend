import { createAsyncThunk } from '@reduxjs/toolkit';
// Note: Toast will need to be imported when available
// import Toast from 'react-native-simple-toast'; // Example

interface AsyncThunkConfig {
  name: string;
  apiCall: () => Promise<any>;
  successMessage?: string;
  errorMessage?: string;
}

export const handleAsyncThunk = ({
  name,
  apiCall,
  successMessage,
  errorMessage
}: AsyncThunkConfig) => {
  return createAsyncThunk(name, async (_, { rejectWithValue }) => {
    try {
      const response = await apiCall();
      
      if (successMessage) {
        // Toast.show(successMessage, Toast.LONG);
        console.log('Success:', successMessage); // Temporary until Toast is available
      }
      
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || errorMessage || 'An error occurred';
      
      // Toast.show(message, Toast.LONG);
      console.error('Error:', message); // Temporary until Toast is available
      
      return rejectWithValue(message);
    }
  });
};