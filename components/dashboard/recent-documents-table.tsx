import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";

type Status = "pending" | "processing" | "done" | "error";

interface DocRow {
  id: string;
  filename: string;
  created_at: string;
  analysis_status: Status;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const date = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  return `${date} at ${time}`;
}

export function RecentDocumentsTable({ documents }: { documents: DocRow[] }) {
  return (
    <section className="rounded-2xl bg-[var(--panel)] border border-[var(--border)]">
      <div className="flex items-center justify-between px-6 py-5">
        <h2 className="text-xl font-semibold text-white">Recent Documents</h2>
        <Link
          href="/dashboard/all"
          className="flex items-center gap-1 text-sm text-zinc-300 hover:text-white transition"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-[1fr_220px_140px_80px] px-6 py-3 text-xs uppercase tracking-wider text-[var(--muted)] border-t border-[var(--border)]">
        <span>Filename</span>
        <span>Date Uploaded</span>
        <span>Status</span>
        <span className="text-right">Action</span>
      </div>

      {documents.length === 0 ? (
        <div className="px-6 py-16 text-center text-sm text-[var(--muted)] border-t border-[var(--border)]">
          No documents yet. Click <span className="text-[var(--accent)]">New Document</span> to upload your first PDF.
        </div>
      ) : (
        <ul className="divide-y divide-[var(--border)] border-t border-[var(--border)]">
          {documents.map((doc) => (
            <li key={doc.id}>
              <Link
                href={`/document/${doc.id}`}
                className="grid grid-cols-[1fr_220px_140px_80px] items-center px-6 py-4 hover:bg-[var(--panel-2)] transition group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[var(--panel-2)] border border-[var(--border)] grid place-items-center shrink-0">
                    <FileText className="w-4 h-4 text-zinc-400" />
                  </div>
                  <span className="text-sm text-white truncate">{doc.filename}</span>
                </div>
                <span className="text-sm text-zinc-400">{formatDate(doc.created_at)}</span>
                <span>
                  <StatusBadge status={doc.analysis_status} />
                </span>
                <span className="text-right text-zinc-500 group-hover:text-zinc-200 transition">
                  <ArrowRight className="w-4 h-4 inline-block" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
