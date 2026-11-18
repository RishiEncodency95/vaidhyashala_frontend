"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loadScreeningResult, RESULT_PAGE, type ScreeningResult, type Verdict } from "@/lib/careers/screening";
import { experienceLabel, fetchCareerJob, type CareerJob } from "@/lib/careers/job";

/** The props every result view takes from a real screening result */
export interface ScreeningViewProps {
  jobTitle: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  candidateName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  dob: string;
  gender: string;
  matchScore: number;
  breakdown: ScreeningResult["breakdown"];
  suggestions: string[];
  strengths: string[];
  explanation: string;
  organization?: string;
  employmentType?: string;
  experienceRequired?: string;
  qualification?: string;
  workLocation?: string;
  eligibleFrom: number;
  partialFrom: number;
  showScore: boolean;
  showBreakdown: boolean;
  allowCvReplacement: boolean;
  applyHref: string;
  continueHref: string;
}

const NOT_STATED = "Not mentioned";

/**
 * Loads the analysis named in ?analysis= and renders the result view for it.
 * A result opened on the wrong page (e.g. an edited link) moves to the page for its verdict.
 */
export default function ScreeningResultLoader({
  verdict,
  render,
}: {
  verdict: Verdict;
  render: (props: ScreeningViewProps) => ReactNode;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const analysisId = params.get("analysis") || "";
  const jobSlug = params.get("job") || "";
  const [result, setResult] = useState<ScreeningResult | null | undefined>(undefined);
  // The job as published from the admin, for the job details on the result
  const [job, setJob] = useState<CareerJob | null | undefined>(jobSlug ? undefined : null);

  useEffect(() => {
    if (!analysisId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncs state from the browser / an async result
      setResult(null);
      return;
    }
    let live = true;
    loadScreeningResult(analysisId).then((r) => live && setResult(r));
    return () => {
      live = false;
    };
  }, [analysisId]);

  useEffect(() => {
    if (!jobSlug) return;
    let live = true;
    fetchCareerJob(jobSlug).then((j) => live && setJob(j));
    return () => {
      live = false;
    };
  }, [jobSlug]);

  useEffect(() => {
    if (result && result.verdict !== verdict) router.replace(`${RESULT_PAGE[result.verdict]}?${params.toString()}`);
  }, [result, verdict, router, params]);

  if (result === undefined || job === undefined || (result && result.verdict !== verdict)) {
    return <div className="min-h-screen bg-[#FAF7F2]" />;
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold text-[#0D3226]">Screening result not found</h1>
          <p className="mt-3 text-[#495C51]">
            We could not find this CV screening result. Please choose a role and upload your CV again.
          </p>
          <Link
            href="/careers"
            className="mt-6 inline-block rounded-full bg-[#0E5C3D] px-6 py-3 text-sm font-medium text-white"
          >
            View open positions
          </Link>
        </div>
      </div>
    );
  }

  const jobTitle = job?.title || params.get("role") || params.get("jobTitle") || "the role";
  const slug = jobSlug || job?.slug || "";
  const applyQuery = new URLSearchParams({ role: jobTitle, ...(slug ? { job: slug } : {}) });
  const continueQuery = new URLSearchParams({
    role: jobTitle,
    ...(slug ? { job: slug } : {}),
    candidate: result.candidateId,
    analysis: result.analysisId,
  });

  return render({
    jobTitle,
    fileName: params.get("fileName") || "CV",
    fileSize: params.get("fileSize") || "",
    uploadDate: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
    candidateName: result.candidateName || params.get("candidateName") || "Candidate",
    email: result.email || NOT_STATED,
    phone: result.phone || NOT_STATED,
    location: result.location || NOT_STATED,
    linkedin: result.linkedin || NOT_STATED,
    dob: NOT_STATED,
    gender: NOT_STATED,
    matchScore: result.matchScore,
    breakdown: result.breakdown,
    suggestions: result.gaps,
    strengths: result.strengths,
    explanation: result.explanation,
    eligibleFrom: result.eligibleFrom,
    partialFrom: result.partialFrom,
    // The job's current admin settings win over those saved with the result
    showScore: job?.showScore ?? result.showScore,
    showBreakdown: job?.showBreakdown ?? result.showBreakdown,
    allowCvReplacement: job?.allowCvReplacement ?? result.allowCvReplacement,
    applyHref: `/careers/apply?${applyQuery.toString()}`,
    continueHref: `/careers/complete-application?${continueQuery.toString()}`,
    ...(job && {
      organization: job.company,
      employmentType: job.employmentType,
      experienceRequired: experienceLabel(job),
      qualification: job.educationRequirements || NOT_STATED,
      workLocation: [job.location, job.workplaceType].filter(Boolean).join(" · ") || NOT_STATED,
    }),
  });
}
