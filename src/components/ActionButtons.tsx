
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/providers/LanguageProvider";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ActionButtonsProps {
  className?: string;
}

const ActionButtons = ({ className }: ActionButtonsProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const buttons = [
    {
      icon: ArrowUpRight,
      label: t('common.send'),
      color: "bg-blue-600",
      textColor: "text-white",
      action: () => navigate("/send"),
    },
    {
      icon: ArrowDownLeft,
      label: t('common.receive'),
      color: "bg-indigo-50 dark:bg-indigo-950/40",
      textColor: "text-indigo-600 dark:text-indigo-300",
      action: () => navigate("/scan"),
    },
  ];

  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      {buttons.map((button) => (
        <motion.button
          key={button.label}
          whileTap={{ scale: 0.95 }}
          onClick={button.action}
          className={cn(
            "flex items-center justify-center py-3 rounded-xl",
            "shadow-sm transition-all",
            button.color,
            button.textColor,
          )}
        >
          <button.icon size={16} className="mr-1.5" />
          <span className="font-medium">{button.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default ActionButtons;
