import { Button } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { JobCard } from "@/components/JobCard";
import { SchemaScript } from "@/components/SchemaScript";
import { SectionHeading } from "@/components/SectionHeading";
import { jobs } from "@/lib/jobs";
import { createMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema, getJobListSchema, getWebPageSchema } from "@/lib/schema";

export const metadata = createMetadata({
  title: "Current Jobs & Vacancies",
  description:
    "Browse current job vacancies with JLD Recruit Ltd. Lift engineering, fire & security, gate & door, refrigeration, vehicle technician and HGV roles UK-wide.",
  path: "/jobs",
  keywords: [
    "vehicle technician jobs",
    "MOT tester jobs Devon",
    "fire and security engineer jobs",
    "automotive jobs UK",
    "engineering jobs Cornwall",
  ],
});

export default function JobsPage() {
  return (
    <>
      <SchemaScript
        data={[
          getWebPageSchema(
            "Current Jobs & Vacancies",
            "Live recruitment vacancies with JLD Recruit Ltd across lift engineering, fire & security, gate & door, refrigeration and automotive & HGV sectors.",
            "/jobs"
          ),
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Jobs", url: "/jobs" },
          ]),
          getJobListSchema(jobs),
        ]}
      />

      <section className="gradient-hero py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 eyebrow-pill">Current Vacancies</p>
            <h1 className="text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              Jobs we&apos;re recruiting for
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-navy-600">
              Browse our current vacancies across lift engineering, fire & security,
              gate & door, refrigeration and automotive & HGV sectors. Apply
              directly — speak with James throughout the process.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={`${jobs.length} Active Roles`}
            title="Current opportunities"
            description="These vacancies are updated regularly. Don't see the right role? Register your interest and we'll be in touch when something suitable comes up."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job.slug} job={job} />
            ))}
          </div>
          <div className="mt-12 rounded-2xl border border-brand-200 bg-brand-50/50 p-8 text-center">
            <h2 className="text-xl font-bold text-navy-900">
              Can&apos;t find the right role?
            </h2>
            <p className="mt-3 text-navy-600">
              Send us your CV or register your interest — we recruit across
              lift engineering, fire & security, gate & door, refrigeration and
              automotive & HGV sectors UK-wide.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/job-seekers" variant="primary">
                Job Seeker Information
              </Button>
              <Button href="/contact" variant="outline">
                Contact James
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
