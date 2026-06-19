import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { SchemaScript } from "@/components/SchemaScript";
import { siteConfig } from "@/lib/constants";
import { getInsightArticle, insightArticles } from "@/lib/insights";
import { createMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema, getWebPageSchema } from "@/lib/schema";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return insightArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getInsightArticle(slug);
  if (!article) return {};

  return createMetadata({
    title: article.title,
    description: article.description,
    path: `/insights/${article.slug}`,
    noIndex: article.planned,
    keywords: [
      article.title.toLowerCase(),
      "engineering recruitment UK",
      "JLD Recruit",
    ],
  });
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getInsightArticle(slug);

  if (!article) notFound();

  const isPublished = !article.planned && article.sections && article.sections.length > 0;

  return (
    <>
      <SchemaScript
        data={[
          getWebPageSchema(article.title, article.description, `/insights/${article.slug}`),
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Insights", url: "/insights" },
            { name: article.title, url: `/insights/${article.slug}` },
          ]),
        ]}
      />

      <section className="gradient-hero py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/insights"
              className="text-sm font-semibold text-brand-600 hover:text-brand-500"
            >
              &larr; Back to insights
            </Link>
            <p className="mt-4 eyebrow-pill">{article.category}</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-navy-600">
              {article.description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {isPublished ? (
            <div className="space-y-10">
              {article.sections!.map((section) => (
                <article key={section.heading}>
                  <h2 className="text-2xl font-bold text-navy-900">{section.heading}</h2>
                  {section.body.split("\n\n").map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="mt-4 leading-relaxed text-navy-600">
                      {paragraph}
                    </p>
                  ))}
                </article>
              ))}
              <div className="rounded-2xl border border-brand-200 bg-brand-50/50 p-8 card-shadow">
                <h2 className="text-xl font-bold text-navy-900">Need recruitment support?</h2>
                <p className="mt-4 leading-relaxed text-navy-600">
                  {siteConfig.name} provides permanent recruitment UK-wide with direct access
                  to James. Submit a vacancy or browse current roles.
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
          ) : (
            <div className="rounded-2xl border border-brand-200 bg-brand-50/50 p-8 card-shadow">
              <h2 className="text-xl font-bold text-navy-900">Article in preparation</h2>
              <p className="mt-4 leading-relaxed text-navy-600">
                This article is currently being prepared. {siteConfig.name} supports
                employers across England, Scotland, Wales and Northern Ireland with
                specialist engineering and automotive recruitment.
              </p>
              <p className="mt-4 leading-relaxed text-navy-600">
                If you need recruitment support now — whether for lift engineers,
                fire & security engineers, gate & door engineers, refrigeration
                engineers or vehicle technicians — speak directly with James.
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
          )}
        </div>
      </section>

      <CTASection
        primaryLabel="Hire Staff"
        secondaryLabel="Speak to James"
      />
    </>
  );
}
