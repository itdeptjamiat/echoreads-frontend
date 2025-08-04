import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="intro" />
      <Stack.Screen name="choosePlan" />
      <Stack.Screen name="checkout" />
      <Stack.Screen name="confirmation" />
    </Stack>
  );
} 