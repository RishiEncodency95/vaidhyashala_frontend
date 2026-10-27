"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useTreatments } from "./TreatmentsProvider";

interface FaqItem {
  question: string;
  answer: string;
}

export default function TreatmentsFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { faq } = useTreatments();
  if (!faq) return null;

  const faqs: FaqItem[] = faq.items;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="w-full bg-[#FAF8F3] pt-2.5 sm:pt-3 pb-2.5 sm:pb-3 border-b border-[#ECE6DB]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Left Column: Heading and Description */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-start">
            <span className="text-[11.5px] sm:text-[12px] font-bold tracking-[1.5px] uppercase text-[#A58351]">
              {faq.eyebrow}
            </span>
            <h2 className="mt-1.5 font-serif text-[28px] sm:text-[32px] md:text-[36px] lg:text-[38px] font-medium leading-[1.14] text-[#0D3226] whitespace-nowrap">
              {faq.heading}
            </h2>
            <p className="mt-2 text-[14.5px] sm:text-[15px] font-medium leading-[1.6] text-[#4A5950] max-w-md">
              {faq.description}
            </p>
          </div>

          {/* Right Column: Accordion Items */}
          <div className="lg:col-span-6 xl:col-span-6 divide-y divide-[#E2DCCE] border-t border-b border-[#E2DCCE]">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="py-3.5 sm:py-4">
                  <button
                    onClick={() => toggle(idx)}
                    className="flex w-full items-center justify-between gap-4 text-left cursor-pointer transition-colors hover:text-[#0D3226]"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[15px] sm:text-[16px] font-medium text-[#0D3226] leading-snug">
                      {faq.question}
                    </span>
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#EFEAE0] text-[#0D3226] transition-transform">
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mt-2.5 pr-8 text-[13.5px] sm:text-[14px] font-medium leading-[1.6] text-[#4A5950] animate-fadeIn">
                      <p>{faq.answer}</p>
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
