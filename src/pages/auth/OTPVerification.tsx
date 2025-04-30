
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { useLanguage } from "@/providers/LanguageProvider";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const OTPVerification = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);
  const { verifyOTP } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    // Focus the first input on component mount
    if (otpInputs.current[0]) {
      otpInputs.current[0].focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    
    // Only accept digits
    if (!/^\d*$/.test(value)) return;
    
    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    
    // Auto-focus the next input
    if (value && index < 5 && otpInputs.current[index + 1]) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      if (otpInputs.current[index - 1]) {
        otpInputs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await verifyOTP(otpValue);
      if (success) {
        navigate("/setup-pin");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = () => {
    toast.info("A new code has been sent to your phone");
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {t("auth.otpVerification")}
      </h1>
      
      <p className="text-center text-muted-foreground mb-6">
        {t("auth.enterOTP")} <br />
        +237 XXX XXX XXX
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (otpInputs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="zamo-pin-input w-10 h-12"
              aria-label={`Digit ${index + 1}`}
            />
          ))}
        </div>
        
        <Button 
          type="submit" 
          className="zamo-btn-primary w-full mb-4"
          disabled={isLoading}
        >
          {isLoading ? t("common.loading") : t("auth.verifyOTP")}
        </Button>
      </form>
      
      <div className="text-center">
        <Button
          variant="link"
          size="sm"
          onClick={handleResendOtp}
          className="text-primary-blue"
        >
          {t("auth.resendOTP")}
        </Button>
      </div>
    </div>
  );
};

export default OTPVerification;
