import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secret = process.env.CRON_SECRET;

  if (secret) {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace(/^Bearer\s+/i, "");

    if (token !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  revalidateTag("jobs");
  revalidateTag("linkedin-jobs");
  revalidateTag("google-reviews");
  revalidatePath("/");
  revalidatePath("/jobs");
  revalidatePath("/sitemap.xml");

  return NextResponse.json({
    revalidated: true,
    timestamp: new Date().toISOString(),
  });
}
