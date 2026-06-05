import Link from "next/link";
import { Button } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { SchemaScript } from "@/components/SchemaScript";
import { ukWideRecruitmentSeo } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema, getFaqSchema, getWebPageSchema } from "@/lib/schema";

export type SeoLandingContent = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  overview: string[];
  whyChoose?: { title: string; description: string }[];
  roles: string[];
  faqs: { question: string; answer: string }[];
  relatedLinks: { label: string; href: string }[];
  breadcrumbParent?: { name: string; url: string };
  pagePath: string;
};

export function createSeoMetadata(content: SeoLandingContent) {
  return createMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: content.pagePath,
    keywords: content.keywords,
  });
}

export function SeoLandingPage({ content }: { content: SeoLandingContent }) {
  const breadcrumbParent = content.breadcrumbParent || {
    name: "Recruitment",
    url: "/recruitment/automotive-recruitment",
  };

  return (
    <>
      <SchemaScript
        data={[
          getWebPageSchema(content.metaTitle, content.metaDescription, content.pagePath),
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            breadcrumbParent,
            { name: content.heroTitle, url: content.pagePath },
          ]),
          getFaqSchema(content.faqs),
        ]}
      />

      <section className="gradient-hero py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 eyebrow-pill">{content.heroEyebrow}</p>
            <h1 className="text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              {content.heroTitle}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-navy-600">
              {content.heroDescription}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href="/contact" variant="primary">
                Submit Vacancy
              </Button>
              <Button href="/jobs" variant="outline">
                View Jobs
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">
                Specialist recruitment support
              </h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-navy-600">
                {content.overview.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
                <p className="text-sm leading-relaxed text-navy-600">
                  {ukWideRecruitmentSeo}
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-brand-200 bg-brand-50/50 p-8 card-shadow">
              <h2 className="text-xl font-bold text-navy-900">
                Roles we recruit for
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {content.roles.map((role) => (
                  <li key={role} className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-sm text-navy-700">{role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {content.whyChoose && content.whyChoose.length > 0 && (
        <section className="gradient-section py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-bold text-navy-900 sm:text-3xl">
              Why employers choose JLD Recruit
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {content.whyChoose.map((item) => (
                <article key={item.title} className="rounded-2xl border border-brand-100 bg-white p-6 card-shadow">
                  <h3 className="text-lg font-bold text-navy-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {content.relatedLinks.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-bold text-navy-900">Related pages</h2>
            <div className="mt-4 flex flex-wrap gap-4">
              {content.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-medium text-brand-700 transition-colors hover:border-brand-300 hover:bg-brand-50"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FAQ items={content.faqs} />
      <CTASection
        primaryLabel="Submit Vacancy"
        secondaryLabel="Hire Staff"
      />
    </>
  );
}
