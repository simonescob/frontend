"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to sign in");
      }

      toast.success("Signed in successfully!");
      window.location.href = "/dashboard";
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-black dark:bg-white flex items-center justify-center">
            <Eye className="w-4 h-4 text-white dark:text-black" />
          </div>
          <span className="font-semibold text-lg">PitchLens</span>
        </div>
        <Link href="/" className="text-sm text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
          Back to home
        </Link>
      </header>

      {/* Login form */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex flex-col items-center gap-6 w-full max-w-sm">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold text-black dark:text-white">Sign in to PitchLens</h1>
            <p className="text-sm text-zinc-500">Enter your email and password to access your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-black dark:text-white">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="founder@startup.com"
                required
                className="h-11 px-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium text-black dark:text-white">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="h-11 px-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="h-11 flex items-center justify-center rounded-xl bg-black text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="text-sm text-zinc-500 text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-black dark:text-white font-medium hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
