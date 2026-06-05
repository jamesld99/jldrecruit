import Link from "next/link";
import { SchemaScript } from "@/components/SchemaScript";
import { siteConfig } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema, getWebPageSchema } from "@/lib/schema";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy for JLD Recruit Ltd. Learn how we collect, use and protect your personal data in accordance with UK data protection law.",
  path: "/privacy-policy",
  keywords: ["privacy policy", "data protection", "GDPR", "recruitment agency"],
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <SchemaScript
        data={[
          getWebPageSchema(
            "Privacy Policy",
            "How JLD Recruit Ltd collects, uses and protects personal data.",
            "/privacy-policy"
          ),
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Privacy Policy", url: "/privacy-policy" },
          ]),
        ]}
      />

      <LegalPageLayout
        title="Privacy Policy"
        lastUpdated="31 May 2026"
      >
        <p>
          {siteConfig.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo; or
          &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy
          Policy explains how we collect, use, store and protect personal
          information when you visit our website at{" "}
          <Link href="/">{siteConfig.url}</Link>, contact us, or use our
          recruitment services.
        </p>
        <p>
          We process personal data in accordance with the UK General Data
          Protection Regulation (UK GDPR) and the Data Protection Act 2018.
        </p>

        <h2>1. Who we are</h2>
        <p>
          {siteConfig.legalName} is a family-run recruitment business specialising
          in automotive, engineering and technical recruitment across the United
          Kingdom.
        </p>
        <ul>
          <li>
            <strong>Business name:</strong> {siteConfig.legalName}
          </li>
          <li>
            <strong>Company number:</strong>{" "}
            <a
              href={siteConfig.companiesHouseUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {siteConfig.companiesHouseNumber}
            </a>{" "}
            (registered with{" "}
            <a
              href={siteConfig.companiesHouseUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Companies House
            </a>
            )
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </li>
          <li>
            <strong>Phone:</strong>{" "}
            <a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a>
          </li>
          <li>
            <strong>Website:</strong> {siteConfig.url}
          </li>
        </ul>
        <p>
          For data protection enquiries, please contact us using the details
          above.
        </p>

        <h2>2. Information we collect</h2>
        <p>We may collect and process the following types of personal data:</p>
        <h3>Information you provide to us</h3>
        <ul>
          <li>Name, email address and phone number</li>
          <li>Company name and job title</li>
          <li>
            Information about vacancies, hiring requirements or career interests
          </li>
          <li>CVs, employment history, qualifications and references</li>
          <li>Any other information you choose to share when contacting us</li>
        </ul>
        <h3>Information collected automatically</h3>
        <ul>
          <li>IP address and browser type</li>
          <li>Pages visited and time spent on our website</li>
          <li>Referring website or search terms</li>
          <li>Device and operating system information</li>
        </ul>

        <h2>3. How we use your information</h2>
        <p>We use personal data for the following purposes:</p>
        <ul>
          <li>To respond to enquiries and provide recruitment services</li>
          <li>
            To match candidates with suitable permanent, temporary or contract
            roles
          </li>
          <li>To communicate with employers and candidates about vacancies</li>
          <li>To improve our website and services</li>
          <li>To comply with legal and regulatory obligations</li>
          <li>To protect our business and prevent fraud</li>
        </ul>

        <h2>4. Legal basis for processing</h2>
        <p>We process personal data on the following legal bases:</p>
        <ul>
          <li>
            <strong>Consent</strong> — where you have given clear consent, for
            example when submitting a contact form or registering your interest
          </li>
          <li>
            <strong>Contract</strong> — where processing is necessary to provide
            recruitment services you have requested
          </li>
          <li>
            <strong>Legitimate interests</strong> — to operate and grow our
            recruitment business, provided your rights do not override these
            interests
          </li>
          <li>
            <strong>Legal obligation</strong> — where we are required to process
            data by law
          </li>
        </ul>

        <h2>5. Sharing your information</h2>
        <p>
          We do not sell your personal data. We may share information with:
        </p>
        <ul>
          <li>
            Prospective employers or candidates, where relevant to a recruitment
            assignment and with your knowledge or consent
          </li>
          <li>
            Service providers who support our business (for example email or
            website hosting providers), under appropriate data protection
            agreements
          </li>
          <li>Regulatory or legal authorities where required by law</li>
        </ul>

        <h2>6. Data retention</h2>
        <p>
          We retain personal data only for as long as necessary to fulfil the
          purposes for which it was collected, including to satisfy legal,
          accounting or reporting requirements. Candidate and client records are
          typically retained for a reasonable period to support ongoing
          recruitment activity, unless you request deletion and we have no
          lawful reason to retain the data.
        </p>

        <h2>7. Your rights</h2>
        <p>Under UK data protection law, you have the right to:</p>
        <ul>
          <li>Request access to the personal data we hold about you</li>
          <li>Request correction of inaccurate or incomplete data</li>
          <li>Request erasure of your data in certain circumstances</li>
          <li>Object to or restrict processing in certain circumstances</li>
          <li>Request transfer of your data to another organisation</li>
          <li>Withdraw consent at any time, where processing is based on consent</li>
          <li>
            Lodge a complaint with the Information Commissioner&apos;s Office
            (ICO) at{" "}
            <a
              href="https://ico.org.uk"
              target="_blank"
              rel="noopener noreferrer"
            >
              ico.org.uk
            </a>
          </li>
        </ul>
        <p>
          To exercise any of these rights, please contact us at{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>

        <h2>8. Cookies</h2>
        <p>
          Our website may use essential cookies required for the site to function
          properly. We do not currently use advertising or third-party tracking
          cookies. If this changes, we will update this policy accordingly.
        </p>
        <p>
          You can control cookies through your browser settings. Disabling
          cookies may affect how certain parts of the website function.
        </p>

        <h2>9. Website links</h2>
        <p>
          Our website may contain links to third-party websites such as LinkedIn
          and Facebook. We are not responsible for the privacy practices of those
          sites and encourage you to read their privacy policies.
        </p>

        <h2>10. Data security</h2>
        <p>
          We take appropriate technical and organisational measures to protect
          personal data against unauthorised access, alteration, disclosure or
          destruction. However, no method of transmission over the internet is
          completely secure, and we cannot guarantee absolute security.
        </p>

        <h2>11. Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated revision date. We encourage you
          to review this policy periodically.
        </p>

        <h2>12. Contact us</h2>
        <p>
          If you have any questions about this Privacy Policy or how we handle
          your personal data, please contact:
        </p>
        <ul>
          <li>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </li>
          <li>
            <strong>Phone:</strong>{" "}
            <a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a>
          </li>
        </ul>
      </LegalPageLayout>
    </>
  );
}

function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="gradient-hero py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 eyebrow-pill">Legal</p>
          <h1 className="text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm text-navy-500">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="legal-content mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </section>
    </>
  );
}
