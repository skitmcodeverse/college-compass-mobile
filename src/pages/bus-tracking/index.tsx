import React, { useEffect, useState } from 'react';
import PageTitle from '@/components/common/PageTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bus, MapPin, Clock, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface BusRoute {
  id: string;
  bus_number: string;
  route_name: string;
  current_location: string | null;
  estimated_arrival: string | null;
  status: string;
}

const BusTrackingPage: React.FC = () => {
  const [buses, setBuses] = useState<BusRoute[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBuses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('bus_routes')
      .select('*')
      .order('bus_number');
    if (!error && data) setBuses(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBuses();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('bus_routes_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bus_routes' }, () => {
        fetchBuses();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <>
      <PageTitle title="Bus Tracking" description="Track college buses in real-time" />

      <div className="flex justify-end mb-4">
        <Button variant="outline" size="sm" onClick={fetchBuses}>
          <RefreshCw className="h-4 w-4 mr-2" /> Refresh
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading bus information...</div>
      ) : buses.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Bus className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p className="text-muted-foreground">No bus routes configured yet.</p>
            <p className="text-sm text-muted-foreground mt-1">Admin will add bus route information soon.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {buses.map((bus) => (
            <Card key={bus.id}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-college-primary rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                      {bus.bus_number.replace(/[^0-9]/g, '') || bus.bus_number.slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-semibold">{bus.bus_number}</div>
                      <div className="text-sm text-muted-foreground font-normal">{bus.route_name}</div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    bus.status === 'on-time' ? 'bg-green-100 text-green-800' :
                    bus.status === 'delayed' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {bus.status === 'on-time' ? 'On Time' : bus.status === 'delayed' ? 'Delayed' : 'Out of Service'}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {bus.current_location && (
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-college-primary flex-shrink-0" />
                    <span className="text-muted-foreground">Current: </span>
                    <span className="ml-1 font-medium">{bus.current_location}</span>
                  </div>
                )}
                {bus.estimated_arrival && (
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-college-primary flex-shrink-0" />
                    <span className="text-muted-foreground">ETA: </span>
                    <span className="ml-1 font-medium">{bus.estimated_arrival}</span>
                  </div>
                )}
                {bus.status === 'delayed' && (
                  <div className="flex items-center text-sm text-yellow-600">
                    <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                    This bus is running behind schedule
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

export default BusTrackingPage;
