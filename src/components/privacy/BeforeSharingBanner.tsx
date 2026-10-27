"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePrivacyPage } from "@/lib/privacyPage";
import { assetUrl } from "@/lib/home2";

export default function BeforeSharingBanner() {
  const { beforeSharing, relatedLinks } = usePrivacyPage();
  if (!beforeSharing && !relatedLinks) return null;

  return (
    <section className="w-full bg-[#FAF8F3] pb-12 sm:pb-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Main Banner Image */}
        {beforeSharing && beforeSharing.image && (
          <div className="w-full">
            <img
              src={assetUrl(beforeSharing.image)}
              alt={beforeSharing.imageAlt}
              className="w-full h-auto object-contain"
            />
          </div>
        )}

        {/* RELATED LINKS Row */}
        {relatedLinks && relatedLinks.items.length > 0 && (
          <div className="mt-8 flex items-center justify-between border-t border-[#E8E2D4] pt-5">
            <span className="text-[11.5px] font-bold tracking-[1.5px] uppercase text-[#A58351]">
              {relatedLinks.label}
            </span>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {relatedLinks.items.map((link, index) => (
                <Link
                  key={index}
                  href={link.link}
                  className="group inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[#123E30] transition-colors hover:text-[#0D3226]"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
