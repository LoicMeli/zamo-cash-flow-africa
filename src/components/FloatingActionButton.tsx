
import { useState } from "react";
import { CreditCard, Plus, Wallet, UserPlus, X } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();

  const toggleFAB = () => {
    setIsOpen(!isOpen);
  };

  const fabItems = [
    {
      icon: UserPlus,
      label: t("common.addContact"),
      action: () => navigate("/add-contact"),
      color: "bg-green-500 text-white",
    },
    {
      icon: Wallet,
      label: t("common.rechargeWallet"),
      action: () => navigate("/topup"),
      color: "bg-blue-500 text-white",
    },
    {
      icon: CreditCard,
      label: t("common.payBill"),
      action: () => navigate("/family-bills"),
      color: "bg-purple-500 text-white",
    },
  ];

  return (
    <div className="fixed bottom-20 right-4 z-20">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 right-0 flex flex-col space-y-3 items-end"
          >
            {fabItems.map((item, index) => (
              <motion.button
                key={item.label}
                onClick={() => {
                  setIsOpen(false);
                  item.action();
                }}
                initial={{ scale: 0, x: 20 }}
                animate={{ scale: 1, x: 0 }}
                exit={{ scale: 0, x: 20 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className={cn(
                  "flex items-center gap-2 py-2 pl-3 pr-4 rounded-full shadow-lg",
                  item.color
                )}
              >
                <item.icon size={18} />
                <span className="text-xs font-medium whitespace-nowrap">
                  {item.label}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleFAB}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "w-14 h-14 rounded-full bg-primary-blue text-white flex items-center justify-center shadow-lg",
          isOpen ? "bg-gray-600" : "bg-primary-blue"
        )}
      >
        {isOpen ? <X size={24} /> : <Plus size={24} />}
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;
