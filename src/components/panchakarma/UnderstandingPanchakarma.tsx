"use client";

import React from "react";
import { usePanchakarma } from "@/lib/panchakarmaPage";
import { assetUrl } from "@/lib/home2";
import CmsImage from "@/components/CmsImage";

export default function UnderstandingPanchakarma() {
  const { understanding } = usePanchakarma();
  if (!understanding) return null;

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF8F3] pt-2.5 sm:pt-3 pb-2.5 sm:pb-3 border-b border-[#ECE6DB]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Subtitle */}
        <div className="max-w-3xl">
          <h2 className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-medium leading-[1.14] text-[#0D3226]">
            {understanding.heading}
          </h2>
          <p className="mt-2 text-[14.5px] sm:text-[15px] font-medium leading-[1.6] text-[#4A5950]">
            {understanding.description}
          </p>
        </div>

        {/* 3 Step Visual Flow */}
        {understanding.image && (
          <div className="mt-3 sm:mt-3.5 w-full flex justify-center items-center">
            <CmsImage
              width={1600}
              height={394}
              sizes="(min-width: 1400px) 1360px, 100vw"
              src={assetUrl(understanding.image)}
              alt={understanding.imageAlt}
              className="w-full h-auto object-contain max-w-[1360px]"
            />
          </div>
        )}
      </div>
    </section>
  );
}
