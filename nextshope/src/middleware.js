import { NextResponse } from "next/server"; // For redirects.
import middlewareAuth from "utils/middlewareAut"; // Custom auth helper.

// Main middleware function.
export async function middleware(req) {
  const url = req.url;
  const pathname = req.nextUrl.pathname;

  // Protect /profile routes: redirect unauthenticated users.
  if (pathname.startsWith("/profile")) {
    const user = await middlewareAuth(req);
    if (!user) return NextResponse.redirect(new URL("/signup", url));
  }

  // Protect /admin routes: redirect unauthenticated or non-admin users.
  if (pathname.startsWith("/admin")) {
    const user = await middlewareAuth(req);
    if (!user) return NextResponse.redirect(new URL("/signup", url));
    if (user && user.role !== "ADMIN")
      return NextResponse.redirect(new URL("/", req.url));
  }
}

// Specify paths where this middleware should run.
export const config = {
  matcher: ["/dashbord/:path*", "/profile/:path*", "/admin/:path*"],
};