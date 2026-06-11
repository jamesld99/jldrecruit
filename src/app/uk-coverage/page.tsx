import Link from "next/link";
import { SchemaScript } from "@/components/SchemaScript";
import { SectionHeading } from "@/components/SectionHeading";
import {
  siteConfig,
  ukWideRecruitmentSeo,
  ukWideServicesSeo,
} from "@/lib/constants";
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

const locationLinks = [
  {
    label: "Lift Engineer Recruitment — London",
    href: "/locations/lift-engineer-recruitment-london",
  },
  {
    label: "Lift Engineer Recruitment — Birmingham",
    href: "/locations/lift-engineer-recruitment-birmingham",
  },
  {
    label: "Lift Engineer Recruitment — Manchester",
    href: "/locations/lift-engineer-recruitment-manchester",
  },
  {
    label: "Lift Engineer Recruitment — Glasgow",
    href: "/locations/lift-engineer-recruitment-glasgow",
  },
  {
    label: "Fire & Security Recruitment — London",
    href: "/locations/fire-security-recruitment-london",
  },
  {
    label: "Fire & Security Recruitment — Birmingham",
    href: "/locations/fire-security-recruitment-birmingham",
  },
  {
    label: "Fire & Security Recruitment — Manchester",
    href: "/locations/fire-security-recruitment-manchester",
  },
  {
    label: "Refrigeration Recruitment — London",
    href: "/locations/refrigeration-recruitment-london",
  },
  {
    label: "Refrigeration Recruitment — Birmingham",
    href: "/locations/refrigeration-recruitment-birmingham",
  },
  {
    label: "Refrigeration Recruitment — Bristol",
    href: "/locations/refrigeration-recruitment-bristol",
  },
  {
    label: "Gate Engineer Recruitment — London",
    href: "/locations/gate-engineer-recruitment-london",
  },
  {
    label: "Gate Engineer Recruitment — Midlands",
    href: "/locations/gate-engineer-recruitment-midlands",
  },
  {
    label: "Vehicle Technician Recruitment — Devon",
    href: "/locations/vehicle-technician-recruitment-devon",
  },
  {
    label: "Vehicle Technician Recruitment — Cornwall",
    href: "/locations/vehicle-technician-recruitment-cornwall",
  },
  {
    label: "Vehicle Technician Recruitment — Bristol",
    href: "/locations/vehicle-technician-recruitment-bristol",
  },
  {
    label: "HGV Technician Recruitment — Leeds",
    href: "/locations/hgv-recruitment-leeds",
  },
];

export default function UkCoveragePage() {
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
            description="Explore our location-focused recruitment pages. Each page explains how we support employers in that area while working UK-wide."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {locationLinks.map((link) => (
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
    </>
  );
}
