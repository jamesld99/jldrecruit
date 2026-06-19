"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { primarySectors, siteConfig } from "@/lib/constants";

type FormType = "employer" | "candidate";

const inputClassName =
  "w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-navy-900 transition-colors placeholder:text-navy-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20";

const labelClassName = "mb-1.5 block text-sm font-medium text-navy-700";

function SuccessMessage({
  title,
  description,
  showContactFallback = true,
}: {
  title: string;
  description: string;
  showContactFallback?: boolean;
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
      {showContactFallback ? (
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
      ) : null}
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

function EmployerEnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const subject = encodeURIComponent(
      `Vacancy Enquiry from ${formData.get("name")} — ${formData.get("company")}`
    );
    const body = encodeURIComponent(
      [
        "EMPLOYER VACANCY ENQUIRY",
        "",
        `Name: ${formData.get("name")}`,
        `Company: ${formData.get("company")}`,
        `Email: ${formData.get("email")}`,
        `Phone: ${formData.get("phone") || "Not provided"}`,
        `Role hiring for: ${formData.get("role")}`,
        `Number of positions: ${formData.get("positions") || "Not specified"}`,
        `Location: ${formData.get("location") || "Not provided"}`,
        `Salary range: ${formData.get("salary") || "Not provided"}`,
        `Urgency: ${formData.get("urgency") || "Not specified"}`,
        "",
        "Additional details:",
        `${formData.get("message") || "None"}`,
      ].join("\n")
    );

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <SuccessMessage
        title="Thank you — your vacancy enquiry is ready to send"
        description="Your email app should open with your details filled in. Send the email and James will respond promptly."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="employer-name" className={labelClassName}>
            Your name <span className="text-red-500">*</span>
          </label>
          <input id="employer-name" name="name" type="text" required className={inputClassName} />
        </div>
        <div>
          <label htmlFor="employer-company" className={labelClassName}>
            Company <span className="text-red-500">*</span>
          </label>
          <input id="employer-company" name="company" type="text" required className={inputClassName} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="employer-email" className={labelClassName}>
            Email <span className="text-red-500">*</span>
          </label>
          <input id="employer-email" name="email" type="email" required className={inputClassName} />
        </div>
        <div>
          <label htmlFor="employer-phone" className={labelClassName}>
            Phone
          </label>
          <input id="employer-phone" name="phone" type="tel" className={inputClassName} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="employer-role" className={labelClassName}>
            Role you are hiring for <span className="text-red-500">*</span>
          </label>
          <input id="employer-role" name="role" type="text" required className={inputClassName} placeholder="e.g. Lift Service Engineer" />
        </div>
        <div>
          <label htmlFor="employer-positions" className={labelClassName}>
            Number of positions
          </label>
          <input id="employer-positions" name="positions" type="text" className={inputClassName} placeholder="e.g. 1" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="employer-location" className={labelClassName}>
            Role location
          </label>
          <input id="employer-location" name="location" type="text" className={inputClassName} placeholder="e.g. Essex, Yorkshire" />
        </div>
        <div>
          <label htmlFor="employer-salary" className={labelClassName}>
            Salary range
          </label>
          <input id="employer-salary" name="salary" type="text" className={inputClassName} placeholder="e.g. £40,000–£50,000" />
        </div>
      </div>

      <div>
        <label htmlFor="employer-urgency" className={labelClassName}>
          How urgent is this hire?
        </label>
        <select id="employer-urgency" name="urgency" className={inputClassName}>
          <option value="">Select urgency</option>
          <option value="Immediate — role is vacant now">Immediate — role is vacant now</option>
          <option value="Within 4 weeks">Within 4 weeks</option>
          <option value="Planning ahead">Planning ahead</option>
        </select>
      </div>

      <div>
        <label htmlFor="employer-message" className={labelClassName}>
          Additional details
        </label>
        <textarea
          id="employer-message"
          name="message"
          rows={4}
          className={`${inputClassName} resize-none`}
          placeholder="Ideal candidate profile, working hours, qualifications required..."
        />
      </div>

      <PrivacyNote />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand-500/30 transition-all hover:from-brand-700 hover:to-brand-600 disabled:opacity-60 sm:w-auto"
      >
        {loading ? "Opening email..." : "Submit Vacancy Enquiry"}
      </button>
    </form>
  );
}

function CandidateEnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadAvailable, setUploadAvailable] = useState<boolean | null>(null);
  const [usedMailtoFallback, setUsedMailtoFallback] = useState(false);

  useEffect(() => {
    fetch("/api/enquiry/candidate")
      .then((response) => response.json())
      .then((data: { available?: boolean }) => {
        setUploadAvailable(Boolean(data.available));
      })
      .catch(() => {
        setUploadAvailable(false);
      });
  }, []);

  function openMailtoFallback(formData: FormData) {
    const subject = encodeURIComponent(
      `Candidate Registration — ${formData.get("name")}`
    );
    const body = encodeURIComponent(
      [
        "CANDIDATE REGISTRATION",
        "",
        `Name: ${formData.get("name")}`,
        `Email: ${formData.get("email")}`,
        `Phone: ${formData.get("phone") || "Not provided"}`,
        `Current role: ${formData.get("currentRole") || "Not provided"}`,
        `Sector: ${formData.get("sector") || "Not provided"}`,
        "",
        "Message:",
        `${formData.get("message") || "Please find my CV attached."}`,
        "",
        "Please attach your CV to this email before sending.",
      ].join("\n")
    );

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    if (uploadAvailable) {
      try {
        const response = await fetch("/api/enquiry/candidate", {
          method: "POST",
          body: formData,
        });
        const data = (await response.json().catch(() => ({}))) as { error?: string };

        if (response.ok) {
          setSubmitted(true);
          setUsedMailtoFallback(false);
          return;
        }

        if (response.status === 503) {
          setUploadAvailable(false);
          openMailtoFallback(formData);
          setUsedMailtoFallback(true);
          setSubmitted(true);
          return;
        }

        setError(data.error ?? "We could not send your CV. Please try again.");
      } catch {
        setError("We could not send your CV. Please try again or email James directly.");
      } finally {
        setLoading(false);
      }
      return;
    }

    openMailtoFallback(formData);
    setUsedMailtoFallback(true);
    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <SuccessMessage
        title={
          usedMailtoFallback
            ? "Open your email app and attach your CV"
            : "Thank you — your CV has been sent"
        }
        description={
          usedMailtoFallback
            ? "Your email app should open with your details filled in. Attach your CV file before sending so James can review your experience."
            : "James has received your CV and details and will be in touch if a suitable permanent role comes up."
        }
        showContactFallback={usedMailtoFallback}
      />
    );
  }

  if (uploadAvailable === null) {
    return (
      <p className="text-sm text-navy-600">Loading registration form...</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {!uploadAvailable ? (
        <div className="rounded-xl border border-brand-200 bg-brand-50/70 px-4 py-3 text-sm text-navy-700">
          This opens your email app with your details filled in. You will need to
          attach your CV yourself before sending — the website cannot upload files
          by email automatically yet.
        </div>
      ) : (
        <div className="rounded-xl border border-brand-200 bg-brand-50/70 px-4 py-3 text-sm text-navy-700">
          Upload your CV here and it will be sent directly to James as an email
          attachment — no need to open your email app.
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="candidate-name" className={labelClassName}>
            Your name <span className="text-red-500">*</span>
          </label>
          <input id="candidate-name" name="name" type="text" required className={inputClassName} />
        </div>
        <div>
          <label htmlFor="candidate-email" className={labelClassName}>
            Email <span className="text-red-500">*</span>
          </label>
          <input id="candidate-email" name="email" type="email" required className={inputClassName} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="candidate-phone" className={labelClassName}>
            Phone
          </label>
          <input id="candidate-phone" name="phone" type="tel" className={inputClassName} />
        </div>
        <div>
          <label htmlFor="candidate-current-role" className={labelClassName}>
            Current role
          </label>
          <input id="candidate-current-role" name="currentRole" type="text" className={inputClassName} placeholder="e.g. Fire Alarm Engineer" />
        </div>
      </div>

      <div>
        <label htmlFor="candidate-sector" className={labelClassName}>
          Sector
        </label>
        <select id="candidate-sector" name="sector" className={inputClassName} defaultValue="">
          <option value="" disabled>
            Select your sector
          </option>
          {primarySectors.map((sector) => (
            <option key={sector.slug} value={sector.title}>
              {sector.title}
            </option>
          ))}
        </select>
      </div>

      {uploadAvailable ? (
        <div>
          <label htmlFor="candidate-cv" className={labelClassName}>
            Upload your CV <span className="text-red-500">*</span>
          </label>
          <input
            id="candidate-cv"
            name="cv"
            type="file"
            required
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-sm text-navy-700 file:mr-4 file:rounded-full file:border-0 file:bg-brand-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-700"
          />
          <p className="mt-2 text-xs text-navy-500">
            PDF or Word format (.pdf, .doc, or .docx), up to 5 MB. The file name
            must include the extension. Sent directly to James as an attachment.
          </p>
        </div>
      ) : null}

      <div>
        <label htmlFor="candidate-message" className={labelClassName}>
          Message
        </label>
        <textarea
          id="candidate-message"
          name="message"
          rows={4}
          className={`${inputClassName} resize-none`}
          placeholder="What type of role are you looking for? Preferred locations, salary expectations, notice period..."
        />
      </div>

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <PrivacyNote />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full border-2 border-brand-600 px-6 py-3.5 text-sm font-semibold text-brand-700 transition-all hover:bg-brand-600 hover:text-white disabled:opacity-60 sm:w-auto"
      >
        {loading
          ? uploadAvailable
            ? "Sending CV..."
            : "Opening email..."
          : uploadAvailable
            ? "Send CV & Register Interest"
            : "Open email to send CV"}
      </button>
    </form>
  );
}

export function EnquiryForms({ defaultTab = "employer" }: { defaultTab?: FormType }) {
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
          <EmployerEnquiryForm />
        </div>
      ) : (
        <div id="candidates">
          <h2 className="mb-2 text-xl font-bold text-navy-900">Register your interest</h2>
          <p className="mb-6 text-sm text-navy-600">
            Register your interest and send your CV to James. Our service is free for candidates.
          </p>
          <CandidateEnquiryForm />
        </div>
      )}
    </div>
  );
}
