import CareersHero from "@/components/careers/CareersHero";
import ExploreOpportunities from "@/components/careers/ExploreOpportunities";
import WhyWorkWithUs from "@/components/careers/WhyWorkWithUs";
import LifeAtVaidhyashala from "@/components/careers/LifeAtVaidhyashala";
import ShareProfileBanner from "@/components/careers/ShareProfileBanner";
import { CareersProvider } from "@/lib/content/careers";

export default function CareersPage() {
  return (
    <div className="flex flex-1 flex-col bg-[#FAF7F0] text-[#22332A]">
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
    </div>
  );
}
