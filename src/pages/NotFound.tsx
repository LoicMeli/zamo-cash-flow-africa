
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-zamo-light dark:bg-zamo-dark px-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold mb-4 text-primary-blue">404</h1>
        <p className="text-xl text-foreground mb-8">Page not found</p>
        <Link to="/dashboard">
          <Button className="zamo-btn-primary">
            <Home size={18} className="mr-2" />
            {t("common.home")}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
