import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function TreatmentsCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0B3728] py-4 sm:py-5 text-white">
      {/* Decorative leaf motif on left */}
      <img
        src="/cont.webp"
        alt="Decorative botanical illustration"
        className="pointer-events-none absolute -bottom-8 -left-8 w-[240px] sm:w-[300px] opacity-15 select-none filter invert"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Left Text */}
          <div className="max-w-xl">
            <span className="text-[11px] sm:text-[11.5px] font-bold tracking-[1.4px] uppercase text-[#D2BA85]">
              Still have questions?
            </span>
            <h2 className="mt-1 font-serif text-[28px] sm:text-[32px] lg:text-[36px] font-medium text-white leading-tight">
              Not sure where to begin?
            </h2>
            <p className="mt-1 text-[14.5px] sm:text-[15px] font-medium text-[#D2E2D9]">
              Start with a consultation.
            </p>
          </div>

          {/* Right Action Button */}
          <div className="flex-shrink-0">
            <Link
              href="/#consultation"
              className="group inline-flex items-center gap-2.5 rounded-md border border-[#3A6B59] bg-[#0E4231] px-6 sm:px-7 py-3 text-[14px] font-semibold text-white shadow-xs transition-all hover:bg-[#165540] hover:border-[#4B8570]"
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
