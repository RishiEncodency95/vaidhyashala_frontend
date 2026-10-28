"use client";

import React from "react";
import { Check } from "lucide-react";
import { usePanchakarma } from "@/lib/panchakarmaPage";
import { assetUrl } from "@/lib/home2";
import CmsImage from "@/components/CmsImage";

export default function TherapyPlanConversation() {
  const { therapyPlan } = usePanchakarma();
  if (!therapyPlan) return null;

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF7F2] pt-2.5 sm:pt-3 pb-2.5 sm:pb-3 border-b border-[#ECE6DB]">
      {/* Decorative leaf branch in bottom right corner */}
      <div className="pointer-events-none absolute -bottom-10 -right-8 z-0 hidden md:block w-52 lg:w-64 opacity-80">
        <CmsImage
          width={256}
          height={128}
          src="/cont.webp"
          alt=""
          aria-hidden="true"
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Left Column: Doctor Consultation Photo */}
          <div className="lg:col-span-6">
            {therapyPlan.image && (
              <div className="relative overflow-hidden rounded-xl border border-[#E3DDCF] bg-[#FAF8F3] shadow-xs">
                <CmsImage
                  width={1536}
                  height={1024}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  src={assetUrl(therapyPlan.image)}
                  alt={therapyPlan.imageAlt}
                  className="w-full h-auto max-h-[460px] object-cover object-center"
                />
              </div>
            )}
          </div>

          {/* Right Column: Copy & Checklist */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-medium leading-[1.14] text-[#0D3226]">
              {therapyPlan.headingLine1}
              <br />
              {therapyPlan.headingLine2}
            </h2>

            <p className="mt-3 text-[14.5px] sm:text-[15px] font-medium leading-[1.65] text-[#4A5950] max-w-lg">
              {therapyPlan.description}
            </p>

            {/* Checklist */}
            <div className="mt-6 space-y-3.5">
              {therapyPlan.items.map((point, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex h-5.5 w-5.5 flex-shrink-0 items-center justify-center rounded-full border border-[#2E6B54] bg-[#FAF8F3] text-[#1E5D47]">
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-[14px] sm:text-[14.5px] font-medium text-[#2F4439]">
                    {point.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
