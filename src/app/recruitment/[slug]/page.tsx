import { notFound } from "next/navigation";
import {
  SeoLandingPage,
  createSeoMetadata,
  type SeoLandingContent,
} from "@/components/SeoLandingPage";
import {
  getRecruitmentPage,
  recruitmentPages,
} from "@/lib/recruitment-pages";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return recruitmentPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = getRecruitmentPage(slug);
  if (!page) return {};

  const content: SeoLandingContent = {
    ...page,
    heroEyebrow: page.heroEyebrow,
    pagePath: `/recruitment/${page.slug}`,
    breadcrumbParent: { name: "Sectors", url: "/sectors" },
  };

  return createSeoMetadata(content);
}

export default async function RecruitmentPage({ params }: Props) {
  const { slug } = await params;
  const page = getRecruitmentPage(slug);

  if (!page) notFound();

  const content: SeoLandingContent = {
    ...page,
    pagePath: `/recruitment/${page.slug}`,
    breadcrumbParent: { name: "Sectors", url: "/sectors" },
  };

  return <SeoLandingPage content={content} />;
}
