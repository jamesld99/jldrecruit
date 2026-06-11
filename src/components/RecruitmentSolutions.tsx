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
    fixedFee: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    exclusive: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    retained: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    engineering: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.164 1.713 0l4.084 1.225a1.045 1.045 0 01.658 1.048l-.632 5.412a2.548 2.548 0 01-2.176 2.196l-1.872.14" />
      </svg>
    ),
    automotive: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    fireSecurity: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043-3.71 3.744 3.744 0 01-3.55-3.55 3.744 3.744 0 01-3.71-1.043A9.003 9.003 0 0012 3c4.97 0 9 4.03 9 9z" />
      </svg>
    ),
    lift: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
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
  introDescription = "Permanent recruitment services for lift engineering, fire & security, automotive and technical businesses — including fixed-fee, exclusive and retained campaigns.",
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
