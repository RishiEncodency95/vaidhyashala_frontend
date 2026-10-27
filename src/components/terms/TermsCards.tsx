"use client";

import React from "react";
import { useTermsPage } from "@/lib/termsPage";
import { assetUrl } from "@/lib/home2";

export default function TermsCards() {
  const { summaryCards } = useTermsPage();
  if (!summaryCards || !summaryCards.image) return null;

  return (
    <section className="w-full bg-[#FAF8F3] pt-6 sm:pt-8 pb-4">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          <img
            src={assetUrl(summaryCards.image)}
            alt={summaryCards.imageAlt}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
