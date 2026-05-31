import { siteConfig } from "@/lib/constants";
import { ContactForm } from "./ContactForm";
import { SocialLinks } from "./SocialLinks";

interface ContactSectionProps {
  id?: string;
}

export function ContactSection({ id = "contact" }: ContactSectionProps) {
  return (
    <section
      id={id}
      className="gradient-section-deep py-20 lg:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-4 eyebrow-pill">Get in Touch</p>
            <h2
              id="contact-heading"
              className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl"
            >
              Need help filling a role? Speak directly with James today.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-navy-600">
              Whether you have a vacancy to fill or need recruitment support for
              a hard-to-find engineering role, get in touch and we will respond
              promptly.
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
                  <p className="text-sm font-medium text-brand-600">Phone</p>
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
                  <p className="text-sm font-medium text-brand-600">Email</p>
                  <p className="text-lg font-semibold text-navy-900">
                    {siteConfig.email}
                  </p>
                </div>
              </a>
            </div>

            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-navy-700">Follow us</p>
              <SocialLinks />
            </div>
          </div>

          <div className="rounded-2xl border border-brand-200 bg-white p-6 card-shadow sm:p-8">
            <h3 className="mb-6 text-xl font-bold text-navy-900">
              Send us a message
            </h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
