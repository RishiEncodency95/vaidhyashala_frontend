import type { Metadata } from "next";
import TermsPage from "@/components/terms/TermsPage";
import { JsonLd, withSeo } from "@/lib/seo";

const fallbackMetadata: Metadata = {
  title: "Terms of Use | The Vaidhyashala",
  description:
    "Guidelines for using the website and requesting clinic assistance. Read our draft terms of use for Vaidhyashala website, consultations, therapies and product information.",
};

// SEO from Admin → SEO Information, with the text above when nothing is saved there
export async function generateMetadata(): Promise<Metadata> {
  return withSeo(fallbackMetadata, "pages/terms");
}

export default function Page() {
  return (
    <>
      <JsonLd endpoint="pages/terms" />
      <TermsPage />
    </>
  );
}
