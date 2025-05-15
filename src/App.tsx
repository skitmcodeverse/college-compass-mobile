
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

          {/* Feature Routes */}
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/marks" element={<MarksPage />} />
          <Route path="/fees" element={<FeesPage />} />
          <Route path="/syllabus" element={<SyllabusPage />} />
          <Route path="/bus-tracking" element={<BusTrackingPage />} />
          <Route path="/placements" element={<PlacementsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/report" element={<ReportIssuePage />} />
          <Route path="/users" element={<UserManagementPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          
          {/* Event Management */}
          <Route path="/events/create" element={<CreateEventPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
