"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/constants";

type ContactFormProps = {
  showRoleField?: boolean;
  submitLabel?: string;
};

export function ContactForm({
  showRoleField = true,
  submitLabel = "Send Message",
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const subject = encodeURIComponent(
      `Recruitment Enquiry from ${formData.get("name")}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${formData.get("name")}`,
        `Company: ${formData.get("company") || "Not provided"}`,
        `Email: ${formData.get("email")}`,
        `Phone: ${formData.get("phone") || "Not provided"}`,
        showRoleField
          ? `Role Hiring For: ${formData.get("role") || "Not provided"}`
          : null,
        "",
        `Message:`,
        `${formData.get("message")}`,
      ]
        .filter(Boolean)
        .join("\n")
    );

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;

    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
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
        <h3 className="text-lg font-semibold text-navy-900">
          Thank you for getting in touch
        </h3>
        <p className="mt-2 text-navy-600">
          Your email client should open shortly. If it does not, please email us
          directly at{" "}
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

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-navy-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-navy-900 transition-colors placeholder:text-navy-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-navy-700">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-navy-900 transition-colors placeholder:text-navy-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            placeholder="Your company name"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-navy-900 transition-colors placeholder:text-navy-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-navy-700">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-navy-900 transition-colors placeholder:text-navy-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            placeholder="Your phone number"
          />
        </div>
      </div>

      {showRoleField && (
        <div>
          <label htmlFor="role" className="mb-1.5 block text-sm font-medium text-navy-700">
            Role you are hiring for
          </label>
          <input
            type="text"
            id="role"
            name="role"
            className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-navy-900 transition-colors placeholder:text-navy-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            placeholder="e.g. Vehicle Technician, Lift Engineer"
          />
        </div>
      )}

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy-700">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-none rounded-xl border border-brand-200 bg-white px-4 py-3 text-navy-900 transition-colors placeholder:text-navy-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          placeholder="Tell us about your vacancy or how we can help..."
        />
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

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand-500/30 transition-all hover:from-brand-700 hover:to-brand-600 disabled:opacity-60 sm:w-auto"
      >
        {loading ? "Opening email..." : submitLabel}
      </button>
    </form>
  );
}
