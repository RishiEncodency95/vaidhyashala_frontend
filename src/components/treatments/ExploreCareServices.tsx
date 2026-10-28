"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTreatments } from "./TreatmentsProvider";
import { assetUrl } from "@/lib/home2";
import CmsImage from "@/components/CmsImage";

export default function ExploreCareServices() {
  const { careServices } = useTreatments();
  if (!careServices) return null;

  return (
    <section className="w-full bg-[#FAF8F3] pt-2.5 sm:pt-3 pb-2.5 sm:pb-3 border-b border-[#ECE6DB]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-[11.5px] sm:text-[12px] font-bold tracking-[1.5px] uppercase text-[#A58351]">
            {careServices.eyebrow}
          </span>
          <h2 className="mt-1.5 font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-medium leading-[1.14] text-[#0D3226]">
            {careServices.heading}
          </h2>
          <p className="mt-2 text-[14.5px] sm:text-[15px] font-medium leading-[1.6] text-[#4A5950] max-w-[860px]">
            {careServices.description}
          </p>
        </div>

        {/* 2x2 Horizontal Cards Grid */}
        <div className="mt-4 sm:mt-4.5 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
          {careServices.items.map((service, idx) => (
            <div
              key={idx}
              className="group flex flex-col sm:flex-row overflow-hidden rounded-xl border border-[#DFD8CC] bg-[#FAF8F3] transition-all duration-200 hover:border-[#0D3226] hover:shadow-xs"
            >
              {/* Card Image: 42% proportion matching reference image */}
              <div className="w-full sm:w-[42%] md:w-[44%] lg:w-[42%] shrink-0 bg-[#EAE4D8] overflow-hidden relative min-h-[200px] sm:min-h-[230px] lg:min-h-[240px]">
                {service.image && (
                  <CmsImage
                    fill
                    sizes="(min-width: 1024px) 21vw, (min-width: 640px) 44vw, 100vw"
                    src={assetUrl(service.image)}
                    alt={service.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>

              {/* Card Content: 58% proportion */}
              <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 lg:p-6">
                <div>
                  <span className="text-[12px] sm:text-[13px] font-bold tracking-wider text-[#A58351]">
                    {service.number}
                  </span>
                  <h3 className="mt-1 font-serif text-[18px] sm:text-[19px] lg:text-[20px] font-medium leading-[1.25] text-[#0D3226]">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] sm:text-[13.5px] font-medium leading-[1.5] text-[#4A5950] max-w-[340px]">
                    {service.description}
                  </p>
                </div>

                {service.link && careServices.linkLabel && (
                  <div className="mt-4 pt-1">
                    <Link
                      href={service.link}
                      className="inline-flex items-center gap-1.5 text-[13px] sm:text-[13.5px] font-semibold text-[#0D3226] transition-colors hover:text-[#185340]"
                    >
                      <span>{careServices.linkLabel}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
