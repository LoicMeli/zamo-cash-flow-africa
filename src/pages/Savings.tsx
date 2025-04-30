
import { useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { Plus, Sparkles, Users, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Savings = () => {
  const { t } = useLanguage();
  const [hasSavings, setHasSavings] = useState(false);

  // Mock savings data
  const savingsGroups = [
    { 
      id: '1', 
      name: 'Tontine Familiale', 
      members: 8, 
      totalAmount: 200000, 
      progress: 65, 
      nextPayoutDate: new Date('2025-05-15'),
      contributionAmount: 10000,
      schedule: 'Weekly'
    },
    { 
      id: '2', 
      name: 'Projet Maison', 
      members: 4, 
      totalAmount: 500000, 
      progress: 32, 
      nextPayoutDate: new Date('2025-06-25'),
      contributionAmount: 25000,
      schedule: 'Monthly'
    }
  ];

  return (
    <div className="space-y-6 py-2">
      <h1 className="text-xl font-bold mb-6">
        {t("savings.title")}
      </h1>
      
      {hasSavings ? (
        <div className="space-y-6">
          <h2 className="text-lg font-medium">
            {t("savings.myGroups")}
          </h2>
          
          {savingsGroups.map((group) => (
            <Card key={group.id} className="p-5">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg">{group.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users size={16} className="mr-1" />
                  <span>{group.members}</span>
                </div>
              </div>
              
              <div className="space-y-4 mb-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{t("savings.progress")}</span>
                    <span className="font-medium">{group.progress}%</span>
                  </div>
                  <Progress value={group.progress} className="h-2" />
                </div>
                
                <div className="flex justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">{t("savings.amount")}</div>
                    <div className="font-medium">{group.contributionAmount.toLocaleString()} FCFA</div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-muted-foreground">{t("savings.schedule")}</div>
                    <div className="font-medium">{group.schedule}</div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-muted-foreground">{t("savings.nextPayout")}</div>
                    <div className="font-medium">{group.nextPayoutDate.toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                View Details
              </Button>
            </Card>
          ))}
          
          <Button className="zamo-btn-primary w-full">
            <Plus size={18} className="mr-2" />
            {t("savings.createNew")}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 space-y-6">
          <div className="w-20 h-20 rounded-full bg-primary-blue/10 flex items-center justify-center">
            <Sparkles size={40} className="text-primary-blue" />
          </div>
          
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">{t("savings.title")}</h2>
            <p className="text-muted-foreground mb-6">Digital Tontine for group savings</p>
          </div>
          
          <div className="w-full space-y-4">
            <Button className="zamo-btn-primary w-full" onClick={() => setHasSavings(true)}>
              <Plus size={18} className="mr-2" />
              {t("savings.createNew")}
            </Button>
            
            <Button variant="outline" className="w-full">
              {t("savings.join")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Savings;
