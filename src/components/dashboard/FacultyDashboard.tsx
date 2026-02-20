import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Users, BookOpen, Edit, MessageSquare, FileText, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import NotificationList from '../features/NotificationList';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

const FacultyDashboard: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<{ full_name: string; department: string | null; faculty_id: string | null } | null>(null);
  const [recentHomework, setRecentHomework] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    supabase.from('profiles').select('full_name, department, faculty_id').eq('id', user.id).single()
      .then(({ data }) => { if (data) setProfile(data); });

    supabase.from('homework').select('id, title, subject, deadline').eq('assigned_by', user.id)
      .order('created_at', { ascending: false }).limit(3)
      .then(({ data }) => { if (data) setRecentHomework(data); });
  }, [user]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome, {profile?.full_name || 'Faculty'}</h1>
          <p className="text-muted-foreground">
            {profile?.department || ''} Department {profile?.faculty_id ? `| ID: ${profile.faculty_id}` : ''}
          </p>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <span className="text-sm text-muted-foreground mr-2">
            <Clock className="h-4 w-4 inline mr-1" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="dashboard-card col-span-1 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-college-primary" />
              Recent Homework Assigned
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentHomework.length === 0 ? (
              <p className="text-sm text-muted-foreground">No homework assigned yet.</p>
            ) : (
              <div className="space-y-4">
                {recentHomework.map(hw => (
                  <div key={hw.id} className="p-3 border rounded-md">
                    <p className="font-medium">{hw.title}</p>
                    <p className="text-sm text-muted-foreground">{hw.subject} {hw.deadline ? `• Due: ${new Date(hw.deadline).toLocaleDateString()}` : ''}</p>
                  </div>
                ))}
                <Link to="/notes" className="text-sm text-college-primary flex items-center hover:underline mt-2">
                  View all <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Users className="h-5 w-5 mr-2 text-college-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start" asChild>
                <Link to="/attendance"><Edit className="mr-2 h-4 w-4" />Mark Attendance</Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link to="/marks"><FileText className="mr-2 h-4 w-4" />Update Marks</Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link to="/notes"><MessageSquare className="mr-2 h-4 w-4" />Notes & Homework</Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link to="/notifications"><Bell className="mr-2 h-4 w-4" />Notifications</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2">
          <NotificationList limit={3} />
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
