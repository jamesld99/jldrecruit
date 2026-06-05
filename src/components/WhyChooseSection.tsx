import { employerWhyChoose } from "@/lib/constants";
import { SectionHeading } from "./SectionHeading";

export function WhyChooseSection() {
  return (
    <section className="gradient-section py-20 lg:py-28" aria-labelledby="why-choose-jld">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Why Choose JLD Recruit?"
          description="Personal, specialist recruitment for engineering and automotive businesses across the United Kingdom."
        />
        <ul className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {employerWhyChoose.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-brand-100 bg-white p-5 card-shadow"
            >
              <svg
                className="mt-0.5 h-5 w-5 shrink-0 text-brand-500"
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
              <span className="text-sm font-medium text-navy-800">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
