
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  Menu, 
  X, 
  User,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavbarProps {
  userType?: 'student' | 'faculty' | 'admin' | null;
  toggleSidebar?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ userType, toggleSidebar }) => {
  const isMobile = useIsMobile();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Mock data for testing
  const userName = userType ? `Test ${userType.charAt(0).toUpperCase() + userType.slice(1)}` : 'Guest';
  const notificationCount = 3;

  return (
    <header className="bg-white border-b border-gray-200 fixed w-full top-0 z-30">
      <div className="px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center">
          {toggleSidebar && !isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2" 
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          
          <Link to="/" className="flex items-center">
            <span className="font-bold text-xl text-college-primary">EduConnect</span>
          </Link>
        </div>

        <div className="flex items-center gap-1 md:gap-4">
          {isSearchOpen && !isMobile ? (
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="border rounded-md py-1 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-college-primary"
              />
              <button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2" 
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:inline-flex"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            asChild
          >
            <Link to="/notifications">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 text-xs flex items-center justify-center bg-college-danger text-white rounded-full">
                  {notificationCount}
                </span>
              )}
              <span className="sr-only">Notifications</span>
            </Link>
          </Button>

          {userType ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full h-8 w-8 bg-college-primary text-white transition-transform hover:scale-105"
                >
                  {userName.charAt(0)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="font-medium">{userName}</div>
                  <div className="text-xs text-gray-500 capitalize">{userType}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="bg-college-primary hover:bg-blue-700">
              <Link to="/login">Log in</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
