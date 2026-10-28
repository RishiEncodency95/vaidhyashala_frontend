"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useHome2 } from "@/components/home/Home2Provider";
import { assetUrl } from "@/lib/home2";
import CmsImage from "@/components/CmsImage";

export default function ProductsBanner() {
  const { products } = useHome2();
  if (!products) return null;
  return (
    <section className="relative w-full overflow-hidden bg-[#FAF7F2] border-b border-[#ECE6DB]">
      {/* Background Banner Image: /home/i2.png */}
      <div className="absolute inset-0 z-0">
        {products.image && (
          <CmsImage
            src={assetUrl(products.image)}
            alt={products.imageAlt}
            fill
            sizes="100vw"
            className="h-full w-full object-cover object-right"
          />
        )}
        {/* Soft mobile gradient overlay to guarantee pristine readability on small screens */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/90 to-transparent sm:via-[#FAF7F2]/60 md:hidden" />
      </div>

      {/* Banner Content Container */}
      <div className="relative z-10 mx-auto flex min-h-[360px] sm:min-h-[420px] lg:min-h-[460px] max-w-[1400px] flex-col justify-center px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        <div className="max-w-xl">
          {/* Eyebrow */}
          <span className="text-[11.5px] sm:text-[12px] font-bold tracking-[1.5px] uppercase text-[#A58351]">
            {products.eyebrow}
          </span>

          {/* Heading */}
          <h2 className="mt-1.5 font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-medium leading-[1.14] text-[#0D3226]">
            {products.headingLine1}
            <br />
            {products.headingLine2}
          </h2>

          {/* Description */}
          <p className="mt-2.5 text-[14.5px] sm:text-[15px] lg:text-[15.5px] font-medium leading-[1.6] text-[#4A5950] max-w-lg">
            {products.description}
          </p>

          {/* CTA Button */}
          <div className="mt-6">
            <Link
              href={products.buttonLink || "/products"}
              className="group inline-flex items-center gap-2.5 rounded-md bg-[#0A3527] px-6 sm:px-7 py-3 text-[14px] font-semibold text-white shadow-xs transition-all hover:bg-[#124534]"
            >
              <span>{products.buttonLabel}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
