
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'en' | 'fr' | 'camfran';

export const LANGUAGE_STORAGE_KEY = 'zamo_language';

// Define a translation function type
type TranslateFunction = (key: string, params?: Record<string, any>) => string;

// Define context type
type LanguageContextType = {
  language: Language;
  t: TranslateFunction;
  changeLanguage: (lang: Language) => Promise<void>;
  setLanguage: (lang: Language) => void;
  forceRefresh: () => void;
  getSupportedLanguages: () => Array<{ code: Language; name: string; }>;
};

// Create context
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  t: (key: string) => key,
  changeLanguage: async () => {},
  setLanguage: () => {},
  forceRefresh: () => {},
  getSupportedLanguages: () => [],
});

// Mock translations
const translations: Record<Language, Record<string, any>> = {
  en: {
    common: {
      back: 'Back',
      next: 'Next',
      confirm: 'Confirm',
      cancel: 'Cancel',
      continue: 'Continue',
      morningGreeting: 'Good morning',
      afternoonGreeting: 'Good afternoon',
      eveningGreeting: 'Good evening',
    },
    dashboard: {
      noTransactions: 'No transactions yet',
      availableBalance: 'Available balance',
    },
    auth: {
      welcome: 'Welcome to Zamo',
      pinSetup: 'Create your PIN',
      pinMustBeDigits: 'PIN must be 4 digits',
      pinsDoNotMatch: 'PINs do not match',
      createPinDescription: 'Create a secure 4-digit PIN',
      confirmPinCode: 'Enter your PIN again',
      confirmPin: 'Confirm PIN',
      confirmation: 'Confirm PIN',
    },
  },
  fr: {
    common: {
      back: 'Retour',
      next: 'Suivant',
      confirm: 'Confirmer',
      cancel: 'Annuler',
      continue: 'Continuer',
      morningGreeting: 'Bonjour',
      afternoonGreeting: 'Bon après-midi',
      eveningGreeting: 'Bonsoir',
    },
    dashboard: {
      noTransactions: 'Pas encore de transactions',
      availableBalance: 'Solde disponible',
    },
    auth: {
      welcome: 'Bienvenue à Zamo',
      pinSetup: 'Créer votre PIN',
      pinMustBeDigits: 'Le PIN doit être à 4 chiffres',
      pinsDoNotMatch: 'Les PINs ne correspondent pas',
      createPinDescription: 'Créez un code PIN sécurisé à 4 chiffres',
      confirmPinCode: 'Entrez votre code PIN à nouveau',
      confirmPin: 'Confirmer PIN',
      confirmation: 'Confirmation du PIN',
    },
  },
  camfran: {
    common: {
      back: 'Go back',
      next: 'Next',
      confirm: 'Confirm',
      cancel: 'Cancel',
      continue: 'Continue',
      morningGreeting: 'Good morning',
      afternoonGreeting: 'Good afternoon',
      eveningGreeting: 'Good evening',
    },
    dashboard: {
      noTransactions: 'No money movement for now',
      availableBalance: 'Money wey dey',
    },
    auth: {
      welcome: 'Welcome for Zamo',
      pinSetup: 'Create your PIN',
      pinMustBeDigits: 'PIN must be 4 numbers',
      pinsDoNotMatch: 'The PINs no match',
      createPinDescription: 'Create secure 4-number PIN',
      confirmPinCode: 'Enter PIN again',
      confirmPin: 'Confirm PIN',
      confirmation: 'Confirm PIN',
    },
  },
};

// Translation helper function
const translate = (language: Language, key: string, params?: Record<string, any>): string => {
  // Split the key by dot notation to access nested properties
  const keys = key.split('.');
  let translation: any = translations[language];

  // Navigate through the nested objects
  for (const k of keys) {
    if (!translation[k]) return key; // Return key if translation not found
    translation = translation[k];
  }

  // If it's not a string, return the key
  if (typeof translation !== 'string') return key;

  // Replace parameters if they exist
  if (params) {
    return Object.entries(params).reduce((result, [paramKey, value]) => {
      return result.replace(`{${paramKey}}`, value.toString());
    }, translation);
  }

  return translation;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [isLoaded, setIsLoaded] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Load saved language on mount
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (savedLanguage) {
          setLanguage(savedLanguage as Language);
        }
      } catch (error) {
        console.error('Failed to load language:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadLanguage();
  }, []);

  const changeLanguage = async (lang: Language) => {
    setLanguage(lang);
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch (error) {
      console.error('Failed to save language:', error);
    }
  };

  const forceRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const t: TranslateFunction = (key, params) => {
    return translate(language, key, params);
  };

  // Fix the getSupportedLanguages function to explicitly return Language type
  const getSupportedLanguages = () => {
    return [
      { code: 'en' as Language, name: 'English' },
      { code: 'fr' as Language, name: 'Français' },
      { code: 'camfran' as Language, name: 'Camfranglais' }
    ];
  };

  if (!isLoaded) {
    return null; // Or return a loading indicator
  }

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        t, 
        changeLanguage, 
        setLanguage, 
        forceRefresh,
        getSupportedLanguages 
      }}
      key={refreshKey}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
