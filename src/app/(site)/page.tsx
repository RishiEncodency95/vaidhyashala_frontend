import HomePage from "@/components/home/HomePage";
import { JsonLd, seoMetadata } from "@/lib/seo";

// SEO and schema come from Admin → SEO Information
export const generateMetadata = () => seoMetadata("home2");

export default function Page() {
  return (
    <>
      <JsonLd endpoint="home2" />
      <HomePage />
    </>
  );
}
