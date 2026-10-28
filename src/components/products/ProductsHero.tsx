"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useProductsPage } from "@/lib/productsPage";
import { assetUrl } from "@/lib/home2";
import CmsImage from "@/components/CmsImage";

export default function ProductsHero() {
  const { hero } = useProductsPage();
  if (!hero) return null;

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF7F2] border-b border-[#ECE5D9]/70">
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
        {/* Soft responsive fade for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/95 to-transparent sm:via-[#FAF7F2]/80 md:via-[#FAF7F2]/40 lg:via-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[350px] sm:min-h-[400px] lg:min-h-[440px] max-w-[1400px] flex-col justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-11">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-3.5 sm:mb-4">
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
          <h1 className="font-serif text-[44px] sm:text-[52px] lg:text-[60px] xl:text-[66px] font-medium leading-[1.08] tracking-[-0.018em] text-[#0F382B]">
            {hero.titleLine1}
            <br />
            <span className="italic font-medium">{hero.titleHighlight}</span>
          </h1>

          <p className="mt-3.5 sm:mt-4 text-[17px] sm:text-[18.5px] lg:text-[20px] font-medium leading-[1.5] text-[#4A5950] max-w-[520px]">
            {hero.description}
          </p>

          {hero.buttonLabel && (
            <div className="mt-5 sm:mt-6">
              <a
                href={hero.buttonLink || "#catalogue"}
                className="group inline-flex items-center gap-2 rounded-md bg-[#0A3527] px-6 py-2.5 sm:py-3 text-[14px] font-semibold text-white shadow-xs transition-all hover:bg-[#124534]"
              >
                <span>{hero.buttonLabel}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
