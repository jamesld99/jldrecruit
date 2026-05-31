import { ServicePage, createServiceMetadata } from "@/components/ServicePage";
import { servicePages } from "@/lib/services";

const content = servicePages["permanent-recruitment"];

export const metadata = createServiceMetadata(content);

export default function PermanentRecruitmentPage() {
  return <ServicePage content={content} />;
}
