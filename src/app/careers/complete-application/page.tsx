"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CompleteApplicationView from "@/components/careers/CompleteApplicationView";

function CompleteApplicationContent() {
  const searchParams = useSearchParams();
  const jobTitle = searchParams.get("role") || searchParams.get("jobTitle") || "Ayurvedic Doctor";
  const candidateParam = searchParams.get("candidateName");
  const candidateName = candidateParam && candidateParam !== "Vijay Sharma" ? candidateParam : "Dr. Ananya Sharma";
  const emailParam = searchParams.get("email");
  const email = emailParam && emailParam !== "vijay.sharma@gmail.com" ? emailParam : "ananya.sharma@gmail.com";
  const phone = searchParams.get("phone") || "+91 98765 43210";
  const location = searchParams.get("location") || "Delhi NCR";
  const dob = searchParams.get("dob") || "14 Nov 1995";
  const genderParam = searchParams.get("gender");
  const gender = genderParam && genderParam !== "Male" ? genderParam : "Female";

  return (
    <CompleteApplicationView
      jobTitle={jobTitle}
      candidateName={candidateName}
      email={email}
      phone={phone}
      location={location}
      dob={dob}
      gender={gender}
    />
  );
}

export default function CompleteApplicationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2]" />}>
      <CompleteApplicationContent />
    </Suspense>
  );
}
