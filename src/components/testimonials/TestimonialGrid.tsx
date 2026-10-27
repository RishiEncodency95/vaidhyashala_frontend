"use client";

import React, { useState, useMemo } from "react";
import { ArrowDown } from "lucide-react";
import { useTestimonialsPage } from "@/lib/testimonialsPage";

interface TestimonialItem {
  id: string;
  name: string;
  category: "Consultation" | "Panchakarma" | "Yoga & Lifestyle" | "Products";
  quote: string;
  avatarSrc?: string;
}

const testimonialsData: TestimonialItem[] = [
  {
    id: "t1",
    name: "Anita S.",
    category: "Consultation",
    quote: "“The doctor listened carefully and explained the next steps clearly.”",
    avatarSrc: "/testimonial/testimonial-woman-cream-outfit.webp",
  },
  {
    id: "t2",
    name: "Rajesh K.",
    category: "Panchakarma",
    quote: "“The team explained the session and checked that I was comfortable.”",
    avatarSrc: "/testimonial/testimonial-mature-man-portrait.webp",
  },
  {
    id: "t3",
    name: "Meera P.",
    category: "Yoga & Lifestyle",
    quote: "“The guidance was practical and easy to discuss around my daily routine.”",
    avatarSrc: "/testimonial/testimonial-woman-portrait.webp",
  },
  {
    id: "t4",
    name: "Amit V.",
    category: "Products",
    quote: "“The team helped me understand the product label and available packs.”",
    avatarSrc: "/testimonial/testimonial-man-green-shirt.webp",
  },
  {
    id: "t5",
    name: "Neha R.",
    category: "Consultation",
    quote: "“The appointment coordination was clear, and the clinic felt welcoming.”",
    avatarSrc: "/testimonial/testimonial-woman-cream-outfit.webp",
  },
  {
    id: "t6",
    name: "Sanjay M.",
    category: "Panchakarma",
    quote: "“I appreciated the attention to preparation and follow-up instructions.”",
    avatarSrc: "/testimonial/testimonial-man-portrait.webp",
  },
];

interface TestimonialGridProps {
  avatars?: Record<string, string>;
}

export default function TestimonialGrid({ avatars }: TestimonialGridProps) {
  const { grid, categoryFilter } = useTestimonialsPage();
  const allLabel = categoryFilter?.allLabel || "All";
  const categories = [{ label: allLabel, value: "" }, ...(categoryFilter?.items ?? [])];
  // "" means "All", so the selection survives the label being changed in the admin
  const [selectedCategory, setSelectedCategory] = useState("");

  const filtered = useMemo(() => {
    if (selectedCategory === "") return testimonialsData;
    return testimonialsData.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  if (!grid) return null;

  return (
    <section className="w-full bg-[#FAF8F3] py-5 sm:py-6 lg:py-7 border-b border-[#ECE6DB]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Subtitle */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-[36px] sm:text-[42px] lg:text-[46px] font-semibold leading-[1.12] text-[#0A291F]">
            {grid.heading}
          </h2>
          <p className="mt-2 text-[16px] sm:text-[17.5px] font-semibold leading-[1.5] text-[#38483E]">
            {grid.description}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value || "all"}
                onClick={() => setSelectedCategory(cat.value)}
                className={`rounded-full px-4.5 py-1.5 sm:py-2 text-[14.5px] sm:text-[15px] transition-all ${
                  isActive
                    ? "bg-[#0A291F] text-white font-bold shadow-2xs"
                    : "border border-[#DFD7CB] bg-white text-[#4A5B52] font-semibold hover:border-[#0A291F] hover:text-[#0A291F]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 6 Testimonial Cards (3 cols x 2 rows) */}
        <div className="mt-5 sm:mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {filtered.map((item) => {
            const avatarSrc = avatars?.[item.id] || item.avatarSrc;
            return (
              <div
                key={item.id}
                className="flex items-start gap-4 sm:gap-5 rounded-xl border border-[#E6DFD1] bg-white p-5 sm:p-5.5 shadow-2xs"
              >
                {/* Circular Avatar Frame - Increased size */}
                <div className="relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-full border-2 border-[#D5CDC0] bg-[#EFE9DF] flex items-center justify-center shadow-xs">
                  {avatarSrc ? (
                    <img
                      src={avatarSrc}
                      alt={item.name}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-[13px] font-bold text-[#8C988F]">
                      Photo
                    </div>
                  )}
                </div>

                {/* Right Details */}
                <div className="flex-1 min-w-0">
                  {/* Badges */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="rounded px-2.5 py-0.5 text-[11.5px] font-extrabold uppercase tracking-wider bg-[#F3ECE1] text-[#8C7451]">
                      Sample
                    </span>
                    <span className="rounded px-2.5 py-0.5 text-[11.5px] font-extrabold uppercase tracking-wider bg-[#E8F0EA] text-[#2F5C45]">
                      {item.category}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="mt-1.5 font-serif text-[19px] sm:text-[20px] font-bold text-[#0A291F] leading-snug">
                    {item.name}
                  </h3>

                  {/* Quote */}
                  <p className="mt-1.5 text-[14.5px] sm:text-[15.5px] font-medium leading-[1.55] text-[#38483E]">
                    {item.quote}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        <div className="mt-5 sm:mt-6 flex justify-center">
          <button className="inline-flex items-center gap-2 rounded-md border border-[#D5CDBC] bg-[#FAF8F3] px-7 py-3 text-[15px] font-bold text-[#0A291F] transition-all hover:bg-[#F3ECE0]">
            <span>{grid.loadMoreLabel}</span>
            <ArrowDown className="h-4.5 w-4.5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}
