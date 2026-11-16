import { Suspense } from "react";
import ApplyPage from "@/components/careers/apply/ApplyPage";
import CareersPageFallback from "@/components/careers/CareersPageFallback";

// The page reads the candidate's details from the URL, so it renders in the browser
export default function Page() {
  return (
    <Suspense fallback={<CareersPageFallback />}>
      <ApplyPage />
    </Suspense>
  );
}
