"use client";

import { useEffect, useId, useState, FormEvent } from "react";
import Link from "next/link";
import { primarySectors, siteConfig } from "@/lib/constants";
import { MAX_CV_BYTES } from "@/lib/enquiry-limits";

type FormType = "employer" | "candidate";

const inputClassName =
  "w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-navy-900 transition-colors placeholder:text-navy-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20";

const labelClassName = "mb-1.5 block text-sm font-medium text-navy-700";

const acceptedMessage =
  "This confirmation means the submission was accepted for sending to JLD Recruit Ltd. It does not by itself confirm that the message has reached an inbox.";

function HoneypotField() {
  const id = useId();

  return (
    <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
      <label htmlFor={id}>Fax</label>
      <input id={id} name="fax_number" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}

function SuccessMessage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
        <svg
          className="h-6 w-6 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-navy-900">{title}</h3>
      <p className="mt-2 text-navy-600">{description}</p>
      <p className="mt-4 text-sm text-navy-600">
        If you need to follow up, contact us at{" "}
        <a
          href={`mailto:${siteConfig.email}`}
          className="font-semibold text-brand-600 hover:underline"
        >
          {siteConfig.email}
        </a>{" "}
        or call{" "}
        <a
          href={`tel:${siteConfig.phone}`}
          className="font-semibold text-brand-600 hover:underline"
        >
          {siteConfig.phoneDisplay}
        </a>
        .
      </p>
    </div>
  );
}

function PrivacyNote() {
  return (
    <p className="text-xs leading-relaxed text-navy-500">
      By submitting this form, you agree to our{" "}
      <Link href="/privacy-policy" className="font-medium text-brand-600 hover:underline">
        Privacy Policy
      </Link>{" "}
      and{" "}
      <Link href="/terms-of-use" className="font-medium text-brand-600 hover:underline">
        Terms of Use
      </Link>
      .
    </p>
  );
}

function PreviewOnlyNotice() {
  return (
    <div className="rounded-xl border-2 border-brand-600 bg-white px-4 py-3 text-sm leading-relaxed text-navy-800" role="note">
      <p className="font-semibold uppercase tracking-wide text-brand-700">Test mode</p>
      <p className="mt-1">
        Local development only. A valid submission is checked and then discarded. No email is sent, nothing is stored, and Resend is not contacted.
      </p>
    </div>
  );
}

function PreviewComplete() {
  return (
    <div className="rounded-2xl border-2 border-brand-600 bg-white p-8 text-center" role="status">
      <h3 className="text-lg font-semibold text-navy-900">Test mode — validation passed</h3>
      <p className="mt-2 text-navy-700">
        Nothing was sent or stored. This does not prove that an email would reach an inbox.
      </p>
    </div>
  );
}

function DirectContactNotice({ children }: { children: string }) {
  return (
    <div className="rounded-xl border border-brand-200 bg-brand-50/70 px-4 py-3 text-sm leading-relaxed text-navy-700">
      <p>{children}</p>
      <p className="mt-3">
        Email{" "}
        <a href={`mailto:${siteConfig.email}`} className="font-semibold text-brand-600 hover:underline">
          {siteConfig.email}
        </a>{" "}
        or call{" "}
        <a href={`tel:${siteConfig.phone}`} className="font-semibold text-brand-600 hover:underline">
          {siteConfig.phoneDisplay}
        </a>
        . A message sent from your own email app is not confirmed by this page.
      </p>
    </div>
  );
}

function cvFileError(file: File | null) {
  if (!file || file.size === 0) return "A CV file is required.";
  if (file.size > MAX_CV_BYTES) return "CV file must be 4 MB or smaller.";
  if (!/\.(pdf|doc|docx)$/i.test(file.name)) {
    return "CV must be a PDF or Word document with a .pdf, .doc, or .docx file extension.";
  }
  return null;
}

async function submitForm(url: string, form: HTMLFormElement) {
  const response = await fetch(url, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: new FormData(form),
  });
  const data = (await response.json().catch(() => ({}))) as { error?: string };

  return {
    ok: response.ok,
    error: data.error ?? "We could not submit the form. Please try again or email James directly.",
  };
}

