"use client";

import React from "react";
import { useTreatments } from "./TreatmentsProvider";
import { assetUrl } from "@/lib/home2";
import CmsImage from "@/components/CmsImage";

export default function HealthConcerns() {
  const { healthConcerns } = useTreatments();
  if (!healthConcerns) return null;

  return (
    <section className="w-full bg-white pt-2.5 sm:pt-3 pb-2.5 sm:pb-3 border-b border-[#ECE6DB]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-[11.5px] sm:text-[12px] font-bold tracking-[1.5px] uppercase text-[#A58351]">
            {healthConcerns.eyebrow}
          </span>
          <h2 className="mt-1.5 font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-medium leading-[1.14] text-[#0D3226]">
            {healthConcerns.heading}
          </h2>
          <p className="mt-2 text-[14.5px] sm:text-[15px] font-medium leading-[1.6] text-[#4A5950]">
            {healthConcerns.description}
          </p>
        </div>

        {/* Health Concerns Image */}
        {healthConcerns.image && (
          <div className="mt-3.5 sm:mt-4 w-full flex justify-center items-center">
            <CmsImage
              width={2171}
              height={161}
              sizes="(min-width: 1400px) 1360px, 100vw"
              src={assetUrl(healthConcerns.image)}
              alt={healthConcerns.imageAlt}
              className="w-full h-auto object-contain max-w-[1360px]"
            />
          </div>
        )}
      </div>
    </section>
  );
}
