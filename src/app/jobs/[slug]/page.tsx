import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { JobAdvert } from "@/components/JobAdvert";
import { SchemaScript } from "@/components/SchemaScript";
import { isEnquiryTestMode } from "@/lib/enquiry";
import { getJobBySlug, getPublicJobSlugs, jobAdvertIsComplete, type JobListing } from "@/lib/jobs";
import { createMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema, getJobPostingSchema } from "@/lib/schema";

export const revalidate = 300;

type Props = {
  params: Promise<{ slug: string }>;
};

function placeLabel(job: JobListing) {
  return job.region ? `${job.location}, ${job.region}` : job.location;
}

function unavailableCopy(status: JobListing["status"]) {
  if (status === "filled") {
    return {
      title: "Vacancy filled",
      message: "This vacancy has been filled and is not accepting applications.",
    };
  }

  if (status === "closed") {
    return {
      title: "Vacancy closed",
      message: "This vacancy is closed and is not accepting applications.",
    };
  }

  return {
    title: "Vacancy paused",
    message: "This vacancy is paused and is not accepting applications.",
  };
}

export async function generateStaticParams() {
  const slugs = await getPublicJobSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return {};

  return createMetadata({
    title: job.seoTitle,
    description: job.metaDescription,
    path: `/jobs/${job.slug}`,
    noIndex: job.status !== "open" || !jobAdvertIsComplete(job),
    keywords: [
      `${job.title} jobs ${job.location}`,
      `${job.sector} jobs ${job.region || job.location}`,
      `${job.title} recruitment`,
    ],
  });
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) notFound();
  if (job.status === "open" && !jobAdvertIsComplete(job)) notFound();

  const isOpen = job.status === "open" && jobAdvertIsComplete(job);
  const unavailable = unavailableCopy(job.status);
  const jobSchema = getJobPostingSchema(job);
  return (
    <>
      <SchemaScript
        data={[
          ...(jobSchema ? [jobSchema] : []),
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Jobs", url: "/jobs" },
            { name: job.title, url: `/jobs/${job.slug}` },
          ]),
        ]}
      />

      {isOpen ? (
        <JobAdvert
          job={job}
          backHref="/jobs"
          backLabel="Back to all jobs"
          testMode={isEnquiryTestMode()}
        />
      ) : (
      <section className="gradient-hero py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link href="/jobs" className="text-sm font-semibold text-brand-600 hover:text-brand-500">
            &larr; Back to all jobs
          </Link>
          <div className="mt-4">
            <span className="rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold text-navy-700">
              {unavailable.title}
            </span>
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
            {job.title}
          </h1>
          <p className="mt-3 font-medium text-navy-900">{placeLabel(job)}</p>
          <div className="mt-8 rounded-2xl border border-brand-200 bg-brand-50/50 p-8 card-shadow">
            <h2 className="text-xl font-bold text-navy-900">{unavailable.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-navy-600">
              {unavailable.message}
            </p>
            <div className="mt-6">
              <Button href="/jobs" variant="primary">
                View current opportunities
              </Button>
            </div>
          </div>
        </div>
      </section>
      )}

      <CTASection
        primaryLabel="Submit a Vacancy"
        secondaryLabel="Speak to James"
      />
    </>
  );
}
