import { NextResponse } from "next/server";
import { Resend } from "resend";
import { currentLocationIsValid, isRelevantExperience } from "@/lib/candidate-questions";
import { siteConfig } from "@/lib/constants";
import { MAX_CV_BYTES, MAX_REQUEST_BYTES } from "@/lib/enquiry-limits";

const ALLOWED_CV_EXTENSIONS = [".pdf", ".doc", ".docx"] as const;

type AllowedCvExtension = (typeof ALLOWED_CV_EXTENSIONS)[number];

export type EnquiryForm = "employer" | "candidate" | "application";

export type EnquiryReason =
  | "unavailable"
  | "invalid"
  | "file"
  | "rate"
  | "rejected"
  | "closed";

type EnquiryFailure = {
  ok: false;
  status: number;
  error: string;
  reason: EnquiryReason;
};

type EnquirySuccess = {
  ok: true;
  form: EnquiryForm;
  testMode?: boolean;
};

export type FieldResult = { value: string } | { error: string };

export function isEnquiryTestMode() {
  return process.env.NODE_ENV === "development";
}

export function isFieldError<T extends object>(result: T | { error: string }): result is { error: string } {
  return "error" in result;
}

export const enquiryProblems: Record<EnquiryReason, { status: number; error: string }> = {
  unavailable: {
    status: 503,
    error: "Online submission is not available at the moment. Please email James directly.",
  },
  invalid: {
    status: 400,
    error: "Check the required details and try again.",
  },
  file: {
    status: 400,
    error: "CV must be a PDF or Word file (.pdf, .doc, or .docx) of 4 MB or smaller.",
  },
  rate: {
    status: 429,
    error:
      "Too many submissions were sent from this connection. Please wait before trying again, or email James directly.",
  },
  rejected: {
    status: 400,
    error: "This form could not be submitted. Please email James directly.",
  },
  closed: {
    status: 404,
    error: "This vacancy is not open for applications.",
  },
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+().\-\s]{8,40}$/;
const EXPLICIT_ANSWERS = new Set(["not applicable", "to be confirmed"]);
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT = 8;
const recentSubmissions = new Map<string, number[]>();

function extractEmailAddress(value: string) {
  const angleMatch = value.match(/<([^<>@\s]+@[^<>@\s]+)>/);
  if (angleMatch) return angleMatch[1];

  const spacedMatch = value.match(/([^\s@]+@[^\s@]+\.[^\s@]+)$/);
  if (spacedMatch) return spacedMatch[1];

  if (EMAIL_PATTERN.test(value)) return value;

  return null;
}

