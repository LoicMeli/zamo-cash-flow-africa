
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface AgentStatusToggleProps {
  isOnline: boolean;
  onStatusChange: (checked: boolean) => void;
}

const AgentStatusToggle = ({ isOnline, onStatusChange }: AgentStatusToggleProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="agent-status">{isOnline ? 'Online' : 'Offline'}</Label>
      <Switch 
        id="agent-status" 
        checked={isOnline} 
        onCheckedChange={onStatusChange}
      />
    </div>
  );
};

export default AgentStatusToggle;
