
import { useState } from "react";
import { QrCode, Plus, Wallet, CreditCard, UserPlus, X } from "lucide-react";
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
      icon: QrCode,
      label: t("common.scan"),
      action: () => navigate("/scan"),
      color: "bg-blue-600",
    },
    {
      icon: Wallet,
      label: t("common.createTontine"),
      action: () => navigate("/group-savings"),
      color: "bg-purple-600",
    },
    {
      icon: CreditCard,
      label: t("common.payBill"),
      action: () => navigate("/family-bills"),
      color: "bg-orange-500",
    },
    {
      icon: UserPlus,
      label: t("common.addContact"),
      action: () => navigate("/family"),
      color: "bg-green-600",
    },
  ];

  return (
    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-20">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2"
          >
            <div className="grid grid-cols-2 gap-3">
              {fabItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => {
                    setIsOpen(false);
                    item.action();
                  }}
                  initial={{ scale: 0, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0, y: 20 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={cn(
                    "flex flex-col items-center gap-1 p-3 rounded-lg shadow-md",
                    item.color
                  )}
                >
                  <item.icon size={20} className="text-white" />
                  <span className="text-xs font-medium text-white">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleFAB}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "w-16 h-16 rounded-full bg-primary-blue text-white flex items-center justify-center shadow-lg transition-transform",
          isOpen ? "rotate-45" : "rotate-0"
        )}
      >
        {isOpen ? <X size={24} /> : <Plus size={24} />}
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;
