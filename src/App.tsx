
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
import DashboardRedirect from "./pages/dashboard";
import AttendancePage from "./pages/attendance";
import MarksPage from "./pages/marks";
import FeesPage from "./pages/fees";
import SyllabusPage from "./pages/syllabus";
import BusTrackingPage from "./pages/bus-tracking";
import PlacementsPage from "./pages/placements";
import NotificationsPage from "./pages/notifications";
import NotesPage from "./pages/notes";
import ReportIssuePage from "./pages/report";
import UserManagementPage from "./pages/users";
import SettingsPage from "./pages/settings";
import CreateEventPage from "./pages/events/create";
import MorePage from "./pages/more";
import { useState } from "react";

const App = () => {
  // Initialize QueryClient inside the component
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginForm />} />
            
            {/* Dashboard Redirect */}
            <Route path="/dashboard" element={<DashboardRedirect />} />
            
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

            {/* Feature Routes - Wrap all in appropriate DashboardLayout */}
            <Route path="/attendance" element={
              <DashboardLayout userType="student">
                <AttendancePage />
              </DashboardLayout>
            } />
            <Route path="/marks" element={
              <DashboardLayout userType="student">
                <MarksPage />
              </DashboardLayout>
            } />
            <Route path="/fees" element={
              <DashboardLayout userType="student">
                <FeesPage />
              </DashboardLayout>
            } />
            <Route path="/syllabus" element={
              <DashboardLayout userType="student">
                <SyllabusPage />
              </DashboardLayout>
            } />
            <Route path="/bus-tracking" element={
              <DashboardLayout userType="student">
                <BusTrackingPage />
              </DashboardLayout>
            } />
            <Route path="/placements" element={
              <DashboardLayout userType="student">
                <PlacementsPage />
              </DashboardLayout>
            } />
            <Route path="/notifications" element={
              <DashboardLayout userType="student">
                <NotificationsPage />
              </DashboardLayout>
            } />
            <Route path="/notes" element={
              <DashboardLayout userType="student">
                <NotesPage />
              </DashboardLayout>
            } />
            <Route path="/report" element={
              <DashboardLayout userType="student">
                <ReportIssuePage />
              </DashboardLayout>
            } />
            <Route path="/users" element={
              <DashboardLayout userType="admin">
                <UserManagementPage />
              </DashboardLayout>
            } />
            <Route path="/settings" element={
              <DashboardLayout userType="student">
                <SettingsPage />
              </DashboardLayout>
            } />
            <Route path="/events/create" element={
              <DashboardLayout userType="faculty">
                <CreateEventPage />
              </DashboardLayout>
            } />
            <Route path="/more" element={
              <DashboardLayout userType="student">
                <MorePage />
              </DashboardLayout>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
