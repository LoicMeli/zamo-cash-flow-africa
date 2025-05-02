
import { useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { ArrowLeft, Check, CreditCard, Smartphone, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Step = "amount" | "details" | "confirmation" | "success";

const TopUpMethod = () => {
  const { t } = useLanguage();
  const { method } = useParams<{ method: string }>();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState("");
  const [provider, setProvider] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Get method title and icon
  const getMethodInfo = () => {
    switch (method) {
      case "card":
        return { 
          title: "Credit or Debit Card",
          icon: CreditCard
        };
      case "mobile-money":
        return { 
          title: "Mobile Money",
          icon: Smartphone
        };
      case "bank-transfer":
        return { 
          title: "Bank Transfer",
          icon: Building
        };
      default:
        return { 
          title: "Top Up",
          icon: CreditCard
        };
    }
  };
  
  const methodInfo = getMethodInfo();
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAmount(value);
  };
  
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9+]/g, "");
    setPhoneNumber(value);
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9\s]/g, "");
    setCardNumber(value);
  };
  
  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9/]/g, "");
    setCardExpiry(value);
  };
  
  const handleCardCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 3) {
      setCardCvv(value);
    }
  };
  
  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAccountNumber(value);
  };
  
  const handleNextStep = () => {
    if (step === "amount") {
      if (!amount || parseInt(amount) <= 0) {
        toast.error(t("topup.invalidAmount"));
        return;
      }
      setStep("details");
    } else if (step === "details") {
      // Validate according to the method
      let isValid = true;
      
      if (method === "card") {
        if (!cardNumber || !cardExpiry || !cardCvv) {
          toast.error(t("topup.incompleteCardDetails"));
          isValid = false;
        }
      } else if (method === "mobile-money") {
        if (!provider || !phoneNumber) {
          toast.error(t("topup.incompleteMobileDetails"));
          isValid = false;
        }
      } else if (method === "bank-transfer") {
        if (!bankName || !accountNumber) {
          toast.error(t("topup.incompleteBankDetails"));
          isValid = false;
        }
      }
      
      if (isValid) {
        setStep("confirmation");
      }
    } else if (step === "confirmation") {
      setIsLoading(true);
      
      // Simulate payment processing
      setTimeout(() => {
        setIsLoading(false);
        setStep("success");
      }, 2000);
    }
  };
  
  const handlePreviousStep = () => {
    if (step === "details") {
      setStep("amount");
    } else if (step === "confirmation") {
      setStep("details");
    }
  };

  return (
    <div className="space-y-6 py-2">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => step === "amount" ? navigate(-1) : handlePreviousStep()}
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-bold">
          {step === "success" ? t("topup.success") : t("topup.title")}
        </h1>
        <div className="w-9"></div> {/* Spacer for alignment */}
      </div>
      
      {step === "amount" && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary-blue/10 flex items-center justify-center">
              <methodInfo.icon size={32} className="text-primary-blue" />
            </div>
          </div>
          
          <h2 className="text-lg font-semibold text-center mb-6">
            {methodInfo.title}
          </h2>
          
          <div className="zamo-card mb-6">
            <label className="block text-sm font-medium mb-2">
              {t("topup.amount")}
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
      
      {step === "details" && (
        <div className="animate-fade-in">
          <div className="zamo-card mb-6">
            {method === "card" && (
              <>
                <h2 className="font-semibold mb-4">{t("topup.cardDetails")}</h2>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t("topup.cardNumber")}
                    </label>
                    <Input
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      className="zamo-input"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t("topup.expiryDate")}
                      </label>
                      <Input
                        value={cardExpiry}
                        onChange={handleCardExpiryChange}
                        placeholder="MM/YY"
                        className="zamo-input"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t("topup.cvv")}
                      </label>
                      <Input
                        value={cardCvv}
                        onChange={handleCardCvvChange}
                        placeholder="123"
                        className="zamo-input"
                        type="password"
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {method === "mobile-money" && (
              <>
                <h2 className="font-semibold mb-4">{t("topup.mobileMoneyDetails")}</h2>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t("topup.provider")}
                    </label>
                    <Select value={provider} onValueChange={setProvider}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("topup.selectProvider")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                        <SelectItem value="orange">Orange Money</SelectItem>
                        <SelectItem value="airtel">Airtel Money</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t("topup.phoneNumber")}
                    </label>
                    <Input
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      placeholder="+237 6XX XXX XXX"
                      className="zamo-input"
                    />
                  </div>
                </div>
              </>
            )}
            
            {method === "bank-transfer" && (
              <>
                <h2 className="font-semibold mb-4">{t("topup.bankDetails")}</h2>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t("topup.bankName")}
                    </label>
                    <Select value={bankName} onValueChange={setBankName}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("topup.selectBank")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="afriland">Afriland First Bank</SelectItem>
                        <SelectItem value="ecobank">Ecobank</SelectItem>
                        <SelectItem value="bgfi">BGFI Bank</SelectItem>
                        <SelectItem value="uba">United Bank for Africa (UBA)</SelectItem>
                        <SelectItem value="bicec">BICEC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t("topup.accountNumber")}
                    </label>
                    <Input
                      value={accountNumber}
                      onChange={handleAccountNumberChange}
                      placeholder="00000000000"
                      className="zamo-input"
                    />
                  </div>
                </div>
              </>
            )}
            
            <Button 
              className="zamo-btn-primary w-full"
              onClick={handleNextStep}
            >
              {t("common.next")}
            </Button>
          </div>
        </div>
      )}
      
      {step === "confirmation" && (
        <div className="animate-fade-in">
          <div className="zamo-card mb-6">
            <h2 className="text-lg font-semibold mb-4">
              {t("topup.review")}
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("topup.method")}</span>
                <span className="font-medium">{methodInfo.title}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("topup.amount")}</span>
                <span className="font-medium">{formatCurrency(parseInt(amount))} FCFA</span>
              </div>
              
              {method === "card" && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("topup.card")}</span>
                  <span className="font-medium">•••• {cardNumber.slice(-4)}</span>
                </div>
              )}
              
              {method === "mobile-money" && (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("topup.provider")}</span>
                    <span className="font-medium">
                      {provider === "mtn" ? "MTN Mobile Money" : 
                       provider === "orange" ? "Orange Money" : 
                       provider === "airtel" ? "Airtel Money" : provider}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("topup.phoneNumber")}</span>
                    <span className="font-medium">{phoneNumber}</span>
                  </div>
                </>
              )}
              
              {method === "bank-transfer" && (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("topup.bankName")}</span>
                    <span className="font-medium">
                      {bankName === "afriland" ? "Afriland First Bank" : 
                       bankName === "ecobank" ? "Ecobank" : 
                       bankName === "bgfi" ? "BGFI Bank" : 
                       bankName === "uba" ? "UBA" : 
                       bankName === "bicec" ? "BICEC" : bankName}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("topup.accountNumber")}</span>
                    <span className="font-medium">•••• {accountNumber.slice(-4)}</span>
                  </div>
                </>
              )}
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("topup.fee")}</span>
                <span className="text-green-600 font-medium">{t("topup.free")}</span>
              </div>
              
              <div className="pt-2 border-t border-border flex justify-between">
                <span className="font-medium">{t("topup.total")}</span>
                <span className="font-bold">{formatCurrency(parseInt(amount))} FCFA</span>
              </div>
            </div>
            
            <Button 
              className="zamo-btn-primary w-full"
              onClick={handleNextStep}
              disabled={isLoading}
            >
              {isLoading ? t("common.processing") : t("topup.confirm")}
            </Button>
          </div>
        </div>
      )}
      
      {step === "success" && (
        <div className="animate-fade-in">
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <Check size={40} className="text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold mb-2">
              {t("topup.topUpSuccessful")}
            </h2>
            
            <p className="text-center mb-6 text-muted-foreground">
              {t("topup.topUpSuccessfulMessage")}
            </p>
            
            <div className="zamo-card w-full mb-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("topup.amount")}</span>
                  <span className="font-medium">{formatCurrency(parseInt(amount))} FCFA</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("topup.reference")}</span>
                  <span className="font-medium">TP-{Math.floor(Math.random() * 1000000)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("topup.date")}</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <Button 
              className="zamo-btn-primary w-full"
              onClick={() => navigate("/dashboard")}
            >
              {t("common.home")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopUpMethod;
