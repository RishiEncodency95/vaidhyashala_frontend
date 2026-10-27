"use client";

import React from "react";
import Breadcrumb from "./Breadcrumb";
import { useJournal } from "@/lib/journalPage";
import { assetUrl } from "@/lib/home2";

export default function HeroJournal() {
  const { hero } = useJournal();
  if (!hero) return null;

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF7F2] border-b border-[#ECE5D9]/70">
      {/* Panoramic Hero Background Image */}
      <div className="absolute inset-0 z-0">
        {hero.backgroundImage && (
          <img
            src={assetUrl(hero.backgroundImage)}
            alt={hero.backgroundImageAlt}
            className="h-full w-full object-cover object-right"
          />
        )}
        {/* Soft responsive fade on small mobile viewports to ensure 100% crisp text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/90 to-transparent sm:via-[#FAF7F2]/40 md:hidden" />
      </div>

      {/* Hero Content Container aligned with Navbar - shifted lower while preserving overall height */}
      <div className="relative z-10 mx-auto flex min-h-[380px] sm:min-h-[420px] lg:min-h-[460px] max-w-[1400px] flex-col justify-start px-4 sm:px-6 lg:px-8 pt-11 sm:pt-14 lg:pt-16 pb-6 sm:pb-8 lg:pb-10">
        {/* Top: Breadcrumb */}
        <div>
          <Breadcrumb
            homeLabel={hero.breadcrumbHomeLabel}
            homeHref={hero.breadcrumbHomeHref}
            currentLabel={hero.breadcrumbCurrentLabel}
          />
        </div>

        {/* Headline & Subtitle sitting directly under Breadcrumb with decreased gap */}
        <div className="mt-2.5 sm:mt-3 max-w-xl lg:max-w-2xl">
          <h1 className="font-serif text-[34px] sm:text-[42px] lg:text-[52px] font-normal leading-[1.08] tracking-[-0.015em] text-[#123E30]">
            {hero.titleLine1}
            <br />
            {hero.titleLine2}
            <span className="text-[#A58351]">{hero.titleAccent}</span>
          </h1>
          <p className="mt-4 sm:mt-5 text-[18px] sm:text-[20px] lg:text-[22px] font-normal leading-[1.5] text-[#62645F] max-w-[580px] lg:max-w-[640px]">
            {hero.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
