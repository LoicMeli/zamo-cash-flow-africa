
import React, { useState } from "react";
import { Send, QrCode, Wallet, X } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const toggleFAB = () => {
    setIsOpen(!isOpen);
  };

  const fabItems = [
    {
      icon: Send,
      label: t("common.send"),
      href: "/send",
      color: "bg-blue-600",
    },
    {
      icon: QrCode,
      label: t("common.scan"),
      href: "/scan",
      color: "bg-blue-700",
    },
    {
      icon: Wallet,
      label: t("common.savings"),
      href: "/savings",
      color: "bg-blue-800",
    },
  ];

  return (
    <div className="fixed bottom-20 right-4 z-20">
      <AnimatePresence>
        {isOpen && (
          <div className="absolute bottom-16 right-1">
            <div className="flex flex-col-reverse items-end gap-3">
              {fabItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-sm font-medium bg-card px-2 py-1 rounded-md shadow-sm">
                    {item.label}
                  </span>
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center shadow-md",
                      item.color
                    )}
                  >
                    <item.icon size={20} className="text-white" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleFAB}
        className={cn(
          "w-14 h-14 rounded-full bg-primary-blue text-white flex items-center justify-center shadow-lg transition-transform",
          isOpen ? "rotate-45" : "rotate-0"
        )}
      >
        {isOpen ? <X size={24} /> : <Send size={24} />}
      </button>
    </div>
  );
};

export default FloatingActionButton;
