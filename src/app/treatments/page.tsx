// Server part of the page: its SEO (admin → SEO Information) and schema; the page itself is ./view
import TreatmentsPage from "./view";
import { JsonLd, seoMetadata } from "@/lib/seoServer";

export const generateMetadata = () => seoMetadata("pages/treatments");

export default function Page() {
  return (
    <>
      <JsonLd endpoint="pages/treatments" />
      <TreatmentsPage />
    </>
  );
}
