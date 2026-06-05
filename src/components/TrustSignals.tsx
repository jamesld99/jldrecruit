import { trustSignals } from "@/lib/constants";
import { SectionHeading } from "./SectionHeading";

export function TrustSignals() {
  return (
    <section className="py-20 lg:py-28" aria-labelledby="trust-signals">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Why businesses choose JLD Recruit"
          description="Personal, specialist recruitment without the corporate agency experience."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trustSignals.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-brand-100 bg-white p-6 card-shadow transition-all hover:border-brand-300"
            >
              <div className="icon-circle-sm mb-4">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-navy-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
