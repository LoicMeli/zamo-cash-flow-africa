
import { useState, useEffect } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { ArrowLeft, Check, Phone, MapPin, Copy, Share2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

const WithdrawDetails = () => {
  const { t } = useLanguage();
  const { agentId } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"amount" | "confirmation" | "success">("amount");
  const [withdrawalCode, setWithdrawalCode] = useState("");
  const [showSecurityDialog, setShowSecurityDialog] = useState(false);
  const [useBiometrics, setUseBiometrics] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [codeExpiry, setCodeExpiry] = useState<Date | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Mock agent data (in a real app, you'd fetch this based on agentId)
  const agent = {
    id: agentId || "1",
    name: "Jean Mbeki",
    distance: 0.6,
    address: "Marché Central, Yaoundé",
    phone: "+237 656 123 456",
    isAvailable: true,
    balance: 250000,
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAmount(value);
  };

  const handleSubmit = () => {
    // Validate amount
    if (!amount || parseInt(amount) <= 0) {
      toast.error(t("withdraw.invalidAmount"));
      return;
    }

    if (parseInt(amount) > agent.balance) {
      toast.error(t("withdraw.exceedsAgentBalance"));
      return;
    }

    setStep("confirmation");
  };

  const handleConfirm = () => {
    setShowSecurityDialog(true);
  };
  
  const handleVerifyPinOrBiometrics = () => {
    // In a real app, you'd verify the PIN or biometric auth here
    setIsVerifying(true);
    
    setTimeout(() => {
      setIsVerifying(false);
      
      if (useBiometrics || pinInput === "1234") { // Demo PIN is 1234
        setShowSecurityDialog(false);
        processWithdrawal();
      } else {
        toast.error("Incorrect PIN");
      }
    }, 1500);
  };
  
  const processWithdrawal = () => {
    setIsLoading(true);
    
    // Simulate withdrawal process
    setTimeout(() => {
      // Generate a random withdrawal code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setWithdrawalCode(code);
      
      // Set code expiry to 24 hours from now
      const expiry = new Date();
      expiry.setHours(expiry.getHours() + 24);
      setCodeExpiry(expiry);
      
      setIsLoading(false);
      setStep("success");
      
      // Send a push notification
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Withdrawal Code Generated", {
          body: `Your code: ${code} is valid for 24 hours`,
          icon: "/favicon.ico"
        });
      }
    }, 1500);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(withdrawalCode).then(() => {
      setCopied(true);
      toast.success(t("common.success"), {
        description: "Code copied to clipboard"
      });
      setTimeout(() => setCopied(false), 3000);
    });
  };
  
  const shareCode = () => {
    if (navigator.share) {
      navigator.share({
        title: "Zamo Withdrawal Code",
        text: `My Zamo withdrawal code: ${withdrawalCode} - Valid until ${codeExpiry?.toLocaleString()}`,
      }).catch(err => {
        console.log("Error sharing:", err);
      });
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="space-y-6 py-2">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => step === "amount" ? navigate(-1) : setStep("amount")}
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-bold">
          {step === "success" ? t("withdraw.success") : t("withdraw.title")}
        </h1>
        <div className="w-9"></div> {/* Spacer for alignment */}
      </div>
      
      {step === "amount" && (
        <div className="animate-fade-in">
          <Card className="p-4 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-blue/10 flex items-center justify-center">
                <MapPin size={20} className="text-primary-blue" />
              </div>
              
              <div>
                <h3 className="font-semibold">{agent.name}</h3>
                <p className="text-xs text-muted-foreground">{agent.address}</p>
              </div>
            </div>
            
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">{t("withdraw.capacity")}</span>
              <span className="font-medium">{formatCurrency(agent.balance)} FCFA</span>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-2 flex items-center justify-center"
              onClick={() => {
                toast.info(`${t("common.calling")} ${agent.name}`);
              }}
            >
              <Phone size={16} className="mr-2" />
              {t("agents.call")}
            </Button>
          </Card>
          
          <div className="zamo-card mb-6">
            <label className="block text-sm font-medium mb-2">
              {t("withdraw.amount")}
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
              onClick={handleSubmit}
              disabled={!amount || parseInt(amount) <= 0}
            >
              {t("common.next")}
            </Button>
          </div>
          
          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900">
            <h3 className="font-medium text-amber-800 dark:text-amber-400 mb-1">{t("withdraw.note")}</h3>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              {t("withdraw.noteText")}
            </p>
          </div>
        </div>
      )}
      
      {step === "confirmation" && (
        <div className="animate-fade-in">
          <div className="zamo-card mb-6">
            <h2 className="text-lg font-semibold mb-4">
              {t("withdraw.review")}
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("withdraw.agent")}</span>
                <span className="font-medium">{agent.name}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("withdraw.amount")}</span>
                <span className="font-medium">{formatCurrency(parseInt(amount))} FCFA</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("withdraw.fee")}</span>
                <span className="text-green-600 font-medium">{t("withdraw.free")}</span>
              </div>
              
              <div className="pt-2 border-t border-border flex justify-between">
                <span className="font-medium">{t("withdraw.total")}</span>
                <span className="font-bold">{formatCurrency(parseInt(amount))} FCFA</span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              {t("withdraw.confirmationText")}
            </p>
            
            <Button 
              className="zamo-btn-primary w-full"
              onClick={handleConfirm}
              disabled={isLoading}
            >
              {isLoading ? t("common.loading") : t("withdraw.confirm")}
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
              {t("withdraw.withdrawalReady")}
            </h2>
            
            <p className="text-center mb-6 text-muted-foreground">
              {t("withdraw.visitAgentText")}
            </p>
            
            <div className="zamo-card w-full mb-6">
              <div className="space-y-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("withdraw.agent")}</span>
                  <span className="font-medium">{agent.name}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("withdraw.amount")}</span>
                  <span className="font-medium">{formatCurrency(parseInt(amount))} FCFA</span>
                </div>
              </div>
              
              <div className="py-4 border-y border-border mb-4">
                <p className="text-sm text-center text-muted-foreground mb-2">
                  {t("withdraw.generatedCode")}
                </p>
                <div className="bg-primary-blue/5 border border-primary-blue/10 rounded-md py-3 px-4 flex items-center justify-between">
                  <h3 className="text-2xl font-mono font-bold tracking-wider">
                    {withdrawalCode}
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="rounded-full hover:bg-primary-blue/10"
                    onClick={copyToClipboard}
                  >
                    <Copy size={16} />
                  </Button>
                </div>
                <p className="text-xs text-center text-muted-foreground mt-2">
                  {t("withdraw.codeExpiry")}
                  {codeExpiry && ` - ${codeExpiry.toLocaleString()}`}
                </p>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center"
                onClick={shareCode}
              >
                <Share2 size={16} className="mr-2" />
                {t("withdraw.shareCode")}
              </Button>
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
      
      {/* Security dialog for PIN/biometric authentication */}
      <Dialog open={showSecurityDialog} onOpenChange={setShowSecurityDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="text-center font-semibold">Verify Identity</DialogTitle>
          
          <div className="flex flex-col items-center py-4">
            <div className="w-16 h-16 bg-primary-blue/10 rounded-full flex items-center justify-center mb-4">
              <Lock size={30} className="text-primary-blue" />
            </div>
            
            <p className="text-center text-sm text-muted-foreground mb-6">
              Enter your PIN or use biometrics to authorize this withdrawal
            </p>
            
            {!useBiometrics ? (
              <div className="w-full space-y-4">
                <div className="flex justify-center space-x-2">
                  {Array(4).fill(0).map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg font-bold
                        ${i < pinInput.length ? 'border-primary-blue bg-primary-blue/10' : 'border-border'}`}
                    >
                      {i < pinInput.length ? '•' : ''}
                    </div>
                  ))}
                </div>
                
                <Input 
                  type="password"
                  inputMode="numeric"
                  className="sr-only"
                  value={pinInput}
                  autoFocus
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
                    setPinInput(value);
                    if (value.length === 4) {
                      handleVerifyPinOrBiometrics();
                    }
                  }}
                />
                
                <div className="pt-4 flex items-center justify-between">
                  <div className="text-sm flex items-center">
                    <Switch
                      checked={useBiometrics}
                      onCheckedChange={setUseBiometrics}
                      className="mr-2"
                    />
                    <span>Use biometrics</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="text-sm"
                    onClick={() => {
                      toast.info("Need help? Contact support.");
                    }}
                  >
                    Forgot PIN?
                  </Button>
                </div>
              </div>
            ) : (
              <div className="w-full space-y-4">
                <Button
                  className="w-full"
                  onClick={handleVerifyPinOrBiometrics}
                  disabled={isVerifying}
                >
                  {isVerifying ? "Verifying..." : "Authenticate with Biometrics"}
                </Button>
                
                <div className="pt-2 flex items-center justify-between">
                  <div className="text-sm flex items-center">
                    <Switch
                      checked={useBiometrics}
                      onCheckedChange={setUseBiometrics}
                      className="mr-2"
                    />
                    <span>Use biometrics</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="text-sm"
                    onClick={() => setUseBiometrics(false)}
                  >
                    Use PIN instead
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WithdrawDetails;
