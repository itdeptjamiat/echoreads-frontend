import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
  selectPlan, 
  processPayment, 
  saveUserPreferences, 
  completeOnboarding, 
  getOnboardingStatus 
} from '../actions/onboardingActions';

// Types
interface OnboardingState {
  // Intro flow
  hasSeenIntro: boolean;
  introCompleted: boolean;
  
  // Plan selection
  selectedPlan: string | null;
  planSelectionCompleted: boolean;
  
  // Payment flow
  paymentInProgress: boolean;
  paymentCompleted: boolean;
  paymentError: string | null;
  
  // Overall onboarding
  onboardingCompleted: boolean;
  
  // Loading states
  isLoading: boolean;
  
  // User preferences
  userPreferences: {
    interests: string[];
    readingGoal: 'casual' | 'moderate' | 'avid' | null;
    notificationSettings: {
      dailyDigest: boolean;
      weeklyRecommendations: boolean;
      newContent: boolean;
    };
  };
}

// Initial state
const initialState: OnboardingState = {
  hasSeenIntro: false,
  introCompleted: false,
  selectedPlan: null,
  planSelectionCompleted: false,
  paymentInProgress: false,
  paymentCompleted: false,
  paymentError: null,
  onboardingCompleted: false,
  isLoading: false,
  userPreferences: {
    interests: [],
    readingGoal: null,
    notificationSettings: {
      dailyDigest: true,
      weeklyRecommendations: true,
      newContent: false,
    },
  },
};

// Create the slice
const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    // Intro flow
    markIntroSeen: (state) => {
      state.hasSeenIntro = true;
    },
    
    completeIntro: (state) => {
      state.introCompleted = true;
    },
    
    // Plan selection
    selectPlanAction: (state, action: PayloadAction<string>) => {
      state.selectedPlan = action.payload;
    },
    
    completePlanSelection: (state) => {
      state.planSelectionCompleted = true;
    },
    
    // Payment flow
    startPayment: (state) => {
      state.paymentInProgress = true;
      state.paymentError = null;
    },
    
    completePayment: (state) => {
      state.paymentInProgress = false;
      state.paymentCompleted = true;
      state.paymentError = null;
    },
    
    failPayment: (state, action: PayloadAction<string>) => {
      state.paymentInProgress = false;
      state.paymentError = action.payload;
    },
    
    resetPayment: (state) => {
      state.paymentInProgress = false;
      state.paymentCompleted = false;
      state.paymentError = null;
    },
    
    // User preferences
    setInterests: (state, action: PayloadAction<string[]>) => {
      state.userPreferences.interests = action.payload;
    },
    
    setReadingGoal: (state, action: PayloadAction<'casual' | 'moderate' | 'avid'>) => {
      state.userPreferences.readingGoal = action.payload;
    },
    
    updateNotificationSettings: (state, action: PayloadAction<Partial<OnboardingState['userPreferences']['notificationSettings']>>) => {
      state.userPreferences.notificationSettings = {
        ...state.userPreferences.notificationSettings,
        ...action.payload,
      };
    },
    
    // Overall onboarding
    completeOnboardingAction: (state) => {
      state.onboardingCompleted = true;
    },
    
    // Reset onboarding (for testing or logout)
    resetOnboarding: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // Select Plan
    builder
      .addCase(selectPlan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(selectPlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedPlan = action.payload.planId;
        state.planSelectionCompleted = true;
      })
      .addCase(selectPlan.rejected, (state, action) => {
        state.isLoading = false;
        state.paymentError = action.payload as string;
      });

    // Process Payment
    builder
      .addCase(processPayment.pending, (state) => {
        state.paymentInProgress = true;
        state.paymentError = null;
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.paymentInProgress = false;
        state.paymentCompleted = true;
        state.paymentError = null;
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.paymentInProgress = false;
        state.paymentError = action.payload as string;
      });

    // Save User Preferences
    builder
      .addCase(saveUserPreferences.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveUserPreferences.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userPreferences = action.payload.preferences;
      })
      .addCase(saveUserPreferences.rejected, (state) => {
        state.isLoading = false;
      });

    // Complete Onboarding
    builder
      .addCase(completeOnboarding.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(completeOnboarding.fulfilled, (state) => {
        state.isLoading = false;
        state.onboardingCompleted = true;
      })
      .addCase(completeOnboarding.rejected, (state) => {
        state.isLoading = false;
      });

    // Get Onboarding Status
    builder
      .addCase(getOnboardingStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOnboardingStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update state with server data
        const { status } = action.payload;
        state.introCompleted = status.introCompleted;
        state.planSelectionCompleted = status.planSelectionCompleted;
        state.paymentCompleted = status.paymentCompleted;
        state.onboardingCompleted = status.onboardingCompleted;
        state.selectedPlan = status.selectedPlan;
        state.userPreferences = status.userPreferences;
      })
      .addCase(getOnboardingStatus.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// Export actions
export const {
  markIntroSeen,
  completeIntro,
  selectPlanAction,
  completePlanSelection,
  startPayment,
  completePayment,
  failPayment,
  resetPayment,
  setInterests,
  setReadingGoal,
  updateNotificationSettings,
  completeOnboardingAction,
  resetOnboarding,
} = onboardingSlice.actions;

// Export reducer
export default onboardingSlice.reducer;