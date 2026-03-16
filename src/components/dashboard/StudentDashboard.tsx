import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Calendar, Clock, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import AttendanceCard from '../features/AttendanceCard';
import MarksCard from '../features/MarksCard';
import NotificationList from '../features/NotificationList';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<{ full_name: string; branch: string; enrollment_number: string } | null>(null);
  const [fees, setFees] = useState<{ fee_type: string; status: string; due_date: string | null }[]>([]);
  const [homework, setHomework] = useState<{ title: string; subject: string; deadline: string | null }[]>([]);

  useEffect(() => {
    if (!user) return;

    supabase.from('profiles').select('full_name, branch, enrollment_number').eq('id', user.id).single()
      .then(({ data }) => { if (data) setProfile(data); });

    supabase.from('fees').select('fee_type, status, due_date').eq('student_id', user.id).limit(3)
      .then(({ data }) => { if (data) setFees(data); });

    supabase.from('homework').select('title, subject, deadline').order('deadline', { ascending: true }).limit(3)
      .then(({ data }) => { if (data) setHomework(data); });
  }, [user]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome, {profile?.full_name || 'Student'}</h1>
          <p className="text-muted-foreground">
            {profile?.branch || ''} | ID: {profile?.enrollment_number || ''}
          </p>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <span className="text-sm text-muted-foreground mr-2">
            <Clock className="h-4 w-4 inline mr-1" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AttendanceCard />
        <MarksCard />
        <Card className="dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-college-primary" />
              Fee Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {fees.length === 0 ? (
              <p className="text-sm text-muted-foreground">No fee records yet.</p>
            ) : (
              <div className="space-y-4">
                {fees.map((fee, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span>{fee.fee_type}</span>
                    <span className={`status-badge ${fee.status === 'paid' ? 'success' : 'warning'}`}>
                      {fee.status === 'paid' ? 'Paid' : 'Pending'}
                    </span>
                  </div>
                ))}
                <Link to="/fees" className="text-sm text-college-primary flex items-center hover:underline mt-4">
                  View all fees <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <NotificationList />
        </div>
        <div>
          <Card className="dashboard-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-college-primary" />
                Homework Due
              </CardTitle>
            </CardHeader>
            <CardContent>
              {homework.length === 0 ? (
                <p className="text-sm text-muted-foreground">No homework assigned yet.</p>
              ) : (
                <div className="space-y-4">
                  {homework.map((hw, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{hw.subject}</p>
                        <p className="text-sm text-muted-foreground">{hw.title}</p>
                      </div>
                      {hw.deadline && (
                        <span className="text-xs text-muted-foreground">
                          {new Date(hw.deadline).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  ))}
                  <Link to="/notes" className="text-sm text-college-primary flex items-center hover:underline mt-2">
                    View all assignments <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
