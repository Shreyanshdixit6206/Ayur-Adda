"use client";

import { useTransition, useState } from "react";
import { register, loginWithGoogle } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Leaf } from "lucide-react";

export default function RegisterPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setError("");
    setSuccess("");

    startTransition(() => {
      register({ name, email, password }).then((data) => {
        if (data?.error) setError(data.error);
        if (data?.success) setSuccess(data.success);
      });
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0C30 0 15 15 15 30H45C45 15 30 0 30 0z\' fill=\'%235C3D1E\' opacity=\'1\'/%3E%3C/svg%3E")', backgroundSize: '120px' }} />
      
      <Link href="/" className="flex items-center gap-2 mb-8 z-10">
        <Leaf className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-heading text-primary font-bold">AyurAdda</h1>
      </Link>

      <Card className="w-full max-w-md bg-card shadow-xl z-10 border-border">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-heading text-foreground">Create an Account</CardTitle>
          <p className="text-muted-foreground text-sm mt-2">Start your BAMS journey today</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                name="name" 
                placeholder="Sushruta" 
                disabled={isPending} 
                required 
                className="bg-input/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="student@bams.edu" 
                disabled={isPending} 
                required 
                className="bg-input/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                placeholder="******" 
                disabled={isPending} 
                required 
                className="bg-input/50"
              />
            </div>

            {error && (
              <div className="p-3 bg-destructive/15 text-destructive border border-destructive/30 rounded-md text-sm text-center">
                {error}
              </div>
            )}
            
            {success && (
              <div className="p-3 bg-emerald-500/15 text-emerald-600 border border-emerald-500/30 rounded-md text-sm text-center">
                {success}
              </div>
            )}

            <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={isPending}>
              {isPending ? "Creating account..." : "Register"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <form action={loginWithGoogle}>
            <Button
              variant="outline"
              type="submit"
              className="w-full border-border bg-background"
            >
              <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg>
              Google
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
