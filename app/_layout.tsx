import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store, persistor } from '../src/redux/store';
import { ThemeProvider } from '../src/theme/ThemeContext';
import { PersistGate } from 'redux-persist/integration/react';
import { selectToken } from '../src/redux/slices/selectState';
import { attachAuthToken } from '../src/axios/EchoInstance';

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
  const router = useRouter();

  useEffect(() => {
    const handleAuthToken = async () => {
      try {
        if (token) {
          attachAuthToken(token);
          console.log('🔐 Token found, navigating to main app');
          router.replace('/(tabs)/');
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
  }, [token, router]);

  return (
            <Stack screenOptions={{ headerShown: false }}>
              {/* Index does the auth gate */}
              <Stack.Screen name="index" />
              {/* Route groups for auth and tabs */}
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(tabs)" />
            </Stack>
  );
};

export default AppLayout;