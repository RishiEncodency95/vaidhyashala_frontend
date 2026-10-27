import type { Metadata } from "next";
import CareersNavbar from "@/components/careers/CareersNavbar";
import CareersHero from "@/components/careers/CareersHero";
import ExploreOpportunities from "@/components/careers/ExploreOpportunities";
import WhyWorkWithUs from "@/components/careers/WhyWorkWithUs";
import LifeAtVaidhyashala from "@/components/careers/LifeAtVaidhyashala";
import ShareProfileBanner from "@/components/careers/ShareProfileBanner";
import { CareersProvider } from "@/lib/careersPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Careers | Vaidhyashala Ayurvedic Clinic",
  description:
    "Build a purposeful career in Ayurveda. Be a part of a dedicated team committed to authentic Ayurvedic care, holistic healing and healthier lives at Vaidhyashala.",
};

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7F0] text-[#22332A]">
      {/* 1. Header & Navigation */}
      <CareersNavbar />

      {/* Main Content */}
      <CareersProvider>
      <main className="flex-1">
        {/* 2. Hero Section: Build a Purposeful Career in Ayurveda */}
        <CareersHero />

        {/* 3. Current Openings: Explore Opportunities */}
        <ExploreOpportunities />

        {/* 4. Why Work With Vaidhyashala: A Meaningful Career, A Healthier Tomorrow */}
        <WhyWorkWithUs />

        {/* 5. Life at Vaidhyashala: Work in a Culture of Care and Learning */}
        <LifeAtVaidhyashala />

        {/* 6. Don't See the Right Role Banner */}
        <ShareProfileBanner />
      </main>
      </CareersProvider>

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}
