// Server part of the page: its SEO (admin → SEO Information) and schema; the page itself is ./view
import PanchakarmaPage from "./view";
import { JsonLd, seoMetadata } from "@/lib/seoServer";

export const generateMetadata = () => seoMetadata("pages/panchakarma");

export default function Page() {
  return (
    <>
      <JsonLd endpoint="pages/panchakarma" />
      <PanchakarmaPage />
    </>
  );
}
