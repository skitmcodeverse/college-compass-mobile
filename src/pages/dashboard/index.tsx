
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const DashboardRedirect: React.FC = () => {
  const [userType, setUserType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // In a production app, fetch the user type from Supabase
  useEffect(() => {
    async function getUserType() {
      try {
        // Check if user is authenticated
        const { data: { session }, error: authError } = await supabase.auth.getSession();
        
        if (authError || !session) {
          // Not authenticated, redirect to login
          setUserType(null);
          setLoading(false);
          return;
        }
        
        // For testing purposes, we'll use a mock value
        // In a real app, you would fetch this from the profiles table
        setUserType('student'); // Mock value - replace with actual DB query
        setLoading(false);
      } catch (error) {
        console.error('Error getting user type:', error);
        setUserType(null);
        setLoading(false);
      }
    }
    
    getUserType();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-college-primary"></div>
      </div>
    );
  }
  
  // Redirect based on user type
  if (userType === 'student') {
    return <Navigate to="/dashboard/student" replace />;
  } else if (userType === 'faculty') {
    return <Navigate to="/dashboard/faculty" replace />;
  } else if (userType === 'admin') {
    return <Navigate to="/dashboard/admin" replace />;
  }
  
  // If not authenticated or role not determined, redirect to login
  return <Navigate to="/login" replace />;
};

export default DashboardRedirect;
