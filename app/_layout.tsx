import { Stack } from 'expo-router';
import { ThemeProvider } from '../src/theme/ThemeContext';
import { Provider } from 'react-redux';

export default function Layout() {
  return (
    // <Provider store={RStore}>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    // </Provider>
  );
}