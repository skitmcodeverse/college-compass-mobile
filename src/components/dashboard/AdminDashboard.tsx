
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Users, 
  Clock, 
  Bell, 
  Settings,
  BarChart,
  Calendar,
  Bus,
  FileText,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';

const AdminDashboard: React.FC = () => {
  // Mock data for testing
  const adminName = "Admin User";
  
  // Mock attendance data for chart
  const attendanceData = [
    { name: "CSE", attendance: 89 },
    { name: "ECE", attendance: 92 },
    { name: "Mech", attendance: 85 },
    { name: "Civil", attendance: 88 },
    { name: "IT", attendance: 90 }
  ];
  
  // Mock system alerts
  const systemAlerts = [
    { id: 1, title: "Server Maintenance", message: "Scheduled maintenance on May 18, 2025 (22:00 - 23:00)", status: "warning" },
    { id: 2, title: "Low Storage", message: "File server storage below 20%", status: "danger" },
    { id: 3, title: "Bus #12 GPS Offline", message: "Bus #12 GPS tracking device offline for 2 hours", status: "warning" },
  ];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome, {adminName}
          </p>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <span className="text-sm text-gray-500 mr-2">
            <Clock className="h-4 w-4 inline mr-1" />
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Users className="h-5 w-5 mr-2 text-college-primary" />
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2,845</div>
            <p className="text-sm text-college-text-light">+125 from last year</p>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Users className="h-5 w-5 mr-2 text-college-secondary" />
              Total Faculty
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">148</div>
            <p className="text-sm text-college-text-light">+12 from last year</p>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Bus className="h-5 w-5 mr-2 text-college-accent" />
              Buses Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24/25</div>
            <p className="text-sm text-college-text-light">1 under maintenance</p>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-college-warning" />
              Events Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-sm text-college-text-light">2 upcoming this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="dashboard-card col-span-1 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <BarChart className="h-5 w-5 mr-2 text-college-primary" />
              Department Attendance Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={attendanceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[70, 100]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="attendance" 
                  stroke="#2563EB" 
                  activeDot={{ r: 8 }} 
                  name="Attendance %" 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-college-danger" />
              System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemAlerts.map(alert => (
                <div key={alert.id} className="p-3 border rounded-md">
                  <div className="flex items-center gap-2">
                    <AlertCircle className={`h-4 w-4 ${alert.status === 'danger' ? 'text-college-danger' : 'text-college-warning'}`} />
                    <p className="font-medium">{alert.title}</p>
                  </div>
                  <p className="text-sm text-college-text-light mt-1">{alert.message}</p>
                </div>
              ))}
              <Link to="/system/alerts" className="text-sm text-college-primary flex items-center hover:underline mt-2">
                View all alerts <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Bell className="h-5 w-5 mr-2 text-college-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start" asChild>
                <Link to="/events/create">
                  <Calendar className="mr-2 h-4 w-4" />
                  Post New Event
                </Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link to="/notifications/send">
                  <Bell className="mr-2 h-4 w-4" />
                  Send Notification
                </Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link to="/users/manage">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link to="/bus/manage">
                  <Bus className="mr-2 h-4 w-4" />
                  Manage Bus Routes
                </Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link to="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  System Settings
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card col-span-1 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <FileText className="h-5 w-5 mr-2 text-college-primary" />
              Recent Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-md">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Application Error</p>
                    <p className="text-sm text-college-text-light">Reported by: John Smith (Faculty) | 1 hour ago</p>
                  </div>
                  <span className="status-badge danger">Unresolved</span>
                </div>
                <p className="text-sm mt-2">Unable to mark attendance for CSE-2A, getting server error.</p>
              </div>
              <div className="p-3 border rounded-md">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Maintenance Issue</p>
                    <p className="text-sm text-college-text-light">Reported by: Admin Staff | 3 hours ago</p>
                  </div>
                  <span className="status-badge warning">In Progress</span>
                </div>
                <p className="text-sm mt-2">AC not working in LH-201, needs immediate attention.</p>
              </div>
              <div className="p-3 border rounded-md">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Ragging Complaint</p>
                    <p className="text-sm text-college-text-light">Reported by: Anonymous Student | 1 day ago</p>
                  </div>
                  <span className="status-badge success">Resolved</span>
                </div>
                <p className="text-sm mt-2">Complaint against senior students in Boys Hostel Block C.</p>
              </div>
              <Link to="/reports" className="text-sm text-college-primary flex items-center hover:underline mt-2">
                View all reports <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
