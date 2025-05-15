
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MoveRight, BookOpen, Users, Bell, Bus, Shield, Laptop } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-white border-b border-gray-200 w-full">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-bold text-2xl text-college-primary">
            EduConnect
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="nav-link">Features</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
            <Button asChild className="bg-college-primary hover:bg-blue-700">
              <Link to="/login">Log in</Link>
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-college-primary to-blue-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                College Management Made Simple
              </h1>
              <p className="text-xl opacity-90 max-w-md">
                Access attendance, marks, fees and more from any device. Stay connected with your college community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="bg-white text-college-primary hover:bg-gray-100">
                  <Link to="/login">
                    Get Started <MoveRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <a href="#features">Learn More</a>
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Students using college app" 
                className="rounded-lg shadow-2xl max-w-md border-4 border-white/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need in One Place</h2>
            <p className="text-college-text-light max-w-2xl mx-auto">
              EduConnect provides a seamless experience for students, parents, faculty, and administrators to stay connected and informed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-college-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="text-college-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Attendance & Marks</h3>
              <p className="text-college-text-light">
                Track attendance and academic performance in real-time with detailed insights and analytics.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-college-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Bus className="text-college-secondary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bus Tracking</h3>
              <p className="text-college-text-light">
                Live bus tracking with real-time location updates and arrival notifications.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-college-warning/10 rounded-lg flex items-center justify-center mb-4">
                <Bell className="text-college-warning h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Notifications</h3>
              <p className="text-college-text-light">
                Receive instant updates for class changes, events, and important announcements.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-college-danger/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-college-danger h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Report System</h3>
              <p className="text-college-text-light">
                Report issues like ragging or app errors securely and anonymously.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-college-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-college-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
              <p className="text-college-text-light">
                Specific features and permissions based on user roles - student, faculty, or admin.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-college-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Laptop className="text-college-accent h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cross-Platform</h3>
              <p className="text-college-text-light">
                Access from any device - web, Android, iOS, or desktop with consistent experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-college-secondary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Join thousands of students and faculty members already using EduConnect to simplify college life.
          </p>
          <Button asChild size="lg" className="bg-white text-college-secondary hover:bg-gray-100">
            <Link to="/login">
              Log in to your account
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">EduConnect</h3>
              <p className="text-gray-400">
                Transforming college management with innovative technology solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Help & Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">User Manual</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <address className="text-gray-400 not-italic">
                <p>123 Campus Drive</p>
                <p>College City, State 12345</p>
                <p className="mt-2">Email: info@educonnect.edu</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© 2025 EduConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
