import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { Provider, useSelector } from 'react-redux';
import { store, persistor } from '../src/redux/store';
import { ThemeProvider } from '../src/theme/ThemeContext';
import { PersistGate } from 'redux-persist/integration/react';
import { selectToken } from '../src/redux/slices/selectState';
import { attachAuthToken } from '../src/axios/EchoInstance';
import { selectOnboardingCompleted } from '../src/redux/selectors/onboardingSelectors';

const AppLayout = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

const Navigation = () => {
  const token = useSelector(selectToken);
  const onboardingCompleted = useSelector(selectOnboardingCompleted);
  const router = useRouter();

  useEffect(() => {
    const handleAuthToken = async () => {
      try {
        if (token) {
          attachAuthToken(token);
          if (onboardingCompleted) {
            console.log('🔐 Token found, onboarding complete');
            router.replace('/(tabs)/');
          } else {
            console.log('🔐 Token found, onboarding incomplete');
            router.replace('/(onboarding)/');
          }
        } else {
          attachAuthToken(null);
          console.log('⚠️ No token found, navigating to auth');
          router.replace('/(auth)/');
        }
      } catch (error) {
        console.error('Error handling auth token:', error);
      }
    };

    handleAuthToken();
  }, [token, onboardingCompleted, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default AppLayout;