
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import ZamoLogo from "@/components/ZamoLogo";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Add a slight delay for the animation
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50 dark:from-zamo-dark dark:to-blue-950">
      <div className="animate-pulse">
        <ZamoLogo size="lg" />
      </div>
      <p className="mt-4 text-muted-foreground animate-fade-in">Mobile Money for Central Africa</p>
    </div>
  );
};

export default Index;
