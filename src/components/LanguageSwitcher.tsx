
import { useLanguage } from "@/providers/LanguageProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-1 bg-secondary rounded-full p-1 flex-wrap">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "rounded-full px-3 h-8 text-sm font-medium",
          language === "en" && "bg-white dark:bg-primary shadow-sm"
        )}
        onClick={() => setLanguage("en")}
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
        onClick={() => setLanguage("fr")}
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
        onClick={() => setLanguage("pidgin")}
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
        onClick={() => setLanguage("camfran")}
      >
        🇨🇲 Camfran
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
