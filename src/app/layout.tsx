import type { Metadata } from "next";
import { poppins } from "@/lib/fonts";
import ScrollbarManager from "@/components/layout/ScrollbarManager";
import ContentPrefetch from "@/components/layout/ContentPrefetch";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vaidhyashala | Ayurvedic Clinic & Panchakarma Centre",
  description:
    "Rooted in Ayurveda. Dedicated to your care. Authentic Ayurvedic consultations, traditional Panchakarma therapies, and herbal wellness care at Vaidhyashala.",
  keywords: [
    "Ayurveda",
    "Panchakarma",
    "Vaidhyashala",
    "Holistic Health",
    "Ayurvedic Clinic",
    "Yoga & Lifestyle",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#FBF9F5] text-[#22332A] flex flex-col font-sans">
        <ScrollbarManager />
        <ContentPrefetch />
        {/* Website pages add the navbar/footer in app/(site)/layout.tsx */}
        {children}
      </body>
    </html>
  );
}
