
import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useLanguage } from "@/providers/LanguageProvider";
import { Send, QrCode, MapPin } from "lucide-react";
import BalanceCard from "@/components/BalanceCard";
import TransactionCard from "@/components/TransactionCard";
import ServiceButton from "@/components/ServiceButton";
import { generateMockTransactions } from "@/lib/utils";

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [transactions, setTransactions] = useState<any[]>([]);
  
  useEffect(() => {
    // Generate mock transactions for demo
    setTransactions(generateMockTransactions(5));
  }, []);

  if (!user) return null;

  return (
    <div className="space-y-6 py-2">
      {/* Welcome message */}
      <div>
        <h1 className="text-xl font-bold">
          {t("dashboard.greeting")}
        </h1>
      </div>
      
      {/* Balance card */}
      <BalanceCard amount={user.balance} />
      
      {/* Quick services */}
      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4">
          {t("dashboard.services")}
        </h2>
        
        <div className="flex justify-between px-4">
          <ServiceButton 
            icon={Send} 
            label={t("dashboard.send")}
            href="/send"
            color="bg-blue-600"
          />
          <ServiceButton 
            icon={QrCode} 
            label={t("dashboard.scan")}
            href="/scan"
            color="bg-blue-700"
          />
          <ServiceButton 
            icon={MapPin} 
            label={t("dashboard.agents")}
            href="/agents"
            color="bg-blue-800"
          />
        </div>
      </div>
      
      {/* Recent transactions */}
      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4">
          {t("dashboard.recentTransactions")}
        </h2>
        
        {transactions.length > 0 ? (
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                type={transaction.type}
                amount={transaction.amount}
                name={transaction.name}
                date={transaction.date}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-6">
            {t("dashboard.noTransactions")}
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
