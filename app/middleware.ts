import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/lib/jwt";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const session = req.cookies.get("session")?.value;

  // Protect Admin and Dashboard routes
  const isProtectedRoute = path.startsWith("/admin") || path.startsWith("/dashboard");

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (session) {
    try {
      const payload = await decrypt(session);
      const role = (payload.role as string).toUpperCase();

      // Ensure Admins stay in Admin area
      if (path.startsWith("/admin") && role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      
      // Redirect away from Auth pages if already logged in
      if (path === "/login" || path === "/register") {
        return NextResponse.redirect(new URL(role === "ADMIN" ? "/admin" : "/dashboard", req.url));
      }
    } catch (e) {
      // Clear cookie if token is invalid or expired
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("session");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/login", "/register"],
};