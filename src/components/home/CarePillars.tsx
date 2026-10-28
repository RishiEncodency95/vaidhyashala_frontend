"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useHome2 } from "@/components/home/Home2Provider";
import { assetUrl } from "@/lib/home2";
import CmsImage from "@/components/CmsImage";
import AyurvedicConsultationModal from "@/components/consultation/AyurvedicConsultationModal";

export default function CarePillars() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const { carePillars } = useHome2();
  if (!carePillars) return null;
  // The first card opens the consultation popup (as before); the rest follow their CMS link
  const pillars = carePillars.items;

  return (
    <section className="w-full bg-[#FAF8F3] pt-2.5 sm:pt-3 pb-4 sm:pb-5 border-b border-[#ECE6DB]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-4xl lg:max-w-5xl">
          <span className="text-[11.5px] sm:text-[12px] font-bold tracking-[1.5px] uppercase text-[#A58351]">
            {carePillars.eyebrow}
          </span>
          <h2 className="mt-1.5 font-serif text-[30px] sm:text-[34px] md:text-[38px] lg:text-[40px] xl:text-[42px] font-medium leading-[1.14] text-[#0D3226] ">
            {carePillars.heading}
          </h2>
          <p className="mt-2 text-[14.5px] sm:text-[15px] font-medium leading-[1.6] text-[#4A5950] max-w-4xl">
            {carePillars.description}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-5 sm:mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {pillars.map((pillar, index) => (
            <div
              key={`${pillar.number}-${pillar.title}`}
              className="group flex flex-col justify-between transition-all duration-200"
            >
              <div>
                {/* Image */}
                <div
                  className={`relative overflow-hidden rounded-xl aspect-[16/11] bg-[#EAE4D8] ${
                    index === 0 ? "cursor-pointer" : ""
                  }`}
                  onClick={() => {
                    if (index === 0) setIsConsultationModalOpen(true);
                  }}
                >
                  {pillar.image && (
                    <CmsImage
                      src={assetUrl(pillar.image)}
                      alt={pillar.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      loading="eager"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>

                {/* Number Eyebrow */}
                <div className="mt-3 text-[12px] font-bold tracking-wider text-[#A58351]">
                  {pillar.number}
                </div>

                {/* Title */}
                <h3
                  className={`mt-1 font-serif text-[17.5px] sm:text-[18px] font-medium leading-[1.25] text-[#0D3226] group-hover:text-[#185340] transition-colors ${
                    index === 0 ? "cursor-pointer" : ""
                  }`}
                  onClick={() => {
                    if (index === 0) setIsConsultationModalOpen(true);
                  }}
                >
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="mt-1.5 text-[13px] sm:text-[13.5px] font-medium leading-[1.55] text-[#4A5950]">
                  {pillar.description}
                </p>
              </div>

              {/* Link CTA */}
              <div className="mt-3.5 pt-0.5">
                {index === 0 ? (
                  <button
                    type="button"
                    onClick={() => setIsConsultationModalOpen(true)}
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#0D3226] transition-colors hover:text-[#195642] cursor-pointer"
                  >
                    <span className="border-b-[1.5px] border-[#A58351] pb-0.5">{carePillars.linkLabel}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                ) : (
                  <Link
                    href={pillar.link || "#"}
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#0D3226] transition-colors hover:text-[#195642]"
                  >
                    <span className="border-b-[1.5px] border-[#A58351] pb-0.5">{carePillars.linkLabel}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ayurvedic Consultation Popup Modal */}
      <AyurvedicConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        onRequestAppointment={() => {
          setIsConsultationModalOpen(false);
          const element = document.getElementById("appointment");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }}
        onBackToWebsite={() => setIsConsultationModalOpen(false)}
      />
    </section>
  );
}
