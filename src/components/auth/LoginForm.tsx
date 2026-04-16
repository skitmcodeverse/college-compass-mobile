import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { DEFAULT_PASSWORD, parseLoginIdentifier } from "@/lib/authIdentity";

const formSchema = z.object({
    identifier: z
        .string()
        .min(1, { message: "Enrollment number or college email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
});

const LoginForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            identifier: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);

        try {
            const parsedIdentity = parseLoginIdentifier(values.identifier);
            if (!parsedIdentity) {
                toast.error(
                    "Use a valid enrollment number (0875CS241000) or @skitm.in email",
                );
                setIsLoading(false);
                return;
            }

            // Sign in with Supabase
            const { data, error } = await supabase.auth.signInWithPassword({
                email: parsedIdentity.loginEmail,
                password: values.password,
            });

            if (error) {
                console.error("Login error:", error);
                if (error.message.includes("Invalid login credentials")) {
                    toast.error("Invalid credentials");
                } else {
                    toast.error(error.message);
                }
                setIsLoading(false);
                return;
            }

            if (!data.user) {
                toast.error("Login failed. Please try again.");
                setIsLoading(false);
                return;
            }

            // Fetch user profile and role
            const { data: profile, error: profileError } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", data.user.id)
                .single();

            if (profileError) {
                console.error("Profile fetch error:", profileError);
                toast.error("Failed to load profile");
                setIsLoading(false);
                return;
            }

            const { data: roleData, error: roleError } = await supabase
                .from("user_roles")
                .select("role")
                .eq("user_id", data.user.id)
                .single();

            if (roleError) {
                console.error("Role fetch error:", roleError);
                toast.error("Failed to load user role");
                setIsLoading(false);
                return;
            }

            toast.success("Login successful!");

            // Navigate based on role
            const role = roleData.role;
            if (role === "super_admin") {
                navigate("/dashboard/admin");
            } else if (role === "hod") {
                navigate("/dashboard/hod");
            } else if (role === "teacher") {
                navigate("/dashboard/teacher");
            } else {
                navigate("/dashboard/student");
            }
        } catch (error) {
            console.error("Unexpected error during login:", error);
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="space-y-2">
                <CardTitle className="text-2xl font-bold text-center">
                    Login to EduConnect
                </CardTitle>
                <CardDescription className="text-center">
                    Access your college portal with your credentials
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="identifier"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Enrollment Number or College Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g., 0875CS241053 or faculty@skitm.in"
                                            {...field}
                                        />
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
                    <a
                        href="#"
                        className="text-college-primary hover:underline"
                    >
                        Forgot your password?
                    </a>
                </div>
                <div className="text-xs text-center text-gray-500">
                    <p>
                        No signup. Accounts are created by Admin/Super Admin
                        only.
                        <br />
                        Default password for all new accounts:{" "}
                        <strong>{DEFAULT_PASSWORD}</strong>
                    </p>
                </div>
            </CardFooter>
        </Card>
    );
};

export default LoginForm;
