import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0D3226] py-8 sm:py-10 lg:py-12 text-white">
      {/* Decorative botanical element on the right */}
      <img
        src="/cont.webp"
        alt="Decorative leaf motif"
        className="pointer-events-none absolute -bottom-10 -right-10 w-[300px] sm:w-[380px] opacity-15 select-none filter invert"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Left Text */}
          <div className="max-w-2xl">
            <h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[38px] font-medium text-white leading-tight">
              Begin with a conversation.
            </h2>
            <p className="mt-2 text-[15px] sm:text-[16px] font-medium leading-relaxed text-[#D2E2D9]">
              Book a consultation to discuss your health concerns and explore how
              Ayurvedic care can support your well-being.
            </p>
          </div>

          {/* Right Action Button */}
          <div className="flex-shrink-0">
            <Link
              href="/#consultation"
              className="group inline-flex items-center gap-2.5 rounded-md bg-white px-6 sm:px-7 py-3 sm:py-3.5 text-[14.5px] font-semibold text-[#0D3226] shadow-xs transition-all hover:bg-[#F4EFE6]"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
