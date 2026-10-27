import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import ScrollbarManager from "@/components/ScrollbarManager";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "700", "900"],
});

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
      className={`${playfair.variable} ${lato.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#FBF9F5] text-[#22332A] flex flex-col font-sans">
        <ScrollbarManager />
        {children}
      </body>
    </html>
  );
}
