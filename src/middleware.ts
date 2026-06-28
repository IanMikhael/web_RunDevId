import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // 1. Inisialisasi response awal
  let supabaseResponse = NextResponse.next({ request });

  // 2. Setup Supabase client dengan penanganan cookie yang benar
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Sinkronisasi cookie ke request
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          // Sinkronisasi cookie ke response
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 3. Cek user session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();

// 4. Proteksi rute-rute utama yang membutuhkan login
  // Kita tambahkan pengecekan untuk /projects atau folder lain yang butuh login
  const isProtectedPath = url.pathname === "/projects" || url.pathname.startsWith("/dashboard");

  if (isProtectedPath) {
    if (!user) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // 5. Proteksi rute Login
  // Jika sudah login, jangan biarkan user kembali ke /login
  if (url.pathname === "/login") {
    if (user) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

// 6. Konfigurasi Matcher
// Memastikan middleware berjalan untuk semua rute kecuali file statis dan aset
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};