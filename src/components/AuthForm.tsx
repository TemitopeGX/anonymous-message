"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface AuthFormProps {
  mode: "login" | "register";
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      let result;

      if (mode === "register") {
        result = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
          },
        });
      } else {
        result = await supabase.auth.signInWithPassword({
          email,
          password,
        });
      }

      if (result.error) {
        throw result.error;
      }

      if (mode === "register") {
        // Show email verification message
        router.push("/verify-email");
      } else {
        // Redirect to dashboard on successful login
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="glass-morphism rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-2 gradient-text text-center">
          {mode === "login" ? "Welcome Back" : "Join Us"}
        </h2>
        <p className="text-gray-400 text-center mb-8">
          {mode === "login"
            ? "Sign in to access your dashboard"
            : "Create an account to get started"}
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-purple-400 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg glass-morphism bg-transparent border-0 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm text-purple-400 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg glass-morphism bg-transparent border-0 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
              placeholder={
                mode === "register"
                  ? "Create a secure password"
                  : "Enter your password"
              }
            />
          </div>
          {error && (
            <p className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
              {error}
            </p>
          )}
          <Button
            type="submit"
            className="w-full button-glow bg-purple-600 hover:bg-purple-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                {mode === "login" ? "Signing in..." : "Creating account..."}
              </div>
            ) : mode === "login" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Sign in
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
