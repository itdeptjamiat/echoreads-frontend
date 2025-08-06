import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectOnboardingCompleted, selectNextOnboardingStep } from '../../src/redux/selectors/onboardingSelectors';
import { getOnboardingStatus } from '../../src/redux/actions/onboardingActions';
import { selectAuthData } from '../../src/redux/slices/selectState';
import { AppDispatch } from '../../src/redux/store';
import { router } from 'expo-router';

export default function OnboardingLayout() {
  const dispatch = useDispatch<AppDispatch>();
  const onboardingCompleted = useSelector(selectOnboardingCompleted);
  const nextStep = useSelector(selectNextOnboardingStep);
  const authData = useSelector(selectAuthData);

  useEffect(() => {
    // If onboarding is completed, redirect to main app
    if (onboardingCompleted) {
      router.replace('/(tabs)/');
      return;
    }

    // If user is authenticated, get their onboarding status
    if (authData?.user?._id) {
      dispatch(getOnboardingStatus(authData.user._id));
    }
  }, [onboardingCompleted, authData?.user?._id, dispatch]);

  useEffect(() => {
    // Handle navigation based on next step
    if (nextStep && !onboardingCompleted) {
      switch (nextStep) {
        case 'intro':
          router.replace('/(onboarding)/');
          break;
        case 'plan-selection':
          router.replace('/(onboarding)/choosePlan');
          break;
        case 'payment':
          router.replace('/(onboarding)/checkout');
          break;
        case 'completed':
          router.replace('/(onboarding)/confirmation');
          break;
      }
    }
  }, [nextStep, onboardingCompleted]);

  return (
    <Stack 
      screenOptions={{ 
        headerShown: false,
        gestureEnabled: false, // Prevent swipe back during onboarding
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="choosePlan" />
      <Stack.Screen name="checkout" />
      <Stack.Screen name="confirmation" />
    </Stack>
  );
} 