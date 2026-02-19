import React, { useState } from 'react';
import PageTitle from '@/components/common/PageTitle';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Bug, Users, CheckCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { toast } from 'sonner';

const ReportIssuePage: React.FC = () => {
  const { user } = useAuth();
  const [issueType, setIssueType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast.error('You must be logged in to report an issue.'); return; }
    setIsSubmitting(true);

    const { error } = await supabase.from('report_issues').insert({
      reported_by: user.id,
      issue_type: issueType,
      title,
      description,
      location: location || null,
      status: 'open',
    });

    setIsSubmitting(false);
    if (error) {
      toast.error('Failed to submit report: ' + error.message);
    } else {
      setIsSubmitted(true);
      toast.success('Issue reported successfully!');
      // Reset form
      setTimeout(() => {
        setIssueType('');
        setTitle('');
        setDescription('');
        setLocation('');
        setConfirmed(false);
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <>
      <PageTitle title="Report Issue" description="Report technical issues, facilities problems, or incidents" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader><CardTitle>Submit an Issue Report</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Issue Type</Label>
                  <Select value={issueType} onValueChange={setIssueType} required>
                    <SelectTrigger>
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
                  <Label>Title</Label>
                  <Input placeholder="Brief description of the issue" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label>Detailed Description</Label>
                  <Textarea placeholder="Please provide as much detail as possible..." rows={5} value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label>Location (if applicable)</Label>
                  <Input placeholder="e.g., Lab 101, Hostel Block B, etc." value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={confirmed}
                      onChange={(e) => setConfirmed(e.target.checked)}
                      required
                    />
                    <span>I confirm that this report is accurate to the best of my knowledge</span>
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="reset" onClick={() => {
                  setIssueType(''); setTitle(''); setDescription(''); setLocation(''); setConfirmed(false);
                }}>Clear Form</Button>
                <Button type="submit" disabled={isSubmitting || isSubmitted || !confirmed}>
                  {isSubmitted ? (
                    <><CheckCircle className="h-4 w-4 mr-2" /> Submitted!</>
                  ) : isSubmitting ? 'Submitting...' : 'Submit Report'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-lg">Reporting Guidelines</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium flex items-center mb-1">
                  <Bug className="h-4 w-4 mr-2 text-red-500" /> Technical Issues
                </h3>
                <p className="text-sm text-muted-foreground">Include error messages, steps to reproduce, and device/browser details.</p>
              </div>
              <div>
                <h3 className="text-sm font-medium flex items-center mb-1">
                  <AlertCircle className="h-4 w-4 mr-2 text-yellow-500" /> Facilities Issues
                </h3>
                <p className="text-sm text-muted-foreground">Specify location, time noticed, and nature of the problem in detail.</p>
              </div>
              <div>
                <h3 className="text-sm font-medium flex items-center mb-1">
                  <Users className="h-4 w-4 mr-2 text-blue-500" /> Ragging Incidents
                </h3>
                <p className="text-sm text-muted-foreground">All reports are confidential. Include date, time, location, and involved individuals if comfortable.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">Contact Support</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Need urgent assistance? Contact us directly:</p>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">College Email:</span><br />info@skitm.edu</div>
                <div><span className="font-medium">Anti-Ragging Committee:</span><br />antiragging@skitm.edu</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ReportIssuePage;
