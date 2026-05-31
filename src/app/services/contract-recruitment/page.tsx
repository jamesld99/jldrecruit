import { ServicePage, createServiceMetadata } from "@/components/ServicePage";
import { servicePages } from "@/lib/services";

const content = servicePages["contract-recruitment"];

export const metadata = createServiceMetadata(content);

export default function ContractRecruitmentPage() {
  return <ServicePage content={content} />;
}
