import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/constants";

const MAX_CV_BYTES = 5 * 1024 * 1024;
const ALLOWED_CV_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export async function GET() {
  return NextResponse.json({
    available: Boolean(process.env.RESEND_API_KEY),
  });
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "CV upload is not configured on the server." },
      { status: 503 }
    );
  }

  try {
    const formData = await request.formData();
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const currentRole = String(formData.get("currentRole") ?? "").trim();
    const sector = String(formData.get("sector") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const cv = formData.get("cv");

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    if (!(cv instanceof File) || cv.size === 0) {
      return NextResponse.json({ error: "A CV file is required." }, { status: 400 });
    }

    if (cv.size > MAX_CV_BYTES) {
      return NextResponse.json(
        { error: "CV file must be 5 MB or smaller." },
        { status: 400 }
      );
    }

    if (cv.type && !ALLOWED_CV_TYPES.has(cv.type)) {
      return NextResponse.json(
        { error: "CV must be a PDF or Word document." },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);
    const cvBuffer = Buffer.from(await cv.arrayBuffer());
    const fromEmail =
      process.env.ENQUIRY_FROM_EMAIL ?? "JLD Recruit Website <onboarding@resend.dev>";

    const textBody = [
      "CANDIDATE REGISTRATION",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Current role: ${currentRole || "Not provided"}`,
      `Sector: ${sector || "Not provided"}`,
      "",
      "Message:",
      message || "Please find my CV attached.",
    ].join("\n");

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: siteConfig.email,
      replyTo: email,
      subject: `Candidate Registration — ${name}`,
      text: textBody,
      attachments: [
        {
          filename: cv.name,
          content: cvBuffer,
        },
      ],
    });

    if (error) {
      console.error("Candidate enquiry email failed:", error);
      return NextResponse.json(
        { error: "We could not send your CV. Please try again or email James directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Candidate enquiry submission failed:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or email James directly." },
      { status: 500 }
    );
  }
}
