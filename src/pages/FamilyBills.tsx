
import { useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { 
  Wallet, 
  Receipt, 
  Users, 
  Lightning, 
  Droplets, 
  Wifi, 
  ArrowRight, 
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const FamilyBills = () => {
  const { t } = useLanguage();
  const [hasBills, setHasBills] = useState(true);

  // Mock bills data
  const bills = [
    { 
      id: '1', 
      name: 'Électricité', 
      provider: 'SEEG',
      icon: Lightning,
      amount: 45000,
      dueDate: new Date('2025-05-20'),
      contributors: 4,
      collected: 30000,
      progress: 67
    },
    { 
      id: '2', 
      name: 'Eau', 
      provider: 'SEEG',
      icon: Droplets,
      amount: 28000,
      dueDate: new Date('2025-05-25'),
      contributors: 3,
      collected: 18000,
      progress: 64
    },
    { 
      id: '3', 
      name: 'Internet', 
      provider: 'Gabon Telecom',
      icon: Wifi,
      amount: 50000,
      dueDate: new Date('2025-06-01'),
      contributors: 5,
      collected: 20000,
      progress: 40
    }
  ];

  return (
    <div className="space-y-6 py-2">
      <h1 className="text-xl font-bold mb-6">
        Family Bills
      </h1>
      
      {hasBills ? (
        <div className="space-y-6">
          <h2 className="text-lg font-medium">
            Current Bills
          </h2>
          
          {bills.map((bill) => (
            <Card key={bill.id} className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary-blue/10 flex items-center justify-center">
                  <bill.icon size={20} className="text-primary-blue" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-base">{bill.name}</h3>
                  <p className="text-sm text-muted-foreground">{bill.provider}</p>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold">{bill.amount.toLocaleString()} FCFA</p>
                  <p className="text-xs text-muted-foreground">
                    {t("common.continue")}: {bill.dueDate.toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">
                    <Users size={12} className="inline mr-1" />
                    {bill.contributors} contributors
                  </span>
                  <span className="font-medium">{bill.collected.toLocaleString()} / {bill.amount.toLocaleString()} FCFA</span>
                </div>
                <Progress value={bill.progress} className="h-2" />
              </div>
              
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" className="flex-1">
                  Contribute
                </Button>
                <Button size="sm" className="flex-1 bg-primary-blue hover:bg-primary-blue/90 text-white">
                  Pay Bill
                </Button>
              </div>
            </Card>
          ))}
          
          <Button className="w-full bg-primary-blue hover:bg-primary-blue/90 text-white">
            <Plus size={18} className="mr-2" />
            Add New Bill
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 space-y-6">
          <div className="w-20 h-20 rounded-full bg-primary-blue/10 flex items-center justify-center">
            <Wallet size={40} className="text-primary-blue" />
          </div>
          
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Family Bills</h2>
            <p className="text-muted-foreground mb-6">Pay bills together with family members</p>
          </div>
          
          <div className="w-full space-y-4">
            <Button className="w-full bg-primary-blue hover:bg-primary-blue/90 text-white" onClick={() => setHasBills(true)}>
              <Plus size={18} className="mr-2" />
              Add First Bill
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyBills;
