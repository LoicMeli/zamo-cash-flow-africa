
import { useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { ArrowLeft, BellRing, Bell, Mail, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const NotificationSettings = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [notifications, setNotifications] = useState({
    transactions: true,
    security: true,
    promotions: false,
    savings: true,
    groupActivity: true,
  });
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  
  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const savePreferences = () => {
    // In a real app, you would save these preferences to a backend
    toast.success(t("settings.notifications.notificationsUpdated"));
  };
  
  const requestPushPermission = async () => {
    if (!("Notification" in window)) {
      toast.error("This browser does not support notifications");
      return;
    }
    
    try {
      const permission = await window.Notification.requestPermission();
      if (permission === "granted") {
        setPushEnabled(true);
        toast.success("Push notifications enabled");
        
        // Create a sample notification
        new Notification("Zamo", {
          body: "Push notifications have been enabled!",
          icon: "/favicon.ico"
        });
      } else {
        setPushEnabled(false);
        toast.error("Permission denied for push notifications");
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      toast.error("Failed to request notification permission");
    }
  };
  
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
          {t("settings.notifications.title")}
        </h1>
        <div className="w-9"></div> {/* Spacer for alignment */}
      </div>
      
      <div className="zamo-card space-y-6 mb-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <BellRing size={20} className="text-primary-blue" />
              <div>
                <h3 className="font-medium">{t("settings.notifications.pushNotifications")}</h3>
                <p className="text-xs text-muted-foreground">
                  {pushEnabled 
                    ? "Receive alerts on your device" 
                    : "Enable to receive alerts on your device"}
                </p>
              </div>
            </div>
            <Switch 
              checked={pushEnabled} 
              onCheckedChange={(checked) => {
                if (checked) {
                  requestPushPermission();
                } else {
                  setPushEnabled(false);
                  toast.info("Push notifications disabled");
                }
              }} 
            />
          </div>
          
          {pushEnabled && (
            <div className="pl-8 space-y-4 border-l border-border">
              <div className="flex justify-between items-center">
                <span>{t("settings.notifications.transactions")}</span>
                <Switch 
                  checked={notifications.transactions} 
                  onCheckedChange={(checked) => handleNotificationChange("transactions", checked)} 
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span>{t("settings.notifications.security")}</span>
                <Switch 
                  checked={notifications.security} 
                  onCheckedChange={(checked) => handleNotificationChange("security", checked)} 
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span>{t("settings.notifications.promotions")}</span>
                <Switch 
                  checked={notifications.promotions} 
                  onCheckedChange={(checked) => handleNotificationChange("promotions", checked)} 
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span>{t("settings.notifications.savings")}</span>
                <Switch 
                  checked={notifications.savings} 
                  onCheckedChange={(checked) => handleNotificationChange("savings", checked)} 
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span>{t("settings.notifications.groupActivity")}</span>
                <Switch 
                  checked={notifications.groupActivity} 
                  onCheckedChange={(checked) => handleNotificationChange("groupActivity", checked)} 
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="pt-4 border-t border-border space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-primary-blue" />
              <div>
                <h3 className="font-medium">{t("settings.notifications.emailNotifications")}</h3>
                <p className="text-xs text-muted-foreground">Receive important notifications via email</p>
              </div>
            </div>
            <Switch 
              checked={emailEnabled} 
              onCheckedChange={(checked) => {
                setEmailEnabled(checked);
                toast.info(checked ? "Email notifications enabled" : "Email notifications disabled");
              }} 
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Smartphone size={20} className="text-primary-blue" />
              <div>
                <h3 className="font-medium">{t("settings.notifications.smsNotifications")}</h3>
                <p className="text-xs text-muted-foreground">Receive important notifications via SMS</p>
              </div>
            </div>
            <Switch 
              checked={smsEnabled} 
              onCheckedChange={(checked) => {
                setSmsEnabled(checked);
                toast.info(checked ? "SMS notifications enabled" : "SMS notifications disabled");
              }} 
            />
          </div>
        </div>
      </div>
      
      <Button 
        className="w-full bg-primary-blue hover:bg-primary-blue/90"
        onClick={savePreferences}
      >
        {t("common.save")}
      </Button>
    </div>
  );
};

export default NotificationSettings;
