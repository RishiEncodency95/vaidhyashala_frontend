import type { Metadata } from "next";
import ProductDetailPage from "@/components/products/ProductDetailPage";
import { fetchProduct, fetchProducts } from "@/lib/catalog";
import { builtinProducts, slugify } from "@/lib/builtinProducts";

/** Product pages built ahead of time: the admin's products, or the built-in ones if the API is down.
    Products added later are rendered on their first visit. */
export async function generateStaticParams() {
  const items = await fetchProducts();
  const slugs = items?.length ? items.map((p) => p.slug || slugify(p.title)) : builtinProducts.map((p) => slugify(p.title));
  return Array.from(new Set(slugs.filter(Boolean))).map((slug) => ({ slug }));
}

export const metadata: Metadata = { title: "Ayurvedic Products | The Vaidhyashala" };

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const initialApiProduct = await fetchProduct(slug);
  return <ProductDetailPage slug={slug} initialApiProduct={initialApiProduct} />;
}
