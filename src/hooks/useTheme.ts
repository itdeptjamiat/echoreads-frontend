import { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeContext';

export function useTheme() {
  const { theme, mode, toggle } = useContext(ThemeContext);
  return { colors: theme, mode, toggle };
}