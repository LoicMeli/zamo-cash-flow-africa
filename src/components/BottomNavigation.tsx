
import { Home, Wallet, MapPin, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/LanguageProvider";
import { motion } from "framer-motion";

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
      icon: Wallet,
      label: t("common.wallet"),
      href: "/wallet",
    },
    {
      icon: MapPin,
      label: t("common.agents"),
      href: "/agents",
    },
    {
      icon: User,
      label: t("common.profile"),
      href: "/profile",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/80 dark:bg-card/60 backdrop-blur-lg border-t border-border z-10">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex flex-col items-center py-3 px-5 relative",
                  isActive
                    ? "text-primary-blue"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="navIndicator"
                    className="absolute -top-2 w-1 h-1 rounded-full bg-primary-blue"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon
                  size={20}
                  className={cn(
                    isActive ? "text-primary-blue" : "text-muted-foreground"
                  )}
                />
                <span className="mt-1 text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
