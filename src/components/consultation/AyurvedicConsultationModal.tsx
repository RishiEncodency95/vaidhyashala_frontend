"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X, ArrowRight, ChevronUp, ChevronDown } from "lucide-react";

export interface AyurvedicConsultationModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onRequestAppointment?: () => void;
  onBackToWebsite?: () => void;
  therapy?: {
    category?: string;
    title?: string;
    subtitle?: string;
    imageSrc?: string;
    imageCaption?: string;
    aboutTitle?: string;
    aboutDescription?: string;
  };
}

export default function AyurvedicConsultationModal({
  isOpen = true,
  onClose = () => {},
  onRequestAppointment,
  onBackToWebsite,
  therapy,
}: AyurvedicConsultationModalProps) {
  // Active accordion index (0: How your session is planned, 1: Preparation & aftercare, 2: What to discuss)
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  // Content configuration defaulting exactly to the provided Shirodhara reference
  const category = therapy?.category || "AYURVEDIC THERAPY";
  const title = therapy?.title || "Shirodhara";
  const subtitle =
    therapy?.subtitle || "Learn about the therapy before planning your consultation.";
  const imageSrc = therapy?.imageSrc || "/panchakarma/02_Shirodhara.webp";
  const imageCaption = therapy?.imageCaption || "Illustrative therapy image";
  const aboutTitle = therapy?.aboutTitle || `What is ${title}?`;
  const aboutDescription =
    therapy?.aboutDescription ||
    "A traditional Ayurvedic therapy involving a steady flow of a selected liquid over the forehead. The preparation and procedure are chosen by the treating doctor.";

  // Handle ESC key press and body scroll locking
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

  const handleBackToWebsite = () => {
    if (onBackToWebsite) {
      onBackToWebsite();
    } else {
      onClose();
    }
  };

  const handleRequestAppointment = () => {
    if (onRequestAppointment) {
      onRequestAppointment();
    } else {
      onClose();
    }
  };

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3 md:p-4 bg-black/60 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Card Container - compact to fit single screen without scrolling */}
      <div
        className="relative w-full max-w-[880px] max-h-[96vh] sm:overflow-hidden overflow-y-auto rounded-[18px] bg-[#FAF8F5] border border-[#E8E2D7] shadow-2xl p-4 sm:p-5 md:px-7 md:py-5 text-[#22332A] transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top-Right Decorative Foliage / Leaf Watermark */}
        <div className="absolute -top-3 -right-3 w-40 h-40 sm:w-52 sm:h-52 pointer-events-none select-none z-0 opacity-25 mix-blend-multiply rotate-[145deg]">
          <Image
            src="/consultation/consultation_leaf.webp"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Top-Right Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 p-1 text-[#1F382B] hover:text-[#0D241A] transition-colors rounded-full hover:bg-black/5 cursor-pointer"
        >
          <X className="w-5 h-5 stroke-[1.8]" />
        </button>

        {/* Top Header Section */}
        <div className="relative z-10 pr-10">
          <p className="text-[10.5px] sm:text-[11px] font-extrabold tracking-[0.16em] uppercase text-[#965E26]">
            {category}
          </p>
          <h2 className="font-serif text-[27px] sm:text-[31px] md:text-[34px] font-semibold leading-[1.1] text-[#0A261C] mt-0.5 tracking-tight">
            {title}
          </h2>
          <p className="text-[12.5px] sm:text-[13.5px] text-[#2D4337] font-semibold mt-0.5">
            {subtitle}
          </p>
        </div>

        {/* Middle Two-Column Grid */}
        <div className="mt-3 sm:mt-3.5 grid grid-cols-1 md:grid-cols-12 gap-3.5 md:gap-5 items-start relative z-10">
          {/* Left Column: Therapy Image */}
          <div className="md:col-span-6 flex flex-col">
            <div className="relative w-full aspect-[4/2.65] max-h-[220px] rounded-[12px] overflow-hidden bg-[#ECE6DC] border border-[#E2DBD0]/60 shadow-xs">
              <Image
                src={imageSrc}
                alt={`${title} - Ayurvedic Therapy`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 440px"
                priority
              />
            </div>
            <span className="text-[11px] text-[#42584B] mt-1 font-semibold">
              {imageCaption}
            </span>
          </div>

          {/* Right Column: About, Accordions, & Individual Plan Card */}
          <div className="md:col-span-6 flex flex-col pt-0">
            <h3 className="font-serif text-[19px] sm:text-[21px] font-semibold text-[#0A261C] leading-tight">
              {aboutTitle}
            </h3>
            <p className="text-[12px] sm:text-[12.5px] text-[#263C30] font-semibold leading-[1.5] mt-1 mb-2">
              {aboutDescription}
            </p>

            {/* Accordion List */}
            <div className="space-y-1.5">
              {/* Accordion 1: How your session is planned */}
              <div
                className={`rounded-[8px] border transition-colors overflow-hidden ${
                  activeAccordion === 0
                    ? "bg-[#EEF4EC] border-[#CCDDC8]"
                    : "bg-[#FAF8F5] border-[#E8E1D5] hover:bg-[#F3EFE7]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(0)}
                  className="w-full flex items-center justify-between py-1.5 px-2.5 sm:py-2 sm:px-3 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-[6px] bg-[#DCEADB] text-[#133F2B] flex items-center justify-center shrink-0">
                      <svg
                        className="w-3.5 h-3.5 stroke-[2]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    </div>
                    <span className="text-[13px] sm:text-[13.5px] font-bold text-[#0A2419]">
                      How your session is planned
                    </span>
                  </div>
                  {activeAccordion === 0 ? (
                    <ChevronUp className="w-3.5 h-3.5 text-[#0A2419] stroke-[2.2] shrink-0" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-[#42584B] stroke-[2] shrink-0" />
                  )}
                </button>

                {activeAccordion === 0 && (
                  <div className="px-2.5 pb-2.5 pt-0 pl-[36px] text-[11.5px] sm:text-[12px] text-[#263C30] font-semibold leading-relaxed">
                    The doctor reviews your health concerns, medical history and
                    suitability before advising the therapy.
                  </div>
                )}
              </div>

              {/* Accordion 2: Preparation & aftercare */}
              <div
                className={`rounded-[8px] border transition-colors overflow-hidden ${
                  activeAccordion === 1
                    ? "bg-[#EEF4EC] border-[#CCDDC8]"
                    : "bg-[#FAF8F5] border-[#E8E1D5] hover:bg-[#F3EFE7]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(1)}
                  className="w-full flex items-center justify-between py-1.5 px-2.5 sm:py-2 sm:px-3 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-[6px] bg-[#DCEADB] text-[#133F2B] flex items-center justify-center shrink-0">
                      <svg
                        className="w-3.5 h-3.5 stroke-[2]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 4c1.8 3 4.2 5.5 7.5 7-2.8 1-5.5.5-7.5-2-2 2.5-4.7 3-7.5 2 3.3-1.5 5.7-4 7.5-7z" />
                        <path d="M12 9c2.2 3.5 6 6 10 7-3.8 1.5-7.5.5-10-2.5-2.5 3-6.2 4-10 2.5 4-1 7.8-3.5 10-7z" />
                        <path d="M7 19c3.2 1.5 6.8 1.5 10 0" />
                      </svg>
                    </div>
                    <span className="text-[13px] sm:text-[13.5px] font-bold text-[#0A2419]">
                      Preparation & aftercare
                    </span>
                  </div>
                  {activeAccordion === 1 ? (
                    <ChevronUp className="w-3.5 h-3.5 text-[#0A2419] stroke-[2.2] shrink-0" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-[#42584B] stroke-[2] shrink-0" />
                  )}
                </button>

                {activeAccordion === 1 && (
                  <div className="px-2.5 pb-2.5 pt-0 pl-[36px] text-[11.5px] sm:text-[12px] text-[#263C30] font-semibold leading-relaxed">
                    Light meals prior to therapy, ample hydration, peaceful rest, and
                    avoiding exposure to direct cool wind or cold water are advised.
                  </div>
                )}
              </div>

              {/* Accordion 3: What to discuss with the doctor */}
              <div
                className={`rounded-[8px] border transition-colors overflow-hidden ${
                  activeAccordion === 2
                    ? "bg-[#EEF4EC] border-[#CCDDC8]"
                    : "bg-[#FAF8F5] border-[#E8E1D5] hover:bg-[#F3EFE7]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(2)}
                  className="w-full flex items-center justify-between py-1.5 px-2.5 sm:py-2 sm:px-3 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-[6px] bg-[#DCEADB] text-[#133F2B] flex items-center justify-center shrink-0">
                      <svg
                        className="w-3.5 h-3.5 stroke-[2]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        <circle cx="8.5" cy="11.5" r="0.75" fill="currentColor" />
                        <circle cx="12" cy="11.5" r="0.75" fill="currentColor" />
                        <circle cx="15.5" cy="11.5" r="0.75" fill="currentColor" />
                      </svg>
                    </div>
                    <span className="text-[13px] sm:text-[13.5px] font-bold text-[#0A2419]">
                      What to discuss with the doctor
                    </span>
                  </div>
                  {activeAccordion === 2 ? (
                    <ChevronUp className="w-3.5 h-3.5 text-[#0A2419] stroke-[2.2] shrink-0" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-[#42584B] stroke-[2] shrink-0" />
                  )}
                </button>

                {activeAccordion === 2 && (
                  <div className="px-2.5 pb-2.5 pt-0 pl-[36px] text-[11.5px] sm:text-[12px] text-[#263C30] font-semibold leading-relaxed">
                    Share any current medications, stress levels, sleep irregularities,
                    or sensitivities so your practitioner can customize the oil blend.
                  </div>
                )}
              </div>
            </div>

            {/* Individual Plan Highlight Card */}
            <div className="mt-2.5 flex items-center gap-2.5 rounded-[10px] bg-[#EEF4EC] border border-[#D0E2CC] p-2 sm:p-2.5">
              <div className="w-8 h-8 rounded-full bg-[#D6E7D2] flex items-center justify-center shrink-0 text-[#133F2B]">
                <svg className="w-4 h-4 fill-[#1A4B35]" viewBox="0 0 24 24">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <h4 className="text-[12.5px] sm:text-[13px] font-bold text-[#082017] leading-tight">
                  Your plan is individual
                </h4>
                <p className="text-[11px] sm:text-[11.5px] text-[#263C30] font-semibold leading-snug mt-0.5">
                  Session duration, frequency and preparation are confirmed during consultation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Banner Card: GET READY FOR YOUR CONSULTATION */}
        <div className="mt-3 sm:mt-3.5 rounded-[10px] bg-[#FAF8F5] border border-[#DFD5C4] p-2.5 sm:p-3 flex flex-col md:flex-row md:items-center justify-between gap-3 relative z-10">
          <div className="flex flex-col md:max-w-[250px] pr-0 md:pr-3">
            <span className="text-[10px] sm:text-[10.5px] font-extrabold tracking-[0.16em] uppercase text-[#965E26]">
              GET READY FOR YOUR CONSULTATION
            </span>
            <p className="text-[11px] sm:text-[11.5px] text-[#2D4337] font-semibold leading-[1.3] mt-0.5">
              A few simple steps help make your consultation more productive.
            </p>
          </div>

          <div className="hidden md:block w-[1px] h-8 bg-[#DFD5C4] shrink-0" />

          {/* 3 Consultation Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 flex-1 items-center">
            {/* Step 1: Discuss your medical history */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#DEECDB] text-[#133F2B] flex items-center justify-center shrink-0">
                <svg
                  className="w-3.5 h-3.5 stroke-[2]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
                  <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
                  <circle cx="20" cy="10" r="2" />
                </svg>
              </div>
              <span className="text-[11px] sm:text-[11.5px] font-bold text-[#0D2D1E] leading-tight">
                Discuss your medical history
              </span>
            </div>

            {/* Step 2: Confirm therapy availability */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#DEECDB] text-[#133F2B] flex items-center justify-center shrink-0">
                <svg
                  className="w-3.5 h-3.5 stroke-[2]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
                </svg>
              </div>
              <span className="text-[11px] sm:text-[11.5px] font-bold text-[#0D2D1E] leading-tight">
                Confirm therapy availability
              </span>
            </div>

            {/* Step 3: Follow personalised guidance */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#DEECDB] text-[#133F2B] flex items-center justify-center shrink-0">
                <svg
                  className="w-3.5 h-3.5 stroke-[2]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 20h10" />
                  <path d="M12 20v-8" />
                  <path d="M12 12C9 9 5 10 5 10s.5 4 3.5 5c2 .7 3.5-3 3.5-3z" />
                  <path d="M12 8C15 5 19 6 19 6s-.5 4-3.5 5c-2 .7-3.5-3-3.5-3z" />
                </svg>
              </div>
              <span className="text-[11px] sm:text-[11.5px] font-bold text-[#0D2D1E] leading-tight">
                Follow personalised guidance
              </span>
            </div>
          </div>
        </div>

        {/* Footer Action Section */}
        <div className="mt-3 sm:mt-3.5 pt-0.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 relative z-10">
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleRequestAppointment}
              className="inline-flex items-center justify-center gap-1.5 rounded-[6px] bg-[#0A261C] px-4.5 py-2 text-[12.5px] sm:text-[13px] font-bold text-white shadow-xs hover:bg-[#051711] transition-colors cursor-pointer"
            >
              Request a Consultation
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.4]" />
            </button>

            <button
              type="button"
              onClick={handleBackToWebsite}
              className="inline-flex items-center justify-center rounded-[6px] border border-[#143B2A] bg-[#FAF8F5] px-4.5 py-2 text-[12.5px] sm:text-[13px] font-bold text-[#0E3523] hover:bg-[#EFE7DC] transition-colors cursor-pointer"
            >
              Back to Therapies
            </button>
          </div>

          {/* Right Disclaimer Note */}
          <div className="flex items-center sm:pl-4 border-t sm:border-t-0 sm:border-l border-[#DFD5C4] pt-1.5 sm:pt-0">
            <p className="text-[11px] sm:text-[11.5px] text-[#2F4438] font-semibold leading-[1.35] max-w-[270px]">
              A consultation is required to assess whether this therapy is suitable for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

