import Link from "next/link";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { SectorCard } from "@/components/SectorCard";
import { CTASection } from "@/components/CTASection";
import { ContactSection } from "@/components/ContactSection";
import { FAQ } from "@/components/FAQ";
import { RecruitmentSolutions } from "@/components/RecruitmentSolutions";
import { SchemaScript } from "@/components/SchemaScript";
import {
  faqs,
  processSteps,
  sectors,
  services,
  siteConfig,
  whoWeHelp,
  whyChooseUs,
} from "@/lib/constants";
import { flexibleRecruitmentContent } from "@/lib/services";
import { getFaqSchema, getWebPageSchema } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <SchemaScript
        data={[
          getWebPageSchema(
            siteConfig.tagline,
            siteConfig.description,
            "/"
          ),
          getFaqSchema(faqs),
        ]}
      />

      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-brand-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-40 h-80 w-80 rounded-full bg-brand-400/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 eyebrow-pill">
              Family-run UK recruitment agency
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl lg:text-6xl lg:leading-[1.1]">
              Specialist Recruitment for{" "}
              <span className="text-highlight">
                Automotive, Engineering
              </span>{" "}
              and Technical Businesses
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy-600 sm:text-xl">
              JLD Recruit LTD helps businesses find skilled, reliable candidates
              through a personal, proactive and straightforward recruitment
              service — with permanent recruitment at the core, plus temporary
              and contract solutions when you need flexibility.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" variant="primary">
                Book a Recruitment Call
              </Button>
              <Button href="/contact" variant="outline">
                Send Us a Vacancy
              </Button>
            </div>
            <p className="mt-8 text-sm font-medium text-brand-600">
              Direct access to James &middot; No corporate layers &middot;
              Results-focused
            </p>
          </div>
        </div>
      </section>

      {/* Who We Help */}
      <section className="py-20 lg:py-28" aria-labelledby="who-we-help">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Who We Help"
            title="Recruitment support for business leaders and hiring managers"
            description="We work with decision-makers who need reliable recruitment support without the complexity of a large corporate agency."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whoWeHelp.map((item, index) => (
              <article
                key={item.title}
                className="card-accent-top rounded-2xl p-6 card-shadow transition-all hover:-translate-y-1 hover:border-brand-300 hover:card-shadow-hover"
              >
                <div className="icon-circle-sm mb-4">
                  <span className="text-sm font-bold">{index + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-navy-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment Solutions */}
      <RecruitmentSolutions />

      {/* Flexible Recruitment */}
      <section className="gradient-section py-20 lg:py-28" aria-labelledby="flexible-recruitment">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 eyebrow-pill">{flexibleRecruitmentContent.eyebrow}</p>
            <h2
              id="flexible-recruitment"
              className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl"
            >
              {flexibleRecruitmentContent.title}
            </h2>
            {flexibleRecruitmentContent.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 30)} className="mt-4 text-lg leading-relaxed text-navy-600">
                {paragraph}
              </p>
            ))}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" variant="primary">
                {flexibleRecruitmentContent.primaryCta}
              </Button>
              <Button href="/contact" variant="outline">
                {flexibleRecruitmentContent.secondaryCta}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Sectors */}
      <section className="gradient-section py-20 lg:py-28" aria-labelledby="key-sectors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Key Sectors"
            title="Sectors we recruit for"
            description="As a specialist automotive and engineering recruitment agency, we cover the technical roles that matter most to your business."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((sector) => (
              <SectorCard key={sector.slug} sector={sector} compact />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/sectors" variant="outline">
              View All Sectors
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28" aria-labelledby="why-choose">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Choose JLD Recruit LTD"
            title="Personal recruitment that delivers results"
            description="We are not a large corporate agency. You deal directly with James — honest, responsive and focused on finding the right candidate."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-brand-100 bg-white p-6 card-shadow transition-all hover:border-brand-300 hover:card-shadow-hover"
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

      {/* How It Works */}
      <section className="gradient-section py-20 lg:py-28" aria-labelledby="how-it-works">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How It Works"
            title="How the recruitment process works"
            description="A straightforward process designed to save you time and deliver quality candidates."
          />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <article
                key={step.step}
                className="rounded-2xl border border-brand-100 bg-white/80 p-6 backdrop-blur-sm"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-lg font-bold text-white shadow-md shadow-brand-500/30">
                  {step.step}
                </span>
                <h3 className="mt-2 text-lg font-bold text-navy-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/how-it-works"
              className="text-sm font-semibold text-brand-600 hover:text-brand-500"
            >
              Learn more about our process &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Employer Services */}
      <section className="py-20 lg:py-28" aria-labelledby="employer-services">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Employer Services"
                title="Permanent recruitment and flexible staffing support"
                description="Permanent recruitment is our core service. We also provide temporary and contract recruitment solutions for businesses that need additional flexibility."
                align="left"
              />
              <Button href="/employers" variant="primary">
                Employer Services
              </Button>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {services.map((service) => (
                <li
                  key={service}
                  className="flex items-start gap-3 rounded-xl border border-brand-100 bg-brand-50/50 p-4 transition-colors hover:border-brand-300 hover:bg-brand-50"
                >
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-sm font-medium text-navy-800">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Candidate Support */}
      <section className="gradient-section py-20 lg:py-28" aria-labelledby="candidate-support">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-3xl border border-brand-200 bg-white p-10 text-center card-shadow sm:p-12">
            <p className="mb-4 eyebrow-pill">Candidate Support</p>
            <h2
              id="candidate-support"
              className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl"
            >
              Looking for your next role?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-navy-600">
              JLD Recruit LTD helps skilled candidates find suitable permanent
              roles in automotive, engineering and technical sectors. Our service
              is free for candidates — you speak directly with James throughout
              the process.
            </p>
            <div className="mt-8">
              <Button href="/job-seekers" variant="primary">
                Job Seeker Information
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
      <FAQ items={faqs} />
      <CTASection />
    </>
  );
}
