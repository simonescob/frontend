import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: React.ReactNode;
  progress?: number;
}

export function StatCard({ icon: Icon, label, value, hint, progress }: StatCardProps) {
  return (
    <div className="rounded-2xl bg-[var(--panel)] border border-[var(--border)] p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-[var(--panel-2)] border border-[var(--border)] grid place-items-center">
          <Icon className="w-5 h-5 text-zinc-300" />
        </div>
        <span className="text-xs uppercase tracking-wider text-[var(--muted)] font-medium">
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-white">{value}</span>
        {hint && <span className="text-sm text-[var(--muted)]">{hint}</span>}
      </div>
      {typeof progress === "number" && (
        <div className="mt-4 h-1.5 w-full rounded-full bg-[var(--panel-2)] overflow-hidden">
          <div
            className="h-full bg-[var(--accent)] rounded-full"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
    </div>
  );
}
