
import { useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { ArrowLeft, Bell, Check, XCircle, User, RefreshCcw, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatRelativeTime } from "@/lib/utils";

// Mock notification data
const mockNotifications = [
  {
    id: "1",
    type: "transaction",
    title: "Transfer Successful",
    message: "You have successfully sent 25,000 FCFA to Marie Mbeki.",
    read: false,
    time: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    icon: Check,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: "2",
    type: "security",
    title: "New Login",
    message: "Your account was accessed from a new device in Yaoundé.",
    read: false,
    time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    icon: XCircle,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    id: "3",
    type: "account",
    title: "Profile Updated",
    message: "Your account information has been updated successfully.",
    read: true,
    time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    icon: User,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: "4",
    type: "transaction",
    title: "Money Received",
    message: "You received 50,000 FCFA from Jean Dupont.",
    read: true,
    time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    icon: Check,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: "5",
    type: "system",
    title: "System Update",
    message: "Zamo has been updated with new features and improvements.",
    read: true,
    time: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    icon: RefreshCcw,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    id: "6",
    type: "offer",
    title: "Special Offer",
    message: "Enjoy zero transaction fees for the next 7 days!",
    read: true,
    time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    icon: CreditCard,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
];

const Notifications = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  // Group notifications by date
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);
  
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);
  lastWeek.setHours(0, 0, 0, 0);
  
  const notificationsByDate = {
    today: notifications.filter(n => n.time >= today),
    yesterday: notifications.filter(n => n.time < today && n.time >= yesterday),
    lastWeek: notifications.filter(n => n.time < yesterday && n.time >= lastWeek),
    older: notifications.filter(n => n.time < lastWeek)
  };

  const hasUnread = notifications.some(n => !n.read);

  return (
    <div className="space-y-6 py-2">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-bold">
          {t("notifications.title")}
        </h1>
        <div className="w-9"></div> {/* Spacer for alignment */}
      </div>
      
      {hasUnread && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-blue"
            onClick={markAllAsRead}
          >
            {t("notifications.markAllRead")}
          </Button>
        </div>
      )}
      
      {!notifications.length ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Bell size={28} className="text-muted-foreground" />
          </div>
          <h2 className="font-semibold text-lg">{t("notifications.noNotifications")}</h2>
          <p className="text-sm text-muted-foreground">{t("notifications.noNotificationsMessage")}</p>
        </div>
      ) : (
        <>
          {/* Today's notifications */}
          {notificationsByDate.today.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-medium text-muted-foreground">
                {t("notifications.today")}
              </h2>
              
              {notificationsByDate.today.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`p-4 relative ${notification.read ? 'bg-card' : 'bg-primary-blue/5 border-primary-blue/20'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex gap-3">
                    <div className={`w-10 h-10 rounded-full ${notification.iconBg} flex-shrink-0 flex items-center justify-center`}>
                      <notification.icon size={18} className={notification.iconColor} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold truncate">{notification.title}</h3>
                        <div className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                          {formatRelativeTime(notification.time)}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                  
                  {!notification.read && (
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary-blue"></div>
                  )}
                </Card>
              ))}
            </div>
          )}
          
          {/* Yesterday's notifications */}
          {notificationsByDate.yesterday.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-medium text-muted-foreground">
                {t("notifications.yesterday")}
              </h2>
              
              {notificationsByDate.yesterday.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`p-4 relative ${notification.read ? 'bg-card' : 'bg-primary-blue/5 border-primary-blue/20'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex gap-3">
                    <div className={`w-10 h-10 rounded-full ${notification.iconBg} flex-shrink-0 flex items-center justify-center`}>
                      <notification.icon size={18} className={notification.iconColor} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold truncate">{notification.title}</h3>
                        <div className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                          {formatRelativeTime(notification.time)}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                  
                  {!notification.read && (
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary-blue"></div>
                  )}
                </Card>
              ))}
            </div>
          )}
          
          {/* Last week's notifications */}
          {notificationsByDate.lastWeek.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-medium text-muted-foreground">
                {t("notifications.lastWeek")}
              </h2>
              
              {notificationsByDate.lastWeek.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`p-4 relative ${notification.read ? 'bg-card' : 'bg-primary-blue/5 border-primary-blue/20'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex gap-3">
                    <div className={`w-10 h-10 rounded-full ${notification.iconBg} flex-shrink-0 flex items-center justify-center`}>
                      <notification.icon size={18} className={notification.iconColor} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold truncate">{notification.title}</h3>
                        <div className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                          {formatRelativeTime(notification.time)}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          {/* Older notifications */}
          {notificationsByDate.older.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-medium text-muted-foreground">
                {t("notifications.older")}
              </h2>
              
              {notificationsByDate.older.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`p-4 relative ${notification.read ? 'bg-card' : 'bg-primary-blue/5 border-primary-blue/20'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex gap-3">
                    <div className={`w-10 h-10 rounded-full ${notification.iconBg} flex-shrink-0 flex items-center justify-center`}>
                      <notification.icon size={18} className={notification.iconColor} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold truncate">{notification.title}</h3>
                        <div className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                          {formatRelativeTime(notification.time)}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Notifications;
