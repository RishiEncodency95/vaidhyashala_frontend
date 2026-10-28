// Server part of the page: its SEO (admin → SEO Information) and schema; the page itself is ./view
import HealthJournalPage from "./view";
import { JsonLd, seoMetadata } from "@/lib/seoServer";

export const generateMetadata = () => seoMetadata("home1");

export default function Page() {
  return (
    <>
      <JsonLd endpoint="home1" />
      <HealthJournalPage />
    </>
  );
}
