
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bus, MapPin, Clock, AlertCircle } from 'lucide-react';

const BusTrackingPage: React.FC = () => {
  // Mock data - would be replaced with real-time data from Supabase
  const buses = [
    {
      id: 1,
      number: 'BUS-01',
      route: 'City Center - College',
      currentLocation: 'Shivaji Nagar',
      estimatedArrival: '5 minutes',
      status: 'on-time'
    },
    {
      id: 2,
      number: 'BUS-02',
      route: 'Railway Station - College',
      currentLocation: 'MG Road',
      estimatedArrival: '12 minutes',
      status: 'on-time'
    },
    {
      id: 3,
      number: 'BUS-03',
      route: 'Airport - College',
      currentLocation: 'Electronic City',
      estimatedArrival: '25 minutes',
      status: 'delayed'
    },
    {
      id: 4,
      number: 'BUS-04',
      route: 'Hostel - College',
      currentLocation: 'College Gate',
      estimatedArrival: '1 minute',
      status: 'on-time'
    }
  ];

  const yourBus = buses[0]; // Assuming the first bus is the user's bus

  return (
    <DashboardLayout userType="student">
      <PageTitle 
        title="Bus Tracking" 
        description="Track college buses in real-time and view schedule"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Live Bus Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 h-[400px] rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">
                Map visualization would appear here in production
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bus className="h-5 w-5 mr-2 text-college-primary" />
              Your Bus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500">Bus Number</div>
                <div className="font-semibold">{yourBus.number}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">Route</div>
                <div className="font-semibold">{yourBus.route}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">Current Location</div>
                <div className="font-semibold flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-college-primary" />
                  {yourBus.currentLocation}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">Estimated Arrival</div>
                <div className="font-semibold flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-college-primary" />
                  {yourBus.estimatedArrival}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">Status</div>
                <div className={`font-semibold flex items-center ${
                  yourBus.status === 'on-time' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {yourBus.status === 'on-time' ? 
                    <>On Time</> : 
                    <><AlertCircle className="h-4 w-4 mr-1" /> Delayed</>
                  }
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Buses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {buses.map((bus) => (
              <div key={bus.id} className="p-4 border rounded-lg flex gap-4">
                <div className="h-12 w-12 bg-college-primary rounded-full flex items-center justify-center text-white font-bold">
                  {bus.number.split('-')[1]}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{bus.number}</h3>
                  <p className="text-sm text-gray-500">{bus.route}</p>
                  <div className="flex items-center mt-2">
                    <MapPin className="h-3 w-3 text-gray-500 mr-1" />
                    <span className="text-xs text-gray-500 mr-3">{bus.currentLocation}</span>
                    <Clock className="h-3 w-3 text-gray-500 mr-1" />
                    <span className="text-xs text-gray-500">{bus.estimatedArrival}</span>
                  </div>
                </div>
                <div className={`self-center px-2 py-1 rounded-full text-xs ${
                  bus.status === 'on-time' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {bus.status === 'on-time' ? 'On Time' : 'Delayed'}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default BusTrackingPage;
