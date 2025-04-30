
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { useLanguage } from "@/providers/LanguageProvider";
import { formatPhoneNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
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
    const digits = phoneNumber.replace(/\D/g, "");
    if (digits.length < 9) {
      toast.error("Please enter a valid phone number");
      return;
    }
    
    setIsLoading(true);
    
    try {
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
        {t("auth.login")}
      </h1>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
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
          {isLoading ? t("common.loading") : t("auth.sendOTP")}
        </Button>
      </form>
    </div>
  );
};

export default Login;
