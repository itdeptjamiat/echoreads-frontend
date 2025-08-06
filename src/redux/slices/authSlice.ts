import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
  loginUser, 
  signupUser, 
  forgotPassword, 
  confirmEmail, 
  resetPassword, 
  getUserData 
} from '../actions/authActions';
import { attachAuthToken, setLogoutHandler } from '../../axios/EchoInstance';
import { router } from 'expo-router';

// Types
interface AuthData {
  token?: string;
  user?: {
    _id: string;
    email: string;
    name?: string;
    username?: string;
    userType?: string;
    plan?: string;
    profilePic?: string;
    isVerified?: boolean;
    uid?: number;
    createdAt?: string;
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

    // Logout action with side effects
    logout: (state) => {
      // Clear auth data
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
      
      // Clear token from Axios headers
      attachAuthToken(null);
      
      // Navigate to auth screen
      router.replace('/(auth)/');
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
  extraReducers: (builder) => {
    // Login User
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = {
          token: action.payload.token,
          user: action.payload.user,
        };
        state.error = null;
        
        // Log the stored auth data for debugging
        console.log('Auth data stored:', state.data);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Signup User
    builder
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Forgot Password
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Confirm Email
    builder
      .addCase(confirmEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(confirmEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.token) {
          state.data = {
            token: action.payload.token,
            user: action.payload.user,
          };
        }
        state.error = null;
      })
      .addCase(confirmEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Reset Password
    builder
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get User Data
    builder
      .addCase(getUserData.pending, (state) => {
        state.userData.loading = true;
        state.userData.error = null;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.userData.loading = false;
        state.userData.data = action.payload;
        state.userData.error = null;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.userData.loading = false;
        state.userData.error = action.payload as string;
      });
  },
});

// Export actions
export const {
  clearError,
  setLoading,
  setAuthData,
  clearAuthData,
  logout,
  setError,
  setProfileUpdateLoading,
  setProfileUpdateData,
  setProfileUpdateError,
  setUserDataLoading,
  setUserData,
  setUserDataError,
} = authSlice.actions;

// Set up logout handler for 401 interceptor
setLogoutHandler(() => {
  // This will be called by the 401 interceptor
  router.replace('/(auth)/');
});

// Export reducer
export default authSlice.reducer;  