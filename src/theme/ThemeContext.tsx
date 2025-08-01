import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from './colors';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    const init = async () => {
      const saved = await AsyncStorage.getItem('theme-mode');
      const system = Appearance.getColorScheme();
      const finalMode = saved || system || 'light';
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