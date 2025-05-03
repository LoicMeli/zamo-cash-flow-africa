
import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "@/lib/translations";

type Language = "en" | "fr" | "pidgin" | "camfran";

interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLanguage?: Language;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  reload: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  defaultLanguage = "en",
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem("zamo-language") as Language) || defaultLanguage
  );
  
  // Add a reload counter to force re-renders when needed
  const [reloadCounter, setReloadCounter] = useState(0);

  useEffect(() => {
    localStorage.setItem("zamo-language", language);
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  // Force a reload of translations
  const reload = () => {
    setReloadCounter(prev => prev + 1);
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split(".");
    let translation: any = translations[language];
    let fallbackTranslation: any = translations["en"];
    let result: string | null = null;
    
    // Try to get the translation from the selected language
    if (translation) {
      let currentTranslation = translation;
      let allKeysFound = true;
      
      for (const k of keys) {
        if (currentTranslation && typeof currentTranslation === 'object' && k in currentTranslation) {
          currentTranslation = currentTranslation[k];
        } else {
          allKeysFound = false;
          break;
        }
      }
      
      if (allKeysFound && typeof currentTranslation === 'string') {
        result = currentTranslation;
      }
    }
    
    // If translation not found in current language, try English
    if (result === null && language !== 'en') {
      let currentFallback = fallbackTranslation;
      let allKeysFound = true;
      
      for (const k of keys) {
        if (currentFallback && typeof currentFallback === 'object' && k in currentFallback) {
          currentFallback = currentFallback[k];
        } else {
          allKeysFound = false;
          break;
        }
      }
      
      if (allKeysFound && typeof currentFallback === 'string') {
        result = currentFallback;
      } else {
        // If still not found, return a formatted error message instead of the raw key
        result = `[Missing: ${key}]`;
      }
    }
    
    // Apply parameter replacements if we have a translation
    if (result !== null && params) {
      return Object.entries(params).reduce((str, [paramKey, value]) => {
        const regex = new RegExp(`{{${paramKey}}}`, 'g');
        return str.replace(regex, String(value));
      }, result);
    }
    
    return result || `[Missing: ${key}]`;
  };

  const value = {
    language,
    setLanguage: (newLang: Language) => {
      setLanguage(newLang);
      // Automatically reload after language change
      setTimeout(reload, 0);
    },
    t,
    reload,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
