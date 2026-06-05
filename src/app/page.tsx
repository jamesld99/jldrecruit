import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { SectorCard } from "@/components/SectorCard";
import { CTASection } from "@/components/CTASection";
import { ContactSection } from "@/components/ContactSection";
import { CoverageAreas } from "@/components/CoverageAreas";
import { LinkedInUpdates } from "@/components/LinkedInUpdates";
import { RecruitmentSolutions } from "@/components/RecruitmentSolutions";
import { SchemaScript } from "@/components/SchemaScript";
import { TrustSignals } from "@/components/TrustSignals";
import { VacancyForm } from "@/components/VacancyForm";
import { faqs, sectors, siteConfig } from "@/lib/constants";
import { jobs } from "@/lib/jobs";
import { getFaqSchema, getWebPageSchema } from "@/lib/schema";

const featuredSectors = sectors.slice(0, 4);

export default function HomePage() {
  return (
    <>
      <SchemaScript
        data={[
          getWebPageSchema(
            siteConfig.heroHeadline,
            siteConfig.description,
            "/"
          ),
          getFaqSchema(faqs),
        ]}
      />

      <section className="gradient-hero relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-brand-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-40 h-80 w-80 rounded-full bg-brand-400/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-4 eyebrow-pill">
                Family-run UK recruitment agency
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl lg:leading-[1.1]">
                {siteConfig.heroHeadline}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-navy-600 sm:text-xl">
                {siteConfig.heroSubheadline}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button href="/jobs" variant="primary">
                  View Current Jobs
                </Button>
                <Button href="/employers" variant="outline">
                  Employer Services
                </Button>
              </div>
              <p className="mt-6 text-sm font-medium text-brand-600">
                Direct access to James &middot; No call centres &middot;
                Headhunting included
              </p>
            </div>
            <VacancyForm />
          </div>
        </div>
      </section>

      <TrustSignals />

      <RecruitmentSolutions
        introDescription="Permanent recruitment is our core service. We also provide temporary and contract solutions when you need flexibility."
      />

      <LinkedInUpdates jobs={jobs} />

      <section className="gradient-section py-20 lg:py-28" aria-labelledby="key-sectors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Key Sectors"
            title="Sectors we recruit for"
            description="Specialist recruitment across automotive, fire & security, lift, door engineering and technical roles."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredSectors.map((sector) => (
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

      <CoverageAreas />

      <section className="py-20 lg:py-28" aria-labelledby="candidate-support">
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
              We help skilled candidates find permanent roles in automotive,
              engineering and technical sectors. Free service — speak directly
              with James.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/jobs" variant="primary">
                Browse Current Jobs
              </Button>
              <Button href="/job-seekers" variant="outline">
                Job Seeker Information
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
      <CTASection />
    </>
  );
}
