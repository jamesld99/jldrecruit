import Link from "next/link";
import { siteConfig } from "@/lib/constants";
import { coverageAreas } from "@/lib/location-pages";
import { SectionHeading } from "./SectionHeading";

export function CoverageAreas() {
  return (
    <section className="gradient-section py-20 lg:py-28" aria-labelledby="coverage">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="UK Coverage"
          title="Areas we cover"
          description={`${siteConfig.name} recruits nationwide across lift, fire & security, gate & door, refrigeration and automotive engineering.`}
        />
        <div className="flex flex-wrap justify-center gap-3">
          {coverageAreas.map((area) => (
            <span
              key={area}
              className="rounded-full border border-brand-200 bg-white px-5 py-2.5 text-sm font-medium text-navy-700 card-shadow"
            >
              {area}
            </span>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-navy-600">
          We recruit nationwide across major cities and regions — with strong
          activity in lift engineering, fire & security, gate & door,
          refrigeration and automotive & HGV roles UK-wide.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
          <Link href="/locations/vehicle-technician-recruitment-devon" className="font-semibold text-brand-600 hover:text-brand-500">
            Devon &rarr;
          </Link>
          <Link href="/locations/vehicle-technician-recruitment-cornwall" className="font-semibold text-brand-600 hover:text-brand-500">
            Cornwall &rarr;
          </Link>
          <Link href="/locations/hgv-recruitment-manchester" className="font-semibold text-brand-600 hover:text-brand-500">
            Manchester &rarr;
          </Link>
          <Link href="/locations/hgv-recruitment-nottingham" className="font-semibold text-brand-600 hover:text-brand-500">
            Nottingham &rarr;
          </Link>
          <Link href="/locations/lift-engineer-recruitment-london" className="font-semibold text-brand-600 hover:text-brand-500">
            London &rarr;
          </Link>
          <Link href="/locations/fire-security-recruitment-birmingham" className="font-semibold text-brand-600 hover:text-brand-500">
            Birmingham &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
