
import React from 'react';
import { ArrowUp, ArrowDown, CreditCard, MoreHorizontal, Eye, EyeOff } from 'lucide-react';

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: any;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, color = '#000', style }) => {
  const iconMap: Record<string, React.ReactNode> = {
    "arrow-up": <ArrowUp size={size} color={color} />,
    "arrow-down": <ArrowDown size={size} color={color} />,
    "credit-card": <CreditCard size={size} color={color} />,
    "more-horizontal": <MoreHorizontal size={size} color={color} />,
    "eye-outline": <Eye size={size} color={color} />,
    "eye-off-outline": <EyeOff size={size} color={color} />,
    "home": <div style={{ fontSize: size, color }}>🏠</div>,
    "wallet": <div style={{ fontSize: size, color }}>👛</div>,
    "list": <div style={{ fontSize: size, color }}>📋</div>,
    "person": <div style={{ fontSize: size, color }}>👤</div>,
    "trending-up": <div style={{ fontSize: size, color }}>📈</div>,
  };

  return (
    <div style={style}>
      {iconMap[name] || (
        <div style={{ fontSize: size, color }}>
          {name.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
};
