"use client";

import React from "react";
import { Image as ImageIcon } from "lucide-react";

interface ImagePlaceholderProps {
  label: string;
  subLabel?: string;
  aspectRatio?: string; // e.g. "aspect-[16/10]", "aspect-[4/3]", "aspect-[16/9]"
  className?: string;
  src?: string;
  alt?: string;
}

export default function ImagePlaceholder({
  label,
  subLabel,
  aspectRatio = "aspect-[16/10]",
  className = "",
  src,
  alt = "Image container",
}: ImagePlaceholderProps) {
  if (src) {
    return (
      <div
        className={`relative overflow-hidden rounded-xl bg-[#EBE7DF] ${aspectRatio} ${className}`}
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div
      className={`group relative flex flex-col items-center justify-center overflow-hidden rounded-xl border border-[#DCD6C9] bg-gradient-to-br from-[#F5F2EA] via-[#EDE8DE] to-[#E5E0D5] p-6 transition-all duration-300 hover:border-[#BCAE98] hover:shadow-md ${aspectRatio} ${className}`}
      aria-label={`Image placeholder for: ${label}`}
    >
      {/* Subtle organic background pattern / leaf motif */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(#12392C_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Center placeholder badge */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <div className="mb-2.5 flex h-11 w-11 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
          <ImageIcon className="h-5 w-5 text-[#3D5649]" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#3D5649]">
          Image Container
        </span>
        <span className="mt-1 max-w-[240px] text-xs font-medium text-[#6C786E] line-clamp-2">
          {label}
        </span>
        {subLabel && (
          <span className="mt-0.5 text-[10px] text-[#8C988E]">
            {subLabel}
          </span>
        )}
      </div>

      {/* Corner badge indicating container */}
      <div className="absolute bottom-2 right-2 rounded bg-white/70 px-1.5 py-0.5 text-[9px] font-medium text-[#7C877E] backdrop-blur-sm">
        Placeholder
      </div>
    </div>
  );
}
