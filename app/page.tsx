import { Eye, Zap, ShieldCheck, FileText, CheckCircle2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { UploadZone } from "@/components/upload-zone";

const steps = [
  {
    num: 1,
    title: "Upload PDF",
    desc: "Securely upload your deck or financial model. We process files with industry-standard encryption.",
  },
  {
    num: 2,
    title: "AI Analysis",
    desc: "Our LLM-powered engine simulates a partner-level review, identifying nuance and narrative gaps.",
  },
  {
    num: 3,
    title: "Executive Summary",
    desc: "Receive a structured report with a VC-style scorecard, suggested rebuttals, and specific actionable fixes.",
  },
];

const insights = [
  {
    title: "Comprehensive Scorecard",
    desc: "Quantifiable metrics across team, market, and product.",
  },
  {
    title: "Question Bank",
    desc: "The top 10 hardest questions you'll face in the meeting.",
  },
];

const plans = [
  {
    tier: "STARTER",
    price: "$0",
    period: "/month",
    features: [
      { label: "1 Analysis per month", included: true },
      { label: "Risk identification", included: true },
      { label: "Full scorecard", included: false },
    ],
    cta: "Start Free",
    href: "/signup",
    highlighted: false,
  },
  {
    tier: "PRO",
    price: "$49",
    period: "/month",
    badge: "Most Popular",
    features: [
      { label: "Unlimited analyses", included: true },
      { label: "Advanced red flag detection", included: true },
      { label: "Custom VC personas", included: true },
      { label: "PDF Exporting", included: true },
    ],
    cta: "Get Pro Access",
    href: "/signup",
    highlighted: true,
  },
  {
    tier: "ENTERPRISE",
    price: "Custom",
    period: "",
    features: [
      { label: "Team-wide licenses", included: true },
      { label: "Custom LLM fine-tuning", included: true },
      { label: "Dedicated success manager", included: true },
    ],
    cta: "Contact Sales",
    href: "mailto:sales@pitchlens.ai",
    highlighted: false,
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="PitchLens" width={32} height={32} />
          <span className="font-semibold text-lg">PitchLens</span>
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-white transition-colors">
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
      <main className="flex flex-1 flex-col items-center px-4 sm:px-6 py-12 sm:py-24 gap-0">
        <div className="flex flex-col items-center gap-6 text-center max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 text-xs font-medium text-zinc-400">
            <Zap className="w-3 h-3 text-accent" />
            Powered by Gemma 4 31B
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.1]">
            Know what a VC would ask before you step in the room.
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Upload your pitch deck or financial report. Get instant structured analysis — risks, market assumptions, red flags, and the questions investors actually care about.
          </p>
          <div className="mt-4">
            <UploadZone />
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-16 sm:mt-24 w-full max-w-3xl">
          {[
            {
              icon: ShieldCheck,
              title: "Risk Identification",
              desc: "Surface market, operational, and financial risks that investors will probe during due diligence.",
            },
            {
              icon: FileText,
              title: "Market Assumptions",
              desc: "Uncover the key assumptions your deck makes about TAM, growth, and pricing models.",
            },
            {
              icon: Eye,
              title: "Red Flag Detection",
              desc: "Identify common founder mistakes and misleading claims before investors spot them.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col gap-3 p-4 sm:p-6 rounded-2xl border border-zinc-800 text-left">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-sm text-white">{title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full max-w-3xl border-t border-zinc-800 mt-16 sm:mt-24" />

        {/* The Analysis Engine */}
        <section className="w-full max-w-4xl py-16 sm:py-24 flex flex-col items-center gap-12">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">The Analysis Engine</h2>
            <p className="mt-3 text-zinc-400">Simple process. High-fidelity results.</p>
          </div>
          <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-10 w-full">
            <div className="hidden sm:block absolute top-5 left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-px bg-zinc-800" />
            {steps.map(({ num, title, desc }) => (
              <div key={num} className="flex flex-col items-center text-center gap-4">
                <div
                  className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border ${
                    num === 1
                      ? "bg-accent text-black border-accent"
                      : "bg-[#111113] text-zinc-400 border-zinc-800"
                  }`}
                >
                  {num}
                </div>
                <h3 className="font-semibold text-white text-sm">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Expert-grade insights */}
        <section className="w-full max-w-4xl pb-16 sm:pb-24">
          <div className="rounded-2xl border border-zinc-800 bg-[#0a0a0a] p-8 sm:p-12 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Expert-grade insights, instantly.
              </h2>
              {insights.map(({ title, desc }) => (
                <div key={title} className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white text-sm">{title}</p>
                    <p className="text-sm text-zinc-400 leading-relaxed mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Mock analysis preview */}
            <div className="rounded-xl border border-zinc-800 bg-[#111113] p-5 flex flex-col gap-3">
              <div className="flex gap-2 items-center mb-1">
                <div className="h-2.5 w-1/2 rounded bg-zinc-800" />
                <div className="ml-auto h-6 w-24 rounded-md bg-accent/20 border border-accent/30" />
              </div>
              <div className="h-2 w-4/5 rounded bg-zinc-800" />
              <div className="h-2 w-3/5 rounded bg-zinc-800" />
              <div className="h-2 w-2/3 rounded bg-zinc-800" />
              <button className="mt-3 w-full rounded-lg border border-zinc-700 py-2.5 text-xs text-zinc-300 font-medium hover:border-zinc-600 transition-colors">
                Preview Full Analysis
              </button>
              <div className="flex gap-6 mt-2 pt-3 border-t border-zinc-800">
                <div className="flex flex-col gap-0.5">
                  <span className="text-accent text-2xl font-bold">6.4</span>
                  <span className="text-xs text-zinc-500">Score</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-red-400 text-2xl font-bold">2</span>
                  <span className="text-xs text-zinc-500">Risks</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="w-full max-w-4xl pb-16 sm:pb-24 flex flex-col items-center gap-10">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Investment Readiness Plans</h2>
            <p className="mt-3 text-zinc-400">Simple, transparent pricing for founders at every stage.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
            {plans.map(({ tier, price, period, badge, features, cta, href, highlighted }) => (
              <div
                key={tier}
                className={`relative flex flex-col gap-6 p-6 rounded-2xl border ${
                  highlighted
                    ? "border-accent bg-[#0a0a0a]"
                    : "border-zinc-800 bg-[#0a0a0a]"
                }`}
              >
                {badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-accent text-black text-xs font-semibold">
                      {badge}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-xs font-semibold text-zinc-500 tracking-widest mb-3">{tier}</p>
                  <div className="flex items-end gap-1">
                    <span className={`font-bold text-white ${price === "Custom" ? "text-3xl" : "text-4xl"}`}>
                      {price}
                    </span>
                    {period && <span className="text-zinc-400 text-sm mb-1">{period}</span>}
                  </div>
                </div>
                <ul className="flex flex-col gap-3 flex-1">
                  {features.map(({ label, included }) => (
                    <li key={label} className="flex items-center gap-2.5 text-sm">
                      {included ? (
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-zinc-600 shrink-0" />
                      )}
                      <span className={included ? "text-zinc-300" : "text-zinc-600"}>{label}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={href}
                  className={`mt-2 w-full h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-opacity hover:opacity-90 ${
                    highlighted
                      ? "bg-accent text-black"
                      : "border border-zinc-700 text-white hover:border-zinc-500"
                  }`}
                >
                  {cta}
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-4 gap-10">
          <div className="sm:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" alt="PitchLens" width={28} height={28} />
              <span className="font-semibold text-white">PitchLens</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Empowering founders to navigate the venture capital landscape with clarity and data-driven insights.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold text-zinc-500 tracking-widest">PRODUCT</p>
            {[
              { label: "Analysis Tool", href: "/dashboard" },
              { label: "Dashboard", href: "/dashboard" },
              { label: "API Docs", href: "#" },
            ].map(({ label, href }) => (
              <Link key={label} href={href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold text-zinc-500 tracking-widest">LEGAL</p>
            {[
              { label: "Privacy Policy", href: "#" },
              { label: "Terms of Service", href: "#" },
              { label: "Data Security", href: "#" },
            ].map(({ label, href }) => (
              <Link key={label} href={href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold text-zinc-500 tracking-widest">CONNECT</p>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-zinc-600">© 2024 PitchLens AI. All rights reserved.</p>
            <p className="text-xs text-zinc-600">Built for founders, by founders.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
