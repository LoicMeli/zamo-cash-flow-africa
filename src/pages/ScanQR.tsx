
import { useState, useEffect } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { QrCode, Camera, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type ScanStep = "scanning" | "confirmation" | "success";

// Mock data for QR scan result
const mockQRData = {
  merchantName: "Supermarché Central",
  merchantId: "MERCH123456",
  amount: 5000,
};

const ScanQR = () => {
  const [step, setStep] = useState<ScanStep>("scanning");
  const [scanResult, setScanResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate QR scanning after a delay
    if (step === "scanning") {
      const timer = setTimeout(() => {
        setScanResult(mockQRData);
        setStep("confirmation");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleRescan = () => {
    setScanResult(null);
    setStep("scanning");
  };

  const handleConfirmPayment = () => {
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
    }, 1500);
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="space-y-6 py-2">
      <h1 className="text-xl font-bold text-center mb-6">
        {t("qrcode.title")}
      </h1>
      
      {step === "scanning" && (
        <div className="animate-fade-in">
          <div className="relative aspect-square max-w-xs mx-auto bg-black rounded-xl overflow-hidden mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <QrCode size={150} className="text-white/30" strokeWidth={1} />
              <div className="absolute w-40 h-0.5 bg-primary-blue animate-pulse"></div>
              <div className="absolute h-40 w-0.5 bg-primary-blue animate-pulse"></div>
            </div>
            
            <div className="absolute inset-0 border-2 border-white/20 rounded-xl">
              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-primary-blue rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-primary-blue rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-primary-blue rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-primary-blue rounded-br-lg"></div>
            </div>
            
            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-primary-blue rounded-full animate-pulse"></div>
                <span>{t("qrcode.scanning")}</span>
              </div>
            </div>
          </div>
          
          <p className="text-center text-sm text-muted-foreground">
            {t("qrcode.instructions")}
          </p>
        </div>
      )}
      
      {step === "confirmation" && scanResult && (
        <div className="animate-fade-in">
          <div className="zamo-card mb-6">
            <h2 className="text-lg font-semibold mb-4">
              {t("qrcode.merchantInfo")}
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("qrcode.merchantInfo")}</span>
                <span className="font-medium">{scanResult.merchantName}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("qrcode.amount")}</span>
                <span className="font-medium">{formatCurrency(scanResult.amount)} FCFA</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline"
                className="flex-1"
                onClick={handleRescan}
              >
                <Camera size={18} className="mr-2" />
                {t("qrcode.scanning")}
              </Button>
              
              <Button 
                className="zamo-btn-primary flex-1"
                onClick={handleConfirmPayment}
                disabled={isLoading}
              >
                {isLoading ? t("common.loading") : t("qrcode.payNow")}
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {step === "success" && (
        <div className="animate-fade-in">
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <Check size={40} className="text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold mb-6 text-center">
              {t("qrcode.success")}
            </h2>
            
            <div className="zamo-card w-full mb-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("qrcode.merchantInfo")}</span>
                  <span className="font-medium">{scanResult.merchantName}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("qrcode.amount")}</span>
                  <span className="font-medium">{formatCurrency(scanResult.amount)} FCFA</span>
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
        </div>
      )}
    </div>
  );
};

export default ScanQR;
