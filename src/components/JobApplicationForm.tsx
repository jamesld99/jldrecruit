"use client";

import { FormEvent, useId, useState } from "react";
import Link from "next/link";
import { CURRENT_LOCATION_ERROR, currentLocationIsValid, isRelevantExperience, RELEVANT_EXPERIENCE_OPTIONS } from "@/lib/candidate-questions";
import { siteConfig } from "@/lib/constants";
import { MAX_CV_BYTES } from "@/lib/enquiry-limits";

const inputClassName =
  "w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-navy-900 transition-colors placeholder:text-navy-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20";

const labelClassName = "mb-1.5 block text-sm font-medium text-navy-700";

export function JobApplicationForm({
  jobSlug,
  jobTitle,
  emailDeliveryAvailable,
  previewOnly = false,
}: {
  jobSlug: string;
  jobTitle: string;
  emailDeliveryAvailable: boolean;
  previewOnly?: boolean;
}) {
  const cvId = useId();
  const honeypotId = useId();
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const selected = event.currentTarget.elements.namedItem("cv");
    const file = selected instanceof HTMLInputElement ? selected.files?.[0] ?? null : null;
    if (!file || file.size === 0) {
      setError("A CV file is required.");
      return;
    }
    if (file.size > MAX_CV_BYTES) {
      setError("CV file must be 4 MB or smaller.");
      return;
    }
    if (!/\.(pdf|doc|docx)$/i.test(file.name)) {
      setError("CV must be a PDF or Word document with a .pdf, .doc, or .docx file extension.");
      return;
    }

    const details = new FormData(event.currentTarget);
    const phone = String(details.get("phone") ?? "").trim();
    const currentLocation = String(details.get("currentLocation") ?? "");
    const relevantExperience = String(details.get("relevantExperience") ?? "");
    if (!/^[0-9+().\-\s]{8,40}$/.test(phone)) {
      setError("Enter a valid phone number.");
      return;
    }
    if (!currentLocationIsValid(currentLocation)) {
      setError(CURRENT_LOCATION_ERROR);
      return;
    }
    if (!isRelevantExperience(relevantExperience)) {
      setError("Select how many years of relevant experience you have.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/enquiry/application", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(event.currentTarget),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };

      if (response.ok) {
        setSubmitted(true);
        return;
      }

      setError(data.error ?? "We could not submit your application. Please try again or email James directly.");
    } catch {
      setError("We could not submit your application. Please try again or email James directly.");
    } finally {
      setLoading(false);
    }
  }

  if (!emailDeliveryAvailable && !previewOnly) {
    return (
      <div className="mt-6 rounded-xl border border-brand-200 bg-white px-4 py-3 text-sm leading-relaxed text-navy-700">
        <p>Online applications are not available at the moment.</p>
        <p className="mt-3">
          Email your CV to{" "}
          <a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(`Application: ${jobTitle}`)}`} className="font-semibold text-brand-600 hover:underline">
            {siteConfig.email}
          </a>{" "}
          and include “{jobTitle}” in the subject. This page cannot confirm that an email from your own email app has been sent.
        </p>
      </div>
    );
  }

  if (submitted && previewOnly) {
    return (
      <div className="mt-6 rounded-2xl border-2 border-brand-600 bg-white p-6 text-center" role="status">
        <h3 className="text-lg font-semibold text-navy-900">Test mode — validation passed</h3>
        <p className="mt-2 text-sm leading-relaxed text-navy-700">
          The application for {jobTitle} was not sent or stored. This does not prove that an email would reach an inbox.
        </p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
        <h3 className="text-lg font-semibold text-navy-900">Application accepted for sending</h3>
        <p className="mt-2 text-sm leading-relaxed text-navy-600">
          Your application for {jobTitle} has been accepted for sending to JLD Recruit Ltd.
          This does not by itself confirm that it has reached an inbox. If you need to follow up,
          email {siteConfig.email} or call {siteConfig.phoneDisplay}.
        </p>
      </div>
    );
  }

  return (
    <form
      method="post"
      action="/api/enquiry/application"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="relative mt-6 space-y-5"
    >
      {previewOnly ? <input type="hidden" name="formKind" value="application" /> : null}
      {previewOnly ? (
        <div className="rounded-xl border-2 border-brand-600 bg-white px-4 py-3 text-sm leading-relaxed text-navy-800" role="note">
          <p className="font-semibold uppercase tracking-wide text-brand-700">Test mode</p>
          <p className="mt-1">
            Local development only. A valid application is checked and then discarded. No email is sent, nothing is stored, and Resend is not contacted.
          </p>
        </div>
      ) : null}
      <input type="hidden" name="jobSlug" value={jobSlug} />
      <div>
        <label htmlFor={`${cvId}-name`} className={labelClassName}>
          Your name <span className="text-red-500">*</span>
        </label>
        <input id={`${cvId}-name`} name="name" type="text" required autoComplete="name" maxLength={100} className={inputClassName} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${cvId}-email`} className={labelClassName}>
            Email <span className="text-red-500">*</span>
          </label>
          <input id={`${cvId}-email`} name="email" type="email" required autoComplete="email" maxLength={254} className={inputClassName} />
        </div>
        <div>
          <label htmlFor={`${cvId}-phone`} className={labelClassName}>
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            id={`${cvId}-phone`}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            maxLength={40}
            pattern="[0-9+().\-\s]{8,40}"
            title="Enter a valid phone number."
            placeholder="07123 456789"
            aria-describedby={`${cvId}-phone-hint`}
            className={inputClassName}
          />
          <p id={`${cvId}-phone-hint`} className="mt-2 text-xs text-navy-500">
            A phone number is required so James can contact you about this application.
          </p>
        </div>
      </div>
      <div>
        <label htmlFor={`${cvId}-location`} className={labelClassName}>
          Where are you currently based? (Town, City or Postcode) <span className="text-red-500">*</span>
        </label>
        <input
          id={`${cvId}-location`}
          name="currentLocation"
          type="text"
          required
          autoComplete="postal-code"
          maxLength={120}
          pattern="(?=.*[A-Za-z].*[A-Za-z]).{2,120}"
          title="Enter the town, city or postcode where you currently live."
          placeholder="For example, Plymouth, Manchester or PL1 1AA"
          aria-describedby={`${cvId}-location-hint`}
          className={inputClassName}
        />
        <p id={`${cvId}-location-hint`} className="mt-2 text-xs text-navy-500">
          This is where you live now, not where you would prefer to work.
        </p>
      </div>
      <div>
        <label htmlFor={`${cvId}-experience`} className={labelClassName}>
          How many years of relevant experience do you have? <span className="text-red-500">*</span>
        </label>
        <select
          id={`${cvId}-experience`}
          name="relevantExperience"
          required
          defaultValue=""
          className={inputClassName}
        >
          <option value="" disabled>
            Select your experience
          </option>
          {RELEVANT_EXPERIENCE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={cvId} className={labelClassName}>
          Upload your CV <span className="text-red-500">*</span>
        </label>
        <input
          id={cvId}
          name="cv"
          type="file"
          required
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="sr-only"
          onChange={(event) => setFileName(event.target.files?.[0]?.name ?? null)}
        />
        <label
          htmlFor={cvId}
          className="flex min-h-14 w-full cursor-pointer touch-manipulation items-center justify-center rounded-xl border-2 border-dashed border-brand-300 bg-white px-4 py-4 text-center text-sm font-semibold text-brand-700 transition-colors hover:border-brand-500 hover:bg-brand-50"
        >
          {fileName ?? "Tap to choose your CV file"}
        </label>
        {fileName ? <p className="mt-2 text-sm text-navy-700">Selected: {fileName}</p> : null}
        <p className="mt-2 text-xs text-navy-500">
          PDF or Word format (.pdf, .doc, or .docx), up to 4 MB.
        </p>
      </div>
      <div>
        <label htmlFor={`${cvId}-message`} className={labelClassName}>
          Message
        </label>
        <textarea
          id={`${cvId}-message`}
          name="message"
          rows={4}
          maxLength={4000}
          className={`${inputClassName} resize-none`}
          placeholder="Tell James briefly about your experience."
        />
      </div>
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={honeypotId}>Fax</label>
        <input id={honeypotId} name="fax_number" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
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
      {error ? (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand-500/30 transition-all hover:from-brand-700 hover:to-brand-600 disabled:opacity-60"
      >
        {loading ? "Submitting application..." : "Submit application"}
      </button>
    </form>
  );
}
