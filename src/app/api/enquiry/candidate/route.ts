import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/constants";

const MAX_CV_BYTES = 5 * 1024 * 1024;
const ALLOWED_CV_EXTENSIONS = [".pdf", ".doc", ".docx"] as const;
const ALLOWED_CV_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

type AllowedCvExtension = (typeof ALLOWED_CV_EXTENSIONS)[number];

function getEnquiryFromEmail() {
  const configured = process.env.ENQUIRY_FROM_EMAIL?.trim().replace(/^["']|["']$/g, "");

  if (!configured) {
    return `JLD Recruit Website <${siteConfig.email}>`;
  }

  // Valid Resend format: Name <email@domain.com>
  if (/<[^<>@\s]+@[^<>@\s]+>/.test(configured)) {
    return configured;
  }

  // Plain email only: email@domain.com
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(configured)) {
    return `JLD Recruit Website <${configured}>`;
  }

  // Vercel can strip angle brackets, leaving: "James james@domain.com"
  const nameAndEmail = configured.match(/^(.+?)\s+([^\s@]+@[^\s@]+\.[^\s@]+)$/);
  if (nameAndEmail) {
    return `${nameAndEmail[1].trim()} <${nameAndEmail[2]}>`;
  }

  return `JLD Recruit Website <${siteConfig.email}>`;
}

function getEnquiryToEmail() {
  const configured = process.env.ENQUIRY_TO_EMAIL?.trim().replace(/^["']|["']$/g, "");

  if (configured && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(configured)) {
    return configured;
  }

  return siteConfig.email;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildCandidateEmailBody(fields: {
  name: string;
  email: string;
  phone: string;
  currentRole: string;
  sector: string;
  message: string;
}) {
  const lines = [
    ["Name", fields.name],
    ["Email", fields.email],
    ["Phone", fields.phone || "Not provided"],
    ["Current role", fields.currentRole || "Not provided"],
    ["Sector", fields.sector || "Not provided"],
    ["Message", fields.message || "Please find my CV attached."],
  ];

  const textBody = [
    "CANDIDATE REGISTRATION",
    "",
    ...lines.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; color: #1e293b; line-height: 1.6;">
      <h2 style="margin: 0 0 16px; color: #0f172a;">Candidate registration</h2>
      <p style="margin: 0 0 16px;">A candidate submitted their CV through the JLD Recruit website.</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
        ${lines
          .map(
            ([label, value]) => `
          <tr>
            <th style="text-align: left; padding: 8px 12px 8px 0; vertical-align: top; white-space: nowrap;">${label}</th>
            <td style="padding: 8px 0;">${escapeHtml(value).replace(/\n/g, "<br />")}</td>
          </tr>`
          )
          .join("")}
      </table>
      <p style="margin: 16px 0 0;">The CV is attached to this email.</p>
    </div>
  `.trim();

  return { textBody, htmlBody };
}

function getCvExtension(filename: string): AllowedCvExtension | null {
  const lower = filename.toLowerCase();

  for (const extension of ALLOWED_CV_EXTENSIONS) {
    if (lower.endsWith(extension)) {
      return extension;
    }
  }

  return null;
}

function contentTypeFromExtension(extension: AllowedCvExtension) {
  switch (extension) {
    case ".pdf":
      return "application/pdf";
    case ".doc":
      return "application/msword";
    case ".docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  }
}

function isAllowedCvType(contentType: string) {
  return !contentType || ALLOWED_CV_TYPES.has(contentType);
}

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

    const extension = getCvExtension(cv.name);
    if (!extension) {
      return NextResponse.json(
        {
          error:
            "CV must be a PDF or Word document with a .pdf, .doc, or .docx file extension.",
        },
        { status: 400 }
      );
    }

    if (!isAllowedCvType(cv.type)) {
      return NextResponse.json(
        { error: "CV must be a PDF or Word document." },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);
    const cvBuffer = Buffer.from(await cv.arrayBuffer());
    const fromEmail = getEnquiryFromEmail();
    const toEmail = getEnquiryToEmail();
    const { textBody, htmlBody } = buildCandidateEmailBody({
      name,
      email,
      phone,
      currentRole,
      sector,
      message,
    });

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `Candidate Registration — ${name}`,
      text: textBody,
      html: htmlBody,
      attachments: [
        {
          filename: cv.name,
          content: cvBuffer.toString("base64"),
          contentType: contentTypeFromExtension(extension),
        },
      ],
    });

    if (error) {
      console.error("Candidate enquiry email failed:", error);

      const resendMessage =
        typeof error === "object" && error !== null && "message" in error
          ? String(error.message)
          : null;

      return NextResponse.json(
        {
          error:
            resendMessage?.includes("from") || resendMessage?.includes("domain")
              ? "CV upload is temporarily unavailable. Please email James directly with your CV attached."
              : "We could not send your CV. Please try again or email James directly.",
        },
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
