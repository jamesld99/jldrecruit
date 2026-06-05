import Link from "next/link";
import { SchemaScript } from "@/components/SchemaScript";
import { siteConfig } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema, getWebPageSchema } from "@/lib/schema";

export const metadata = createMetadata({
  title: "Terms of Use",
  description:
    "Terms of Use for the JLD Recruit Ltd website. Read the terms and conditions governing use of our website and recruitment services.",
  path: "/terms-of-use",
  keywords: ["terms of use", "terms and conditions", "website terms"],
});

export default function TermsOfUsePage() {
  return (
    <>
      <SchemaScript
        data={[
          getWebPageSchema(
            "Terms of Use",
            "Terms and conditions for using the JLD Recruit Ltd website.",
            "/terms-of-use"
          ),
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Terms of Use", url: "/terms-of-use" },
          ]),
        ]}
      />

      <section className="gradient-hero py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 eyebrow-pill">Legal</p>
          <h1 className="text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
            Terms of Use
          </h1>
          <p className="mt-4 text-sm text-navy-500">Last updated: 31 May 2026</p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="legal-content mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p>
            These Terms of Use (&ldquo;Terms&rdquo;) govern your access to and use
            of the website operated by {siteConfig.legalName} (&ldquo;we&rdquo;,
            &ldquo;us&rdquo; or &ldquo;our&rdquo;) at{" "}
            <Link href="/">{siteConfig.url}</Link>. By using this website, you
            agree to these Terms. If you do not agree, please do not use the
            website.
          </p>

          <h2>1. About us</h2>
          <p>
            {siteConfig.legalName} is a family-run recruitment business
            providing permanent, temporary and contract recruitment services
            across automotive, engineering and technical sectors in the United
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
          </ul>

          <h2>2. Use of this website</h2>
          <p>You agree to use this website only for lawful purposes. You must not:</p>
          <ul>
            <li>Use the website in any way that breaches applicable laws or regulations</li>
            <li>
              Attempt to gain unauthorised access to our systems, servers or data
            </li>
            <li>
              Introduce viruses, malware or other harmful material to the website
            </li>
            <li>
              Copy, reproduce or republish website content without our prior written
              consent
            </li>
            <li>
              Use the website to transmit unsolicited or unauthorised advertising
              or promotional material
            </li>
            <li>Misrepresent your identity or affiliation when contacting us</li>
          </ul>

          <h2>3. Website content</h2>
          <p>
            The content on this website is provided for general information
            purposes only. While we make reasonable efforts to ensure information
            is accurate and up to date, we do not warrant that the content is
            complete, current or free from errors.
          </p>
          <p>
            Nothing on this website constitutes legal, financial or professional
            advice. You should seek appropriate professional advice before making
            decisions based on information found on this site.
          </p>

          <h2>4. Recruitment services</h2>
          <p>
            Use of this website does not create a contractual relationship between
            you and {siteConfig.legalName} unless expressly agreed in writing.
            Recruitment services, including permanent, temporary and contract
            placements, are subject to separate terms and conditions agreed with
            clients and candidates at the point of engagement.
          </p>
          <p>
            We do not guarantee that a suitable candidate or role will be found
            for any enquiry submitted through this website. All recruitment
            activity is subject to availability, suitability and mutual agreement.
          </p>

          <h2>5. Employer and candidate information</h2>
          <p>
            When you submit information through our contact form, by email or by
            phone, you confirm that the information provided is accurate to the
            best of your knowledge. Employers and candidates are responsible for
            ensuring that any information they provide — including CVs, job
            descriptions and references — is truthful and does not infringe the
            rights of any third party.
          </p>

          <h2>6. Intellectual property</h2>
          <p>
            All content on this website, including text, graphics, logos, images
            and layout, is the property of {siteConfig.legalName} or its
            licensors and is protected by copyright and other intellectual
            property laws. You may not reproduce, distribute or modify any
            content without our prior written permission.
          </p>

          <h2>7. Third-party links</h2>
          <p>
            This website may contain links to third-party websites, including
            social media platforms. These links are provided for convenience only.
            We do not control or endorse third-party sites and are not responsible
            for their content, availability or privacy practices.
          </p>

          <h2>8. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, {siteConfig.legalName} shall
            not be liable for any loss or damage arising from your use of, or
            inability to use, this website, including but not limited to:
          </p>
          <ul>
            <li>Loss of profits, revenue, business or anticipated savings</li>
            <li>Loss of data or goodwill</li>
            <li>Any indirect or consequential loss</li>
          </ul>
          <p>
            Nothing in these Terms excludes or limits our liability for death or
            personal injury caused by negligence, fraud, or any other liability
            that cannot be excluded under applicable law.
          </p>

          <h2>9. Availability of the website</h2>
          <p>
            We aim to keep this website available at all times, but we do not
            guarantee uninterrupted access. We may suspend, withdraw or restrict
            access to all or part of the website for operational, maintenance or
            security reasons without notice.
          </p>

          <h2>10. Privacy</h2>
          <p>
            Your use of this website is also governed by our{" "}
            <Link href="/privacy-policy">Privacy Policy</Link>, which explains how
            we collect and use personal data. By using this website, you
            acknowledge that you have read our Privacy Policy.
          </p>

          <h2>11. Changes to these Terms</h2>
          <p>
            We may revise these Terms at any time by updating this page. The
            updated version will be effective from the date shown at the top of
            this page. Your continued use of the website after changes are posted
            constitutes acceptance of the revised Terms.
          </p>

          <h2>12. Governing law</h2>
          <p>
            These Terms are governed by the laws of England and Wales. Any
            disputes arising from use of this website shall be subject to the
            exclusive jurisdiction of the courts of England and Wales.
          </p>

          <h2>13. Contact us</h2>
          <p>
            If you have any questions about these Terms of Use, please contact:
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
        </div>
      </section>
    </>
  );
}
