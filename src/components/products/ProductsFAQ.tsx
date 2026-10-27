"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Minus, Leaf, ArrowRight } from "lucide-react";
import { useProductsPage } from "@/lib/productsPage";


export default function ProductsFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { faq, cta } = useProductsPage();
  const faqs = faq?.items ?? [];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#FAF8F3] py-6 sm:py-8">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* FAQs Top Grid */}
        {faq && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 pb-6 sm:pb-8">
          {/* Left Column: Heading */}
          <div className="lg:col-span-5">
            <span className="text-[11.5px] sm:text-[12px] font-bold tracking-[1.5px] uppercase text-[#A58351]">
              {faq?.eyebrow}
            </span>
            <h2 className="mt-1.5 font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-medium leading-[1.14] text-[#0D3226]">
              {faq?.headingLine1}
              <br />
              {faq?.headingLine2}
            </h2>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7 divide-y divide-[#ECE5D8] border-y border-[#ECE5D8]">
            {faqs.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="py-3.5 sm:py-4">
                  <button
                    onClick={() => toggle(index)}
                    className="flex w-full items-center justify-between text-left text-[16px] sm:text-[17px] font-medium text-[#0D3226] transition-colors hover:text-[#184838]"
                  >
                    <span>{item.question}</span>
                    <span className="ml-4 flex h-6 w-6 flex-shrink-0 items-center justify-center text-[#7A8880]">
                      {isOpen ? (
                        <Minus className="h-4.5 w-4.5 stroke-[2]" />
                      ) : (
                        <Plus className="h-4.5 w-4.5 stroke-[2]" />
                      )}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="mt-2 text-[14px] sm:text-[14.5px] font-medium leading-[1.6] text-[#4A5950] pr-8">
                      {item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        )}

        {/* Bottom Card: "{cta.heading}" */}
        {cta && (
        <div className="rounded-xl border border-[#ECE5D8] bg-[#F7F4EC] p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-[#D5CDC0] bg-[#E8E0D0] text-[#052119]">
              <Leaf className="h-5.5 w-5.5 stroke-[2.2] text-[#052119]" />
            </div>
            <div>
              <h3 className="font-serif text-[18px] sm:text-[20px] font-medium text-[#0D3226] leading-tight">
                {cta.heading}
              </h3>
              <p className="mt-1 text-[13.5px] sm:text-[14px] font-medium text-[#4A5950]">
                {cta.subtitle}
              </p>
            </div>
          </div>

          <div className="flex-shrink-0">
            <Link
              href={cta.buttonLink || "/contact"}
              className="group inline-flex items-center gap-2 rounded-md bg-[#0A3527] px-6 py-2.5 text-[14px] font-semibold text-white shadow-xs transition-all hover:bg-[#124534]"
            >
              <span>{cta.buttonLabel}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
        )}
      </div>
    </section>
  );
}
