
import React, { useState } from 'react';
import PageTitle from '@/components/common/PageTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Check, X, Calendar, Book, Users, Bus, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState([
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
  ]);

  // Function to mark notification as read
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  // Function to mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, isRead: true })));
  };

  // Function to delete notification
  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <>
      <PageTitle 
        title="Notifications" 
        description="Stay updated with college announcements and alerts"
      />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <div className="flex items-center">
          <span className="bg-college-primary text-white text-xs font-medium px-2.5 py-1 rounded-full mr-2">
            {unreadCount}
          </span>
          <span className="text-sm text-gray-500">Unread notifications</span>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={markAllAsRead} 
            disabled={unreadCount === 0}
            className="flex-1 sm:flex-initial justify-center"
          >
            <Check className="h-4 w-4 mr-1" /> Mark all read
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1 sm:flex-initial justify-center"
          >
            <Bell className="h-4 w-4 mr-1" /> Settings
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <Bell className="h-5 w-5 mr-2 text-college-primary" />
            All Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div 
            className="space-y-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {notifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                <p className="text-gray-500">No notifications to display</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <motion.div 
                  key={notification.id} 
                  className={`p-3 border rounded-lg flex gap-3 transition-all duration-200 ${
                    !notification.isRead ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                  }`}
                  variants={item}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="mt-1 flex-shrink-0">
                    {getCategoryIcon(notification.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-sm sm:text-base truncate pr-2">
                        {notification.title}
                      </h3>
                      {!notification.isRead && (
                        <span className="bg-blue-500 h-2 w-2 rounded-full flex-shrink-0"></span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">{notification.message}</p>
                    <div className="text-xs text-gray-500 mt-2">{formatTimestamp(notification.timestamp)}</div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    {!notification.isRead && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <span className="sr-only">Mark as read</span>
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <span className="sr-only">Delete</span>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </CardContent>
      </Card>
    </>
  );
};

export default NotificationsPage;
