
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, Users, MapPin, Image, Save } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const CreateEventPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would connect to Supabase to store the new event
    console.log('Event submitted');
  };

  return (
    <DashboardLayout userType="admin">
      <PageTitle 
        title="Create Event" 
        description="Create a new college event or announcement"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="event-title">Event Title</Label>
                  <Input 
                    id="event-title" 
                    placeholder="Enter event title"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="event-description">Event Description</Label>
                  <Textarea 
                    id="event-description" 
                    placeholder="Describe the event details..."
                    rows={5}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-date">Date</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <Calendar className="h-4 w-4" />
                      </span>
                      <Input 
                        id="event-date" 
                        type="date"
                        required
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="event-time">Time</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <Clock className="h-4 w-4" />
                      </span>
                      <Input 
                        id="event-time" 
                        type="time"
                        required
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="event-location">Location</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <Input 
                      id="event-location" 
                      placeholder="Event venue or location"
                      required
                      className="rounded-l-none"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Event Type</Label>
                  <Select defaultValue="academic">
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="cultural">Cultural</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="webinar">Webinar</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Target Audience</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="students">Students Only</SelectItem>
                      <SelectItem value="faculty">Faculty Only</SelectItem>
                      <SelectItem value="cse">Computer Science Dept.</SelectItem>
                      <SelectItem value="ece">Electronics Dept.</SelectItem>
                      <SelectItem value="mech">Mechanical Dept.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="event-image">Upload Event Image</Label>
                  <div className="flex items-center gap-4">
                    <Button type="button" variant="outline">
                      <Image className="h-4 w-4 mr-2" /> Select Image
                    </Button>
                    <p className="text-sm text-gray-500">No file selected</p>
                  </div>
                  <p className="text-xs text-gray-500">Recommended size: 1200 x 630 pixels (PNG, JPG)</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="send-notification" className="h-4 w-4" defaultChecked />
                  <Label htmlFor="send-notification">
                    Send notification to target audience
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button">
                  Save as Draft
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Publish Event
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Event Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center mb-4">
                <p className="text-gray-500">Event image preview</p>
              </div>
              
              <h3 className="font-semibold text-lg">Event Title</h3>
              <p className="text-sm text-gray-600 mt-1">Event description will appear here...</p>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Date & Time will appear here</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>Location will appear here</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>Target audience will appear here</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tips for Creating Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>
                <strong>Be clear and concise</strong><br />
                Use a descriptive title and provide all necessary details.
              </p>
              
              <p>
                <strong>Add visual content</strong><br />
                Include an eye-catching image to increase engagement.
              </p>
              
              <p>
                <strong>Target the right audience</strong><br />
                Select the appropriate audience to ensure the event reaches the intended users.
              </p>
              
              <p>
                <strong>Provide complete information</strong><br />
                Include date, time, venue, and any prerequisites.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateEventPage;
