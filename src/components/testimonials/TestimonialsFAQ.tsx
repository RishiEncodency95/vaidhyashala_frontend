"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useTestimonialsPage } from "@/lib/testimonialsPage";

export default function TestimonialsFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { faq } = useTestimonialsPage();
  if (!faq) return null;
  const faqs = faq.items;

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#FAF8F3] py-5 sm:py-6 lg:py-7 border-b border-[#ECE6DB]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Left Column: Heading & Subtitle */}
          <div className="lg:col-span-5">
            <h2 className="font-serif text-[36px] sm:text-[42px] font-semibold leading-[1.12] text-[#0A291F]">
              {faq.headingLine1}
              <br />
              {faq.headingLine2}
            </h2>

            <p className="mt-2.5 text-[16px] sm:text-[17px] font-semibold leading-[1.5] text-[#3D4C42] max-w-sm">
              {faq.description}
            </p>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7 divide-y divide-[#ECE5D8] border-y border-[#ECE5D8]">
            {faqs.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="py-3 sm:py-3.5">
                  <button
                    onClick={() => toggle(index)}
                    className="flex w-full items-center justify-between text-left text-[17px] sm:text-[18px] font-bold text-[#0A291F] transition-colors hover:text-[#184838]"
                  >
                    <span>{item.question}</span>
                    <span className="ml-4 flex h-6 w-6 flex-shrink-0 items-center justify-center text-[#5D6B63]">
                      {isOpen ? (
                        <Minus className="h-4.5 w-4.5 stroke-[2.5]" />
                      ) : (
                        <Plus className="h-4.5 w-4.5 stroke-[2.5]" />
                      )}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="mt-2 text-[15px] sm:text-[16px] font-medium leading-[1.6] text-[#3D4C42] pr-8">
                      {item.answer}
                    </p>
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
