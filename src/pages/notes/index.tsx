import React, { useEffect, useState } from 'react';
import PageTitle from '@/components/common/PageTitle';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileText, Download, Calendar, Clock, Search, Book, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

interface Note {
  id: string;
  title: string;
  subject: string;
  uploaded_by_name: string | null;
  created_at: string;
  file_url: string | null;
  file_type: string | null;
  file_size: string | null;
}

interface Homework {
  id: string;
  title: string;
  subject: string;
  assigned_by_name: string | null;
  deadline: string | null;
  description: string | null;
}

interface Submission {
  homework_id: string;
}

const NotesPage: React.FC = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [homework, setHomework] = useState<Homework[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const [notesRes, homeworkRes, submissionsRes] = await Promise.all([
        supabase.from('notes').select('*').order('created_at', { ascending: false }),
        supabase.from('homework').select('*').order('deadline', { ascending: true }),
        user ? supabase.from('homework_submissions').select('homework_id').eq('student_id', user.id) : Promise.resolve({ data: [], error: null }),
      ]);
      if (!notesRes.error && notesRes.data) setNotes(notesRes.data);
      if (!homeworkRes.error && homeworkRes.data) setHomework(homeworkRes.data);
      if (!submissionsRes.error && submissionsRes.data) setSubmissions(submissionsRes.data);
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const isSubmitted = (hwId: string) => submissions.some(s => s.homework_id === hwId);

  const filteredNotes = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.subject.toLowerCase().includes(search.toLowerCase())
  );

  const filteredHomework = homework.filter(hw =>
    hw.title.toLowerCase().includes(search.toLowerCase()) ||
    hw.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <PageTitle title="Notes & Homework" description="Access lecture notes and manage homework" />

      <Tabs defaultValue="notes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notes">Class Notes</TabsTrigger>
          <TabsTrigger value="homework">Homework</TabsTrigger>
        </TabsList>

        <TabsContent value="notes" className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input className="pl-9" placeholder="Search notes..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading notes...</div>
          ) : filteredNotes.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-muted-foreground">
                  {notes.length === 0 ? 'No notes uploaded yet. Your teacher will upload notes here.' : 'No notes match your search.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredNotes.map((note) => (
                <Card key={note.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{note.title}</CardTitle>
                    <CardDescription className="flex items-center">
                      <Book className="h-4 w-4 mr-1" /> {note.subject}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-y-2 text-sm text-muted-foreground mb-4">
                      {note.uploaded_by_name && <div>Uploaded by: {note.uploaded_by_name}</div>}
                      <div>Date: {new Date(note.created_at).toLocaleDateString()}</div>
                      {note.file_type && <div>Type: {note.file_type.toUpperCase()}</div>}
                      {note.file_size && <div>Size: {note.file_size}</div>}
                    </div>
                    {note.file_url ? (
                      <Button className="w-full" asChild>
                        <a href={note.file_url} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-2" /> Download Notes
                        </a>
                      </Button>
                    ) : (
                      <Button className="w-full" disabled variant="outline">No file attached</Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="homework" className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input className="pl-9" placeholder="Search homework..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading homework...</div>
          ) : filteredHomework.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-muted-foreground">
                  {homework.length === 0 ? 'No homework assigned yet.' : 'No homework matches your search.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredHomework.map((hw) => (
                <Card key={hw.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle className="text-lg">{hw.title}</CardTitle>
                        <CardDescription className="flex items-center">
                          <Book className="h-4 w-4 mr-1" /> {hw.subject}
                        </CardDescription>
                      </div>
                      {isSubmitted(hw.id) ? (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center h-fit">
                          <CheckCircle className="h-3 w-3 mr-1" /> Submitted
                        </span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center h-fit">
                          <Clock className="h-3 w-3 mr-1" /> Pending
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {hw.description && (
                      <p className="text-sm text-muted-foreground mb-3">{hw.description}</p>
                    )}
                    <div className="grid grid-cols-2 gap-y-2 text-sm text-muted-foreground mb-4">
                      {hw.assigned_by_name && <div>Assigned by: {hw.assigned_by_name}</div>}
                      {hw.deadline && (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Due: {new Date(hw.deadline).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
};

export default NotesPage;
