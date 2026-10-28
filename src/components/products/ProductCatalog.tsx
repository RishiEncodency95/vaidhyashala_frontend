"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ArrowRight, ChevronDown, Search } from "lucide-react";
import { useProductsPage } from "@/lib/productsPage";
import { assetUrl } from "@/lib/home2";
import { ApiProduct, fetchProducts } from "@/lib/catalogApi";
import ProductDetailModal from "@/components/products/ProductDetailModal";
import ProductEnquiryModal from "@/components/products/ProductEnquiryModal";

interface Product {
  id: string;
  title: string;
  categoryTag: string;
  category: string;
  description: React.ReactNode;
  searchText: string;
  imageSrc: string;
  /** Only set for products from the admin */
  detail?: {
    productType?: string;
    packOptions?: string;
    availability?: string;
    productInfo?: string;
    directions?: string;
    gallery: string[];
  };
}

const GUIDANCE_IMAGE = "/product/vaidhyashala_product_page_images/14_product_guidance_consultation.webp";

const allProducts: Product[] = [
  {
    id: "p1",
    title: "Ayurvedic Tablets",
    categoryTag: "AYURVEDIC PREPARATIONS",
    category: "Ayurvedic Preparations",
    description: (
      <>
        Classical Ayurvedic tablet
        <br />
        formulations.
      </>
    ),
    searchText: "Classical Ayurvedic tablet formulations.",
    imageSrc: "/product/vaidhyashala_product_page_images/01_ayurvedic_tablets.webp",
  },
  {
    id: "p2",
    title: "Ayurvedic Syrup",
    categoryTag: "AYURVEDIC PREPARATIONS",
    category: "Ayurvedic Preparations",
    description: (
      <>
        Herbal syrup formulations
        <br />
        in convenient liquid form.
      </>
    ),
    searchText: "Herbal syrup formulations in convenient liquid form.",
    imageSrc: "/product/vaidhyashala_product_page_images/02_ayurvedic_syrup.webp",
  },
  {
    id: "p3",
    title: "Herbal Capsules",
    categoryTag: "AYURVEDIC PREPARATIONS",
    category: "Ayurvedic Preparations",
    description: (
      <>
        Plant-based herbal
        <br />
        capsule formulations.
      </>
    ),
    searchText: "Plant-based herbal capsule formulations.",
    imageSrc: "/product/vaidhyashala_product_page_images/03_herbal_capsules.webp",
  },
  {
    id: "p4",
    title: "Herbal Powder",
    categoryTag: "HERBAL POWDERS",
    category: "Herbal Powders",
    description: (
      <>
        Traditional herbal powders
        <br />
        for everyday use.
      </>
    ),
    searchText: "Traditional herbal powders for everyday use.",
    imageSrc: "/product/vaidhyashala_product_page_images/04_herbal_powder.webp",
  },
  {
    id: "p5",
    title: "Ayurvedic Massage Oil",
    categoryTag: "THERAPY OILS",
    category: "Therapy Oils",
    description: (
      <>
        Traditional herbal oils for
        <br />
        abhyanga and external use.
      </>
    ),
    searchText: "Traditional herbal oils for abhyanga and external use.",
    imageSrc: "/product/vaidhyashala_product_page_images/05_ayurvedic_massage_oil.webp",
  },
  {
    id: "p6",
    title: "Hair Care Oil",
    categoryTag: "PERSONAL CARE",
    category: "Personal Care",
    description: (
      <>
        Herbal hair care oil
        <br />
        formulations.
      </>
    ),
    searchText: "Herbal hair care oil formulations.",
    imageSrc: "/product/vaidhyashala_product_page_images/06_hair_care_oil.webp",
  },
  {
    id: "p7",
    title: "Herbal Skin Care Oil",
    categoryTag: "PERSONAL CARE",
    category: "Personal Care",
    description: (
      <>
        Herbal oils for daily
        <br />
        skin care.
      </>
    ),
    searchText: "Herbal oils for daily skin care.",
    imageSrc: "/product/vaidhyashala_product_page_images/07_herbal_skin_care_oil.webp",
  },
  {
    id: "p8",
    title: "Herbal Bath Powder",
    categoryTag: "PERSONAL CARE",
    category: "Personal Care",
    description: (
      <>
        Herbal powder for
        <br />
        cleansing and refreshing.
      </>
    ),
    searchText: "Herbal powder for cleansing and refreshing.",
    imageSrc: "/product/vaidhyashala_product_page_images/08_herbal_bath_powder.webp",
  },
  {
    id: "p9",
    title: "Herbal Face Care",
    categoryTag: "PERSONAL CARE",
    category: "Personal Care",
    description: (
      <>
        Herbal formulations for
        <br />
        daily face care.
      </>
    ),
    searchText: "Herbal formulations for daily face care.",
    imageSrc: "/product/vaidhyashala_product_page_images/09_herbal_face_care.webp",
  },
  {
    id: "p10",
    title: "Herbal Hair Cleanser",
    categoryTag: "PERSONAL CARE",
    category: "Personal Care",
    description: (
      <>
        Gentle herbal cleanser
        <br />
        for hair care.
      </>
    ),
    searchText: "Gentle herbal cleanser for hair care.",
    imageSrc: "/product/vaidhyashala_product_page_images/10_herbal_hair_cleanser.webp",
  },
  {
    id: "p11",
    title: "Herbal Tea",
    categoryTag: "WELLNESS ESSENTIALS",
    category: "Wellness Essentials",
    description: (
      <>
        Aromatic herbal tea
        <br />
        blends.
      </>
    ),
    searchText: "Aromatic herbal tea blends.",
    imageSrc: "/product/vaidhyashala_product_page_images/11_herbal_tea.webp",
  },
  {
    id: "p12",
    title: "Wellness Essentials",
    categoryTag: "WELLNESS ESSENTIALS",
    category: "Wellness Essentials",
    description: (
      <>
        Everyday wellness
        <br />
        support products.
      </>
    ),
    searchText: "Everyday wellness support products.",
    imageSrc: "/product/vaidhyashala_product_page_images/12_wellness_essentials.webp",
  },
];

