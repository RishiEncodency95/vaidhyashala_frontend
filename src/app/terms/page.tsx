import React from "react";
import type { Metadata } from "next";
import { JsonLd, withSeo } from "@/lib/seoServer";
import TermsNavbar from "@/components/terms/TermsNavbar";
import TermsHero from "@/components/terms/TermsHero";
import TermsCards from "@/components/terms/TermsCards";
import TermsSections from "@/components/terms/TermsSections";
import BeforeSubmittingBanner from "@/components/terms/BeforeSubmittingBanner";
import { TermsProvider } from "@/lib/termsPage";
import Footer from "@/components/Footer";

const fallbackMetadata: Metadata = {
  title: "Terms of Use | The Vaidhyashala",
  description:
    "Guidelines for using the website and requesting clinic assistance. Read our draft terms of use for Vaidhyashala website, consultations, therapies and product information.",
};

export async function generateMetadata(): Promise<Metadata> {
  return withSeo(fallbackMetadata, "pages/terms");
}

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FBF9F5] text-[#22332A]">
      <JsonLd endpoint="pages/terms" />
      {/* Top Navigation */}
      <TermsNavbar />

      {/* Main Content */}
      <TermsProvider>
      <main className="flex-1">
        {/* 1. Header with document icon, title, subtitle, draft metadata & hero image container */}
        <TermsHero />

        {/* 2. Top 3 Cards: Website information, Appointment requests, Product catalogue */}
        <TermsCards />

        {/* 3. Sticky Contents Sidebar & 10 Policy Sections */}
        <TermsSections />

        {/* 4. Before submitting a request reminder & Related links */}
        <BeforeSubmittingBanner />
      </main>
      </TermsProvider>

      {/* Official Vaidhyashala Footer */}
      <Footer />
    </div>
  );
}
