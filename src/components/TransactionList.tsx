import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Transaction = {
  id: string;
  type: 'send' | 'receive' | 'payment' | 'deposit' | 'withdrawal';
  amount: number;
  name?: string;
  date: Date;
  avatar?: string;
  fee?: number;
  status?: string;
  user?: {
    name: string;
    phone: string;
  };
};

interface TransactionListProps {
  className?: string;
  limit?: number;
  transactions?: Transaction[];
}

const TransactionList = ({ className, limit = 5, transactions: propTransactions }: TransactionListProps) => {
  const { t, language } = useLanguage();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // If transactions are provided as props, use them
    if (propTransactions && propTransactions.length > 0) {
      // Map the incoming transactions format to our internal format if needed
      const mappedTransactions = propTransactions.map(tx => {
        // If transaction already has a name, use it; otherwise try to get from user object
        if (!tx.name && tx.user) {
          return {
            ...tx,
            name: tx.user.name,
          };
        }
        return tx;
      });
      
      setTransactions(mappedTransactions.slice(0, limit));
      return;
    }
    
    // Otherwise use mock data (this would normally be an API call)
    const mockTransactions: Transaction[] = [
      {
        id: "tx1",
        type: "receive",
        amount: 15000,
        name: "Amadou Diallo",
        date: new Date(2025, 4, 1),
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      {
        id: "tx2",
        type: "send",
        amount: 5000,
        name: "Fatou Sow",
        date: new Date(2025, 4, 1),
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      {
        id: "tx3",
        type: "payment",
        amount: 7500,
        name: "Orange Télécom",
        date: new Date(2025, 3, 30),
      },
      {
        id: "tx4",
        type: "receive",
        amount: 35000,
        name: "Ibrahim Touré",
        date: new Date(2025, 3, 28),
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      {
        id: "tx5",
        type: "send",
        amount: 12000,
        name: "Aicha Koné",
        date: new Date(2025, 3, 27),
        avatar: "https://i.pravatar.cc/150?img=9",
      },
      {
        id: "tx6",
        type: "payment",
        amount: 25000,
        name: "Loyer Mensuel",
        date: new Date(2025, 3, 26),
      },
    ];

    setTransactions(mockTransactions.slice(0, limit));
  }, [limit, propTransactions]);

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (transactions.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-lg">{t('dashboard.recentTransactions')}</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8 text-muted-foreground">
          {t('dashboard.noTransactions')}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <CardTitle className="text-lg">{t('dashboard.recentTransactions')}</CardTitle>
        <Button variant="ghost" size="sm" className="text-primary-blue h-8 px-2">
          {t('common.viewAll')}
          <ChevronRight size={16} className="ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <motion.div 
          className="divide-y divide-border"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {transactions.map((tx) => {
            const details = getTransactionDetails(tx.type);
            const displayName = tx.name || (tx.user ? tx.user.name : 'Unknown');
            
            return (
              <motion.div
                key={tx.id}
                variants={item}
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
          })}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default TransactionList;
