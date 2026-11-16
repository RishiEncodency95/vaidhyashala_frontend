import PanchakarmaHero from "@/components/panchakarma/PanchakarmaHero";
import UnderstandingPanchakarma from "@/components/panchakarma/UnderstandingPanchakarma";
import FiveClassicalProcedures from "@/components/panchakarma/FiveClassicalProcedures";
import SupportingTherapies from "@/components/panchakarma/SupportingTherapies";
import TherapyPlanConversation from "@/components/panchakarma/TherapyPlanConversation";
import RequestConsultationForm from "@/components/panchakarma/RequestConsultationForm";
import PanchakarmaFaq from "@/components/panchakarma/PanchakarmaFaq";
import PanchakarmaCTA from "@/components/panchakarma/PanchakarmaCTA";
import { PanchakarmaProvider } from "@/lib/content/panchakarma";

export default function PanchakarmaPage() {
  return (
    <div className="flex flex-1 flex-col bg-[#FBF9F5] text-[#22332A]">
      <PanchakarmaProvider>
        <main className="flex-1">
          {/* 2. Hero Section: Traditional therapies. Personalised care. */}
          <PanchakarmaHero />

          {/* 3. Understanding Panchakarma: 3 Steps (Preparation, Selected procedures, Aftercare) */}
          <UnderstandingPanchakarma />

          {/* 4. The Five Classical Procedures: Vamana, Virechana, Basti, Nasya, Raktamokshana */}
          <FiveClassicalProcedures />

          {/* 5. Explore Supporting Ayurvedic Therapies: 3x3 Grid of 9 Therapies */}
          <SupportingTherapies />

          {/* 6. Your therapy plan starts with a conversation (Doctor Photo + Checklist) */}
          <TherapyPlanConversation />

          {/* 7. Request a Consultation (Quick Form Strip) */}
          <RequestConsultationForm />

          {/* 8. FAQs (Before your therapies) */}
          <PanchakarmaFaq />

          {/* 9. Pre-Footer Banner: Let us plan your care thoughtfully. */}
          <PanchakarmaCTA />
        </main>
      </PanchakarmaProvider>
    </div>
  );
}
