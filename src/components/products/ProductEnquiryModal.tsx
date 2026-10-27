"use client";

import React, { useState, useEffect } from "react";
import { X, ChevronDown, ArrowRight, Check, Leaf } from "lucide-react";

export interface ProductEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: {
    id?: string;
    title?: string;
    categoryTag?: string;
    imageSrc?: string;
  };
}

export default function ProductEnquiryModal({
  isOpen,
  onClose,
  product,
}: ProductEnquiryModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    enquiryType: "",
    message: "",
    consent: false,
  });

  const [submitted, setSubmitted] = useState(false);

  // Lock background scroll and handle ESC key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const productTitle = product?.title || "Ayurvedic Massage Oil";
  const productCategory = product?.categoryTag || "THERAPY OILS";
  const productImage =
    product?.imageSrc ||
    "/product/vaidhyashala_product_page_images/05_ayurvedic_massage_oil.webp";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: "",
      mobile: "",
      email: "",
      enquiryType: "",
      message: "",
      consent: false,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto"
    >
      {/* Click outside to close backdrop */}
      <div
        className="fixed inset-0 -z-10"
        onClick={handleReset}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-[420px] sm:max-w-[440px] rounded-2xl bg-[#FAF8F5] p-4 sm:p-5 shadow-2xl border border-[#ECE4D8] my-auto">
        {/* Header Row: Logo on Left, Close Button on Right */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src="/emblem.webp"
              alt="Vaidhyashala"
              className="h-9 w-9 sm:h-10 sm:w-10 object-contain"
            />
            <div>
              <span className="block font-serif text-[16px] sm:text-[17.5px] font-bold tracking-[1.3px] uppercase text-[#0D382B] leading-tight">
                VAIDHYASHALA
              </span>
              <span className="block text-[7.5px] sm:text-[8px] font-bold tracking-[0.9px] uppercase text-[#0D382B]">
                AYURVEDIC CLINIC &amp; PANCHAKARMA CENTRE
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleReset}
            aria-label="Close modal"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#24332B] hover:text-[#0D382B] hover:bg-[#EFE7D8] transition-colors"
          >
            <X className="h-5 w-5 stroke-[2.2]" />
          </button>
        </div>

        {submitted ? (
          /* Submission Confirmation View - Enhanced Height, Font Size & Weight */
          <div className="pt-2 sm:pt-3">
            {/* Success Checkmark Circle */}
            <div className="mx-auto flex h-16 w-16 sm:h-18 sm:w-18 items-center justify-center rounded-full bg-[#D5E5D3]">
              <Check className="h-8 w-8 sm:h-9 sm:w-9 text-[#0A2E22] stroke-[3.2]" />
            </div>

            {/* Typography */}
            <div className="mt-3.5 sm:mt-4 text-center">
              <span className="block text-[11px] sm:text-[11.5px] font-extrabold tracking-[1.6px] uppercase text-[#9C6D38]">
                ENQUIRY RECEIVED
              </span>
              <h2 className="mt-1 font-serif text-[26px] sm:text-[29px] font-bold leading-[1.18] text-[#0A291F]">
                Thank you for your enquiry.
              </h2>
              <p className="mt-1.5 text-[13.5px] sm:text-[14px] font-semibold leading-[1.5] text-[#334239] max-w-sm mx-auto">
                Our team has received your product enquiry and will contact you with the requested information.
              </p>
            </div>

            {/* Product Card Banner */}
            <div className="relative overflow-hidden rounded-xl border border-[#DCE4DA] bg-[#EFF3ED] p-3 sm:p-3.5 mt-4 sm:mt-5 flex items-center gap-3.5">
              {/* Product Thumbnail Frame */}
              <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-lg overflow-hidden bg-white border border-[#D5E0D3] flex-shrink-0 shadow-2xs">
                <img
                  src={productImage}
                  alt={productTitle}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              {/* Product Info */}
              <div className="relative z-10 flex-1 min-w-0">
                <span className="block text-[10px] sm:text-[10.5px] font-extrabold uppercase tracking-[1.3px] text-[#9C6D38]">
                  YOUR ENQUIRY IS ABOUT
                </span>
                <h3 className="font-serif text-[17px] sm:text-[18.5px] font-bold text-[#0A291F] leading-snug truncate mt-0.5">
                  {productTitle}
                </h3>
              </div>

              {/* Decorative Leaf Graphic in Right Background */}
              <img
                src="/cont.webp"
                alt=""
                className="pointer-events-none absolute -right-3 -bottom-5 h-20 w-auto opacity-30 select-none object-contain z-0"
              />
            </div>

            {/* Message Note Row */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#E5ECE3]">
                <svg
                  className="h-4.5 w-4.5 text-[#1B4330]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  <circle cx="8" cy="10" r="0.9" fill="currentColor" />
                  <circle cx="12" cy="10" r="0.9" fill="currentColor" />
                  <circle cx="16" cy="10" r="0.9" fill="currentColor" />
                </svg>
              </div>
              <p className="text-[13px] sm:text-[13.5px] text-[#334239] font-semibold leading-[1.45]">
                We will help you with product details, pack options and current availability.
              </p>
            </div>

            {/* Primary Action Button */}
            <div className="mt-4 sm:mt-5">
              <button
                type="button"
                onClick={handleReset}
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#0A2E22] hover:bg-[#124232] py-2.5 sm:py-3 text-[14px] sm:text-[14.5px] font-bold tracking-wide text-white shadow-xs transition-all cursor-pointer"
              >
                <span>Continue Exploring Products</span>
                <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Secondary Link: Close */}
            <div className="mt-2.5 text-center">
              <button
                type="button"
                onClick={handleReset}
                className="text-[13px] sm:text-[13.5px] font-bold text-[#0A291F] underline decoration-[#0A291F] underline-offset-3 hover:opacity-80 transition-opacity cursor-pointer"
              >
                Close
              </button>
            </div>

            {/* Bottom Divider & Availability Note */}
            <div className="mt-4 border-t border-[#ECE4D8] pt-3 text-center">
              <div className="inline-flex items-center gap-1.5 text-[12px] sm:text-[12.5px] font-semibold text-[#44554B]">
                <Leaf className="h-3.5 w-3.5 text-[#528464]" />
                <span>Product availability will be confirmed by our team.</span>
              </div>
            </div>
          </div>
        ) : (
          /* Form Content View */
          <>
            {/* Title & Subtitle */}
            <div className="mt-2.5">
              <span className="text-[10px] sm:text-[10.5px] font-extrabold tracking-[1.4px] uppercase text-[#9C6D38]">
                Product Enquiry
              </span>
              <h2 className="mt-0.5 font-serif text-[23px] sm:text-[25px] font-bold leading-tight text-[#0A291F]">
                Ask us about this product.
              </h2>
              <p className="mt-0.5 text-[12.5px] sm:text-[13px] font-medium leading-snug text-[#4A5950]">
                Share your query. Our team will contact you with product information and availability.
              </p>
            </div>

            {/* Selected Product Card Banner */}
            <div className="relative overflow-hidden rounded-xl border border-[#DCE4DA] bg-[#EFF3ED] p-2.5 mt-2.5 flex items-center gap-2.5 sm:gap-3">
              {/* Product Thumbnail Frame */}
              <div className="relative h-12 w-12 sm:h-13 sm:w-13 rounded-lg overflow-hidden bg-white border border-[#D5E0D3] flex-shrink-0 shadow-2xs">
                <img
                  src={productImage}
                  alt={productTitle}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              {/* Product Info */}
              <div className="relative z-10 flex-1 min-w-0">
                <span className="block text-[9.5px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#9C6D38]">
                  {productCategory}
                </span>
                <h3 className="font-serif text-[15px] sm:text-[16.5px] font-bold text-[#0A291F] leading-tight truncate mt-0.5">
                  {productTitle}
                </h3>
                <span className="block text-[11px] font-semibold text-[#7D6B42] mt-0.5">
                  Selected product
                </span>
              </div>

              {/* Decorative Leaf Graphic in Right Background */}
              <img
                src="/cont.webp"
                alt=""
                className="pointer-events-none absolute -right-3 -bottom-5 h-20 w-auto opacity-30 select-none object-contain z-0"
              />
            </div>

            {/* Enquiry Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              noValidate
              className="mt-3 space-y-2.5"
            >
              {/* Row 1: Full name * & Mobile number * */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[12px] sm:text-[12.5px] font-bold text-[#1F2F26] mb-1">
                    Full name <span className="text-[#A07038]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full rounded-md border border-[#D8D0C2] bg-white px-3 py-1.5 sm:py-2 text-[13px] sm:text-[13.5px] font-medium text-[#22332A] placeholder-[#8C988F] focus:border-[#0A291F] focus:outline-none shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-[12px] sm:text-[12.5px] font-bold text-[#1F2F26] mb-1">
                    Mobile number <span className="text-[#A07038]">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="Your mobile number"
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    className="w-full rounded-md border border-[#D8D0C2] bg-white px-3 py-1.5 sm:py-2 text-[13px] sm:text-[13.5px] font-medium text-[#22332A] placeholder-[#8C988F] focus:border-[#0A291F] focus:outline-none shadow-2xs"
                  />
                </div>
              </div>

              {/* Row 2: Email (optional) */}
              <div>
                <label className="block text-[12px] sm:text-[12.5px] font-bold text-[#1F2F26] mb-1">
                  Email (optional)
                </label>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-md border border-[#D8D0C2] bg-white px-3 py-1.5 sm:py-2 text-[13px] sm:text-[13.5px] font-medium text-[#22332A] placeholder-[#8C988F] focus:border-[#0A291F] focus:outline-none shadow-2xs"
                />
              </div>

              {/* Row 3: What would you like to know? * */}
              <div>
                <label className="block text-[12px] sm:text-[12.5px] font-bold text-[#1F2F26] mb-1">
                  What would you like to know? <span className="text-[#A07038]">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.enquiryType}
                    onChange={(e) =>
                      setFormData({ ...formData, enquiryType: e.target.value })
                    }
                    className="w-full appearance-none rounded-md border border-[#D8D0C2] bg-white px-3 py-1.5 sm:py-2 pr-8 text-[13px] sm:text-[13.5px] font-medium text-[#22332A] focus:border-[#0A291F] focus:outline-none shadow-2xs"
                  >
                    <option value="">Select an enquiry type</option>
                    <option value="Availability and stock">Availability and stock</option>
                    <option value="Pack options and pricing">Pack options and pricing</option>
                    <option value="Usage and dosage guidance">Usage and dosage guidance</option>
                    <option value="Doctor consultation enquiry">Doctor consultation enquiry</option>
                    <option value="Other product query">Other product query</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666]" />
                </div>
              </div>

              {/* Row 4: Your message (optional) */}
              <div>
                <label className="block text-[12px] sm:text-[12.5px] font-bold text-[#1F2F26] mb-1">
                  Your message (optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ask about product details, pack options or availability."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full rounded-md border border-[#D8D0C2] bg-white px-3 py-1.5 sm:py-2 text-[13px] sm:text-[13.5px] font-medium text-[#22332A] placeholder-[#8C988F] focus:border-[#0A291F] focus:outline-none shadow-2xs resize-none"
                />
              </div>

              {/* Row 5: Consent Checkbox */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) =>
                      setFormData({ ...formData, consent: e.target.checked })
                    }
                    className="h-3.5 w-3.5 rounded border-[#C5BDAF] text-[#0A291F] focus:ring-[#0A291F]"
                  />
                  <span className="text-[12px] sm:text-[12.5px] text-[#334239] font-semibold leading-snug">
                    I agree to be contacted about this product enquiry.
                  </span>
                </label>
              </div>

              {/* Bottom Footer Row: Availability text on Left, Action Buttons on Right */}
              <div className="pt-1.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
                <p className="text-[11px] sm:text-[11.5px] font-semibold text-[#66756C]">
                  Our team will confirm current availability.
                </p>

                <div className="flex items-center gap-2.5 justify-end">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-md border border-[#0D382B] bg-white px-4 py-1.5 sm:py-2 text-[12.5px] sm:text-[13px] font-bold text-[#0D382B] transition-all hover:bg-[#F3ECE0] cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                    }}
                    className="group inline-flex items-center gap-2 rounded-md bg-[#0A2E22] hover:bg-[#124232] px-4.5 py-1.5 sm:py-2 text-[12.5px] sm:text-[13px] font-bold text-white shadow-xs transition-all cursor-pointer"
                  >
                    <span>Send Enquiry</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
