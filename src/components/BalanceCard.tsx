
import { formatCurrency } from "@/lib/utils";
import { useLanguage } from "@/providers/LanguageProvider";
import { cn } from "@/lib/utils";

interface BalanceCardProps {
  amount: number;
  className?: string;
}

const BalanceCard = ({ amount, className }: BalanceCardProps) => {
  const { t, language } = useLanguage();

  return (
    <div className={cn(
      "bg-primary-blue text-white rounded-2xl p-6 w-full shadow-lg", 
      "bg-gradient-to-br from-primary-blue to-blue-700",
      className
    )}>
      <h2 className="text-sm font-medium opacity-90 mb-2">
        {t('common.balance')}
      </h2>
      <div className="flex items-baseline">
        <span className="text-3xl font-bold mr-2">
          {formatCurrency(amount)}
        </span>
        <span className="text-sm opacity-90">FCFA</span>
      </div>
    </div>
  );
};

export default BalanceCard;
