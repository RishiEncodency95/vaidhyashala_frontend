import type { Metadata } from "next";
import TestimonialsPage from "@/components/testimonials/TestimonialsPage";
import { JsonLd, withSeo } from "@/lib/seo";

const fallbackMetadata: Metadata = {
  title: "Patient Testimonials & Experiences | The Vaidhyashala",
  description:
    "Read genuine experiences from patients at The Vaidhyashala. Feedback on Ayurvedic consultations, Panchakarma therapies, and compassionate clinic care.",
};

// SEO from Admin → SEO Information, with the text above when nothing is saved there
export async function generateMetadata(): Promise<Metadata> {
  return withSeo(fallbackMetadata, "pages/testimonials");
}

export default function Page() {
  return (
    <>
      <JsonLd endpoint="pages/testimonials" />
      <TestimonialsPage />
    </>
  );
}
