"use client";

import React from "react";
import { useHome2 } from "@/components/home/Home2Provider";
import { assetUrl } from "@/lib/home2";

export default function ConcernCategories() {
  const { concerns } = useHome2();
  if (!concerns) return null;
  return (
    <section className="w-full bg-white pt-2.5 sm:pt-3 pb-2.5 sm:pb-3 border-b border-[#ECE6DB]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl lg:max-w-5xl">
          <span className="text-[11.5px] sm:text-[12px] font-bold tracking-[1.5px] uppercase text-[#A58351]">
            {concerns.eyebrow}
          </span>
          <h2 className="mt-1.5 font-serif text-[30px] sm:text-[34px] md:text-[38px] lg:text-[40px] xl:text-[42px] font-medium leading-[1.14] text-[#0D3226] ">
            {concerns.heading}
          </h2>
          <p className="mt-2 text-[14.5px] sm:text-[15px] font-medium leading-[1.6] text-[#4A5950] max-w-4xl">
            {concerns.description}
          </p>
        </div>

        {/* Health Concerns Graphic Image (t1.png) */}
        <div className="mt-3.5 sm:mt-4 w-full flex justify-center items-center">
          <img
            src={assetUrl(concerns.image)}
            alt={concerns.imageAlt}
            className="w-full h-auto object-contain max-w-[1360px]"
          />
        </div>
      </div>
    </section>
  );
}
