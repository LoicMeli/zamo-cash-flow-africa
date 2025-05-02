
import { useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { ArrowLeft, User, Check, Phone, Users, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { formatPhoneNumber } from "@/lib/utils";
import { toast } from "sonner";

type Step = "form" | "success";

const AddContact = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhone(formattedPhone);
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      toast.error(t("contacts.nameRequired"));
      return;
    }

    // Validate phone number
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 9) {
      toast.error(t("contacts.invalidPhone"));
      return;
    }

    setIsLoading(true);
    
    // Simulate adding contact
    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
    }, 1500);
  };

  const handleInvite = () => {
    toast.success(t("contacts.inviteSent"));
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
          {t("contacts.addContact")}
        </h1>
        <div className="w-9"></div> {/* Spacer for alignment */}
      </div>
      
      {step === "form" ? (
        <div className="animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary-blue/10 flex items-center justify-center">
              <User size={32} className="text-primary-blue" />
            </div>
          </div>
          
          <div className="zamo-card space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                {t("contacts.name")}
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("contacts.namePlaceholder")}
                className="zamo-input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                {t("contacts.phoneNumber")}
              </label>
              <Input
                value={phone}
                onChange={handlePhoneChange}
                placeholder={t("contacts.phonePlaceholder")}
                className="zamo-input"
                inputMode="tel"
              />
            </div>
            
            <Button 
              className="zamo-btn-primary w-full mt-4"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? t("common.loading") : t("contacts.addContact")}
            </Button>
          </div>
          
          <div className="flex flex-col items-center">
            <p className="text-sm text-muted-foreground mb-3">
              {t("contacts.notOnZamo")}
            </p>
            <Button 
              variant="outline" 
              className="flex items-center"
              onClick={handleInvite}
            >
              <Share size={16} className="mr-2" />
              {t("contacts.inviteToZamo")}
            </Button>
          </div>
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <Check size={40} className="text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold mb-2">
              {t("contacts.contactAdded")}
            </h2>
            
            <p className="text-center mb-6 text-muted-foreground">
              {name} {t("contacts.addedToContacts")}
            </p>
            
            <div className="zamo-card w-full mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <User size={24} className="text-muted-foreground" />
                </div>
                
                <div>
                  <h3 className="font-semibold">{name}</h3>
                  <p className="text-sm text-muted-foreground">{phone}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => navigate(`/send?recipient=${phone}`)}
                >
                  <Phone size={16} className="mr-2" />
                  {t("contacts.sendMoney")}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => navigate("/family?invite=true")}
                >
                  <Users size={16} className="mr-2" />
                  {t("contacts.addToFamily")}
                </Button>
              </div>
            </div>
            
            <Button 
              className="zamo-btn-primary w-full"
              onClick={() => navigate("/dashboard")}
            >
              {t("common.home")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddContact;
