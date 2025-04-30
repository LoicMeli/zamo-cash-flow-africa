
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import ZamoLogo from "@/components/ZamoLogo";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/LanguageProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const { t } = useLanguage();

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-white to-blue-50 dark:from-zamo-dark dark:to-blue-950">
      <div className="zamo-container justify-between">
        <div className="flex justify-between items-center mb-8 pt-4">
          <ZamoLogo size="md" />
          <LanguageSwitcher />
        </div>
        
        <div className={cn(
          "grow flex flex-col justify-center items-center px-5",
          "transition-opacity duration-300",
        )}>
          <div className="w-full max-w-sm glass-card p-6 shadow-lg">
            <Outlet />
          </div>
        </div>
        
        <div className="mt-auto pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Zamo</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
