import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { SectorCard } from "@/components/SectorCard";
import { CTASection } from "@/components/CTASection";
import { ContactSection } from "@/components/ContactSection";
import { RecruitmentSolutions } from "@/components/RecruitmentSolutions";
import { SchemaScript } from "@/components/SchemaScript";
import { sectors, siteConfig } from "@/lib/constants";
import { getWebPageSchema } from "@/lib/schema";

const featuredSectors = sectors.slice(0, 4);

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
        ]}
      />

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
              {siteConfig.name} helps businesses find skilled candidates through
              a personal, proactive recruitment service — with permanent
              recruitment at the core.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" variant="primary">
                Book a Recruitment Call
              </Button>
              <Button href="/employers" variant="outline">
                Employer Services
              </Button>
            </div>
            <p className="mt-8 text-sm font-medium text-brand-600">
              Direct access to James &middot; No corporate layers &middot;
              Results-focused
            </p>
          </div>
        </div>
      </section>

      <RecruitmentSolutions
        introDescription="Permanent recruitment is our core service. We also provide temporary and contract solutions when you need flexibility."
      />

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
            <div className="mt-8">
              <Button href="/job-seekers" variant="primary">
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
