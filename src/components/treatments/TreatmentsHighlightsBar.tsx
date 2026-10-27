"use client";

import React from "react";
import Link from "next/link";
import { useTreatments } from "./TreatmentsProvider";

export default function TreatmentsHighlightsBar() {
  const { highlights } = useTreatments();
  if (!highlights || highlights.items.length === 0) return null;

  const itemClass = "text-[13px] sm:text-[14px] font-medium tracking-wide text-[#E3EDE8] py-1 px-2";

  return (
    <section className="w-full bg-[#0A3527] text-[#E0ECE5] py-3 sm:py-3.5 border-y border-[#144837]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 divide-x divide-[#184F3D] sm:grid-cols-4 items-center justify-between text-center">
          {highlights.items.map((item, idx) =>
            item.link ? (
              <Link key={idx} href={item.link} className={`${itemClass} hover:text-white`}>
                {item.label}
              </Link>
            ) : (
              <div key={idx} className={itemClass}>
                {item.label}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
