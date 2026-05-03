"use client";

import { useState } from "react";
import { ShieldAlert, TrendingUp, AlertTriangle, MessageSquare } from "lucide-react";

type Tab = "risks" | "market_assumptions" | "red_flags" | "vc_questions";

interface Analysis {
  risks: { category: string; description: string; severity: string }[];
  market_assumptions: { assumption: string; evidence: string; validity: string }[];
  red_flags: { flag: string; explanation: string }[];
  vc_questions: { question: string; context: string }[];
  summary: string;
}

interface AnalysisCardProps {
  analysis: Analysis;
  filename: string;
}

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "risks", label: "Risks", icon: <ShieldAlert className="w-4 h-4" /> },
  { id: "market_assumptions", label: "Market", icon: <TrendingUp className="w-4 h-4" /> },
  { id: "red_flags", label: "Red Flags", icon: <AlertTriangle className="w-4 h-4" /> },
  { id: "vc_questions", label: "VC Questions", icon: <MessageSquare className="w-4 h-4" /> },
];

const severityColors: Record<string, string> = {
  high: "text-red-600 dark:text-red-400",
  medium: "text-yellow-600 dark:text-yellow-400",
  low: "text-green-600 dark:text-green-400",
};

const validityColors: Record<string, string> = {
  strong: "text-green-600 dark:text-green-400",
  moderate: "text-yellow-600 dark:text-yellow-400",
  weak: "text-red-600 dark:text-red-400",
};

export function AnalysisCard({ analysis, filename }: AnalysisCardProps) {
  const [activeTab, setActiveTab] = useState<Tab>("risks");

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Summary */}
      <div className="p-4 sm:p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <p className="text-sm font-medium text-zinc-500 mb-2">Analysis Summary</p>
        <p className="text-sm sm:text-base text-black dark:text-white leading-relaxed">{analysis.summary}</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-1 p-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 w-fit overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-white dark:bg-zinc-700 text-black dark:text-white shadow-sm"
                  : "text-zinc-500 hover:text-black dark:hover:text-white"
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.slice(0, 3)}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
         <div className="flex flex-col gap-2 sm:gap-3">
           {activeTab === "risks" && analysis.risks.map((risk, i) => (
             <div key={i} className="flex flex-col gap-1 p-3 sm:p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
               <div className="flex items-center justify-between">
                 <span className="font-medium text-sm text-black dark:text-white truncate max-w-[200px] sm:max-w-none">{risk.category}</span>
                 <span className={`text-xs font-medium ${severityColors[risk.severity] ?? "text-zinc-400"}`}>
                   {risk.severity.toUpperCase()}
                 </span>
               </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{risk.description}</p>
            </div>
          ))}

           {activeTab === "market_assumptions" && analysis.market_assumptions.map((item, i) => (
             <div key={i} className="flex flex-col gap-1 p-3 sm:p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
               <div className="flex items-center justify-between">
                 <span className="font-medium text-sm text-black dark:text-white truncate max-w-[200px] sm:max-w-none">{item.assumption}</span>
                 <span className={`text-xs font-medium ${validityColors[item.validity] ?? "text-zinc-400"}`}>
                   {item.validity.toUpperCase()}
                 </span>
               </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.evidence}</p>
            </div>
          ))}

           {activeTab === "red_flags" && analysis.red_flags.map((flag, i) => (
             <div key={i} className="flex flex-col gap-1 p-3 sm:p-4 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30">
               <span className="font-medium text-sm text-red-700 dark:text-red-300 truncate">{flag.flag}</span>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{flag.explanation}</p>
            </div>
          ))}

           {activeTab === "vc_questions" && analysis.vc_questions.map((qa, i) => (
             <div key={i} className="flex flex-col gap-2 p-3 sm:p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
               <div className="flex items-start gap-2">
                 <span className="text-xs font-bold text-zinc-400 mt-0.5 flex-shrink-0">Q{i + 1}</span>
                 <span className="font-medium text-sm text-black dark:text-white truncate">{qa.question}</span>
               </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed pl-5">{qa.context}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}