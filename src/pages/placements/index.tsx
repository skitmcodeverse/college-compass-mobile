import React, { useEffect, useState } from 'react';
import PageTitle from '@/components/common/PageTitle';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Calendar, DollarSign, Building, ExternalLink, MapPin, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';

interface Placement {
  id: string;
  company: string;
  position: string;
  job_type: string;
  location: string | null;
  salary_range: string | null;
  deadline: string | null;
  description: string | null;
  apply_link: string | null;
}

const PlacementsPage: React.FC = () => {
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPlacements = async () => {
      const { data, error } = await supabase
        .from('placements')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      if (!error && data) setPlacements(data);
      setLoading(false);
    };
    fetchPlacements();
  }, []);

  const filtered = placements.filter(p =>
    p.company.toLowerCase().includes(search.toLowerCase()) ||
    p.position.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <PageTitle title="Placements" description="Explore internship and job opportunities" />

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            className="pl-9"
            placeholder="Search by company or position..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading opportunities...</div>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Briefcase className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p className="text-muted-foreground">
              {placements.length === 0
                ? 'No placement opportunities posted yet. Check back soon!'
                : 'No results match your search.'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((opp) => (
            <Card key={opp.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{opp.position}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Building className="h-4 w-4 mr-1" /> {opp.company}
                    </CardDescription>
                  </div>
                  <span className="bg-college-primary/10 text-college-primary text-xs font-medium px-2.5 py-0.5 rounded">
                    {opp.job_type}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                {opp.description && (
                  <p className="text-sm text-muted-foreground mb-4">{opp.description}</p>
                )}
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  {opp.location && (
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span>{opp.location}</span>
                    </div>
                  )}
                  {opp.salary_range && (
                    <div className="flex items-center text-muted-foreground">
                      <DollarSign className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span>{opp.salary_range}</span>
                    </div>
                  )}
                  {opp.deadline && (
                    <div className="flex items-center text-muted-foreground col-span-2">
                      <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span>Apply by: {new Date(opp.deadline).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                {opp.apply_link && (
                  <div className="flex justify-end">
                    <Button asChild>
                      <a href={opp.apply_link} target="_blank" rel="noopener noreferrer">
                        Apply Now <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default PlacementsPage;
