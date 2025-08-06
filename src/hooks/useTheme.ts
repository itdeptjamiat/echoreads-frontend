import { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeContext';
import { lightTheme } from '../theme/colors';

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    // Fallback to light theme if context is not available
    return { 
      colors: lightTheme, 
      theme: 'light', 
      mode: 'light', 
      toggle: () => {}, 
      toggleTheme: () => {} 
    };
  }
  const { theme, mode, toggle } = context;
  return { colors: theme, theme: mode, mode, toggle, toggleTheme: toggle };
}