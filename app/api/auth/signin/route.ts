import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const cookiesStore: Record<string, string> = {};

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return Object.entries(cookiesStore)
              .filter(([, v]) => v !== undefined)
              .map(([name, value]) => ({ name, value, options: undefined }));
          },
          setAll(cookiesToSet) {
            for (const { name, value } of cookiesToSet) {
              if (value !== undefined) cookiesStore[name] = value;
            }
          },
        },
      }
    );

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.code === "invalid_credentials") {
        return NextResponse.json(
          { error: "Invalid email or password" },
          { status: 401 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const response = NextResponse.json({ success: true, user: data.user });

    // Forward all session cookies to the browser
    for (const [name, value] of Object.entries(cookiesStore)) {
      response.cookies.set(name, value);
    }

    return response;
  } catch (error: unknown) {
    console.error("Signin error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
