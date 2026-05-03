 import { redirect } from "next/navigation";
 import { createClient } from "@/lib/supabase/server";
 import { UploadZone } from "@/components/upload-zone";
 import { DocumentItem } from "@/components/document-item";
 import { FileText, LogOut } from "lucide-react";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch documents for this user
  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

   return (
     <div className="flex flex-1 flex-col min-h-screen">
       {/* Header */}
       <header className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-zinc-200 dark:border-zinc-800">
         <div className="flex items-center gap-2 shrink-0">
           <div className="w-8 h-8 rounded-lg bg-black dark:bg-white flex items-center justify-center">
             <FileText className="w-4 h-4 text-white dark:text-black" />
           </div>
           <span className="font-semibold text-lg">PitchLens</span>
         </div>
         <div className="flex items-center gap-2 sm:gap-4">
           <span className="text-sm text-zinc-500 truncate hidden sm:block max-w-[120px]">{user.email}</span>
           <form action="/auth/signout" method="post">
             <button
               type="submit"
               className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
             >
               <LogOut className="w-4 h-4" />
               <span className="hidden sm:inline">Sign Out</span>
             </button>
           </form>
         </div>
       </header>

       {/* Main */}
       <main className="flex flex-1 flex-col px-4 sm:px-8 py-6 sm:py-10 gap-6 sm:gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-black dark:text-white">Your Documents</h1>
          <p className="text-zinc-500">Upload a pitch deck or financial report to get started.</p>
        </div>

        {/* Upload zone */}
        <UploadZone compact />

         {/* Document list */}
         {documents && documents.length > 0 ? (
           <div className="flex flex-col gap-3">
             {documents.map((doc) => (
               <DocumentItem
                 key={doc.id}
                 id={doc.id}
                 filename={doc.filename}
                 created_at={doc.created_at}
                 analysis_status={doc.analysis_status as "pending" | "processing" | "done" | "error"}
               />
             ))}
           </div>
         ) : (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
              <FileText className="w-6 h-6 text-zinc-400" />
            </div>
            <p className="text-sm text-zinc-500">No documents yet. Upload your first PDF above.</p>
          </div>
        )}
      </main>
    </div>
  );
}