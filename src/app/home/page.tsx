"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { Home2Provider } from "@/components/home/Home2Provider";
import HomeHero from "@/components/home/HomeHero";
import HighlightsBar from "@/components/home/HighlightsBar";
import CarePillars from "@/components/home/CarePillars";
import ApproachSection from "@/components/home/ApproachSection";
import ConcernCategories from "@/components/home/ConcernCategories";
import ProductsBanner from "@/components/home/ProductsBanner";
import AppointmentBooking from "@/components/home/AppointmentBooking";
import FaqSection from "@/components/home/FaqSection";
import ConsultationCTA from "@/components/ConsultationCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FBF9F5] text-[#22332A]">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        <Home2Provider>
        {/* 1. Hero Section: "Your care. Our Ayurvedic approach." */}
        <HomeHero />

        {/* 2. Green Highlights Strip: 4 Key Pillars */}
        <HighlightsBar />

        {/* 3. Care at Vaidhyashala: "Care that begins with understanding you." */}
        <CarePillars />

        {/* 4. Our Approach: "Traditional therapies. Personal attention." */}
        <ApproachSection />

        {/* 5. Explore Care by Concern: "Find support for what matters to you." */}
        <ConcernCategories />

        {/* 6. Authentic Products: "Ayurveda beyond your consultation." */}
        <ProductsBanner />

        {/* 7. Appointment Booking Strip: "Plan your first visit." */}
        <AppointmentBooking />

        {/* 8. FAQs: "Before your consultation." */}
        <FaqSection />

        {/* 9. Pre-Footer Banner: Same ConsultationCTA as Health Journal page */}
        <ConsultationCTA />
        </Home2Provider>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
