import React from 'react'
import { Stack } from 'expo-router'

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Sign In' }} />
      <Stack.Screen name="signup" options={{ title: 'Sign Up' }} />
      <Stack.Screen name="forgotPassword" options={{ title: 'Forgot Password' }} />
      <Stack.Screen name="resetPassword" options={{ title: 'Reset Password' }} />
      <Stack.Screen name="verifyEmail" options={{ title: 'Verify Email' }} />
    </Stack>
  )
}