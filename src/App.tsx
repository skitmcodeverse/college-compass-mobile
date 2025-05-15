
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginForm from "./components/auth/LoginForm";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import StudentDashboard from "./components/dashboard/StudentDashboard";
import FacultyDashboard from "./components/dashboard/FacultyDashboard";
import AdminDashboard from "./components/dashboard/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginForm />} />
          
          {/* Student Dashboard Routes */}
          <Route
            path="/dashboard/student"
            element={
              <DashboardLayout userType="student">
                <StudentDashboard />
              </DashboardLayout>
            }
          />
          
          {/* Faculty Dashboard Routes */}
          <Route
            path="/dashboard/faculty"
            element={
              <DashboardLayout userType="faculty">
                <FacultyDashboard />
              </DashboardLayout>
            }
          />
          
          {/* Admin Dashboard Routes */}
          <Route
            path="/dashboard/admin"
            element={
              <DashboardLayout userType="admin">
                <AdminDashboard />
              </DashboardLayout>
            }
          />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
