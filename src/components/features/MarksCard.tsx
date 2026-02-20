import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

interface MarksCardProps {
  compact?: boolean;
}

interface SubjectMark {
  subject: string;
  score: number;
  max_score: number;
}

const MarksCard: React.FC<MarksCardProps> = ({ compact }) => {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<SubjectMark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchMarks = async () => {
      const { data, error } = await supabase
        .from('marks')
        .select('subject, score, max_score')
        .eq('student_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);
      if (!error && data) {
        setSubjects(data);
      }
      setLoading(false);
    };
    fetchMarks();
  }, [user]);

  const overallPercentage = subjects.length > 0
    ? subjects.reduce((acc, s) => acc + (s.score / s.max_score * 100), 0) / subjects.length
    : 0;

  if (loading) {
    return (
      <Card className="dashboard-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <FileText className="h-5 w-5 mr-2 text-college-primary" />
            Latest Marks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <FileText className="h-5 w-5 mr-2 text-college-primary" />
          Latest Marks
        </CardTitle>
      </CardHeader>
      <CardContent>
        {subjects.length === 0 ? (
          <p className="text-sm text-muted-foreground">No marks available yet.</p>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-college-primary">
                {overallPercentage.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">Overall Percentage</p>
            </div>
            {!compact && (
              <>
                <div className="space-y-3 mt-4">
                  {subjects.map((subject, index) => {
                    const percentage = (subject.score / subject.max_score) * 100;
                    return (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{subject.subject}</span>
                          <span className="font-medium">{subject.score}/{subject.max_score}</span>
                        </div>
                        <Progress value={percentage} className="h-1.5" />
                      </div>
                    );
                  })}
                </div>
                <Link to="/marks" className="text-sm text-college-primary flex items-center hover:underline mt-4">
                  View all marks <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarksCard;
