import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";
import { jobs } from "@/lib/jobs";
import { locationPages } from "@/lib/location-pages";
import { recruitmentPages } from "@/lib/recruitment-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/employers",
    "/job-seekers",
    "/jobs",
    "/sectors",
    "/about",
    "/how-it-works",
    "/services/permanent-recruitment",
    "/services/temporary-recruitment",
    "/services/contract-recruitment",
    "/contact",
    "/privacy-policy",
    "/terms-of-use",
  ];

  const recruitmentRoutes = recruitmentPages.map(
    (page) => `/recruitment/${page.slug}`
  );
  const locationRoutes = locationPages.map(
    (page) => `/locations/${page.slug}`
  );
  const jobRoutes = jobs.map((job) => `/jobs/${job.slug}`);

  const allRoutes = [
    ...staticRoutes,
    ...recruitmentRoutes,
    ...locationRoutes,
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
