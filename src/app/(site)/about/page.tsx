import AboutPage from "@/components/about/AboutPage";
import { JsonLd, seoMetadata } from "@/lib/seo";

// SEO and schema come from Admin → SEO Information
export const generateMetadata = () => seoMetadata("pages/about-us");

export default function Page() {
  return (
    <>
      <JsonLd endpoint="pages/about-us" />
      <AboutPage />
    </>
  );
}
