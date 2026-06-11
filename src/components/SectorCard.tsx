import Link from "next/link";
import type { sectors } from "@/lib/constants";
import { sectorRecruitmentLinks } from "@/lib/constants";
import { SectorIcon } from "./Icons";

type Sector = (typeof sectors)[number];

interface SectorCardProps {
  sector: Sector;
  compact?: boolean;
}

export function SectorCard({ sector, compact = false }: SectorCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-brand-100 bg-white p-6 card-shadow transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:card-shadow-hover">
      <div className="icon-circle mb-4">
        <SectorIcon name={sector.icon} />
      </div>
      <h3 className="text-xl font-bold text-navy-900 group-hover:text-brand-800">
        {sector.title}
      </h3>
      <p className="mt-3 flex-grow text-sm leading-relaxed text-navy-600">
        {sector.description}
      </p>
      {!compact && sector.roles.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {sector.roles.slice(0, 4).map((role) => (
            <li
              key={role}
              className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 ring-1 ring-brand-100"
            >
              {role}
            </li>
          ))}
        </ul>
      )}
      <Link
        href={
          sector.slug in sectorRecruitmentLinks
            ? sectorRecruitmentLinks[sector.slug as keyof typeof sectorRecruitmentLinks]
            : "/contact"
        }
        className="mt-5 inline-flex items-center text-sm font-semibold text-brand-600 transition-colors group-hover:text-brand-500"
      >
        {sector.slug in sectorRecruitmentLinks ? "Learn more" : "Discuss this sector"}
        <svg
          className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </Link>
    </article>
  );
}
