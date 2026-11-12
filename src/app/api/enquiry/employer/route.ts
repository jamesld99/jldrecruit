import {
  emailDocument,
  enquiryProblems,
  enquiryResponse,
  guardEnquiryRequest,
  honeypotFilled,
  readEmail,
  readEnquiryForm,
  readField,
  readPhone,
  sendEnquiryEmail,
  isEnquiryTestMode,
  isFieldError,
} from "@/lib/enquiry-server";
import { isEmployerDeliveryTest } from "@/lib/enquiry";

export const runtime = "nodejs";

function invalid(request: Request, error: string) {
  return enquiryResponse(request, {
    ok: false,
    status: 400,
    error,
    reason: "invalid",
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
  const company = readField(formData, "company", { required: true, max: 120 });
  const email = readEmail(formData);
  const phone = readPhone(formData);
  const role = readField(formData, "role", { required: true, max: 120 });
  const positions = readField(formData, "positions", { required: true, max: 40 });
  const location = readField(formData, "location", { required: true, max: 120 });
  const salary = readField(formData, "salary", { required: true, max: 80 });
  const urgency = readField(formData, "urgency", { required: true, max: 80 });
  const message = readField(formData, "message", { required: true, max: 4000, multiline: true });

  if (isFieldError(name)) return invalid(request, name.error);
  if (isFieldError(company)) return invalid(request, company.error);
  if (isFieldError(email)) return invalid(request, email.error);
  if (isFieldError(phone)) return invalid(request, phone.error);
  if (isFieldError(role)) return invalid(request, role.error);
  if (isFieldError(positions)) return invalid(request, positions.error);
  if (isFieldError(location)) return invalid(request, location.error);
  if (isFieldError(salary)) return invalid(request, salary.error);
  if (isFieldError(urgency)) return invalid(request, urgency.error);
  if (isFieldError(message)) return invalid(request, message.error);

  if (isEnquiryTestMode() && !isEmployerDeliveryTest()) {
    return enquiryResponse(request, { ok: true, form: "employer", testMode: true });
  }

  const deliveryTest = isEmployerDeliveryTest();
  const document = emailDocument(
    deliveryTest ? "TEST — Employer vacancy enquiry" : "Employer vacancy enquiry",
    deliveryTest
      ? "TEST. This is one controlled local test of the employer enquiry form. It is not a genuine vacancy and it was not submitted on the live website."
      : "An employer submitted a vacancy enquiry through the JLD Recruit website.",
    [
      ...(deliveryTest ? [["Test", "TEST — local employer enquiry. Not a live vacancy."] as [string, string]] : []),
      ["Name", name.value],
      ["Company", company.value],
      ["Email", email.value],
      ["Phone", phone.value],
      ["Role hiring for", role.value],
      ["Number of positions", positions.value],
      ["Location", location.value],
      ["Salary range", salary.value],
      ["Urgency", urgency.value],
      ["Additional details", message.value],
    ]
  );

  const sent = await sendEnquiryEmail({
    subject: `${deliveryTest ? "TEST — " : ""}Vacancy Enquiry from ${name.value} — ${company.value}`,
    replyTo: email.value,
    text: document.text,
    html: document.html,
  });

  if ("error" in sent && sent.error) {
    return enquiryResponse(request, {
      ok: false,
      status: 502,
      error: sent.error,
      reason: "rejected",
    });
  }

  return enquiryResponse(request, { ok: true, form: "employer" });
}
