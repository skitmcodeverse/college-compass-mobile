
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

interface AttendanceCardProps {
  compact?: boolean;
}

const AttendanceCard: React.FC<AttendanceCardProps> = ({ compact }) => {
  // Mock data for testing
  const attendancePercentage = 87;
  const totalClasses = 120;
  const attendedClasses = 104;
  const requiredPercentage = 75;
  
  // Calculate status
  const getAttendanceStatus = () => {
    if (attendancePercentage >= 85) return "success";
    if (attendancePercentage >= requiredPercentage) return "warning";
    return "danger";
  };
  
  const status = getAttendanceStatus();
  
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-college-primary" />
          Attendance Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Overall Attendance</span>
            <span className={`status-badge ${status}`}>
              {attendancePercentage}%
            </span>
          </div>
          
          <Progress value={attendancePercentage} className="h-2" />
          
          {!compact && (
            <div className="pt-2 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-college-text-light">Classes Attended</span>
                <span className="font-medium">{attendedClasses}/{totalClasses}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-college-text-light">Required Attendance</span>
                <span className="font-medium">{requiredPercentage}%</span>
              </div>
              
              {status === "danger" && (
                <div className="bg-red-50 text-red-800 p-2 text-sm rounded mt-2">
                  Warning: Your attendance is below the required percentage.
                </div>
              )}
              
              <div className="mt-4 text-sm text-college-text-light flex items-center">
                <Clock className="h-4 w-4 mr-1" /> 
                Last updated: {new Date().toLocaleDateString()}
              </div>
              
              <Link to="/attendance" className="text-sm text-college-primary flex items-center hover:underline mt-2">
                View detailed attendance <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceCard;
