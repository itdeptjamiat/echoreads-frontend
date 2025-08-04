import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '../src/theme/ThemeContext';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../src/redux/store';
import { selectToken } from '../src/redux/selectors';
import { attachAuthToken } from '../src/axios/EchoInstance';

// Inner component to access Redux state after Provider
function AppContent() {
  const token = useSelector(selectToken);

  useEffect(() => {
    // Token boot: Handle authentication on layout mount
    if (token) {
      attachAuthToken(token);
      console.log('🔐 Token attached on app startup');
    } else {
      console.log('⚠️ No token found on startup');
    }
  }, [token]);

  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}

export default function Layout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}