import { TreatmentsProvider } from "@/components/treatments/TreatmentsProvider";
import TreatmentsHero from "@/components/treatments/TreatmentsHero";
import TreatmentsHighlightsBar from "@/components/treatments/TreatmentsHighlightsBar";
import ExploreCareServices from "@/components/treatments/ExploreCareServices";
import HealthConcerns from "@/components/treatments/HealthConcerns";
import TreatmentsApproach from "@/components/treatments/TreatmentsApproach";
import ConsultationPreparation from "@/components/treatments/ConsultationPreparation";
import TreatmentsFaq from "@/components/treatments/TreatmentsFaq";
import ConsultationCTA from "@/components/common/ConsultationCTA";

export default function TreatmentsPage() {
  return (
    <div className="flex flex-1 flex-col bg-[#FBF9F5] text-[#22332A]">
      {/* Main Content — text and images come from Admin → Pages & CMS → Treatments */}
      <TreatmentsProvider>
        <main className="flex-1">
          <TreatmentsHero />
          <TreatmentsHighlightsBar />
          <ExploreCareServices />
          <HealthConcerns />
          <TreatmentsApproach />
          <ConsultationPreparation />
          <TreatmentsFaq />

          {/* Pre-Footer Banner: Same ConsultationCTA as Health Journal page */}
          <ConsultationCTA />
        </main>
      </TreatmentsProvider>
    </div>
  );
}
