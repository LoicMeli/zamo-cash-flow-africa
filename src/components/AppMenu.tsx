
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageSquare, Settings, MapPin, Wallet, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/providers/LanguageProvider";

const AppMenu = () => {
  const { t } = useLanguage();
  
  const menuItems = [
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
    {
      icon: Users,
      label: t("common.becomeAgent"),
      href: "/become-agent",
      highlight: true,
    },
    {
      icon: Users,
      label: t("common.agentSpace"),
      href: "/agent-space",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-8 h-8 flex items-center justify-center text-lg font-bold text-primary-blue">
          Z
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Services</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuItems.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <Link 
              to={item.href} 
              className={`flex items-center gap-2 cursor-pointer ${item.highlight ? "text-primary-blue font-medium" : ""}`}
            >
              <item.icon className={`w-4 h-4 ${item.highlight ? "text-primary-blue" : ""}`} />
              <span>{item.label}</span>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/settings" className="flex items-center gap-2 cursor-pointer">
            <Settings className="w-4 h-4" />
            <span>{t("common.settings")}</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppMenu;
