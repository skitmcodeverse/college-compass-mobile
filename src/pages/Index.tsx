
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Index: React.FC = () => {
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    }
    
    checkAuth();
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Header */}
      <header className="p-4 bg-white shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-college-primary">EduConnect</h1>
          <Button variant="ghost" asChild>
            <Link to="/login">Log in</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your College Companion</h2>
          <p className="mb-8 text-gray-600">
            Access your classes, assignments, grades and more - all in one mobile app.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button size="lg" className="w-full md:w-auto" asChild>
              <Link to="/login">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* App Screenshot Mockup */}
        <div className="mt-16 relative max-w-xs mx-auto">
          <div className="bg-gray-900 rounded-[40px] p-4 shadow-xl border-4 border-gray-800">
            <div className="rounded-[28px] overflow-hidden border-[1px] border-gray-700">
              <div className="bg-college-primary h-14 flex items-center justify-between px-5">
                <div className="text-white font-semibold">EduConnect</div>
                <div className="flex space-x-2">
                  <div className="w-5 h-5 rounded-full bg-white/20"></div>
                  <div className="w-5 h-5 rounded-full bg-white/20"></div>
                </div>
              </div>
              <div className="h-[450px] bg-white flex flex-col p-4 gap-4">
                <div className="h-28 bg-gray-100 rounded-lg animate-pulse"></div>
                <div className="flex gap-4">
                  <div className="h-20 w-1/2 bg-gray-100 rounded-lg animate-pulse"></div>
                  <div className="h-20 w-1/2 bg-gray-100 rounded-lg animate-pulse"></div>
                </div>
                <div className="h-16 bg-gray-100 rounded-lg animate-pulse"></div>
                <div className="h-16 bg-gray-100 rounded-lg animate-pulse"></div>
                <div className="h-16 bg-gray-100 rounded-lg animate-pulse"></div>
                <div className="mt-auto h-14 bg-white border-t flex justify-around items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <div className="w-5 h-5 bg-gray-300 rounded"></div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <div className="w-5 h-5 bg-gray-300 rounded"></div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-college-primary/20 flex items-center justify-center">
                    <div className="w-5 h-5 bg-college-primary rounded"></div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <div className="w-5 h-5 bg-gray-300 rounded"></div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <div className="w-5 h-5 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white p-4 border-t">
        <div className="container mx-auto text-center text-sm text-gray-500">
          <p>© 2025 EduConnect. All rights reserved.</p>
          <p className="mt-1">A mobile-first college management app</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
