
import React from "react";
import { Button } from "@/components/ui/button";
import PersonalQRCode from "@/components/PersonalQRCode";

interface AgentQRCodeModalProps {
  showQR: boolean;
  agentCode: string;
  onClose: () => void;
}

const AgentQRCodeModal = ({ showQR, agentCode, onClose }: AgentQRCodeModalProps) => {
  if (!showQR) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card p-6 rounded-lg w-full max-w-xs">
        <h3 className="text-xl font-bold mb-4">Your Agent QR Code</h3>
        <div className="bg-white p-4 rounded-md mb-4">
          <PersonalQRCode 
            value={`ZAMO-AGENT:${agentCode}`} 
            size={200} 
          />
        </div>
        <p className="text-center text-sm mb-4">
          Customers can scan this code to find you
        </p>
        <Button className="w-full" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default AgentQRCodeModal;
