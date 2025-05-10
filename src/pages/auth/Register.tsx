
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { useLanguage } from "@/providers/LanguageProvider";
import { formatPhoneNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Register = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedPhone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!fullName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    
    const digits = phoneNumber.replace(/\D/g, "");
    if (digits.length < 9) {
      toast.error("Please enter a valid phone number");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, we would register the user first
      // For now, we're reusing the login flow
      await login(digits);
      navigate("/verify");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {t("auth.register")}
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-2">
            {t("auth.fullName")}
          </label>
          <Input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={t("auth.enterFullName")}
            className="zamo-input"
            autoComplete="name"
            required
          />
        </div>
        
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium mb-2">
            {t("auth.phoneNumber")}
          </label>
          <Input
            id="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder={t("auth.enterPhone")}
            className="zamo-input"
            autoComplete="tel"
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="zamo-btn-primary w-full"
          disabled={isLoading}
        >
          {isLoading ? t("common.loading") : t("auth.register")}
        </Button>
        
        <div className="text-center text-sm">
          <span className="text-muted-foreground">
            {t("auth.alreadyHaveAccount")} 
          </span>{" "}
          <Link to="/login" className="text-primary-blue font-medium hover:underline">
            {t("auth.login")}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
