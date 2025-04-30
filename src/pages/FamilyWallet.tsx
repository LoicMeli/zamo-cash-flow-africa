
import { useState, useEffect } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { Plus, Users, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import BalanceCard from "@/components/BalanceCard";
import { Badge } from "@/components/ui/badge";

const FamilyWallet = () => {
  const { t } = useLanguage();
  const [hasFamily, setHasFamily] = useState(false);

  // Mock family data
  const familyMembers = [
    { id: '1', name: 'Jean Dupont', role: 'admin', phone: '+237 656 123 456' },
    { id: '2', name: 'Marie Mbeki', role: 'member', phone: '+237 677 234 567' },
    { id: '3', name: 'Paul Touré', role: 'member', phone: '+237 699 345 678' },
  ];

  return (
    <div className="space-y-6 py-2">
      <h1 className="text-xl font-bold mb-6">
        {t("family.title")}
      </h1>
      
      {hasFamily ? (
        <>
          <BalanceCard amount={25000} className="bg-gradient-to-br from-purple-600 to-blue-700" />
          
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">
                {t("family.members")}
              </h2>
              <Button size="sm" variant="outline" className="flex items-center">
                <Plus size={16} className="mr-1" />
                {t("family.add")}
              </Button>
            </div>
            
            <div className="space-y-3">
              {familyMembers.map((member) => (
                <Card key={member.id} className="p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarFallback className={`${member.role === 'admin' ? 'bg-primary-blue/20 text-primary-blue' : 'bg-muted'}`}>
                        {member.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium flex items-center">
                        {member.name}
                        {member.role === 'admin' && (
                          <Badge variant="outline" className="ml-2 text-xs border-primary-blue text-primary-blue">
                            {t("family.admin")}
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">{member.phone}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <h2 className="text-lg font-medium mb-4">
              {t("family.transactions")}
            </h2>
            <Card className="p-8 flex flex-col items-center justify-center text-muted-foreground">
              <p className="mb-2">No recent activity</p>
              <p className="text-sm">Transactions will appear here</p>
            </Card>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 space-y-6">
          <div className="w-20 h-20 rounded-full bg-primary-blue/10 flex items-center justify-center">
            <Users size={40} className="text-primary-blue" />
          </div>
          
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">{t("family.title")}</h2>
            <p className="text-muted-foreground mb-6">Create a shared wallet for your family</p>
          </div>
          
          <div className="w-full space-y-4">
            <Button className="zamo-btn-primary w-full" onClick={() => setHasFamily(true)}>
              <Plus size={18} className="mr-2" />
              {t("family.createNew")}
            </Button>
            
            <Button variant="outline" className="w-full">
              {t("family.join")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyWallet;