export function getEnquiryFromEmail() {
  const configured = process.env.ENQUIRY_FROM_EMAIL?.trim().replace(/^["']|["']$/g, "");
  const toEmail = getEnquiryToEmail();
  let emailAddress =
    (configured && extractEmailAddress(configured)) || siteConfig.enquiryFromEmail;

  if (emailAddress.toLowerCase() === toEmail.toLowerCase()) {
    emailAddress = siteConfig.enquiryFromEmail;
  }

  return `JLD Recruit Website <${emailAddress}>`;
}

export function getEnquiryToEmail() {
  const configured = process.env.ENQUIRY_TO_EMAIL?.trim().replace(/^["']|["']$/g, "");

  if (configured && EMAIL_PATTERN.test(configured)) return configured;

  return siteConfig.email;
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wantsJson(request: Request) {
  return (request.headers.get("accept") || "").includes("application/json");
}

export function enquiryResponse(request: Request, result: EnquirySuccess | EnquiryFailure) {
  if (wantsJson(request)) {
    if (result.ok) return NextResponse.json({ ok: true, testMode: result.testMode === true });
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const path = result.ok ? "/enquiry/submitted" : "/enquiry/problem";
  const current = new URL(request.url);
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = forwardedHost || request.headers.get("host") || current.host;
  const proto =
    request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ||
    current.protocol.replace(":", "") ||
    "https";
  const url = new URL(path, `${proto}://${host}`);
  if (result.ok) {
    url.searchParams.set("form", result.form);
    if (result.testMode) url.searchParams.set("test", "1");
  } else url.searchParams.set("reason", result.reason);

  return NextResponse.redirect(url, 303);
}

function failure(reason: EnquiryReason, error = enquiryProblems[reason].error): EnquiryFailure {
  return { ok: false, status: enquiryProblems[reason].status, error, reason };
}

function allowedHosts(request: Request) {
  const hosts = new Set<string>([new URL(siteConfig.url).host]);

  for (const header of [request.headers.get("x-forwarded-host"), request.headers.get("host")]) {
    const host = header?.split(",")[0]?.trim();
    if (host) hosts.add(host);
  }

  return hosts;
}

function hostOf(value: string | null) {
  if (!value) return null;

  try {
    return new URL(value).host;
  } catch {
    return null;
  }
}

export function guardEnquiryRequest(request: Request): NextResponse | null {
  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_REQUEST_BYTES) {
    return enquiryResponse(request, failure("file"));
  }

  const hosts = allowedHosts(request);
  const sourceHost = hostOf(request.headers.get("origin")) || hostOf(request.headers.get("referer"));
  if (!sourceHost || !hosts.has(sourceHost)) {
    return enquiryResponse(request, failure("rejected"));
  }

  const address = (request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  const now = Date.now();
  const recent = (recentSubmissions.get(address) || []).filter((time) => now - time < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    return enquiryResponse(request, failure("rate"));
  }
  recent.push(now);
  recentSubmissions.set(address, recent);

  return null;
}

export async function readEnquiryForm(request: Request) {
  try {
    return { formData: await request.formData() };
  } catch {
    return { response: enquiryResponse(request, failure("file")) };
  }
}

export function honeypotFilled(formData: FormData) {
  const value = formData.get("fax_number");
  return typeof value === "string" && value.trim().length > 0;
}

export function readField(
  formData: FormData,
  name: string,
  options: { required?: boolean; max: number; multiline?: boolean }
): FieldResult {
  const raw = formData.get(name);
  if (typeof raw !== "string") {
    return options.required
      ? { error: enquiryProblems.invalid.error }
      : { value: "" };
  }

  const value = (options.multiline ? raw.replace(/\u0000/g, "") : raw.replace(/[\u0000\r\n]+/g, " "))
    .trim();

  if (options.required && value.length === 0) {
    return { error: enquiryProblems.invalid.error };
  }

  if (value.length > options.max) {
    return { error: "One of the details is too long. Please shorten it and try again." };
  }

  return { value };
}

export function readEmail(formData: FormData, name = "email"): FieldResult {
  const field = readField(formData, name, { required: true, max: 254 });
  if (isFieldError(field)) return field;
  if (!EMAIL_PATTERN.test(field.value)) return { error: "Enter a valid email address." };
  return field;
}

export function isExplicitAnswer(value: string) {
  return EXPLICIT_ANSWERS.has(value.trim().toLowerCase());
}

export function readPhone(formData: FormData): FieldResult {
  const field = readField(formData, "phone", { required: true, max: 40 });
  if (isFieldError(field)) return field;
  if (isExplicitAnswer(field.value) || PHONE_PATTERN.test(field.value)) return field;
  return { error: "Enter a phone number, Not applicable, or To be confirmed." };
}

function missingOrInvalid(field: FieldResult) {
  return isFieldError(field) && field.error === enquiryProblems.invalid.error;
}

export function readRequiredPhone(formData: FormData): FieldResult {
  const field = readField(formData, "phone", { required: true, max: 40 });
  if (missingOrInvalid(field)) return { error: "Enter a valid phone number." };
  if (isFieldError(field)) return field;
  if (!PHONE_PATTERN.test(field.value)) return { error: "Enter a valid phone number." };
  return field;
}

export function readCurrentLocation(formData: FormData): FieldResult {
  const field = readField(formData, "currentLocation", { required: true, max: 120 });
  if (isFieldError(field)) {
    return missingOrInvalid(field)
      ? { error: "Enter the town or city and postcode where you currently live." }
      : field;
  }
  if (!currentLocationIsValid(field.value)) {
    return { error: "Enter the town or city and postcode where you currently live." };
  }
  return field;
}

export function readRelevantExperience(formData: FormData): FieldResult {
  const field = readField(formData, "relevantExperience", { required: true, max: 40 });
  if (isFieldError(field)) {
    return missingOrInvalid(field)
      ? { error: "Select how many years of relevant experience you have." }
      : field;
  }
  if (!isRelevantExperience(field.value)) {
    return { error: "Select how many years of relevant experience you have." };
  }
  return field;
}

function extensionFor(filename: string): AllowedCvExtension | null {
  const lower = filename.toLowerCase();
  return ALLOWED_CV_EXTENSIONS.find((extension) => lower.endsWith(extension)) ?? null;
}

function signatureMatches(bytes: Uint8Array, extension: AllowedCvExtension) {
  if (extension === ".pdf") {
    return bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46;
  }

  if (extension === ".docx") {
    return bytes[0] === 0x50 && bytes[1] === 0x4b;
  }

  return bytes[0] === 0xd0 && bytes[1] === 0xcf && bytes[2] === 0x11 && bytes[3] === 0xe0;
}

function safeFilename(filename: string, extension: AllowedCvExtension) {
  const base = filename.split(/[/\\]/).pop() || `cv${extension}`;
  const cleaned = base.replace(/[^A-Za-z0-9._-]+/g, "-").replace(/^-+/, "").slice(0, 120);
  return cleaned.toLowerCase().endsWith(extension) ? cleaned : `cv${extension}`;
}

export async function readCv(formData: FormData): Promise<
  { filename: string; contentType: string; content: string } | { error: string }
> {
  const cv = formData.get("cv");

  if (!(cv instanceof File) || cv.size === 0) {
    return { error: "A CV file is required." };
  }

  if (cv.size > MAX_CV_BYTES) {
    return { error: enquiryProblems.file.error };
  }

  const extension = extensionFor(cv.name);
  if (!extension) return { error: enquiryProblems.file.error };

  const bytes = new Uint8Array(await cv.arrayBuffer());
  if (bytes.length < 4 || !signatureMatches(bytes, extension)) {
    return { error: enquiryProblems.file.error };
  }

  const contentType =
    extension === ".pdf"
      ? "application/pdf"
      : extension === ".doc"
        ? "application/msword"
        : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  return {
    filename: safeFilename(cv.name, extension),
    contentType,
    content: Buffer.from(bytes).toString("base64"),
  };
}

export function emailDocument(title: string, intro: string, rows: Array<[string, string]>) {
  const text = [title.toUpperCase(), "", intro, "", ...rows.map(([label, value]) => `${label}: ${value}`)].join(
    "\n"
  );
  const html = `
    <div style="font-family: Arial, sans-serif; color: #1e293b; line-height: 1.6;">
      <h2 style="margin: 0 0 16px; color: #0f172a;">${escapeHtml(title)}</h2>
      <p style="margin: 0 0 16px;">${escapeHtml(intro)}</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <th style="text-align: left; padding: 8px 12px 8px 0; vertical-align: top; white-space: nowrap;">${escapeHtml(label)}</th>
            <td style="padding: 8px 0;">${escapeHtml(value).replace(/\n/g, "<br />")}</td>
          </tr>`
          )
          .join("")}
      </table>
    </div>
  `.trim();

  return { text, html };
}

export async function sendEnquiryEmail(input: {
  subject: string;
  replyTo: string;
  text: string;
  html: string;
  attachments?: Array<{ filename: string; content: string; contentType: string }>;
}) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return { error: enquiryProblems.unavailable.error };

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: getEnquiryFromEmail(),
    to: [getEnquiryToEmail()],
    replyTo: input.replyTo,
    subject: input.subject.replace(/[\r\n]+/g, " ").slice(0, 200),
    text: input.text,
    html: input.html,
    attachments: input.attachments,
  });

  if (error) {
    console.error("Enquiry email was not accepted by the sending service.");
    return { error: "The submission could not be sent. Please try again or email James directly." };
  }

  return { ok: true as const };
}
