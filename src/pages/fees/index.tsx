
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, CheckCircle, AlertCircle, Download, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';

const FeesPage: React.FC = () => {
  const [userType, setUserType] = useState<string>('student');
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedUser = localStorage.getItem('educonnect_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUserType(userData.role);
      } catch (error) {
        console.error('Error parsing user data:', error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Mock data for student view
  const studentFeesSummary = {
    totalFees: 85000,
    paidAmount: 60000,
    pendingAmount: 25000,
    dueDate: '2025-06-30'
  };

  const studentFeeHistory = [
    { id: 1, type: 'Tuition Fee', amount: 50000, dueDate: '2025-05-15', status: 'paid', paymentDate: '2025-05-10' },
    { id: 2, type: 'Exam Fee', amount: 10000, dueDate: '2025-06-30', status: 'paid', paymentDate: '2025-05-10' },
    { id: 3, type: 'Library Fee', amount: 5000, dueDate: '2025-06-30', status: 'pending', paymentDate: null },
    { id: 4, type: 'Development Fee', amount: 15000, dueDate: '2025-06-30', status: 'pending', paymentDate: null },
    { id: 5, type: 'Laboratory Fee', amount: 5000, dueDate: '2025-06-30', status: 'pending', paymentDate: null },
  ];

  // Mock data for admin view - all students' fees
  const allStudentsFees = [
    { id: 1, studentName: 'Rahul Sharma', studentId: 'CS001', totalFees: 85000, paidAmount: 60000, pendingAmount: 25000, status: 'partial' },
    { id: 2, studentName: 'Priya Patel', studentId: 'EC002', totalFees: 80000, paidAmount: 80000, pendingAmount: 0, status: 'paid' },
    { id: 3, studentName: 'Vikram Mehta', studentId: 'ME003', totalFees: 75000, paidAmount: 25000, pendingAmount: 50000, status: 'overdue' },
    { id: 4, studentName: 'Kiran Reddy', studentId: 'CV004', totalFees: 82000, paidAmount: 82000, pendingAmount: 0, status: 'paid' },
    { id: 5, studentName: 'Anita Singh', studentId: 'CS005', totalFees: 85000, paidAmount: 40000, pendingAmount: 45000, status: 'partial' },
  ];

  const adminSummary = {
    totalStudents: allStudentsFees.length,
    totalCollected: allStudentsFees.reduce((sum, student) => sum + student.paidAmount, 0),
    totalPending: allStudentsFees.reduce((sum, student) => sum + student.pendingAmount, 0),
    overdueStudents: allStudentsFees.filter(student => student.status === 'overdue').length
  };

  if (userType === 'admin') {
    return (
      <div className="space-y-6 animate-fade-in">
        <PageTitle 
          title="Fee Management" 
          description="View and manage fees for all students"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Users className="h-4 w-4 mr-2 text-college-primary" />
                Total Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminSummary.totalStudents}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Total Collected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{adminSummary.totalCollected.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                Total Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{adminSummary.totalPending.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <AlertCircle className="h-4 w-4 mr-2 text-orange-500" />
                Overdue Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminSummary.overdueStudents}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>All Students Fee Status</CardTitle>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" /> Export Report
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Total Fees</TableHead>
                  <TableHead>Paid Amount</TableHead>
                  <TableHead>Pending Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allStudentsFees.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.studentName}</TableCell>
                    <TableCell>{student.studentId}</TableCell>
                    <TableCell>₹{student.totalFees.toLocaleString()}</TableCell>
                    <TableCell>₹{student.paidAmount.toLocaleString()}</TableCell>
                    <TableCell>₹{student.pendingAmount.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        student.status === 'paid' ? 'bg-green-100 text-green-800' : 
                        student.status === 'partial' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Student view (existing code)
  return (
    <div className="space-y-6 animate-fade-in">
      <PageTitle 
        title="Fees & Payments" 
        description="Manage your fees and view payment history"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-college-primary" />
              Total Fees (Yearly)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{studentFeesSummary.totalFees.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              Paid Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{studentFeesSummary.paidAmount.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
              Pending Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{studentFeesSummary.pendingAmount.toLocaleString()}</div>
            <div className="text-xs text-red-500">Due by: {new Date(studentFeesSummary.dueDate).toLocaleDateString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Payment History</CardTitle>
          <Button size="sm" variant="outline">
            <Download className="h-4 w-4 mr-2" /> Receipt
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fee Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentFeeHistory.map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell className="font-medium">{fee.type}</TableCell>
                  <TableCell>₹{fee.amount.toLocaleString()}</TableCell>
                  <TableCell>{new Date(fee.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      fee.status === 'paid' ? 'bg-green-100 text-green-800' : 
                      fee.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{fee.paymentDate ? new Date(fee.paymentDate).toLocaleDateString() : '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Make a Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Pay your fees online using any of the supported payment methods. You'll receive a receipt via email after your payment is processed.
            </p>
            <Button className="w-full sm:w-auto">
              Pay Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeesPage;
