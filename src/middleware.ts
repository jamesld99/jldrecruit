import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const REDIRECT_301_MAP: Record<string, string> = {
  "/jobseekers": "/job-seekers",
  "/jobs/vehicle-technician-mot-plymouth": "/jobs",
  "/jobs/vehicle-technician-mot-exeter": "/jobs",
  "/jobs/vehicle-technician-mot-st-austell": "/jobs",
  "/jobs/vehicle-technician-mot-truro": "/jobs",
  "/services/temporary-recruitment": "/employers",
};

function normalizePath(pathname: string) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

export function middleware(request: NextRequest) {
  const pathname = normalizePath(request.nextUrl.pathname);
  const destination = REDIRECT_301_MAP[pathname];

  if (!destination) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = destination;
  url.search = "";

  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: [
    "/jobseekers",
    "/jobs/vehicle-technician-mot-plymouth",
    "/jobs/vehicle-technician-mot-exeter",
    "/jobs/vehicle-technician-mot-st-austell",
    "/jobs/vehicle-technician-mot-truro",
    "/services/temporary-recruitment",
  ],
};
