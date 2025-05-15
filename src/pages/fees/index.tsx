
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

const FeesPage: React.FC = () => {
  // Mock data for now - would connect to Supabase in production
  const feesSummary = {
    totalFees: 85000,
    paidAmount: 60000,
    pendingAmount: 25000,
    dueDate: '2025-06-30'
  };

  const feeHistory = [
    { id: 1, type: 'Tuition Fee', amount: 50000, dueDate: '2025-05-15', status: 'paid', paymentDate: '2025-05-10' },
    { id: 2, type: 'Exam Fee', amount: 10000, dueDate: '2025-06-30', status: 'paid', paymentDate: '2025-05-10' },
    { id: 3, type: 'Library Fee', amount: 5000, dueDate: '2025-06-30', status: 'pending', paymentDate: null },
    { id: 4, type: 'Development Fee', amount: 15000, dueDate: '2025-06-30', status: 'pending', paymentDate: null },
    { id: 5, type: 'Laboratory Fee', amount: 5000, dueDate: '2025-06-30', status: 'pending', paymentDate: null },
  ];

  return (
    <DashboardLayout userType="student">
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
            <div className="text-2xl font-bold">₹{feesSummary.totalFees.toLocaleString()}</div>
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
            <div className="text-2xl font-bold">₹{feesSummary.paidAmount.toLocaleString()}</div>
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
            <div className="text-2xl font-bold">₹{feesSummary.pendingAmount.toLocaleString()}</div>
            <div className="text-xs text-red-500">Due by: {new Date(feesSummary.dueDate).toLocaleDateString()}</div>
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
              {feeHistory.map((fee) => (
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
    </DashboardLayout>
  );
};

export default FeesPage;
