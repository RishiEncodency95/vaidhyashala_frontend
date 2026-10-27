"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import ContactHero from "@/components/contact/ContactHero";
import ContactMethods from "@/components/contact/ContactMethods";
import EnquiryAndVisit from "@/components/contact/EnquiryAndVisit";
import LocationAndClinic from "@/components/contact/LocationAndClinic";
import ContactFaq from "@/components/contact/ContactFaq";
import ContactCTA from "@/components/contact/ContactCTA";
import { ContactProvider } from "@/lib/contactPage";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FBF9F5] text-[#22332A]">
      {/* 1. Header / Navbar with Contact marked active */}
      <Navbar />

      <ContactProvider>
      <main className="flex-1">
        {/* 2. Hero: Let's begin with a conversation. */}
        <ContactHero />

        {/* 3. Get in Touch: How can we help you? (4 Contact Cards) */}
        <ContactMethods />

        {/* 4. Send us an enquiry + Plan your visit */}
        <EnquiryAndVisit />

        {/* 5. Location Map + Welcoming space lounge */}
        <LocationAndClinic />

        {/* 6. FAQs: Common questions. */}
        <ContactFaq />

        {/* 7. Pre-Footer Banner: Ready to plan your first visit? */}
        <ContactCTA />
      </main>
      </ContactProvider>

      {/* 8. Global Shared Footer */}
      <Footer />
    </div>
  );
}
