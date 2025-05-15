
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Award, Percent } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

const MarksPage: React.FC = () => {
  // Mock data for now - would connect to Supabase in production
  const exams = [
    { id: 1, name: 'Mid-term Examination', date: '2025-03-15' },
    { id: 2, name: 'Final Examination', date: '2025-05-20' },
    { id: 3, name: 'Practical Assessment', date: '2025-04-10' },
    { id: 4, name: 'Project Submission', date: '2025-04-25' },
  ];

  const marks = [
    { subject: 'Mathematics', midterm: 82, finals: 78, grade: 'B+' },
    { subject: 'Physics', midterm: 76, finals: 81, grade: 'B+' },
    { subject: 'Chemistry', midterm: 89, finals: 91, grade: 'A' },
    { subject: 'English', midterm: 75, finals: 80, grade: 'B' },
    { subject: 'Computer Science', midterm: 95, finals: 92, grade: 'A+' },
  ];

  const totalAverage = marks.reduce((acc, mark) => 
    acc + ((mark.midterm + mark.finals) / 2), 0) / marks.length;

  return (
    <DashboardLayout userType="student">
      <PageTitle 
        title="Marks & Grades" 
        description="View your examination scores and academic performance"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <FileText className="h-4 w-4 mr-2 text-college-primary" />
              Total Subjects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{marks.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Award className="h-4 w-4 mr-2 text-yellow-500" />
              Best Subject
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Computer Science</div>
            <div className="text-sm text-gray-500">Grade: A+</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Percent className="h-4 w-4 mr-2 text-blue-500" />
              Average Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAverage.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Subject Marks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Midterm</TableHead>
                <TableHead>Finals</TableHead>
                <TableHead className="text-right">Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {marks.map((mark, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{mark.subject}</TableCell>
                  <TableCell>{mark.midterm}/100</TableCell>
                  <TableCell>{mark.finals}/100</TableCell>
                  <TableCell className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      mark.grade.startsWith('A') ? 'bg-green-100 text-green-800' : 
                      mark.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {mark.grade}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Examinations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exam Name</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exams.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell className="font-medium">{exam.name}</TableCell>
                  <TableCell className="text-right">{new Date(exam.date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default MarksPage;
