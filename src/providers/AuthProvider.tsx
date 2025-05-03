
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export interface User {
  id: string;
  phoneNumber: string;
  name?: string;
  photoURL?: string;
  balance: number;
  phone?: string;
  email?: string;
  // We won't add displayName since we're using name instead
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (phoneNumber: string) => Promise<void>;
  verifyOTP: (otp: string) => Promise<boolean>;
  setupPIN: (pin: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  useEffect(() => {
    // Check for stored auth
    const storedUser = localStorage.getItem("zamo-user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem("zamo-user");
      }
    }
    setIsLoading(false);
  }, []);

  // Mock API calls
  const login = async (phoneNumber: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store phone number for OTP verification step
      setPhoneNumber(phoneNumber);
      
      setIsLoading(false);
      return;
    } catch (error) {
      setIsLoading(false);
      toast.error("Login failed. Please try again.");
      throw error;
    }
  };

  const verifyOTP = async (otp: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      toast.error("OTP verification failed");
      return false;
    }
  };

  const setupPIN = async (pin: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create mock user
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 15),
        phoneNumber,
        phone: phoneNumber,
        name: "",  // Use name instead of displayName
        email: "",
        balance: 12000,
      };
      
      setUser(newUser);
      localStorage.setItem("zamo-user", JSON.stringify(newUser));
      
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to set PIN");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("zamo-user");
    setUser(null);
    toast.info("You have been logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        verifyOTP,
        setupPIN,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
