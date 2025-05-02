
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
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  defaultLanguage = "en",
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem("zamo-language") as Language) || defaultLanguage
  );

  useEffect(() => {
    localStorage.setItem("zamo-language", language);
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split(".");
    let translation: any = translations[language];
    
    for (const k of keys) {
      if (translation && typeof translation === 'object' && k in translation) {
        translation = translation[k];
      } else {
        // If translation not found in current language, fallback to English
        if (language !== 'en') {
          let fallback: any = translations['en'];
          for (const k of keys) {
            if (fallback && typeof fallback === 'object' && k in fallback) {
              fallback = fallback[k];
            } else {
              return key; // If not found in English either, return key
            }
          }
          if (typeof fallback === 'string') {
            translation = fallback;
          } else {
            return key;
          }
        } else {
          return key;
        }
      }
    }
    
    // Check if the final result is a string
    if (typeof translation === 'string') {
      // If params are provided, replace placeholders
      if (params) {
        return Object.entries(params).reduce((str, [key, value]) => {
          const regex = new RegExp(`{{${key}}}`, 'g');
          return str.replace(regex, String(value));
        }, translation);
      }
      return translation;
    } else {
      // If it's an object, return the key as fallback
      return key;
    }
  };

  const value = {
    language,
    setLanguage,
    t,
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
