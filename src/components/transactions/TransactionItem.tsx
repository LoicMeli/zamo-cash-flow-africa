
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Transaction } from "./types";
import { useLanguage } from "@/providers/LanguageProvider";

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem = ({ transaction: tx }: TransactionItemProps) => {
  const { language } = useLanguage();
  
  // Get transaction details based on type
  const getTransactionDetails = (type: Transaction['type']) => {
    switch (type) {
      case "send":
      case "withdrawal":
        return {
          iconColor: "text-red-500",
          bgColor: "bg-red-50 dark:bg-red-950/30",
          textColor: "text-red-600 dark:text-red-400",
          sign: "-",
        };
      case "receive":
      case "deposit":
        return {
          iconColor: "text-green-500",
          bgColor: "bg-green-50 dark:bg-green-950/30",
          textColor: "text-green-600 dark:text-green-400",
          sign: "+",
        };
      case "payment":
        return {
          iconColor: "text-blue-500",
          bgColor: "bg-blue-50 dark:bg-blue-950/30",
          textColor: "text-blue-600 dark:text-blue-400",
          sign: "-",
        };
    }
  };
  
  const details = getTransactionDetails(tx.type);
  const displayName = tx.name || (tx.user ? tx.user.name : 'Unknown');
  
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
      className="flex items-center p-4"
    >
      <Avatar className="h-10 w-10 mr-3">
        {tx.avatar ? (
          <AvatarImage src={tx.avatar} alt={displayName} />
        ) : (
          <AvatarFallback className={cn(details?.bgColor, details?.textColor)}>
            {displayName.substring(0, 1)}
          </AvatarFallback>
        )}
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{displayName}</p>
        <p className="text-xs text-muted-foreground">
          {formatDate(tx.date, language === 'fr' ? 'fr-FR' : 'en-US')}
        </p>
      </div>
      
      <div className={cn("font-semibold", details?.textColor)}>
        {details?.sign}{formatCurrency(tx.amount)} FCFA
      </div>
    </motion.div>
  );
};

export default TransactionItem;
