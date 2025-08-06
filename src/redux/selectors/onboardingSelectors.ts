import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Base selectors
export const selectOnboarding = (state: RootState) => state.onboarding;

// Intro flow selectors
export const selectHasSeenIntro = createSelector(
  [selectOnboarding],
  (onboarding) => onboarding.hasSeenIntro
);

export const selectIntroCompleted = createSelector(
  [selectOnboarding],
  (onboarding) => onboarding.introCompleted
);

// Plan selection selectors
export const selectSelectedPlan = createSelector(
  [selectOnboarding],
  (onboarding) => onboarding.selectedPlan
);

export const selectPlanSelectionCompleted = createSelector(
  [selectOnboarding],
  (onboarding) => onboarding.planSelectionCompleted
);

// Payment flow selectors
export const selectPaymentInProgress = createSelector(
  [selectOnboarding],
  (onboarding) => onboarding.paymentInProgress
);

export const selectPaymentCompleted = createSelector(
  [selectOnboarding],
  (onboarding) => onboarding.paymentCompleted
);

export const selectPaymentError = createSelector(
  [selectOnboarding],
  (onboarding) => onboarding.paymentError
);

// User preferences selectors
export const selectUserInterests = createSelector(
  [selectOnboarding],
  (onboarding) => onboarding.userPreferences.interests
);

export const selectReadingGoal = createSelector(
  [selectOnboarding],
  (onboarding) => onboarding.userPreferences.readingGoal
);

export const selectNotificationSettings = createSelector(
  [selectOnboarding],
  (onboarding) => onboarding.userPreferences.notificationSettings
);

// Overall onboarding selectors
export const selectOnboardingCompleted = createSelector(
  [selectOnboarding],
  (onboarding) => onboarding.onboardingCompleted
);

// Computed selectors
export const selectOnboardingProgress = createSelector(
  [selectIntroCompleted, selectPlanSelectionCompleted, selectPaymentCompleted],
  (introCompleted, planCompleted, paymentCompleted) => {
    const steps = [introCompleted, planCompleted, paymentCompleted];
    const completedSteps = steps.filter(Boolean).length;
    return {
      completedSteps,
      totalSteps: steps.length,
      progress: (completedSteps / steps.length) * 100,
    };
  }
);

export const selectShouldShowOnboarding = createSelector(
  [selectOnboardingCompleted, selectHasSeenIntro],
  (onboardingCompleted, hasSeenIntro) => {
    return !onboardingCompleted && !hasSeenIntro;
  }
);

export const selectNextOnboardingStep = createSelector(
  [selectIntroCompleted, selectPlanSelectionCompleted, selectPaymentCompleted],
  (introCompleted, planCompleted, paymentCompleted) => {
    if (!introCompleted) return 'intro';
    if (!planCompleted) return 'plan-selection';
    if (!paymentCompleted) return 'payment';
    return 'completed';
  }
); 