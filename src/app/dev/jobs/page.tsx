import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function DevJobsRedirectPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  redirect("/jobs/preview");
}
