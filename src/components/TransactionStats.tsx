
import { useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TransactionStatsProps {
  className?: string;
  moneyIn: number;
  moneyOut: number;
}

const TransactionStats = ({ className, moneyIn, moneyOut }: TransactionStatsProps) => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  
  const data = [
    { name: t('dashboard.moneyIn'), value: moneyIn, color: '#4f46e5' },
    { name: t('dashboard.moneyOut'), value: moneyOut, color: '#f43f5e' },
  ];
  
  const handleMouseEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(undefined);
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-4">
        <h3 className="font-medium mb-4">{t('dashboard.monthlyStats')}</h3>
        
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    strokeWidth={activeIndex === index ? 2 : 0}
                    stroke="#fff"
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${formatCurrency(value)} FCFA`, undefined]}
                contentStyle={{
                  borderRadius: '0.5rem',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center" 
                wrapperStyle={{
                  paddingTop: '20px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-2">
          {data.map((item, index) => (
            <motion.div 
              key={item.name}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-2 rounded-lg"
              style={{
                backgroundColor: `${item.color}15`
              }}
            >
              <div className="flex items-center mb-1">
                <div 
                  className="w-3 h-3 rounded-full mr-1" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm">{item.name}</span>
              </div>
              <span className="font-bold">{formatCurrency(item.value)} FCFA</span>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionStats;
