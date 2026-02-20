import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const DashboardRedirect: React.FC = () => {
  const [userType, setUserType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setUserType(null);
          setLoading(false);
          return;
        }

        const { data: roleData, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .single();

        if (error || !roleData) {
          setUserType(null);
        } else {
          setUserType(roleData.role);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error checking auth:', error);
        setUserType(null);
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (userType === 'super_admin') return <Navigate to="/dashboard/admin" replace />;
  if (userType === 'hod') return <Navigate to="/dashboard/faculty" replace />;
  if (userType === 'teacher') return <Navigate to="/dashboard/faculty" replace />;
  if (userType === 'student') return <Navigate to="/dashboard/student" replace />;

  return <Navigate to="/login" replace />;
};

export default DashboardRedirect;
