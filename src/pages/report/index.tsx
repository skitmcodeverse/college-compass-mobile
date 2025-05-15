
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Bug, Users, CheckCircle } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const ReportIssuePage: React.FC = () => {
  const [issueType, setIssueType] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would normally connect to Supabase to store the issue
    setIsSubmitted(true);
    
    // Reset form after submission (in real app would reset after successful API call)
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <DashboardLayout userType="student">
      <PageTitle 
        title="Report Issue" 
        description="Report technical issues, facilities problems, or incidents"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Submit an Issue Report</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="issue-type">Issue Type</Label>
                  <Select 
                    value={issueType} 
                    onValueChange={setIssueType}
                    required
                  >
                    <SelectTrigger id="issue-type">
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">App/Website Technical Issue</SelectItem>
                      <SelectItem value="facility">Facilities Problem</SelectItem>
                      <SelectItem value="ragging">Ragging Incident</SelectItem>
                      <SelectItem value="academic">Academic Issue</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="issue-title">Title</Label>
                  <Input 
                    id="issue-title" 
                    placeholder="Brief description of the issue" 
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="issue-description">Detailed Description</Label>
                  <Textarea 
                    id="issue-description" 
                    placeholder="Please provide as much detail as possible..."
                    rows={5}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="issue-location">Location (if applicable)</Label>
                  <Input 
                    id="issue-location" 
                    placeholder="e.g., Lab 101, Hostel Block B, etc."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="issue-attachment">Attachment (optional)</Label>
                  <Input 
                    id="issue-attachment" 
                    type="file"
                  />
                  <p className="text-xs text-gray-500">Upload screenshots or relevant files (max 5MB)</p>
                </div>
                
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4" required />
                    <span>I confirm that this report is accurate to the best of my knowledge</span>
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="reset">Clear Form</Button>
                <Button type="submit" disabled={isSubmitted}>
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Submitted!
                    </>
                  ) : (
                    'Submit Report'
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reporting Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium flex items-center mb-1">
                  <Bug className="h-4 w-4 mr-2 text-red-500" />
                  Technical Issues
                </h3>
                <p className="text-sm text-gray-600">
                  Include error messages, steps to reproduce, and device/browser details.
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium flex items-center mb-1">
                  <AlertCircle className="h-4 w-4 mr-2 text-yellow-500" />
                  Facilities Issues
                </h3>
                <p className="text-sm text-gray-600">
                  Specify location, time noticed, and nature of the problem in detail.
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium flex items-center mb-1">
                  <Users className="h-4 w-4 mr-2 text-blue-500" />
                  Ragging Incidents
                </h3>
                <p className="text-sm text-gray-600">
                  All reports are confidential. Include date, time, location, and involved individuals if comfortable.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Need urgent assistance? Contact us directly:
              </p>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Technical Support:</span><br />
                  support@educonnect.com
                </div>
                <div>
                  <span className="font-medium">Emergency Helpline:</span><br />
                  +91 9876543210
                </div>
                <div>
                  <span className="font-medium">Anti-Ragging Committee:</span><br />
                  antiragging@educonnect.com
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportIssuePage;
