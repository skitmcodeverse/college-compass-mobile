
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  userType: z.enum(["student", "faculty", "admin"], {
    required_error: "Please select a user type",
  }),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      userType: "student",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log("Login attempt:", values);
    
    // Authentication credentials as requested
    const mockCredentials = {
      student: { username: "student", password: "student@123" },
      faculty: { username: "faculty", password: "faculty@123" },
      admin: { username: "admin", password: "admin@123" },
    };
    
    // Get credentials for the selected user type
    const userCredentials = mockCredentials[values.userType];
    
    // Case-insensitive username comparison, but case-sensitive password
    const isUsernameMatch = values.username.toLowerCase() === userCredentials.username.toLowerCase();
    const isPasswordMatch = values.password === userCredentials.password;
    
    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false);
      
      if (isUsernameMatch && isPasswordMatch) {
        // Store user info in localStorage for persistence
        const userData = {
          id: `mock-${values.userType}-id`,
          username: values.username,
          role: values.userType
        };
        
        localStorage.setItem('educonnect_user', JSON.stringify(userData));
        
        toast.success("Login successful!");
        navigate(`/dashboard/${values.userType}`);
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    }, 1000);
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold text-center">Login to EduConnect</CardTitle>
        <CardDescription className="text-center">
          Access your college portal with your credentials
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="userType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Type</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select user type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="faculty">Faculty</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="Enter your password" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full bg-college-primary hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col space-y-2">
        <div className="text-sm text-center text-gray-500">
          <a href="#" className="text-college-primary hover:underline">
            Forgot your password?
          </a>
        </div>
        <div className="text-xs text-center text-gray-500">
          <p>
            Test credentials:<br/>
            Student: username: "student", password: "student@123"<br/>
            Faculty: username: "faculty", password: "faculty@123"<br/>
            Admin: username: "admin", password: "admin@123"
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
