import { EnquiryForms } from "@/components/EnquiryForms";
import { FAQ } from "@/components/FAQ";
import { SchemaScript } from "@/components/SchemaScript";
import { SocialLinks } from "@/components/SocialLinks";
import { faqs, siteConfig, ukWideServicesSeo } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema, getFaqSchema, getWebPageSchema } from "@/lib/schema";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Contact JLD Recruit Ltd for UK-wide recruitment support across England, Scotland, Wales and Northern Ireland. Call 07535 961 452 or email james@jldrecruit.co.uk.",
  path: "/contact",
  keywords: [
    "contact recruitment agency",
    "send vacancy",
    "recruitment enquiry UK",
  ],
});

export default function ContactPage() {
  return (
    <>
      <SchemaScript
        data={[
          getWebPageSchema(
            "Contact JLD Recruit Ltd",
            `${ukWideServicesSeo} Contact James to discuss lift engineering, fire & security, gate & door, refrigeration, automotive and HGV recruitment.`,
            "/contact"
          ),
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Contact", url: "/contact" },
          ]),
          getFaqSchema(faqs),
        ]}
      />

      <section className="gradient-hero py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 eyebrow-pill">
              Contact
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              Need help filling a role? Speak directly with James today.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-navy-600">
              Whether you have a vacancy to fill, need recruitment support for a
              hard-to-find engineering role, or are a candidate looking for your
              next opportunity — get in touch and we will respond promptly.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-navy-500">
              {ukWideServicesSeo}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-navy-900">
                Contact details
              </h2>
              <p className="mt-4 text-navy-600">
                Reach out by phone, email or the contact form. We aim to respond
                to all enquiries as quickly as possible.
              </p>

              <div className="mt-8 space-y-4">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-4 rounded-2xl border border-brand-200 bg-white p-5 card-shadow transition-all hover:border-brand-400 hover:card-shadow-hover"
                >
                  <div className="icon-circle">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy-500">Phone</p>
                    <p className="text-lg font-semibold text-navy-900">
                      {siteConfig.phoneDisplay}
                    </p>
                  </div>
                </a>

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-4 rounded-2xl border border-brand-200 bg-white p-5 card-shadow transition-all hover:border-brand-400 hover:card-shadow-hover"
                >
                  <div className="icon-circle">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy-500">Email</p>
                    <p className="text-lg font-semibold text-navy-900">
                      {siteConfig.email}
                    </p>
                  </div>
                </a>
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-navy-500">
                  Follow us
                </h3>
                <div className="mt-3">
                  <SocialLinks />
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-brand-200 bg-white p-6 card-shadow sm:p-8">
                <EnquiryForms />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQ items={faqs} />
    </>
  );
}
