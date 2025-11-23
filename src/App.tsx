import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/auth/AuthProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
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
import PasswordChange from "./pages/settings/PasswordChange";
import { useState, useEffect } from "react";
import { supabase } from '@/integrations/supabase/client';

// Route guard component
const ProtectedRoute = ({ allowedRoles, children }: { allowedRoles: string[], children: JSX.Element }) => {
  const { user, loading } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      if (loading) return;
      
      if (!user) {
        setChecking(false);
        return;
      }

      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      setUserRole(roleData?.role || null);
      setChecking(false);
    };

    checkRole();
  }, [user, loading]);

  if (loading || checking) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-college-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (userRole && allowedRoles.includes(userRole)) {
    return children;
  } else if (userRole === 'super_admin') {
    return <Navigate to="/users" replace />;
  } else if (userRole) {
    return <Navigate to={`/dashboard/${userRole}`} replace />;
  }

  return <Navigate to="/login" replace />;
};

// Helper component to get user role and render layout
const DynamicLayoutWrapper = ({ allowedRoles, children }: { allowedRoles: string[], children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (loading) return;
      
      if (!user) {
        setChecking(false);
        return;
      }

      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      setUserRole(roleData?.role || null);
      setChecking(false);
    };

    fetchRole();
  }, [user, loading]);

  if (loading || checking) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-college-primary"></div>
      </div>
    );
  }

  if (!user || !userRole) {
    return <Navigate to="/login" replace />;
  }

  const layoutType = userRole === 'teacher' || userRole === 'hod' ? 'faculty' : 
                    userRole === 'super_admin' ? 'admin' : 
                    userRole as 'student' | 'faculty' | 'admin';

  return (
    <DashboardLayout userType={layoutType}>
      {children}
    </DashboardLayout>
  );
};

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <SonnerToaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
            
            {/* Dashboard Redirect */}
            <Route path="/dashboard" element={<DashboardRedirect />} />
            
            {/* Student Dashboard Routes */}
            <Route
              path="/dashboard/student"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <DashboardLayout userType="student">
                    <StudentDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            
            {/* Teacher Dashboard Routes */}
            <Route
              path="/dashboard/teacher"
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <DashboardLayout userType="faculty">
                    <FacultyDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            
            {/* HOD Dashboard Routes */}
            <Route
              path="/dashboard/hod"
              element={
                <ProtectedRoute allowedRoles={["hod"]}>
                  <DashboardLayout userType="faculty">
                    <FacultyDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Attendance - All roles */}
            <Route path="/attendance" element={
              <ProtectedRoute allowedRoles={["student", "teacher", "hod", "super_admin"]}>
                <DynamicLayoutWrapper allowedRoles={["student", "teacher", "hod", "super_admin"]}>
                  <AttendancePage />
                </DynamicLayoutWrapper>
              </ProtectedRoute>
            } />
            
            {/* Marks - All roles */}
            <Route path="/marks" element={
              <ProtectedRoute allowedRoles={["student", "teacher", "hod", "super_admin"]}>
                <DynamicLayoutWrapper allowedRoles={["student", "teacher", "hod", "super_admin"]}>
                  <MarksPage />
                </DynamicLayoutWrapper>
              </ProtectedRoute>
            } />
            
            {/* Fees - Students and Admin only */}
            <Route path="/fees" element={
              <ProtectedRoute allowedRoles={["student", "super_admin"]}>
                <DynamicLayoutWrapper allowedRoles={["student", "super_admin"]}>
                  <FeesPage />
                </DynamicLayoutWrapper>
              </ProtectedRoute>
            } />
            
            {/* Syllabus - All roles */}
            <Route path="/syllabus" element={
              <ProtectedRoute allowedRoles={["student", "teacher", "hod", "super_admin"]}>
                <DynamicLayoutWrapper allowedRoles={["student", "teacher", "hod", "super_admin"]}>
                  <SyllabusPage />
                </DynamicLayoutWrapper>
              </ProtectedRoute>
            } />
            
            {/* Bus Tracking - Students and Admin only */}
            <Route path="/bus-tracking" element={
              <ProtectedRoute allowedRoles={["student", "super_admin"]}>
                <DynamicLayoutWrapper allowedRoles={["student", "super_admin"]}>
                  <BusTrackingPage />
                </DynamicLayoutWrapper>
              </ProtectedRoute>
            } />
            
            {/* Placements - All roles */}
            <Route path="/placements" element={
              <ProtectedRoute allowedRoles={["student", "teacher", "hod", "super_admin"]}>
                <DynamicLayoutWrapper allowedRoles={["student", "teacher", "hod", "super_admin"]}>
                  <PlacementsPage />
                </DynamicLayoutWrapper>
              </ProtectedRoute>
            } />
            
            {/* Notifications - All roles */}
            <Route path="/notifications" element={
              <ProtectedRoute allowedRoles={["student", "teacher", "hod", "super_admin"]}>
                <DynamicLayoutWrapper allowedRoles={["student", "teacher", "hod", "super_admin"]}>
                  <NotificationsPage />
                </DynamicLayoutWrapper>
              </ProtectedRoute>
            } />
            
            {/* Notes - All roles */}
            <Route path="/notes" element={
              <ProtectedRoute allowedRoles={["student", "teacher", "hod", "super_admin"]}>
                <DynamicLayoutWrapper allowedRoles={["student", "teacher", "hod", "super_admin"]}>
                  <NotesPage />
                </DynamicLayoutWrapper>
              </ProtectedRoute>
            } />
            
            {/* Report Issue - All roles */}
            <Route path="/report" element={
              <ProtectedRoute allowedRoles={["student", "teacher", "hod", "super_admin"]}>
                <DynamicLayoutWrapper allowedRoles={["student", "teacher", "hod", "super_admin"]}>
                  <ReportIssuePage />
                </DynamicLayoutWrapper>
              </ProtectedRoute>
            } />
            
            {/* User Management - Super Admin only */}
            <Route path="/users" element={
              <ProtectedRoute allowedRoles={["super_admin"]}>
                <DashboardLayout userType="admin">
                  <UserManagementPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* Settings - All roles */}
            <Route path="/settings" element={
              <ProtectedRoute allowedRoles={["student", "teacher", "hod", "super_admin"]}>
                <DynamicLayoutWrapper allowedRoles={["student", "teacher", "hod", "super_admin"]}>
                  <SettingsPage />
                </DynamicLayoutWrapper>
              </ProtectedRoute>
            } />
            
            {/* Password Change - All roles */}
            <Route path="/settings/password" element={
              <ProtectedRoute allowedRoles={["student", "teacher", "hod", "super_admin"]}>
                <PasswordChange />
              </ProtectedRoute>
            } />
            
            {/* Create Event - Faculty and Admin only */}
            <Route path="/events/create" element={
              <ProtectedRoute allowedRoles={["teacher", "hod", "super_admin"]}>
                <DynamicLayoutWrapper allowedRoles={["teacher", "hod", "super_admin"]}>
                  <CreateEventPage />
                </DynamicLayoutWrapper>
              </ProtectedRoute>
            } />
            
            {/* More Page - All roles */}
            <Route path="/more" element={
              <ProtectedRoute allowedRoles={["student", "teacher", "hod", "super_admin"]}>
                <DynamicLayoutWrapper allowedRoles={["student", "teacher", "hod", "super_admin"]}>
                  <MorePage />
                </DynamicLayoutWrapper>
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
