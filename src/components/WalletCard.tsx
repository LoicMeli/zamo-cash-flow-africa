
import { useState } from "react";
import { EyeIcon, EyeOffIcon, ChevronRight, QrCode } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { useLanguage } from "@/providers/LanguageProvider";
import { formatCurrency, getLocalEquivalent } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WalletCardProps {
  className?: string;
}

const WalletCard = ({ className }: WalletCardProps) => {
  const [showBalance, setShowBalance] = useState(true);
  const [showQR, setShowQR] = useState(false);
  const { user } = useAuth();
  const { t, language } = useLanguage();
  
  const toggleBalance = () => setShowBalance(!showBalance);
  const toggleQR = () => setShowQR(!showQR);
  
  // Generate a random account number for the demo
  const accountNumber = user?.id ? 
    `**** **** ${user.id.substring(0, 4).toUpperCase()}` : 
    "**** **** 7891";

  // Get local equivalent for the balance amount
  const localEquivalent = getLocalEquivalent(user?.balance || 0);
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={cn("w-full", className)}
    >
      <Card className={cn(
        "relative overflow-hidden",
        "bg-gradient-to-br from-primary-blue to-blue-700 text-white",
        "rounded-2xl p-5 shadow-lg h-48"
      )}>
        {/* Background pattern - African-inspired design */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="ndopPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="10" height="10" fill="white" />
              <rect x="10" y="10" width="10" height="10" fill="white" />
              <circle cx="5" cy="5" r="3" fill="white" />
              <circle cx="15" cy="15" r="3" fill="white" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#ndopPattern)" />
          </svg>
        </div>
        
        {!showQR ? (
          <div className="relative h-full flex flex-col justify-between z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">{t('dashboard.availableBalance')}</p>
                <div className="flex items-center mt-1">
                  <h2 className="text-2xl font-bold">
                    {showBalance ? formatCurrency(user?.balance || 0) : "••••••"}
                  </h2>
                  <span className="ml-1 text-sm">FCFA</span>
                  <button 
                    onClick={toggleBalance}
                    className="ml-2 opacity-80 hover:opacity-100"
                  >
                    {showBalance ? (
                      <EyeOffIcon size={16} />
                    ) : (
                      <EyeIcon size={16} />
                    )}
                  </button>
                </div>
                {showBalance && localEquivalent && (
                  <p className="text-xs mt-1 opacity-75">
                    = {localEquivalent}
                  </p>
                )}
              </div>
              
              <Button 
                onClick={toggleQR} 
                variant="ghost" 
                size="icon" 
                className="rounded-full bg-white/10 hover:bg-white/20"
              >
                <QrCode size={18} className="text-white" />
              </Button>
            </div>
            
            <div>
              <p className="text-xs opacity-70">{t('dashboard.accountNumber')}</p>
              <p className="font-mono text-sm mt-0.5">{accountNumber}</p>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="text-xs opacity-70">{user?.name || "Zamo User"}</div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-5 rounded bg-white/20 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-white/80"></div>
                </div>
                <div className="w-8 h-5 rounded bg-white/20 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-white/80"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center">
            {/* QR code with African pattern styling */}
            <div className="bg-white p-2 rounded-lg mb-3 relative overflow-hidden">
              <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <pattern id="ndopQRPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M0,5 L10,5 M5,0 L5,10" stroke="black" strokeWidth="0.5" />
                    <circle cx="5" cy="5" r="1" fill="black" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#ndopQRPattern)" />
                </svg>
              </div>
              <div className="w-32 h-32 bg-black rounded-md grid grid-cols-5 grid-rows-5 p-1 relative z-10">
                {/* Simple QR code pattern */}
                {Array(25).fill(0).map((_, i) => {
                  const random = Math.floor(Math.random() * 2);
                  return random ? (
                    <div key={i} className="bg-white"></div>
                  ) : null;
                })}
              </div>
            </div>
            <p className="text-sm text-center text-white/80">{t('dashboard.zamoPass')}</p>
            <p className="text-xs text-center text-white/60 mb-2">{t('dashboard.scanToReceive')}</p>
            <Button 
              onClick={toggleQR} 
              variant="ghost" 
              size="sm" 
              className="text-white mt-1"
            >
              {t('common.hideCode')}
            </Button>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default WalletCard;
