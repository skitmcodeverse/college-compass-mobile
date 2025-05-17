
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import PageTitle from '@/components/common/PageTitle';
import { Card } from '@/components/ui/card';

// Define all navigation items
const allNavigationItems = [
  {
    icon: <LayoutDashboard className="h-5 w-5" />,
    label: "Dashboard",
    href: "/dashboard",
    roles: ['student', 'faculty', 'admin'],
  },
  {
    icon: <CalendarDays className="h-5 w-5" />,
    label: "Attendance",
    href: "/attendance",
    roles: ['student', 'faculty', 'admin'],
  },
  {
    icon: <FileText className="h-5 w-5" />,
    label: "Marks",
    href: "/marks",
    roles: ['student', 'faculty', 'admin'],
  },
  {
    icon: <CreditCard className="h-5 w-5" />,
    label: "Fees",
    href: "/fees",
    roles: ['student', 'admin'],
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    label: "Syllabus",
    href: "/syllabus",
    roles: ['student', 'faculty', 'admin'],
  },
  {
    icon: <Bus className="h-5 w-5" />,
    label: "Bus Tracking",
    href: "/bus-tracking",
    roles: ['student', 'admin'],
  },
  {
    icon: <Briefcase className="h-5 w-5" />,
    label: "Placements",
    href: "/placements",
    roles: ['student', 'faculty', 'admin'],
  },
  {
    icon: <Bell className="h-5 w-5" />,
    label: "Notifications",
    href: "/notifications",
    roles: ['student', 'faculty', 'admin'],
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    label: "Notes & Homework",
    href: "/notes",
    roles: ['student', 'faculty', 'admin'],
  },
  {
    icon: <AlertTriangle className="h-5 w-5" />,
    label: "Report Issue",
    href: "/report",
    roles: ['student', 'faculty', 'admin'],
  },
  {
    icon: <User className="h-5 w-5" />,
    label: "User Management",
    href: "/users",
    roles: ['admin'],
  },
  {
    icon: <Settings className="h-5 w-5" />,
    label: "Settings",
    href: "/settings",
    roles: ['student', 'faculty', 'admin'],
  },
];

const MorePage: React.FC = () => {
  // In a real app, you would check the authenticated user's role
  // For now, we'll use a mock value
  const userType = 'student'; // This would be dynamic based on authentication
  const navigate = useNavigate();
  
  // Filter items by role
  const filteredItems = allNavigationItems.filter(item => 
    item.roles.includes(userType)
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <PageTitle 
        title="More Options" 
        description="Access all features of EduConnect"
      />
      
      <div className="grid grid-cols-3 gap-4">
        {filteredItems.map((item, index) => (
          <Link 
            key={index} 
            to={item.href}
            className="no-underline"
          >
            <Card className="flex flex-col items-center justify-center p-4 hover:bg-gray-50 transition-colors">
              <div className="rounded-full bg-college-primary/10 p-3 mb-2 text-college-primary">
                {item.icon}
              </div>
              <span className="text-sm text-center">{item.label}</span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MorePage;
