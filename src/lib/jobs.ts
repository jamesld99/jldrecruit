import { siteConfig } from "@/lib/constants";
import {
  assertVacancyDataset,
  getPublishableVacancies,
  getPublicVacancySlugs,
  getVacancyBySlug,
  type PayFrequency,
  type Vacancy,
  type VacancyStatus,
} from "@/lib/vacancies";

export type JobListing = {
  id: string;
  slug: string;
  title: string;
  location: string;
  region: string;
  salary: string;
  sector: string;
  type: string;
  summary: string;
  overview: string[];
  responsibilities: string[];
  requirements: string[];
  desirable: string[];
  benefits: string[];
  workingHours: string;
  postedDate?: string;
  closingDate?: string;
  employerConfidential: boolean;
  payFrequency?: PayFrequency;
  linkedInUrl?: string;
  status: VacancyStatus;
  seoTitle: string;
  metaDescription: string;
  applicationEmail: string;
};

const UNFINISHED_PUBLIC_WORDING =
  /\b(not confirmed|unconfirmed|to confirm|tbc|todo|lorem|contact us for details|placeholder)\b/i;

export function jobAdvertIsComplete(job: Pick<
  JobListing,
  | "title"
  | "location"
  | "summary"
  | "salary"
  | "workingHours"
  | "overview"
  | "responsibilities"
  | "requirements"
  | "benefits"
>) {
  const publicText = [
    job.title,
    job.location,
    job.summary,
    job.salary,
    job.workingHours,
    ...job.overview,
    ...job.responsibilities,
    ...job.requirements,
    ...job.benefits,
  ];

  if (publicText.some((value) => UNFINISHED_PUBLIC_WORDING.test(value))) {
    return false;
  }

  return (
    job.title.trim().length > 0 &&
    job.location.trim().length > 0 &&
    job.summary.trim().length > 0 &&
    job.overview.length > 0 &&
    job.responsibilities.length > 0 &&
    job.requirements.length > 0
  );
}

function toListing(vacancy: Vacancy): JobListing {
  return {
    id: vacancy.id,
    slug: vacancy.slug,
    title: vacancy.title,
    location: vacancy.location,
    region: vacancy.region ?? "",
    salary: vacancy.salary ?? "",
    sector: vacancy.sector,
    type: vacancy.employmentType ?? "",
    summary: vacancy.summary,
    overview: vacancy.overview,
    responsibilities: vacancy.responsibilities,
    requirements: vacancy.requirements,
    desirable: vacancy.desirable,
    benefits: vacancy.benefits,
    workingHours: vacancy.workingHours ?? "",
    postedDate: vacancy.publishedOn,
    closingDate: vacancy.closingOn,
    employerConfidential: vacancy.employerConfidential,
    payFrequency: vacancy.payFrequency,
    linkedInUrl: vacancy.linkedInUrl,
    status: vacancy.status,
    seoTitle: vacancy.seoTitle,
    metaDescription: vacancy.metaDescription,
    applicationEmail: siteConfig.email,
  };
}

export async function getJobs(): Promise<JobListing[]> {
  assertVacancyDataset();

  return getPublishableVacancies()
    .map(toListing)
    .filter(jobAdvertIsComplete);
}

export async function getJobBySlug(slug: string) {
  assertVacancyDataset();
  const vacancy = getVacancyBySlug(slug);

  if (!vacancy || vacancy.status === "draft") {
    return undefined;
  }

  return toListing(vacancy);
}

export async function getPublicJobSlugs() {
  assertVacancyDataset();
  return getPublicVacancySlugs();
}
