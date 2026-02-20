import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, ArrowRight, CircleAlert, Info, Calendar, Bus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

interface NotificationListProps {
  limit?: number;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  category: string;
  created_at: string;
  is_read_by: string[] | null;
}

const NotificationList: React.FC<NotificationListProps> = ({ limit = 5 }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);
      if (!error && data) {
        setNotifications(data);
      }
      setLoading(false);
    };
    fetchNotifications();
  }, [limit]);

  const getNotificationIcon = (category: string) => {
    switch (category) {
      case 'alert': return <CircleAlert className="h-5 w-5 text-destructive" />;
      case 'event': return <Calendar className="h-5 w-5 text-yellow-500" />;
      case 'transport': return <Bus className="h-5 w-5 text-blue-500" />;
      default: return <Info className="h-5 w-5 text-college-primary" />;
    }
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
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
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : notifications.length === 0 ? (
          <p className="text-sm text-muted-foreground">No notifications yet.</p>
        ) : (
          <div className="space-y-4">
            {notifications.map(notification => {
              const isRead = notification.is_read_by?.includes(user?.id || '');
              return (
                <div
                  key={notification.id}
                  className={cn(
                    "p-3 border rounded-md transition-colors",
                    isRead ? "border-border" : "border-primary/20 bg-primary/5"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{getNotificationIcon(notification.category)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{notification.title}</h4>
                        <span className="text-xs text-muted-foreground">{formatTime(notification.created_at || '')}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            <Link to="/notifications" className="text-sm text-college-primary flex items-center hover:underline mt-2">
              View all notifications <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationList;
