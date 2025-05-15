
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  Users, 
  BookOpen, 
  Edit, 
  MessageSquare, 
  FileText,
  Bell
} from 'lucide-react';
import { Link } from 'react-router-dom';
import NotificationList from '../features/NotificationList';

const FacultyDashboard: React.FC = () => {
  // Mock data for testing
  const facultyName = "Professor Smith";
  const department = "Computer Science Engineering";
  const facultyId = "FAC78901234";
  
  // Mock class schedule data
  const todayClasses = [
    { id: 1, subject: "Data Structures", class: "CSE-3A", time: "09:30 AM - 10:30 AM", room: "LH-201" },
    { id: 2, subject: "Database Management", class: "CSE-2B", time: "11:30 AM - 12:30 PM", room: "LH-305" },
    { id: 3, subject: "Algorithm Design", class: "CSE-3A", time: "02:00 PM - 03:30 PM", room: "LH-201" }
  ];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome, {facultyName}</h1>
          <p className="text-muted-foreground">
            {department} | ID: {facultyId}
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="dashboard-card col-span-1 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-college-primary" />
              Today's Classes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayClasses.map(cls => (
                <div key={cls.id} className="flex flex-col md:flex-row md:items-center justify-between p-3 border rounded-md">
                  <div className="space-y-1">
                    <p className="font-medium">{cls.subject}</p>
                    <p className="text-sm text-college-text-light">Class: {cls.class} | Room: {cls.room}</p>
                  </div>
                  <div className="flex items-center mt-2 md:mt-0">
                    <span className="text-sm bg-college-primary/10 text-college-primary px-2 py-1 rounded">
                      {cls.time}
                    </span>
                    <Button variant="ghost" size="icon" className="ml-2" asChild>
                      <Link to={`/attendance/mark/${cls.id}`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Mark Attendance</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
              <Link to="/schedule" className="text-sm text-college-primary flex items-center hover:underline mt-2">
                View full schedule <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
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
                <Link to="/attendance/mark">
                  <Edit className="mr-2 h-4 w-4" />
                  Mark Attendance
                </Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link to="/marks/update">
                  <FileText className="mr-2 h-4 w-4" />
                  Update Marks
                </Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link to="/notes/create">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Post Notes
                </Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link to="/homework/assign">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Assign Homework
                </Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link to="/events/create">
                  <Bell className="mr-2 h-4 w-4" />
                  Create Event
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="dashboard-card col-span-1 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <FileText className="h-5 w-5 mr-2 text-college-primary" />
              Recent Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-md">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Data Structures - Assignment #5</p>
                    <p className="text-sm text-college-text-light">CSE-3A | Due: May 15, 2025</p>
                  </div>
                  <span className="status-badge info">28/35 Submitted</span>
                </div>
                <div className="flex justify-end mt-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/homework/submissions/123">
                      Review Submissions
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="p-3 border rounded-md">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Database Management - Lab Report</p>
                    <p className="text-sm text-college-text-light">CSE-2B | Due: May 10, 2025</p>
                  </div>
                  <span className="status-badge success">42/42 Submitted</span>
                </div>
                <div className="flex justify-end mt-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/homework/submissions/456">
                      Review Submissions
                    </Link>
                  </Button>
                </div>
              </div>
              <Link to="/homework/all-submissions" className="text-sm text-college-primary flex items-center hover:underline mt-2">
                View all submissions <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="col-span-1">
          <NotificationList limit={3} />
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
