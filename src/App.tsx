
import { Toaster } from "@/components/ui/toaster";
import { Sonner } from "@/components/ui/sonner";
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
  const storedUser = localStorage.getItem('educonnect_user');
  
  if (!storedUser) {
    return <Navigate to="/login" replace />;
  }
  
  try {
    const userData = JSON.parse(storedUser);
    if (userTypes.includes(userData.role)) {
      return children;
    } else {
      return <Navigate to={`/dashboard/${userData.role}`} replace />;
    }
  } catch {
    return <Navigate to="/login" replace />;
  }
};

// Helper to get user type for dynamic layout
const getDynamicLayout = (allowedRoles: string[], children: React.ReactNode) => {
  const storedUser = localStorage.getItem('educonnect_user');
  if (!storedUser) return <Navigate to="/login" replace />;
  
  try {
    const userData = JSON.parse(storedUser);
    const userType = userData.role as 'student' | 'faculty' | 'admin';
    
    return (
      <DashboardLayout userType={userType}>
        {children}
      </DashboardLayout>
    );
  } catch {
    return <Navigate to="/login" replace />;
  }
};

const App = () => {
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

            {/* Attendance - All roles */}
            <Route path="/attendance" element={
              <ProtectedRoute userTypes={["student", "faculty", "admin"]}>
                {getDynamicLayout(["student", "faculty", "admin"], <AttendancePage />)}
              </ProtectedRoute>
            } />
            
            {/* Marks - All roles */}
            <Route path="/marks" element={
              <ProtectedRoute userTypes={["student", "faculty", "admin"]}>
                {getDynamicLayout(["student", "faculty", "admin"], <MarksPage />)}
              </ProtectedRoute>
            } />
            
            {/* Fees - Students and Admin only */}
            <Route path="/fees" element={
              <ProtectedRoute userTypes={["student", "admin"]}>
                {getDynamicLayout(["student", "admin"], <FeesPage />)}
              </ProtectedRoute>
            } />
            
            {/* Syllabus - All roles */}
            <Route path="/syllabus" element={
              <ProtectedRoute userTypes={["student", "faculty", "admin"]}>
                {getDynamicLayout(["student", "faculty", "admin"], <SyllabusPage />)}
              </ProtectedRoute>
            } />
            
            {/* Bus Tracking - Students and Admin only */}
            <Route path="/bus-tracking" element={
              <ProtectedRoute userTypes={["student", "admin"]}>
                {getDynamicLayout(["student", "admin"], <BusTrackingPage />)}
              </ProtectedRoute>
            } />
            
            {/* Placements - All roles */}
            <Route path="/placements" element={
              <ProtectedRoute userTypes={["student", "faculty", "admin"]}>
                {getDynamicLayout(["student", "faculty", "admin"], <PlacementsPage />)}
              </ProtectedRoute>
            } />
            
            {/* Notifications - All roles */}
            <Route path="/notifications" element={
              <ProtectedRoute userTypes={["student", "faculty", "admin"]}>
                {getDynamicLayout(["student", "faculty", "admin"], <NotificationsPage />)}
              </ProtectedRoute>
            } />
            
            {/* Notes - All roles */}
            <Route path="/notes" element={
              <ProtectedRoute userTypes={["student", "faculty", "admin"]}>
                {getDynamicLayout(["student", "faculty", "admin"], <NotesPage />)}
              </ProtectedRoute>
            } />
            
            {/* Report Issue - All roles */}
            <Route path="/report" element={
              <ProtectedRoute userTypes={["student", "faculty", "admin"]}>
                {getDynamicLayout(["student", "faculty", "admin"], <ReportIssuePage />)}
              </ProtectedRoute>
            } />
            
            {/* User Management - Admin only */}
            <Route path="/users" element={
              <ProtectedRoute userTypes={["admin"]}>
                <DashboardLayout userType="admin">
                  <UserManagementPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* Settings - All roles */}
            <Route path="/settings" element={
              <ProtectedRoute userTypes={["student", "faculty", "admin"]}>
                {getDynamicLayout(["student", "faculty", "admin"], <SettingsPage />)}
              </ProtectedRoute>
            } />
            
            {/* Create Event - Faculty and Admin only */}
            <Route path="/events/create" element={
              <ProtectedRoute userTypes={["faculty", "admin"]}>
                {getDynamicLayout(["faculty", "admin"], <CreateEventPage />)}
              </ProtectedRoute>
            } />
            
            {/* More Page - All roles */}
            <Route path="/more" element={
              <ProtectedRoute userTypes={["student", "faculty", "admin"]}>
                {getDynamicLayout(["student", "faculty", "admin"], <MorePage />)}
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
