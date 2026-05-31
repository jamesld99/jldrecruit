import Link from "next/link";
import { recruitmentSolutions } from "@/lib/services";
import { SectionHeading } from "./SectionHeading";

function SolutionIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    permanent: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.21a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    temporary: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    contract: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    headhunt: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  };

  return icons[name] || icons.permanent;
}

interface RecruitmentSolutionsProps {
  showIntro?: boolean;
  introTitle?: string;
  introDescription?: string;
  embedded?: boolean;
}

export function RecruitmentSolutions({
  showIntro = true,
  introTitle = "Recruitment Solutions",
  introDescription = "Flexible recruitment services for automotive, engineering and technical businesses — with permanent recruitment at the core. Temporary and contract staffing also available in construction and healthcare.",
  embedded = false,
}: RecruitmentSolutionsProps) {
  const content = (
    <>
      {showIntro && (
        <SectionHeading
          eyebrow="Recruitment Solutions"
          title={introTitle}
          description={introDescription}
        />
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recruitmentSolutions.map((solution) => (
            <article
              key={solution.slug}
              className={`group flex h-full flex-col rounded-2xl border p-6 card-shadow transition-all duration-300 hover:-translate-y-1 hover:card-shadow-hover ${
                solution.featured
                  ? "border-brand-400 bg-gradient-to-br from-brand-50 to-white ring-1 ring-brand-200"
                  : "border-brand-100 bg-white hover:border-brand-300"
              }`}
            >
              {solution.featured && (
                <span className="mb-3 inline-flex w-fit rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
                  Primary Service
                </span>
              )}
              <div className="icon-circle mb-4">
                <SolutionIcon name={solution.icon} />
              </div>
              <h3 className="text-lg font-bold text-navy-900 group-hover:text-brand-800">
                {solution.title}
              </h3>
              <p className="mt-3 flex-grow text-sm leading-relaxed text-navy-600">
                {solution.description}
              </p>
              <Link
                href={solution.href}
                className="mt-5 inline-flex items-center text-sm font-semibold text-brand-600 transition-colors group-hover:text-brand-500"
              >
                Learn more
                <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </article>
          ))}
        </div>
    </>
  );

  if (embedded) {
    return content;
  }

  return (
    <section className="py-20 lg:py-28" aria-labelledby="recruitment-solutions">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {content}
      </div>
    </section>
  );
}
