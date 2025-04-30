
import { Home, Send, QrCode, MapPin, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/LanguageProvider";

const BottomNavigation = () => {
  const location = useLocation();
  const { t } = useLanguage();
  
  const navItems = [
    {
      icon: Home,
      label: t("common.home"),
      href: "/dashboard",
    },
    {
      icon: Send,
      label: t("common.send"),
      href: "/send",
    },
    {
      icon: QrCode,
      label: t("common.scan"),
      href: "/scan",
    },
    {
      icon: MapPin,
      label: t("common.agents"),
      href: "/agents",
    },
    {
      icon: Settings,
      label: t("common.settings"),
      href: "/settings",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card dark:bg-card border-t border-border z-10">
      <div className="max-w-md mx-auto px-1">
        <div className="flex justify-between">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex flex-col items-center py-2 px-3 text-xs transition-colors",
                  isActive
                    ? "text-primary-blue"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon
                  size={20}
                  className={cn(
                    isActive && "text-primary-blue"
                  )}
                />
                <span className="mt-1 font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
