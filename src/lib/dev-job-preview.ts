import { notFound } from "next/navigation";
import { getVacancies, type Vacancy } from "@/lib/vacancies";
import type { JobListing } from "@/lib/jobs";

export function assertDevelopmentPreview() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }
}

export function getPreviewVacancies() {
  assertDevelopmentPreview();

  return getVacancies()
    .filter((vacancy) => vacancy.status !== "filled")
    .slice()
    .sort((left, right) => left.displayOrder - right.displayOrder);
}

export function getPreviewVacancy(slug: string) {
  return getPreviewVacancies().find((vacancy) => vacancy.slug === slug);
}

export function toPreviewListing(vacancy: Vacancy): JobListing {
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
    status: vacancy.status,
    seoTitle: vacancy.seoTitle,
    metaDescription: vacancy.metaDescription,
    applicationEmail: "",
  };
}
