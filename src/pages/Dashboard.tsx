
import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useLanguage } from "@/providers/LanguageProvider";
import { Bell, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import WalletCard from "@/components/WalletCard";
import ActionButtons from "@/components/ActionButtons";
import TransactionStats from "@/components/TransactionStats";
import TransactionList from "@/components/TransactionList";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");
  const [hasNotifications] = useState(true);
  
  // Mock stats data
  const stats = {
    moneyIn: 75000,
    moneyOut: 45000
  };
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting(t('dashboard.goodMorning'));
    } else if (hour < 18) {
      setGreeting(t('dashboard.goodAfternoon'));
    } else {
      setGreeting(t('dashboard.goodEvening'));
    }
  }, [t]);

  if (!user) return null;
  
  const userInitial = user?.name ? user.name[0].toUpperCase() : "Z";

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

  return (
    <motion.div 
      className="space-y-6 py-2"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Greeting and profile section */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{greeting}</p>
          <h1 className="text-xl font-bold">
            {user?.name || t('dashboard.user')}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full relative"
            onClick={() => navigate("/notifications")}
          >
            <Bell size={20} />
            {hasNotifications && (
              <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-red-500" />
            )}
          </Button>
          <Avatar 
            className="h-10 w-10 border-2 border-primary-blue/20 cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            {user?.photoURL ? (
              <AvatarImage src={user.photoURL} alt={user.name || "User"} />
            ) : (
              <AvatarFallback className="bg-primary-blue/10 text-primary-blue">
                {userInitial}
              </AvatarFallback>
            )}
          </Avatar>
        </div>
      </motion.div>
      
      {/* Balance card */}
      <motion.div variants={item}>
        <WalletCard />
      </motion.div>
      
      {/* Action buttons */}
      <motion.div variants={item}>
        <ActionButtons className="mt-4" />
      </motion.div>
      
      {/* Stats and charts */}
      <motion.div variants={item}>
        <TransactionStats 
          moneyIn={stats.moneyIn} 
          moneyOut={stats.moneyOut}
        />
      </motion.div>
      
      {/* Transaction history */}
      <motion.div variants={item}>
        <TransactionList />
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
