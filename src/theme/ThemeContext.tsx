import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from './colors';

// Theme options
export type ThemeMode = 'light' | 'dark' | 'system';

// CSS-like theme variables
export interface ThemeVariables {
  // Basic colors
  '--primary': string;
  '--background': string;
  '--text': string;
  '--text-secondary': string;
  '--border': string;
  '--card': string;
  '--input': string;
  '--divider': string;
  '--icon': string;
  
  // Semantic colors
  '--success': string;
  '--warning': string;
  '--danger': string;
  
  // UI element-specific
  '--header-bg': string;
  '--chart-bg': string;
  '--chart-text': string;
  '--button-text': string;
  '--badge-bg': string;
}

// Theme context type
type ThemeContextType = {
  theme: 'light' | 'dark';
  themeMode: ThemeMode;
  isDarkMode: boolean;
  colors: typeof COLORS.light | typeof COLORS.dark;
  cssVar: ThemeVariables;
  setThemeMode: (mode: ThemeMode) => void;
};

// Create the context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  themeMode: 'system',
  isDarkMode: false,
  colors: COLORS.light,
  cssVar: {} as ThemeVariables,
  setThemeMode: () => {},
});

// Theme storage key
const THEME_MODE_KEY = 'zamo_theme_mode';

// Generate CSS-like variables from colors
const generateThemeVariables = (isDark: boolean): ThemeVariables => {
  const base = isDark ? COLORS.dark : COLORS.light;
  
  return {
    // Basic colors
    '--primary': COLORS.primary,
    '--background': base.background,
    '--text': base.text,
    '--text-secondary': base.textSecondary,
    '--border': base.border,
    '--card': base.card,
    '--input': base.input,
    '--divider': base.divider,
    '--icon': base.icon,
    
    // Semantic colors
    '--success': COLORS.success,
    '--warning': COLORS.warning,
    '--danger': COLORS.danger,
    
    // UI element-specific
    '--header-bg': COLORS.primary,
    '--chart-bg': isDark ? '#2A2A2A' : base.card,
    '--chart-text': '#FFFFFF',
    '--button-text': '#FFFFFF',
    '--badge-bg': 'rgba(255, 255, 255, 0.2)'
  };
};

// Provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme() || 'light';
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [theme, setTheme] = useState<'light' | 'dark'>(systemColorScheme);

  // Load saved theme preference on mount
  useEffect(() => {
    const loadThemeMode = async () => {
      try {
        const savedThemeMode = await AsyncStorage.getItem(THEME_MODE_KEY);
        if (savedThemeMode) {
          setThemeMode(savedThemeMode as ThemeMode);
        }
      } catch (error) {
        console.error('Failed to load theme mode:', error);
      }
    };
    
    loadThemeMode();
  }, []);

  // Update theme when theme mode or system theme changes
  useEffect(() => {
    const determineTheme = () => {
      switch (themeMode) {
        case 'light':
          return 'light';
        case 'dark':
          return 'dark';
        case 'system':
        default:
          return systemColorScheme;
      }
    };
    
    setTheme(determineTheme());
  }, [themeMode, systemColorScheme]);

  // Save theme mode when it changes
  const handleSetThemeMode = async (mode: ThemeMode) => {
    setThemeMode(mode);
    try {
      await AsyncStorage.setItem(THEME_MODE_KEY, mode);
    } catch (error) {
      console.error('Failed to save theme mode:', error);
    }
  };

  // Compute current colors based on theme
  const isDarkMode = theme === 'dark';
  const colors = isDarkMode ? COLORS.dark : COLORS.light;
  const cssVar = generateThemeVariables(isDarkMode);
  
  // Context value
  const contextValue: ThemeContextType = {
    theme,
    themeMode,
    isDarkMode,
    colors,
    cssVar,
    setThemeMode: handleSetThemeMode,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Helper function to access CSS variables
export const getCssVar = (variable: keyof ThemeVariables) => {
  const { cssVar } = useTheme();
  return cssVar[variable];
}; 