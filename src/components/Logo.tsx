import React from "react";

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
      <img
        src="/lo.webp"
        alt="Vaidhyashala - Ayurvedic Clinic & Panchakarma Centre"
        className="h-[60px] sm:h-[68px] w-auto object-contain mix-blend-multiply"
      />
    </div>
  );
}
