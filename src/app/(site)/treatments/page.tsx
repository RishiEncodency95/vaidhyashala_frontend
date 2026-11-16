import TreatmentsPage from "@/components/treatments/TreatmentsPage";
import { JsonLd, seoMetadata } from "@/lib/seo";

// SEO and schema come from Admin → SEO Information
export const generateMetadata = () => seoMetadata("pages/treatments");

export default function Page() {
  return (
    <>
      <JsonLd endpoint="pages/treatments" />
      <TreatmentsPage />
    </>
  );
}
