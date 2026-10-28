"use client";

import React from "react";
import { Leaf, Users, TrendingUp, Heart } from "lucide-react";
import { useCareersPage } from "@/lib/careersPage";
import { assetUrl } from "@/lib/home2";
import CmsImage from "@/components/CmsImage";

// Used when a reason has no uploaded icon, in the order the reasons are listed
const FALLBACK_ICONS = [Leaf, Users, TrendingUp, Heart];

export default function WhyWorkWithUs() {
  const { whyWork } = useCareersPage();
  if (!whyWork) return null;

  return (
    <section
      className="relative w-full overflow-hidden py-5 sm:py-6 lg:py-8 text-[#FFFDF6]"
      style={{
        background:
          "radial-gradient(circle at 10% 20%, rgba(9, 72, 45, 0.45), transparent 30%), linear-gradient(180deg, #093728 0%, #062B1F 55%, #042218 100%)",
      }}
    >
      {/* Decorative ambient leaf silhouettes on borders */}
      <CmsImage
        width={288}
        height={265}
        src="/leaf.webp"
        style={{ height: "auto" }}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-10 w-72 rotate-[25deg] opacity-[0.14] mix-blend-screen"
      />
      <CmsImage
        width={288}
        height={265}
        src="/leaf.webp"
        style={{ height: "auto" }}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-10 w-72 -rotate-[30deg] opacity-[0.14] mix-blend-screen"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-12 z-10">
        {/* Section Header: 2 Columns */}
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12 mb-4 sm:mb-5 lg:mb-6">
          <div className="lg:col-span-6">
            <span className="text-[12.5px] sm:text-[13px] font-bold tracking-[1.5px] uppercase text-[#D8B45D]">
              {whyWork.eyebrow}
            </span>
            <h2 className="mt-1 font-sans text-[32px] sm:text-[38px] lg:text-[42px] font-medium leading-[1.14] text-[#FFFDF6]">
              {whyWork.headingLine1}
              <br />
              {whyWork.headingLine2}
            </h2>
            <div className="mt-2.5 h-[2px] w-24 bg-[#D8B45D]" />
          </div>

          <div className="lg:col-span-6 lg:pt-5">
            <p className="text-[15px] sm:text-[15.5px] font-medium leading-[1.65] text-[#E0ECE5] max-w-xl">
              {whyWork.description}
            </p>
          </div>
        </div>

        {/* 4 White Value Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {whyWork.items.map((item, index) => {
            const IconComponent = FALLBACK_ICONS[index % FALLBACK_ICONS.length];
            return (
              <div
                key={index}
                className="flex flex-col items-center rounded-xl bg-[#FFFDF9] p-6 text-center text-[#172D24] shadow-xs border border-[#E3DDCF] transition-transform duration-200 hover:-translate-y-1"
              >
                {/* Circle Icon */}
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAE2D5] text-[#0D3226]">
                  {item.iconImage ? (
                    <CmsImage src={assetUrl(item.iconImage)} alt="" className="h-5 w-5 object-contain" width={20} height={20} />
                  ) : (
                    <IconComponent className="h-5 w-5 stroke-[1.8]" />
                  )}
                </div>

                <h3 className="mt-3.5 font-sans text-[18px] sm:text-[18.5px] font-medium leading-[1.25] text-[#0D3226]">
                  {item.title}
                </h3>

                <p className="mt-1.5 text-[13.5px] sm:text-[14px] font-medium leading-[1.5] text-[#4A5950]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
