"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { usePanchakarma } from "@/lib/panchakarmaPage";
import { assetUrl } from "@/lib/home2";
import AyurvedicConsultationModal from "@/components/consultation/AyurvedicConsultationModal";
import CmsImage from "@/components/CmsImage";

interface TherapyItem {
  title: string;
  description: string;
  imageSrc: string;
  fallbackSrc: string;
  alt: string;
}

// Shown if a therapy photo fails to load
const FALLBACK_IMAGE = "/a1.webp";

export default function SupportingTherapies() {
  const [selectedTherapy, setSelectedTherapy] = useState<TherapyItem | null>(null);

  const { supportingTherapies } = usePanchakarma();
  if (!supportingTherapies) return null;
  const therapies: TherapyItem[] = supportingTherapies.items.map((t) => ({
    title: t.title,
    description: t.description,
    imageSrc: assetUrl(t.image),
    fallbackSrc: FALLBACK_IMAGE,
    alt: t.imageAlt || t.title,
  }));

  return (
    <section className="w-full bg-[#FAF8F3] pt-2.5 sm:pt-3 pb-4 sm:pb-5 border-b border-[#ECE6DB]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header with decorative horizontal accents */}
        <div className="max-w-4xl lg:max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-5 lg:gap-6">
            <span className="hidden md:block h-[1px] w-8 lg:w-16 bg-[#D8CFBF]" />
            <h2 className="font-serif text-[28px] sm:text-[34px] md:text-[38px] lg:text-[40px] font-medium leading-[1.14] text-[#0D3226] whitespace-normal sm:whitespace-nowrap">
              {supportingTherapies.heading}
            </h2>
            <span className="hidden md:block h-[1px] w-8 lg:w-16 bg-[#D8CFBF]" />
          </div>

          <p className="mt-2 text-[14.5px] sm:text-[15px] font-medium leading-[1.6] text-[#4A5950] max-w-3xl mx-auto">
            {supportingTherapies.description}
          </p>
        </div>

        {/* 3x3 Therapy Cards Grid */}
        <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {therapies.map((therapy) => (
            <div
              key={therapy.title}
              className="group flex flex-col transition-all duration-200"
            >
              {/* Therapy Photo */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTherapy(therapy);
                }}
                className="relative overflow-hidden rounded-xl aspect-[16/10] bg-[#EAE4D8] border border-[#ECE5D9] cursor-pointer"
              >
                <CmsImage
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  src={therapy.imageSrc}
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.srcset = "";
                    img.src = therapy.fallbackSrc;
                  }}
                  alt={therapy.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-104"
                />
              </div>

              {/* Title */}
              <h3
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTherapy(therapy);
                }}
                className="mt-3 font-serif text-[18px] sm:text-[19px] font-medium leading-tight text-[#0D3226] cursor-pointer hover:text-[#185340]"
              >
                {therapy.title}
              </h3>

              {/* Description */}
              <p className="mt-1 text-[13px] sm:text-[13.5px] font-medium leading-[1.5] text-[#5A6860]">
                {therapy.description}
              </p>

              {/* Action Link */}
              <div className="mt-2.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTherapy(therapy);
                  }}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0D3226] transition-colors hover:text-[#185340] cursor-pointer"
                >
                  <span>{supportingTherapies.linkLabel}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <p className="mt-5 sm:mt-6 text-center text-[12px] sm:text-[12.5px] font-medium text-[#718277]">
          {supportingTherapies.note}
        </p>
      </div>

      {/* Ayurvedic Therapy Detail Modal */}
      <AyurvedicConsultationModal
        isOpen={!!selectedTherapy}
        onClose={() => setSelectedTherapy(null)}
        therapy={
          selectedTherapy
            ? {
                title: selectedTherapy.title,
                imageSrc: selectedTherapy.imageSrc,
                category: "AYURVEDIC THERAPY",
                subtitle: "Learn about the therapy before planning your consultation.",
                aboutTitle: `What is ${selectedTherapy.title}?`,
                aboutDescription:
                  selectedTherapy.title === "Shirodhara"
                    ? "A traditional Ayurvedic therapy involving a steady flow of a selected liquid over the forehead. The preparation and procedure are chosen by the treating doctor."
                    : `${selectedTherapy.description} A personalized therapeutic procedure recommended following doctor consultation.`,
              }
            : undefined
        }
        onRequestAppointment={() => {
          setSelectedTherapy(null);
          const el = document.getElementById("consultation");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }}
        onBackToWebsite={() => setSelectedTherapy(null)}
      />
    </section>
  );
}
