"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import HRNotificationTemplate from "@/components/hr/HRNotificationTemplate";

function HRNotificationContent() {
  const searchParams = useSearchParams();
  const roleTitle = searchParams.get("role") || "Ayurvedic Doctor";
  const candidateName = searchParams.get("candidateName") || "Dr. Ananya Sharma";
  const email = searchParams.get("email") || "ananya.sharma@gmail.com";
  const location = searchParams.get("locations") || "Delhi NCR, Kalkaji Clinic";

  return (
    <HRNotificationTemplate
      roleTitle={roleTitle}
      candidateName={candidateName}
      email={email}
      location={location}
    />
  );
}

export default function HRNotificationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#EEF2EC]" />}>
      <HRNotificationContent />
    </Suspense>
  );
}
