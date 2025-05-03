
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/providers/LanguageProvider";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Upload, MapPin, User, Phone, Store } from "lucide-react";
import { toast } from "sonner";

const BecomeAgent = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phoneNumber || "");
  const [location, setLocation] = useState("");
  const [idPhoto, setIdPhoto] = useState<File | null>(null);
  const [storePhoto, setStorePhoto] = useState<File | null>(null);
  const [useGPS, setUseGPS] = useState(false);
  
  const handleIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdPhoto(e.target.files[0]);
    }
  };
  
  const handleStoreUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setStorePhoto(e.target.files[0]);
    }
  };
  
  const handleTakePhoto = (type: 'id' | 'store') => {
    // This would be implemented with a camera component
    toast.info("Camera functionality will be implemented");
  };
  
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude}, ${longitude}`);
          setUseGPS(true);
          setLoading(false);
        },
        (error) => {
          toast.error("Error getting location: " + error.message);
          setLoading(false);
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser");
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !phone || !location || !idPhoto) {
      toast.error(t("error"));
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulating API call since we don't have Supabase yet
      // In a real implementation, this would upload to Firestore/Supabase
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Your agent application has been submitted");
      navigate("/settings");
    } catch (error) {
      toast.error("Error submitting application");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{t("common.becomeAgent")}</h1>
        <p className="text-muted-foreground">
          Complete this form to apply as a Zamo agent
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <div className="relative">
              <Input 
                id="fullName" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                className="pl-10"
                required
              />
              <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          
          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Input 
                id="phone" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+237 6XXXXXXXX"
                className="pl-10"
                required
              />
              <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          
          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                {useGPS ? (
                  <Input 
                    id="location" 
                    value={location} 
                    readOnly
                    className="pl-10"
                  />
                ) : (
                  <Textarea 
                    id="location" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Your address or coordinates"
                    className="pl-10 min-h-[80px]"
                    required
                  />
                )}
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleGetLocation}
                disabled={loading}
              >
                <MapPin className="mr-2 h-4 w-4" /> GPS
              </Button>
            </div>
          </div>
          
          {/* ID Photo */}
          <div className="space-y-2">
            <Label htmlFor="idPhoto">ID Photo (Required)</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <Input 
                  id="idPhoto"
                  type="file" 
                  accept="image/*"
                  onChange={handleIdUpload}
                  className="hidden"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => document.getElementById('idPhoto')?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" /> Upload ID
                </Button>
              </div>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => handleTakePhoto('id')}
              >
                <Camera className="mr-2 h-4 w-4" /> Take Photo
              </Button>
            </div>
            {idPhoto && (
              <p className="text-sm text-muted-foreground">{idPhoto.name}</p>
            )}
          </div>
          
          {/* Store Photo */}
          <div className="space-y-2">
            <Label htmlFor="storePhoto">
              Store Photo (Optional)
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <Input 
                  id="storePhoto"
                  type="file" 
                  accept="image/*"
                  onChange={handleStoreUpload}
                  className="hidden"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => document.getElementById('storePhoto')?.click()}
                >
                  <Store className="mr-2 h-4 w-4" /> Upload Photo
                </Button>
              </div>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => handleTakePhoto('store')}
              >
                <Camera className="mr-2 h-4 w-4" /> Take Photo
              </Button>
            </div>
            {storePhoto && (
              <p className="text-sm text-muted-foreground">{storePhoto.name}</p>
            )}
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t("common.loading") : "Submit Application"}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            className="w-full"
            onClick={() => navigate("/settings")}
          >
            {t("common.cancel")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BecomeAgent;
