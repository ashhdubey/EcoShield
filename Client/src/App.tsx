// Path: Client/src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { AuthProvider, useAuth } from "@/contexts/AuthContext"; 

import MainLayout from "@/components/layout/MainLayout";
import HomePage from "@/pages/HomePage";
import ChroniclePage from "@/pages/ChroniclePage";
import RegenEarthPage from "@/pages/RegenEarthPage";
import MyShieldPage from "@/pages/MyShieldPage";
import AboutPage from "@/pages/AboutPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProfilePage from "@/pages/ProfilePage";
import HelpPage from "@/pages/HelpPage";
import ComparePage from "@/pages/ComparePage";
import RankingPage from "@/pages/RankingPage";
// REMOVED: TestNotificationPage import

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="container py-12 text-center">Loading...</div>;
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">
        <BrowserRouter>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="chronicle" element={<ChroniclePage />} />
                  <Route path="regen-earth" element={<RegenEarthPage />} />
                  <Route path="my-shield" element={
                    <ProtectedRoute>
                      <MyShieldPage />
                    </ProtectedRoute>
                  } />
                  <Route path="profile" element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="help" element={<HelpPage />} />
                  <Route path="compare" element={<ComparePage />} />
                  <Route path="rankings" element={<RankingPage />} />
                  {/* REMOVED: test-notifications route */}
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </TooltipProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}