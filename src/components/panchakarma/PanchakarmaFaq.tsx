"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { usePanchakarma } from "@/lib/panchakarmaPage";

export default function PanchakarmaFaq() {
  // First item open by default as shown in the reference image
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const { faq } = usePanchakarma();
  if (!faq) return null;
  const faqs = faq.items;

  return (
    <section className="w-full bg-[#FAF7F2] pt-2.5 sm:pt-3 pb-4 sm:pb-5 border-b border-[#ECE6DB]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Heading and Subtitle */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            <h2 className="font-serif text-[34px] sm:text-[40px] font-medium leading-[1.12] text-[#0D3226]">
              {faq.heading}
            </h2>
            <p className="mt-2 text-[14px] sm:text-[14.5px] font-medium leading-[1.6] text-[#55675D] max-w-sm">
              {faq.description}
            </p>
          </div>

          {/* Right Column: Accordion Items */}
          <div className="lg:col-span-8 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className="rounded-xl border border-[#E3DDCF] bg-white transition-all overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between px-5 sm:px-6 py-4 text-left transition-colors hover:bg-[#FAF8F3]"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-[16.5px] sm:text-[17.5px] font-medium text-[#0D3226] pr-4">
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 text-[#0D3226]">
                      {isOpen ? (
                        <Minus className="h-4.5 w-4.5 stroke-[2]" />
                      ) : (
                        <Plus className="h-4.5 w-4.5 stroke-[2]" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-4.5 pt-0 border-t border-[#F0EBE0]">
                      <p className="text-[13.5px] sm:text-[14px] font-medium leading-[1.65] text-[#4A5950] pt-3">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
