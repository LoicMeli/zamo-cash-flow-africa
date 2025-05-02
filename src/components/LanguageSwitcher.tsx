
import { useLanguage } from "@/providers/LanguageProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  onLanguageChange?: () => void;
}

const LanguageSwitcher = ({ onLanguageChange }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as any);
    if (onLanguageChange) onLanguageChange();
  };

  return (
    <div className="flex items-center space-x-1 bg-secondary rounded-full p-1 flex-wrap">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "rounded-full px-3 h-8 text-sm font-medium",
          language === "en" && "bg-white dark:bg-primary shadow-sm"
        )}
        onClick={() => handleLanguageChange("en")}
      >
        🇬🇧 EN
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "rounded-full px-3 h-8 text-sm font-medium",
          language === "fr" && "bg-white dark:bg-primary shadow-sm"
        )}
        onClick={() => handleLanguageChange("fr")}
      >
        🇫🇷 FR
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "rounded-full px-3 h-8 text-sm font-medium",
          language === "pidgin" && "bg-white dark:bg-primary shadow-sm"
        )}
        onClick={() => handleLanguageChange("pidgin")}
      >
        🇨🇲 Pidgin
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "rounded-full px-3 h-8 text-sm font-medium",
          language === "camfran" && "bg-white dark:bg-primary shadow-sm"
        )}
        onClick={() => handleLanguageChange("camfran")}
      >
        🇨🇲 Camfran
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
