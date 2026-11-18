/**
 * AI CV screening on the Careers pages.
 *   1. POST {API}/careers/cv/upload   the CV file           -> candidateId
 *   2. POST {API}/careers/cv/analyze  candidateId + job      -> score, verdict, breakdown
 *   3. GET  {API}/careers/analysis/:id                       -> the same result again (result page reloads)
 * The verdict comes from the job's AI Matching Rules in the admin (Eligible / Partial match / Not eligible).
 */
import { API_BASE } from "@/lib/api";

export type Verdict = "ELIGIBLE" | "PARTIAL" | "NOT_ELIGIBLE";

export interface BreakdownRow {
  label: string;
  detail: string;
  score: number;
}

export interface ScreeningResult {
  analysisId: string;
  candidateId: string;
  verdict: Verdict;
  matchScore: number;
  eligibleFrom: number;
  partialFrom: number;
  showScore: boolean;
  showBreakdown: boolean;
  candidateName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  breakdown: BreakdownRow[];
  /** The candidate's photo (found in the CV or added later), or "" */
  photo: string;
  /** Admin "Allow CV Replacement": may the candidate upload another CV for this job */
  allowCvReplacement: boolean;
  strengths: string[];
  gaps: string[];
  explanation: string;
}

/** Where each verdict's result page lives */
export const RESULT_PAGE: Record<Verdict, string> = {
  ELIGIBLE: "/careers/ai-screening-result",
  PARTIAL: "/careers/partial-match",
  NOT_ELIGIBLE: "/careers/not-eligible",
};

const ALLOWED = /\.(pdf|doc|docx)$/i;
export const MAX_CV_BYTES = 5 * 1024 * 1024;

/** A problem with the chosen file, in words for the candidate, or null */
export const cvFileProblem = (file: File) =>
  !ALLOWED.test(file.name)
    ? "Please upload your CV as a PDF, DOC or DOCX file."
    : file.size > MAX_CV_BYTES
      ? "Your CV is larger than 5 MB. Please upload a smaller file."
      : null;

/** An API refusal, with the HTTP status and the rest of the reply (e.g. an earlier analysisId) */
export class CareersApiError extends Error {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- loosely shaped API JSON
  constructor(message: string, readonly status: number, readonly details: Record<string, any> | null) {
    super(message);
  }
}

export async function readJson(res: Response) {
  const json = await res.json().catch(() => null);
  if (!res.ok || json?.success === false) {
    throw new CareersApiError(json?.message || "Something went wrong. Please try again.", res.status, json);
  }
  return json?.data;
}