function EmployerEnquiryForm({
  emailDeliveryAvailable,
  previewOnly = false,
  employerDeliveryTest = false,
}: {
  emailDeliveryAvailable: boolean;
  previewOnly?: boolean;
  employerDeliveryTest?: boolean;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await submitForm("/api/enquiry/employer", event.currentTarget);
      if (result.ok) {
        setSubmitted(true);
        return;
      }
      setError(result.error);
    } catch {
      setError("We could not submit your enquiry. Please try again or email James directly.");
    } finally {
      setLoading(false);
    }
  }

  if (!emailDeliveryAvailable && !previewOnly) {
    return (
      <DirectContactNotice>
        Online vacancy enquiries are not available at the moment.
      </DirectContactNotice>
    );
  }

  if (submitted && previewOnly && !employerDeliveryTest) {
    return <PreviewComplete />;
  }

  if (submitted) {
    return (
      <SuccessMessage
        title={employerDeliveryTest ? "TEST email accepted by Resend" : "Vacancy enquiry accepted for sending"}
        description={
          employerDeliveryTest
            ? "Resend accepted this TEST employer enquiry. This does not confirm that it has reached Outlook or cleared Microsoft 365 quarantine. No vacancy was published."
            : `Your vacancy enquiry has been accepted for sending to JLD Recruit Ltd. ${acceptedMessage}`
        }
      />
    );
  }

  return (
    <form
      method="post"
      action="/api/enquiry/employer"
      onSubmit={handleSubmit}
      className="relative space-y-5"
    >
      {previewOnly ? <input type="hidden" name="formKind" value="employer" /> : null}
      {employerDeliveryTest ? (
        <div className="rounded-xl border-2 border-brand-600 bg-white px-4 py-3 text-sm leading-relaxed text-navy-800" role="note">
          <p className="font-semibold uppercase tracking-wide text-brand-700">Test email</p>
          <p className="mt-1">
            Submitting this employer form once sends one TEST email through Resend to James. It does not publish a vacancy or change the live website. A success message means Resend accepted it, not that it has reached Outlook.
          </p>
        </div>
      ) : previewOnly ? <PreviewOnlyNotice /> : null}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="employer-name" className={labelClassName}>
            Your name <span className="text-red-500">*</span>
          </label>
          <input id="employer-name" name="name" type="text" required autoComplete="name" maxLength={100} className={inputClassName} />
        </div>
        <div>
          <label htmlFor="employer-company" className={labelClassName}>
            Company <span className="text-red-500">*</span>
          </label>
          <input id="employer-company" name="company" type="text" required autoComplete="organization" maxLength={120} className={inputClassName} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="employer-email" className={labelClassName}>
            Email <span className="text-red-500">*</span>
          </label>
          <input id="employer-email" name="email" type="email" required autoComplete="email" maxLength={254} className={inputClassName} />
        </div>
        <div>
          <label htmlFor="employer-phone" className={labelClassName}>
            Phone <span className="text-red-500">*</span>
          </label>
          <input id="employer-phone" name="phone" type="text" required autoComplete="tel" maxLength={40} className={inputClassName} placeholder="Number, Not applicable, or To be confirmed" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="employer-role" className={labelClassName}>
            Role you are hiring for <span className="text-red-500">*</span>
          </label>
          <input id="employer-role" name="role" type="text" required maxLength={120} className={inputClassName} placeholder="e.g. Lift Service Engineer" />
        </div>
        <div>
          <label htmlFor="employer-positions" className={labelClassName}>
            Number of positions <span className="text-red-500">*</span>
          </label>
          <input id="employer-positions" name="positions" type="text" required maxLength={40} className={inputClassName} placeholder="e.g. 1, Not applicable, or To be confirmed" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="employer-location" className={labelClassName}>
            Role location <span className="text-red-500">*</span>
          </label>
          <input id="employer-location" name="location" type="text" required maxLength={120} className={inputClassName} placeholder="e.g. Essex, Not applicable, or To be confirmed" />
        </div>
        <div>
          <label htmlFor="employer-salary" className={labelClassName}>
            Salary range <span className="text-red-500">*</span>
          </label>
          <input id="employer-salary" name="salary" type="text" required maxLength={80} className={inputClassName} placeholder="e.g. £40,000–£50,000, or To be confirmed" />
        </div>
      </div>

      <div>
        <label htmlFor="employer-urgency" className={labelClassName}>
          How urgent is this hire? <span className="text-red-500">*</span>
        </label>
        <select id="employer-urgency" name="urgency" required className={inputClassName} defaultValue="">
          <option value="" disabled>
            Select urgency
          </option>
          <option value="Immediate — role is vacant now">Immediate — role is vacant now</option>
          <option value="Within 4 weeks">Within 4 weeks</option>
          <option value="Planning ahead">Planning ahead</option>
          <option value="Not applicable">Not applicable</option>
          <option value="To be confirmed">To be confirmed</option>
        </select>
      </div>

      <div>
        <label htmlFor="employer-message" className={labelClassName}>
          Additional details <span className="text-red-500">*</span>
        </label>
        <textarea
          id="employer-message"
          name="message"
          rows={4}
          required
          maxLength={4000}
          className={`${inputClassName} resize-none`}
          placeholder="Working hours, qualifications, benefits and other details. Use Not applicable or To be confirmed where needed."
        />
      </div>

      <HoneypotField />
      <PrivacyNote />

      {error ? (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand-500/30 transition-all hover:from-brand-700 hover:to-brand-600 disabled:opacity-60 sm:w-auto"
      >
        {loading ? "Submitting..." : "Submit Vacancy Enquiry"}
      </button>
    </form>
  );
}

function CvFileInput() {
  const inputId = useId();
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div>
      <label htmlFor={inputId} className={labelClassName}>
        Upload your CV <span className="text-red-500">*</span>
      </label>
      <input
        id={inputId}
        name="cv"
        type="file"
        required
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="sr-only"
        onChange={(event) => {
          setFileName(event.target.files?.[0]?.name ?? null);
        }}
      />
      <label
        htmlFor={inputId}
        className="flex min-h-14 w-full cursor-pointer touch-manipulation items-center justify-center rounded-xl border-2 border-dashed border-brand-300 bg-brand-50/50 px-4 py-4 text-center text-sm font-semibold text-brand-700 transition-colors hover:border-brand-500 hover:bg-brand-50 active:bg-brand-100"
      >
        {fileName ?? "Tap to choose your CV file"}
      </label>
      {fileName ? (
        <p className="mt-2 text-sm text-navy-700">Selected: {fileName}</p>
      ) : null}
      <p className="mt-2 text-xs text-navy-500">
        PDF or Word format (.pdf, .doc, or .docx), up to 4 MB. The file name must
        include the extension.
      </p>
    </div>
  );
}

