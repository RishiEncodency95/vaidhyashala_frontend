"use client";

import React from "react";
import { usePrivacyPage } from "@/lib/privacyPage";
import { assetUrl } from "@/lib/home2";
import CmsImage from "@/components/CmsImage";

export default function PrivacyCards() {
  const { summaryCards } = usePrivacyPage();
  if (!summaryCards || !summaryCards.image) return null;

  return (
    <section className="w-full bg-[#FAF8F3] pt-6 sm:pt-8 pb-4">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          <CmsImage
            width={1600}
            height={248}
            sizes="(min-width: 1400px) 1360px, 100vw"
            src={assetUrl(summaryCards.image)}
            alt={summaryCards.imageAlt}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
