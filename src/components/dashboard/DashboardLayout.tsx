
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  userType: 'student' | 'faculty' | 'admin';
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ userType, children }) => {
  const isMobile = useIsMobile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(isMobile);

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar 
        userType={userType} 
        toggleSidebar={toggleSidebar}
      />
      
      <div className="flex flex-1 pt-16 overflow-hidden">
        <Sidebar 
          userType={userType} 
          isCollapsed={sidebarCollapsed} 
        />
        
        <main 
          className={cn(
            "flex-1 overflow-y-auto p-4 md:p-6 transition-all duration-300",
            sidebarCollapsed ? "ml-[70px]" : "ml-[250px]"
          )}
        >
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
