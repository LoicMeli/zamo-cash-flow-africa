import { useAuth } from "@/providers/AuthProvider";
import { useLanguage } from "@/providers/LanguageProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { 
  Globe, 
  Moon, 
  Sun, 
  Laptop, 
  User, 
  Lock, 
  Bell, 
  HelpCircle, 
  Info, 
  LogOut,
  ChevronRight,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Settings = () => {
  const { logout } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  const handleWhatsAppSupport = () => {
    // In a real app, this would open WhatsApp with a pre-filled message
    toast.success(t("settings.whatsappSupportStarted"));
    window.open("https://wa.me/12345678901?text=Hello%20Zamo%20Support", "_blank");
  };
  
  const handleAboutZamo = () => {
    toast.info("Zamo v1.0.0 - Financial inclusivity for Africa");
  };

  return (
    <div className="space-y-6 py-2">
      <div>
        <h1 className="text-2xl font-bold mb-6">
          {t("settings.title")}
        </h1>
      </div>
      
      {/* Language */}
      <div className="zamo-card">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-3">
            <Globe className="text-primary-blue" size={20} />
            <span className="font-medium">{t("settings.language")}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-full h-8 ${language === 'en' ? 'bg-primary-blue text-white' : ''}`}
              onClick={() => setLanguage("en")}
            >
              🇬🇧 {t("settings.english")}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-full h-8 ${language === 'fr' ? 'bg-primary-blue text-white' : ''}`}
              onClick={() => setLanguage("fr")}
            >
              🇫🇷 {t("settings.french")}
            </Button>
          </div>
        </div>
        
        <div className="flex justify-end mt-2">
          <Button
            variant="ghost"
            size="sm"
            className={`rounded-full h-8 ${language === 'pidgin' ? 'bg-primary-blue text-white' : ''}`}
            onClick={() => setLanguage("pidgin")}
          >
            🇳🇬 {t("settings.pidgin")}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`rounded-full h-8 ${language === 'camfran' ? 'bg-primary-blue text-white' : ''} ml-2`}
            onClick={() => setLanguage("camfran")}
          >
            🇨🇲 {t("settings.camfran")}
          </Button>
        </div>
      </div>
      
      {/* Theme */}
      <div className="zamo-card">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-3">
            {theme === "dark" ? (
              <Moon className="text-primary-blue" size={20} />
            ) : (
              <Sun className="text-primary-blue" size={20} />
            )}
            <span className="font-medium">{t("settings.theme")}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-full h-8 ${theme === 'light' ? 'bg-primary-blue text-white' : ''}`}
              onClick={() => setTheme("light")}
            >
              <Sun size={16} className="mr-1" /> {t("settings.light")}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-full h-8 ${theme === 'dark' ? 'bg-primary-blue text-white' : ''}`}
              onClick={() => setTheme("dark")}
            >
              <Moon size={16} className="mr-1" /> {t("settings.dark")}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-full h-8 ${theme === 'system' ? 'bg-primary-blue text-white' : ''}`}
              onClick={() => setTheme("system")}
            >
              <Laptop size={16} className="mr-1" /> {t("settings.system")}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Other settings */}
      <div className="zamo-card space-y-4">
        <div className="flex items-center justify-between" onClick={() => navigate("/profile")}>
          <div className="flex items-center space-x-3">
            <User className="text-primary-blue" size={20} />
            <span className="font-medium">{t("settings.profile")}</span>
          </div>
          <Button variant="ghost" size="sm" className="rounded-full h-8">
            <ChevronRight size={18} />
          </Button>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between" onClick={() => navigate("/settings/security")}>
          <div className="flex items-center space-x-3">
            <Lock className="text-primary-blue" size={20} />
            <span className="font-medium">{t("settings.security")}</span>
          </div>
          <Button variant="ghost" size="sm" className="rounded-full h-8">
            <ChevronRight size={18} />
          </Button>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between" onClick={() => navigate("/notifications")}>
          <div className="flex items-center space-x-3">
            <Bell className="text-primary-blue" size={20} />
            <span className="font-medium">{t("settings.notifications")}</span>
          </div>
          <Button variant="ghost" size="sm" className="rounded-full h-8">
            <ChevronRight size={18} />
          </Button>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between" onClick={handleWhatsAppSupport}>
          <div className="flex items-center space-x-3">
            <MessageCircle className="text-primary-blue" size={20} />
            <span className="font-medium">{t("settings.whatsappSupport")}</span>
          </div>
          <Button variant="ghost" size="sm" className="rounded-full h-8">
            <ChevronRight size={18} />
          </Button>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between" onClick={handleAboutZamo}>
          <div className="flex items-center space-x-3">
            <Info className="text-primary-blue" size={20} />
            <span className="font-medium">{t("settings.about")}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            {t("settings.version")} 1.0.0
          </span>
        </div>
      </div>
      
      {/* Logout */}
      <div className="pt-4">
        <Button 
          variant="destructive"
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut size={16} className="mr-2" />
          {t("auth.logout")}
        </Button>
      </div>
    </div>
  );
};

export default Settings;
