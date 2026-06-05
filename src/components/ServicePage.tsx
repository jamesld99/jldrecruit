import Link from "next/link";
import { Button } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { SchemaScript } from "@/components/SchemaScript";
import { TemporarySpecialist } from "@/components/TemporarySpecialist";
import type { ServicePageContent } from "@/lib/services";
import { createMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema, getFaqSchema, getWebPageSchema } from "@/lib/schema";

export function createServiceMetadata(content: ServicePageContent) {
  return createMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: `/services/${content.slug}`,
    keywords: content.keywords,
  });
}

export function ServicePage({ content }: { content: ServicePageContent }) {
  const showSpecialist =
    content.slug === "temporary-recruitment" ||
    content.slug === "contract-recruitment";

  return (
    <>
      <SchemaScript
        data={[
          getWebPageSchema(content.metaTitle, content.metaDescription, `/services/${content.slug}`),
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Employers", url: "/employers" },
            { name: content.title, url: `/services/${content.slug}` },
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
                {content.primaryCta}
              </Button>
              <Button href="/contact" variant="outline">
                {content.secondaryCta}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {showSpecialist && (
        <section className="gradient-section py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <TemporarySpecialist />
          </div>
        </section>
      )}

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">
                Service overview
              </h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-navy-600">
                {content.overview.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 card-shadow">
              <h3 className="text-lg font-bold text-navy-900">
                {content.rolesTitle}
              </h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {content.roles.map((role) => (
                  <li
                    key={role}
                    className="flex items-start gap-2 text-sm text-navy-700"
                  >
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="gradient-section py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 eyebrow-pill">Benefits for Employers</p>
            <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
              Why employers choose JLD Recruit Ltd
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {content.benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-2xl border border-brand-100 bg-white p-6 card-shadow transition-all hover:border-brand-300"
              >
                <div className="icon-circle-sm mb-4">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-navy-900">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">
            {content.ctaTitle}
          </h2>
          <p className="mt-4 text-lg text-navy-600">{content.ctaDescription}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/contact" variant="primary">
              {content.primaryCta}
            </Button>
            <Button href="/contact" variant="outline">
              {content.secondaryCta}
            </Button>
          </div>
          <p className="mt-8 text-sm text-navy-500">
            Also see our{" "}
            <Link href="/services/permanent-recruitment" className="font-semibold text-brand-600 hover:underline">
              permanent
            </Link>
            {", "}
            <Link href="/services/temporary-recruitment" className="font-semibold text-brand-600 hover:underline">
              temporary
            </Link>
            {" and "}
            <Link href="/services/contract-recruitment" className="font-semibold text-brand-600 hover:underline">
              contract
            </Link>
            {" recruitment services."}
          </p>
        </div>
      </section>

      <FAQ
        items={content.faqs}
        title={`${content.title} FAQs`}
        description={`Common questions about our ${content.title.toLowerCase()} service.`}
      />

      <CTASection
        title={content.ctaTitle}
        description={content.ctaDescription}
        primaryLabel={content.primaryCta}
        secondaryLabel={content.secondaryCta}
      />
    </>
  );
}
