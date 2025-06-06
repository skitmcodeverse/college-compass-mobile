
import React, { useState } from 'react';
import PageTitle from '@/components/common/PageTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { 
  Users,
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash,
  Mail,
  UserPlus,
  UserCheck,
  UserX
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

const UserManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock users data - in a real app would fetch from Supabase
  const userData = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul.s@example.com', role: 'student', department: 'Computer Science', status: 'active' },
    { id: 2, name: 'Priya Patel', email: 'priya.p@example.com', role: 'student', department: 'Electronics', status: 'active' },
    { id: 3, name: 'Dr. Amit Kumar', email: 'amit.k@example.com', role: 'faculty', department: 'Computer Science', status: 'active' },
    { id: 4, name: 'Neha Singh', email: 'neha.s@example.com', role: 'admin', department: 'Administration', status: 'active' },
    { id: 5, name: 'Vikram Mehta', email: 'vikram.m@example.com', role: 'student', department: 'Mechanical', status: 'inactive' },
    { id: 6, name: 'Dr. Sunita Verma', email: 'sunita.v@example.com', role: 'faculty', department: 'Mathematics', status: 'active' },
    { id: 7, name: 'Kiran Reddy', email: 'kiran.r@example.com', role: 'student', department: 'Civil', status: 'active' },
    { id: 8, name: 'Prof. Raj Malhotra', email: 'raj.m@example.com', role: 'faculty', department: 'Physics', status: 'inactive' },
  ];

  // Filter users based on search term
  const filteredUsers = userData.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Count users by role
  const userStats = {
    total: userData.length,
    students: userData.filter(u => u.role === 'student').length,
    faculty: userData.filter(u => u.role === 'faculty').length,
    admin: userData.filter(u => u.role === 'admin').length,
    active: userData.filter(u => u.status === 'active').length,
    inactive: userData.filter(u => u.status === 'inactive').length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageTitle 
        title="User Management" 
        description="Add, edit, and manage users in the system"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="h-4 w-4 mr-2 text-college-primary" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.total}</div>
            <p className="text-xs text-gray-500">
              {userStats.active} active, {userStats.inactive} inactive
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <UserCheck className="h-4 w-4 mr-2 text-green-500" />
              User Roles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Students:</span>
                <span className="font-medium">{userStats.students}</span>
              </div>
              <div className="flex justify-between">
                <span>Faculty:</span>
                <span className="font-medium">{userStats.faculty}</span>
              </div>
              <div className="flex justify-between">
                <span>Admins:</span>
                <span className="font-medium">{userStats.admin}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <UserPlus className="h-4 w-4 mr-2 text-blue-500" />
              Add New Users
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full" size="sm">
              <Plus className="h-3.5 w-3.5 mr-1" /> Add User
            </Button>
            <Button className="w-full" variant="outline" size="sm">
              <UserPlus className="h-3.5 w-3.5 mr-1" /> Bulk Import
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-college-primary" />
              User List
            </CardTitle>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> New User
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="capitalize">{user.role}</TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {user.status === 'active' ? (
                              <>
                                <UserX className="h-4 w-4 mr-2" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <UserCheck className="h-4 w-4 mr-2" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No users found matching your search
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagementPage;
