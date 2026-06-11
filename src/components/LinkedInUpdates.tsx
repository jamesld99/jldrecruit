import Link from "next/link";
import { siteConfig } from "@/lib/constants";
import type { JobListing } from "@/lib/jobs";
import { SectionHeading } from "./SectionHeading";
import { JobCard } from "./JobCard";

interface LinkedInUpdatesProps {
  jobs: JobListing[];
  limit?: number;
}

export function LinkedInUpdates({ jobs, limit = 3 }: LinkedInUpdatesProps) {
  const latestJobs = jobs.slice(0, limit);

  return (
    <section className="py-20 lg:py-28" aria-labelledby="linkedin-updates">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Latest Opportunities"
            title="Active jobs & LinkedIn updates"
            description="Live vacancies sync automatically from our LinkedIn company posts every few minutes. Follow us for the latest engineering and automotive roles."
            align="left"
          />
          <a
            href={siteConfig.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-brand-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:border-brand-300 hover:bg-brand-50"
          >
            Follow on LinkedIn
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {latestJobs.map((job) => (
            <JobCard key={job.slug} job={job} compact />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/jobs" className="text-sm font-semibold text-brand-600 hover:text-brand-500">
            View all current jobs &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
