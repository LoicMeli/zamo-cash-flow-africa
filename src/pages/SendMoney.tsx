
import React, { useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { useAuth } from "@/providers/AuthProvider";
import { formatCurrency, formatPhoneNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Step = "recipient" | "amount" | "review" | "success";

const SendMoney = () => {
  const [step, setStep] = useState<Step>("recipient");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setRecipient(formattedPhone);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAmount(value);
  };

  const handleNextStep = () => {
    if (step === "recipient") {
      // Validate phone number
      const digits = recipient.replace(/\D/g, "");
      if (digits.length < 9) {
        toast.error("Please enter a valid phone number");
        return;
      }
      setStep("amount");
    } else if (step === "amount") {
      // Validate amount
      const amountValue = Number(amount);
      if (!amountValue || amountValue <= 0) {
        toast.error("Please enter a valid amount");
        return;
      }
      if (amountValue > (user?.balance || 0)) {
        toast.error("Insufficient balance");
        return;
      }
      setStep("review");
    } else if (step === "review") {
      // Process transfer
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep("success");
        
        // Create confetti effect on success
        const container = document.getElementById("success-container");
        if (container) {
          for (let i = 0; i < 50; i++) {
            const confetti = document.createElement("div");
            confetti.className = "absolute animate-confetti";
            confetti.style.left = Math.random() * 100 + "%";
            confetti.style.top = Math.random() * 50 + "%";
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
            confetti.style.width = Math.random() * 10 + 5 + "px";
            confetti.style.height = Math.random() * 10 + 5 + "px";
            confetti.style.borderRadius = "50%";
            container.appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => {
              confetti.remove();
            }, 1500);
          }
        }
      }, 1500);
    }
  };

  const handlePreviousStep = () => {
    if (step === "amount") {
      setStep("recipient");
    } else if (step === "review") {
      setStep("amount");
    }
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="space-y-6 py-2">
      {step !== "success" && (
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={step === "recipient" ? handleBackToDashboard : handlePreviousStep}
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-bold">
            {t("transfer.title")}
          </h1>
          <div className="w-9"></div> {/* Spacer for alignment */}
        </div>
      )}
      
      {step === "recipient" && (
        <div className="animate-fade-in">
          <div className="zamo-card mb-6">
            <label className="block text-sm font-medium mb-2">
              {t("transfer.recipient")}
            </label>
            <Input
              value={recipient}
              onChange={handlePhoneChange}
              placeholder={t("transfer.enterRecipient")}
              className="zamo-input mb-6"
              inputMode="tel"
            />
            
            <Button 
              className="zamo-btn-primary w-full"
              onClick={handleNextStep}
            >
              {t("common.next")}
            </Button>
          </div>
        </div>
      )}
      
      {step === "amount" && (
        <div className="animate-fade-in">
          <div className="zamo-card mb-6">
            <label className="block text-sm font-medium mb-2">
              {t("transfer.amount")}
            </label>
            <div className="relative mb-6">
              <Input
                value={amount}
                onChange={handleAmountChange}
                placeholder="0"
                className="zamo-input text-2xl text-center font-bold pr-16"
                inputMode="numeric"
                autoFocus
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                FCFA
              </span>
            </div>
            
            <Button 
              className="zamo-btn-primary w-full"
              onClick={handleNextStep}
              disabled={!amount || parseInt(amount) <= 0}
            >
              {t("common.next")}
            </Button>
          </div>
        </div>
      )}
      
      {step === "review" && (
        <div className="animate-fade-in">
          <div className="zamo-card mb-6">
            <h2 className="text-lg font-semibold mb-4">
              {t("transfer.review")}
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("transfer.recipient")}</span>
                <span className="font-medium">{recipient}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("transfer.amount")}</span>
                <span className="font-medium">{formatCurrency(parseInt(amount))} FCFA</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("transfer.fee")}</span>
                <span className="text-green-600 font-medium">{t("transfer.free")}</span>
              </div>
              
              <div className="pt-2 border-t border-border flex justify-between">
                <span className="font-medium">{t("transfer.total")}</span>
                <span className="font-bold">{formatCurrency(parseInt(amount))} FCFA</span>
              </div>
            </div>
            
            <Button 
              className="zamo-btn-primary w-full flex items-center"
              onClick={handleNextStep}
              disabled={isLoading}
            >
              {isLoading ? (
                t("common.loading")
              ) : (
                <>
                  <Send size={18} className="mr-2" />
                  {t("transfer.sendNow")}
                </>
              )}
            </Button>
          </div>
        </div>
      )}
      
      {step === "success" && (
        <div id="success-container" className="relative animate-fade-in h-[500px] flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <Check size={40} className="text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2">
            {t("transfer.success")}
          </h2>
          
          <p className="text-center mb-6 text-muted-foreground">
            {t("transfer.successMessage")}
          </p>
          
          <div className="zamo-card w-full mb-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("transfer.recipient")}</span>
                <span className="font-medium">{recipient}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("transfer.amount")}</span>
                <span className="font-medium">{formatCurrency(parseInt(amount))} FCFA</span>
              </div>
            </div>
          </div>
          
          <Button 
            className="zamo-btn-primary w-full"
            onClick={handleBackToDashboard}
          >
            {t("common.home")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SendMoney;
