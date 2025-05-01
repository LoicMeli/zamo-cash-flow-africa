
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import BottomNavigation from "@/components/BottomNavigation";
import FloatingActionButton from "@/components/FloatingActionButton";
import { motion } from "framer-motion";

const AppLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-zamo-light dark:bg-zamo-dark">
      <main className="flex-1 pt-4 pb-24 px-4 max-w-md mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="animate-fade-in"
        >
          <Outlet />
        </motion.div>
      </main>
      <FloatingActionButton />
      <BottomNavigation />
    </div>
  );
};

export default AppLayout;
