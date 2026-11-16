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
      {/* The file's own size, so its shape always matches; `sizes` makes production send a ~292px copy, not 1600px */}
      <Image
        src="/lo.webp"
        style={{ width: "auto" }}
        alt="Vaidhyashala - Ayurvedic Clinic & Panchakarma Centre"
        width={1600}
        height={373}
        sizes="(min-width: 640px) 292px, 258px"
        loading="eager"
        className="h-[60px] sm:h-[68px] w-auto object-contain mix-blend-multiply"
      />
    </div>
  );
}
