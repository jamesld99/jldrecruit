import { siteConfig } from "@/lib/constants";

const specialisms = [
  "Lift Engineering",
  "Fire & Security",
  "Gate & Door Engineering",
  "Refrigeration & HVAC",
  "Automotive & HGV",
];

export function CoverageAreas() {
  return (
    <section
      className="py-12 lg:py-16"
      aria-labelledby="uk-wide-recruitment"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-brand-200 bg-white p-8 card-shadow sm:p-10">
          <h2
            id="uk-wide-recruitment"
            className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl"
          >
            UK-Wide Recruitment
          </h2>
          <p className="mt-4 leading-relaxed text-navy-600">
            {siteConfig.legalName} supports employers and candidates across
            England, Scotland, Wales and Northern Ireland.
          </p>
          <p className="mt-4 font-medium text-navy-800">We specialise in:</p>
          <ul className="mt-3 space-y-2">
            {specialisms.map((item) => (
              <li key={item} className="flex items-start gap-3">
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
                <span className="text-sm text-navy-700">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-navy-600">
            We recruit nationwide and regularly support businesses in major cities
            including London, Birmingham, Manchester, Leeds, Bristol, Glasgow,
            Cardiff and Belfast.
          </p>
        </div>
      </div>
    </section>
  );
}
