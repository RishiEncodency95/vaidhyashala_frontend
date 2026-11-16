"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ApplicationSubmitted from "@/components/careers/application-submitted/ApplicationSubmitted";
import { fetchCareerJob, type CareerJob } from "@/lib/careers/job";
import { API_BASE } from "@/lib/api";

export default function ApplicationSubmittedPage() {
  const searchParams = useSearchParams();
  const jobSlug = searchParams.get("job") || "";
  const [job, setJob] = useState<CareerJob | null>(null);
  useEffect(() => {
    let live = true;
    fetchCareerJob(jobSlug).then((j) => live && setJob(j));
    return () => {
      live = false;
    };
  }, [jobSlug]);

  // HR contact shown under "Need Help?" (admin Career Settings → Result Messages → Support Email / Phone)
  const [support, setSupport] = useState<{ email: string; phone: string } | null>(null);
  useEffect(() => {
    let live = true;
    fetch(`${API_BASE}/careers/result-messages`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => live && d?.data && setSupport({ email: d.data.supportEmail || "", phone: d.data.supportPhone || "" }))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  const submittedAt = new Date(searchParams.get("submittedAt") || "");
  const score = searchParams.get("score");
  const verdict = searchParams.get("verdict");

  return (
    <ApplicationSubmitted
      roleTitle={job?.title || searchParams.get("role") || "the position"}
      candidateName={searchParams.get("candidateName") || "Candidate"}
      email={searchParams.get("email") || ""}
      phone={searchParams.get("phone") || "—"}
      location={searchParams.get("location") || "—"}
      preferredLocations={searchParams.get("locations") || job?.location || "—"}
      applicationId={searchParams.get("applicationId") || "—"}
      submittedOn={
        isNaN(submittedAt.getTime()) ? "—" : submittedAt.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
      }
      matchScore={score && score !== "" && !isNaN(Number(score)) ? Number(score) : null}
      verdict={verdict === "ELIGIBLE" || verdict === "PARTIAL" || verdict === "NOT_ELIGIBLE" ? verdict : null}
      supportEmail={support?.email ?? ""}
      supportPhone={support?.phone ?? ""}
      photo={searchParams.get("photo") || ""}
      positionDetails={[job?.employmentType, job?.educationRequirements].filter(Boolean).join("  |  ")}
    />
  );
}
