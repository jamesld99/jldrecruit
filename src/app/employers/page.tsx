import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { RecruitmentSolutions } from "@/components/RecruitmentSolutions";
import { SchemaScript } from "@/components/SchemaScript";
import { TemporarySpecialist } from "@/components/TemporarySpecialist";
import {
  employerBenefits,
  faqs,
  services,
  siteConfig,
} from "@/lib/constants";
import {
  employerContractContent,
  employerConstructionHealthcareContent,
  employerTemporaryContent,
  temporaryContractRoles,
} from "@/lib/services";
import { createMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema, getWebPageSchema } from "@/lib/schema";

export const metadata = createMetadata({
  title: "Employers",
  description:
    "JLD Recruit Ltd helps UK businesses with permanent, temporary and contract recruitment across automotive, engineering and technical sectors. Proactive sourcing, headhunting and flexible staffing solutions.",
  path: "/employers",
  keywords: [
    "recruitment support for garages",
    "recruitment support for engineering companies",
    "permanent recruitment",
    "temporary recruitment agency",
    "contract recruitment agency",
    "temporary staffing solutions",
    "engineering recruitment agency",
    "automotive recruitment agency",
    "recruitment solutions",
  ],
});

export default function EmployersPage() {
  return (
    <>
      <SchemaScript
        data={[
          getWebPageSchema(
            "Employer Recruitment Services",
            "Permanent, temporary and contract recruitment support for UK businesses hiring automotive, engineering and technical staff.",
            "/employers"
          ),
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Employers", url: "/employers" },
          ]),
        ]}
      />

      <section className="gradient-hero py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 eyebrow-pill">For Employers</p>
            <h1 className="text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              Recruitment support for businesses that need results
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-navy-600">
              Permanent recruitment is at the heart of what we do. JLD Recruit Ltd
              also provides temporary and contract recruitment solutions — giving
              employers proactive sourcing, headhunting, screening and flexible
              staffing support across automotive, engineering and technical sectors.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href="/contact" variant="primary">
                Discuss Your Hiring Needs
              </Button>
              <Button href="/contact" variant="outline">
                Request Staff
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Recruitment Solutions"
            title="Flexible recruitment services for your business"
            description="Permanent recruitment is our primary focus. We also offer temporary and contract solutions for employers who need additional flexibility."
          />
          <RecruitmentSolutions embedded showIntro={false} />
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The Challenge"
            title="When standard recruitment is not enough"
            description="Job boards alone rarely deliver the skilled candidates you need. We combine multiple sourcing methods to reach people who are not actively applying."
          />
          <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-navy-600">
            <p>
              Whether you are a garage owner looking for a qualified MOT tester,
              an engineering company searching for a lift engineer, or an
              operations manager struggling to fill a field service role — we
              understand the pressure of an unfilled vacancy.
            </p>
            <p>
              As a specialist engineering recruitment agency and automotive
              recruitment agency, we do not wait for applications to arrive. We
              proactively source candidates through headhunting, LinkedIn outreach,
              CV Library searches, job board advertising and local candidate
              attraction.
            </p>
            <p>
              You deal directly with {siteConfig.founder} throughout the
              process. No account managers, no hand-offs, no corporate
              bureaucracy — just honest communication and a focus on results.
            </p>
          </div>
        </div>
      </section>

      <section className="gradient-section py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <article className="rounded-2xl border border-brand-100 bg-white p-8 card-shadow">
              <p className="mb-3 eyebrow-pill">Additional Service</p>
              <h2 className="text-2xl font-bold text-navy-900">
                {employerTemporaryContent.title}
              </h2>
              <div className="mt-4 space-y-4 text-navy-600">
                {employerTemporaryContent.paragraphs.map((p) => (
                  <p key={p.slice(0, 30)} className="leading-relaxed">{p}</p>
                ))}
              </div>
              <div className="mt-6">
                <Button href="/services/temporary-recruitment" variant="outline">
                  Temporary Recruitment
                </Button>
              </div>
            </article>
            <article className="rounded-2xl border border-brand-100 bg-white p-8 card-shadow">
              <p className="mb-3 eyebrow-pill">Additional Service</p>
              <h2 className="text-2xl font-bold text-navy-900">
                {employerContractContent.title}
              </h2>
              <div className="mt-4 space-y-4 text-navy-600">
                {employerContractContent.paragraphs.map((p) => (
                  <p key={p.slice(0, 30)} className="leading-relaxed">{p}</p>
                ))}
              </div>
              <div className="mt-6">
                <Button href="/services/contract-recruitment" variant="outline">
                  Contract Recruitment
                </Button>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="gradient-section py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <TemporarySpecialist />
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Additional Sectors"
            title="Construction and healthcare temporary & contract staffing"
            description="Alongside our core automotive and engineering recruitment, we also provide temporary and contract staffing in construction and healthcare."
          />
          <div className="grid gap-8 lg:grid-cols-2">
            {[employerConstructionHealthcareContent.construction, employerConstructionHealthcareContent.healthcare].map((sector) => (
              <article
                key={sector.title}
                className="rounded-2xl border border-brand-100 bg-white p-8 card-shadow"
              >
                <span className="mb-3 inline-flex rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
                  Temporary &amp; Contract
                </span>
                <h3 className="text-xl font-bold text-navy-900">{sector.title}</h3>
                <p className="mt-3 leading-relaxed text-navy-600">{sector.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {sector.roles.map((role) => (
                    <li
                      key={role}
                      className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 ring-1 ring-brand-100"
                    >
                      {role}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Typical Roles"
            title="Temporary and contract roles we supply"
            description="Skilled professionals available for temporary cover and contract assignments across multiple sectors."
          />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {temporaryContractRoles.map((role) => (
              <li
                key={role}
                className="flex items-center gap-3 rounded-xl border border-brand-100 bg-brand-50/50 px-4 py-3"
              >
                <svg className="h-5 w-5 shrink-0 text-brand-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-sm font-medium text-navy-800">{role}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="gradient-section py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We Offer"
            title="Full employer recruitment services"
            description="Everything you need to find, assess and hire skilled candidates — permanently or flexibly."
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li
                key={service}
                className="flex items-start gap-3 rounded-2xl border border-brand-100 bg-brand-50/50 p-5 card-shadow"
              >
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="font-medium text-navy-800">{service}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Work With Us"
            title="Recruitment that works for business owners"
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {employerBenefits.map((benefit) => (
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

      <section className="gradient-section py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">
            Ready to fill your next role?
          </h2>
          <p className="mt-4 text-lg text-navy-600">
            Send us your vacancy details and we will respond promptly to discuss
            how we can help. Call{" "}
            <a
              href={`tel:${siteConfig.phone}`}
              className="font-semibold text-brand-600 hover:underline"
            >
              {siteConfig.phoneDisplay}
            </a>{" "}
            or use our{" "}
            <a href="/contact" className="font-semibold text-brand-600 hover:underline">
              contact form
            </a>
            .
          </p>
        </div>
      </section>

      <FAQ
        items={faqs.slice(0, 7)}
        title="Employer FAQs"
        description="Common questions from businesses looking for recruitment support."
      />
      <CTASection
        primaryLabel="Discuss Your Hiring Needs"
        secondaryLabel="Request Staff"
      />
    </>
  );
}
