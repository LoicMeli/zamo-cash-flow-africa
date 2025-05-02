
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useLanguage } from "@/providers/LanguageProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { 
  User, Shield, Bell, Languages, Palette, HelpCircle, 
  Info, LogOut, ChevronRight, Lock, QrCode, Gift 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const Settings = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const [showThemeDialog, setShowThemeDialog] = useState(false);
  
  const settingsOptions = [
    {
      icon: User,
      label: t("settings.profile"),
      action: () => navigate("/profile"),
    },
    {
      icon: Shield,
      label: t("settings.security"),
      action: () => navigate("/settings/security"),
    },
    {
      icon: Bell,
      label: t("settings.notifications"),
      action: () => navigate("/settings/notifications"),
    },
    {
      icon: Languages,
      label: t("settings.language"),
      action: () => setShowLanguageDialog(true),
    },
    {
      icon: Palette,
      label: t("settings.appearance"),
      action: () => setShowThemeDialog(true),
    },
    {
      icon: QrCode,
      label: t("wallet.personalQR"),
      action: () => navigate("/wallet"),
      info: t("wallet.qrDescription")
    },
    {
      icon: Gift,
      label: t("referral.title"),
      action: () => navigate("/referral"),
      info: t("referral.subtitle")
    },
    {
      icon: HelpCircle,
      label: t("settings.help"),
      action: () => {
        // In a real app this would link to help resources
        toast.info("Support & help resources coming soon");
      },
    },
    {
      icon: Info,
      label: t("settings.about"),
      action: () => {
        // In a real app this would show an about dialog
        toast.info("Zamo v1.0.0");
      },
      info: `v1.0.0`
    },
    {
      icon: LogOut,
      label: t("settings.logout"),
      action: logout,
      danger: true,
    },
  ];
  
  return (
    <div className="space-y-6 py-2">
      <h1 className="text-xl font-bold">
        {t("settings.title")}
      </h1>
      
      <div className="space-y-1">
        {settingsOptions.map((option, index) => (
          <Button
            key={index}
            variant="ghost"
            className={`w-full justify-start py-6 px-4 mb-0.5 ${
              option.danger ? "text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50" : ""
            }`}
            onClick={option.action}
          >
            <option.icon size={20} className="mr-3" />
            <span className="flex-1 text-left">{option.label}</span>
            {option.info && (
              <span className="text-xs text-muted-foreground mr-1">{option.info}</span>
            )}
            {!option.danger && <ChevronRight size={16} />}
          </Button>
        ))}
      </div>
      
      {/* Language Selection Dialog */}
      <Dialog open={showLanguageDialog} onOpenChange={setShowLanguageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("settings.language")}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <LanguageSwitcher onLanguageChange={() => setShowLanguageDialog(false)} />
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Theme Selection Dialog */}
      <Dialog open={showThemeDialog} onOpenChange={setShowThemeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("settings.theme.title")}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <ThemeSwitcher onLanguageChange={() => setShowThemeDialog(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
