"use client";

import React from "react";
import Image from "next/image";
import { useCareersPage } from "@/lib/careersPage";
import { assetUrl } from "@/lib/home2";

export default function LifeAtVaidhyashala() {
  const { life } = useCareersPage();
  if (!life) return null;
  const gallery = life.items;
  const captionLines = life.lastCaption.split("\n").map((l) => l.trim()).filter(Boolean);

  return (
    <section className="w-full bg-[#FAF7F2] py-5 sm:py-6 lg:py-8 border-b border-[#ECE6DB]">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-12">
        {/* Header: Title Left, Description Right */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 lg:gap-6 mb-3 sm:mb-4">
          <div>
            <span className="text-[12.5px] sm:text-[13px] font-bold tracking-[1.5px] uppercase text-[#A58351]">
              {life.eyebrow}
            </span>
            <h2 className="mt-1 font-sans text-[26px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-medium leading-[1.14] text-[#0D3226] sm:whitespace-nowrap">
              {life.heading}
            </h2>
          </div>

          <div className="max-w-md lg:shrink-0">
            <p className="text-[14.5px] sm:text-[15px] font-medium leading-[1.6] text-[#4A5950]">
              {life.description}
            </p>
          </div>
        </div>

        {/* 5 Photo Gallery Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:gap-4">
          {gallery.map((item, index) => (
            item.image && (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl border border-[#E3DDCF] bg-[#FAF8F3] shadow-2xs aspect-[4/3] sm:aspect-[3/4] lg:aspect-[4/5] group"
            >
              <Image
                src={assetUrl(item.image)}
                alt={item.imageAlt}
                fill
                unoptimized
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            )
          ))}

          {/* Last card: wellness interior with the lettering on top */}
          {life.lastImage && (
            <div className="relative overflow-hidden rounded-xl border border-[#E3DDCF] bg-[#FAF8F3] shadow-2xs aspect-[4/3] sm:aspect-[3/4] lg:aspect-[4/5] col-span-2 sm:col-span-1 group">
              <Image
                src={assetUrl(life.lastImage)}
                alt={life.lastImageAlt}
                fill
                unoptimized
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover object-[75%_center] transition-transform duration-500 group-hover:scale-105"
              />
              {captionLines.length > 0 && (
                <div className="absolute inset-0 bg-gradient-to-l from-[#FAF7F2]/85 via-[#FAF7F2]/35 to-transparent flex flex-col justify-center items-end pr-5 sm:pr-6 text-right pointer-events-none">
                  <p className="font-sans italic text-[19px] sm:text-[21px] font-medium leading-[1.2] text-[#0D3226]">
                    {captionLines.map((word, i) => (
                      <React.Fragment key={i}>
                        {i > 0 && <br />}
                        {word}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
