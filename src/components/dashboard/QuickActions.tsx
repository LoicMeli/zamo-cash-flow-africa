
import React from 'react';
import { Button } from '../ui/button';
import { Icon } from '../../utils/IconComponent';

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
            <Icon name="arrow-up" size={20} color="#3B82F6" />
          </div>
          <span className="text-xs">Send</span>
        </Button>
        
        <Button 
          onClick={onReceiveMoney} 
          variant="ghost" 
          className="flex flex-col items-center h-auto py-3 space-y-2"
        >
          <div className="bg-green-100 rounded-full p-3">
            <Icon name="arrow-down" size={20} color="#22C55E" />
          </div>
          <span className="text-xs">Receive</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className="flex flex-col items-center h-auto py-3 space-y-2"
        >
          <div className="bg-orange-100 rounded-full p-3">
            <Icon name="credit-card" size={20} color="#F97316" />
          </div>
          <span className="text-xs">Pay</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className="flex flex-col items-center h-auto py-3 space-y-2"
        >
          <div className="bg-purple-100 rounded-full p-3">
            <Icon name="more-horizontal" size={20} color="#A855F7" />
          </div>
          <span className="text-xs">More</span>
        </Button>
      </div>
    </div>
  );
};
