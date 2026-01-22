import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Define protected routes
const adminProtectedRoutes = ["/dashboard"];
const techProtectedRoutes = ["/user-dashboard"];

const publicRoutes = ["/", "/about", "/contact", "/register-complaint", "/complaint-tracking"];
const publicRoutePrefixes = ["/complaint-tracking"];
// const JWT_ACCESSTOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const secret = process.env.ACCESS_TOKEN_SECRET;
if (!secret) {
  throw new Error(
    "ACCESS_TOKEN_SECRET is not defined in environment variables."
  );
}
const JWT_ACCESSTOKEN_SECRET = new TextEncoder().encode(secret);

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value;

  if (publicRoutes.includes(path) || publicRoutePrefixes.some((prefix) => path.startsWith(prefix))) {
    return NextResponse.next();
  }
  if (path.startsWith("/auth") && !accessToken) {
    return NextResponse.next();
  }
  // Redirect URL setup
  const redirectToAuth = new URL("/auth", request.url);
  redirectToAuth.searchParams.set("redirect_url", path);
  try {
    // If no token at all — send to login
    if (!accessToken) {
      return NextResponse.redirect(redirectToAuth);
    }
    const { payload } = await jwtVerify(accessToken, JWT_ACCESSTOKEN_SECRET);
    // console.log("payload", payload);
    if (!payload || typeof payload.role !== "string") {
      throw new Error("Invalid token payload");
    }

    const userRole = payload.role;
    // console.log("userRole", userRole);

    // Admin route protection
    if (
      adminProtectedRoutes.some((route) => path.startsWith(route)) &&
      userRole !== "admin"
    ) {
      return NextResponse.redirect(new URL("/user-dashboard", request.url));
    }

    // Technician route protection
    if (
      techProtectedRoutes.some((route) => path.startsWith(route)) &&
      userRole !== "technician"
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    // Auto redirect from /auth if already logged in
    if (path === "/auth") {
      if (userRole === "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      if (userRole === "technician") {
        return NextResponse.redirect(new URL("/user-dashboard", request.url));
      }
    }
    return NextResponse.next();
  } catch (error) {
    console.error("Invalid or expired token:", error);
    if (path.startsWith("/auth")) {
      return NextResponse.next();
    }

    const redirectUrl = new URL("/auth", request.url);
    redirectUrl.searchParams.set("redirect_url", path);
    return NextResponse.redirect(redirectUrl);
  }
}
export const config = {
  matcher: ["/((?!_next|.*\\..*|api).*)"]
};
