import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

interface AttendanceCardProps {
  compact?: boolean;
}

const AttendanceCard: React.FC<AttendanceCardProps> = ({ compact }) => {
  const { user } = useAuth();
  const [totalClasses, setTotalClasses] = useState(0);
  const [attendedClasses, setAttendedClasses] = useState(0);
  const [loading, setLoading] = useState(true);
  const requiredPercentage = 75;

  useEffect(() => {
    if (!user) return;
    const fetchAttendance = async () => {
      const { data, error } = await supabase
        .from('attendance')
        .select('status')
        .eq('student_id', user.id);
      if (!error && data) {
        setTotalClasses(data.length);
        setAttendedClasses(data.filter(a => a.status === 'present').length);
      }
      setLoading(false);
    };
    fetchAttendance();
  }, [user]);

  const attendancePercentage = totalClasses > 0 ? Math.round((attendedClasses / totalClasses) * 100) : 0;

  const getAttendanceStatus = () => {
    if (totalClasses === 0) return "info";
    if (attendancePercentage >= 85) return "success";
    if (attendancePercentage >= requiredPercentage) return "warning";
    return "danger";
  };

  const status = getAttendanceStatus();

  if (loading) {
    return (
      <Card className="dashboard-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-college-primary" />
            Attendance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-college-primary" />
          Attendance Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        {totalClasses === 0 ? (
          <p className="text-sm text-muted-foreground">No attendance records yet.</p>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Overall Attendance</span>
              <span className={`status-badge ${status}`}>{attendancePercentage}%</span>
            </div>
            <Progress value={attendancePercentage} className="h-2" />
            {!compact && (
              <div className="pt-2 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Classes Attended</span>
                  <span className="font-medium">{attendedClasses}/{totalClasses}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Required Attendance</span>
                  <span className="font-medium">{requiredPercentage}%</span>
                </div>
                {status === "danger" && (
                  <div className="bg-red-50 text-red-800 p-2 text-sm rounded mt-2">
                    Warning: Your attendance is below the required percentage.
                  </div>
                )}
                <Link to="/attendance" className="text-sm text-college-primary flex items-center hover:underline mt-2">
                  View detailed attendance <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendanceCard;
