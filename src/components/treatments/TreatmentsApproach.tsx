"use client";

import React from "react";
import { useTreatments } from "./TreatmentsProvider";
import { assetUrl } from "@/lib/home2";

export default function TreatmentsApproach() {
  const { approach } = useTreatments();
  if (!approach) return null;

  return (
    <section className="w-full bg-[#FAF8F3] pt-2.5 sm:pt-3 pb-2.5 sm:pb-3 border-b border-[#ECE6DB]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Left Column: photo */}
          <div className="lg:col-span-6">
            {approach.image && (
              <div className="relative overflow-hidden rounded-xl border border-[#E3DDCF] bg-[#FAF8F3] shadow-xs">
                <img
                  src={assetUrl(approach.image)}
                  alt={approach.imageAlt}
                  className="w-full h-auto max-h-[460px] object-cover object-center"
                />
              </div>
            )}
          </div>

          {/* Right Column: Approach details */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-[11.5px] sm:text-[12px] font-bold tracking-[1.5px] uppercase text-[#A58351]">
              {approach.eyebrow}
            </span>

            <h2 className="mt-1.5 font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-medium leading-[1.14] text-[#0D3226]">
              {approach.headingLine1}
              <br />
              {approach.headingLine2}{" "}
              <span className="italic font-medium">{approach.headingHighlight}</span>
            </h2>

            <p className="mt-2 text-[14.5px] sm:text-[15px] font-medium leading-[1.65] text-[#4A5950] max-w-xl">
              {approach.description}
            </p>

            {/* Step items */}
            <div className="mt-4 sm:mt-5 space-y-3.5">
              {approach.items.map((step, index) => (
                <div key={`${step.number}-${index}`} className="flex items-start gap-3.5">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#F4EFE6] text-[13px] sm:text-[13.5px] font-bold text-[#A58351]">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#0D3226]">
                      {step.title}
                    </h3>
                    <p className="mt-0.5 text-[13px] sm:text-[13.5px] font-medium leading-[1.5] text-[#4A5950]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
