import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from './colors';

interface ThemeContextType {
  theme: typeof lightTheme;
  mode: 'light' | 'dark';
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    const init = async () => {
      const saved = await AsyncStorage.getItem('theme-mode');
      const system = Appearance.getColorScheme();
      const finalMode = (saved || system || 'light') as 'light' | 'dark';
      setMode(finalMode);
      setTheme(finalMode === 'dark' ? darkTheme : lightTheme);
    };
    init();
  }, []);

  const toggle = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    setTheme(newMode === 'dark' ? darkTheme : lightTheme);
    AsyncStorage.setItem('theme-mode', newMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};