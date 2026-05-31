import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/employers",
    "/job-seekers",
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

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
