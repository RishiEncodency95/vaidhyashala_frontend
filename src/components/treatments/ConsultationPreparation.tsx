"use client";

import React from "react";
import { FileText, Pill, ClipboardList } from "lucide-react";
import { useTreatments } from "./TreatmentsProvider";
import { assetUrl } from "@/lib/home2";

// Used when a tip has no uploaded icon, in the order the tips are listed
const FALLBACK_ICONS = [FileText, Pill, ClipboardList];

export default function ConsultationPreparation() {
  const { preparation } = useTreatments();
  if (!preparation) return null;

  return (
    <section className="w-full bg-[#FAF7F2] pt-2.5 sm:pt-3 pb-2.5 sm:pb-3 border-b border-[#ECE6DB]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <span className="text-[11.5px] sm:text-[12px] font-bold tracking-[1.5px] uppercase text-[#A58351]">
            {preparation.eyebrow}
          </span>
          <h2 className="mt-1.5 font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-medium leading-[1.14] text-[#0D3226]">
            {preparation.heading}
          </h2>
          <p className="mt-2 text-[14.5px] sm:text-[15px] font-medium leading-[1.6] text-[#4A5950]">
            {preparation.description}
          </p>
        </div>

        {/* Preparation Cards */}
        <div className="mt-4 sm:mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {preparation.items.map((item, idx) => {
            const Icon = FALLBACK_ICONS[idx % FALLBACK_ICONS.length];
            return (
              <div
                key={idx}
                className="flex items-start gap-3.5 rounded-xl border border-[#DFD8CC] bg-white p-4 sm:p-5 transition-all duration-200 hover:border-[#0D3226] hover:shadow-2xs"
              >
                <div className="flex h-12 w-12 sm:h-13 sm:w-13 flex-shrink-0 items-center justify-center rounded-xl bg-[#F4EFE6] text-[#0D3226] shadow-2xs">
                  {item.iconImage ? (
                    <img src={assetUrl(item.iconImage)} alt="" className="h-7 w-7 object-contain" />
                  ) : (
                    <Icon className="h-6.5 w-6.5 sm:h-7 sm:w-7 stroke-[1.8]" />
                  )}
                </div>
                <div>
                  <h3 className="text-[14.5px] sm:text-[15px] font-semibold text-[#0D3226] leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[13px] sm:text-[13.5px] font-medium text-[#4A5950] leading-[1.5]">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
