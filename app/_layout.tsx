import { useEffect, useState } from 'react';
import { Stack, router } from 'expo-router';
import { useSelector } from 'react-redux';
import { View, Image, StyleSheet } from 'react-native';
import { ThemeProvider } from '../src/theme/ThemeContext';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../src/redux/store';
import { selectToken } from '../src/redux/selectors';
import { attachAuthToken } from '../src/axios/EchoInstance';

// Custom Navigation component to handle auth routing
function Navigation() {
  const token = useSelector(selectToken);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleNavigation = async () => {
      try {
        // Token boot: Handle authentication on layout mount
        if (token) {
          attachAuthToken(token);
          console.log('🔐 Token attached on app startup');
          
          // Navigate to main app
          router.replace('/(tabs)/');
        } else {
          console.log('⚠️ No token found on startup');
          
          // Navigate to onboarding
          router.replace('/onboarding/');
        }
      } catch (error) {
        console.error('Navigation error:', error);
        // Fallback to onboarding on error
        router.replace('/onboarding/');
      } finally {
        setIsLoading(false);
      }
    };

    handleNavigation();
  }, [token]);

  // Show loading screen with logo
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Image 
          source={require('../assets/logo.png')} 
          style={styles.logo} 
        />
      </View>
    );
  }

  return null;
}

// Inner component to access Redux state after Provider
function AppContent() {
  return (
    <ThemeProvider>
      <Navigation />
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Default background, will be themed later
  },
  logo: {
    width: 120,
    height: 120,
  },
});

export default function Layout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}