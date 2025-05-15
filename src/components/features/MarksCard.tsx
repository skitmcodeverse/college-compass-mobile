
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

interface MarksCardProps {
  compact?: boolean;
}

const MarksCard: React.FC<MarksCardProps> = ({ compact }) => {
  // Mock data for testing
  const subjects = [
    { name: "Data Structures", marks: 92, totalMarks: 100 },
    { name: "Database Systems", marks: 85, totalMarks: 100 },
    { name: "Computer Networks", marks: 78, totalMarks: 100 },
  ];
  
  // Calculate overall percentage
  const overallPercentage = subjects.reduce((acc, subject) => {
    return acc + (subject.marks / subject.totalMarks * 100);
  }, 0) / subjects.length;
  
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <FileText className="h-5 w-5 mr-2 text-college-primary" />
          Latest Marks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-college-primary">
              {overallPercentage.toFixed(1)}%
            </div>
            <p className="text-xs text-college-text-light">Overall Percentage</p>
          </div>
          
          {!compact && (
            <>
              <div className="space-y-3 mt-4">
                {subjects.map((subject, index) => {
                  const percentage = (subject.marks / subject.totalMarks) * 100;
                  return (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{subject.name}</span>
                        <span className="font-medium">{subject.marks}/{subject.totalMarks}</span>
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
      </CardContent>
    </Card>
  );
};

export default MarksCard;
