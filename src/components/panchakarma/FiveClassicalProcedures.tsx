"use client";

import React from "react";
import { usePanchakarma } from "@/lib/content/panchakarma";
import { assetUrl } from "@/lib/api";
import CmsImage from "@/components/common/CmsImage";

export default function FiveClassicalProcedures() {
  const { classicalProcedures } = usePanchakarma();
  if (!classicalProcedures || !classicalProcedures.image) return null;

  return (
    <section className="w-full bg-[#EDF2E6] pt-2.5 sm:pt-3 pb-2.5 sm:pb-3 border-b border-[#D8E3DA]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <CmsImage
          width={2172}
          height={724}
          sizes="(min-width: 1400px) 1360px, 100vw"
          src={assetUrl(classicalProcedures.image)}
          alt={classicalProcedures.imageAlt}
          className="w-full h-auto object-contain max-w-[1360px]"
        />
      </div>
    </section>
  );
}
