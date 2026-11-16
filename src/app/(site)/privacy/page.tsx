import type { Metadata } from "next";
import PrivacyPage from "@/components/privacy/PrivacyPage";
import { JsonLd, withSeo } from "@/lib/seo";

const fallbackMetadata: Metadata = {
  title: "Privacy Policy | The Vaidhyashala",
  description:
    "How information shared through the Vaidhyashala website is handled. Read our draft privacy policy for appointments, enquiries, and healthcare services.",
};

// SEO from Admin → SEO Information, with the text above when nothing is saved there
export async function generateMetadata(): Promise<Metadata> {
  return withSeo(fallbackMetadata, "pages/privacy");
}

export default function Page() {
  return (
    <>
      <JsonLd endpoint="pages/privacy" />
      <PrivacyPage />
    </>
  );
}
