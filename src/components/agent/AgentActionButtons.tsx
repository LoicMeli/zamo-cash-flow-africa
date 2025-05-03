
import React from "react";
import { Button } from "@/components/ui/button";
import { SendHorizontal, ArrowDownToLine } from "lucide-react";

interface AgentActionButtonsProps {
  onDeposit: () => void;
  onWithdrawal: () => void;
}

const AgentActionButtons = ({ onDeposit, onWithdrawal }: AgentActionButtonsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button className="h-24 flex flex-col" onClick={onDeposit}>
        <SendHorizontal className="h-6 w-6 mb-2" />
        <span>Make Deposit</span>
      </Button>
      <Button className="h-24 flex flex-col" onClick={onWithdrawal}>
        <ArrowDownToLine className="h-6 w-6 mb-2" />
        <span>Process Withdrawal</span>
      </Button>
    </div>
  );
};

export default AgentActionButtons;
