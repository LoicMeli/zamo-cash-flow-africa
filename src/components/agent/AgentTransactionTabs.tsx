
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionList from "@/components/TransactionList";
import { Transaction } from "@/components/transactions/types";

interface AgentTransactionTabsProps {
  transactions: Transaction[];
}

const AgentTransactionTabs = ({ transactions }: AgentTransactionTabsProps) => {
  return (
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
        {transactions.length > 0 ? (
          <TransactionList transactions={transactions} />
        ) : (
          <p className="text-center text-muted-foreground py-8">No transactions yet</p>
        )}
      </TabsContent>
      
      <TabsContent value="deposit" className="mt-0">
        {transactions.filter(tx => tx.type === "deposit").length > 0 ? (
          <TransactionList 
            transactions={transactions.filter(tx => tx.type === "deposit")} 
          />
        ) : (
          <p className="text-center text-muted-foreground py-8">No deposits yet</p>
        )}
      </TabsContent>
      
      <TabsContent value="withdrawal" className="mt-0">
        {transactions.filter(tx => tx.type === "withdrawal").length > 0 ? (
          <TransactionList 
            transactions={transactions.filter(tx => tx.type === "withdrawal")} 
          />
        ) : (
          <p className="text-center text-muted-foreground py-8">No withdrawals yet</p>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default AgentTransactionTabs;
