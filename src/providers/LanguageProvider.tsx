
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { en } from '../lib/translations/en';
import { fr } from '../lib/translations/fr';

// Available languages
export type Language = 'en' | 'fr';

interface SupportedLanguage {
  code: Language;
  name: string;
  localName: string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  getSupportedLanguages: () => SupportedLanguage[];
}

const translations = {
  en,
  fr
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
  getSupportedLanguages: () => [],
});

const LANGUAGE_STORAGE_KEY = 'zamo_language';

export const LanguageProvider: React.FC<{ 
  children: React.ReactNode;
  defaultLanguage?: Language;
}> = ({ children, defaultLanguage = 'en' }) => {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);

  // Load saved language from storage
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
          setLanguageState(savedLanguage);
        }
      } catch (error) {
        console.error('Failed to load language setting:', error);
      }
    };
    
    loadLanguage();
  }, []);

  // Save language setting
  const setLanguage = async (newLanguage: Language) => {
    setLanguageState(newLanguage);
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
    } catch (error) {
      console.error('Failed to save language setting:', error);
    }
  };

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations[language];
    
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        // Fallback to English if key doesn't exist in current language
        result = getFromPath(translations.en, keys);
        break;
      }
    }
    
    return typeof result === 'string' ? result : key;
  };

  // Get list of supported languages
  const getSupportedLanguages = (): SupportedLanguage[] => {
    return [
      {
        code: 'en',
        name: 'English',
        localName: 'English'
      },
      {
        code: 'fr',
        name: 'French',
        localName: 'Français'
      }
    ];
  };

  const getFromPath = (obj: any, path: string[]): string => {
    let current = obj;
    
    for (const key of path) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        return path.join('.');
      }
    }
    
    return typeof current === 'string' ? current : path.join('.');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getSupportedLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
};
