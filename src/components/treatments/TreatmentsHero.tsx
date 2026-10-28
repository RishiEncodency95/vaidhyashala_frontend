"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTreatments } from "./TreatmentsProvider";
import { assetUrl } from "@/lib/home2";
import CmsImage from "@/components/CmsImage";

export default function TreatmentsHero() {
  const { hero } = useTreatments();
  if (!hero) return null;

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF7F2]">
      {/* Panoramic Hero Background Image */}
      <div className="absolute inset-0 z-0">
        {hero.image && (
          <CmsImage
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            src={assetUrl(hero.image)}
            alt={hero.imageAlt}
            className="h-full w-full object-cover object-right"
          />
        )}
        {/* Soft responsive fade on small mobile screens to guarantee pristine text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/90 to-transparent sm:via-[#FAF7F2]/50 md:hidden" />
      </div>

      {/* Hero Content Container aligned with Navbar */}
      <div className="relative z-10 mx-auto flex min-h-[440px] sm:min-h-[500px] lg:min-h-[540px] xl:min-h-[580px] max-w-[1400px] flex-col justify-center px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Eyebrow */}
          <span className="text-[12px] sm:text-[12.5px] font-bold tracking-[1.8px] uppercase text-[#A58351]">
            {hero.eyebrow}
          </span>

          {/* Main Editorial Heading */}
          <h1 className="mt-2.5 font-serif text-[44px] sm:text-[54px] lg:text-[60px] xl:text-[68px] font-medium leading-[1.08] tracking-[-0.018em] text-[#0F382B]">
            {hero.titleLine1}
            <br />
            <span className="italic font-medium">{hero.titleHighlight}</span>
          </h1>

          {/* Subtitle description */}
          <p className="mt-4 text-[16px] sm:text-[17px] lg:text-[18px] font-medium leading-[1.6] text-[#4A5950] max-w-[500px]">
            {hero.description}
          </p>

          {/* Action Button */}
          {hero.buttonLabel && (
            <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={hero.buttonLink || "/#consultation"}
                className="group inline-flex items-center gap-2.5 rounded-md bg-[#0A3527] px-7 sm:px-8 py-3.5 text-[15px] font-semibold text-white shadow-xs transition-all hover:bg-[#124534]"
              >
                <span>{hero.buttonLabel}</span>
                <ArrowRight className="h-4.5 w-4.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
