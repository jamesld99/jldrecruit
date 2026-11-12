import { notFound } from "next/navigation";
import { JobAdvert } from "@/components/JobAdvert";
import { assertDevelopmentPreview, getPreviewVacancy, toPreviewListing } from "@/lib/dev-job-preview";
import { createMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  if (process.env.NODE_ENV !== "development") {
    return createMetadata({
      title: "Not found",
      description: "This preview is not available.",
      path: "/jobs/preview",
      noIndex: true,
    });
  }

  const { slug } = await params;
  const vacancy = getPreviewVacancy(slug);
  if (!vacancy) {
    return createMetadata({
      title: "Not found",
      description: "This preview advert was not found.",
      path: "/jobs/preview",
      noIndex: true,
    });
  }

  return createMetadata({
    title: `${vacancy.status === "draft" ? "Draft: " : ""}${vacancy.seoTitle}`,
    description: "Local development preview. This advert is not a public application page.",
    path: `/jobs/preview/${vacancy.slug}`,
    noIndex: true,
  });
}

export default async function DevJobPreviewPage({ params }: Props) {
  if (process.env.NODE_ENV !== "development") notFound();
  assertDevelopmentPreview();

  const { slug } = await params;
  const vacancy = getPreviewVacancy(slug);
  if (!vacancy) notFound();

  const job = toPreviewListing(vacancy);

  return (
    <JobAdvert
      job={job}
      backHref="/jobs/preview"
      backLabel="Back to the local preview"
      draft={job.status === "draft"}
      testMode
    />
  );
}
