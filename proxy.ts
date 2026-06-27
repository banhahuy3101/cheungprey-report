// Next.js 16 Proxy (replaces Middleware).
// Protects routes based on user role stored in a cookie.
// This is a lightweight guard; fine-grained permission checks
// happen in Firestore Security Rules and the UI via hooks.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/login"];

// Route → minimum role level required.
// Levels: finance_viewer=10, commune_staff=20, commune_chief=30,
//         district_admin=40, district_chief=50, super_admin=100.
const ROLE_LEVEL: Record<string, number> = {
  finance_viewer: 10,
  commune_staff: 20,
  commune_chief: 30,
  district_admin: 40,
  district_chief: 50,
  super_admin: 100,
};

const ROUTE_GUARDS: Array<{ pattern: RegExp; minLevel: number; message?: string }> = [
  { pattern: /^\/dashboard\/users/, minLevel: ROLE_LEVEL.district_admin },
  { pattern: /^\/dashboard\/audit/, minLevel: ROLE_LEVEL.district_admin },
  { pattern: /^\/dashboard\/reports/, minLevel: ROLE_LEVEL.commune_chief },
  { pattern: /^\/dashboard\/budgets/, minLevel: ROLE_LEVEL.commune_staff },
  { pattern: /^\/dashboard\/transactions/, minLevel: ROLE_LEVEL.commune_staff },
  { pattern: /^\/dashboard$/, minLevel: ROLE_LEVEL.commune_staff },
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // Read user role from a simple cookie ('role')
  const roleCookie = request.cookies.get("finance-role")?.value ?? "";
  const userLevel = ROLE_LEVEL[roleCookie] ?? 0;

  // Check route guards
  for (const guard of ROUTE_GUARDS) {
    if (guard.pattern.test(pathname)) {
      if (userLevel < guard.minLevel) {
        // Not authorized – redirect to login
        return NextResponse.redirect(new URL("/login", request.url));
      }
      break;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};