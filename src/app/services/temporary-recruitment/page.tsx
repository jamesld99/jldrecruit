import { ServicePage, createServiceMetadata } from "@/components/ServicePage";
import { servicePages } from "@/lib/services";

const content = servicePages["temporary-recruitment"];

export const metadata = createServiceMetadata(content);

export default function TemporaryRecruitmentPage() {
  return <ServicePage content={content} />;
}
