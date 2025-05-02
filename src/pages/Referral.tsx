
import { useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { ArrowLeft, Share2, Copy, CheckCircle, Users, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Referral = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  
  // Mock referral data
  const referralCode = "ZAMO4321";
  const referralData = {
    totalEarned: 1500,
    peopleReferred: 3,
    pendingRewards: 500,
    history: [
      {
        id: "1",
        name: "Sophie Bakenda",
        status: "completed",
        date: new Date(2023, 2, 15),
        reward: 500
      },
      {
        id: "2",
        name: "Paul Ndongo",
        status: "completed",
        date: new Date(2023, 1, 20),
        reward: 500
      },
      {
        id: "3",
        name: "Marie Kouassi",
        status: "completed",
        date: new Date(2023, 0, 5),
        reward: 500
      },
      {
        id: "4",
        name: "Thomas Kaba",
        status: "pending",
        date: new Date(2023, 3, 2),
        reward: 0
      }
    ]
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode).then(() => {
      setCopied(true);
      toast.success(t("common.success"), {
        description: t("referral.shareCode")
      });
      setTimeout(() => setCopied(false), 3000);
    });
  };
  
  const shareReferralCode = () => {
    if (navigator.share) {
      navigator.share({
        title: "Zamo Referral",
        text: t("referral.shareMessage", { code: referralCode }),
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
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-bold">
          {t("referral.title")}
        </h1>
        <div className="w-9"></div> {/* Spacer for alignment */}
      </div>
      
      <div className="bg-gradient-to-tr from-primary-blue to-blue-600 rounded-xl p-5 text-white">
        <h2 className="text-lg font-semibold mb-1">
          {t("referral.subtitle")}
        </h2>
        <p className="text-sm opacity-90 mb-4">
          {t("referral.description")}
        </p>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
          <p className="text-xs opacity-80 mb-1">
            {t("referral.yourCode")}
          </p>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold font-mono tracking-wider">
              {referralCode}
            </h3>
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full bg-white/30 hover:bg-white/40"
              onClick={copyToClipboard}
            >
              {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
            </Button>
          </div>
        </div>
        
        <Button 
          className="w-full bg-white text-primary-blue hover:bg-white/90"
          onClick={shareReferralCode}
        >
          <Share2 size={16} className="mr-2" />
          {t("referral.shareCode")}
        </Button>
      </div>
      
      {/* Stats section */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-3 text-center">
          <p className="text-xs text-muted-foreground mb-1">{t("referral.totalEarned")}</p>
          <p className="font-semibold">{formatCurrency(referralData.totalEarned)} FCFA</p>
        </Card>
        <Card className="p-3 text-center">
          <p className="text-xs text-muted-foreground mb-1">{t("referral.peopleReferred")}</p>
          <p className="font-semibold">{referralData.peopleReferred}</p>
        </Card>
        <Card className="p-3 text-center">
          <p className="text-xs text-muted-foreground mb-1">{t("referral.pendingRewards")}</p>
          <p className="font-semibold">{formatCurrency(referralData.pendingRewards)} FCFA</p>
        </Card>
      </div>
      
      {/* How it works section */}
      <div>
        <h2 className="font-semibold text-lg mb-3">{t("referral.howItWorks")}</h2>
        
        <div className="space-y-4">
          <Card className="p-4 flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center shrink-0">
              <p className="font-semibold text-blue-600 dark:text-blue-300">1</p>
            </div>
            <div>
              <h3 className="font-semibold">{t("referral.step1Title")}</h3>
              <p className="text-sm text-muted-foreground">{t("referral.step1Text")}</p>
            </div>
          </Card>
          
          <Card className="p-4 flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center shrink-0">
              <p className="font-semibold text-blue-600 dark:text-blue-300">2</p>
            </div>
            <div>
              <h3 className="font-semibold">{t("referral.step2Title")}</h3>
              <p className="text-sm text-muted-foreground">{t("referral.step2Text")}</p>
            </div>
          </Card>
          
          <Card className="p-4 flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center shrink-0">
              <p className="font-semibold text-blue-600 dark:text-blue-300">3</p>
            </div>
            <div>
              <h3 className="font-semibold">{t("referral.step3Title")}</h3>
              <p className="text-sm text-muted-foreground">{t("referral.step3Text")}</p>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Referral History */}
      <div>
        <h2 className="font-semibold text-lg mb-3">{t("referral.referralHistory")}</h2>
        
        {referralData.history.length > 0 ? (
          <div className="space-y-3">
            {referralData.history.map((referral) => (
              <Card key={referral.id} className="p-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Users size={18} />
                  </div>
                  <div>
                    <p className="font-medium">{referral.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {referral.date.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div>
                  {referral.status === "completed" ? (
                    <div className="text-right">
                      <span className="text-sm font-medium text-green-600">
                        +{formatCurrency(referral.reward)} FCFA
                      </span>
                      <div className="text-xs flex items-center justify-end text-green-600">
                        <CheckCircle size={12} className="mr-1" />
                        {t("referral.completed")}
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-amber-600 dark:text-amber-500 flex items-center">
                      <Gift size={14} className="mr-1" />
                      {t("referral.pending")}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-5 text-center">
            <p className="text-muted-foreground">{t("referral.noReferrals")}</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Referral;
