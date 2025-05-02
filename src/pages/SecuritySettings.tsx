
import { useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { ArrowLeft, Lock, Fingerprint, Eye, EyeOff, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const SecuritySettings = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [usePIN, setUsePIN] = useState(true);
  const [useBiometrics, setUseBiometrics] = useState(false);
  const [isChangingPIN, setIsChangingPIN] = useState(false);
  const [currentPIN, setCurrentPIN] = useState("");
  const [newPIN, setNewPIN] = useState("");
  const [confirmPIN, setConfirmPIN] = useState("");
  const [showCurrentPIN, setShowCurrentPIN] = useState(false);
  const [showNewPIN, setShowNewPIN] = useState(false);
  const [showConfirmPIN, setShowConfirmPIN] = useState(false);
  const [isPINSuccess, setIsPINSuccess] = useState(false);

  const handlePINToggle = (checked: boolean) => {
    setUsePIN(checked);
    toast.success(checked ? t("security.pinEnabled") : t("security.pinDisabled"));
  };

  const handleBiometricsToggle = (checked: boolean) => {
    setUseBiometrics(checked);
    toast.success(checked ? t("security.biometricsEnabled") : t("security.biometricsDisabled"));
  };

  const handleChangePIN = () => {
    if (!currentPIN || currentPIN.length < 4) {
      toast.error(t("security.enterCurrentPIN"));
      return;
    }

    if (!newPIN || newPIN.length < 4) {
      toast.error(t("security.enterValidPIN"));
      return;
    }

    if (newPIN !== confirmPIN) {
      toast.error(t("security.pinsDontMatch"));
      return;
    }

    // Simulate PIN change
    setIsPINSuccess(true);
    
    // Reset form after success
    setTimeout(() => {
      setIsChangingPIN(false);
      setIsPINSuccess(false);
      setCurrentPIN("");
      setNewPIN("");
      setConfirmPIN("");
      toast.success(t("security.pinChanged"));
    }, 2000);
  };

  return (
    <div className="space-y-6 py-2">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => isChangingPIN ? setIsChangingPIN(false) : navigate(-1)}
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-bold">
          {t("security.title")}
        </h1>
        <div className="w-9"></div> {/* Spacer for alignment */}
      </div>
      
      {!isChangingPIN ? (
        <div className="zamo-card space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Lock size={20} className="text-primary-blue" />
              <div>
                <h3 className="font-medium">{t("security.usePIN")}</h3>
                <p className="text-xs text-muted-foreground">{t("security.usePINDescription")}</p>
              </div>
            </div>
            <Switch checked={usePIN} onCheckedChange={handlePINToggle} />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Fingerprint size={20} className="text-primary-blue" />
              <div>
                <h3 className="font-medium">{t("security.useBiometrics")}</h3>
                <p className="text-xs text-muted-foreground">{t("security.useBiometricsDescription")}</p>
              </div>
            </div>
            <Switch checked={useBiometrics} onCheckedChange={handleBiometricsToggle} />
          </div>
          
          <div className="pt-4 border-t border-border">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setIsChangingPIN(true)}
            >
              <Lock size={16} className="mr-2" />
              {t("security.changePIN")}
            </Button>
          </div>
        </div>
      ) : (
        <div className="zamo-card animate-fade-in">
          {!isPINSuccess ? (
            <>
              <h2 className="font-semibold mb-6">{t("security.changePIN")}</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("security.currentPIN")}
                  </label>
                  <div className="relative">
                    <Input
                      value={currentPIN}
                      onChange={(e) => setCurrentPIN(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
                      type={showCurrentPIN ? "text" : "password"}
                      placeholder="****"
                      className="zamo-input pr-10"
                      inputMode="numeric"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowCurrentPIN(!showCurrentPIN)}
                    >
                      {showCurrentPIN ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("security.newPIN")}
                  </label>
                  <div className="relative">
                    <Input
                      value={newPIN}
                      onChange={(e) => setNewPIN(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
                      type={showNewPIN ? "text" : "password"}
                      placeholder="****"
                      className="zamo-input pr-10"
                      inputMode="numeric"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowNewPIN(!showNewPIN)}
                    >
                      {showNewPIN ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("security.confirmPIN")}
                  </label>
                  <div className="relative">
                    <Input
                      value={confirmPIN}
                      onChange={(e) => setConfirmPIN(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
                      type={showConfirmPIN ? "text" : "password"}
                      placeholder="****"
                      className="zamo-input pr-10"
                      inputMode="numeric"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowConfirmPIN(!showConfirmPIN)}
                    >
                      {showConfirmPIN ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                </div>
              </div>
              
              <Button 
                className="zamo-btn-primary w-full"
                onClick={handleChangePIN}
              >
                {t("security.changePIN")}
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Check size={30} className="text-green-600" />
              </div>
              <h2 className="font-semibold text-lg mb-1">{t("security.pinChangedSuccess")}</h2>
              <p className="text-sm text-muted-foreground">{t("security.pinChangedSuccessMessage")}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SecuritySettings;
