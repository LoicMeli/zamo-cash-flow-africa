
import { useState, useEffect } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { useAuth } from "@/providers/AuthProvider";
import { QrCode, Share2, Download, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface PersonalQRCodeProps {
  onClose?: () => void;
}

const PersonalQRCode = ({ onClose }: PersonalQRCodeProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [qrUrl, setQrUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  // Generate a random QR code to simulate user's personal QR code
  useEffect(() => {
    generateQR();
  }, []);
  
  const generateQR = () => {
    setIsLoading(true);
    
    // In a real app, this would generate a secure QR with user's account info
    // For this demo, we're using a public QR code API
    const qrData = JSON.stringify({
      userId: user?.id || "demo-user",
      phoneNumber: user?.phoneNumber || "",
      timestamp: new Date().toISOString(),
    });
    
    const encodedData = encodeURIComponent(qrData);
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedData}`;
    
    setQrUrl(qrApiUrl);
    setIsLoading(false);
  };
  
  const downloadQR = () => {
    // Create a link element
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = 'zamo-personal-qr.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(t("common.success"), {
      description: "QR code downloaded"
    });
  };
  
  const shareQR = async () => {
    if (navigator.share) {
      try {
        // Convert image to blob for sharing
        const response = await fetch(qrUrl);
        const blob = await response.blob();
        const file = new File([blob], "zamo-qr.png", { type: "image/png" });
        
        await navigator.share({
          title: "Zamo QR Code",
          text: t("wallet.qrDescription"),
          files: [file]
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      toast.info("To share, download the QR code and share it manually");
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="p-4"
    >
      <div className="flex flex-col items-center text-center mb-6">
        <QrCode size={36} className="text-primary-blue mb-2" />
        <h2 className="text-xl font-bold">{t("wallet.personalQR")}</h2>
        <p className="text-sm text-muted-foreground">
          {t("wallet.qrDescription")}
        </p>
      </div>
      
      <Card className="flex flex-col items-center justify-center p-8 mb-6 relative">
        {isLoading ? (
          <div className="w-48 h-48 bg-gray-200 animate-pulse rounded-lg"></div>
        ) : (
          <img 
            src={qrUrl} 
            alt="Personal QR Code" 
            className="w-48 h-48 rounded-lg" 
          />
        )}
        
        <Button 
          variant="outline" 
          size="icon"
          className="absolute top-4 right-4 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={generateQR}
        >
          <RefreshCcw size={16} />
        </Button>
        
        <div className="mt-4 text-sm">
          <p className="font-medium">{user?.phoneNumber || "Your Zamo Account"}</p>
          <p className="text-muted-foreground text-xs">
            {"ID: " + (user?.id ? user.id.substring(0, 8) : "XXXXXXXX")}
          </p>
        </div>
      </Card>
      
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="flex items-center" onClick={downloadQR}>
          <Download size={16} className="mr-2" />
          {t("common.save")}
        </Button>
        <Button className="flex items-center bg-primary-blue hover:bg-primary-blue/90" onClick={shareQR}>
          <Share2 size={16} className="mr-2" />
          {t("wallet.shareQR")}
        </Button>
      </div>
    </motion.div>
  );
};

export default PersonalQRCode;
