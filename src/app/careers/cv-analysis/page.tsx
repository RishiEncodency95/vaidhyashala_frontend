"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CVAnalysisView from "@/components/careers/CVAnalysisView";

function CVAnalysisContent() {
  const searchParams = useSearchParams();
  const roleTitle = searchParams.get("role") || "Ayurvedic Doctor";
  const fileName = searchParams.get("fileName") || "Vijay_Sharma_CV.pdf";
  const fileSize = searchParams.get("fileSize") || "2.4 MB";
  const location = searchParams.get("location") || "Delhi NCR";
  const employmentType = searchParams.get("type") || "Full Time";
  const qualification = searchParams.get("qualification") || "BAMS / MD (Ayurveda)";

  return (
    <CVAnalysisView
      fileName={fileName}
      fileSize={fileSize}
      roleTitle={roleTitle}
      location={location}
      employmentType={employmentType}
      qualification={qualification}
    />
  );
}

export default function CVAnalysisPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2]" />}>
      <CVAnalysisContent />
    </Suspense>
  );
}
