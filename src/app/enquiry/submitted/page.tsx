import { Button } from "@/components/Button";
import { siteConfig } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Submission accepted",
  description: "A JLD Recruit Ltd form submission was accepted for sending.",
  path: "/enquiry/submitted",
  noIndex: true,
});

const copy = {
  employer: {
    title: "Vacancy enquiry accepted for sending",
    description: "Your vacancy enquiry has been accepted for sending to JLD Recruit Ltd.",
  },
  candidate: {
    title: "CV submission accepted for sending",
    description: "Your CV and details have been accepted for sending to JLD Recruit Ltd.",
  },
  application: {
    title: "Application accepted for sending",
    description: "Your job application has been accepted for sending to JLD Recruit Ltd.",
  },
} as const;

export default async function EnquirySubmittedPage({
  searchParams,
}: {
  searchParams: Promise<{ form?: string; preview?: string; test?: string }>;
}) {
  const { form, preview, test } = await searchParams;
  const localPreview = process.env.NODE_ENV === "development" && (preview === "1" || test === "1");
  const selected = form === "candidate" || form === "application" ? copy[form] : copy.employer;

  if (localPreview) {
    return (
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border-2 border-brand-600 bg-white p-8 card-shadow">
            <h1 className="text-2xl font-bold text-navy-900">Test mode — validation passed</h1>
            <p className="mt-4 text-sm leading-relaxed text-navy-700">
              This local result means the form passed validation. No email was sent, nothing was stored, and Resend was not contacted. It does not prove inbox delivery.
            </p>
            <div className="mt-6">
              <Button href="/contact" variant="primary">
                Back to contact
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-green-200 bg-green-50 p-8 card-shadow">
          <h1 className="text-2xl font-bold text-navy-900">{selected.title}</h1>
          <p className="mt-4 text-sm leading-relaxed text-navy-700">{selected.description}</p>
          <p className="mt-4 text-sm leading-relaxed text-navy-700">
            This confirmation means the submission was accepted for sending. It does not by itself
            confirm that the message has reached an inbox. If you need to follow up, email{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-semibold text-brand-600 hover:underline">
              {siteConfig.email}
            </a>{" "}
            or call{" "}
            <a href={`tel:${siteConfig.phone}`} className="font-semibold text-brand-600 hover:underline">
              {siteConfig.phoneDisplay}
            </a>
            .
          </p>
          <div className="mt-6">
            <Button href="/" variant="primary">
              Back to the homepage
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
