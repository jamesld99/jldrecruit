"use client";

import { useState, FormEvent } from "react";
import { siteConfig } from "@/lib/constants";

export function VacancyForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const subject = encodeURIComponent(
      `Vacancy Enquiry from ${formData.get("name")}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${formData.get("name")}`,
        `Company: ${formData.get("company") || "Not provided"}`,
        `Phone: ${formData.get("phone")}`,
        `Role: ${formData.get("role")}`,
        "",
        "Sent via homepage vacancy form.",
      ].join("\n")
    );

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;

    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
        <h3 className="text-lg font-semibold text-navy-900">Thank you</h3>
        <p className="mt-2 text-sm text-navy-600">
          Your email client should open shortly. Or call{" "}
          <a href={`tel:${siteConfig.phone}`} className="font-semibold text-brand-600">
            {siteConfig.phoneDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-brand-200 bg-white p-6 card-shadow sm:p-8">
      <h2 className="text-lg font-bold text-navy-900 sm:text-xl">
        Need a technician, engineer or mechanic?
      </h2>
      <p className="mt-2 text-sm text-navy-600">
        Send us your vacancy details and James will be in touch.
      </p>
      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            name="name"
            required
            placeholder="Name *"
            className="w-full rounded-xl border border-brand-200 px-4 py-3 text-sm text-navy-900 placeholder:text-navy-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            className="w-full rounded-xl border border-brand-200 px-4 py-3 text-sm text-navy-900 placeholder:text-navy-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="tel"
            name="phone"
            required
            placeholder="Phone *"
            className="w-full rounded-xl border border-brand-200 px-4 py-3 text-sm text-navy-900 placeholder:text-navy-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
          <input
            type="text"
            name="role"
            required
            placeholder="Role e.g. Vehicle Technician *"
            className="w-full rounded-xl border border-brand-200 px-4 py-3 text-sm text-navy-900 placeholder:text-navy-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand-500/30 transition-all hover:from-brand-700 hover:to-brand-600 disabled:opacity-60"
        >
          {loading ? "Opening email..." : "Submit Vacancy"}
        </button>
      </form>
    </div>
  );
}
