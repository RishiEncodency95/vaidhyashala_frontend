import ContactPage from "@/components/contact/ContactPage";
import { JsonLd, seoMetadata } from "@/lib/seo";

// SEO and schema come from Admin → SEO Information
export const generateMetadata = () => seoMetadata("pages/contact");

export default function Page() {
  return (
    <>
      <JsonLd endpoint="pages/contact" />
      <ContactPage />
    </>
  );
}
