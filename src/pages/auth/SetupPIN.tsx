
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { useLanguage } from "@/providers/LanguageProvider";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SetupPIN = () => {
  const [pin, setPin] = useState<string[]>(Array(4).fill(""));
  const [confirmPin, setConfirmPin] = useState<string[]>(Array(4).fill(""));
  const [step, setStep] = useState<"create" | "confirm">("create");
  const [isLoading, setIsLoading] = useState(false);
  const pinInputs = useRef<(HTMLInputElement | null)[]>([]);
  const { setupPIN } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    // Focus the first input on component mount or step change
    if (pinInputs.current[0]) {
      pinInputs.current[0].focus();
    }
  }, [step]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    
    // Only accept digits
    if (!/^\d*$/.test(value)) return;
    
    // Update the PIN array based on current step
    if (step === "create") {
      const newPin = [...pin];
      newPin[index] = value.slice(-1);
      setPin(newPin);
    } else {
      const newConfirmPin = [...confirmPin];
      newConfirmPin[index] = value.slice(-1);
      setConfirmPin(newConfirmPin);
    }
    
    // Auto-focus the next input
    if (value && index < 3 && pinInputs.current[index + 1]) {
      pinInputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const currentPin = step === "create" ? pin : confirmPin;
    
    // Move to previous input on backspace
    if (e.key === "Backspace" && !currentPin[index] && index > 0) {
      if (pinInputs.current[index - 1]) {
        pinInputs.current[index - 1]?.focus();
      }
    }
  };

  const handleCreatePin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const pinValue = pin.join("");
    if (pinValue.length !== 4) {
      toast.error("Please enter all 4 digits");
      return;
    }
    
    // Move to confirmation step
    setStep("confirm");
    pinInputs.current = [];
  };

  const handleConfirmPin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const confirmPinValue = confirmPin.join("");
    if (confirmPinValue.length !== 4) {
      toast.error("Please enter all 4 digits");
      return;
    }
    
    if (pin.join("") !== confirmPinValue) {
      toast.error("PINs don't match. Please try again.");
      setConfirmPin(Array(4).fill(""));
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await setupPIN(pin.join(""));
      if (success) {
        toast.success("PIN set successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {t("auth.pinSetup")}
      </h1>
      
      <p className="text-center text-muted-foreground mb-6">
        {step === "create" 
          ? t("auth.createPIN")
          : t("auth.confirmPIN")
        }
      </p>
      
      {step === "create" ? (
        <form onSubmit={handleCreatePin}>
          <div className="flex justify-center gap-3 mb-6">
            {pin.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (pinInputs.current[index] = el)}
                type="password"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="zamo-pin-input"
                aria-label={`PIN digit ${index + 1}`}
              />
            ))}
          </div>
          
          <p className="text-xs text-center text-muted-foreground mb-6">
            {t("auth.pinInstructions")}
          </p>
          
          <Button 
            type="submit" 
            className="zamo-btn-primary w-full"
          >
            {t("common.next")}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleConfirmPin}>
          <div className="flex justify-center gap-3 mb-6">
            {confirmPin.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (pinInputs.current[index] = el)}
                type="password"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="zamo-pin-input"
                aria-label={`Confirm PIN digit ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="flex gap-3">
            <Button 
              type="button" 
              variant="outline"
              className="flex-1"
              onClick={() => {
                setStep("create");
                setConfirmPin(Array(4).fill(""));
              }}
              disabled={isLoading}
            >
              {t("common.back")}
            </Button>
            
            <Button 
              type="submit" 
              className="zamo-btn-primary flex-1"
              disabled={isLoading}
            >
              {isLoading ? t("common.loading") : t("common.confirm")}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SetupPIN;
