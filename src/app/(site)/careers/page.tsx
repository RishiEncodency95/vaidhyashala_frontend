import type { Metadata } from "next";
import CareersPage from "@/components/careers/CareersPage";
import { JsonLd, withSeo } from "@/lib/seo";

const fallbackMetadata: Metadata = {
  title: "Careers | Vaidhyashala Ayurvedic Clinic",
  description:
    "Build a purposeful career in Ayurveda. Be a part of a dedicated team committed to authentic Ayurvedic care, holistic healing and healthier lives at Vaidhyashala.",
};

// SEO from Admin → SEO Information, with the text above when nothing is saved there
export async function generateMetadata(): Promise<Metadata> {
  return withSeo(fallbackMetadata, "pages/careers");
}

export default function Page() {
  return (
    <>
      <JsonLd endpoint="pages/careers" />
      <CareersPage />
    </>
  );
}
