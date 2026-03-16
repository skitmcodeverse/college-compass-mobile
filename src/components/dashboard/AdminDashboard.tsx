import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Clock, Bell, Settings, Calendar, Bus, FileText, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [adminName, setAdminName] = useState('Admin');
  const [stats, setStats] = useState({ students: 0, faculty: 0, busActive: 0, busTotal: 0 });
  const [recentIssues, setRecentIssues] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    supabase.from('profiles').select('full_name').eq('id', user.id).single()
      .then(({ data }) => { if (data) setAdminName(data.full_name); });

    // Count students
    supabase.from('user_roles').select('id', { count: 'exact', head: true }).eq('role', 'student')
      .then(({ count }) => setStats(s => ({ ...s, students: count || 0 })));

    // Count faculty (teacher + hod)
    supabase.from('user_roles').select('id').in('role', ['teacher', 'hod'])
      .then(({ data }) => setStats(s => ({ ...s, faculty: data?.length || 0 })));

    // Bus stats
    supabase.from('bus_routes').select('status')
      .then(({ data }) => {
        if (data) {
          setStats(s => ({ ...s, busTotal: data.length, busActive: data.filter(b => b.status !== 'maintenance').length }));
        }
      });

    // Recent issues
    supabase.from('report_issues').select('*').order('created_at', { ascending: false }).limit(3)
      .then(({ data }) => { if (data) setRecentIssues(data); });
  }, [user]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome, {adminName}</p>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <span className="text-sm text-muted-foreground mr-2">
            <Clock className="h-4 w-4 inline mr-1" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
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
            <div className="text-3xl font-bold">{stats.students}</div>
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
            <div className="text-3xl font-bold">{stats.faculty}</div>
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
            <div className="text-3xl font-bold">{stats.busActive}/{stats.busTotal}</div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-yellow-500" />
              Open Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{recentIssues.filter(i => i.status === 'open').length}</div>
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
                <Link to="/users"><Users className="mr-2 h-4 w-4" />Manage Users</Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link to="/notifications"><Bell className="mr-2 h-4 w-4" />Notifications</Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link to="/bus-tracking"><Bus className="mr-2 h-4 w-4" />Bus Tracking</Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link to="/settings"><Settings className="mr-2 h-4 w-4" />Settings</Link>
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
            {recentIssues.length === 0 ? (
              <p className="text-sm text-muted-foreground">No reported issues yet.</p>
            ) : (
              <div className="space-y-4">
                {recentIssues.map(issue => (
                  <div key={issue.id} className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{issue.title}</p>
                        <p className="text-sm text-muted-foreground">{issue.issue_type} • {new Date(issue.created_at).toLocaleDateString()}</p>
                      </div>
                      <span className={`status-badge ${issue.status === 'open' ? 'danger' : issue.status === 'in_progress' ? 'warning' : 'success'}`}>
                        {issue.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm mt-2">{issue.description.substring(0, 100)}</p>
                  </div>
                ))}
                <Link to="/report" className="text-sm text-college-primary flex items-center hover:underline mt-2">
                  View all reports <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
