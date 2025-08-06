import { Stack } from 'expo-router';
import { ThemeProvider } from '../src/theme/ThemeContext';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../src/redux/store';

// Inner component to access Redux state after Provider
function AppContent() {
  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}

export default function Layout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}