"use client";

import React from "react";
import { useAbout } from "./AboutProvider";
import { assetUrl } from "@/lib/home2";

export default function HolisticCare() {
  const { holisticCare } = useAbout();
  if (!holisticCare) return null;

  return (
    <section className="w-full bg-[#FAF8F3] pt-2.5 sm:pt-3 pb-2.5 sm:pb-3 border-b border-[#ECE6DB]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14 items-center">
          {/* Left Column: Eyebrow + Heading + 2 Paragraphs stacked tightly together */}
          <div className="lg:col-span-6 xl:col-span-6">
            <span className="text-[11.5px] sm:text-[12px] font-bold tracking-[1.5px] uppercase text-[#A58351]">
              {holisticCare.eyebrow}
            </span>
            <h2 className="mt-1.5 font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-medium leading-[1.14] text-[#0D3226]">
              {holisticCare.heading}
            </h2>
            <div className="mt-3.5 space-y-3 text-[14.5px] sm:text-[15px] font-medium leading-[1.65] text-[#4A5950]">
              {holisticCare.paragraph1 && <p>{holisticCare.paragraph1}</p>}
              {holisticCare.paragraph2 && <p>{holisticCare.paragraph2}</p>}
            </div>
          </div>

          {/* Right Column: pillars illustration */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center items-center">
            {holisticCare.image && (
              <img
                src={assetUrl(holisticCare.image)}
                alt={holisticCare.imageAlt}
                className="w-full h-auto max-h-[320px] object-contain"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
