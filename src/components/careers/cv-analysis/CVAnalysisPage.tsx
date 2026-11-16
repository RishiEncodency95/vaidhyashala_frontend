"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CVAnalysis from "@/components/careers/cv-analysis/CVAnalysis";
import { fetchCareerJob, type CareerJob } from "@/lib/careers/job";

export default function CVAnalysisPage() {
  const searchParams = useSearchParams();
  const fileName = searchParams.get("fileName") || "Vijay_Sharma_CV.pdf";
  const fileSize = searchParams.get("fileSize") || "2.4 MB";
  const candidateId = searchParams.get("candidate") || "";
  const jobSlug = searchParams.get("job") || "";

  // The job as published from the admin (already loaded on the apply page, so this is instant)
  const [job, setJob] = useState<CareerJob | null>(null);
  useEffect(() => {
    let live = true;
    fetchCareerJob(jobSlug).then((j) => live && setJob(j));
    return () => {
      live = false;
    };
  }, [jobSlug]);

  const fallback = !jobSlug;
  return (
    <CVAnalysis
      fileName={fileName}
      fileSize={fileSize}
      roleTitle={job?.title || searchParams.get("role") || "Ayurvedic Doctor"}
      location={job?.location ?? (fallback ? searchParams.get("location") || "Delhi NCR" : "")}
      employmentType={job?.employmentType ?? (fallback ? searchParams.get("type") || "Full Time" : "")}
      qualification={job?.educationRequirements ?? (fallback ? searchParams.get("qualification") || "BAMS / MD (Ayurveda)" : "")}
      candidateId={candidateId}
      photo={searchParams.get("photo") || ""}
      job={jobSlug}
    />
  );
}
