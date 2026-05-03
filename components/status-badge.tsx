import { Clock, Loader2, CheckCircle, AlertCircle } from "lucide-react";

type Status = "pending" | "processing" | "done" | "error";

interface StatusBadgeProps {
  status: Status;
}

const config: Record<Status, { label: string; className: string; icon: React.ReactNode }> = {
  pending: {
    label: "Pending",
    icon: <Clock className="w-3 h-3" />,
    className: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
  },
  processing: {
    label: "Analyzing...",
    icon: <Loader2 className="w-3 h-3 animate-spin" />,
    className: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  },
  done: {
    label: "Done",
    icon: <CheckCircle className="w-3 h-3" />,
    className: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  },
  error: {
    label: "Error",
    icon: <AlertCircle className="w-3 h-3" />,
    className: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, className, icon } = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${className}`}>
      {icon}
      {label}
    </span>
  );
}