import type { Metadata } from "next";
import { siteConfig } from "./constants";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function createMetadata({
  title,
  description,
  path,
  keywords = [],
}: PageMeta): Metadata {
  const fullTitle =
    title === siteConfig.name
      ? `${siteConfig.name} | ${siteConfig.tagline}`
      : `${title} | ${siteConfig.name}`;

  const defaultKeywords = [
    "recruitment agency UK",
    "automotive recruitment agency",
    "engineering recruitment agency",
    "technical recruitment agency",
    "permanent recruitment",
  ];

  return {
    title: fullTitle,
    description,
    keywords: [...defaultKeywords, ...keywords],
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: `${siteConfig.url}${path}`,
      siteName: siteConfig.name,
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
