
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarDays, 
  BookOpen, 
  Bell, 
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileNavigationProps {
  userType: 'student' | 'faculty' | 'admin';
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ userType }) => {
  const location = useLocation();
  const pathName = location.pathname;

  // Define navigation items based on user role
  // Limited to 5 most important items for mobile bottom nav
  const navigationItems = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      href: `/dashboard/${userType}`,
      roles: ['student', 'faculty', 'admin'],
    },
    {
      icon: <CalendarDays className="h-5 w-5" />,
      label: "Attendance",
      href: "/attendance",
      roles: ['student', 'faculty', 'admin'],
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      label: "Notes",
      href: "/notes",
      roles: ['student', 'faculty', 'admin'],
    },
    {
      icon: <Bell className="h-5 w-5" />,
      label: "Alerts",
      href: "/notifications",
      roles: ['student', 'faculty', 'admin'],
    },
    {
      icon: <Menu className="h-5 w-5" />,
      label: "More",
      href: "/more",
      roles: ['student', 'faculty', 'admin'],
    },
  ];

  // Filter items by role
  const filteredItems = navigationItems.filter(item => 
    item.roles.includes(userType)
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 shadow-lg">
      <div className="flex justify-around items-center h-16">
        {filteredItems.map((item, index) => {
          const isActive = pathName === item.href || 
            (pathName.startsWith(item.href) && item.href !== '/more');
          
          return (
            <Link
              key={index}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full px-1 transition-all duration-200",
                isActive 
                  ? "text-college-primary transform scale-105" 
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <div className={cn(
                "rounded-full p-1 transition-all duration-200",
                isActive ? "bg-college-primary/10" : ""
              )}>
                {item.icon}
              </div>
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavigation;
