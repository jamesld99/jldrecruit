import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { RecruitmentSolutions } from "@/components/RecruitmentSolutions";
import { SchemaScript } from "@/components/SchemaScript";
import { WhyChooseSection } from "@/components/WhyChooseSection";
import {
  employerBenefits,
  employerFaqs,
  permanentOnlyMessage,
  placementStories,
  processSteps,
  services,
  siteConfig,
  ukWideRecruitmentSeo,
  ukWideServicesSeo,
} from "@/lib/constants";
import { permanentRoles } from "@/lib/services";
import { createMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema, getWebPageSchema } from "@/lib/schema";

export const metadata = createMetadata({
  title: "Employers",
  description:
    `${ukWideServicesSeo} JLD Recruit Ltd is a permanent recruitment agency helping UK businesses hire lift engineers, fire & security engineers, gate & door engineers, refrigeration engineers and automotive & HGV technicians.`,
  path: "/employers",
  keywords: [
    "permanent recruitment agency",
    "fixed fee recruitment",
    "lift engineer recruitment",
    "fire and security recruitment",
    "engineering recruitment agency",
    "UK-wide engineering recruitment",
  ],
});

export default function EmployersPage() {
  return (
    <>
      <SchemaScript
        data={[
          getWebPageSchema(
            "Employer Recruitment Services",
            "Permanent recruitment for lift engineering, fire & security, gate & door, refrigeration and automotive & HGV roles UK-wide.",
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
              Permanent recruitment support for businesses that need results
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-navy-600">
              JLD Recruit Ltd is a permanent recruitment agency giving employers
              proactive sourcing, headhunting, screening and long-term hiring
              support across lift engineering, fire & security, gate & door,
              refrigeration and automotive & HGV sectors. {ukWideServicesSeo}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-navy-600">
              {ukWideRecruitmentSeo}
            </p>
            <p className="mt-4 text-sm font-semibold text-brand-700">
              {permanentOnlyMessage}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href="/contact" variant="primary">
                Submit Vacancy
              </Button>
              <Button href="/contact" variant="outline">
                Hire Staff
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="gradient-section py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How It Works"
            title="A straightforward recruitment process"
            description="Submit your vacancy, receive a quality shortlist and hire with support throughout — you deal directly with James at every stage."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step) => (
              <article
                key={step.step}
                className="rounded-2xl border border-brand-100 bg-white p-6 card-shadow"
              >
                <p className="text-sm font-bold text-brand-600">{step.step}</p>
                <h3 className="mt-3 text-lg font-bold text-navy-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/how-it-works" variant="outline">
              See full process
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Recent Placements"
            title="Examples of how we help employers"
            description="Anonymised examples of permanent placements delivered through proactive sourcing and headhunting."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {placementStories.map((story) => (
              <article
                key={story.title}
                className="rounded-2xl border border-brand-100 bg-white p-6 card-shadow"
              >
                <h3 className="text-lg font-bold text-navy-900">{story.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-600">
                  {story.summary}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Recruitment Solutions"
            title="Permanent recruitment services for your business"
            description="Fixed-fee, exclusive and retained permanent recruitment with proactive headhunting and direct access to James."
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
              operations manager struggling to fill a specialist role — we
              understand the pressure of an unfilled vacancy.
            </p>
            <p>
              As a specialist permanent recruitment agency, we do not wait for
              applications to arrive. We proactively source candidates through
              headhunting, LinkedIn outreach, CV Library searches, job board
              advertising and local candidate attraction.
            </p>
            <p>
              You deal directly with {siteConfig.founder} throughout the
              process. No account managers, no hand-offs, no corporate
              bureaucracy — just honest communication and a focus on skilled
              permanent hires.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Typical Roles"
            title="Permanent roles we recruit for"
            description="Skilled permanent hires across engineering, technical and automotive sectors UK-wide."
          />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {permanentRoles.map((role) => (
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
            description="Everything you need to find, assess and hire skilled permanent candidates."
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

      <WhyChooseSection />

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
            Ready to fill your next permanent role?
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
        items={employerFaqs}
        title="Employer FAQs"
        description="Common questions from businesses looking for permanent engineering and technical recruitment support."
      />
      <CTASection
        primaryLabel="Submit Vacancy"
        secondaryLabel="Speak to James"
      />
    </>
  );
}
