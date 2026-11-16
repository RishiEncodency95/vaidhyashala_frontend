import PrivacyHero from "@/components/privacy/PrivacyHero";
import PrivacyCards from "@/components/privacy/PrivacyCards";
import PrivacySections from "@/components/privacy/PrivacySections";
import BeforeSharingBanner from "@/components/privacy/BeforeSharingBanner";
import { PrivacyProvider } from "@/lib/content/privacy";

export default function PrivacyPage() {
  return (
    <div className="flex flex-1 flex-col bg-[#FBF9F5] text-[#22332A]">
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
    </div>
  );
}
