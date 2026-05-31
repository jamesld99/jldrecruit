import { Button } from "./Button";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CTASection({
  title = "Need help filling a role?",
  description = "Speak directly with James today. No corporate layers, no inflated fees — just honest, proactive recruitment support.",
  primaryLabel = "Book a Recruitment Call",
  primaryHref = "/contact",
  secondaryLabel = "Send Us a Vacancy",
  secondaryHref = "/contact",
}: CTASectionProps) {
  return (
    <section className="py-20 lg:py-28" aria-labelledby="cta-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 px-8 py-16 text-center sm:px-12 lg:px-20 lg:py-20">
          <div className="absolute inset-0">
            <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-brand-400/30 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-brand-300/20 blur-3xl" />
            <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>
          <div className="relative">
            <h2
              id="cta-heading"
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-brand-100">
              {description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                href={primaryHref}
                variant="secondary"
                className="border-white bg-white text-brand-700 hover:bg-brand-50"
              >
                {primaryLabel}
              </Button>
              <Button
                href={secondaryHref}
                variant="outline"
                className="border-white/80 text-white hover:bg-white hover:text-brand-700"
              >
                {secondaryLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
