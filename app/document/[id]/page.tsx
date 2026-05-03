import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/status-badge";
import { AnalysisCard } from "@/components/analysis-card";
import { ArrowLeft, FileText } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DocumentPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch document
  const { data: doc } = await supabase
    .from("documents")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!doc) {
    redirect("/dashboard");
  }

  // Fetch analysis if done
  let analysis = null;
  if (doc.analysis_status === "done") {
    const { data: analysisData } = await supabase
      .from("analyses")
      .select("*")
      .eq("document_id", id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    analysis = analysisData;
  }

  return (
    <div className="flex flex-1 flex-col min-h-screen">
       {/* Header */}
       <header className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-black dark:bg-white flex items-center justify-center">
            <FileText className="w-4 h-4 text-white dark:text-black" />
          </div>
          <span className="font-semibold text-lg">PitchLens</span>
        </div>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </header>

       {/* Main */}
       <main className="flex flex-1 flex-col px-4 sm:px-8 py-6 sm:py-10 gap-6 max-w-3xl mx-auto w-full">
        {/* Document info */}
        <div className="flex flex-col gap-2 sm:gap-3 p-4 sm:p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <h1 className="text-lg sm:text-xl font-semibold text-black dark:text-white truncate">{doc.filename}</h1>
            <StatusBadge status={doc.analysis_status as "pending" | "processing" | "done" | "error"} />
          </div>
           <p className="text-sm text-zinc-500">
             Uploaded{" "}
             {new Date(doc.created_at).toLocaleDateString("en-US", {
               month: "long",
               day: "numeric",
               year: "numeric",
             })}{" "}
             {new Date(doc.created_at).toLocaleTimeString("en-US", {
               hour: "numeric",
               minute: "2-digit",
               hour12: true,
             })}
           </p>
        </div>

        {/* Analysis or loading state */}
        {doc.analysis_status === "processing" && (
          <div className="flex flex-col items-center gap-4 py-8 sm:py-16">
            <div className="w-10 h-10 rounded-full border-4 border-zinc-200 border-t-black dark:border-t-white animate-spin" />
            <p className="text-sm text-zinc-500">Analyzing your document with Gemma 4 31B...</p>
          </div>
        )}

        {doc.analysis_status === "error" && (
          <div className="flex flex-col items-center gap-3 py-8 sm:py-16">
            <p className="text-sm text-red-600">Analysis failed. Please try again.</p>
          </div>
        )}

        {analysis && (
          <AnalysisCard analysis={analysis} filename={doc.filename} />
        )}
      </main>
    </div>
  );
}