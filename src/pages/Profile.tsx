
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, User, Bell, Shield, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/providers/LanguageProvider";

const Profile = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("profile");

  if (!user) return null;

  const userInitial = user?.name ? user.name[0].toUpperCase() : "Z";

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
        <p className="text-muted-foreground">{user.phone}</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Full Name</span>
                  <span className="font-medium">{user.name}</span>
                </div>
                <Separator />
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Phone Number</span>
                  <span className="font-medium">{user.phone}</span>
                </div>
                <Separator />
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium">{user.email || "Not set"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button variant="outline" className="w-full flex gap-2">
            <User size={16} />
            Edit Profile
          </Button>
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start gap-3">
              <Bell size={18} className="text-primary-blue" />
              Notifications
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <Shield size={18} className="text-primary-blue" />
              Security
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <HelpCircle size={18} className="text-primary-blue" />
              Help & Support
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 text-red-500 hover:text-red-600">
              Log Out
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
