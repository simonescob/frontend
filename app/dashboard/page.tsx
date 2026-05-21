"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Folder, Zap, Database } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { RecentDocumentsTable } from "@/components/dashboard/recent-documents-table";
import { UploadModal } from "@/components/upload-modal";

const STORAGE_LIMIT_GB = 10;

interface DocumentRow {
  id: string;
  filename: string;
  created_at: string;
  analysis_status: string;
  file_size: number | null;
  user_id: string;
}

interface Stats {
  documents: DocumentRow[];
  total: number;
  processedToday: number;
  storageGB: number;
}

function formatGB(bytes: number) {
  return (bytes / 1024 ** 3).toFixed(1);
}

function displayName(email: string | null) {
  const local = (email ?? "").split("@")[0] ?? "there";
  return local.charAt(0).toUpperCase() + local.slice(1);
}

export default function Dashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const showUpload = searchParams.get("upload") === "1";
  const [stats, setStats] = useState<Stats | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [authErr, setAuthErr] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const supabase = createClient();

        // Try getUser first (from persisted session cookie)
        let user = (await supabase.auth.getUser()).data.user;

        // Fallback: if session-based auth didn't supply user, try getSession
        if (!user) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            user = session.user;
          }
        }

        if (!user) {
          setAuthErr("No authenticated user — check your session.");
          setLoading(false);
          return;
        }

        setUserEmail(user.email ?? null);

        const { data: documents = [], count, error } = await supabase
          .from("documents")
          .select("*", { count: "exact" })
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        console.log("[dashboard] user.id:", user.id, "user.email:", user.email, "documents:", (documents ?? []).length, "count:", count, "error:", error);

        if (error) {
          console.error("[dashboard] Supabase query error:", error);
        }

        const docs = documents as DocumentRow[] | null;
        const total = count ?? (docs ?? []).length;

        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const processedToday = (docs ?? []).filter(
          (d) => d.analysis_status === "done" && new Date(d.created_at) >= startOfToday
        ).length;

        const storageBytes = (docs ?? []).reduce((sum, d) => sum + (d.file_size ?? 0), 0);
        const storageGB = Number(formatGB(storageBytes));

        setStats({ documents: docs ?? [], total, processedToday, storageGB });
      } catch (err) {
        console.error("[dashboard] fetchDocuments error:", err);
        setAuthErr(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }

    fetchDocuments();
  }, []);

  const handleClose = () => {
    router.replace("/dashboard");
  };

  const storagePct = stats ? (stats.storageGB / STORAGE_LIMIT_GB) * 100 : 0;
  const recent = stats?.documents?.slice(0, 5) ?? [];

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-white">
          {userEmail ? `Welcome back, ${displayName(userEmail)}.` : authErr ? "Session Error" : "Welcome back."}
        </h1>
        {authErr && (
          <p className="text-sm text-amber-400">{authErr}</p>
        )}
        <p className="text-[var(--muted)]">
          Here is an overview of your recent document activity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          icon={Folder}
          label="Total Documents"
          value={loading ? "—" : stats?.total.toLocaleString() ?? "0"}
          hint={
            !loading && stats && stats.total > 0 ? (
              <span className="text-[var(--accent)]">all time</span>
            ) : null
          }
        />
        <StatCard
          icon={Zap}
          label="Processed Today"
          value={loading ? "—" : (stats?.processedToday.toString() ?? "0")}
          hint="documents"
        />
        <StatCard
          icon={Database}
          label="Storage Usage"
          value={loading ? "—" : `${stats?.storageGB?.toFixed(1) ?? "0"} GB`}
          hint={`of ${STORAGE_LIMIT_GB} GB`}
          progress={loading ? undefined : storagePct}
        />
      </div>

      <RecentDocumentsTable
        documents={recent.map((d) => ({
          id: d.id,
          filename: d.filename,
          created_at: d.created_at,
          analysis_status: d.analysis_status as "pending" | "processing" | "done" | "error",
        }))}
      />

      <UploadModal open={showUpload} onClose={handleClose} />
    </div>
  );
}
