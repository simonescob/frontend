import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { RecentDocumentsTable } from "@/components/dashboard/recent-documents-table";

export default async function RecentPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: documents = [] } = await supabase
    .from("documents")
    .select("id, filename, created_at, analysis_status")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-white">Recent Documents</h1>
        <p className="text-[var(--muted)]">All your documents, sorted by upload date.</p>
      </div>

      <RecentDocumentsTable
        documents={(documents ?? []).map((d) => ({
          id: d.id,
          filename: d.filename,
          created_at: d.created_at,
          analysis_status: d.analysis_status as "pending" | "processing" | "done" | "error",
        }))}
      />
    </div>
  );
}
