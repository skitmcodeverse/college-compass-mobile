import React, { useEffect, useState } from 'react';
import PageTitle from '@/components/common/PageTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Check, Book, Bus, AlertCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

interface Notification {
  id: string;
  title: string;
  message: string;
  category: string;
  created_at: string;
  is_read_by: string[] | null;
}

const NotificationsPage: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();

    const channel = supabase
      .channel('notifications_realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications' }, () => {
        fetchNotifications();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchNotifications = async () => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setNotifications(data);
    setLoading(false);
  };

  const isRead = (n: Notification) => user ? (n.is_read_by || []).includes(user.id) : false;

  const markAsRead = async (id: string) => {
    if (!user) return;
    const notif = notifications.find(n => n.id === id);
    if (!notif || isRead(notif)) return;
    const updatedReaders = [...(notif.is_read_by || []), user.id];
    await supabase.from('notifications').update({ is_read_by: updatedReaders }).eq('id', id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read_by: updatedReaders } : n));
  };

  const markAllAsRead = async () => {
    if (!user) return;
    for (const n of notifications) {
      if (!isRead(n)) await markAsRead(n.id);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return <Book className="h-5 w-5 text-blue-500" />;
      case 'fees': return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'assignment': return <Book className="h-5 w-5 text-green-500" />;
      case 'transportation': return <Bus className="h-5 w-5 text-purple-500" />;
      case 'exam': return <Calendar className="h-5 w-5 text-orange-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !isRead(n)).length;

  return (
    <>
      <PageTitle title="Notifications" description="Stay updated with college announcements and alerts" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <div className="flex items-center">
          <span className="bg-college-primary text-white text-xs font-medium px-2.5 py-1 rounded-full mr-2">{unreadCount}</span>
          <span className="text-sm text-muted-foreground">Unread notifications</span>
        </div>
        <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
          <Check className="h-4 w-4 mr-1" /> Mark all read
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <Bell className="h-5 w-5 mr-2 text-college-primary" /> All Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading notifications...</div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 mx-auto text-gray-300 mb-2" />
              <p className="text-muted-foreground">No notifications yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 border rounded-lg flex gap-3 transition-all duration-200 cursor-pointer ${
                    !isRead(notification) ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="mt-1 flex-shrink-0">{getCategoryIcon(notification.category)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-sm sm:text-base truncate pr-2">{notification.title}</h3>
                      {!isRead(notification) && (
                        <span className="bg-blue-500 h-2 w-2 rounded-full flex-shrink-0 mt-1"></span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">{notification.message}</p>
                    <div className="text-xs text-muted-foreground mt-2">
                      {new Intl.DateTimeFormat('en-IN', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }).format(new Date(notification.created_at))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default NotificationsPage;
