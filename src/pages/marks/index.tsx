import React, { useEffect, useState } from 'react';
import PageTitle from '@/components/common/PageTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Award, Percent } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

interface MarkRecord {
  id: string;
  subject: string;
  exam_type: string;
  score: number;
  max_score: number;
  grade: string | null;
  academic_year: string;
}

const MarksPage: React.FC = () => {
  const { user } = useAuth();
  const [marks, setMarks] = useState<MarkRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchMarks = async () => {
      const { data, error } = await supabase
        .from('marks')
        .select('*')
        .eq('student_id', user.id)
        .order('created_at', { ascending: false });
      if (!error && data) setMarks(data);
      setLoading(false);
    };
    fetchMarks();
  }, [user]);

  const totalAverage = marks.length > 0
    ? marks.reduce((acc, m) => acc + (m.score / m.max_score) * 100, 0) / marks.length
    : 0;

  const bestMark = marks.length > 0
    ? marks.reduce((best, m) => (m.score / m.max_score > best.score / best.max_score ? m : best))
    : null;

  return (
    <>
      <PageTitle title="Marks & Grades" description="View your examination scores and academic performance" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <FileText className="h-4 w-4 mr-2 text-college-primary" /> Total Records
            </CardTitle>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{marks.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Award className="h-4 w-4 mr-2 text-yellow-500" /> Best Subject
            </CardTitle>
          </CardHeader>
          <CardContent>
            {bestMark ? (
              <>
                <div className="text-xl font-bold">{bestMark.subject}</div>
                <div className="text-sm text-muted-foreground">{bestMark.grade || `${bestMark.score}/${bestMark.max_score}`}</div>
              </>
            ) : (
              <div className="text-muted-foreground text-sm">No data</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Percent className="h-4 w-4 mr-2 text-blue-500" /> Average Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAverage.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Marks Records</CardTitle></CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading marks...</div>
          ) : marks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No marks records found. Your teacher will update them.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Exam Type</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Academic Year</TableHead>
                  <TableHead className="text-right">Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {marks.map((mark) => (
                  <TableRow key={mark.id}>
                    <TableCell className="font-medium">{mark.subject}</TableCell>
                    <TableCell>{mark.exam_type}</TableCell>
                    <TableCell>{mark.score}/{mark.max_score}</TableCell>
                    <TableCell>{mark.academic_year}</TableCell>
                    <TableCell className="text-right">
                      {mark.grade && (
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          mark.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                          mark.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>{mark.grade}</span>
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

export default MarksPage;
