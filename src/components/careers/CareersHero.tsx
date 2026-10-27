"use client";

import React from "react";
import Image from "next/image";
import { useCareersPage } from "@/lib/careersPage";
import { assetUrl } from "@/lib/home2";

const lines = (value: string) => value.split("\n").map((l) => l.trim()).filter(Boolean);

export default function CareersHero() {
  const { hero } = useCareersPage();
  if (!hero) return null;

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF7F2] border-b border-[#ECE6DB] min-h-[400px] lg:min-h-[460px] xl:min-h-[500px] flex items-center">
      {/* Background panoramic image: he1.png */}
      <div className="absolute inset-0 select-none pointer-events-none">
        {hero.image && (
          <Image
            src={assetUrl(hero.image)}
            alt={hero.imageAlt}
            fill
            priority
            unoptimized
            className="object-cover object-[78%_center] sm:object-[72%_center] lg:object-center"
          />
        )}
        {/* Soft readable gradient overlay on smaller screens */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2]/95 via-[#FAF7F2]/85 to-transparent lg:hidden" />
      </div>

      {/* Wall Typography on Top Right: Ancient Wisdom Modern Wellness */}
      <div className="hidden lg:block absolute right-8 sm:right-12 xl:right-16 top-6 sm:top-8 text-right select-none pointer-events-none z-20 drop-shadow-xs">
        {lines(hero.tagline).map((word, i) => (
          <p
            key={i}
            className={`font-sans text-[19px] xl:text-[22px] font-semibold tracking-tight text-[#243E32] ${i > 0 ? "-mt-1" : ""}`}
          >
            {word}
          </p>
        ))}
      </div>

      {/* Left Column Content - Aligned with Navbar */}
      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-12 py-5 sm:py-6 lg:py-8 z-20">
        <div className="max-w-xl lg:max-w-2xl">
          <span className="relative inline-block text-[12.5px] sm:text-[13px] font-bold tracking-[1.5px] uppercase text-[#8F6D3C] [text-shadow:0_0_2px_#FAF7F2,0_0_5px_#FAF7F2,0_0_9px_#FAF7F2,0_0_14px_#FAF7F2,0_0_22px_#FAF7F2]">
            {hero.eyebrow}
          </span>

          <h1 className="mt-2 font-sans text-[40px] sm:text-[48px] lg:text-[54px] xl:text-[58px] font-medium leading-[1.08] tracking-[-0.018em] text-[#0F382B]">
            {hero.titleLine1}
            <br />
            {hero.titleLine2}
          </h1>

          <p className="mt-2.5 sm:mt-3 text-[16px] sm:text-[17.5px] lg:text-[18.5px] font-medium leading-[1.5] text-[#4A5950] max-w-lg">
            {hero.description}
          </p>

          {/* Feature badges image */}
          {hero.badgesImage && (
            <div className="mt-4 sm:mt-5 max-w-[480px]">
              <Image
                src={assetUrl(hero.badgesImage)}
                alt={hero.badgesImageAlt}
                width={520}
                height={170}
                unoptimized
                className="w-full h-auto object-contain mix-blend-multiply"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
