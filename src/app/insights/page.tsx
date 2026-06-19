import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { SchemaScript } from "@/components/SchemaScript";
import { siteConfig } from "@/lib/constants";
import { insightArticles } from "@/lib/insights";
import { createMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema, getWebPageSchema } from "@/lib/schema";

export const metadata = createMetadata({
  title: "Recruitment Insights",
  description:
    "Recruitment insights and salary guides for lift engineering, fire & security, gate & door, refrigeration and automotive sectors. UK-wide engineering recruitment resources from JLD Recruit Ltd.",
  path: "/insights",
  keywords: [
    "lift engineer salary",
    "fire security engineer recruitment",
    "refrigeration engineer jobs",
    "engineering recruitment insights",
    "UK engineering recruitment",
  ],
});

function InsightCard({
  title,
  description,
  category,
  href,
  planned,
}: {
  title: string;
  description: string;
  category: string;
  href?: string;
  planned: boolean;
}) {
  const content = (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
          {category}
        </span>
        {planned ? (
          <span className="inline-flex rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold text-navy-600">
            Coming soon
          </span>
        ) : null}
      </div>
      <h2 className="mt-4 text-lg font-bold text-navy-900">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-navy-600">{description}</p>
    </>
  );

  if (planned || !href) {
    return (
      <div className="block h-full rounded-2xl border border-brand-100 bg-white p-6 card-shadow">
        {content}
      </div>
    );
  }

  return (
    <a
      href={href}
      className="block h-full rounded-2xl border border-brand-100 bg-white p-6 card-shadow transition-all hover:border-brand-300"
    >
      {content}
    </a>
  );
}

export default function InsightsPage() {
  const salaryGuides = insightArticles.filter((a) => a.category === "Salary Guide");
  const recruitmentInsights = insightArticles.filter(
    (a) => a.category === "Recruitment Insight"
  );

  return (
    <>
      <SchemaScript
        data={[
          getWebPageSchema(
            "Recruitment Insights",
            "Salary guides and recruitment insights for engineering and automotive sectors.",
            "/insights"
          ),
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Insights", url: "/insights" },
          ]),
        ]}
      />

      <section className="gradient-hero py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 eyebrow-pill">Insights</p>
            <h1 className="text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              Recruitment insights and salary guides
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-navy-600">
              Practical resources for employers and candidates in lift engineering,
              fire & security, gate & door, refrigeration and automotive sectors.
              {siteConfig.name} works UK-wide — new articles will cover hiring
              trends, salary benchmarks and recruitment advice across the United
              Kingdom.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="In preparation"
            title="Salary guides"
            description="Detailed salary guides for 2026 — currently being written. These will be published here when ready."
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {salaryGuides.map((article) => (
              <li key={article.slug}>
                <InsightCard
                  title={article.title}
                  description={article.description}
                  category={article.category}
                  planned={article.planned}
                  href={article.planned ? undefined : `/insights/${article.slug}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="gradient-section py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="In preparation"
            title="Recruitment insights"
            description="Employer-focused articles on hiring specialist engineers and technicians."
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recruitmentInsights.map((article) => (
              <li key={article.slug}>
                <InsightCard
                  title={article.title}
                  description={article.description}
                  category={article.category}
                  planned={article.planned}
                  href={article.planned ? undefined : `/insights/${article.slug}`}
                />
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <Button href="/contact" variant="primary">
              Submit Vacancy
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
