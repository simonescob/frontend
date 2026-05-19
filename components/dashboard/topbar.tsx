import { Bell, Search, Settings } from "lucide-react";

export function Topbar({ email }: { email: string }) {
  const initial = (email[0] ?? "?").toUpperCase();

  return (
    <header className="flex items-center gap-4 px-8 h-16 border-b border-[var(--border)] bg-[var(--background)]">
      <div className="flex-1 max-w-2xl mx-auto relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
        <input
          type="search"
          placeholder="Search documents..."
          className="w-full pl-11 pr-4 h-10 rounded-lg bg-[var(--panel-2)] border border-[var(--border)] text-sm placeholder:text-[var(--muted)] focus:outline-none focus:border-zinc-600"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Notifications"
          className="w-10 h-10 grid place-items-center rounded-lg text-zinc-400 hover:bg-[var(--panel-2)] hover:text-zinc-200 transition"
        >
          <Bell className="w-5 h-5" />
        </button>
        <button
          type="button"
          aria-label="Settings"
          className="w-10 h-10 grid place-items-center rounded-lg text-zinc-400 hover:bg-[var(--panel-2)] hover:text-zinc-200 transition"
        >
          <Settings className="w-5 h-5" />
        </button>
        <div
          aria-label={`Signed in as ${email}`}
          title={email}
          className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 grid place-items-center text-sm font-semibold text-black"
        >
          {initial}
        </div>
      </div>
    </header>
  );
}
