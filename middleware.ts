import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Collect cookies into a mutable Record so Supabase can both read
 * existing cookies (getAll) and we can inspect/forward rotated ones
 * (setAll → cookiesStore → supabaseResponse.cookies at the bottom).
 */
function cookieStore(request: NextRequest): Record<string, string> {
  const store: Record<string, string> = {};
  request.cookies.getAll().forEach((c) => {
    store[c.name] = c.value;
  });
  return store;
}

export async function middleware(request: NextRequest) {
  const supabaseResponse = NextResponse.next({
    request,
  });

  const cookies = cookieStore(request);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return Object.entries(cookies)
            .filter(([, v]) => v !== undefined)
            .map(([name, value]) => ({ name, value, options: undefined }));
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            if (value !== undefined) {
              cookies[name] = value;
            } else {
              delete cookies[name];
            }
          }
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect unauthenticated attempts to dashboard
  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Flush accumulated cookies (original + any set/rotated by Supabase)
  // to the response — this is how the session survives the middleware → browser hop.
  for (const [name, value] of Object.entries(cookies)) {
    supabaseResponse.cookies.set(name, value);
  }

  return supabaseResponse;
}
