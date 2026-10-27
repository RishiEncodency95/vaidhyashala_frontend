"use client";

import React from "react";
import { useAbout } from "./AboutProvider";
import { assetUrl } from "@/lib/home2";

export default function AboutApproach() {
  const { approach } = useAbout();
  if (!approach) return null;

  return (
    <section className="w-full bg-[#FAF7F2] pt-2.5 sm:pt-3 pb-4 sm:pb-5 border-b border-[#ECE6DB]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Left Column: Doctor consultation image */}
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

          {/* Right Column: Approach steps */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-[11.5px] sm:text-[12px] font-bold tracking-[1.5px] uppercase text-[#A58351]">
              {approach.eyebrow}
            </span>

            <h2 className="mt-1.5 font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-medium leading-[1.14] text-[#0D3226]">
              {approach.headingLine1}
              <br />
              {approach.headingLine2}
            </h2>

            <p className="mt-2.5 text-[14.5px] sm:text-[15px] font-medium leading-[1.65] text-[#4A5950] max-w-xl">
              {approach.description}
            </p>

            <div className="mt-5 space-y-4">
              {approach.items.map((step, index) => (
                <div key={`${step.number}-${index}`} className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#EAE2D5] text-[12.5px] font-bold text-[#0D3226]">
                    {step.number}
                  </div>
                  <div className="pt-0.5 border-l border-[#DFD7CB] pl-3.5">
                    <h3 className="font-serif text-[17px] sm:text-[18px] font-medium text-[#0D3226] leading-tight">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-[13px] sm:text-[13.5px] font-medium text-[#4A5950] leading-[1.5]">
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
