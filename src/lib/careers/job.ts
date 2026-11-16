/**
 * One published job for the Careers apply / CV analysis / result pages, as saved in the admin.
 *   GET {API}/careers/jobs/:slug
 * Loaded once per job while the candidate moves through those pages (the API also counts a view per request).
 */
import { API_BASE } from "@/lib/api";

/** Whether the job takes applications now (decided by the backend from the admin settings) */
export type JobApplicationStatus = "OPEN" | "NOT_YET_OPEN" | "CLOSED" | "NOT_ACCEPTING";

export const APPLICATION_CLOSED_MESSAGE: Record<Exclude<JobApplicationStatus, "OPEN">, string> = {
  NOT_YET_OPEN: "Applications for this position have not opened yet. Please check back soon.",
  CLOSED: "Applications for this position are closed.",
  NOT_ACCEPTING: "This position is not accepting online applications.",
};

export interface CareerJob {
  slug: string;
  title: string;
  company: string;
  department: string;
  location: string;
  employmentType: string;
  workplaceType: string;
  totalOpenings: number;
  experienceMin: number;
  experienceMax: number;
  educationRequirements: string;
  salary: string;
  description: string;
  roleObjective: string;
  aboutCompany: string;
  skills: string[];
  preferredSkills: string[];
  responsibilities: string[];
  requirements: string[];
  preferredQualifications: string[];
  reportingTo: string;
  image: string;
  applicationClosingDate: string;
  eligibleFrom: number;
  partialFrom: number;
  // Admin "Application & AI Screening" and "AI Matching Rules" settings
  applicationStatus: JobApplicationStatus;
  aiCvScreening: boolean;
  cvUploadMandatory: boolean;
  candidatePhotoMandatory: boolean;
  allowCvReplacement: boolean;
  showScore: boolean;
  showBreakdown: boolean;
  /** Application questions every candidate answers before submitting */
  screeningQuestions: string[];
  featured: boolean;
  tags: string[];
}

const list = (v: unknown) => (Array.isArray(v) ? v.map((x) => String(x ?? "").trim()).filter(Boolean) : []);
const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");

const toJob = (d: Record<string, any>): CareerJob => {
  const min = Number(d.experienceMin ?? 0);
  const max = Number(d.experienceMax ?? 0);
  const ctcMin = Number(d.ctcMin ?? 0);
  const ctcMax = Number(d.ctcMax ?? 0);
  // As entered in the admin (rupees)
  const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;
  return {
    slug: text(d.slug),
    title: text(d.title),
    company: text(d.company) || "Vaidhyashala",
    department: text(d.department),
    location: text(d.location),
    employmentType: text(d.employmentType) || "Full Time",
    workplaceType: text(d.workplaceType),
    totalOpenings: Number(d.totalOpenings ?? 1),
    experienceMin: min,
    experienceMax: max,
    educationRequirements: text(d.educationRequirements),
    salary:
      text(d.salary) ||
      (ctcMin && ctcMax ? `${rupees(ctcMin)} – ${rupees(ctcMax)}` : ctcMin ? `From ${rupees(ctcMin)}` : ctcMax ? `Up to ${rupees(ctcMax)}` : ""),
    description: text(d.description),
    roleObjective: text(d.roleObjective),
    aboutCompany: text(d.aboutCompany),
    skills: list(d.skills),
    preferredSkills: list(d.preferredSkills),
    responsibilities: list(d.responsibilities),
    requirements: list(d.requirements),
    preferredQualifications: list(d.preferredQualifications),
    reportingTo: text(d.reportingTo),
    image: text(d.image),
    applicationClosingDate: text(d.applicationClosingDate),
    // Same rule as the backend's decideVerdict
    eligibleFrom: Math.max(Number(d.eligibilityThreshold ?? 40), Number(d.partialMatchMax ?? 69) + 1),
    partialFrom: Number(d.partialMatchMin ?? 50),
    applicationStatus: (["OPEN", "NOT_YET_OPEN", "CLOSED", "NOT_ACCEPTING"].includes(d.applicationStatus)
      ? d.applicationStatus
      : "OPEN") as JobApplicationStatus,
    aiCvScreening: d.aiCvScreening !== false,
    cvUploadMandatory: d.cvUploadMandatory !== false,
    candidatePhotoMandatory: d.candidatePhotoMandatory !== false,
    allowCvReplacement: d.allowCvReplacement !== false,
    showScore: d.showMatchScoreToCandidate !== false,
    showBreakdown: d.showMatchBreakdown !== false,
    screeningQuestions: list(d.screeningQuestions),
    featured: d.featuredJob === true,
    tags: list(d.tags),
  };
};

/** "2 – 5 Years", "Freshers", "3+ Years" */
export const experienceLabel = (job: Pick<CareerJob, "experienceMin" | "experienceMax">) =>
  job.experienceMax > job.experienceMin
    ? `${job.experienceMin} – ${job.experienceMax} Years`
    : job.experienceMin > 0
      ? `${job.experienceMin}+ Years`
      : "Freshers";

const loaded = new Map<string, Promise<CareerJob | null>>();

/** The published job for this slug, or null when there is none (or the server cannot be reached) */
export function fetchCareerJob(slug: string): Promise<CareerJob | null> {
  if (!slug) return Promise.resolve(null);
  let job = loaded.get(slug);
  if (!job) {
    job = fetch(`${API_BASE}/careers/jobs/${encodeURIComponent(slug)}`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => (json?.data ? toJob(json.data) : null))
      .catch(() => null);
    // A failed load is tried again next time instead of being remembered
    job.then((j) => j || loaded.delete(slug));
    loaded.set(slug, job);
  }
  return job;
}
