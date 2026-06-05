import { notFound } from "next/navigation";
import {
  SeoLandingPage,
  createSeoMetadata,
  type SeoLandingContent,
} from "@/components/SeoLandingPage";
import { getLocationPage, locationPages } from "@/lib/location-pages";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return locationPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = getLocationPage(slug);
  if (!page) return {};

  const content: SeoLandingContent = {
    slug: page.slug,
    metaTitle: page.metaTitle,
    metaDescription: page.metaDescription,
    keywords: page.keywords,
    heroEyebrow: `${page.role} Recruitment`,
    heroTitle: page.heroTitle,
    heroDescription: page.heroDescription,
    overview: page.overview,
    roles: page.roles,
    faqs: page.faqs,
    relatedLinks: page.relatedLinks,
    pagePath: `/locations/${page.slug}`,
    breadcrumbParent: { name: "Jobs", url: "/jobs" },
  };

  return createSeoMetadata(content);
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const page = getLocationPage(slug);

  if (!page) notFound();

  const content: SeoLandingContent = {
    slug: page.slug,
    metaTitle: page.metaTitle,
    metaDescription: page.metaDescription,
    keywords: page.keywords,
    heroEyebrow: `${page.role} Recruitment`,
    heroTitle: page.heroTitle,
    heroDescription: page.heroDescription,
    overview: page.overview,
    roles: page.roles,
    faqs: page.faqs,
    relatedLinks: page.relatedLinks,
    pagePath: `/locations/${page.slug}`,
    breadcrumbParent: { name: "Jobs", url: "/jobs" },
  };

  return <SeoLandingPage content={content} />;
}
