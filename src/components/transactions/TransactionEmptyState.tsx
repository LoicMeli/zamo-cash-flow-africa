
import { useLanguage } from "@/providers/LanguageProvider";
import { CardContent } from "@/components/ui/card";

const TransactionEmptyState = () => {
  const { t } = useLanguage();
  
  return (
    <CardContent className="text-center py-8 text-muted-foreground">
      {t('dashboard.noTransactions')}
    </CardContent>
  );
};

export default TransactionEmptyState;
