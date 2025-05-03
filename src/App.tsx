
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import { ThemeProvider } from "@/providers/ThemeProvider";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { AuthProvider } from "@/providers/AuthProvider";

// Pages
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import OTPVerification from "./pages/auth/OTPVerification";
import SetupPIN from "./pages/auth/SetupPIN";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import SendMoney from "./pages/SendMoney";
import ScanQR from "./pages/ScanQR";
import FindAgent from "./pages/FindAgent";
import FamilyWallet from "./pages/FamilyWallet";
import Savings from "./pages/Savings";
import Settings from "./pages/Settings";
import GroupSavings from "./pages/GroupSavings";
import FamilyBills from "./pages/FamilyBills";
import FinancialCoach from "./pages/FinancialCoach";
import NotFound from "./pages/NotFound";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import Wallet from "./pages/Wallet";
import Withdraw from "./pages/Withdraw";
import WithdrawDetails from "./pages/WithdrawDetails";
import TopUp from "./pages/TopUp";
import TopUpMethod from "./pages/TopUpMethod";
import FamilySettings from "./pages/FamilySettings";
import SavingsDetail from "./pages/SavingsDetail";
import Notifications from "./pages/Notifications";
import SecuritySettings from "./pages/SecuritySettings";
import AddContact from "./pages/AddContact";
import NotificationSettings from "./pages/NotificationSettings";
import Referral from "./pages/Referral";
import BecomeAgent from "./pages/BecomeAgent";
import AgentSpace from "./pages/AgentSpace";

// Create a new QueryClient instance with proper options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route element={<AuthLayout />}>
                      <Route path="/login" element={<Login />} />
                      <Route path="/verify" element={<OTPVerification />} />
                      <Route path="/setup-pin" element={<SetupPIN />} />
                    </Route>
                    <Route element={<AppLayout />}>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/wallet" element={<Wallet />} />
                      <Route path="/send" element={<SendMoney />} />
                      <Route path="/scan" element={<ScanQR />} />
                      <Route path="/withdraw" element={<Withdraw />} />
                      <Route path="/withdraw/:agentId" element={<WithdrawDetails />} />
                      <Route path="/topup" element={<TopUp />} />
                      <Route path="/topup/:method" element={<TopUpMethod />} />
                      <Route path="/agents" element={<FindAgent />} />
                      <Route path="/family" element={<FamilyWallet />} />
                      <Route path="/family/settings" element={<FamilySettings />} />
                      <Route path="/savings" element={<Savings />} />
                      <Route path="/savings/:id" element={<SavingsDetail />} />
                      <Route path="/group-savings" element={<GroupSavings />} />
                      <Route path="/family-bills" element={<FamilyBills />} />
                      <Route path="/financial-coach" element={<FinancialCoach />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/settings/security" element={<SecuritySettings />} />
                      <Route path="/settings/notifications" element={<NotificationSettings />} />
                      <Route path="/notifications" element={<Notifications />} />
                      <Route path="/add-contact" element={<AddContact />} />
                      <Route path="/referral" element={<Referral />} />
                      <Route path="/become-agent" element={<BecomeAgent />} />
                      <Route path="/agent-space" element={<AgentSpace />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
