import React from "react";
import type { Metadata } from "next";
import PrivacyNavbar from "@/components/privacy/PrivacyNavbar";
import PrivacyHero from "@/components/privacy/PrivacyHero";
import PrivacyCards from "@/components/privacy/PrivacyCards";
import PrivacySections from "@/components/privacy/PrivacySections";
import BeforeSharingBanner from "@/components/privacy/BeforeSharingBanner";
import { PrivacyProvider } from "@/lib/privacyPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | The Vaidhyashala",
  description:
    "How information shared through the Vaidhyashala website is handled. Read our draft privacy policy for appointments, enquiries, and healthcare services.",
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FBF9F5] text-[#22332A]">
      {/* Top Navigation */}
      <PrivacyNavbar />

      {/* Main Content */}
      <PrivacyProvider>
      <main className="flex-1">
        {/* 1. Header with title, shield badge, draft metadata, and hero image container */}
        <PrivacyHero />

        {/* 2. Top 3 Cards: Information you share, Why it is requested, Your choices */}
        <PrivacyCards />

        {/* 3. Sticky Contents Sidebar & 10 Policy Sections */}
        <PrivacySections />

        {/* 4. Before sharing information reminder & Related links */}
        <BeforeSharingBanner />
      </main>
      </PrivacyProvider>

      {/* Official Vaidhyashala Footer */}
      <Footer />
    </div>
  );
}
