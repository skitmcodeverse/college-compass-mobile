
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, ArrowRight, CircleAlert, Info, Calendar, Bus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NotificationListProps {
  limit?: number;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'alert' | 'info' | 'event' | 'transport';
  time: string;
  read: boolean;
}

const NotificationList: React.FC<NotificationListProps> = ({ limit = 5 }) => {
  // Mock notifications for testing
  const notifications: Notification[] = [
    {
      id: 1,
      title: "Class Cancelled",
      message: "Computer Networks class scheduled for today has been cancelled.",
      type: "alert",
      time: "10 minutes ago",
      read: false
    },
    {
      id: 2,
      title: "Assignment Deadline Extended",
      message: "The deadline for Database Systems assignment has been extended to May 20.",
      type: "info",
      time: "1 hour ago",
      read: false
    },
    {
      id: 3,
      title: "Technical Symposium Registration",
      message: "Registrations open for Technical Symposium 2025. Register now to participate!",
      type: "event",
      time: "3 hours ago",
      read: true
    },
    {
      id: 4,
      title: "Bus Route Change",
      message: "Bus #07 route has been changed due to road maintenance. Check updated route.",
      type: "transport",
      time: "5 hours ago",
      read: true
    },
    {
      id: 5,
      title: "Mid-Term Exam Schedule",
      message: "Mid-term examination schedule has been published. Check the timetable.",
      type: "info",
      time: "1 day ago",
      read: true
    }
  ];
  
  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'alert':
        return <CircleAlert className="h-5 w-5 text-college-danger" />;
      case 'info':
        return <Info className="h-5 w-5 text-college-primary" />;
      case 'event':
        return <Calendar className="h-5 w-5 text-college-warning" />;
      case 'transport':
        return <Bus className="h-5 w-5 text-college-secondary" />;
      default:
        return <Info className="h-5 w-5 text-college-primary" />;
    }
  };

  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Bell className="h-5 w-5 mr-2 text-college-primary" />
          Recent Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.slice(0, limit).map(notification => (
            <div 
              key={notification.id} 
              className={cn(
                "p-3 border rounded-md transition-colors",
                notification.read 
                  ? "border-gray-200" 
                  : "border-college-primary/20 bg-college-primary/5"
              )}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{notification.title}</h4>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                  <p className="text-sm text-college-text-light mt-1">{notification.message}</p>
                </div>
              </div>
            </div>
          ))}
          <Link to="/notifications" className="text-sm text-college-primary flex items-center hover:underline mt-2">
            View all notifications <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationList;
