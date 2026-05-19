import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <Topbar email={user.email ?? ""} />
        <main className="flex-1 px-8 py-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
