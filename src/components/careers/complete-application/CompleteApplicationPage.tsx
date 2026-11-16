"use client";

import { useSearchParams } from "next/navigation";
import CompleteApplicationForm from "@/components/careers/complete-application/CompleteApplicationForm";

export default function CompleteApplicationPage() {
  const searchParams = useSearchParams();
  return (
    <CompleteApplicationForm
      jobSlug={searchParams.get("job") || ""}
      candidateId={searchParams.get("candidate") || ""}
      analysisId={searchParams.get("analysis") || ""}
      cvPhoto={searchParams.get("photo") || ""}
      roleTitle={searchParams.get("role") || searchParams.get("jobTitle") || ""}
    />
  );
}
