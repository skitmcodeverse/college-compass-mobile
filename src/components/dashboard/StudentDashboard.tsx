
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Calendar, Clock, FileText, MapPin, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import AttendanceCard from '../features/AttendanceCard';
import MarksCard from '../features/MarksCard';
import NotificationList from '../features/NotificationList';

const StudentDashboard: React.FC = () => {
  // Mock data for testing
  const studentName = "John Doe";
  const studentClass = "B.Tech CSE - 3rd Year";
  const studentId = "ST12345678";
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome, {studentName}</h1>
          <p className="text-muted-foreground">
            {studentClass} | ID: {studentId}
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
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Tuition Fee</span>
                <span className="status-badge success">Paid</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Hostel Fee</span>
                <span className="status-badge warning">Due in 5 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Library Fee</span>
                <span className="status-badge success">Paid</span>
              </div>
              <Link to="/fees" className="text-sm text-college-primary flex items-center hover:underline mt-4">
                View all fees <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <NotificationList />
        </div>

        <div className="space-y-6">
          <Card className="dashboard-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-college-primary" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded border p-3">
                  <p className="font-medium">Tech Symposium</p>
                  <div className="flex items-center text-sm text-college-text-light mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>May 20, 2025</span>
                  </div>
                  <div className="flex items-center text-sm text-college-text-light mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>Main Auditorium</span>
                  </div>
                </div>
                
                <div className="rounded border p-3">
                  <p className="font-medium">Mid-Term Exams</p>
                  <div className="flex items-center text-sm text-college-text-light mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>May 25-30, 2025</span>
                  </div>
                </div>
                
                <Link to="/events" className="text-sm text-college-primary flex items-center hover:underline mt-2">
                  View all events <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card className="dashboard-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-college-primary" />
                Homework Due
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Data Structures</p>
                    <p className="text-sm text-college-text-light">Assignment #5</p>
                  </div>
                  <span className="status-badge danger">Today</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Computer Networks</p>
                    <p className="text-sm text-college-text-light">Lab Report</p>
                  </div>
                  <span className="status-badge warning">2 days</span>
                </div>
                
                <Link to="/homework" className="text-sm text-college-primary flex items-center hover:underline mt-2">
                  View all assignments <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
