import React, { useEffect, useState } from 'react';
import PageTitle from '@/components/common/PageTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

interface FeeRecord {
  id: string;
  fee_type: string;
  amount: number;
  due_date: string | null;
  payment_date: string | null;
  status: string;
  academic_year: string;
  receipt_number: string | null;
}

const FeesPage: React.FC = () => {
  const { user } = useAuth();
  const [fees, setFees] = useState<FeeRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchFees = async () => {
      const { data, error } = await supabase
        .from('fees')
        .select('*')
        .eq('student_id', user.id)
        .order('created_at', { ascending: false });
      if (!error && data) setFees(data);
      setLoading(false);
    };
    fetchFees();
  }, [user]);

  const totalFees = fees.reduce((sum, f) => sum + f.amount, 0);
  const paidAmount = fees.filter(f => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0);
  const pendingAmount = totalFees - paidAmount;

  return (
    <>
      <PageTitle title="Fees & Payments" description="View your fee records and payment history" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-college-primary" /> Total Fees
            </CardTitle>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">₹{totalFees.toLocaleString()}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Paid Amount
            </CardTitle>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">₹{paidAmount.toLocaleString()}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertCircle className="h-4 w-4 mr-2 text-red-500" /> Pending Amount
            </CardTitle>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold text-red-600">₹{pendingAmount.toLocaleString()}</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Fee Records</CardTitle></CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading fees...</div>
          ) : fees.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No fee records found. Contact admin for fee details.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fee Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Academic Year</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fees.map((fee) => (
                  <TableRow key={fee.id}>
                    <TableCell className="font-medium">{fee.fee_type}</TableCell>
                    <TableCell>₹{fee.amount.toLocaleString()}</TableCell>
                    <TableCell>{fee.academic_year}</TableCell>
                    <TableCell>{fee.due_date ? new Date(fee.due_date).toLocaleDateString() : '-'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        fee.status === 'paid' ? 'bg-green-100 text-green-800' :
                        fee.status === 'overdue' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{fee.payment_date ? new Date(fee.payment_date).toLocaleDateString() : '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default FeesPage;
