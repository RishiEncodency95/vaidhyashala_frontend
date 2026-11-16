import type { CSSProperties } from "react";
import { Lato } from "next/font/google";

// Same configuration as the root layout, so Next.js reuses the loaded font.
const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "700", "900"],
});

// Every careers page (listing, job details, apply, CV analysis, results,
// review, complete application, submitted) renders entirely in Lato.
export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="careers-lato flex flex-1 flex-col"
      style={{ "--careers-font": lato.style.fontFamily } as CSSProperties}
    >
      {children}
    </div>
  );
}
