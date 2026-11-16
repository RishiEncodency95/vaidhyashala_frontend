import TermsHero from "@/components/terms/TermsHero";
import TermsCards from "@/components/terms/TermsCards";
import TermsSections from "@/components/terms/TermsSections";
import BeforeSubmittingBanner from "@/components/terms/BeforeSubmittingBanner";
import { TermsProvider } from "@/lib/content/terms";

export default function TermsPage() {
  return (
    <div className="flex flex-1 flex-col bg-[#FBF9F5] text-[#22332A]">
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
    </div>
  );
}
