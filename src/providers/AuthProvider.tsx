import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (phone: string, pin: string) => Promise<void>;
  logout: () => Promise<void>;
  verifyOTP: (phone: string, otp: string) => Promise<void>;
  setupPIN: (pin: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (phone: string, pin: string) => {
    try {
      setIsLoading(true);
      // TODO: Implement actual API call
      const mockUser: User = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        phone,
        balance: 250000,
        currency: 'FCFA',
        isVerified: true,
        createdAt: new Date(),
      };

      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (phone: string, otp: string) => {
    try {
      setIsLoading(true);
      // TODO: Implement actual API call
      // For now, just simulate a successful verification
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const setupPIN = async (pin: string) => {
    try {
      setIsLoading(true);
      // TODO: Implement actual API call
      // For now, just simulate a successful PIN setup
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error setting up PIN:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    verifyOTP,
    setupPIN,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
