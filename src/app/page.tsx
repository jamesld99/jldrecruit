import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { SectorCard } from "@/components/SectorCard";
import { CTASection } from "@/components/CTASection";
import { LinkedInUpdates } from "@/components/LinkedInUpdates";
import { RecruitmentSolutions } from "@/components/RecruitmentSolutions";
import { SchemaScript } from "@/components/SchemaScript";
import { WhyChooseSection } from "@/components/WhyChooseSection";
import { VacancyForm } from "@/components/VacancyForm";
import { faqs, primarySectors, siteConfig, ukWideMessage } from "@/lib/constants";
import { jobs } from "@/lib/jobs";
import { getFaqSchema, getWebPageSchema } from "@/lib/schema";

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
                UK-wide specialist recruitment agency
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl lg:leading-[1.1]">
                {siteConfig.heroHeadline}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-navy-600 sm:text-xl">
                {siteConfig.heroSubheadline}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button href="/contact" variant="primary">
                  Submit Vacancy
                </Button>
                <Button href="/jobs" variant="outline">
                  View Jobs
                </Button>
              </div>
              <p className="mt-6 text-sm font-medium text-brand-600">
                {ukWideMessage} Direct access to James &middot; Headhunting included
              </p>
            </div>
            <VacancyForm />
          </div>
        </div>
      </section>

      <section className="gradient-section py-20 lg:py-28" aria-labelledby="key-sectors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Key Sectors"
            title="Sectors we recruit for"
            description="Specialist recruitment for lift engineering, fire & security, gate & door, refrigeration & HVAC and automotive & HGV across the United Kingdom."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {primarySectors.map((sector) => (
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

      <WhyChooseSection />

      <RecruitmentSolutions
        introDescription="Permanent recruitment is our core service. We also provide temporary and contract solutions when you need flexibility."
      />

      <LinkedInUpdates jobs={jobs} />

      <CTASection
        primaryLabel="Submit Vacancy"
        secondaryLabel="Hire Staff"
      />
    </>
  );
}
