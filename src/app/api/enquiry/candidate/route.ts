import { NextResponse } from "next/server";
import {
  emailDocument,
  enquiryProblems,
  enquiryResponse,
  getEnquiryToEmail,
  guardEnquiryRequest,
  honeypotFilled,
  readCv,
  readEmail,
  readEnquiryForm,
  readField,
  readPhone,
  sendEnquiryEmail,
  isEnquiryTestMode,
  isFieldError,
} from "@/lib/enquiry-server";

export const runtime = "nodejs";

function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  if (!local || !domain) return email;
  return `${local.slice(0, Math.min(2, local.length))}***@${domain}`;
}

function invalid(request: Request, error: string, reason: "invalid" | "file" = "invalid") {
  return enquiryResponse(request, {
    ok: false,
    status: reason === "file" ? enquiryProblems.file.status : 400,
    error,
    reason,
  });
}

export async function GET() {
  const deliversTo = getEnquiryToEmail();

  return NextResponse.json({
    available: Boolean(process.env.RESEND_API_KEY?.trim()),
    deliversTo: maskEmail(deliversTo),
    usingCustomInbox: Boolean(process.env.ENQUIRY_TO_EMAIL?.trim()),
  });
}

export async function POST(request: Request) {
  const blocked = guardEnquiryRequest(request);
  if (blocked) return blocked;

  const body = await readEnquiryForm(request);
  if ("response" in body) return body.response;
  if (honeypotFilled(body.formData)) {
    return enquiryResponse(request, {
      ok: false,
      status: enquiryProblems.rejected.status,
      error: enquiryProblems.rejected.error,
      reason: "rejected",
    });
  }

  const formData = body.formData;
  const name = readField(formData, "name", { required: true, max: 100 });
  const email = readEmail(formData);
  const phone = readPhone(formData);
  const currentRole = readField(formData, "currentRole", { required: true, max: 120 });
  const sector = readField(formData, "sector", { required: true, max: 120 });
  const message = readField(formData, "message", { required: true, max: 4000, multiline: true });

  if (isFieldError(name)) return invalid(request, name.error);
  if (isFieldError(email)) return invalid(request, email.error);
  if (isFieldError(phone)) return invalid(request, phone.error);
  if (isFieldError(currentRole)) return invalid(request, currentRole.error);
  if (isFieldError(sector)) return invalid(request, sector.error);
  if (isFieldError(message)) return invalid(request, message.error);

  const cv = await readCv(formData);
  if (isFieldError(cv)) return invalid(request, cv.error, "file");

  if (isEnquiryTestMode()) {
    return enquiryResponse(request, { ok: true, form: "candidate", testMode: true });
  }

  const document = emailDocument(
    "Candidate registration",
    "A candidate submitted a CV through the JLD Recruit website. The CV is attached.",
    [
      ["Name", name.value],
      ["Email", email.value],
      ["Phone", phone.value],
      ["Current role", currentRole.value],
      ["Sector", sector.value],
      ["Message", message.value],
    ]
  );

  const sent = await sendEnquiryEmail({
    subject: `Candidate Registration — ${name.value}`,
    replyTo: email.value,
    text: document.text,
    html: document.html,
    attachments: [
      {
        filename: cv.filename,
        content: cv.content,
        contentType: cv.contentType,
      },
    ],
  });

  if ("error" in sent && sent.error) {
    return enquiryResponse(request, {
      ok: false,
      status: 502,
      error: sent.error,
      reason: "rejected",
    });
  }

  return enquiryResponse(request, { ok: true, form: "candidate" });
}
