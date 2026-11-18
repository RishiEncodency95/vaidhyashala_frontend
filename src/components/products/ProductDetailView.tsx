"use client";

import React, { useState } from "react";
import {
  Leaf,
  Package,
  Calendar,
  Info,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  Truck,
  MessageCircle,
  ShoppingCart,
  Check,
  FileText,
  ClipboardList,
  Minus,
  Plus,
} from "lucide-react";
import Link from "next/link";
import ProductEnquiryModal from "@/components/products/ProductEnquiryModal";
import { useCart, rupees } from "@/lib/cart";
import CmsImage from "@/components/common/CmsImage";

export interface ProductDetailViewProps {
  product?: {
    id?: string;
    title?: string;
    categoryTag?: string;
    description?: string;
    productType?: string;
    packOptions?: string;
    availability?: string;
    price?: number;
    mrp?: number;
    slug?: string;
    productInfo?: string;
    directions?: string;
    /** Lines of the green note box, one per line */
    usageNotes?: string;
    imageAlt?: string;
    /** Main image first, then the extra images */
    images?: string[];
  };
  onEnquire?: () => void;
}

const DETAIL_CARDS = [
  { key: "description", label: "Description", icon: FileText },
  { key: "info", label: "Product information", icon: Info },
  { key: "directions", label: "Directions & precautions", icon: ClipboardList },
] as const;

