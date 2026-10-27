import React from "react";
import Image from "next/image";
import { Briefcase } from "lucide-react";

export default function CurrentOpenings() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FAF7F0] py-16 sm:py-20 lg:py-24 border-b border-[#ECE6DB]">
      {/* Decorative leaf branch on left */}
      <div className="pointer-events-none absolute -left-8 sm:-left-4 top-1/2 -translate-y-1/2 h-[340px] w-28 sm:w-36 lg:w-44 select-none opacity-85 mix-blend-multiply">
        <Image
          src="/career/07_botanical_leaf_branch.webp"
          alt=""
          aria-hidden="true"
          fill
          className="object-contain object-left"
        />
      </div>

      {/* Decorative leaf branch on right */}
      <div className="pointer-events-none absolute -right-8 sm:-right-4 top-1/2 -translate-y-1/2 h-[340px] w-28 sm:w-36 lg:w-44 select-none opacity-85 mix-blend-multiply">
        <Image
          src="/career/08_botanical_sprig.webp"
          alt=""
          aria-hidden="true"
          fill
          className="object-contain object-right"
        />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 z-10">
        {/* Top Header Row with Title on Left and Quote on Right */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6">
          <div className="max-w-xl">
            <span className="text-[12.5px] sm:text-[13px] font-bold uppercase tracking-[0.22em] text-[#607366]">
              Current Openings
            </span>
            <h2 className="mt-1 font-sans text-[36px] sm:text-[44px] font-medium leading-tight text-[#0D3226]">
              Join Our Team
            </h2>
            <p className="mt-2 text-[15px] sm:text-[16px] font-medium leading-[1.65] text-[#4A5950]">
              We currently do not have any active openings. However, we are always looking for talented and passionate individuals to join our team.
            </p>
          </div>

          {/* Right Quote with Leaf Symbol */}
          <div className="flex items-center gap-3.5 self-start md:self-auto shrink-0 pt-2 md:pt-0">
            {/* Outline Botanical Leaf SVG */}
            <svg
              className="h-8 w-8 text-[#B89658] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
            <p className="font-sans italic text-[17.5px] sm:text-[19px] font-medium text-[#1C3B2F] leading-snug">
              “Together, we can create
              <br />
              a healthier, happier tomorrow.”
            </p>
          </div>
        </div>

        {/* Center Card: Empty State */}
        <div className="mt-8 sm:mt-12 mx-auto max-w-[760px] rounded-2xl border border-[#DDD5C5] bg-[#FAF8F3] px-6 py-12 sm:px-12 sm:py-16 text-center shadow-[0_6px_24px_rgba(0,0,0,0.03)]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#D5CDC0] bg-[#F2ECE0] text-[#0D3226]">
            <Briefcase className="h-6 w-6 stroke-[1.8]" />
          </div>

          <h3 className="mt-5 font-sans text-[23px] sm:text-[26px] font-medium text-[#0D3226]">
            No Open Positions at the Moment
          </h3>

          <p className="mt-2 text-[15px] sm:text-[15.5px] font-medium text-[#55675D] leading-relaxed max-w-md mx-auto">
            We appreciate your interest in being part of Vaidhyashala.
            <br />
            Please check back soon for new opportunities.
          </p>
        </div>
      </div>
    </section>
  );
}
