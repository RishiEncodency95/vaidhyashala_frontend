"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { API_BASE } from "@/lib/api";
import { ApiProduct } from "@/lib/catalog";
import { allProducts, fromApi, type Product } from "@/components/products/ProductCatalog";
import { slugify } from "@/lib/builtinProducts";
import ProductDetailView from "@/components/products/ProductDetailView";

/** One product's page: "/products/<slug>". Admin product first, then the built-in list. */
export default function ProductDetailPage({ slug, initialApiProduct }: { slug: string; initialApiProduct?: ApiProduct | null }) {
  const [product, setProduct] = useState<Product | null | undefined>(() => {
    if (initialApiProduct) return fromApi(initialApiProduct);
    if (initialApiProduct === null) {
      const found = allProducts.find((p) => p.slug === slugify(slug));
      if (found) {
        return {
          ...found,
          detail: found.detail ?? (found.slug === "ayurvedic-tablets" || found.slug === "triphala-juice" ? {
            price: 450,
            mrp: 600,
            gallery: [found.imageSrc],
          } : undefined),
        };
      }
      return null;
    }
    return undefined;
  });

  useEffect(() => {
    if (initialApiProduct !== undefined) return;
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/website/products/${encodeURIComponent(slug)}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (res.ok) {
          const json = await res.json();
          if (json?.data) return setProduct(fromApi(json.data as ApiProduct));
        }
      } catch {
        if (controller.signal.aborted) return;
      }
      const found = allProducts.find((p) => p.slug === slugify(slug));
      if (found) {
        const productWithDefaults = {
          ...found,
          detail: found.detail ?? (found.slug === "ayurvedic-tablets" || found.slug === "triphala-juice" ? {
            price: 450,
            mrp: 600,
            gallery: [found.imageSrc],
          } : undefined),
        };
        return setProduct(productWithDefaults);
      }
      setProduct(null);
    })();
    return () => controller.abort();
  }, [slug]);

  if (product === undefined) {
    return <div className="min-h-[60vh] bg-[#FAF8F3]" aria-busy="true" />;
  }
  if (product === null) {
    return (
      <div className="min-h-[50vh] bg-[#FAF8F3] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="font-serif text-[28px] text-[#0D3226]">Product not found</h1>
        <Link href="/products" className="rounded-lg bg-[#0D382B] px-5 py-3 text-[14px] font-bold text-white">
          Back to all products
        </Link>
      </div>
    );
  }

  return (
    <ProductDetailView
      product={{
        id: product.id,
        title: product.title,
        category: product.category,
        categoryTag: product.categoryTag,
        shortDescription: product.detail?.shortDescription || product.description,
        description: product.detail?.description || product.searchText,
        productType: product.detail?.productType,
        packOptions: product.detail?.packOptions,
        availability: product.detail?.availability,
        price: product.detail?.price,
        mrp: product.detail?.mrp,
        slug: product.slug,
        productInfo: product.detail?.productInfo,
        directions: product.detail?.directions,
        usageNotes: product.detail?.usageNotes,
        imageAlt: product.detail?.imageAlt,
        images: product.detail?.gallery ?? [product.imageSrc],
        video: product.detail?.video,
        howToStep1: product.detail?.howToStep1,
        howToStep2: product.detail?.howToStep2,
        howToStep3: product.detail?.howToStep3,
        keyIngredients: product.detail?.keyIngredients,
        precautions: product.detail?.precautions,
        netQuantity: product.detail?.netQuantity,
        formulationType: product.detail?.formulationType,
        manufacturer: product.detail?.manufacturer,
        shelfLife: product.detail?.shelfLife,
        batchExpiry: product.detail?.batchExpiry,
        countryOfOrigin: product.detail?.countryOfOrigin,
      }}
    />
  );
}
