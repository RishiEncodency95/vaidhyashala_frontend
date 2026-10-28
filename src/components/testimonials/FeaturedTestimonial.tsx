"use client";

import React, { useEffect, useState } from "react";
import { useTestimonialsPage } from "@/lib/testimonialsPage";
import { assetUrl } from "@/lib/home2";
import { ApiTestimonial, fetchFeaturedTestimonial } from "@/lib/catalogApi";
import CmsImage from "@/components/CmsImage";

interface FeaturedTestimonialProps {
  imageSrc?: string;
}

export default function FeaturedTestimonial({ imageSrc }: FeaturedTestimonialProps) {
  const { featured } = useTestimonialsPage();
  const [live, setLive] = useState<ApiTestimonial | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    fetchFeaturedTestimonial(controller.signal).then((t) => {
      if (!controller.signal.aborted && t) setLive(t);
    });
    return () => controller.abort();
  }, []);
  if (!featured) return null;

  // The admin's featured card once it loads; the built-in one if there is none or the API cannot be reached
  const name = live?.name ?? "Anita S.";
  const category = live?.category ?? "Consultation";
  const quote = live?.quote ?? "The doctor listened carefully and explained the next steps clearly.";
  const photo =
    imageSrc || (live ? assetUrl(live.photo) : "") || "/testimonial/testimonial-woman-cream-outfit.webp";
  const showSample = live ? !!live.isSample : true;

  return (
    <section className="w-full bg-[#FAF8F3] py-4 sm:py-6 border-b border-[#ECE6DB]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-[#E8E2D6] bg-white p-5 sm:p-6 lg:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
            {/* Left: Patient Portrait Frame */}
            <div className="sm:col-span-5 lg:col-span-3">
              <div className="relative aspect-[4/3.7] sm:aspect-square w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-2xs">
                <CmsImage
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 42vw, 100vw"
                  src={photo}
                  alt={name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>

            {/* Middle: Badges, Headline, Quote and Patient Signature */}
            <div className="sm:col-span-7 lg:col-span-6 flex flex-col justify-center">
              {/* Badges - Title Case Rounded Pills */}
              <div className="flex items-center gap-2.5">
                {showSample && (
                  <span className="rounded-full px-3 py-0.5 text-[12px] font-medium text-[#7D5A2B] bg-[#F2E5D3]">
                    {featured.sampleLabel}
                  </span>
                )}
                <span className="rounded-full px-3 py-0.5 text-[12px] font-medium text-[#355F46] bg-[#E3EFE5]">
                  {category}
                </span>
              </div>

              {/* Title */}
              <h2 className="mt-3.5 font-serif text-[28px] sm:text-[32px] lg:text-[36px] font-normal sm:font-medium leading-[1.18] text-[#111A15]">
                {featured.heading}
              </h2>

              {/* Quote */}
              <p className="mt-2.5 text-[16px] sm:text-[17px] font-normal leading-[1.6] text-[#4A554E]">
                &ldquo;{quote}&rdquo;
              </p>

              {/* Author */}
              <p className="mt-2 text-[14.5px] sm:text-[15px] font-medium text-[#222E27]">
                &mdash; {name}
              </p>
            </div>

            {/* Right: Gold Quote Icon & Context Note */}
            <div className="col-span-12 lg:col-span-3 border-t lg:border-t-0 lg:border-l border-[#ECE4D8] pt-4 lg:pt-0 lg:pl-8 flex flex-col justify-center">
              {/* Decorative Gold Quotes */}
              <span className="font-serif text-[68px] sm:text-[78px] lg:text-[88px] font-normal leading-[0.7] text-[#DFC397] mb-3 select-none block">
                &ldquo;
              </span>

              <p className="text-[13.5px] sm:text-[14px] font-normal leading-[1.65] text-[#556059] max-w-[280px]">
                {featured.sideNote}
              </p>
            </div>
          </div>

          {/* Delicate Botanical Leaf Motif in the bottom-right corner */}
          {featured.decorativeImage && (
            <CmsImage
              width={300}
              height={150}
              src={assetUrl(featured.decorativeImage)}
              style={{ height: "auto" }}
              alt=""
              className="pointer-events-none absolute bottom-0 right-0 w-[220px] sm:w-[260px] lg:w-[300px] opacity-75 select-none z-0"
            />
          )}
        </div>
      </div>
    </section>
  );
}

