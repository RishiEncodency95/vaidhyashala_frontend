"use client";

import React from "react";
import Link from "next/link";
import { useContactPage } from "@/lib/contactPage";
import { assetUrl } from "@/lib/home2";

export default function ContactHero() {
  const { hero } = useContactPage();
  if (!hero) return null;

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF7F2] border-b border-[#ECE6DB]">
      {/* Panoramic Hero Background Image */}
      <div className="absolute inset-0 z-0">
        {hero.image && (
          <img
            src={assetUrl(hero.image)}
            alt={hero.imageAlt}
            className="h-full w-full object-cover object-right"
          />
        )}
        {/* Soft responsive fade on small mobile screens to guarantee pristine text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/90 to-transparent sm:via-[#FAF7F2]/50 md:hidden" />
      </div>

      {/* Hero Content Container aligned with Navbar */}
      <div className="relative z-10 mx-auto flex min-h-[320px] sm:min-h-[360px] lg:min-h-[400px] max-w-[1400px] flex-col justify-center px-4 sm:px-6 lg:px-8 py-7 sm:py-9 lg:py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-3 sm:mb-4">
          <ol className="flex items-center space-x-2 text-[12.5px] font-normal">
            <li>
              <Link
                href={hero.breadcrumbHomeHref || "/home"}
                className="text-[#A3733F] transition-colors hover:text-[#0E3528]"
              >
                {hero.breadcrumbHomeLabel}
              </Link>
            </li>
            <li className="text-[#9FA9A2]">/</li>
            <li className="text-[#516157] font-normal" aria-current="page">
              {hero.breadcrumbCurrentLabel}
            </li>
          </ol>
        </nav>

        {/* Headline & Subtitle */}
        <div className="max-w-xl lg:max-w-2xl">
          <h1 className="font-serif text-[42px] sm:text-[50px] lg:text-[58px] xl:text-[64px] font-medium leading-[1.08] tracking-[-0.018em] text-[#0F382B]">
            {hero.titleLine1}
            <br />
            <span className="italic font-medium">{hero.titleLine2}</span>
          </h1>

          <p className="mt-3.5 sm:mt-4 text-[16px] sm:text-[17.5px] lg:text-[18.5px] font-medium leading-[1.5] text-[#4A5950] max-w-[500px]">
            {hero.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
