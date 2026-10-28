"use client";

import React from "react";
import Link from "next/link";
import { useTestimonialsPage } from "@/lib/testimonialsPage";
import { assetUrl } from "@/lib/home2";
import CmsImage from "@/components/CmsImage";

interface TestimonialsHeroProps {
  heroImageSrc?: string;
}

export default function TestimonialsHero({ heroImageSrc }: TestimonialsHeroProps) {
  const { hero } = useTestimonialsPage();
  if (!hero) return null;

  return (
    <div>
      <section className="relative w-full overflow-hidden bg-[#FAF7F2] border-b border-[#ECE5D9]/70">
        {/* Hero Background Image: clinic-reception-hero.jpg */}
        <div className="absolute inset-0 z-0">
          {(heroImageSrc || hero.image) && (
            <CmsImage
              fill
              sizes="100vw"
              loading="eager"
              fetchPriority="high"
              src={heroImageSrc || assetUrl(hero.image)}
              alt={hero.imageAlt}
              className="h-full w-full object-cover object-right"
            />
          )}
          {/* Soft responsive fade for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/95 to-transparent sm:via-[#FAF7F2]/80 md:via-[#FAF7F2]/40 lg:via-transparent" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 mx-auto flex min-h-[300px] sm:min-h-[340px] lg:min-h-[380px] max-w-[1400px] flex-col justify-center px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-2.5 sm:mb-3">
            <ol className="flex items-center space-x-2 text-[14px] font-medium">
              <li>
                <Link
                  href={hero.breadcrumbHomeHref || "/home"}
                  className="text-[#A3733F] transition-colors hover:text-[#0E3528]"
                >
                  {hero.breadcrumbHomeLabel}
                </Link>
              </li>
              <li className="text-[#9FA9A2]">/</li>
              <li className="text-[#3E4E45] font-semibold" aria-current="page">
                {hero.breadcrumbCurrentLabel}
              </li>
            </ol>
          </nav>

          {/* Headline & Subtitle */}
          <div className="max-w-xl lg:max-w-2xl">
            <h1 className="font-serif text-[48px] sm:text-[56px] lg:text-[64px] xl:text-[72px] font-semibold leading-[1.06] tracking-tight text-[#0F382B]">
              {hero.titleLine1}
              <br />
              {hero.titleLine2}
            </h1>

            <p className="mt-3 sm:mt-3.5 text-[18px] sm:text-[20px] lg:text-[21px] font-semibold leading-[1.45] text-[#3D4D43] max-w-[560px]">
              {hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Illustrative Notice Strip */}
      {hero.previewNote && (
        <div className="w-full border-b border-[#ECE5D9] bg-[#F7F4EB] py-1.5 px-4 text-center">
          <p className="text-[13.5px] sm:text-[14px] font-medium text-[#627068]">{hero.previewNote}</p>
        </div>
      )}
    </div>
  );
}
