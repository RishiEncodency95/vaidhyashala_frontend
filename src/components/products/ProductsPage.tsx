import ProductsHero from "@/components/products/ProductsHero";
import ProductCatalog from "@/components/products/ProductCatalog";
import GuidanceSection from "@/components/products/GuidanceSection";
import ProductEnquiryForm from "@/components/products/ProductEnquiryForm";
import ProductsFAQ from "@/components/products/ProductsFAQ";
import { ProductsProvider } from "@/lib/content/products";

export default function ProductsPage() {
  return (
    <div className="flex flex-1 flex-col bg-[#FAF8F3] text-[#22332A]">
      {/* Main Content */}
      <ProductsProvider>
        <main className="flex-1">
          {/* 1. Hero: Ayurveda for your everyday care */}
          <ProductsHero />

          {/* 2. Product Catalog: Filters, Search, 12 Cards, Load More */}
          <ProductCatalog />

          {/* 3. Doctor Guidance: Choose with the right guidance */}
          <GuidanceSection />

          {/* 4. Product Enquiry Form: Enquire about a product */}
          <ProductEnquiryForm />

          {/* 5. FAQs & Pre-Footer Banner */}
          <ProductsFAQ />
        </main>
      </ProductsProvider>
    </div>
  );
}
