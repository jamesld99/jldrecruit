import Link from "next/link";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { SectorCard } from "@/components/SectorCard";
import { CTASection } from "@/components/CTASection";
import { SchemaScript } from "@/components/SchemaScript";
import {
  additionalSectors,
  otherSectors,
  primarySectors,
  siteConfig,
} from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema, getWebPageSchema } from "@/lib/schema";

export const metadata = createMetadata({
  title: "Sectors",
  description:
    "JLD Recruit Ltd specialises in lift engineering, fire & security, gate & door, refrigeration and automotive & HGV recruitment across the UK.",
  path: "/sectors",
  keywords: [
    "lift engineer recruitment",
    "fire and security engineer recruitment",
    "gate engineer recruitment",
    "refrigeration engineer recruitment",
    "automotive recruitment agency",
    "HGV technician recruitment",
  ],
});

const recruitmentLinks = [
  { label: "Lift Engineer Recruitment", href: "/recruitment/lift-engineer-recruitment" },
  { label: "Fire & Security Recruitment", href: "/recruitment/fire-security-recruitment" },
  { label: "Gate & Door Recruitment", href: "/recruitment/gate-door-recruitment" },
  { label: "Refrigeration Recruitment", href: "/recruitment/refrigeration-recruitment" },
  { label: "Automotive Recruitment", href: "/recruitment/automotive-recruitment" },
  { label: "Vehicle Technician Recruitment", href: "/recruitment/vehicle-technician-recruitment" },
];

export default function SectorsPage() {
  return (
    <>
      <SchemaScript
        data={[
          getWebPageSchema(
            "Recruitment Sectors",
            "Specialist lift, fire & security, gate & door, refrigeration and automotive recruitment across the UK.",
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
            <p className="mb-4 eyebrow-pill">Sectors</p>
            <h1 className="text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              Specialist recruitment for lift, fire & security, gate & door,
              refrigeration and automotive engineering
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-navy-600">
              {siteConfig.name} is a specialist engineering recruitment agency.
              Our primary focus is lift engineering, fire & security, gate & door,
              refrigeration & HVAC, and automotive & HGV — with additional
              support available in other industries.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Primary Sectors"
            title="Core sectors we recruit for"
            description="Permanent recruitment is our core service across these specialist engineering sectors."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {primarySectors.map((sector) => (
              <SectorCard key={sector.slug} sector={sector} />
            ))}
          </div>
        </div>
      </section>

      {otherSectors.length > 0 && (
        <section className="gradient-section py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Other Technical Sectors"
              title="Additional engineering sectors"
              description="We also support recruitment across these technical sectors."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherSectors.map((sector) => (
                <SectorCard key={sector.slug} sector={sector} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Other Industries We Support"
            title="Additional sectors"
            description="Temporary and contract staffing available in construction and healthcare — alongside our core engineering recruitment specialisms."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {additionalSectors.map((sector) => (
              <SectorCard key={sector.slug} sector={sector} />
            ))}
          </div>
        </div>
      </section>

      <section className="gradient-section py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Specialist Recruitment"
            title="Dedicated recruitment pages"
            description="In-depth recruitment support for our core sectors."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recruitmentLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl border border-brand-100 bg-white p-5 text-sm font-semibold text-brand-700 transition-all hover:border-brand-300 hover:card-shadow"
              >
                {link.label} &rarr;
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">
            Need to hire an engineer or technician?
          </h2>
          <p className="mt-4 text-lg text-navy-600">
            Submit your vacancy or speak directly with James about your hiring requirements.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/contact" variant="primary">
              Submit Vacancy
            </Button>
            <Button href="/employers" variant="outline">
              Hire Staff
            </Button>
          </div>
        </div>
      </section>

      <CTASection
        primaryLabel="Submit Vacancy"
        secondaryLabel="Speak to James"
      />
    </>
  );
}
