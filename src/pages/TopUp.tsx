
import { useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { ArrowLeft, CreditCard, Smartphone, Building, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

// Define payment methods
const paymentMethods = [
  {
    id: "card",
    name: "Credit or Debit Card",
    icon: CreditCard,
    description: "Visa, Mastercard, etc.",
  },
  {
    id: "mobile-money",
    name: "Mobile Money",
    icon: Smartphone,
    description: "MTN Mobile Money, Orange Money, etc.",
  },
  {
    id: "bank-transfer",
    name: "Bank Transfer",
    icon: Building,
    description: "Direct transfer from your bank account",
  },
];

const TopUp = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

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
          {t("topup.title")}
        </h1>
        <div className="w-9"></div> {/* Spacer for alignment */}
      </div>
      
      <div className="p-4 bg-primary-blue/5 border border-primary-blue/20 rounded-lg mb-6">
        <h2 className="font-semibold mb-2">{t("topup.instructions")}</h2>
        <p className="text-sm text-muted-foreground">
          {t("topup.instructionsText")}
        </p>
      </div>
      
      <h2 className="font-semibold text-lg mb-3">{t("topup.chooseMethod")}</h2>
      
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <Card 
            key={method.id} 
            className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => navigate(`/topup/${method.id}`)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-blue/10 flex items-center justify-center">
                  <method.icon size={20} className="text-primary-blue" />
                </div>
                
                <div>
                  <h3 className="font-semibold">{method.name}</h3>
                  <p className="text-xs text-muted-foreground">{method.description}</p>
                </div>
              </div>
              
              <ChevronRight size={20} className="text-muted-foreground" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TopUp;
