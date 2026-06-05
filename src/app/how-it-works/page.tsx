import Link from "next/link";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { SchemaScript } from "@/components/SchemaScript";
import { processSteps, services, siteConfig } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema, getWebPageSchema } from "@/lib/schema";

export const metadata = createMetadata({
  title: "How It Works",
  description:
    "Learn how JLD Recruit Ltd's recruitment process works — from understanding your vacancy to sourcing, shortlisting, interviewing and placement. Simple, proactive and effective.",
  path: "/how-it-works",
  keywords: [
    "recruitment process",
    "permanent recruitment",
    "headhunting for engineers",
    "candidate sourcing",
  ],
});

export default function HowItWorksPage() {
  return (
    <>
      <SchemaScript
        data={[
          getWebPageSchema(
            "How It Works",
            "A straightforward recruitment process for automotive, engineering and technical roles.",
            "/how-it-works"
          ),
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "How It Works", url: "/how-it-works" },
          ]),
        ]}
      />

      <section className="gradient-hero py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 eyebrow-pill">
              How It Works
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              A straightforward recruitment process that delivers results
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-navy-600">
              We keep recruitment simple so you can focus on running your
              business. Whether you are hiring or job seeking, our process is
              designed to be clear, efficient and focused on finding the right
              match.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The Process"
            title="Four steps from vacancy to placement"
            description="Every recruitment assignment follows a clear, proven process — with regular communication throughout."
          />
          <div className="grid gap-8 md:grid-cols-2">
            {processSteps.map((step, index) => (
              <article
                key={step.step}
                className="relative rounded-2xl border border-brand-100 bg-white p-8 card-shadow"
              >
                <div className="mb-4 flex items-center gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-lg font-bold text-white shadow-md shadow-brand-500/30">
                    {step.step}
                  </span>
                  {index < processSteps.length - 1 && (
                    <div className="hidden h-px flex-1 bg-navy-100 md:block" />
                  )}
                </div>
                <h2 className="text-xl font-bold text-navy-900">{step.title}</h2>
                <p className="mt-3 leading-relaxed text-navy-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="gradient-section py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Methods"
            title="How we find the right candidates"
            description="We use a combination of proactive sourcing methods to reach candidates who are not always visible on job boards."
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li
                key={service}
                className="flex items-start gap-3 rounded-xl border border-brand-100 bg-brand-50/50 p-5 card-shadow"
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
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">
                For employers
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-navy-600">
                Send us your vacancy details by phone, email or our contact
                form. We will discuss your requirements, agree on the approach
                and begin sourcing immediately. You receive regular updates and
                a carefully screened shortlist — not a pile of unsuitable CVs.
              </p>
              <div className="mt-6">
                <Button href="/employers" variant="primary">
                  Employer Services
                </Button>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">
                For job seekers
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-navy-600">
                Register your interest by sending your CV or getting in touch.
                We will discuss your skills, experience and what you are looking
                for, then match you with suitable opportunities as they arise.
                Our service is free for candidates.
              </p>
              <div className="mt-6">
                <Button href="/job-seekers" variant="outline">
                  Job Seeker Information
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="gradient-section py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">
            Ready to get started?
          </h2>
          <p className="mt-4 text-lg text-navy-600">
            Contact {siteConfig.founder} directly on{" "}
            <a
              href={`tel:${siteConfig.phone}`}
              className="font-semibold text-brand-600 hover:underline"
            >
              {siteConfig.phoneDisplay}
            </a>{" "}
            or visit our{" "}
            <Link href="/contact" className="font-semibold text-brand-600 hover:underline">
              contact page
            </Link>
            .
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
