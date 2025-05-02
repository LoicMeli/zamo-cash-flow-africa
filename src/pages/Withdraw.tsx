
import { useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { ArrowLeft, MapPin, Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

const Withdraw = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock agents data
  const nearbyAgents = [
    {
      id: "1",
      name: "Jean Mbeki",
      distance: 0.6,
      address: "Marché Central, Yaoundé",
      isAvailable: true,
      balance: 250000,
    },
    {
      id: "2",
      name: "Marie Touré",
      distance: 1.2,
      address: "Rue de la Paix, Douala",
      isAvailable: true,
      balance: 500000,
    },
    {
      id: "3",
      name: "Sophie Hakimi",
      distance: 3.1,
      address: "Avenue Charles de Gaulle, Yaoundé",
      isAvailable: true,
      balance: 350000,
    },
  ];

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
          {t("withdraw.title")}
        </h1>
        <div className="w-9"></div> {/* Spacer for alignment */}
      </div>
      
      {/* Withdrawal instructions */}
      <div className="zamo-card mb-6 p-5 bg-primary-blue/5 border-primary-blue/20">
        <h2 className="font-semibold text-lg mb-2">{t("withdraw.howItWorks")}</h2>
        <ol className="space-y-2 mb-4 list-decimal list-inside text-sm">
          <li>{t("withdraw.step1")}</li>
          <li>{t("withdraw.step2")}</li>
          <li>{t("withdraw.step3")}</li>
          <li>{t("withdraw.step4")}</li>
        </ol>
        
        <p className="text-sm text-muted-foreground italic">
          {t("withdraw.noFeesNote")}
        </p>
      </div>
      
      {/* Nearby agents section */}
      <div>
        <h2 className="text-lg font-semibold mb-3">
          {t("withdraw.nearbyAgents")}
        </h2>
        
        <div className="space-y-4">
          {nearbyAgents.map((agent) => (
            <Card key={agent.id} className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold">{agent.name}</h3>
                  <p className="text-sm text-muted-foreground">{agent.address}</p>
                </div>
                <Badge variant="default" className="bg-green-500">
                  {t("agents.available")}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <MapPin size={14} className="text-muted-foreground mr-1" />
                  <span className="text-sm">{agent.distance} km</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground mr-1">{t("withdraw.capacity")}:</span>
                  <span className="font-medium">{formatCurrency(agent.balance)} FCFA</span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-primary-blue hover:bg-primary-blue/90 text-white"
                onClick={() => navigate(`/withdraw/${agent.id}`)}
              >
                {t("withdraw.selectAgent")}
              </Button>
            </Card>
          ))}
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-4 flex items-center justify-center"
          onClick={() => navigate("/agents")}
        >
          <Users size={16} className="mr-2" />
          {t("withdraw.viewAllAgents")}
        </Button>
      </div>
    </div>
  );
};

export default Withdraw;
