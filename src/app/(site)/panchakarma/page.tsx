import PanchakarmaPage from "@/components/panchakarma/PanchakarmaPage";
import { JsonLd, seoMetadata } from "@/lib/seo";

// SEO and schema come from Admin → SEO Information
export const generateMetadata = () => seoMetadata("pages/panchakarma");

export default function Page() {
  return (
    <>
      <JsonLd endpoint="pages/panchakarma" />
      <PanchakarmaPage />
    </>
  );
}
