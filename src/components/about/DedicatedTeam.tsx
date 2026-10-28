"use client";

import React from "react";
import { useAbout } from "./AboutProvider";
import { assetUrl } from "@/lib/home2";
import CmsImage from "@/components/CmsImage";

export default function DedicatedTeam() {
  const { team } = useAbout();
  if (!team) return null;

  return (
    <section className="w-full bg-[#FAF7F2] pt-2.5 sm:pt-3 pb-2.5 sm:pb-3 border-b border-[#ECE6DB]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Left Column: Heading and Text */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-[11.5px] sm:text-[12px] font-bold tracking-[1.5px] uppercase text-[#A58351]">
              {team.eyebrow}
            </span>

            <h2 className="mt-1.5 font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-medium leading-[1.14] text-[#0D3226]">
              {team.headingLine1}
              <br />
              {team.headingLine2}
            </h2>

            <p className="mt-2.5 text-[14.5px] sm:text-[15px] font-medium leading-[1.65] text-[#4A5950] max-w-lg">
              {team.description}
            </p>
          </div>

          {/* Right Column: Clinical Team Photo */}
          <div className="lg:col-span-7">
            {team.image && (
              <div className="relative overflow-hidden rounded-xl border border-[#E3DDCF] bg-[#FAF8F3] shadow-xs">
                <CmsImage
                  width={1600}
                  height={800}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  src={assetUrl(team.image)}
                  alt={team.imageAlt}
                  className="w-full h-auto max-h-[460px] object-cover object-center"
                />
              </div>
            )}
            {team.imageNote && (
              <div className="mt-1.5 text-right text-[11px] italic text-[#8C988F]">{team.imageNote}</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
