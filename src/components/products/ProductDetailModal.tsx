"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Leaf,
  Package,
  Calendar,
  ChevronUp,
  ChevronDown,
  Info,
  ArrowRight,
} from "lucide-react";
import ProductEnquiryModal from "@/components/products/ProductEnquiryModal";

export interface ProductDetailModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  product?: {
    id?: string;
    title?: string;
    categoryTag?: string;
    description?: string;
    productType?: string;
    packOptions?: string;
    availability?: string;
    productInfo?: string;
    directions?: string;
    disclaimer?: string;
    images?: string[];
  };
  onEnquire?: () => void;
  onContactClinic?: () => void;
}

export default function ProductDetailModal({
  isOpen = true,
  onClose,
  product,
  onEnquire,
  onContactClinic,
}: ProductDetailModalProps) {
  // Accordion states: 1st is open by default, 2nd is closed
  const [isProductInfoOpen, setIsProductInfoOpen] = useState(true);
  const [isDirectionsOpen, setIsDirectionsOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  // Gallery images - fallback to existing product image or placeholder
  const defaultImages = [
    product?.images?.[0] ||
      "/product/vaidhyashala_product_page_images/05_ayurvedic_massage_oil.webp",
    product?.images?.[1] ||
      "/product/vaidhyashala_product_page_images/05_ayurvedic_massage_oil.webp",
    product?.images?.[2] ||
      "/product/vaidhyashala_product_page_images/14_product_guidance_consultation.webp",
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Lock background scroll and handle ESC key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const title = product?.title || "Ayurvedic Massage Oil";
  const categoryTag = product?.categoryTag || "THERAPY OILS";
  const description =
    product?.description ||
    "An Ayurvedic oil preparation for external massage. Ask our team about the formulation, pack options and availability.";
  const productType = product?.productType || "External-use oil";
  const packOptions = product?.packOptions || "Confirm with the clinic";
  const availability = product?.availability || "Enquire with our team";
  const productInfo =
    product?.productInfo ||
    "Details of the available formulation and manufacturer will be shared by our clinic team.";
  const directions =
    product?.directions ||
    "Use as directed by your physician or as indicated on the pack label. For external application only. Store in a cool, dry place away from direct sunlight.";

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 lg:p-8 bg-black/60 backdrop-blur-xs overflow-y-auto"
    >
      {/* Click outside to close backdrop */}
      <div
        className="fixed inset-0 -z-10"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-[960px] lg:max-w-[1020px] rounded-2xl bg-white p-5 sm:p-7 lg:p-8 shadow-2xl border border-[#ECE5D8] my-auto">
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 flex h-8 w-8 items-center justify-center rounded-full text-[#5A6860] hover:text-[#0D382B] hover:bg-[#F3ECE1] transition-all"
        >
          <X className="h-5 w-5 stroke-[2]" />
        </button>

        {/* Modal Grid: Left Gallery + Right Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ================= LEFT COLUMN: IMAGERY ================= */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Main Featured Image */}
            <div className="relative aspect-[4/4.1] w-full overflow-hidden rounded-xl border border-[#E6DFD1] bg-[#F7F4EC] shadow-2xs">
              <img
                src={defaultImages[activeImageIndex]}
                alt={title}
                className="h-full w-full object-cover object-center"
              />
            </div>

            {/* Caption underneath */}
            <p className="mt-2 text-[11.5px] sm:text-[12px] font-medium text-[#7A8880]">
              Illustrative product image
            </p>

            {/* 3 Thumbnail Selection Cards */}
            <div className="mt-3 grid grid-cols-3 gap-2.5 sm:gap-3">
              {defaultImages.map((imgSrc, idx) => {
                const isActive = activeImageIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-square w-full overflow-hidden rounded-lg transition-all ${
                      isActive
                        ? "border-2 border-[#0D382B] shadow-xs"
                        : "border border-[#DFD7CB] hover:border-[#0D382B]/60 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={imgSrc}
                      alt={`Thumbnail ${idx + 1}`}
                      className="h-full w-full object-cover object-center"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================= RIGHT COLUMN: PRODUCT INFO ================= */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Category Eyebrow */}
            <span className="text-[11.5px] sm:text-[12px] font-bold tracking-[1.4px] uppercase text-[#A07038]">
              {categoryTag}
            </span>

            {/* Product Title */}
            <h2 className="mt-1 font-serif text-[28px] sm:text-[34px] lg:text-[38px] font-medium leading-[1.14] text-[#0A291F]">
              {title}
            </h2>

            {/* Brief Description */}
            <p className="mt-2 text-[14px] sm:text-[14.5px] font-normal leading-[1.6] text-[#4A5950]">
              {description}
            </p>

            {/* Thin Divider */}
            <div className="my-4 border-t border-[#ECE5D8]" />

            {/* 3 Key Attributes List */}
            <div className="space-y-3">
              {/* Attribute 1: Product Type */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[#D5CDC0] bg-[#FAF8F3] text-[#2D5A45]">
                  <Leaf className="h-4.5 w-4.5 stroke-[1.8]" />
                </div>
                <div>
                  <span className="block text-[12.5px] font-bold text-[#1F3D31]">
                    Product type
                  </span>
                  <span className="block text-[13.5px] font-normal text-[#55645C]">
                    {productType}
                  </span>
                </div>
              </div>

              {/* Attribute 2: Pack Options */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[#D5CDC0] bg-[#FAF8F3] text-[#2D5A45]">
                  <Package className="h-4.5 w-4.5 stroke-[1.8]" />
                </div>
                <div>
                  <span className="block text-[12.5px] font-bold text-[#1F3D31]">
                    Pack options
                  </span>
                  <span className="block text-[13.5px] font-normal text-[#55645C]">
                    {packOptions}
                  </span>
                </div>
              </div>

              {/* Attribute 3: Availability */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[#D5CDC0] bg-[#FAF8F3] text-[#2D5A45]">
                  <Calendar className="h-4.5 w-4.5 stroke-[1.8]" />
                </div>
                <div>
                  <span className="block text-[12.5px] font-bold text-[#1F3D31]">
                    Availability
                  </span>
                  <span className="block text-[13.5px] font-normal text-[#55645C]">
                    {availability}
                  </span>
                </div>
              </div>
            </div>

            {/* Accordion 1: Product Information */}
            <div className="mt-4 rounded-xl border border-[#ECE5D8] bg-[#F4F1EA] overflow-hidden">
              <button
                type="button"
                onClick={() => setIsProductInfoOpen(!isProductInfoOpen)}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
              >
                <span className="text-[14px] sm:text-[14.5px] font-bold text-[#0A291F]">
                  Product information
                </span>
                <span className="text-[#5D6B63]">
                  {isProductInfoOpen ? (
                    <ChevronUp className="h-4.5 w-4.5 stroke-[2]" />
                  ) : (
                    <ChevronDown className="h-4.5 w-4.5 stroke-[2]" />
                  )}
                </span>
              </button>
              {isProductInfoOpen && (
                <div className="px-4 pb-3.5 pt-0">
                  <p className="text-[13px] sm:text-[13.5px] font-normal leading-[1.55] text-[#4A5950]">
                    {productInfo}
                  </p>
                </div>
              )}
            </div>

            {/* Accordion 2: Directions & precautions */}
            <div className="mt-2.5 rounded-xl border border-[#ECE5D8] bg-[#FAF8F3] overflow-hidden">
              <button
                type="button"
                onClick={() => setIsDirectionsOpen(!isDirectionsOpen)}
                className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-[#F4F1EA] transition-colors"
              >
                <span className="text-[14px] sm:text-[14.5px] font-bold text-[#0A291F]">
                  Directions &amp; precautions
                </span>
                <span className="text-[#5D6B63]">
                  {isDirectionsOpen ? (
                    <ChevronUp className="h-4.5 w-4.5 stroke-[2]" />
                  ) : (
                    <ChevronDown className="h-4.5 w-4.5 stroke-[2]" />
                  )}
                </span>
              </button>
              {isDirectionsOpen && (
                <div className="px-4 pb-3.5 pt-0">
                  <p className="text-[13px] sm:text-[13.5px] font-normal leading-[1.55] text-[#4A5950]">
                    {directions}
                  </p>
                </div>
              )}
            </div>

            {/* Info Callout Box (Light Green tint) */}
            <div className="mt-3.5 flex items-start gap-3 rounded-xl border border-[#D5E3D8] bg-[#EDF3EE] p-3.5 sm:p-4">
              <Info className="h-5 w-5 flex-shrink-0 text-[#2C5A42] mt-0.5" />
              <div className="text-[12.5px] sm:text-[13px] font-medium leading-[1.5] text-[#244E38]">
                <p>Use as directed by the product label or your treating doctor.</p>
                <p>For external use only.</p>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsEnquiryModalOpen(true);
                  if (onEnquire) {
                    onEnquire();
                  }
                }}
                className="group flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0D382B] px-5 sm:px-6 py-3 text-[14px] font-bold text-white shadow-xs transition-all hover:bg-[#154D3C]"
              >
                <span>Enquire About This Product</span>
                <ArrowRight className="h-4.5 w-4.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={onContactClinic}
                className="rounded-lg border border-[#C8BFB0] bg-white px-5 sm:px-6 py-3 text-[14px] font-bold text-[#1E3328] transition-all hover:border-[#0D382B] hover:bg-[#FAF8F3]"
              >
                Contact the Clinic
              </button>
            </div>

            {/* Catalog disclaimer footer */}
            <p className="mt-3 sm:mt-3.5 text-center text-[11px] sm:text-[11.5px] font-medium text-[#7A8880]">
              This catalogue provides product information. Our team will help with availability and enquiries.
            </p>
          </div>
        </div>
      </div>

      {/* Standalone Product Enquiry Modal */}
      <ProductEnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        product={{
          id: product?.id,
          title: title,
          categoryTag: categoryTag,
          imageSrc: defaultImages[0],
        }}
      />
    </div>
  );
}
