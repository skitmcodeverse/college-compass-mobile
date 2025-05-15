
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Calendar, DollarSign, Building, ExternalLink, Search } from 'lucide-react';

const PlacementsPage: React.FC = () => {
  // Mock data for now - would be connected to Supabase
  const placementOpportunities = [
    {
      id: 1,
      company: 'TechCorp Solutions',
      position: 'Software Developer Intern',
      type: 'Internship',
      location: 'Bangalore',
      salary: '₹25,000/month',
      deadline: '2025-05-30',
      description: 'Looking for passionate software developers with knowledge of modern web technologies.'
    },
    {
      id: 2,
      company: 'Global Systems Inc.',
      position: 'Full Stack Developer',
      type: 'Full-time',
      location: 'Hyderabad',
      salary: '₹8-12 LPA',
      deadline: '2025-06-15',
      description: 'Join our team to work on exciting full-stack projects using React and Node.js.'
    },
    {
      id: 3,
      company: 'CloudNet Technologies',
      position: 'DevOps Engineer',
      type: 'Full-time',
      location: 'Remote',
      salary: '₹10-15 LPA',
      deadline: '2025-06-10',
      description: 'Seeking DevOps engineers familiar with AWS, Docker, and CI/CD pipelines.'
    },
    {
      id: 4,
      company: 'DataViz Analytics',
      position: 'Data Analyst',
      type: 'Full-time',
      location: 'Chennai',
      salary: '₹7-10 LPA',
      deadline: '2025-06-05',
      description: 'Join our data team to extract meaningful insights from large datasets.'
    },
  ];

  const stats = {
    totalCompanies: 45,
    averagePackage: '8.5 LPA',
    highestPackage: '24 LPA',
    placedStudents: '87%'
  };

  return (
    <DashboardLayout userType="student">
      <PageTitle 
        title="Placements" 
        description="Explore internship and job opportunities"
      />
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search opportunities..."
              className="w-full pl-9 py-2 px-4 border rounded-md"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Sort</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCompanies}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Package</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.averagePackage}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Highest Package</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.highestPackage}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Students Placed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.placedStudents}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Latest Opportunities</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {placementOpportunities.map((opportunity) => (
            <Card key={opportunity.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{opportunity.position}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Building className="h-4 w-4 mr-1" />
                      {opportunity.company}
                    </CardDescription>
                  </div>
                  <span className="bg-college-primary/10 text-college-primary text-xs font-medium px-2.5 py-0.5 rounded">
                    {opportunity.type}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-sm text-gray-600 mb-4">{opportunity.description}</p>
                
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span>{opportunity.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span>{opportunity.salary}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span>Apply by: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>
                    Apply Now <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

// Add this to avoid MapPin missing error
const MapPin = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
};

export default PlacementsPage;
