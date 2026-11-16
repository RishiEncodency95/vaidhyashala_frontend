import { Suspense } from "react";
import ReviewDetailsPage from "@/components/careers/review-details/ReviewDetailsPage";
import CareersPageFallback from "@/components/careers/CareersPageFallback";

// The page reads the candidate's details from the URL, so it renders in the browser
export default function Page() {
  return (
    <Suspense fallback={<CareersPageFallback />}>
      <ReviewDetailsPage />
    </Suspense>
  );
}
