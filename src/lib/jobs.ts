import { unstable_cache } from "next/cache";
import {
  getEnrichmentByActivityId,
  getEnrichmentByLinkedInSlug,
  jobEnrichments,
  type JobEnrichment,
} from "@/lib/job-enrichments";
import {
  buildJobSlug,
  fetchLinkedInJobPosts,
  type LinkedInJobPost,
} from "@/lib/linkedin-jobs";

export type JobListing = {
  slug: string;
  title: string;
  location: string;
  region: string;
  salary: string;
  sector: string;
  type: "Permanent" | "Temporary" | "Contract";
  summary: string;
  overview: string[];
  responsibilities: string[];
  requirements: string[];
  desirable: string[];
  benefits: string[];
  workingHours: string;
  postedDate: string;
  linkedInUrl: string;
  linkedInActivityId: string;
  syncedAt: string;
};

const defaultBenefits = [
  "Long-term career opportunity",
  "Professional working environment",
  "Ongoing training and development where applicable",
];

const defaultDesirable = [
  "Additional sector-specific qualifications or manufacturer training",
  "Experience with similar equipment or systems",
  "Strong communication and customer-facing skills",
];

function defaultResponsibilities(sector: string): string[] {
  if (sector === "Fire & Security") {
    return [
      "Install, commission, test and handover fire and security systems",
      "Work from technical drawings and specifications",
      "Carry out programming, fault finding and system testing",
      "Ensure work meets current regulations and British Standards",
      "Maintain professional standards on commercial and industrial sites",
    ];
  }

  if (sector === "Lift Engineering") {
    return [
      "Carry out planned maintenance, servicing and repairs on lifts",
      "Complete fault finding and safety inspections to a high standard",
      "Maintain strong customer relationships across your route",
      "Ensure all work meets current health and safety legislation",
      "Represent the business professionally on client sites",
    ];
  }

  if (sector === "Gate & Door") {
    return [
      "Service, repair, fault find and install industrial door systems",
      "Diagnose issues efficiently and complete repairs to a high standard",
      "Deliver excellent customer service when representing the business on site",
      "Maintain accurate job records and communicate effectively with the office",
      "Participate in call-out cover when required",
    ];
  }

  return [
    "Carry out servicing, diagnostics, repairs and maintenance",
    "Complete fault finding and inspections to a high standard",
    "Work efficiently within a busy workshop or field-based environment",
    "Maintain quality workmanship and attention to detail",
    "Support the wider team and deliver excellent customer satisfaction",
  ];
}

function defaultWorkingHours(sector: string, overview: string[]): string {
  const text = overview.join(" ");

  if (text.includes("Monday to Friday with no weekend")) {
    return "Monday to Friday — no weekend work";
  }
  if (text.includes("Saturdays on a rota") || text.includes("Saturdays worked on a rota")) {
    return "Monday to Friday with Saturdays on a rota basis";
  }
  if (text.includes("Every other Saturday")) {
    return "Monday to Friday with every other Saturday morning";
  }
  if (sector === "Fire & Security") {
    return "Monday to Friday — occasional flexibility required for project work";
  }

  return "Monday to Friday (full details confirmed with employer)";
}

function filterRequirements(requirements: string[], overview: string[]) {
  const overviewText = overview.join(" ").toLowerCase();

  return requirements.filter((requirement) => {
    const normalized = requirement.toLowerCase().trim();
    if (normalized.length < 20) return false;
    if (overviewText.includes(normalized.slice(0, 50))) return false;
    return !/(?:i'm currently working with|well established|family run|get in touch|if you(?:'|’)re interested)/i.test(
      requirement
    );
  });
}

