
import React from "react";
import { QrCode } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AgentBalanceCardProps {
  agentBalance: number;
  agentCode: string;
  onShowQR: () => void;
}

const AgentBalanceCard = ({ agentBalance, agentCode, onShowQR }: AgentBalanceCardProps) => {
  const { t } = useLanguage();
  
  return (
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
          <Button variant="outline" onClick={onShowQR}>
            <QrCode className="mr-2 h-4 w-4" />
            Show QR
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AgentBalanceCard;
