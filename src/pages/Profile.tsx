
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, User, Bell, Shield, HelpCircle, LogOut, Globe, Lock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/providers/LanguageProvider";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Switch } from "@/components/ui/switch";

const Profile = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  if (!user) return null;

  const userInitial = user?.name ? user.name[0].toUpperCase() : "Z";
  const userPhone = user?.phone || user?.phoneNumber || "";
  const userEmail = user?.email || "";
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="space-y-6 py-2">
      <div className="flex flex-col items-center justify-center py-4">
        <Avatar className="h-24 w-24 mb-4 border-4 border-primary-blue/20">
          {user?.photoURL ? (
            <img src={user.photoURL} alt={user.name || "User"} />
          ) : (
            <AvatarFallback className="bg-primary-blue/10 text-primary-blue text-4xl">
              {userInitial}
            </AvatarFallback>
          )}
        </Avatar>
        <h1 className="text-xl font-bold">{user.name}</h1>
        <p className="text-muted-foreground">{userPhone}</p>
        <div className="mt-2 inline-block px-3 py-1 bg-primary-blue/10 text-primary-blue rounded-full text-xs">
          {t('profile.zamoID')}: {user.id?.substring(0, 8) || "ZAMO-1234"}
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="profile">{t('profile.info')}</TabsTrigger>
          <TabsTrigger value="settings">{t('profile.settings')}</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">{t('profile.fullName')}</span>
                  <span className="font-medium">{user.name}</span>
                </div>
                <Separator />
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">{t('profile.phoneNumber')}</span>
                  <span className="font-medium">{userPhone}</span>
                </div>
                <Separator />
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">{t('profile.email')}</span>
                  <span className="font-medium">{userEmail || t('profile.notSet')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button variant="outline" className="w-full flex gap-2">
            <User size={16} />
            {t('profile.editProfile')}
          </Button>
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <div className="space-y-2">
            {/* Language Settings */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe size={18} className="text-primary-blue" />
                    <span className="font-medium">{t('settings.language')}</span>
                  </div>
                  <LanguageSwitcher />
                </div>
              </CardContent>
            </Card>
            
            {/* Security Settings */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Lock size={18} className="text-primary-blue" />
                    <span className="font-medium">{t('settings.security')}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{t('settings.usePIN')}</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{t('settings.biometrics')}</span>
                    <Switch />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{t('settings.changePin')}</span>
                    <Button variant="outline" size="sm">{t('common.change')}</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* WhatsApp Support */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageCircle size={18} className="text-primary-blue" />
                    <span className="font-medium">{t('settings.whatsappSupport')}</span>
                  </div>
                  <Button variant="outline" size="sm" className="text-green-600">
                    {t('settings.contactUs')}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Logout Button */}
            <Button 
              variant="destructive" 
              className="w-full flex gap-2 mt-6"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              {t('common.logout')}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
