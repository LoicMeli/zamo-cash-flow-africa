
import React, { useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { QrCode, SendHorizontal, ArrowDownToLine, History, Wallet } from "lucide-react";
import { toast } from "sonner";
import PersonalQRCode from "@/components/PersonalQRCode";
import TransactionList from "@/components/TransactionList";

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
  
  const agentTransactions = [
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
        <div className="flex items-center space-x-2">
          <Label htmlFor="agent-status">{isOnline ? 'Online' : 'Offline'}</Label>
          <Switch 
            id="agent-status" 
            checked={isOnline} 
            onCheckedChange={handleStatusChange}
          />
        </div>
      </div>
      
      {/* Agent Balance Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Agent Float Balance</CardDescription>
          <CardTitle className="text-3xl font-bold">
            {new Intl.NumberFormat('fr-CM', { style: 'currency', currency: 'XAF' }).format(agentBalance)}
          </CardTitle>
        </CardHeader>
        <CardFooter className="pt-2">
          <div className="w-full flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">Agent Code</p>
              <p className="text-xl">{agentCode}</p>
            </div>
            <Button variant="outline" onClick={() => setShowQR(true)}>
              <QrCode className="mr-2 h-4 w-4" />
              Show QR
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button className="h-24 flex flex-col" onClick={() => toast.info("Deposit feature coming soon")}>
          <SendHorizontal className="h-6 w-6 mb-2" />
          <span>Make Deposit</span>
        </Button>
        <Button className="h-24 flex flex-col" onClick={() => toast.info("Withdrawal feature coming soon")}>
          <ArrowDownToLine className="h-6 w-6 mb-2" />
          <span>Process Withdrawal</span>
        </Button>
      </div>
      
      {/* Agent Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-lg">Commissions</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-bold">
              {new Intl.NumberFormat('fr-CM', { style: 'currency', currency: 'XAF' }).format(commissions)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-lg">Transactions</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-bold">{agentTransactions.length}</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Transaction History */}
      <Tabs defaultValue="all">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold mb-2">Transaction History</h2>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="deposit">Deposits</TabsTrigger>
            <TabsTrigger value="withdrawal">Withdrawals</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="mt-0">
          {agentTransactions.length > 0 ? (
            <TransactionList transactions={agentTransactions} />
          ) : (
            <p className="text-center text-muted-foreground py-8">No transactions yet</p>
          )}
        </TabsContent>
        
        <TabsContent value="deposit" className="mt-0">
          {agentTransactions.filter(tx => tx.type === "deposit").length > 0 ? (
            <TransactionList 
              transactions={agentTransactions.filter(tx => tx.type === "deposit")} 
            />
          ) : (
            <p className="text-center text-muted-foreground py-8">No deposits yet</p>
          )}
        </TabsContent>
        
        <TabsContent value="withdrawal" className="mt-0">
          {agentTransactions.filter(tx => tx.type === "withdrawal").length > 0 ? (
            <TransactionList 
              transactions={agentTransactions.filter(tx => tx.type === "withdrawal")} 
            />
          ) : (
            <p className="text-center text-muted-foreground py-8">No withdrawals yet</p>
          )}
        </TabsContent>
      </Tabs>
      
      {/* QR Code Dialog */}
      {showQR && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card p-6 rounded-lg w-full max-w-xs">
            <h3 className="text-xl font-bold mb-4">Your Agent QR Code</h3>
            <div className="bg-white p-4 rounded-md mb-4">
              <PersonalQRCode value={`ZAMO-AGENT:${agentCode}`} size={200} />
            </div>
            <p className="text-center text-sm mb-4">
              Customers can scan this code to find you
            </p>
            <Button className="w-full" onClick={() => setShowQR(false)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentSpace;
