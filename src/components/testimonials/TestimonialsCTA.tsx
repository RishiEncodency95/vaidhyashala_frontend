"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTestimonialsPage } from "@/lib/testimonialsPage";
import { assetUrl } from "@/lib/home2";

export default function TestimonialsCTA() {
  const { cta } = useTestimonialsPage();
  if (!cta) return null;

  return (
    <section className="relative overflow-hidden bg-[#E9F0E8] py-6 sm:py-8 lg:py-10 border-t border-[#D5E1D4]">
      {/* Decorative leaf motif on left */}
      {cta.decorativeImage && (
        <img
          src={assetUrl(cta.decorativeImage)}
          alt=""
          className="pointer-events-none absolute -bottom-8 -left-8 w-[240px] opacity-40 select-none scale-x-[-1]"
        />
      )}
      {/* Decorative leaf motif on right */}
      {cta.decorativeImage && (
        <img
          src={assetUrl(cta.decorativeImage)}
          alt=""
          className="pointer-events-none absolute -bottom-8 -right-8 w-[240px] opacity-40 select-none"
        />
      )}

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <h2 className="font-serif text-[32px] sm:text-[38px] lg:text-[44px] font-bold leading-tight text-[#0A291F]">
          {cta.heading}
        </h2>

        {/* Subtitle */}
        <p className="mt-2 text-[16.5px] sm:text-[18px] font-semibold text-[#32453B]">
          {cta.subtitle}
        </p>

        {/* CTA Button */}
        {cta.buttonLabel && (
        <div className="mt-4 sm:mt-5">
          <Link
            href={cta.buttonLink || "/#consultation"}
            className="group inline-flex items-center gap-2.5 rounded-md bg-[#0A3527] px-8 py-3.5 text-[15.5px] font-bold text-white shadow-xs transition-all hover:bg-[#124534]"
          >
            <span>{cta.buttonLabel}</span>
            <ArrowRight className="h-4.5 w-4.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
        )}
      </div>
    </section>
  );
}
