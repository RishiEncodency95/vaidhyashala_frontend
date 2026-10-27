"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ReviewDetailsView from "@/components/careers/ReviewDetailsView";

function ReviewDetailsContent() {
  const searchParams = useSearchParams();
  const roleTitle = searchParams.get("role") || searchParams.get("jobTitle") || "Ayurvedic Doctor";
  const fileName = searchParams.get("fileName") || "Resume.pdf";
  const fileSize = searchParams.get("fileSize") || "2.4 MB";

  return <ReviewDetailsView roleTitle={roleTitle} fileName={fileName} fileSize={fileSize} />;
}

export default function ReviewDetailsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2]" />}>
      <ReviewDetailsContent />
    </Suspense>
  );
}
