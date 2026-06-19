import Link from "next/link";
import { SchemaScript } from "@/components/SchemaScript";
import { SectionHeading } from "@/components/SectionHeading";
import {
  siteConfig,
  ukWideRecruitmentSeo,
  ukWideServicesSeo,
} from "@/lib/constants";
import { getLocationPageLinks } from "@/lib/location-pages";
import { createMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema, getWebPageSchema } from "@/lib/schema";

export const metadata = createMetadata({
  title: "UK Coverage",
  description:
    "JLD Recruit Ltd provides specialist recruitment services across England, Scotland, Wales and Northern Ireland. UK-wide recruitment for lift engineering, fire & security, gate & door, refrigeration, automotive and HGV businesses.",
  path: "/uk-coverage",
  keywords: [
    "UK-wide engineering recruitment",
    "recruitment agency UK",
    "lift engineer recruitment London",
    "fire security recruitment UK",
    "vehicle technician recruitment UK",
  ],
});

const nations = [
  "England",
  "Scotland",
  "Wales",
  "Northern Ireland",
];

const majorCities = [
  "London",
  "Birmingham",
  "Manchester",
  "Leeds",
  "Bristol",
  "Glasgow",
  "Edinburgh",
  "Cardiff",
  "Belfast",
];

const locationGroups = [
  "Vehicle Technician",
  "HGV Technician",
  "Lift Engineer",
  "Fire & Security Engineer",
  "Refrigeration Engineer",
  "Gate Engineer",
] as const;

export default function UkCoveragePage() {
  const locationLinks = getLocationPageLinks();

  return (
    <>
      <SchemaScript
        data={[
          getWebPageSchema(
            "UK Coverage",
            `${ukWideServicesSeo} ${ukWideRecruitmentSeo}`,
            "/uk-coverage"
          ),
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "UK Coverage", url: "/uk-coverage" },
          ]),
        ]}
      />

      <section className="gradient-hero py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 eyebrow-pill">UK Coverage</p>
            <h1 className="text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              UK-wide recruitment coverage
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-navy-600">
              {ukWideServicesSeo}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-navy-600">
              {ukWideRecruitmentSeo}
            </p>
            <p className="mt-4 leading-relaxed text-navy-600">
              {siteConfig.legalName} works nationwide and is not limited to one
              region. We support employers and candidates across the whole of the
              United Kingdom through proactive sourcing, headhunting and personal
              recruitment support with direct access to James.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Nationwide"
                title="Where we recruit"
                align="left"
              />
              <p className="mt-4 leading-relaxed text-navy-600">
                We provide specialist recruitment support across all four nations
                of the United Kingdom:
              </p>
              <ul className="mt-6 space-y-3">
                {nations.map((nation) => (
                  <li key={nation} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-navy-700">{nation}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading
                eyebrow="Major Cities"
                title="Cities we regularly support"
                align="left"
              />
              <p className="mt-4 leading-relaxed text-navy-600">
                We recruit nationwide and regularly support businesses in major
                cities including:
              </p>
              <p className="mt-4 text-navy-700">
                {majorCities.join(", ")}.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-navy-600">
                This is not an exhaustive list — we work UK-wide across towns,
                cities and regions for permanent recruitment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="gradient-section py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Location Pages"
            title="Recruitment by location"
            description="Browse all location-focused recruitment pages. Each explains how we support employers in that area while working UK-wide."
          />
          <div className="space-y-12">
            {locationGroups.map((group) => {
              const links = locationLinks.filter((link) => link.role === group);
              if (links.length === 0) return null;

              return (
                <div key={group}>
                  <h2 className="text-lg font-bold text-navy-900">{group}</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {links.map((link) => (
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
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
