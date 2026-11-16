import type { Metadata } from "next";
import ProductsPage from "@/components/products/ProductsPage";
import { JsonLd, withSeo } from "@/lib/seo";

const fallbackMetadata: Metadata = {
  title: "Ayurvedic Products & Formulations | The Vaidhyashala",
  description:
    "Explore Ayurvedic preparations, therapy oils and wellness essentials. Ask our team about product details, availability and consultations.",
};

// SEO from Admin → SEO Information, with the text above when nothing is saved there
export async function generateMetadata(): Promise<Metadata> {
  return withSeo(fallbackMetadata, "pages/products");
}

export default function Page() {
  return (
    <>
      <JsonLd endpoint="pages/products" />
      <ProductsPage />
    </>
  );
}
