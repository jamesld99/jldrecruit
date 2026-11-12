import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function DevJobRedirectPage({ params }: Props) {
  if (process.env.NODE_ENV !== "development") notFound();
  const { slug } = await params;
  redirect(`/jobs/preview/${slug}`);
}
