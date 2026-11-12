import { notFound } from "next/navigation";
import { JobCard } from "@/components/JobCard";
import { SectionHeading } from "@/components/SectionHeading";
import { assertDevelopmentPreview, getPreviewVacancies, toPreviewListing } from "@/lib/dev-job-preview";
import { createMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "Local job preview",
  description: "Local development preview of JLD Recruit job adverts.",
  path: "/jobs/preview",
  noIndex: true,
});

export default function DevJobsPreviewPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  assertDevelopmentPreview();

  const jobs = getPreviewVacancies().map(toPreviewListing);
  const draftCount = jobs.filter((job) => job.status === "draft").length;

  return (
    <>
      <section className="gradient-hero py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 eyebrow-pill">Local preview only</p>
            <h1 className="text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              Jobs we&apos;re recruiting for
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-navy-600">
              This development page shows all {jobs.length} job adverts, including {draftCount} unpublished drafts.
              Drafts are not on the public jobs page. Nothing on this page is indexed or submitted.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={`${jobs.length} preview roles`}
            title="Current opportunities"
            description="Unpublished adverts are marked DRAFT. Their applications are disabled in this preview."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard
                key={job.slug}
                job={job}
                href={`/jobs/preview/${job.slug}`}
                draft={job.status === "draft"}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
