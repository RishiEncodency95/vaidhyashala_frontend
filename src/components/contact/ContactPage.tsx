import ContactHero from "@/components/contact/ContactHero";
import ContactMethods from "@/components/contact/ContactMethods";
import EnquiryAndVisit from "@/components/contact/EnquiryAndVisit";
import LocationAndClinic from "@/components/contact/LocationAndClinic";
import ContactFaq from "@/components/contact/ContactFaq";
import ContactCTA from "@/components/contact/ContactCTA";
import { ContactProvider } from "@/lib/content/contact";

export default function ContactPage() {
  return (
    <div className="flex flex-1 flex-col bg-[#FBF9F5] text-[#22332A]">
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
    </div>
  );
}
