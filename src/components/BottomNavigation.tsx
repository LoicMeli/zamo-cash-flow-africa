
import { Home, Send, QrCode, MapPin, Wallet, MessageSquare, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/LanguageProvider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const BottomNavigation = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  
  const mainNavItems = [
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
      icon: Wallet,
      label: "More",
      href: "#",
      isSheet: true
    },
    {
      icon: Settings,
      label: t("common.settings"),
      href: "/settings",
    },
  ];
  
  const moreNavItems = [
    {
      icon: MapPin,
      label: t("common.agents"),
      href: "/agents",
    },
    {
      icon: Wallet,
      label: "Family Wallet",
      href: "/family",
    },
    {
      icon: Wallet,
      label: "Group Savings",
      href: "/group-savings",
    },
    {
      icon: Wallet,
      label: "Family Bills",
      href: "/family-bills",
    },
    {
      icon: MessageSquare,
      label: "Financial Coach",
      href: "/financial-coach",
    },
  ];

  const handleSheetItemClick = () => {
    setOpen(false);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card dark:bg-card border-t border-border z-10">
      <div className="max-w-md mx-auto px-1">
        <div className="flex justify-between">
          {mainNavItems.map((item) => {
            const isActive = location.pathname === item.href;
            
            if (item.isSheet) {
              return (
                <Sheet key={item.label} open={open} onOpenChange={setOpen}>
                  <SheetTrigger asChild>
                    <button
                      className={cn(
                        "flex flex-col items-center py-2 px-3 text-xs transition-colors",
                        open
                          ? "text-primary-blue"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <item.icon
                        size={20}
                        className={cn(
                          open && "text-primary-blue"
                        )}
                      />
                      <span className="mt-1 font-medium">{item.label}</span>
                    </button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-auto rounded-t-xl pt-6 pb-10">
                    <div className="grid grid-cols-3 gap-6">
                      {moreNavItems.map((moreItem) => (
                        <Link
                          key={moreItem.href}
                          to={moreItem.href}
                          className="flex flex-col items-center text-center"
                          onClick={handleSheetItemClick}
                        >
                          <div className="w-12 h-12 rounded-full bg-primary-blue/10 flex items-center justify-center mb-2">
                            <moreItem.icon size={20} className="text-primary-blue" />
                          </div>
                          <span className="text-sm font-medium">{moreItem.label}</span>
                        </Link>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              );
            }
            
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
