
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TransactionItem from "./transactions/TransactionItem";
import TransactionEmptyState from "./transactions/TransactionEmptyState";
import { useMockTransactions } from "./transactions/useMockTransactions";
import { TransactionListProps } from "./transactions/types";
import { cn } from "@/lib/utils";

export type { Transaction } from "./transactions/types";

const TransactionList = ({ className, limit = 5, transactions: propTransactions }: TransactionListProps) => {
  const { t } = useLanguage();
  const transactions = useMockTransactions(limit, propTransactions);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (transactions.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-lg">{t('dashboard.recentTransactions')}</CardTitle>
        </CardHeader>
        <TransactionEmptyState />
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
          {transactions.map((transaction) => (
            <TransactionItem 
              key={transaction.id} 
              transaction={transaction} 
            />
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default TransactionList;
