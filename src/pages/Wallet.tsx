
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useLanguage } from "@/providers/LanguageProvider";
import { Send, QrCode, CreditCard, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import WalletCard from "@/components/WalletCard";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const Wallet = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const walletActions = [
    {
      icon: Send,
      label: t('wallet.send'),
      localExpression: t('wallet.sendLocal'),
      href: "/send"
    },
    {
      icon: QrCode,
      label: t('wallet.receive'),
      localExpression: t('wallet.receiveLocal'),
      href: "/scan"
    },
    {
      icon: Banknote,
      label: t('wallet.withdraw'),
      localExpression: t('wallet.withdrawLocal'),
      href: "/withdraw"
    },
    {
      icon: CreditCard,
      label: t('wallet.topUp'),
      localExpression: t('wallet.topUpLocal'),
      href: "/topup"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6 py-2">
      <h1 className="text-xl font-bold">
        {t('wallet.title')}
      </h1>

      {/* Wallet Card */}
      <motion.div 
        variants={item} 
        initial="hidden"
        animate="show"
      >
        <WalletCard />
      </motion.div>

      {/* Wallet Actions */}
      <motion.div 
        className="grid grid-cols-2 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {walletActions.map((action, index) => (
          <motion.div key={index} variants={item}>
            <Button 
              variant="outline" 
              className="w-full h-24 flex flex-col items-center justify-center gap-2 rounded-xl"
              asChild
            >
              <a href={action.href}>
                <action.icon size={24} className="text-primary-blue" />
                <div className="flex flex-col items-center">
                  <span className="font-medium text-sm">{action.label}</span>
                  <span className="text-xs text-muted-foreground italic">"{action.localExpression}"</span>
                </div>
              </a>
            </Button>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Transactions - Teaser */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{t('wallet.recentTransactions')}</h2>
          <Button variant="ghost" size="sm" asChild>
            <a href="/transactions">{t('common.viewAll')}</a>
          </Button>
        </div>
        <Card className="p-4">
          <div className="text-center py-4 text-muted-foreground">
            {t('wallet.noRecentTransactions')}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Wallet;
