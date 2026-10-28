"use client";

import React from "react";
import { useContactPage } from "@/lib/contactPage";
import { assetUrl } from "@/lib/home2";
import CmsImage from "@/components/CmsImage";

export default function LocationAndClinic() {
  const { location } = useContactPage();
  if (!location) return null;

  return (
    <section id="location" className="w-full bg-[#FAF8F3] py-4 sm:py-5 lg:py-6 border-b border-[#ECE6DB]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 xl:gap-10 items-stretch">
          {/* Left Column: Find our clinic & Map */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <span className="text-[11.5px] sm:text-[12px] font-bold tracking-[1.5px] uppercase text-[#A58351]">
                {location.eyebrow}
              </span>
              <h2 className="mt-1 font-serif text-[28px] sm:text-[32px] lg:text-[36px] font-medium leading-[1.14] text-[#0D3226]">
                {location.heading}
              </h2>
              <p className="mt-1 text-[13.5px] sm:text-[14px] font-medium text-[#5A6860]">
                {location.description}
              </p>
            </div>

            {/* Map: a live embed when one is set, otherwise the map picture */}
            <div className="mt-3.5 flex-1 flex flex-col justify-center">
              <div className="relative overflow-hidden rounded-xl border border-[#DFD8CC] bg-[#FAF8F3] shadow-2xs">
                {/^https:\/\//.test(location.mapEmbedUrl) ? (
                  <iframe
                    src={location.mapEmbedUrl}
                    title={location.mapImageAlt || "Clinic location map"}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block h-[320px] w-full border-0"
                  />
                ) : (
                  location.mapImage && (
                    <CmsImage
                      width={1697}
                      height={801}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      src={assetUrl(location.mapImage)}
                      alt={location.mapImageAlt}
                      className="w-full h-auto object-cover object-center block"
                    />
                  )
                )}
              </div>

              {/* Map Caption */}
              <p className="mt-1.5 text-[12px] font-medium text-[#7A887E]">
                {location.mapNote}
                {location.directionsUrl && (
                  <>
                    {" "}
                    <a
                      href={location.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#0D3226] underline underline-offset-2"
                    >
                      Get directions
                    </a>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Right Column: Lounge Photo & Welcoming space overlay */}
          <div className="lg:col-span-6 flex flex-col justify-end">
            <div className="relative overflow-hidden rounded-xl border border-[#E3DDCF] bg-[#FAF8F3] shadow-xs min-h-[320px] sm:min-h-[360px] lg:min-h-full flex items-end">
              {location.clinicImage && (
                <CmsImage
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  src={assetUrl(location.clinicImage)}
                  alt={location.clinicImageAlt}
                  className="h-full w-full object-cover object-center"
                />
              )}

              {/* White Overlay Card at bottom of photo */}
              <div className="relative z-10 m-3.5 sm:m-4 rounded-xl border border-[#E3DDCF]/80 bg-white/95 backdrop-blur-md p-4 shadow-xs max-w-lg">
                <h3 className="font-serif text-[18px] sm:text-[20px] font-medium leading-tight text-[#0D3226]">
                  {location.clinicHeading}
                </h3>
                <p className="mt-1 text-[12px] sm:text-[12.5px] font-medium leading-[1.5] text-[#5A6860]">
                  {location.clinicDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
