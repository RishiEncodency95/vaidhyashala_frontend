"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AIPartialMatchResultView from "@/components/careers/AIPartialMatchResultView";

function AIPartialMatchResultContent() {
  const searchParams = useSearchParams();
  const jobTitle = searchParams.get("role") || searchParams.get("jobTitle") || "Ayurvedic Doctor";
  const fileName = searchParams.get("fileName") || "Vijay_Sharma_CV.pdf";
  const fileSize = searchParams.get("fileSize") || "842 KB";
  const candidateName = searchParams.get("candidateName") || "Vijay Sharma";

  return (
    <AIPartialMatchResultView
      jobTitle={jobTitle}
      fileName={fileName}
      fileSize={fileSize}
      candidateName={candidateName}
    />
  );
}

export default function AIPartialMatchResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2]" />}>
      <AIPartialMatchResultContent />
    </Suspense>
  );
}