export default function ProductDetailView({ product, onEnquire }: ProductDetailViewProps) {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const providedImages = (product?.images ?? []).filter(Boolean);
  const galleryImages = providedImages.length
    ? providedImages
    : ["/product/vaidhyashala_product_page_images/14_product_guidance_consultation.webp"];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Empty fields get wording that is true for every product (keep in step with the admin's POPUP_DEFAULTS)
  const title = product?.title || "Product";
  const categoryTag = product?.categoryTag || "";
  const description = product?.description || "";
  const productType = product?.productType || "";
  const packOptions = product?.packOptions || "Confirm with the clinic";
  const availability = product?.availability || "Enquire with our team";
  const productInfo =
    product?.productInfo ||
    "Details of the available formulation and manufacturer will be shared by our clinic team.";
  const directions =
    product?.directions ||
    "Use as directed by your physician or as indicated on the pack label. Store in a cool, dry place away from direct sunlight.";
  const usageNotes = (product?.usageNotes || "Use as directed by the product label or your treating doctor.")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const imageAlt = product?.imageAlt || title;

  const price = Number(product?.price) || 0;
  const mrp = Number(product?.mrp) || 0;
  const hasPrice = price > 0;
  const hasDiscount = hasPrice && mrp > price;
  const savings = hasDiscount ? mrp - price : 0;
  const percentOff = hasDiscount ? Math.round((savings / mrp) * 100) : 0;

  const addToCart = () => {
    if (!hasPrice || !product?.id) return;
    add(
      { id: product.id, slug: product.slug || "", title, image: galleryImages[0], price, mrp: hasDiscount ? mrp : price },
      qty,
    );
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const attributes = [
    productType && { icon: Leaf, label: "Product type", value: productType },
    { icon: Package, label: "Pack options", value: packOptions },
    { icon: Calendar, label: "Availability", value: availability },
  ].filter(Boolean) as { icon: typeof Leaf; label: string; value: string }[];

  const cardBody = { description, info: productInfo, directions };

  return (
    <div className="w-full bg-[#FAF8F3] text-[#22332A]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-3 sm:mb-4 flex flex-wrap items-center gap-1 text-[13px] text-[#6B7A71]">
          <Link href="/" className="hover:text-[#0D382B]">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/products" className="hover:text-[#0D382B]">Products</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-[#0D382B]">{title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_500px] xl:grid-cols-[minmax(0,1fr)_520px] gap-5 lg:gap-7 items-start">
          {/* ============ GALLERY ============ */}
          <div className="lg:sticky lg:top-24 flex flex-col-reverse sm:flex-row gap-2.5 sm:gap-3">
            {galleryImages.length > 1 && (
              <div className="flex sm:flex-col gap-2.5 sm:gap-3 sm:w-[84px] flex-shrink-0 overflow-x-auto sm:overflow-visible">
                {galleryImages.map((src, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`Show picture ${idx + 1}`}
                    className={`relative aspect-square w-[72px] sm:w-full flex-shrink-0 overflow-hidden rounded-lg bg-white transition-all ${
                      activeImageIndex === idx
                        ? "border-2 border-[#0D382B]"
                        : "border border-[#DFD7CB] opacity-80 hover:opacity-100"
                    }`}
                  >
                    <CmsImage fill sizes="90px" src={src} alt={`${imageAlt} – picture ${idx + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            <div className="relative aspect-[4/3] w-full flex-1 overflow-hidden rounded-2xl border border-[#E6DFD1] bg-white shadow-2xs">
              <CmsImage
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                src={galleryImages[activeImageIndex] ?? galleryImages[0]}
                alt={imageAlt}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* ============ PRODUCT INFO ============ */}
          <div className="flex min-w-0 flex-col">
            {categoryTag && (
              <span className="text-[12px] font-bold tracking-[1.4px] uppercase text-[#A07038]">{categoryTag}</span>
            )}
            <h1 className="mt-0.5 font-serif text-[28px] sm:text-[32px] lg:text-[34px] font-medium leading-[1.12] text-[#0A291F]">
              {title}
            </h1>

            {/* Price */}
            <div className="mt-3 border-y border-[#ECE5D8] py-3">
              {hasPrice ? (
                <>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    {hasDiscount && (
                      <span className="rounded bg-[#C4933F] px-2 py-1 text-[13px] font-bold leading-none text-white">-{percentOff}%</span>
                    )}
                    <span className="text-[28px] font-bold leading-none text-[#0D382B]">{rupees(price)}</span>
                    {hasDiscount && (
                      <span className="text-[15px] text-[#8C988F]">
                        M.R.P. <span className="line-through">{rupees(mrp)}</span>
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-[13px] text-[#6B7A71]">
                    Inclusive of all taxes
                    {hasDiscount && <span className="font-semibold text-[#2C7A52]"> · You save {rupees(savings)}</span>}
                  </p>
                </>
              ) : (
                <p className="text-[16px] font-semibold text-[#0D382B]">
                  Price on request <span className="font-normal text-[#6B7A71]">— ask our team for the latest price.</span>
                </p>
              )}
            </div>

            {description && (
              <p className="mt-3 line-clamp-2 whitespace-pre-line text-[14px] leading-[1.6] text-[#4A5950]">{description}</p>
            )}

            {/* Key details */}
            <dl className="mt-3 grid grid-cols-3 gap-2 text-[13px]">
              {attributes.map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-xl border border-[#ECE5D8] bg-white px-3 py-2.5">
                  <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#8C988F]">
                    <Icon className="h-3.5 w-3.5 shrink-0 text-[#2D5A45]" /> {label}
                  </dt>
                  <dd className="mt-0.5 font-medium leading-snug text-[#1F3D31]">{value}</dd>
                </div>
              ))}
            </dl>

            {/* Buy box */}
            <div className="mt-3 rounded-2xl border border-[#E3DACA] bg-white p-3.5 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="inline-flex shrink-0 items-center rounded-lg border border-[#C8BFB0]">
                  <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="rounded-l-lg px-2.5 py-2.5 text-[#0D382B] hover:bg-[#FAF8F3]">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-[2rem] text-center text-[15px] font-bold text-[#0D382B]" aria-live="polite">{qty}</span>
                  <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(20, q + 1))} className="rounded-r-lg px-2.5 py-2.5 text-[#0D382B] hover:bg-[#FAF8F3]">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="shrink-0 leading-tight">
                  <span className="block text-[10.5px] font-semibold uppercase tracking-wide text-[#8C988F]">Total</span>
                  <span className="text-[18px] font-bold text-[#0D382B]">{hasPrice ? rupees(price * qty) : "—"}</span>
                </div>
                <button
                  type="button"
                  onClick={addToCart}
                  disabled={!hasPrice}
                  className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg bg-[#0D382B] px-4 py-3 text-[15px] font-bold text-white transition-all hover:bg-[#154D3C] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {justAdded ? <Check className="h-5 w-5 shrink-0" /> : <ShoppingCart className="h-5 w-5 shrink-0" />}
                  <span className="truncate">{justAdded ? "Added" : "Add to Cart"}</span>
                </button>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsEnquiryModalOpen(true);
                    onEnquire?.();
                  }}
                  className="flex items-center justify-center gap-2 rounded-lg border border-[#0D382B] px-3 py-2.5 text-[14px] font-bold text-[#0D382B] hover:bg-[#F3ECE0]"
                >
                  <MessageCircle className="h-4 w-4" /> Enquire
                </button>
                <Link
                  href="/contact"
                  className="flex items-center justify-center rounded-lg border border-[#C8BFB0] px-3 py-2.5 text-[14px] font-bold text-[#1E3328] hover:border-[#0D382B] hover:bg-[#FAF8F3]"
                >
                  Contact the Clinic
                </Link>
              </div>
            </div>

            {/* Trust row */}
            <ul className="mt-3 grid grid-cols-3 gap-2 text-center text-[12px] text-[#4A5950]">
              <li className="flex flex-col items-center gap-1"><Stethoscope className="h-5 w-5 text-[#2D5A45]" /> Doctor-guided advice</li>
              <li className="flex flex-col items-center gap-1"><ShieldCheck className="h-5 w-5 text-[#2D5A45]" /> Authentic Ayurveda</li>
              <li className="flex flex-col items-center gap-1"><Truck className="h-5 w-5 text-[#2D5A45]" /> Ask about availability</li>
            </ul>

          </div>
        </div>

        {/* ============ DETAILS: 3 cards, same height, each scrolls ============ */}
        <section className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {DETAIL_CARDS.map(({ key, label, icon: Icon }) => (
            <article key={key} className="flex h-[260px] flex-col overflow-hidden rounded-2xl border border-[#ECE5D8] bg-white">
              <h2 className="flex shrink-0 items-center gap-2 border-b border-[#ECE5D8] px-4 py-3 text-[15px] font-bold text-[#0D382B]">
                <Icon className="h-4.5 w-4.5 text-[#2D5A45]" /> {label}
              </h2>
              <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3 text-[14px] leading-[1.7] text-[#4A5950]">
                <p className="whitespace-pre-line">{cardBody[key]}</p>
                {key === "directions" && (
                  <div className="mt-3 flex items-start gap-2 rounded-lg border border-[#D5E3D8] bg-[#EDF3EE] p-2.5 text-[13px] font-medium text-[#244E38]">
                    <Info className="mt-0.5 h-4 w-4 shrink-0" />
                    <div>
                      {usageNotes.map((line, idx) => (
                        <p key={idx}>{line}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </section>

        <p className="mt-4 text-center text-[12px] font-medium text-[#7A8880]">
          This catalogue provides product information. Our team will help with availability and enquiries.
        </p>
      </div>

      <ProductEnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        product={{ id: product?.id, title, categoryTag, imageSrc: galleryImages[0] }}
      />
    </div>
  );
}
