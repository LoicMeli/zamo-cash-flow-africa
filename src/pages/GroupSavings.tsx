
import { useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { 
  Plus, 
  Users, 
  Calendar, 
  TrendingUp, 
  Sparkles, 
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const GroupSavings = () => {
  const { t } = useLanguage();
  const [hasGroups, setHasGroups] = useState(false);

  // Mock tontine data
  const tontineGroups = [
    { 
      id: '1', 
      name: 'Tontine Familiale', 
      members: 8, 
      totalAmount: 200000, 
      progress: 62, 
      nextRecipient: 'Marie L.',
      nextPayoutDate: new Date('2025-05-15'),
      contributionAmount: 10000,
      schedule: 'Weekly'
    },
    { 
      id: '2', 
      name: 'Groupe Quartier', 
      members: 12, 
      totalAmount: 600000, 
      progress: 28, 
      nextRecipient: 'Pascal N.',
      nextPayoutDate: new Date('2025-06-10'),
      contributionAmount: 25000,
      schedule: 'Monthly'
    }
  ];

  return (
    <div className="space-y-6 py-2">
      <h1 className="text-xl font-bold mb-6">
        {t("savings.title")}
      </h1>
      
      {hasGroups ? (
        <div className="space-y-6">
          <h2 className="text-lg font-medium">
            {t("savings.myGroups")}
          </h2>
          
          {tontineGroups.map((group) => (
            <Card key={group.id} className="p-5">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg">{group.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users size={16} className="mr-1" />
                  <span>{group.members} {t("family.members").toLowerCase()}</span>
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
                
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div>
                    <div className="text-xs text-muted-foreground">{t("savings.amount")}</div>
                    <div className="font-medium">{group.contributionAmount.toLocaleString()} FCFA</div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-muted-foreground">{t("savings.schedule")}</div>
                    <div className="font-medium">{group.schedule}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">{t("savings.nextPayout")}</div>
                    <div className="font-medium">{group.nextPayoutDate.toLocaleDateString()}</div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-muted-foreground">Next Recipient</div>
                    <div className="font-medium">{group.nextRecipient}</div>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full mt-2">
                {t("common.continue")} <ArrowRight size={16} className="ml-2" />
              </Button>
            </Card>
          ))}
          
          <Button className="w-full bg-primary-blue hover:bg-primary-blue/90 text-white">
            <Plus size={18} className="mr-2" />
            {t("savings.createNew")}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 space-y-6">
          <div className="w-20 h-20 rounded-full bg-primary-blue/10 flex items-center justify-center">
            <Users size={40} className="text-primary-blue" />
          </div>
          
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">{t("savings.title")}</h2>
            <p className="text-muted-foreground mb-6">Tontine Digital - Épargne Collective</p>
          </div>
          
          <div className="w-full space-y-4">
            <Button className="w-full bg-primary-blue hover:bg-primary-blue/90 text-white" onClick={() => setHasGroups(true)}>
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

export default GroupSavings;
