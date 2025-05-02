
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Moon, Sun, MonitorSmartphone } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import { cn } from "@/lib/utils";

interface ThemeSwitcherProps {
  onLanguageChange?: () => void;
}

const ThemeSwitcher = ({ onLanguageChange }: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  
  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    if (onLanguageChange) onLanguageChange();
  };

  return (
    <div className="flex flex-col space-y-2">
      <Button
        variant="outline"
        size="lg"
        className={cn(
          "justify-start h-14 px-4",
          theme === "light" && "border-primary-blue bg-primary-blue/5"
        )}
        onClick={() => handleThemeChange("light")}
      >
        <Sun className="mr-2 h-5 w-5" />
        <span>{t("settings.theme.light")}</span>
      </Button>
      
      <Button
        variant="outline"
        size="lg"
        className={cn(
          "justify-start h-14 px-4",
          theme === "dark" && "border-primary-blue bg-primary-blue/5"
        )}
        onClick={() => handleThemeChange("dark")}
      >
        <Moon className="mr-2 h-5 w-5" />
        <span>{t("settings.theme.dark")}</span>
      </Button>
      
      <Button
        variant="outline"
        size="lg"
        className={cn(
          "justify-start h-14 px-4",
          theme === "system" && "border-primary-blue bg-primary-blue/5"
        )}
        onClick={() => handleThemeChange("system")}
      >
        <MonitorSmartphone className="mr-2 h-5 w-5" />
        <span>{t("settings.theme.system")}</span>
      </Button>
    </div>
  );
};

export default ThemeSwitcher;
