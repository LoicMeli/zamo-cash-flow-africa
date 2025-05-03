
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AgentStatsCardsProps {
  commissions: number;
  transactionCount: number;
}

const AgentStatsCards = ({ commissions, transactionCount }: AgentStatsCardsProps) => {
  return (
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
          <p className="text-2xl font-bold">{transactionCount}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentStatsCards;
