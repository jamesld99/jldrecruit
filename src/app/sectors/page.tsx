import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { SectorCard } from "@/components/SectorCard";
import { CTASection } from "@/components/CTASection";
import { SchemaScript } from "@/components/SchemaScript";
import { sectors, siteConfig } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema, getWebPageSchema } from "@/lib/schema";

export const metadata = createMetadata({
  title: "Sectors",
  description:
    "JLD Recruit LTD recruits across automotive, engineering and technical sectors, with temporary and contract staffing also available in construction and healthcare across the UK.",
  path: "/sectors",
  keywords: [
    "automotive recruitment agency",
    "vehicle technician recruitment",
    "MOT tester recruitment",
    "HGV technician recruitment",
    "fire and security engineer recruitment",
    "lift engineer recruitment",
    "refrigeration engineer recruitment",
    "engineering recruitment agency",
    "temporary construction staff",
    "temporary healthcare staff",
  ],
});

export default function SectorsPage() {
  return (
    <>
      <SchemaScript
        data={[
          getWebPageSchema(
            "Recruitment Sectors",
            "Specialist recruitment across automotive, engineering and technical sectors in the UK.",
            "/sectors"
          ),
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Sectors", url: "/sectors" },
          ]),
        ]}
      />

      <section className="gradient-hero py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 eyebrow-pill">
              Sectors
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              Specialist recruitment across automotive, engineering and technical
              sectors
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-navy-600">
              {siteConfig.name} is a technical recruitment agency with deep
              sector knowledge. We specialise in permanent recruitment across
              automotive, engineering and technical sectors, and also provide
              temporary and contract staffing in construction and healthcare.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Sectors"
            title="Key sectors we recruit for"
            description="Permanent recruitment is our core focus across automotive, engineering and technical sectors. Construction and healthcare are available for temporary and contract staffing."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {sectors.map((sector) => (
              <SectorCard key={sector.slug} sector={sector} />
            ))}
          </div>
        </div>
      </section>

      <section className="gradient-section py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">
              Need to hire in one of these sectors?
            </h2>
            <p className="mt-4 text-lg text-navy-600">
              Whether you are filling a single vacancy or building a team, we
              provide proactive recruitment support tailored to your sector and
              requirements.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" variant="primary">
                Book a Recruitment Call
              </Button>
              <Button href="/employers" variant="outline">
                Employer Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
