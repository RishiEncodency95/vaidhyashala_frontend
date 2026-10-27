"use client";

import React from "react";
import { Shield } from "lucide-react";
import { usePrivacyPage } from "@/lib/privacyPage";
import { assetUrl } from "@/lib/home2";

export default function PrivacyHero() {
  const { hero } = usePrivacyPage();
  if (!hero) return null;

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF8F3] border-b border-[#ECE5D9]/70 pt-8 sm:pt-11 pb-10 sm:pb-13">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        {hero.image && (
          <img
            src={assetUrl(hero.image)}
            alt={hero.imageAlt}
            className="h-full w-full object-cover object-right"
          />
        )}
        {/* Soft responsive fade to ensure crisp text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F3] via-[#FAF8F3]/90 to-transparent sm:via-[#FAF8F3]/60 md:via-[#FAF8F3]/25" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Shield Icon Badge and Main Title in a single line */}
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-lg border border-[#C5BBA7] bg-[#EAE1CF] text-[#052119] shadow-2xs flex-shrink-0">
              {hero.iconImage ? (
                <img src={assetUrl(hero.iconImage)} alt="" className="h-5 w-5 sm:h-6 sm:w-6 object-contain" />
              ) : (
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.4] text-[#052119]" />
              )}
            </div>

            <h1 className="font-serif text-[38px] sm:text-[46px] lg:text-[52px] font-medium leading-[1.1] tracking-[-0.015em] text-[#0F382B]">
              {hero.title}
            </h1>
          </div>

          {/* Subtitle */}
          <p className="mt-2 text-[16px] sm:text-[17.5px] font-medium leading-[1.5] text-[#4A5950]">
            {hero.subtitle}
          </p>

          {/* Status & Effective Date Metadata */}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-[12.5px]">
            {hero.statusBadge && (
              <span className="inline-flex items-center rounded-full border border-[#D9D0BF] bg-[#EFE8DD] px-3 py-1 font-medium text-[#524939]">
                {hero.statusBadge}
              </span>
            )}
            {hero.statusBadge && hero.effectiveDate && <span className="text-[#B3A999]">|</span>}
            {hero.effectiveDate && <span className="font-medium text-[#6F7B74]">{hero.effectiveDate}</span>}
          </div>
        </div>
      </div>
    </section>
  );
}
