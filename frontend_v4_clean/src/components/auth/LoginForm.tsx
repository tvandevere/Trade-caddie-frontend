"use client";

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { loginUser } from '@/lib/api'; // This import might be unused if only mock login is active
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth(); // This 'login' is from AuthContext
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      // Directly call the login function from AuthContext.
      // This function will handle the mock logic internally (e.g., if USE_MOCKED_USER is true in AuthContext).
      // We pass email and password as arguments, which will be ignored by the mock path in AuthContext,
      // but would be used if AuthContext was configured for real authentication and its login function expected them.
      await login({ email, password });

      // For mock login, AuthContext.login() handles redirection and sets its own isLoading state.
      // We can add a toast here for user feedback, as AuthContext's mock login doesn't show one.
      toast({
        title: "Login Initiated",
        description: "Processing your login... You should be redirected shortly if successful.",
      });
      // Note: Redirection to '/market' is handled by AuthContext.login() in the mock scenario.

    } catch (err: any) {
      // This catch block handles errors that might be thrown by AuthContext.login()
      // (e.g., if real authentication fails and AuthContext.login throws it).
      // For the current mock setup in AuthContext, it's unlikely to throw an error.
      console.error("Login form submission error:", err);
      const errorMessage = (err instanceof Error && err.message) ? err.message : 'An unexpected error occurred during login.';
      setError(errorMessage);
      toast({
        title: "Login Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false); // Ensure the LoginForm's own loading state is reset
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-sm">
        Don&apos;t have an account?{' '}
        <Button variant="link" onClick={() => router.push('/auth/register')} className="p-0 h-auto ml-1">
          Sign up
        </Button>
      </CardFooter>
    </Card>
  );
}

