import React, { useEffect, useState } from 'react';
import PageTitle from '@/components/common/PageTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, FileText, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';

interface SyllabusItem {
  id: string;
  subject_name: string;
  subject_code: string;
  units: number;
  credits: number;
  department: string;
  academic_year: string;
  file_url: string | null;
}

const SyllabusPage: React.FC = () => {
  const [subjects, setSubjects] = useState<SyllabusItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSyllabus = async () => {
      const { data, error } = await supabase
        .from('syllabus')
        .select('*')
        .order('subject_name');
      if (!error && data) setSubjects(data);
      setLoading(false);
    };
    fetchSyllabus();
  }, []);

  return (
    <>
      <PageTitle title="Syllabus" description="Access your course syllabus details and materials" />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-college-primary" />
            Course Syllabus
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading syllabus...</div>
          ) : subjects.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No syllabus uploaded yet.</p>
              <p className="text-sm mt-1">Your teacher will upload syllabus materials soon.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Units</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjects.map((subject) => (
                  <TableRow key={subject.id}>
                    <TableCell className="font-medium">{subject.subject_name}</TableCell>
                    <TableCell>{subject.subject_code}</TableCell>
                    <TableCell>{subject.department}</TableCell>
                    <TableCell>{subject.units}</TableCell>
                    <TableCell>{subject.credits}</TableCell>
                    <TableCell>{subject.academic_year}</TableCell>
                    <TableCell className="text-right">
                      {subject.file_url ? (
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0" asChild>
                          <a href={subject.file_url} target="_blank" rel="noopener noreferrer">
                            <span className="sr-only">Download {subject.subject_name} syllabus</span>
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground">No file</span>
                      )}
                    </TableCell>
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

export default SyllabusPage;
