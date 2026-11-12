import Link from "next/link";
import { JobApplicationForm } from "@/components/JobApplicationForm";
import { siteConfig } from "@/lib/constants";
import type { JobListing } from "@/lib/jobs";

function placeLabel(job: JobListing) {
  return job.region ? `${job.location}, ${job.region}` : job.location;
}

function JobSection({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-bold text-navy-900">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item, index) => (
          <li key={`${title}-${index}`} className="flex items-start gap-3">
            <svg className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span className="text-sm leading-relaxed text-navy-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function JobAdvert({
  job,
  backHref,
  backLabel,
  draft = false,
  testMode = false,
}: {
  job: JobListing;
  backHref: string;
  backLabel: string;
  draft?: boolean;
  testMode?: boolean;
}) {
  return (
    <section className="gradient-hero pt-12 pb-16 lg:pt-16 lg:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link href={backHref} className="text-sm font-semibold text-brand-600 hover:text-brand-500">
          &larr; {backLabel}
        </Link>
        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,26rem)] lg:items-start lg:gap-12">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
                {job.sector}
              </span>
              {draft ? (
                <span className="rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold text-navy-700">
                  DRAFT
                </span>
              ) : null}
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              {job.title}
            </h1>
            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-navy-500">Location</dt>
                <dd className="mt-1 font-medium text-navy-900">{placeLabel(job)}</dd>
              </div>
              {job.salary ? (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-navy-500">Salary</dt>
                  <dd className="mt-1 font-medium text-navy-900">{job.salary}</dd>
                </div>
              ) : null}
              {job.workingHours ? (
                <div className="sm:col-span-2">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-navy-500">Working hours</dt>
                  <dd className="mt-1 font-medium text-navy-900">{job.workingHours}</dd>
                </div>
              ) : null}
            </dl>
            <p className="mt-6 text-lg leading-relaxed text-navy-600">{job.summary}</p>
            <div className="mt-8 space-y-10">
              {job.overview.length > 0 ? (
                <div>
                  <h2 className="text-2xl font-bold text-navy-900">About the Role</h2>
                  <div className="mt-4 space-y-5 text-lg leading-relaxed text-navy-600">
                    {job.overview.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              ) : null}
              <JobSection title="Key Responsibilities" items={job.responsibilities} />
              <JobSection title="Requirements" items={job.requirements} />
              <JobSection title="Desirable" items={job.desirable} />
              <JobSection title="Benefits" items={job.benefits} />
            </div>
          </div>
          <aside className="lg:sticky lg:top-24">
            <div id="apply" className="scroll-mt-28 rounded-2xl border border-brand-200 bg-brand-50/50 p-8 card-shadow">
              <h2 className="text-xl font-bold text-navy-900">How to Apply</h2>
              <p className="mt-3 text-sm leading-relaxed text-navy-600">
                Interested in this opportunity? Apply through JLD Recruit Ltd with your CV. We will review your experience and contact suitable applicants to discuss the role in more detail.
              </p>
              <JobApplicationForm
                jobSlug={job.slug}
                jobTitle={job.title}
                emailDeliveryAvailable={!testMode}
                previewOnly={testMode}
              />
              {job.linkedInUrl ? (
                <a
                  href={job.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full border-2 border-brand-600 px-6 py-3.5 text-sm font-semibold text-brand-700 transition-all hover:bg-brand-600 hover:text-white"
                >
                  View original LinkedIn post
                </a>
              ) : null}
              <a
                href={`tel:${siteConfig.phone}`}
                className="mt-6 inline-flex w-full items-center justify-center rounded-full border-2 border-brand-600 px-6 py-3.5 text-sm font-semibold text-brand-700 transition-all hover:bg-brand-600 hover:text-white"
              >
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
