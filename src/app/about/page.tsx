import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { SchemaScript } from "@/components/SchemaScript";
import { siteConfig, whyChooseUs } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema, getWebPageSchema } from "@/lib/schema";

export const metadata = createMetadata({
  title: "About JLD Recruit Ltd",
  description:
    "Learn about JLD Recruit Ltd — a family-run UK recruitment agency specialising in automotive, engineering and technical recruitment. Personal, direct and accountable.",
  path: "/about",
  keywords: [
    "recruitment agency UK",
    "family-run recruitment",
    "automotive recruitment agency",
    "engineering recruitment agency",
  ],
});

export default function AboutPage() {
  return (
    <>
      <SchemaScript
        data={[
          getWebPageSchema(
            "About JLD Recruit Ltd",
            "A family-run UK recruitment agency helping businesses find skilled candidates in automotive, engineering and technical sectors.",
            "/about"
          ),
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "About", url: "/about" },
          ]),
        ]}
      />

      <section className="gradient-hero py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 eyebrow-pill">
              About Us
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              A family-run recruitment business built on personal service
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-navy-600">
              JLD Recruit Ltd is an independent, family-run recruitment agency
              helping companies hire skilled candidates across automotive,
              engineering and technical sectors. We offer a personal, direct and
              accountable service — without corporate layers or inflated fees.
            </p>
            <p className="mt-4 text-sm text-navy-500">
              Registered in England and Wales —{" "}
              <a
                href={siteConfig.companiesHouseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand-600 underline decoration-brand-300 underline-offset-2 hover:text-brand-700"
              >
                JLD Recruit Ltd (Company no. {siteConfig.companiesHouseNumber})
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Our Story"
                title="Recruitment that puts people first"
                align="left"
              />
              <div className="space-y-5 text-lg leading-relaxed text-navy-600">
                <p>
                  JLD Recruit Ltd was founded on a simple belief: recruitment
                  works best when it is personal. Business owners and hiring
                  managers deserve to deal directly with someone who understands
                  their sector, listens to their needs and takes ownership of
                  the process.
                </p>
                <p>
                  Led by {siteConfig.founder}, we help businesses find skilled,
                  reliable candidates through a straightforward, proactive
                  recruitment service. From independent garages and small
                  engineering firms to larger operators, we support employers
                  who need quality candidates without the overhead of a large
                  corporate agency.
                </p>
                <p>
                  Our focus is on automotive, engineering and technical
                  recruitment — sectors where understanding qualifications,
                  certifications and hands-on experience makes the difference
                  between a good hire and a great one.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-brand-200 bg-brand-50/50 p-8 card-shadow">
              <h2 className="text-xl font-bold text-navy-900">
                What sets us apart
              </h2>
              <ul className="mt-6 space-y-4">
                {[
                  "Direct access to James throughout the recruitment process",
                  "Proactive sourcing — we do not wait for applications",
                  "Deep sector knowledge in automotive and engineering",
                  "Honest, responsive communication at every stage",
                  "Fair, transparent fees without corporate markups",
                  "Support for hard-to-fill and specialist roles",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-navy-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="gradient-section py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Values"
            title="How we work with every client"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-brand-100 bg-white p-6 card-shadow transition-all hover:border-brand-300"
              >
                <h3 className="text-lg font-bold text-navy-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">
            Work with a recruiter you can trust
          </h2>
          <p className="mt-4 text-lg text-navy-600">
            Whether you are an employer looking to fill a role or a candidate
            searching for your next opportunity, we are here to help.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/contact" variant="primary">
              Get in Touch
            </Button>
            <Button href="/how-it-works" variant="outline">
              How It Works
            </Button>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