function CandidateEnquiryForm({
  emailDeliveryAvailable,
  previewOnly = false,
}: {
  emailDeliveryAvailable: boolean;
  previewOnly?: boolean;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const selected = event.currentTarget.elements.namedItem("cv");
    const file = selected instanceof HTMLInputElement ? selected.files?.[0] ?? null : null;
    const fileError = cvFileError(file);
    if (fileError) {
      setError(fileError);
      return;
    }

    setLoading(true);

    try {
      const result = await submitForm("/api/enquiry/candidate", event.currentTarget);
      if (result.ok) {
        setSubmitted(true);
        return;
      }
      setError(result.error);
    } catch {
      setError("We could not submit your CV. Please try again or email James directly.");
    } finally {
      setLoading(false);
    }
  }

  if (!emailDeliveryAvailable && !previewOnly) {
    return (
      <DirectContactNotice>
        Online CV upload is not available at the moment.
      </DirectContactNotice>
    );
  }

  if (submitted && previewOnly) {
    return <PreviewComplete />;
  }

  if (submitted) {
    return (
      <SuccessMessage
        title="CV submission accepted for sending"
        description={`Your CV and details have been accepted for sending to JLD Recruit Ltd. ${acceptedMessage}`}
      />
    );
  }

  return (
    <form
      method="post"
      action="/api/enquiry/candidate"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="relative space-y-5"
    >
      {previewOnly ? <input type="hidden" name="formKind" value="candidate" /> : null}
      {previewOnly ? <PreviewOnlyNotice /> : null}
      {previewOnly ? null : (
        <div className="rounded-xl border border-brand-200 bg-brand-50/70 px-4 py-3 text-sm text-navy-700">
          Upload your CV here. It is sent to JLD Recruit Ltd for review. A confirmation
          appears on this page only after the submission has been accepted for sending.
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="candidate-name" className={labelClassName}>
            Your name <span className="text-red-500">*</span>
          </label>
          <input id="candidate-name" name="name" type="text" required autoComplete="name" maxLength={100} className={inputClassName} />
        </div>
        <div>
          <label htmlFor="candidate-email" className={labelClassName}>
            Email <span className="text-red-500">*</span>
          </label>
          <input id="candidate-email" name="email" type="email" required autoComplete="email" maxLength={254} className={inputClassName} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="candidate-phone" className={labelClassName}>
            Phone <span className="text-red-500">*</span>
          </label>
          <input id="candidate-phone" name="phone" type="text" required autoComplete="tel" maxLength={40} className={inputClassName} placeholder="Number, Not applicable, or To be confirmed" />
        </div>
        <div>
          <label htmlFor="candidate-current-role" className={labelClassName}>
            Current role <span className="text-red-500">*</span>
          </label>
          <input id="candidate-current-role" name="currentRole" type="text" required maxLength={120} className={inputClassName} placeholder="e.g. Fire Alarm Engineer, Not applicable, or To be confirmed" />
        </div>
      </div>

      <div>
        <label htmlFor="candidate-sector" className={labelClassName}>
          Sector <span className="text-red-500">*</span>
        </label>
        <select id="candidate-sector" name="sector" required className={inputClassName} defaultValue="">
          <option value="" disabled>
            Select your sector
          </option>
          {primarySectors.map((sector) => (
            <option key={sector.slug} value={sector.title}>
              {sector.title}
            </option>
          ))}
          <option value="Not applicable">Not applicable</option>
          <option value="To be confirmed">To be confirmed</option>
        </select>
      </div>

      <CvFileInput />

      <div>
        <label htmlFor="candidate-message" className={labelClassName}>
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="candidate-message"
          name="message"
          rows={4}
          required
          maxLength={4000}
          className={`${inputClassName} resize-none`}
          placeholder="Locations, salary, notice period and benefits. Use Not applicable or To be confirmed where needed."
        />
      </div>

      <HoneypotField />

      {error ? (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <PrivacyNote />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full border-2 border-brand-600 px-6 py-3.5 text-sm font-semibold text-brand-700 transition-all hover:bg-brand-600 hover:text-white disabled:opacity-60 sm:w-auto"
      >
        {loading ? "Sending CV..." : "Send CV & Register Interest"}
      </button>
    </form>
  );
}

export function EnquiryForms({
  defaultTab = "employer",
  emailDeliveryAvailable = false,
  previewOnly = false,
  employerDeliveryTest = false,
}: {
  defaultTab?: FormType;
  emailDeliveryAvailable?: boolean;
  previewOnly?: boolean;
  employerDeliveryTest?: boolean;
}) {
  const [activeTab, setActiveTab] = useState<FormType>(defaultTab);

  useEffect(() => {
    if (window.location.hash === "#candidates") {
      setActiveTab("candidate");
    }
  }, []);

  return (
    <div>
      <div className="mb-8 flex rounded-full border border-brand-200 bg-brand-50/60 p-1">
        <button
          type="button"
          onClick={() => setActiveTab("employer")}
          className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeTab === "employer"
              ? "bg-white text-brand-700 shadow-sm"
              : "text-navy-600 hover:text-brand-700"
          }`}
        >
          I&apos;m hiring
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("candidate")}
          className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeTab === "candidate"
              ? "bg-white text-brand-700 shadow-sm"
              : "text-navy-600 hover:text-brand-700"
          }`}
        >
          I&apos;m looking for work
        </button>
      </div>

      {activeTab === "employer" ? (
        <div>
          <h2 className="mb-2 text-xl font-bold text-navy-900">Submit a vacancy</h2>
          <p className="mb-6 text-sm text-navy-600">
            Tell us about the role you need to fill. James will respond directly with next steps.
          </p>
          <EmployerEnquiryForm
            emailDeliveryAvailable={emailDeliveryAvailable || employerDeliveryTest}
            previewOnly={previewOnly}
            employerDeliveryTest={employerDeliveryTest}
          />
        </div>
      ) : (
        <div id="candidates">
          <h2 className="mb-2 text-xl font-bold text-navy-900">Register your interest</h2>
          <p className="mb-6 text-sm text-navy-600">
            Register your interest and send your CV to James. Our service is free for candidates.
          </p>
          <CandidateEnquiryForm emailDeliveryAvailable={emailDeliveryAvailable} previewOnly={previewOnly} />
        </div>
      )}
    </div>
  );
}
