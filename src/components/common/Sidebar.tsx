
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  CalendarDays, 
  BookOpen, 
  User, 
  FileText, 
  CreditCard, 
  Bell, 
  Settings, 
  Bus,
  Briefcase,
  MessageSquare,
  AlertTriangle
} from 'lucide-react';

interface SidebarProps {
  userType: 'student' | 'faculty' | 'admin';
  isCollapsed: boolean;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  roles: Array<'student' | 'faculty' | 'admin'>;
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    roles: ['student', 'faculty', 'admin'],
  },
  {
    title: 'Attendance',
    href: '/attendance',
    icon: <CalendarDays className="h-5 w-5" />,
    roles: ['student', 'faculty', 'admin'],
  },
  {
    title: 'Marks',
    href: '/marks',
    icon: <FileText className="h-5 w-5" />,
    roles: ['student', 'faculty', 'admin'],
  },
  {
    title: 'Fees',
    href: '/fees',
    icon: <CreditCard className="h-5 w-5" />,
    roles: ['student', 'admin'],
  },
  {
    title: 'Syllabus',
    href: '/syllabus',
    icon: <BookOpen className="h-5 w-5" />,
    roles: ['student', 'faculty', 'admin'],
  },
  {
    title: 'Bus Tracking',
    href: '/bus-tracking',
    icon: <Bus className="h-5 w-5" />,
    roles: ['student', 'admin'],
  },
  {
    title: 'Placements',
    href: '/placements',
    icon: <Briefcase className="h-5 w-5" />,
    roles: ['student', 'faculty', 'admin'],
  },
  {
    title: 'Notifications',
    href: '/notifications',
    icon: <Bell className="h-5 w-5" />,
    roles: ['student', 'faculty', 'admin'],
  },
  {
    title: 'Notes & Homework',
    href: '/notes',
    icon: <MessageSquare className="h-5 w-5" />,
    roles: ['student', 'faculty', 'admin'],
  },
  {
    title: 'Report Issue',
    href: '/report',
    icon: <AlertTriangle className="h-5 w-5" />,
    roles: ['student', 'faculty', 'admin'],
  },
  {
    title: 'User Management',
    href: '/users',
    icon: <User className="h-5 w-5" />,
    roles: ['admin'],
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: <Settings className="h-5 w-5" />,
    roles: ['admin'],
  },
];

const Sidebar = ({ userType, isCollapsed }: SidebarProps) => {
  const location = useLocation();
  const pathName = location.pathname;
  
  // Filter navigation items based on user role
  const filteredNavItems = navItems.filter(item => item.roles.includes(userType));

  return (
    <aside 
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-20",
        isCollapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="flex flex-col h-full">
        <nav className="flex-1 py-4 px-3">
          <ul className="space-y-1">
            {filteredNavItems.map((item, index) => {
              const isActive = pathName === item.href || 
                (item.href !== '/dashboard' && pathName.startsWith(item.href));
              
              return (
                <li key={index}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      isActive 
                        ? "bg-college-primary text-white" 
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {item.icon}
                    {!isCollapsed && <span>{item.title}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200">
          {!isCollapsed && (
            <div className="text-xs text-gray-500">
              <p>© 2025 EduConnect</p>
              <p>Version 1.0.0</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
