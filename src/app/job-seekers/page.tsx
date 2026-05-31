import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { SchemaScript } from "@/components/SchemaScript";
import { candidateBenefits, sectors, siteConfig } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema, getWebPageSchema } from "@/lib/schema";

export const metadata = createMetadata({
  title: "Job Seekers",
  description:
    "JLD Recruit LTD helps skilled candidates find permanent roles in automotive, engineering and technical sectors across the UK. Free service — speak directly with James.",
  path: "/job-seekers",
  keywords: [
    "automotive jobs UK",
    "engineering jobs",
    "vehicle technician jobs",
    "technical recruitment",
  ],
});

export default function JobSeekersPage() {
  return (
    <>
      <SchemaScript
        data={[
          getWebPageSchema(
            "Job Seekers",
            "Find permanent roles in automotive, engineering and technical sectors with JLD Recruit LTD.",
            "/job-seekers"
          ),
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Job Seekers", url: "/job-seekers" },
          ]),
        ]}
      />

      <section className="gradient-hero py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 eyebrow-pill">
              For Job Seekers
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              Find your next role in automotive, engineering and technical sectors
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-navy-600">
              JLD Recruit LTD connects skilled candidates with suitable permanent
              roles across the UK. Whether you are a vehicle technician, MOT
              tester, lift engineer or field service specialist — we help match
              your skills with the right opportunity.
            </p>
            <div className="mt-8">
              <Button href="/contact" variant="primary">
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How We Help"
            title="A personal approach to finding the right role"
            description="You are not just a CV in a database. We take time to understand your skills, experience and what you are looking for."
          />
          <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-navy-600">
            <p>
              At JLD Recruit LTD, you speak directly with {siteConfig.founder}.
              There are no junior consultants or automated systems — just honest,
              straightforward guidance to help you find a role that genuinely
              suits your skills and career goals.
            </p>
            <p>
              Our service is completely free for candidates. We are paid by
              employers when a successful placement is made, which means our
              focus is always on finding the right match for both parties.
            </p>
            <p>
              We work across automotive, engineering and technical sectors,
              placing candidates in roles ranging from vehicle technicians and
              HGV mechanics to fire and security engineers, lift engineers,
              refrigeration and HVAC specialists, and field service engineers.
            </p>
          </div>
        </div>
      </section>

      <section className="gradient-section py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Your Benefits"
            title="Why register with JLD Recruit LTD"
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {candidateBenefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-2xl border border-brand-100 bg-white p-6 card-shadow transition-all hover:border-brand-300"
              >
                <h3 className="text-lg font-bold text-navy-900">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Sectors"
            title="Roles we recruit for"
            description="We specialise in skilled technical and engineering positions across these sectors."
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((sector) => (
              <li
                key={sector.slug}
                className="rounded-xl border border-brand-100 bg-brand-50/50 p-4 card-shadow"
              >
                <h3 className="font-semibold text-navy-900">{sector.title}</h3>
                <p className="mt-1 text-sm text-navy-600">
                  {sector.roles.slice(0, 2).join(", ")} and more
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Button href="/sectors" variant="outline">
              View All Sectors
            </Button>
          </div>
        </div>
      </section>

      <section className="gradient-section py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">
            Ready to explore new opportunities?
          </h2>
          <p className="mt-4 text-lg text-navy-600">
            Send us your CV or get in touch to discuss what you are looking for.
            Email{" "}
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
          <div className="mt-8">
            <Button href="/contact" variant="primary">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <CTASection
        title="Looking for your next role?"
        description="Get in touch with James to discuss suitable opportunities in your sector."
        primaryLabel="Get in Touch"
        secondaryLabel="View Sectors"
        secondaryHref="/sectors"
      />
    </>
  );
}
