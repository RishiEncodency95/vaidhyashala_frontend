"use client";

import React from "react";
import { useHome2 } from "@/components/home/Home2Provider";

export default function HighlightsBar() {
  const { highlights } = useHome2();
  if (!highlights || highlights.items.length === 0) return null;

  return (
    <section className="w-full bg-[#0D3226] text-[#E0ECE5] py-3.5 sm:py-4 border-y border-[#184838]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-y-3 sm:grid-cols-4 sm:gap-4 items-center justify-between text-center">
          {highlights.items.map((item, idx) => (
            <div
              key={idx}
              className="text-[13px] sm:text-[14px] font-medium tracking-wide text-[#E3EDE8]"
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
