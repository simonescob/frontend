import { Clock, Loader2, CheckCircle, AlertCircle } from "lucide-react";

type Status = "pending" | "processing" | "done" | "error";

interface StatusBadgeProps {
  status: Status;
}

const config: Record<Status, { label: string; className: string; icon: React.ReactNode }> = {
  pending: {
    label: "PENDING",
    icon: <Clock className="w-3 h-3" />,
    className: "border-zinc-700 text-zinc-300 bg-transparent",
  },
  processing: {
    label: "PROCESSING",
    icon: <Loader2 className="w-3 h-3 animate-spin" />,
    className: "border-zinc-700 text-zinc-300 bg-[var(--panel-2)]",
  },
  done: {
    label: "DONE",
    icon: <CheckCircle className="w-3 h-3" />,
    className: "border-emerald-600/60 text-emerald-400 bg-transparent",
  },
  error: {
    label: "ERROR",
    icon: <AlertCircle className="w-3 h-3" />,
    className: "border-red-600/60 text-red-400 bg-transparent",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, className, icon } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider border ${className}`}
    >
      {icon}
      {label}
    </span>
  );
}
