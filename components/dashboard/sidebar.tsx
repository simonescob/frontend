"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Clock, Trash2, Plus, HelpCircle, LogOut, Circle } from "lucide-react";

const nav = [
  { href: "/dashboard", label: "All Documents", icon: FileText },
  { href: "/dashboard/recent", label: "Recent", icon: Clock },
  { href: "/dashboard/trash", label: "Trash", icon: Trash2 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-[var(--border)] bg-[var(--panel)] px-4 py-6">
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-9 h-9 rounded-xl border border-[var(--border)] bg-[var(--panel-2)] flex items-center justify-center">
          <Circle className="w-4 h-4 text-[var(--accent)]" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-semibold text-[var(--accent)] text-lg tracking-tight">PitchLens</span>
          <span className="text-xs text-[var(--muted)]">Pro Tier</span>
        </div>
      </div>

      <Link
        href="/dashboard?upload=1"
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[var(--accent)] text-black font-medium text-sm hover:opacity-90 transition mb-6"
      >
        <Plus className="w-4 h-4" strokeWidth={2.5} />
        New Document
      </Link>

      <nav className="flex flex-col gap-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                active
                  ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "text-zinc-400 hover:bg-[var(--panel-2)] hover:text-zinc-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-1 pt-6 border-t border-[var(--border)]">
        <Link
          href="/help"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:bg-[var(--panel-2)] hover:text-zinc-200 transition"
        >
          <HelpCircle className="w-4 h-4" />
          Help Center
        </Link>
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:bg-[var(--panel-2)] hover:text-zinc-200 transition"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </form>
      </div>
    </aside>
  );
}
