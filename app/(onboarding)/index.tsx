import { useEffect } from 'react';
import { router } from 'expo-router';

export default function OnboardingIndex() {
  useEffect(() => {
    // Redirect to intro screen
    router.replace('/(onboarding)/intro');
  }, []);

  return null;
} 