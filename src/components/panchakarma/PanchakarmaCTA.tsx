"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePanchakarma } from "@/lib/panchakarmaPage";
import { assetUrl } from "@/lib/home2";
import CmsImage from "@/components/CmsImage";

export default function PanchakarmaCTA() {
  const { cta } = usePanchakarma();
  if (!cta) return null;

  return (
    <section className="relative w-full overflow-hidden bg-[#E2E8DF] border-t border-[#D3DCD4]">
      {/* Background Wellness Image */}
      <div className="absolute inset-0 z-0">
        {cta.backgroundImage && (
          <CmsImage
            fill
            sizes="100vw"
            src={assetUrl(cta.backgroundImage)}
            alt={cta.backgroundImageAlt}
            className="h-full w-full object-cover object-right"
          />
        )}
        {/* Soft gradient overlay for text readability on smaller screens */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F3] via-[#FAF8F3]/90 to-transparent sm:via-[#FAF8F3]/50 md:hidden" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="max-w-xl">
          <h2 className="font-serif text-[30px] sm:text-[36px] lg:text-[40px] font-normal leading-[1.15] tracking-[-0.015em] text-[#123E30]">
            {cta.headingLine1}
            <br />
            {cta.headingLine2}
          </h2>

          <p className="mt-2.5 text-[15px] sm:text-[16px] font-normal leading-relaxed text-[#516157] max-w-md">
            {cta.description}
          </p>

          {cta.buttonLabel && (
            <div className="mt-6">
              <Link
                href={cta.buttonLink || "#consultation"}
                className="group inline-flex items-center gap-2.5 rounded-md bg-[#0A3527] px-6 sm:px-7 py-3 text-[14px] font-semibold text-white shadow-xs transition-all hover:bg-[#124534]"
              >
                <span>{cta.buttonLabel}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
