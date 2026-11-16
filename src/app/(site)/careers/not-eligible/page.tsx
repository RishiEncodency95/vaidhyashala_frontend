import { Suspense } from "react";
import ScreeningResultPage from "@/components/careers/screening-result/ScreeningResultPage";
import CareersPageFallback from "@/components/careers/CareersPageFallback";

// The page reads the candidate's details from the URL, so it renders in the browser
export default function Page() {
  return (
    <Suspense fallback={<CareersPageFallback />}>
      <ScreeningResultPage verdict="NOT_ELIGIBLE" />
    </Suspense>
  );
}
