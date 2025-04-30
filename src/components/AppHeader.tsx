
import { Bell } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { useLanguage } from "@/providers/LanguageProvider";
import ZamoLogo from "./ZamoLogo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const AppHeader = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const userInitial = user?.name ? user.name[0].toUpperCase() : "Z";

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-md border-b border-border z-10">
      <div className="max-w-md mx-auto h-full flex items-center justify-between px-4">
        <ZamoLogo size="sm" />
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary-blue rounded-full"></span>
          </button>
          
          <Link to="/settings">
            <Avatar className="h-9 w-9 border-2 border-primary-blue/20">
              {user?.photoURL ? (
                <img src={user.photoURL} alt={user.name || "User"} />
              ) : (
                <AvatarFallback className="bg-primary-blue/10 text-primary-blue">
                  {userInitial}
                </AvatarFallback>
              )}
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
