
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import MobileNavigation from '../common/MobileNavigation';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  userType: 'student' | 'faculty' | 'admin';
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ userType, children }) => {
  const isMobile = useIsMobile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(isMobile);

  // Ensure sidebar is collapsed on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar 
        userType={userType} 
        toggleSidebar={toggleSidebar}
      />
      
      <div className="flex flex-1 pt-16 relative">
        {!isMobile && (
          <Sidebar 
            userType={userType} 
            isCollapsed={sidebarCollapsed} 
          />
        )}
        
        <main 
          className={cn(
            "flex-1 overflow-y-auto p-3 md:p-5 transition-all duration-300 pb-20 md:pb-6",
            !isMobile && (sidebarCollapsed ? "ml-[70px]" : "ml-[250px]")
          )}
        >
          <div className="max-w-6xl mx-auto w-full animate-fade-in">
            {children || <Outlet />}
          </div>
        </main>
      </div>
      
      {isMobile && <MobileNavigation userType={userType} />}
    </div>
  );
};

export default DashboardLayout;
