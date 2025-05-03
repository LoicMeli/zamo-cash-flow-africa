
import { useLanguage } from "@/providers/LanguageProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { Languages } from "lucide-react";

interface LanguageSwitcherProps {
  onLanguageChange?: () => void;
}

const LanguageSwitcher = ({ onLanguageChange }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguage();
  const isMobile = useIsMobile();

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as any);
    if (onLanguageChange) onLanguageChange();
  };

  // Language options with flags
  const languageOptions = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "pidgin", label: "Pidgin", flag: "🇨🇲" },
    { code: "camfran", label: "Camfranglais", flag: "🇨🇲" }
  ];

  // For small screens, show a dropdown menu
  if (isMobile) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2">
            <Languages size={16} />
            {languageOptions.find(l => l.code === language)?.flag}
            <span className="sr-only">Change language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {languageOptions.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={cn(
                language === lang.code && "bg-accent font-medium"
              )}
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // For larger screens, show all options
  return (
    <div className="flex items-center space-x-1 bg-secondary rounded-full p-1 flex-wrap">
      {languageOptions.map((lang) => (
        <Button
          key={lang.code}
          variant="ghost"
          size="sm"
          className={cn(
            "rounded-full px-3 h-8 text-sm font-medium",
            language === lang.code && "bg-white dark:bg-primary shadow-sm"
          )}
          onClick={() => handleLanguageChange(lang.code)}
        >
          {lang.flag} {lang.code === "en" || lang.code === "fr" 
            ? lang.code.toUpperCase() 
            : lang.label.slice(0, 6)}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
