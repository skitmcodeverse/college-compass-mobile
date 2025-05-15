
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Download, 
  Calendar, 
  Clock, 
  Search,
  PlusCircle,
  Book,
  CheckCircle,
  XCircle
} from 'lucide-react';

const NotesPage: React.FC = () => {
  // Mock data for now - would connect to Supabase in production
  const notes = [
    {
      id: 1,
      title: 'Calculus - Integration Methods',
      subject: 'Mathematics',
      uploadedBy: 'Prof. Sharma',
      uploadDate: '2025-05-10',
      fileType: 'pdf',
      fileSize: '2.4 MB'
    },
    {
      id: 2,
      title: 'Electromagnetic Theory',
      subject: 'Physics',
      uploadedBy: 'Prof. Gupta',
      uploadDate: '2025-05-08',
      fileType: 'pdf',
      fileSize: '3.1 MB'
    },
    {
      id: 3,
      title: 'Data Structures and Algorithms',
      subject: 'Computer Science',
      uploadedBy: 'Prof. Verma',
      uploadDate: '2025-05-05',
      fileType: 'pdf',
      fileSize: '4.2 MB'
    },
    {
      id: 4,
      title: 'Organic Chemistry - Lecture Notes',
      subject: 'Chemistry',
      uploadedBy: 'Prof. Reddy',
      uploadDate: '2025-05-01',
      fileType: 'pdf',
      fileSize: '1.8 MB'
    }
  ];

  const homework = [
    {
      id: 1,
      title: 'Mathematical Problem Set 3',
      subject: 'Mathematics',
      assignedBy: 'Prof. Sharma',
      deadline: '2025-05-20',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Physics Numerical Problems',
      subject: 'Physics',
      assignedBy: 'Prof. Gupta',
      deadline: '2025-05-18',
      status: 'pending'
    },
    {
      id: 3,
      title: 'Programming Assignment - Sorting Algorithms',
      subject: 'Computer Science',
      assignedBy: 'Prof. Verma',
      deadline: '2025-05-25',
      status: 'submitted'
    },
    {
      id: 4,
      title: 'Chemical Equations Balancing',
      subject: 'Chemistry',
      assignedBy: 'Prof. Reddy',
      deadline: '2025-05-15',
      status: 'pending'
    }
  ];

  return (
    <DashboardLayout userType="student">
      <PageTitle 
        title="Notes & Homework" 
        description="Access lecture notes and manage homework"
      />
      
      <Tabs defaultValue="notes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notes">Class Notes</TabsTrigger>
          <TabsTrigger value="homework">Homework</TabsTrigger>
        </TabsList>
        
        <TabsContent value="notes" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notes..."
                  className="w-full pl-9 py-2 px-4 border rounded-md"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Filter</Button>
              <Button variant="outline">Sort</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notes.map((note) => (
              <Card key={note.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{note.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <Book className="h-4 w-4 mr-1" />
                    {note.subject}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-500 mb-4">
                    <div>Uploaded by: {note.uploadedBy}</div>
                    <div>Date: {new Date(note.uploadDate).toLocaleDateString()}</div>
                    <div>File type: {note.fileType.toUpperCase()}</div>
                    <div>Size: {note.fileSize}</div>
                  </div>
                  
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" /> Download Notes
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="homework" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search homework..."
                  className="w-full pl-9 py-2 px-4 border rounded-md"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" /> Submit Homework
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {homework.map((hw) => (
              <Card key={hw.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle className="text-lg">{hw.title}</CardTitle>
                      <CardDescription className="flex items-center">
                        <Book className="h-4 w-4 mr-1" />
                        {hw.subject}
                      </CardDescription>
                    </div>
                    {hw.status === 'submitted' ? (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1" /> Submitted
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                        <Clock className="h-3 w-3 mr-1" /> Pending
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-500 mb-4">
                    <div>Assigned by: {hw.assignedBy}</div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Due: {new Date(hw.deadline).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full"
                    variant={hw.status === 'submitted' ? 'outline' : 'default'}
                    disabled={hw.status === 'submitted'}
                  >
                    {hw.status === 'submitted' ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" /> Already Submitted
                      </>
                    ) : (
                      <>
                        <PlusCircle className="h-4 w-4 mr-2" /> Submit Now
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default NotesPage;
