
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { en } from '../lib/translations/en';
import { fr } from '../lib/translations/fr';
import { pidgin } from '../lib/translations/pidgin';

// Export this constant so it can be used in other files
export const LANGUAGE_STORAGE_KEY = 'zamo_language';

// Define supported languages
export type Language = 'en' | 'fr' | 'pidgin';

// Type for language pack structure
export type LanguagePack = typeof en;

// Language context type definition
export interface LanguageContextType {
  language: Language;
  t: (key: string) => string;
  setLanguage: (lang: Language) => void;
  getSupportedLanguages: () => {code: Language; name: string; localName: string}[];
  forceRefresh: () => void;
}

const languageMap: Record<Language, LanguagePack> = {
  en,
  fr,
  pidgin
};

const initialLanguageContext: LanguageContextType = {
  language: 'en',
  t: (key: string) => key,
  setLanguage: () => {},
  getSupportedLanguages: () => [],
  forceRefresh: () => {}
};

const LanguageContext = createContext<LanguageContextType>(initialLanguageContext);

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLanguage?: Language;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ 
  children, 
  defaultLanguage = 'en' 
}) => {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [refreshCounter, setRefreshCounter] = useState(0);

  // Load saved language preference
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr' || savedLanguage === 'pidgin')) {
          setLanguageState(savedLanguage as Language);
        }
      } catch (error) {
        console.error('Failed to load language preference:', error);
      }
    };
    
    loadLanguage();
  }, []);

  // Function to set language and save preference
  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  };

  // Function to force UI refresh
  const forceRefresh = () => {
    setRefreshCounter(prev => prev + 1);
  };

  // Translation function
  const t = (key: string) => {
    try {
      // Split the key by dots to navigate through nested objects
      const keys = key.split('.');
      let value: any = languageMap[language];
      
      // Traverse the object using the keys
      for (const k of keys) {
        if (value[k] === undefined) {
          console.warn(`Translation key not found: ${key}`);
          return key; // Return the key itself if not found
        }
        value = value[k];
      }
      
      // If the value is not a string at this point, it's a nested object
      if (typeof value !== 'string') {
        console.warn(`Translation key leads to an object, not a string: ${key}`);
        return key;
      }
      
      return value;
    } catch (error) {
      console.error('Translation error:', error);
      return key; // Return the key itself in case of error
    }
  };

  // Get list of supported languages
  const getSupportedLanguages = () => [
    { code: 'en', name: 'English', localName: 'English' },
    { code: 'fr', name: 'French', localName: 'Français' },
    { code: 'pidgin', name: 'Pidgin', localName: 'Pidgin' }
  ];

  // Context value with the refresh counter to trigger re-renders
  const contextValue: LanguageContextType = {
    language,
    t,
    setLanguage,
    getSupportedLanguages,
    forceRefresh
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
