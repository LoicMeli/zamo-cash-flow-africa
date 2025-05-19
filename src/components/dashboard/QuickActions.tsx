
import React from 'react';
import { Button } from '../ui/button';
import { ArrowUp, ArrowDown, CreditCard, MoreHorizontal } from 'lucide-react';

interface QuickActionsProps {
  onSendMoney?: () => void;
  onReceiveMoney?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ 
  onSendMoney, 
  onReceiveMoney 
}) => {
  return (
    <div className="py-4">
      <h2 className="text-base font-medium text-foreground mb-3">Quick Actions</h2>
      <div className="grid grid-cols-4 gap-4">
        <Button 
          onClick={onSendMoney} 
          variant="ghost" 
          className="flex flex-col items-center h-auto py-3 space-y-2"
        >
          <div className="bg-blue-100 rounded-full p-3">
            <ArrowUp className="h-5 w-5 text-primary-blue" />
          </div>
          <span className="text-xs">Send</span>
        </Button>
        
        <Button 
          onClick={onReceiveMoney} 
          variant="ghost" 
          className="flex flex-col items-center h-auto py-3 space-y-2"
        >
          <div className="bg-green-100 rounded-full p-3">
            <ArrowDown className="h-5 w-5 text-green-600" />
          </div>
          <span className="text-xs">Receive</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className="flex flex-col items-center h-auto py-3 space-y-2"
        >
          <div className="bg-orange-100 rounded-full p-3">
            <CreditCard className="h-5 w-5 text-orange-500" />
          </div>
          <span className="text-xs">Pay</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className="flex flex-col items-center h-auto py-3 space-y-2"
        >
          <div className="bg-purple-100 rounded-full p-3">
            <MoreHorizontal className="h-5 w-5 text-purple-600" />
          </div>
          <span className="text-xs">More</span>
        </Button>
      </div>
    </div>
  );
};
