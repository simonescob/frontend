"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useContext, useState, ReactNode } from "react";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

const SupabaseContext = createContext<{
  supabaseUrl: string;
  supabaseAnonKey: string;
} | null>(null);

export function useSupabase() {
  const ctx = useContext(SupabaseContext);
  if (!ctx) throw new Error("useSupabase must be used within Providers");
  return ctx;
}

export function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();
  const [supabaseConfig] = useState(() => ({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseContext.Provider value={supabaseConfig}>
        {children}
      </SupabaseContext.Provider>
    </QueryClientProvider>
  );
}