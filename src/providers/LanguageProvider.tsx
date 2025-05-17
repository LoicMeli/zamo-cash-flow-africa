import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18n } from "i18n-js";
import { text } from "../lib/translations";
import { AppState, AppStateStatus } from "react-native";

// Create a new i18n instance
const i18n = new I18n(text);

// Language type including all supported languages
export type Language = "en" | "fr" | "pidgin";

// Storage key for language preference
export const LANGUAGE_STORAGE_KEY = "zamo-language";

// Props for the LanguageProvider component
interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLanguage?: Language;
}

// Interface for the language context
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  isRTL: boolean; // For future RTL language support
  getSupportedLanguages: () => { code: Language; name: string; localName: string }[];
  forceRefresh: () => void; // Added to force refresh components
}

// Create the language context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Define supported languages with their display names
const SUPPORTED_LANGUAGES = [
  { code: "en" as Language, name: "English", localName: "English" },
  { code: "fr" as Language, name: "French", localName: "Français" },
  { code: "pidgin" as Language, name: "Pidgin English", localName: "Pidgin" }
];

// Set i18n configuration
i18n.enableFallback = true;
i18n.defaultLocale = "en";

/**
 * LanguageProvider component to handle app translations and language switching
 */
export function LanguageProvider({
  children,
  defaultLanguage = "en",
}: LanguageProviderProps) {
  // State to hold the current language
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [isLoaded, setIsLoaded] = useState(false);
  // Adding refresh counter to force re-renders when needed
  const [refreshCounter, setRefreshCounter] = useState(0);
  
  // Handle app state changes to ensure language consistency
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        // When app becomes active, check if language needs updating
        loadStoredLanguage();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    
    return () => {
      subscription.remove();
    };
  }, []);
  
  // Function to force reload of translations
  const forceRefresh = () => {
    setRefreshCounter(prev => prev + 1);
  };
  
  // Shared function to load language
  const loadStoredLanguage = async () => {
    try {
      const storedLang = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      
      if (storedLang && isValidLanguage(storedLang)) {
        setLanguageState(storedLang as Language);
        // Set i18n locale
        i18n.locale = storedLang;
        console.log("Loaded language from storage:", storedLang);
      } else {
        // If no valid language is stored, save the default language
        await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, defaultLanguage);
        // Set i18n locale to default
        i18n.locale = defaultLanguage;
        console.log("No valid language found, using default:", defaultLanguage);
      }
    } catch (error) {
      console.error("Failed to load language preference:", error);
      // Set i18n locale to default on error
      i18n.locale = defaultLanguage;
    } finally {
      setIsLoaded(true);
    }
  };
  
  // Load the language preference on initial mount
  useEffect(() => {
    loadStoredLanguage();
  }, [defaultLanguage]);

  // Save language preference when it changes
  useEffect(() => {
    if (!isLoaded) return; // Skip initial render
    
    const saveLanguage = async () => {
      try {
        await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
        // Update i18n locale when language changes
        i18n.locale = language;
        // Force refresh on language change
        forceRefresh();
        console.log("Language saved to storage:", language);
      } catch (error) {
        console.error("Failed to save language preference:", error);
      }
    };
    
    saveLanguage();
  }, [language, isLoaded]);

  // Verify if a language code is valid
  const isValidLanguage = (lang: string): boolean => {
    return SUPPORTED_LANGUAGES.some(l => l.code === lang);
  };

  // Set language with state update and storage persistence
  const setLanguage = (newLanguage: Language) => {
    if (isValidLanguage(newLanguage)) {
      console.log("Setting language to:", newLanguage);
      // Immediately update i18n locale for instant changes
      i18n.locale = newLanguage;
      setLanguageState(newLanguage);
      // Force a refresh after changing language
      setTimeout(forceRefresh, 0);
    } else {
      console.error(`Invalid language code: ${newLanguage}`);
    }
  };

  /**
   * Get a translated string by key using i18n-js
   * 
   * @param key The dot-notation key for the string (e.g., "common.next")
   * @param params Optional parameters for string interpolation
   * @returns The translated string
   */
  const t = (key: string, params?: Record<string, string | number>): string => {
    return i18n.t(key, params || {}) || key;
  };

  // Check if the current language is RTL (for future support)
  const isRTL = false; // Currently no RTL languages supported
  
  // Get list of supported languages for UI selection
  const getSupportedLanguages = () => SUPPORTED_LANGUAGES;

  // Create the context value - include refreshCounter to make consumers re-render
  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t,
    isRTL,
    getSupportedLanguages,
    forceRefresh
  };

  // The refresh counter in a comment makes React re-evaluate this component
  return (
    <LanguageContext.Provider value={contextValue}>
      {/* Refresh counter: {refreshCounter} - this forces re-renders */}
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Custom hook to use the language context
 * 
 * @throws Error if used outside a LanguageProvider
 * @returns The language context value
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
