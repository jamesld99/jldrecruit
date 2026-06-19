import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";
import { getJobs } from "@/lib/jobs";
import { locationPages } from "@/lib/location-pages";
import { getPublishedInsightArticles } from "@/lib/insights";
import { recruitmentPages } from "@/lib/recruitment-pages";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const jobs = await getJobs();
  const staticRoutes = [
    "",
    "/employers",
    "/job-seekers",
    "/jobs",
    "/sectors",
    "/about",
    "/insights",
    "/uk-coverage",
    "/services/permanent-recruitment",
    "/contact",
    "/how-it-works",
    "/privacy-policy",
    "/terms-of-use",
  ];

  const recruitmentRoutes = recruitmentPages.map(
    (page) => `/recruitment/${page.slug}`
  );
  const locationRoutes = locationPages.map(
    (page) => `/locations/${page.slug}`
  );
  const insightRoutes = getPublishedInsightArticles().map(
    (article) => `/insights/${article.slug}`
  );
  const jobRoutes = jobs.map((job) => `/jobs/${job.slug}`);

  const allRoutes = [
    ...staticRoutes,
    ...recruitmentRoutes,
    ...locationRoutes,
    ...insightRoutes,
    ...jobRoutes,
  ];

  return allRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency:
      route.startsWith("/jobs") ? "weekly" : route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/jobs" ? 0.9 : 0.8,
  }));
}
