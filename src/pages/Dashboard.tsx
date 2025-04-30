
import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useLanguage } from "@/providers/LanguageProvider";
import { Send, MessageSquare, CreditCard, Wallet } from "lucide-react";
import BalanceCard from "@/components/BalanceCard";
import TransactionCard from "@/components/TransactionCard";
import ActivityCard from "@/components/ActivityCard";
import { generateMockTransactions } from "@/lib/utils";

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [transactions, setTransactions] = useState<any[]>([]);
  
  useEffect(() => {
    // Generate mock transactions for demo
    setTransactions(generateMockTransactions(3));
  }, []);

  if (!user) return null;

  const activities = [
    {
      icon: <Send size={20} className="text-blue-600" />,
      title: "Transactions Today",
      description: "You received 3 payments today",
      linkText: "View details",
      linkHref: "/send",
      color: "bg-blue-600/10",
    },
    {
      icon: <MessageSquare size={20} className="text-purple-600" />,
      title: "Financial Coach",
      description: "Get advice on managing your finances",
      linkText: "Chat now",
      linkHref: "/financial-coach",
      color: "bg-purple-600/10",
    },
    {
      icon: <CreditCard size={20} className="text-green-600" />,
      title: "Bills Due Soon",
      description: "2 family bills due in 3 days",
      linkText: "Pay now",
      linkHref: "/family-bills",
      color: "bg-green-600/10",
    }
  ];

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
      
      {/* Activity cards */}
      <div className="mt-8 space-y-3">
        <h2 className="text-lg font-medium mb-4">
          Activities
        </h2>
        
        {activities.map((activity, index) => (
          <ActivityCard
            key={index}
            icon={activity.icon}
            title={activity.title}
            description={activity.description}
            linkText={activity.linkText}
            linkHref={activity.linkHref}
            color={activity.color}
          />
        ))}
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
