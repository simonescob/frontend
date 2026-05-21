import { Eye, Zap, ShieldCheck, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { UploadZone } from "@/components/upload-zone";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="PitchLens" width={32} height={32} />
          <span className="font-semibold text-lg">PitchLens</span>
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/dashboard" className="text-sm text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link
            href="/login"
            className="h-9 px-4 flex items-center rounded-full bg-accent text-black text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Sign In
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-24 gap-8 sm:gap-12">
        <div className="flex flex-col items-center gap-6 text-center max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            <Zap className="w-3 h-3" />
            Powered by Gemma 4 31B
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-black dark:text-white leading-[1.1]">
            Know what a VC would ask before you step in the room.
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Upload your pitch deck or financial report. Get instant structured analysis — risks, market assumptions, red flags, and the questions investors actually care about.
          </p>
          <div className="mt-4">
            <UploadZone />
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-8 w-full max-w-2xl sm:max-w-3xl">
          {[
            {
              icon: ShieldCheck,
              title: "Risk Identification",
              desc: "Surface market, operational, and financial risks that investors will probe.",
            },
            {
              icon: FileText,
              title: "Market Assumptions",
              desc: "Uncover the key assumptions your deck makes about TAM, growth, and pricing.",
            },
            {
              icon: Eye,
              title: "Red Flag Detection",
              desc: "Identify common founder mistakes and misleading claims before investors do.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col gap-3 p-4 sm:p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-left">
               <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                 <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-sm text-black dark:text-white">{title}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}