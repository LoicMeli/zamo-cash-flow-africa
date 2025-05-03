
import React, { useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { toast } from "sonner";
import AgentBalanceCard from "@/components/agent/AgentBalanceCard";
import AgentActionButtons from "@/components/agent/AgentActionButtons";
import AgentStatsCards from "@/components/agent/AgentStatsCards";
import AgentTransactionTabs from "@/components/agent/AgentTransactionTabs";
import AgentQRCodeModal from "@/components/agent/AgentQRCodeModal";
import AgentStatusToggle from "@/components/agent/AgentStatusToggle";
import { Transaction } from "@/components/TransactionList";

const AgentSpace = () => {
  const { t } = useLanguage();
  const [isOnline, setIsOnline] = useState(true);
  const [showQR, setShowQR] = useState(false);
  
  // Mock data - would come from API in real app
  const agentBalance = 150000;
  const agentCode = "AGT12345";
  const commissions = 7500;
  
  const handleStatusChange = (checked: boolean) => {
    setIsOnline(checked);
    toast.success(`You are now ${checked ? 'Online' : 'Offline'}`);
  };
  
  const handleDeposit = () => {
    toast.info("Deposit feature coming soon");
  };
  
  const handleWithdrawal = () => {
    toast.info("Withdrawal feature coming soon");
  };
  
  // Define agent transactions with proper typing
  const agentTransactions: Transaction[] = [
    {
      id: "tx1",
      type: "deposit",
      amount: 20000,
      fee: 500,
      date: new Date(2025, 4, 1, 14, 30),
      status: "completed",
      user: {
        name: "John Doe",
        phone: "+237612345678",
      },
    },
    {
      id: "tx2",
      type: "withdrawal",
      amount: 15000,
      fee: 375,
      date: new Date(2025, 4, 1, 10, 15),
      status: "completed",
      user: {
        name: "Sarah Smith",
        phone: "+237623456789",
      },
    },
    {
      id: "tx3",
      type: "deposit",
      amount: 30000,
      fee: 750,
      date: new Date(2025, 3, 30, 16, 45),
      status: "completed",
      user: {
        name: "Mike Johnson",
        phone: "+237634567890",
      },
    },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("common.agentSpace")}</h1>
        <AgentStatusToggle 
          isOnline={isOnline} 
          onStatusChange={handleStatusChange} 
        />
      </div>
      
      <AgentBalanceCard 
        agentBalance={agentBalance} 
        agentCode={agentCode} 
        onShowQR={() => setShowQR(true)} 
      />
      
      <AgentActionButtons 
        onDeposit={handleDeposit} 
        onWithdrawal={handleWithdrawal} 
      />
      
      <AgentStatsCards 
        commissions={commissions} 
        transactionCount={agentTransactions.length} 
      />
      
      <AgentTransactionTabs transactions={agentTransactions} />
      
      <AgentQRCodeModal 
        showQR={showQR} 
        agentCode={agentCode} 
        onClose={() => setShowQR(false)} 
      />
    </div>
  );
};

export default AgentSpace;
