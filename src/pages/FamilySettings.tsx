
import { useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { 
  ArrowLeft, 
  Users, 
  UserPlus, 
  Bell, 
  Settings, 
  LogOut, 
  Pencil, 
  Trash2,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

// Mock family data
const familyMembers = [
  { id: '1', name: 'Jean Dupont', role: 'admin', phone: '+237 656 123 456' },
  { id: '2', name: 'Marie Mbeki', role: 'member', phone: '+237 677 234 567' },
  { id: '3', name: 'Paul Touré', role: 'member', phone: '+237 699 345 678' },
];

const FamilySettings = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [memberToRemove, setMemberToRemove] = useState<string | null>(null);

  const handleLeaveFamily = () => {
    toast.success(t("family.leftFamily"));
    navigate("/dashboard");
  };

  const handleRemoveMember = () => {
    if (memberToRemove) {
      toast.success(t("family.memberRemoved"));
      setMemberToRemove(null);
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
          {t("family.settings")}
        </h1>
        <div className="w-9"></div> {/* Spacer for alignment */}
      </div>
      
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-primary-blue/10 flex items-center justify-center">
          <Users size={32} className="text-primary-blue" />
        </div>
      </div>
      
      <Card className="p-5 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">{t("family.name")}</h2>
          <Button variant="ghost" size="icon">
            <Pencil size={16} className="text-muted-foreground" />
          </Button>
        </div>
        
        <div className="text-lg font-medium mb-1">Famille Dupont</div>
        <div className="text-sm text-muted-foreground">
          {t("family.createdOn")} {new Date().toLocaleDateString()}
        </div>
      </Card>
      
      <div className="space-y-4 mb-6">
        <h2 className="font-semibold text-lg">
          {t("family.members")} ({familyMembers.length})
        </h2>
        
        {familyMembers.map((member) => (
          <Card key={member.id} className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className={member.role === 'admin' ? 'bg-primary-blue/20 text-primary-blue' : ''}>
                    {member.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <div className="font-medium flex items-center">
                    {member.name}
                    {member.role === 'admin' && (
                      <Badge variant="outline" className="ml-2 text-xs border-primary-blue text-primary-blue">
                        {t("family.admin")}
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">{member.phone}</div>
                </div>
              </div>
              
              {member.role !== 'admin' && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setMemberToRemove(member.id)}
                >
                  <Trash2 size={16} className="text-red-500" />
                </Button>
              )}
            </div>
          </Card>
        ))}
        
        <Button className="w-full flex items-center" onClick={() => navigate("/add-contact")}>
          <UserPlus size={16} className="mr-2" />
          {t("family.addMember")}
        </Button>
      </div>
      
      <Card className="p-5 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Bell size={20} className="text-primary-blue" />
            <div>
              <h3 className="font-medium">{t("family.notifications")}</h3>
              <p className="text-xs text-muted-foreground">{t("family.notificationsDescription")}</p>
            </div>
          </div>
          <Switch checked={notifications} onCheckedChange={setNotifications} />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Settings size={20} className="text-primary-blue" />
            <div>
              <h3 className="font-medium">{t("family.preferences")}</h3>
              <p className="text-xs text-muted-foreground">{t("family.preferencesDescription")}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <ChevronRight size={16} />
          </Button>
        </div>
      </Card>
      
      <div className="pt-4">
        <Button 
          variant="destructive"
          className="w-full"
          onClick={handleLeaveFamily}
        >
          <LogOut size={16} className="mr-2" />
          {t("family.leaveFamily")}
        </Button>
      </div>
      
      {/* Remove member dialog */}
      <Dialog open={!!memberToRemove} onOpenChange={() => setMemberToRemove(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("family.removeMember")}</DialogTitle>
          </DialogHeader>
          
          <p className="py-4">{t("family.removeMemberConfirm")}</p>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setMemberToRemove(null)}>
              {t("common.cancel")}
            </Button>
            <Button variant="destructive" onClick={handleRemoveMember}>
              {t("family.remove")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FamilySettings;
