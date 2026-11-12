import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import { getJobs } from "@/lib/jobs";
import { getVacancies } from "@/lib/vacancies";
import { locationPages } from "@/lib/location-pages";
import { getPublishedInsightArticles } from "@/lib/insights";
import { getJobPostingSchema } from "@/lib/schema";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "Local SEO check",
  description: "Local development check of indexing safeguards. Not a Search Console export.",
  path: "/dev/seo",
  noIndex: true,
});

export default async function DevSeoPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  const vacancies = getVacancies();
  const publicJobs = await getJobs();
  const publicSlugs = new Set(publicJobs.map((job) => job.slug));
  const schemaCount = publicJobs.filter((job) => getJobPostingSchema(job)).length;
  const drafts = vacancies.filter((vacancy) => vacancy.status === "draft");
  const approvedDrafts = drafts.filter((vacancy) => vacancy.publicationApproved);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="mb-4 eyebrow-pill">Local check only</p>
        <h1 className="text-4xl font-bold text-navy-900">SEO safeguards</h1>
        <p className="mt-4 text-navy-700">
          This page reads the local code. It is not a Google Search Console export, and the historical
          console counts have not been re-queried.
        </p>
        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-brand-100 bg-white p-5">
            <dt className="text-sm text-navy-500">Public job pages</dt>
            <dd className="mt-1 text-2xl font-bold text-navy-900">{publicJobs.length}</dd>
          </div>
          <div className="rounded-2xl border border-brand-100 bg-white p-5">
            <dt className="text-sm text-navy-500">Drafts still unpublished</dt>
            <dd className="mt-1 text-2xl font-bold text-navy-900">{drafts.length}</dd>
          </div>
          <div className="rounded-2xl border border-brand-100 bg-white p-5">
            <dt className="text-sm text-navy-500">Drafts marked approved</dt>
            <dd className="mt-1 text-2xl font-bold text-navy-900">{approvedDrafts.length}</dd>
          </div>
          <div className="rounded-2xl border border-brand-100 bg-white p-5">
            <dt className="text-sm text-navy-500">JobPosting records emitted</dt>
            <dd className="mt-1 text-2xl font-bold text-navy-900">{schemaCount}</dd>
          </div>
          <div className="rounded-2xl border border-brand-100 bg-white p-5">
            <dt className="text-sm text-navy-500">Location pages still in the sitemap</dt>
            <dd className="mt-1 text-2xl font-bold text-navy-900">{locationPages.length}</dd>
          </div>
          <div className="rounded-2xl border border-brand-100 bg-white p-5">
            <dt className="text-sm text-navy-500">Published insight articles</dt>
            <dd className="mt-1 text-2xl font-bold text-navy-900">{getPublishedInsightArticles().length}</dd>
          </div>
        </dl>
        <h2 className="mt-10 text-2xl font-bold text-navy-900">Vacancy indexing</h2>
        <ul className="mt-4 space-y-2 text-sm text-navy-700">
          {vacancies
            .filter((vacancy) => vacancy.status !== "draft")
            .map((vacancy) => (
              <li key={vacancy.id}>
                {vacancy.slug}: {vacancy.status}, {publicSlugs.has(vacancy.slug) ? "in the public jobs list" : "not in the public jobs list"}
              </li>
            ))}
        </ul>
        <p className="mt-6 text-sm leading-relaxed text-navy-600">
          Draft previews, this page and filled vacancies are noindex. The sitemap lists only complete approved open jobs.
          No publication date has been invented, so no JobPosting date is emitted until a real date is stored.
        </p>
      </div>
    </section>
  );
}
