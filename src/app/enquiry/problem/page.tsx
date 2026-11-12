import { Button } from "@/components/Button";
import { siteConfig } from "@/lib/constants";
import { enquiryProblems, type EnquiryReason } from "@/lib/enquiry-server";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Submission not accepted",
  description: "A JLD Recruit Ltd form submission was not accepted.",
  path: "/enquiry/problem",
  noIndex: true,
});

function isReason(value: string | undefined): value is EnquiryReason {
  return value === "unavailable" || value === "invalid" || value === "file" || value === "rate" || value === "rejected" || value === "closed";
}

export default async function EnquiryProblemPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const { reason } = await searchParams;
  const message = enquiryProblems[isReason(reason) ? reason : "rejected"].error;

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-brand-200 bg-brand-50/50 p-8 card-shadow">
          <h1 className="text-2xl font-bold text-navy-900">Submission not accepted</h1>
          <p className="mt-4 text-sm leading-relaxed text-navy-700">{message}</p>
          <p className="mt-4 text-sm leading-relaxed text-navy-700">
            You can email{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-semibold text-brand-600 hover:underline">
              {siteConfig.email}
            </a>{" "}
            or call{" "}
            <a href={`tel:${siteConfig.phone}`} className="font-semibold text-brand-600 hover:underline">
              {siteConfig.phoneDisplay}
            </a>
            .
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" variant="primary">
              Back to contact
            </Button>
            <Button href="/jobs" variant="outline">
              View current opportunities
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
