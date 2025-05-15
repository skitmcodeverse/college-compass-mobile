
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

const SyllabusPage: React.FC = () => {
  // Mock data for now - would connect to Supabase in production
  const subjects = [
    { id: 1, name: 'Mathematics', code: 'MTH101', units: 5, credits: 4, file: 'mathematics.pdf' },
    { id: 2, name: 'Physics', code: 'PHY101', units: 6, credits: 4, file: 'physics.pdf' },
    { id: 3, name: 'Chemistry', code: 'CHM101', units: 5, credits: 4, file: 'chemistry.pdf' },
    { id: 4, name: 'English', code: 'ENG101', units: 4, credits: 3, file: 'english.pdf' },
    { id: 5, name: 'Computer Science', code: 'CSC101', units: 6, credits: 4, file: 'computer_science.pdf' },
  ];

  return (
    <DashboardLayout userType="student">
      <PageTitle 
        title="Syllabus" 
        description="Access your course syllabus details and materials"
      />
      
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Course Syllabus</CardTitle>
          <Button size="sm" variant="outline">
            <FileText className="h-4 w-4 mr-2" /> Complete Syllabus
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Units</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell className="font-medium">{subject.name}</TableCell>
                  <TableCell>{subject.code}</TableCell>
                  <TableCell>{subject.units}</TableCell>
                  <TableCell>{subject.credits}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Download {subject.name} syllabus</span>
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-college-primary" />
              Books & References
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="p-3 bg-gray-50 rounded-md">
                <div className="font-medium">Advanced Engineering Mathematics</div>
                <div className="text-sm text-gray-500">By Erwin Kreyszig</div>
              </li>
              <li className="p-3 bg-gray-50 rounded-md">
                <div className="font-medium">Fundamentals of Physics</div>
                <div className="text-sm text-gray-500">By Halliday, Resnick, and Walker</div>
              </li>
              <li className="p-3 bg-gray-50 rounded-md">
                <div className="font-medium">Introduction to Algorithms</div>
                <div className="text-sm text-gray-500">By Cormen, Leiserson, Rivest, and Stein</div>
              </li>
              <li className="p-3 bg-gray-50 rounded-md">
                <div className="font-medium">Organic Chemistry</div>
                <div className="text-sm text-gray-500">By Morrison and Boyd</div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-college-primary" />
              Additional Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="p-3 bg-gray-50 rounded-md flex justify-between items-center">
                <div>
                  <div className="font-medium">Academic Calendar</div>
                  <div className="text-sm text-gray-500">2025-26 Session</div>
                </div>
                <Button size="sm" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
              </li>
              <li className="p-3 bg-gray-50 rounded-md flex justify-between items-center">
                <div>
                  <div className="font-medium">Grading Policy</div>
                  <div className="text-sm text-gray-500">Updated for current semester</div>
                </div>
                <Button size="sm" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
              </li>
              <li className="p-3 bg-gray-50 rounded-md flex justify-between items-center">
                <div>
                  <div className="font-medium">Laboratory Guidelines</div>
                  <div className="text-sm text-gray-500">Safety protocols and procedures</div>
                </div>
                <Button size="sm" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SyllabusPage;
