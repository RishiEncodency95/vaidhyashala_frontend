import { Suspense } from "react";
import CompleteApplicationPage from "@/components/careers/complete-application/CompleteApplicationPage";
import CareersPageFallback from "@/components/careers/CareersPageFallback";

// The page reads the candidate's details from the URL, so it renders in the browser
export default function Page() {
  return (
    <Suspense fallback={<CareersPageFallback />}>
      <CompleteApplicationPage />
    </Suspense>
  );
}
