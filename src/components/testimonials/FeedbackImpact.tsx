"use client";

import React from "react";
import { useTestimonialsPage } from "@/lib/testimonialsPage";
import { assetUrl } from "@/lib/home2";
import CmsImage from "@/components/CmsImage";

export default function FeedbackImpact() {
  const { feedbackImpact } = useTestimonialsPage();
  if (!feedbackImpact || !feedbackImpact.image) return null;

  return (
    <section className="w-full bg-[#FAF8F3] border-b border-[#ECE6DB]">
      <div className="w-full">
        <CmsImage
          width={1600}
          height={253}
          sizes="100vw"
          src={assetUrl(feedbackImpact.image)}
          alt={feedbackImpact.imageAlt}
          className="w-full h-auto block"
        />
      </div>
    </section>
  );
}
