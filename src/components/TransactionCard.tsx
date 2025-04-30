
import { formatCurrency, formatDate } from "@/lib/utils";
import { useLanguage } from "@/providers/LanguageProvider";
import { Send, ArrowDownLeft, CreditCard } from "lucide-react";

type TransactionType = "send" | "receive" | "payment";

interface TransactionCardProps {
  type: TransactionType;
  amount: number;
  name: string;
  date: Date;
}

const TransactionCard = ({ type, amount, name, date }: TransactionCardProps) => {
  const { language } = useLanguage();
  
  // Determine icon and styles based on transaction type
  const getTransactionDetails = () => {
    switch (type) {
      case "send":
        return {
          icon: Send,
          textColor: "text-red-600 dark:text-red-400",
          bgColor: "bg-red-100 dark:bg-red-500/20",
          sign: "-"
        };
      case "receive":
        return {
          icon: ArrowDownLeft,
          textColor: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-100 dark:bg-green-500/20",
          sign: "+"
        };
      case "payment":
        return {
          icon: CreditCard,
          textColor: "text-red-600 dark:text-red-400",
          bgColor: "bg-blue-100 dark:bg-blue-500/20",
          sign: "-"
        };
      default:
        return {
          icon: CreditCard,
          textColor: "text-foreground",
          bgColor: "bg-muted",
          sign: ""
        };
    }
  };
  
  const { icon: Icon, textColor, bgColor, sign } = getTransactionDetails();
  
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-card hover:bg-muted/50 transition-colors">
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${bgColor}`}>
          <Icon size={18} className={textColor} />
        </div>
        <div>
          <div className="font-medium truncate max-w-[150px]">{name}</div>
          <div className="text-xs text-muted-foreground">{formatDate(date, language === 'fr' ? 'fr-FR' : 'en-US')}</div>
        </div>
      </div>
      <div className={`font-semibold ${textColor}`}>
        {sign}{formatCurrency(amount)} FCFA
      </div>
    </div>
  );
};

export default TransactionCard;
