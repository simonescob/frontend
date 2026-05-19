import { createClient } from "@/lib/supabase/server";
import { Folder, Zap, Database } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { RecentDocumentsTable } from "@/components/dashboard/recent-documents-table";

const STORAGE_LIMIT_GB = 10;

function formatGB(bytes: number) {
  return (bytes / 1024 ** 3).toFixed(1);
}

function displayName(email: string) {
  const local = email.split("@")[0] ?? "there";
  return local.charAt(0).toUpperCase() + local.slice(1);
}

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: documents = [], count } = await supabase
    .from("documents")
    .select("*", { count: "exact" })
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  const docs = documents ?? [];
  const total = count ?? docs.length;

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const processedToday = docs.filter(
    (d) => d.analysis_status === "done" && new Date(d.created_at) >= startOfToday
  ).length;

  const storageBytes = docs.reduce((sum, d) => sum + (d.file_size ?? 0), 0);
  const storageGB = Number(formatGB(storageBytes));
  const storagePct = (storageGB / STORAGE_LIMIT_GB) * 100;

  const recent = docs.slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-white">
          Welcome back, {displayName(user!.email ?? "")}.
        </h1>
        <p className="text-[var(--muted)]">
          Here is an overview of your recent document activity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          icon={Folder}
          label="Total Documents"
          value={total.toLocaleString()}
          hint={total > 0 ? <span className="text-[var(--accent)]">all time</span> : null}
        />
        <StatCard
          icon={Zap}
          label="Processed Today"
          value={processedToday.toString()}
          hint="documents"
        />
        <StatCard
          icon={Database}
          label="Storage Usage"
          value={`${storageGB} GB`}
          hint={`of ${STORAGE_LIMIT_GB} GB`}
          progress={storagePct}
        />
      </div>

      <RecentDocumentsTable
        documents={recent.map((d) => ({
          id: d.id,
          filename: d.filename,
          created_at: d.created_at,
          analysis_status: d.analysis_status,
        }))}
      />
    </div>
  );
}
