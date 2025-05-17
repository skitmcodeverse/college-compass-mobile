
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const DashboardRedirect: React.FC = () => {
  const [userType, setUserType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in via localStorage (our current mock implementation)
    const getUserType = () => {
      try {
        const storedUser = localStorage.getItem('educonnect_user');
        
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUserType(userData.role);
        } else {
          setUserType(null);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error getting user type:', error);
        setUserType(null);
        setLoading(false);
      }
    };
    
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
  
  // If not authenticated, redirect to login
  return <Navigate to="/login" replace />;
};

export default DashboardRedirect;
