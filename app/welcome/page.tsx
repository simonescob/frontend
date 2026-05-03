import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Eye, FileText, BarChart3, Sparkles } from "lucide-react";

export default async function WelcomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Redirect to signup if somehow accessed without signing up
  if (!user) {
    redirect("/signup");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-black dark:bg-white flex items-center justify-center">
            <Eye className="w-4 h-4 text-white dark:text-black" />
          </div>
          <span className="font-semibold text-lg">PitchLens</span>
        </div>
      </header>

      {/* Welcome content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-black dark:bg-white mb-6">
            <Sparkles className="w-8 h-8 text-white dark:text-black" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-black dark:text-white mb-4">
            Welcome to PitchLens, {user.email?.split('@')[0]}!
          </h1>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
            Your account is all set up. Here&apos;s what you can do next to start analyzing pitch decks and financial reports.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="flex flex-col gap-4 p-4 sm:p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-black dark:text-white">Upload a Pitch Deck</h3>
            <p className="text-sm text-zinc-500">
              Upload any PDF pitch deck or financial report and let our AI analyze it for risks, market assumptions, and red flags.
            </p>
          </div>

          <div className="flex flex-col gap-4 p-4 sm:p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-black dark:text-white">Get VC-Style Analysis</h3>
            <p className="text-sm text-zinc-500">
              Receive structured analysis including risk assessment, market size validation, and VC-style due diligence questions.
            </p>
          </div>

          <div className="flex flex-col gap-4 p-4 sm:p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-black dark:text-white">Track Deal Flow</h3>
            <p className="text-sm text-zinc-500">
              Manage your pipeline of investment opportunities with organized document storage and comparative analysis.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="h-10 sm:h-12 px-4 sm:px-8 flex items-center justify-center rounded-xl bg-black text-white text-sm font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/"
            className="h-10 sm:h-12 px-4 sm:px-8 flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-700 text-black dark:text-white text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors w-full sm:w-auto"
          >
            Learn More
          </Link>
        </div>
      </main>
    </div>
  );
}
