
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Check, X, Calendar, Book, Users, Bus, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotificationsPage: React.FC = () => {
  // Mock data for now - would be connected to Supabase
  const notifications = [
    {
      id: 1,
      title: 'Class Schedule Change',
      message: 'Mathematics class has been rescheduled to 10:00 AM tomorrow.',
      timestamp: '2025-05-15T09:30:00',
      isRead: false,
      category: 'academic'
    },
    {
      id: 2,
      title: 'Fee Payment Reminder',
      message: 'Your semester fee payment is due on May 30, 2025.',
      timestamp: '2025-05-14T14:15:00',
      isRead: true,
      category: 'fees'
    },
    {
      id: 3,
      title: 'New Assignment Posted',
      message: 'A new Physics assignment has been posted with a deadline of May 20, 2025.',
      timestamp: '2025-05-14T11:45:00',
      isRead: false,
      category: 'assignment'
    },
    {
      id: 4,
      title: 'Holiday Announcement',
      message: 'The college will remain closed on May 25, 2025, due to local elections.',
      timestamp: '2025-05-13T16:20:00',
      isRead: true,
      category: 'announcement'
    },
    {
      id: 5,
      title: 'Bus Route Change',
      message: 'Bus #03 will take an alternate route tomorrow due to road construction.',
      timestamp: '2025-05-13T15:00:00',
      isRead: false,
      category: 'transportation'
    },
    {
      id: 6,
      title: 'Exam Schedule Released',
      message: 'The end semester examination schedule has been released. Check the academic calendar.',
      timestamp: '2025-05-12T10:30:00',
      isRead: true,
      category: 'exam'
    }
  ];

  // Function to get the appropriate icon for each notification category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic':
        return <Book className="h-5 w-5 text-blue-500" />;
      case 'fees':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'assignment':
        return <Book className="h-5 w-5 text-green-500" />;
      case 'announcement':
        return <Bell className="h-5 w-5 text-yellow-500" />;
      case 'transportation':
        return <Bus className="h-5 w-5 text-purple-500" />;
      case 'exam':
        return <Calendar className="h-5 w-5 text-orange-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  // Function to format the timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <DashboardLayout userType="student">
      <PageTitle 
        title="Notifications" 
        description="Stay updated with college announcements and alerts"
      />
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <span className="bg-college-primary text-white text-xs font-medium px-2.5 py-1 rounded-full mr-2">
            {unreadCount}
          </span>
          <span className="text-sm text-gray-500">Unread notifications</span>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Check className="h-4 w-4 mr-1" /> Mark all as read
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-1" /> Notification settings
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2 text-college-primary" />
            All Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 border rounded-lg flex gap-4 ${
                  !notification.isRead ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="mt-1">
                  {getCategoryIcon(notification.category)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{notification.title}</h3>
                    {!notification.isRead && (
                      <span className="bg-blue-500 h-2 w-2 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <div className="text-xs text-gray-500 mt-2">{formatTimestamp(notification.timestamp)}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Mark as read</span>
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Delete</span>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default NotificationsPage;
