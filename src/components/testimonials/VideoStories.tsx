"use client";

import React from "react";
import { useTestimonialsPage } from "@/lib/testimonialsPage";
import { assetUrl } from "@/lib/home2";

export default function VideoStories() {
  const { videoStories } = useTestimonialsPage();
  if (!videoStories) return null;

  return (
    <section className="relative overflow-hidden w-full bg-[#FAF8F3] border-b border-[#ECE6DB]">
      <div className="relative w-full">
        {videoStories.image && (
          <img
            src={assetUrl(videoStories.image)}
            alt={videoStories.imageAlt}
            className="w-full h-auto block"
          />
        )}
        {/* Positioned text in the reserved left-center space */}
        <div className="absolute inset-y-0 left-[7%] sm:left-[8%] md:left-[9%] lg:left-[10%] w-[32%] sm:w-[28%] md:w-[26%] flex flex-col justify-center pointer-events-none select-none">
          <h2 className="font-serif text-[14px] sm:text-[24px] md:text-[32px] lg:text-[40px] xl:text-[46px] font-bold leading-[1.12] text-[#0A291F]">
            {videoStories.headingLine1}
            <br />
            {videoStories.headingLine2}
          </h2>
          <p className="mt-1 sm:mt-2.5 md:mt-3.5 text-[9.5px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-semibold leading-[1.4] sm:leading-[1.5] text-[#33463C]">
            {videoStories.description}
          </p>
        </div>
      </div>
    </section>
  );
}
