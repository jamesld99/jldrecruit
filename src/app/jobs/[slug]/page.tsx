import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { SchemaScript } from "@/components/SchemaScript";
import { siteConfig } from "@/lib/constants";
import { getJobBySlug, getJobs } from "@/lib/jobs";
import { createMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema, getJobPostingSchema } from "@/lib/schema";

export const revalidate = 300;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return {};

  return createMetadata({
    title: `${job.title} — ${job.location}`,
    description: `${job.title} job in ${job.location}, ${job.region}. ${job.salary}. ${job.summary}`,
    path: `/jobs/${job.slug}`,
    keywords: [
      `${job.title} jobs ${job.location}`,
      `${job.sector} jobs ${job.region}`,
      `${job.title} recruitment`,
    ],
  });
}

function JobSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-navy-900">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
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

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) notFound();

  const applyMailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(`Application: ${job.title} — ${job.location}`)}`;

  return (
    <>
      <SchemaScript
        data={[
          getJobPostingSchema(job),
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Jobs", url: "/jobs" },
            { name: job.title, url: `/jobs/${job.slug}` },
          ]),
        ]}
      />

      <section className="gradient-hero py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Link href="/jobs" className="text-sm font-semibold text-brand-600 hover:text-brand-500">
              &larr; Back to all jobs
            </Link>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
                {job.sector}
              </span>
              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                {job.type}
              </span>
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              {job.title}
            </h1>
            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-navy-500">Location</dt>
                <dd className="mt-1 font-medium text-navy-900">{job.location}, {job.region}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-navy-500">Salary</dt>
                <dd className="mt-1 font-medium text-navy-900">{job.salary}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-navy-500">Job type</dt>
                <dd className="mt-1 font-medium text-navy-900">{job.type}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-navy-500">Working hours</dt>
                <dd className="mt-1 font-medium text-navy-900">{job.workingHours}</dd>
              </div>
            </dl>
            <p className="mt-6 text-lg leading-relaxed text-navy-600">{job.summary}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={applyMailto}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand-500/30 transition-all hover:from-brand-700 hover:to-brand-600"
              >
                Apply now
              </a>
              {job.linkedInUrl ? (
                <a
                  href={job.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border-2 border-brand-600 px-6 py-3 text-sm font-semibold text-brand-700 transition-all hover:bg-brand-600 hover:text-white"
                >
                  View on LinkedIn
                </a>
              ) : (
                <Button href="/contact" variant="outline">
                  Speak to James
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-navy-900">Overview</h2>
                <div className="mt-6 space-y-5 text-lg leading-relaxed text-navy-600">
                  {job.overview.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <JobSection title="Key Responsibilities" items={job.responsibilities} />
            </div>
            <div className="space-y-10">
              <JobSection title="Requirements" items={job.requirements} />
              <JobSection title="Desirable" items={job.desirable} />
              <JobSection title="Benefits" items={job.benefits} />
              <div>
                <h2 className="text-xl font-bold text-navy-900">Working Hours</h2>
                <p className="mt-4 text-sm leading-relaxed text-navy-700">
                  {job.workingHours}
                </p>
              </div>
              <div className="rounded-2xl border border-brand-200 bg-brand-50/50 p-8 card-shadow">
                <h2 className="text-xl font-bold text-navy-900">Apply Now</h2>
                <p className="mt-3 text-sm leading-relaxed text-navy-600">
                  Email your CV or message James directly. You will speak with him throughout the process — no call centres.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={applyMailto}
                    className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand-500/30 transition-all hover:from-brand-700 hover:to-brand-600"
                  >
                    Apply now
                  </a>
                  {job.linkedInUrl ? (
                    <a
                      href={job.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center rounded-full border-2 border-brand-600 px-6 py-3.5 text-sm font-semibold text-brand-700 transition-all hover:bg-brand-600 hover:text-white"
                    >
                      View original LinkedIn post
                    </a>
                  ) : null}
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="inline-flex w-full items-center justify-center rounded-full border-2 border-brand-600 px-6 py-3.5 text-sm font-semibold text-brand-700 transition-all hover:bg-brand-600 hover:text-white"
                  >
                    Call {siteConfig.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        primaryLabel="Submit a Vacancy"
        secondaryLabel="Speak to James"
      />
    </>
  );
}
