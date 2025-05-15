
import React from 'react';
import { Navigate } from 'react-router-dom';

// This page redirects to the appropriate dashboard based on user role
const DashboardRedirect: React.FC = () => {
  // In a real app, you would check the authenticated user's role
  // For now, we'll just redirect to the student dashboard
  const userType = 'student'; // This would be dynamic based on authentication
  
  // Redirect based on user type
  if (userType === 'student') {
    return <Navigate to="/dashboard/student" replace />;
  } else if (userType === 'faculty') {
    return <Navigate to="/dashboard/faculty" replace />;
  } else if (userType === 'admin') {
    return <Navigate to="/dashboard/admin" replace />;
  }
  
  // Default fallback
  return <Navigate to="/" replace />;
};

export default DashboardRedirect;