const categoryNames = [
  "Ayurvedic Preparations",
  "Therapy Oils",
  "Herbal Powders",
  "Personal Care",
  "Wellness Essentials",
];

/** Admin product -> card. A product without an uploaded image keeps the website's own picture for it */
const fromApi = (p: ApiProduct): Product => {
  const name = p.category?.name ?? "";
  const bundled = allProducts.find((s) => s.title.toLowerCase() === p.title.trim().toLowerCase());
  const imageSrc = assetUrl(p.image) || bundled?.imageSrc || GUIDANCE_IMAGE;
  const text = p.shortDescription || p.description || "";
  return {
    id: p._id,
    title: p.title,
    categoryTag: name.toUpperCase(),
    category: name,
    description: text,
    searchText: text,
    imageSrc,
    detail: {
      productType: p.productType,
      packOptions: p.packOptions,
      availability: p.availability,
      productInfo: p.productInfo,
      directions: p.directions,
      gallery: [imageSrc, assetUrl(p.galleryImage1) || imageSrc, assetUrl(p.galleryImage2) || GUIDANCE_IMAGE],
    },
  };
};

export default function ProductCatalog() {
  const { catalog, categoryFilter } = useProductsPage();
  const [liveProducts, setLiveProducts] = useState<Product[] | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(controller.signal).then((items) => {
      if (!controller.signal.aborted && items && items.length) setLiveProducts(items.map(fromApi));
    });
    return () => controller.abort();
  }, []);
  // The admin's list once it loads; the built-in list if the API has nothing or cannot be reached
  const products = liveProducts ?? allProducts;
  const names = liveProducts
    ? Array.from(new Set(liveProducts.map((p) => p.category).filter(Boolean)))
    : categoryNames;
  const allLabel = categoryFilter?.allLabel || "All Products";
  const categories = [allLabel, ...names];
  // "" means "All", so the selection survives the label being changed in the admin
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [shown, setShown] = useState<number | null>(null);
  const visibleCount = shown ?? catalog?.initialCount ?? 12;
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [enquiryProduct, setEnquiryProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "" ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        searchQuery.trim() === "" ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.searchText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  if (!catalog) return null;

  return (
    <section id="catalogue" className="w-full bg-[#FAF8F3] pt-6 sm:pt-7 pb-8 sm:pb-10 border-b border-[#ECE6DB]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Filter Bar & Search Input (Single Row) */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {categories.map((cat) => {
              const value = cat === allLabel ? "" : cat;
              const isActive = selectedCategory === value;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(value)}
                  className={`rounded-full px-4 py-1.5 sm:py-2 text-[13.5px] font-medium transition-all ${
                    isActive
                      ? "bg-[#0D3226] text-white shadow-2xs font-semibold"
                      : "border border-[#DFD7CB] bg-white text-[#55645C] hover:border-[#0D3226] hover:text-[#0D3226]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input (Soft rounded rectangle with magnifying glass) */}
          <div className="relative w-full sm:w-[260px] lg:w-[280px] flex-shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C988F]" />
            <input
              type="text"
              placeholder={categoryFilter?.searchPlaceholder ?? ""}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-[#D5CDC0] bg-white pl-9.5 pr-3.5 py-1.5 sm:py-2 text-[13px] text-[#22332A] placeholder-[#8C988F] focus:border-[#0D3226] focus:outline-none"
            />
          </div>
        </div>

        {/* Caption directly below tabs */}
        <p className="text-[12px] sm:text-[12.5px] italic text-[#8C988F] mt-2 mb-6 sm:mb-7">
          {categoryFilter?.note}
        </p>

        {/* Section Heading & Subtitle Row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-6 sm:pb-7">
          <div>
            <h2 className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-medium leading-[1.14] text-[#0D3226]">
              {catalog.heading}
            </h2>
          </div>
          <p className="text-[14.5px] sm:text-[15px] font-medium leading-[1.6] text-[#4A5950] max-w-lg md:text-right">
            {catalog.description}
          </p>
        </div>

        {/* 12 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {filteredProducts.slice(0, visibleCount).map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="group flex flex-col transition-all duration-200 cursor-pointer"
            >
              {/* Product Image Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[#E6DFD1] bg-[#F3EDE2] shadow-2xs">
                <img
                  src={product.imageSrc}
                  alt={product.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Eyebrow Category */}
              <span className="mt-3 text-[11.5px] sm:text-[12px] font-bold tracking-[1.4px] uppercase text-[#A58351]">
                {product.categoryTag}
              </span>

              {/* Title */}
              <h3 className="mt-1 font-serif text-[17.5px] sm:text-[18px] font-medium text-[#0D3226] leading-snug group-hover:text-[#184838] transition-colors">
                {product.title}
              </h3>

              {/* Description (exact 2 lines) */}
              <p className="mt-1.5 text-[13px] sm:text-[13.5px] font-medium text-[#4A5950] leading-[1.5]">
                {product.description}
              </p>

              {/* Action Link with Gold Underline */}
              <div className="mt-2.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(product);
                  }}
                  className="inline-flex items-center gap-1.5 pb-1 border-b border-[#C5A265] text-[13.5px] sm:text-[14px] font-medium text-[#0D3226] transition-all hover:border-[#0D3226] hover:text-[#184838]"
                >
                  <span>{catalog.viewDetailsLabel}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-7 sm:mt-9 flex flex-col items-center justify-center text-center">
          <button
            onClick={() => setShown(Math.min(visibleCount + catalog.loadMoreStep, filteredProducts.length))}
            className="inline-flex items-center gap-2 rounded-md border border-[#D5CDBC] bg-[#FAF8F3] px-6 py-2.5 text-[14px] font-medium text-[#0D3226] transition-all hover:bg-[#F3ECE0]"
          >
            <span>{catalog.loadMoreLabel}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          <p className="mt-2 text-[12px] sm:text-[12.5px] font-medium text-[#7A8880]">
            {catalog.footnote}
          </p>
        </div>
      </div>

      {/* Product Detail Modal Popup */}
      {selectedProduct && (
        <ProductDetailModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={{
            id: selectedProduct.id,
            title: selectedProduct.title,
            categoryTag: selectedProduct.categoryTag,
            description: selectedProduct.searchText,
            ...selectedProduct.detail,
            images: selectedProduct.detail?.gallery ?? [
              selectedProduct.imageSrc,
              selectedProduct.imageSrc,
              GUIDANCE_IMAGE,
            ],
          }}
          onContactClinic={() => {
            setSelectedProduct(null);
            window.location.href = "/contact";
          }}
        />
      )}

      {/* Product Enquiry Modal Popup */}
      {enquiryProduct && (
        <ProductEnquiryModal
          isOpen={!!enquiryProduct}
          onClose={() => setEnquiryProduct(null)}
          product={{
            id: enquiryProduct.id,
            title: enquiryProduct.title,
            categoryTag: enquiryProduct.categoryTag,
            imageSrc: enquiryProduct.imageSrc,
          }}
        />
      )}
    </section>
  );
}
