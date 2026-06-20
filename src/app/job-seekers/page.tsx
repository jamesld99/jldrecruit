import { EnquiryForms } from "@/components/EnquiryForms";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { SchemaScript } from "@/components/SchemaScript";
import { candidateBenefits, permanentOnlyMessage, primarySectors, siteConfig, ukWideMessage } from "@/lib/constants";
import { isCvUploadAvailable } from "@/lib/enquiry";
import { createMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema, getWebPageSchema } from "@/lib/schema";

export const metadata = createMetadata({
  title: "Job Seekers",
  description:
    "JLD Recruit Ltd helps skilled candidates find permanent roles in lift engineering, fire & security, gate & door, refrigeration and automotive & HGV sectors UK-wide. Free service — speak directly with James.",
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
            "Find permanent roles in lift engineering, fire & security, gate & door, refrigeration and automotive & HGV sectors with JLD Recruit Ltd.",
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
              Find your next role in lift, fire & security, gate & door,
              refrigeration and automotive & HGV sectors
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-navy-600">
              JLD Recruit Ltd connects skilled candidates with suitable permanent
              roles across the UK. Whether you are a lift engineer, fire & security
              engineer, gate & door engineer, refrigeration engineer, vehicle
              technician or HGV mechanic — we help match your skills with the right
              opportunity. {ukWideMessage}
            </p>
            <p className="mt-4 text-sm font-medium text-brand-600">
              {permanentOnlyMessage} We place candidates in permanent roles only.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href="/jobs" variant="primary">
                View Jobs
              </Button>
              <Button href="/contact#candidates" variant="outline">
                Send CV
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
              At JLD Recruit Ltd, you speak directly with {siteConfig.founder}.
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
              We work across lift engineering, fire & security, gate & door,
              refrigeration, automotive and HGV sectors — placing candidates in
              roles ranging from lift service engineers and fire alarm engineers
              to gate engineers, refrigeration engineers, vehicle technicians and
              HGV mechanics UK-wide.
            </p>
          </div>
        </div>
      </section>

      <section className="gradient-section py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Your Benefits"
            title="Why register with JLD Recruit Ltd"
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
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {primarySectors.map((sector) => (
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
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Register"
            title="Send your CV"
            description="Upload your CV and tell us what you are looking for. James will review your details and be in touch when a suitable permanent role comes up."
            align="center"
          />
          <div className="rounded-2xl border border-brand-200 bg-white p-6 card-shadow sm:p-8">
            <EnquiryForms
              defaultTab="candidate"
              cvUploadAvailable={isCvUploadAvailable()}
            />
          </div>
        </div>
      </section>

      <CTASection
        title="Looking for your next role?"
        description="Get in touch with James to discuss suitable opportunities in your sector."
        primaryLabel="View Jobs"
        primaryHref="/jobs"
        secondaryLabel="Speak to James"
      />
    </>
  );
}
