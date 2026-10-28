"use client";

import React from "react";
import { useHome2 } from "@/components/home/Home2Provider";
import { assetUrl } from "@/lib/home2";
import CmsImage from "@/components/CmsImage";

export default function ApproachSection() {
  const { approach } = useHome2();
  if (!approach) return null;
  const steps = approach.items;

  return (
    <section className="w-full bg-[#FAF7F2] pt-2.5 sm:pt-3 pb-4 sm:pb-5 border-b border-[#ECE6DB]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Left Column: Shirodhara photo */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-xl border border-[#E3DDCF] bg-[#FAF8F3] shadow-xs">
              {approach.image && (
                <CmsImage
                  src={assetUrl(approach.image)}
                  alt={approach.imageAlt}
                  width={1600}
                  height={900}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  loading="eager"
                  className="w-full h-auto max-h-[480px] object-cover object-center"
                />
              )}
            </div>
          </div>

          {/* Right Column: Steps & Philosophy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Eyebrow */}
            <span className="text-[11.5px] sm:text-[12px] font-bold tracking-[1.5px] uppercase text-[#A58351]">
              {approach.eyebrow}
            </span>

            {/* Heading */}
            <h2 className="mt-1.5 font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-medium leading-[1.14] text-[#0D3226]">
              {approach.headingLine1}
              <br />
              <span className="italic font-medium">{approach.headingHighlight}</span>
            </h2>

            {/* Description */}
            <p className="mt-2 text-[14.5px] sm:text-[15px] font-medium leading-[1.65] text-[#4A5950] max-w-xl">
              {approach.description}
            </p>

            {/* 3 Step Cards */}
            <div className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3">
              {steps.map((step) => (
                <div
                  key={`${step.number}-${step.title}`}
                  className="flex items-start sm:items-center gap-3.5 rounded-xl border border-[#E6E0D3] bg-[#FAF8F3] px-4 py-2.5 sm:px-4.5 sm:py-3 transition-all hover:border-[#CFC4B3]"
                >
                  {/* Number Badge */}
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#EAE2D4] text-[12px] font-bold text-[#0D3226]">
                    {step.number}
                  </div>

                  {/* Text Details */}
                  <div>
                    <h3 className="text-[14.5px] sm:text-[15px] font-semibold text-[#0D3226] leading-tight">
                      {step.title}
                    </h3>
                    <p className="mt-0.5 text-[13px] sm:text-[13.5px] font-medium text-[#4A5950] leading-normal">
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
