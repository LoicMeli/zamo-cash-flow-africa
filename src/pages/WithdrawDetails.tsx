
import { useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { ArrowLeft, Check, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

const WithdrawDetails = () => {
  const { t } = useLanguage();
  const { agentId } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"amount" | "confirmation" | "success">("amount");
  
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
    setIsLoading(true);
    
    // Simulate withdrawal process
    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
    }, 1500);
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
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("withdraw.agent")}</span>
                  <span className="font-medium">{agent.name}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("withdraw.amount")}</span>
                  <span className="font-medium">{formatCurrency(parseInt(amount))} FCFA</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("withdraw.reference")}</span>
                  <span className="font-medium">WD-{Math.floor(Math.random() * 1000000)}</span>
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

export default WithdrawDetails;
