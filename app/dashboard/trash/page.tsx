"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { StatusBadge } from "@/components/status-badge";
import { ArrowLeft, FileText, RotateCcw, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

type Status = "pending" | "processing" | "done" | "error";

interface TrashDoc {
  id: string;
  filename: string;
  created_at: string;
  deleted_at: string;
  analysis_status: Status;
}

function formatDeletedAt(iso: string) {
  const d = new Date(iso);
  const date = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  return `${date} at ${time}`;
}

export default function TrashPage() {
  const [documents, setDocuments] = useState<TrashDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [restoring, setRestoring] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchTrash = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in.");
        return;
      }

      const { data } = await supabase
        .from("documents")
        .select("id, filename, created_at, deleted_at, analysis_status")
        .eq("user_id", user.id)
        .not("deleted_at", "is", null)
        .order("deleted_at", { ascending: false });

      setDocuments((data ?? []) as TrashDoc[]);
    } catch {
      toast.error("Failed to load recycled documents.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTrash();
  }, []);

  const handleRestore = async (docId: string) => {
    setRestoring(docId);
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/documents/${docId}/restore`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${session.access_token}` },
        },
      );

      if (!res.ok) throw new Error("Failed to restore document");

      toast.success("Document restored.");
      setDocuments((prev) => prev.filter((d) => d.id !== docId));
    } catch {
      toast.error("Failed to restore document.");
    } finally {
      setRestoring(null);
    }
  };

  const handleDeletePermanently = async (docId: string) => {
    if (!confirm("Permanently delete this document? This cannot be undone.")) return;

    setDeleting(docId);
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/documents/${docId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${session.access_token}` },
        },
      );

      if (!res.ok) throw new Error("Failed to delete document");

      toast.success("Document permanently deleted.");
      setDocuments((prev) => prev.filter((d) => d.id !== docId));
    } catch {
      toast.error("Failed to delete document.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Documents
        </Link>
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-white">Trash</h1>
        <p className="text-[var(--muted)]">Documents you have deleted. Restore or permanently remove them.</p>
      </div>

      <section className="rounded-2xl bg-[var(--panel)] border border-[var(--border)]">
        <div className="px-6 py-5">
          <h2 className="text-xl font-semibold text-white">Recycle Bin</h2>
        </div>

        <div className="grid grid-cols-[1fr_220px_140px_80px] px-6 py-3 text-xs uppercase tracking-wider text-[var(--muted)] border-t border-[var(--border)]">
          <span>Filename</span>
          <span>Date Deleted</span>
          <span>Status</span>
          <span className="text-right">Action</span>
        </div>

        {loading ? (
          <div className="px-6 py-16 text-center text-sm text-[var(--muted)] border-t border-[var(--border)]">
            Loading…
          </div>
        ) : documents.length === 0 ? (
          <div className="px-6 py-16 text-center text-sm text-[var(--muted)] border-t border-[var(--border)]">
            Trash is empty.
          </div>
        ) : (
          <ul className="divide-y divide-[var(--border)] border-t border-[var(--border)]">
            {documents.map((doc) => (
              <li key={doc.id}>
                <div className="grid grid-cols-[1fr_220px_140px_80px] items-center px-6 py-4 hover:bg-[var(--panel-2)] transition">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-[var(--panel-2)] border border-[var(--border)] grid place-items-center shrink-0">
                      <FileText className="w-4 h-4 text-zinc-500" />
                    </div>
                    <span className="text-sm text-zinc-500 truncate">{doc.filename}</span>
                  </div>
                  <span className="text-sm text-zinc-600 dark:text-zinc-500">{formatDeletedAt(doc.deleted_at)}</span>
                  <span>
                    <StatusBadge status={doc.analysis_status} />
                  </span>
                  <span className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => handleRestore(doc.id)}
                      disabled={restoring === doc.id || deleting === doc.id}
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-[var(--accent)] transition disabled:opacity-50"
                      title="Restore"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Restore
                    </button>
                    <button
                      onClick={() => handleDeletePermanently(doc.id)}
                      disabled={restoring === doc.id || deleting === doc.id}
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-red-400 transition disabled:opacity-50"
                      title="Delete permanently"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