function enrichJob(
  post: LinkedInJobPost,
  enrichment?: JobEnrichment
): JobListing {
  const overview = enrichment?.overview.length ? enrichment.overview : post.overview;
  const sector = enrichment?.sector ?? post.sector;

  return {
    slug: buildJobSlug(post, enrichment?.slug),
    title: enrichment?.title ?? post.title,
    location: enrichment?.location ?? post.location,
    region: enrichment?.region ?? post.region,
    salary: post.salary || enrichment?.salary || "Competitive salary",
    sector,
    type: enrichment?.type ?? post.type,
    summary: enrichment?.summary ?? post.summary,
    overview,
    responsibilities:
      enrichment?.responsibilities ?? defaultResponsibilities(sector),
    requirements: (() => {
      const source = enrichment?.requirements.length
        ? enrichment.requirements
        : post.requirements.length
          ? post.requirements
          : [
              "Relevant experience for the role",
              "Strong work ethic and attention to detail",
              "Right to work in the UK",
            ];
      const filtered = filterRequirements(source, overview);
      return filtered.length > 0 ? filtered : source.slice(0, 3);
    })(),
    desirable: enrichment?.desirable ?? defaultDesirable,
    benefits:
      post.benefits.length > 0
        ? post.benefits
        : enrichment?.benefits ?? defaultBenefits,
    workingHours:
      post.workingHours ||
      enrichment?.workingHours ||
      defaultWorkingHours(sector, overview),
    postedDate: post.postedDate,
    linkedInUrl: post.linkedInUrl,
    linkedInActivityId: post.activityId,
    syncedAt: new Date().toISOString(),
  };
}

function mergeLinkedInPosts(posts: LinkedInJobPost[]): JobListing[] {
  const seenSlugs = new Set<string>();
  const seenActivityIds = new Set<string>();
  const seenRoleKeys = new Set<string>();

  return posts
    .map((post) => {
      if (seenActivityIds.has(post.activityId)) {
        return null;
      }

      const enrichment =
        getEnrichmentByActivityId(post.activityId) ??
        getEnrichmentByLinkedInSlug(post.linkedInSlug);

      const job = enrichJob(post, enrichment);
      const roleKey = `${job.title.toLowerCase()}|${job.location.toLowerCase()}`;

      if (seenRoleKeys.has(roleKey)) {
        return null;
      }

      if (seenSlugs.has(job.slug)) {
        job.slug = `${job.slug}-${post.activityId.slice(-6)}`;
      }

      seenActivityIds.add(post.activityId);
      seenSlugs.add(job.slug);
      seenRoleKeys.add(roleKey);
      return job;
    })
    .filter((job): job is JobListing => job !== null);
}

const getCachedLinkedInPosts = unstable_cache(
  async () => fetchLinkedInJobPosts(),
  ["linkedin-company-job-posts"],
  {
    revalidate: 300,
    tags: ["jobs", "linkedin-jobs"],
  }
);

export async function getJobs(): Promise<JobListing[]> {
  try {
    const posts = await getCachedLinkedInPosts();
    const jobs = mergeLinkedInPosts(posts);

    if (jobs.length > 0) {
      return jobs;
    }
  } catch (error) {
    console.error("LinkedIn job sync failed:", error);
  }

  return getFallbackJobs();
}

export async function getJobBySlug(slug: string) {
  const jobs = await getJobs();
  return jobs.find((job) => job.slug === slug);
}

function getFallbackJobs(): JobListing[] {
  return jobEnrichments.map((enrichment) => ({
    slug: enrichment.slug,
    title: enrichment.title,
    location: enrichment.location,
    region: enrichment.region,
    salary: enrichment.salary,
    sector: enrichment.sector,
    type: enrichment.type,
    summary: enrichment.summary,
    overview: enrichment.overview,
    responsibilities:
      enrichment.responsibilities ?? defaultResponsibilities(enrichment.sector),
    requirements: enrichment.requirements,
    desirable: enrichment.desirable ?? defaultDesirable,
    benefits: enrichment.benefits ?? defaultBenefits,
    workingHours:
      enrichment.workingHours ??
      defaultWorkingHours(enrichment.sector, enrichment.overview),
    postedDate: new Date().toISOString().slice(0, 10),
    linkedInUrl: "",
    linkedInActivityId: enrichment.linkedInActivityId ?? "",
    syncedAt: new Date().toISOString(),
  }));
}

export const jobsRevalidateSeconds = 300;