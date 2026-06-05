import Link from "next/link";
import type { JobListing } from "@/lib/jobs";

interface JobCardProps {
  job: JobListing;
  compact?: boolean;
}

export function JobCard({ job, compact = false }: JobCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-brand-100 bg-white p-6 card-shadow transition-all hover:-translate-y-1 hover:border-brand-300">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
          {job.sector}
        </span>
        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
          {job.type}
        </span>
      </div>
      <h3 className="text-xl font-bold text-navy-900 group-hover:text-brand-800">
        {job.title}
      </h3>
      <p className="mt-2 text-sm font-medium text-brand-600">
        {job.location}, {job.region}
      </p>
      <p className="mt-1 text-sm font-semibold text-navy-800">{job.salary}</p>
      <p className="mt-3 flex-grow text-sm leading-relaxed text-navy-600">
        {job.summary}
      </p>
      {!compact && job.requirements.length > 0 && (
        <ul className="mt-4 space-y-1">
          {job.requirements.slice(0, 3).map((req) => (
            <li key={req} className="flex items-start gap-2 text-xs text-navy-600">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
              {req}
            </li>
          ))}
        </ul>
      )}
      <Link
        href={`/jobs/${job.slug}`}
        className="mt-5 inline-flex items-center text-sm font-semibold text-brand-600 transition-colors group-hover:text-brand-500"
      >
        View job & apply
        <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </Link>
    </article>
  );
}
