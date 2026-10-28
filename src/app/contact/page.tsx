// Server part of the page: its SEO (admin → SEO Information) and schema; the page itself is ./view
import ContactPage from "./view";
import { JsonLd, seoMetadata } from "@/lib/seoServer";

export const generateMetadata = () => seoMetadata("pages/contact");

export default function Page() {
  return (
    <>
      <JsonLd endpoint="pages/contact" />
      <ContactPage />
    </>
  );
}