/** Uploads the CV; returns the candidate id the analysis needs, and the photo found in the CV */
export async function uploadCv(file: File): Promise<{ candidateId: string; photo: string }> {
  const form = new FormData();
  form.append("file", file);
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/careers/cv/upload`, { method: "POST", body: form });
  } catch {
    throw new Error("We could not reach the server. Please check your connection and try again.");
  }
  const data = await readJson(res);
  if (!data?.candidateId) throw new Error("The CV could not be uploaded. Please try again.");
  return { candidateId: String(data.candidateId), photo: String(data.photo || "") };
}

const AREA_LABELS: [key: string, label: string][] = [
  ["education", "Educational Qualification"],
  ["relevantExperience", "Relevant Experience"],
  ["skills", "Skills Match"],
  ["industryExperience", "Ayurveda / Healthcare Experience"],
  ["roleFit", "Role Fit"],
  ["location", "Location"],
];

type ApiArea = { score?: number; evidence?: string[]; matched?: string[]; missing?: string[] };

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- loosely shaped API JSON
const toResult = (d: Record<string, any>): ScreeningResult => {
  const ext = d.extractedProfile ?? d.candidateProfile ?? {};
  const cand = ext.candidate ?? ext;
  const breakdown: Record<string, ApiArea> = d.breakdown ?? {};
  const score = Math.round(Number(d.matchScore ?? d.overallScore ?? 0));
  const eligibleFrom = Number(d.verdictRule?.eligibleFrom ?? Math.max(Number(d.eligibilityThreshold ?? 40), 70));
  const partialFrom = Number(d.verdictRule?.partialFrom ?? 50);
  const verdict: Verdict = d.verdict ?? (score >= eligibleFrom ? "ELIGIBLE" : score >= partialFrom ? "PARTIAL" : "NOT_ELIGIBLE");
  return {
    analysisId: String(d.analysisId ?? d._id ?? ""),
    candidateId: String(d.candidateId?._id ?? d.candidateId ?? ""),
    verdict,
    matchScore: score,
    eligibleFrom,
    partialFrom,
    showScore: d.showMatchScoreToCandidate !== false,
    showBreakdown: d.showMatchBreakdown !== false,
    candidateName: cand.name || d.candidateId?.name || "",
    email: cand.email || "",
    phone: cand.phone || "",
    location: cand.location || "",
    linkedin: cand.linkedin || "",
    photo: String(cand.photo || d.candidateProfile?.photo || d.candidateId?.photo || ""),
    allowCvReplacement: d.allowCvReplacement !== false,
    breakdown: AREA_LABELS.map(([key, label]) => {
      const area = breakdown[key] ?? {};
      const detail =
        key === "skills"
          ? (area.matched?.length ? area.matched : area.missing?.length ? [`Missing: ${area.missing.join(", ")}`] : []).join(", ")
          : area.evidence?.[0] ?? "";
      return { label, detail: detail || "Not found in the CV", score: Math.max(0, Math.min(100, Math.round(area.score ?? 0))) };
    }),
    strengths: [...(d.matchedRequirements ?? []), ...(d.strengths ?? [])].filter((s, i, all) => s && all.indexOf(s) === i),
    gaps: [...(d.gaps ?? []), ...(d.missingRequirements ?? [])].filter((g, i, all) => g && all.indexOf(g) === i),
    explanation: d.explanation ?? "",
  };
};

const storageKey = (id: string) => `cv-analysis:${id}`;

/**
 * Runs the AI screening for this CV against the job (its slug or title).
 * null: the job has "AI CV Screening" off, so there is no score and the candidate goes on to the application form.
 */
export async function analyzeCv(candidateId: string, job: string): Promise<ScreeningResult | null> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/careers/cv/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ candidateId, jobId: job }),
    });
  } catch {
    throw new Error("We could not reach the server. Please check your connection and try again.");
  }
  const data = await readJson(res);
  if (data?.screening === false) return null;
  const result = toResult(data);
  try {
    sessionStorage.setItem(storageKey(result.analysisId), JSON.stringify(result));
  } catch {
    // storage unavailable: the result page loads it from the server instead
  }
  return result;
}

/** The result for a result page: from this tab if it was just analysed, otherwise from the server */
export async function loadScreeningResult(analysisId: string): Promise<ScreeningResult | null> {
  try {
    const saved = sessionStorage.getItem(storageKey(analysisId));
    if (saved) return JSON.parse(saved) as ScreeningResult;
  } catch {
    // ignore and ask the server
  }
  try {
    const res = await fetch(`${API_BASE}/careers/analysis/${encodeURIComponent(analysisId)}`, { cache: "no-store" });
    const data = await readJson(res);
    if (!data) return null;
    const job = data.jobId ?? {};
    return toResult({
      ...data,
      analysisId: data._id,
      verdictRule: undefined,
      showMatchScoreToCandidate: job.showMatchScoreToCandidate,
      showMatchBreakdown: job.showMatchBreakdown,
      allowCvReplacement: job.allowCvReplacement,
      eligibilityThreshold: data.eligibilityThreshold,
      ...(job.partialMatchMax != null
        ? { verdictRule: { eligibleFrom: Math.max(data.eligibilityThreshold ?? 40, job.partialMatchMax + 1), partialFrom: job.partialMatchMin ?? 50 } }
        : {}),
    });
  } catch {
    return null;
  }
}
