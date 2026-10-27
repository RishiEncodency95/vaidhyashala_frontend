"use client";

import React from "react";
import AboutNavbar from "@/components/about/AboutNavbar";
import { AboutProvider } from "@/components/about/AboutProvider";
import AboutHero from "@/components/about/AboutHero";
import HolisticCare from "@/components/about/HolisticCare";
import AboutApproach from "@/components/about/AboutApproach";
import CoreServices from "@/components/about/CoreServices";
import DedicatedTeam from "@/components/about/DedicatedTeam";
import ClinicAtmosphere from "@/components/about/ClinicAtmosphere";
import ConsultationCTA from "@/components/ConsultationCTA";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FBF9F5] text-[#22332A]">
      {/* Top Navigation with About marked active */}
      <AboutNavbar />

      {/* Main Content — text and images come from Admin → Pages & CMS → About Us */}
      <AboutProvider>
        <main className="flex-1">
          <AboutHero />
          <HolisticCare />
          <AboutApproach />
          <CoreServices />
          <DedicatedTeam />
          <ClinicAtmosphere />

          {/* Pre-Footer Banner: Same ConsultationCTA as Health Journal page */}
          <ConsultationCTA />
        </main>
      </AboutProvider>

      {/* Footer (exact same footer as home page and all pages) */}
      <Footer />
    </div>
  );
}
