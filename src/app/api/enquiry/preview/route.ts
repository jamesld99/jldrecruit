import { NextResponse } from "next/server";

export const runtime = "nodejs";

function unavailable() {
  return new NextResponse(null, { status: 404 });
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return unavailable();
  }

  const wantsJson = (request.headers.get("accept") || "").includes("application/json");
  if (wantsJson) {
    return NextResponse.json({ preview: true });
  }

  const current = new URL(request.url);
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = forwardedHost || request.headers.get("host") || current.host;
  const proto =
    request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ||
    current.protocol.replace(":", "") ||
    "http";
  const url = new URL("/enquiry/submitted", `${proto}://${host}`);
  url.searchParams.set("preview", "1");

  return NextResponse.redirect(url, 303);
}
