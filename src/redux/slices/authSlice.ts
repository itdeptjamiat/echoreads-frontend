import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
interface AuthData {
  token?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
    role?: string;
  };
}

interface ProfileUpdateData {
  loading: boolean;
  error: string | null;
  data: any | null;
}

interface UserData {
  loading: boolean;
  error: string | null;
  data: any | null;
}

interface AuthState {
  data: AuthData | null;
  isLoading: boolean;
  error: string | null;
  profileUpdate: ProfileUpdateData;
  userData: UserData;
}

// Initial state
const initialState: AuthState = {
  data: null,
  isLoading: false,
  error: null,
  profileUpdate: {
    loading: false,
    error: null,
    data: null,
  },
  userData: {
    loading: false,
    error: null,
    data: null,
  },
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Set auth data
    setAuthData: (state, action: PayloadAction<AuthData>) => {
      state.data = action.payload;
      state.error = null;
    },

    // Clear auth data (logout)
    clearAuthData: (state) => {
      state.data = null;
      state.error = null;
      state.profileUpdate = {
        loading: false,
        error: null,
        data: null,
      };
      state.userData = {
        loading: false,
        error: null,
        data: null,
      };
    },

    // Set error
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Profile update actions
    setProfileUpdateLoading: (state, action: PayloadAction<boolean>) => {
      state.profileUpdate.loading = action.payload;
      if (action.payload) {
        state.profileUpdate.error = null;
      }
    },

    setProfileUpdateData: (state, action: PayloadAction<any>) => {
      state.profileUpdate.data = action.payload;
      state.profileUpdate.loading = false;
      state.profileUpdate.error = null;
    },

    setProfileUpdateError: (state, action: PayloadAction<string>) => {
      state.profileUpdate.error = action.payload;
      state.profileUpdate.loading = false;
    },

    // User data actions
    setUserDataLoading: (state, action: PayloadAction<boolean>) => {
      state.userData.loading = action.payload;
      if (action.payload) {
        state.userData.error = null;
      }
    },

    setUserData: (state, action: PayloadAction<any>) => {
      state.userData.data = action.payload;
      state.userData.loading = false;
      state.userData.error = null;
    },

    setUserDataError: (state, action: PayloadAction<string>) => {
      state.userData.error = action.payload;
      state.userData.loading = false;
    },
  },
});

// Export actions
export const {
  clearError,
  setLoading,
  setAuthData,
  clearAuthData,
  setError,
  setProfileUpdateLoading,
  setProfileUpdateData,
  setProfileUpdateError,
  setUserDataLoading,
  setUserData,
  setUserDataError,
} = authSlice.actions;

// Export reducer
export default authSlice.reducer;  