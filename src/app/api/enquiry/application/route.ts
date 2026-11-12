import { jobAdvertIsComplete } from "@/lib/jobs";
import { getVacancyBySlug } from "@/lib/vacancies";
import {
  emailDocument,
  enquiryProblems,
  enquiryResponse,
  guardEnquiryRequest,
  honeypotFilled,
  readCv,
  readEmail,
  readCurrentLocation,
  readEnquiryForm,
  readField,
  readRelevantExperience,
  readRequiredPhone,
  sendEnquiryEmail,
  isEnquiryTestMode,
  isFieldError,
} from "@/lib/enquiry-server";
import { siteConfig } from "@/lib/constants";

export const runtime = "nodejs";

function invalid(request: Request, error: string, reason: "invalid" | "file" | "closed" = "invalid") {
  const status = reason === "file" ? enquiryProblems.file.status : reason === "closed" ? 404 : 400;
  return enquiryResponse(request, { ok: false, status, error, reason });
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
  const slug = readField(formData, "jobSlug", { required: true, max: 120 });
  const name = readField(formData, "name", { required: true, max: 100 });
  const email = readEmail(formData);
  const phone = readRequiredPhone(formData);
  const currentLocation = readCurrentLocation(formData);
  const relevantExperience = readRelevantExperience(formData);
  const message = readField(formData, "message", { max: 4000, multiline: true });

  if (isFieldError(slug)) return invalid(request, slug.error);
  if (isFieldError(name)) return invalid(request, name.error);
  if (isFieldError(email)) return invalid(request, email.error);
  if (isFieldError(phone)) return invalid(request, phone.error);
  if (isFieldError(currentLocation)) return invalid(request, currentLocation.error);
  if (isFieldError(relevantExperience)) return invalid(request, relevantExperience.error);
  if (isFieldError(message)) return invalid(request, message.error);

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.value)) {
    return invalid(request, enquiryProblems.closed.error, "closed");
  }

  const vacancy = getVacancyBySlug(slug.value);
  const open =
    vacancy &&
    vacancy.status === "open" &&
    vacancy.publicationApproved &&
    jobAdvertIsComplete({
      title: vacancy.title,
      location: vacancy.location,
      summary: vacancy.summary,
      salary: vacancy.salary ?? "",
      workingHours: vacancy.workingHours ?? "",
      overview: vacancy.overview,
      responsibilities: vacancy.responsibilities,
      requirements: vacancy.requirements,
      benefits: vacancy.benefits,
    });

  if (!isEnquiryTestMode() && (!vacancy || !open)) {
    return invalid(request, enquiryProblems.closed.error, "closed");
  }

  const cv = await readCv(formData);
  if (isFieldError(cv)) return invalid(request, cv.error, "file");

  if (isEnquiryTestMode()) {
    return enquiryResponse(request, { ok: true, form: "application", testMode: true });
  }

  if (!vacancy || !open) {
    return invalid(request, enquiryProblems.closed.error, "closed");
  }

  const document = emailDocument(
    "Job application",
    "A candidate applied for a published vacancy through the JLD Recruit website. The CV is attached.",
    [
      ["Vacancy", vacancy.title],
      ["Location", vacancy.location],
      ["Vacancy page", `${siteConfig.url}/jobs/${vacancy.slug}`],
      ["Name", name.value],
      ["Email", email.value],
      ["Phone", phone.value],
      ["Where they currently live", currentLocation.value],
      ["Years of relevant experience", relevantExperience.value],
      ["Message", message.value || "Please find my CV attached."],
    ]
  );

  const sent = await sendEnquiryEmail({
    subject: `Application: ${vacancy.title} — ${vacancy.location}`,
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

  return enquiryResponse(request, { ok: true, form: "application" });
}
