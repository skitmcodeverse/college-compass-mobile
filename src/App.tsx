
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

// Route guard component
const ProtectedRoute = ({ userTypes, children }: { userTypes: string[], children: JSX.Element }) => {
  // Check if user is logged in and has the correct type
  const storedUser = localStorage.getItem('educonnect_user');
  
  if (!storedUser) {
    return <Navigate to="/login" replace />;
  }
  
  try {
    const userData = JSON.parse(storedUser);
    if (userTypes.includes(userData.role)) {
      return children;
    } else {
      // If logged in but wrong role, redirect to their correct dashboard
      return <Navigate to={`/dashboard/${userData.role}`} replace />;
    }
  } catch {
    return <Navigate to="/login" replace />;
  }
};

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
                <ProtectedRoute userTypes={["student"]}>
                  <DashboardLayout userType="student">
                    <StudentDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            
            {/* Faculty Dashboard Routes */}
            <Route
              path="/dashboard/faculty"
              element={
                <ProtectedRoute userTypes={["faculty"]}>
                  <DashboardLayout userType="faculty">
                    <FacultyDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            
            {/* Admin Dashboard Routes */}
            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute userTypes={["admin"]}>
                  <DashboardLayout userType="admin">
                    <AdminDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Feature Routes - Each with appropriate role restrictions */}
            <Route path="/attendance" element={
              <ProtectedRoute userTypes={["student", "faculty", "admin"]}>
                <DashboardLayout userType="student">
                  <AttendancePage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/marks" element={
              <ProtectedRoute userTypes={["student", "faculty", "admin"]}>
                <DashboardLayout userType="student">
                  <MarksPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* Only students can access fees page */}
            <Route path="/fees" element={
              <ProtectedRoute userTypes={["student"]}>
                <DashboardLayout userType="student">
                  <FeesPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/syllabus" element={
              <ProtectedRoute userTypes={["student", "faculty", "admin"]}>
                <DashboardLayout userType="student">
                  <SyllabusPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* Students and admin can access bus tracking */}
            <Route path="/bus-tracking" element={
              <ProtectedRoute userTypes={["student", "admin"]}>
                <DashboardLayout userType="student">
                  <BusTrackingPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/placements" element={
              <ProtectedRoute userTypes={["student", "faculty", "admin"]}>
                <DashboardLayout userType="student">
                  <PlacementsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/notifications" element={
              <ProtectedRoute userTypes={["student", "faculty", "admin"]}>
                <DashboardLayout userType="student">
                  <NotificationsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/notes" element={
              <ProtectedRoute userTypes={["student", "faculty", "admin"]}>
                <DashboardLayout userType="student">
                  <NotesPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/report" element={
              <ProtectedRoute userTypes={["student", "faculty", "admin"]}>
                <DashboardLayout userType="student">
                  <ReportIssuePage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* Only admins can access user management */}
            <Route path="/users" element={
              <ProtectedRoute userTypes={["admin"]}>
                <DashboardLayout userType="admin">
                  <UserManagementPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* Settings available to all users */}
            <Route path="/settings" element={
              <ProtectedRoute userTypes={["student", "faculty", "admin"]}>
                <DashboardLayout userType="student">
                  <SettingsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* Only faculty and admin can create events */}
            <Route path="/events/create" element={
              <ProtectedRoute userTypes={["faculty", "admin"]}>
                <DashboardLayout userType="faculty">
                  <CreateEventPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/more" element={
              <ProtectedRoute userTypes={["student", "faculty", "admin"]}>
                <DashboardLayout userType="student">
                  <MorePage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
