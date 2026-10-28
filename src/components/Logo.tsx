import React from "react";
import Image from "next/image";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
  stacked?: boolean;
}

export default function Logo({
  className = "",
}: LogoProps) {
  return (
    <div className={`flex items-center select-none ${className}`}>
      {/* Shown at most 292x68: next/image sends a copy that size (and 2x for sharp screens), not the 1600px file */}
      <Image
        src="/lo.webp"
        alt="Vaidhyashala - Ayurvedic Clinic & Panchakarma Centre"
        width={292}
        height={68}
        loading="eager"
        className="h-[60px] sm:h-[68px] w-auto object-contain mix-blend-multiply"
      />
    </div>
  );
}
