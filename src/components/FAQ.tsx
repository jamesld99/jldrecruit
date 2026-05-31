"use client";

import { useState } from "react";
import type { faqs } from "@/lib/constants";

type FaqItem = (typeof faqs)[number];

interface FAQProps {
  items: FaqItem[];
  title?: string;
  description?: string;
}

export function FAQ({
  items,
  title = "Frequently Asked Questions",
  description = "Clear answers to common questions about our recruitment service.",
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="gradient-section py-20 lg:py-28" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="mb-4 eyebrow-pill">FAQ</p>
          <h2
            id="faq-heading"
            className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl"
          >
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-lg text-navy-600">{description}</p>
          )}
        </div>

        <div className="mt-12 divide-y divide-brand-100 overflow-hidden rounded-2xl border border-brand-200 bg-white card-shadow">
          {items.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.question} className={isOpen ? "bg-brand-50/60" : ""}>
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-brand-50"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-navy-900 sm:text-lg">
                    {faq.question}
                  </span>
                  <span
                    className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all ${
                      isOpen
                        ? "bg-brand-600 text-white rotate-180"
                        : "bg-brand-100 text-brand-700"
                    }`}
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-brand-100 px-6 pb-5 pt-1">
                    <p className="leading-relaxed text-navy-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
