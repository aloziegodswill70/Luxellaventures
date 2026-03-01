import { NextResponse } from "next/server";

export function middleware(request) {
  const isAdminPage = request.nextUrl.pathname.startsWith("/admin");

  if (!isAdminPage) return NextResponse.next();

  const authCookie = request.cookies.get("admin_auth");

  if (!authCookie) {
    return NextResponse.redirect(new URL("/admin-login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};