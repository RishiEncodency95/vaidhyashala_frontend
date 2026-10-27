"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ApplicationSubmittedView from "@/components/careers/ApplicationSubmittedView";

function ApplicationSubmittedContent() {
  const searchParams = useSearchParams();
  const roleTitle = searchParams.get("role") || searchParams.get("jobTitle") || "Ayurvedic Doctor";
  const candidateName = searchParams.get("candidateName") || "Dr. Ananya Sharma";
  const email = searchParams.get("email") || "ananya.sharma@gmail.com";
  const preferredLocations = searchParams.get("locations") || "Delhi NCR, Kalkaji Clinic";

  return (
    <ApplicationSubmittedView
      roleTitle={roleTitle}
      candidateName={candidateName}
      email={email}
      preferredLocations={preferredLocations}
    />
  );
}

export default function ApplicationSubmittedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2]" />}>
      <ApplicationSubmittedContent />
    </Suspense>
  );
}
