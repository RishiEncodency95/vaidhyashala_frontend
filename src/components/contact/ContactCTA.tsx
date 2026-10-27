"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useContactPage } from "@/lib/contactPage";
import { assetUrl } from "@/lib/home2";

export default function ContactCTA() {
  const { cta } = useContactPage();
  if (!cta) return null;

  return (
    <section className="relative w-full overflow-hidden bg-[#072B20] text-white py-5 sm:py-6 lg:py-7 border-t border-[#124233]">
      {/* Subtle background decorative leaf illustration */}
      {cta.decorativeImage && (
        <div className="pointer-events-none absolute -right-12 -top-12 z-0 h-64 w-64 opacity-10">
          <img src={assetUrl(cta.decorativeImage)} alt="" aria-hidden="true" className="h-full w-full object-contain" />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Left Text */}
          <div className="max-w-2xl">
            <span className="text-[11.5px] font-bold tracking-[1.5px] uppercase text-[#C59B63]">
              {cta.eyebrow}
            </span>
            <h2 className="mt-1 font-serif text-[28px] sm:text-[34px] lg:text-[38px] font-normal leading-[1.15] text-[#F3F7F4]">
              {cta.heading}
            </h2>
            <p className="mt-2 text-[14.5px] sm:text-[15.5px] font-normal text-[#B2C7BC] leading-relaxed">
              {cta.subtitle}
            </p>
          </div>

          {/* Right Action Button */}
          {cta.buttonLabel && (
            <div className="flex-shrink-0">
              <Link
                href={cta.buttonLink || "/#appointment"}
                className="group inline-flex items-center gap-2.5 rounded-md bg-white px-7 py-3.5 text-[14px] font-semibold text-[#0A3527] shadow-xs transition-all hover:bg-[#F4EFE6]"
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
