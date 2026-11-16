/**
 * Submitting a Careers application:
 *   1. POST {API}/careers/applications                    draft (creates the candidate when the job allows applying without a CV)
 *   2. POST {API}/careers/candidates/:id/photo           the photo, when the candidate added one
 *   3. POST {API}/careers/applications/:applicationId/submit
 * The backend checks the job's admin settings (open dates, photo, application questions) again on submit.
 */
import { API_BASE } from "@/lib/api";
import { readJson } from "@/lib/careers/screening";

export interface ApplicationForm {
  jobSlug: string;
  candidateId?: string;
  analysisId?: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  noticePeriod: string;
  expectedCTC: string;
  willingToRelocate: boolean;
  whyInterested: string;
  /** Extra skills the candidate typed (comma separated) */
  extraSkills: string;
  /** Answers in the same order as the job's application questions */
  screeningAnswers: string[];
  photoFile?: File | null;
}

export interface SubmittedApplication {
  applicationId: string;
  submittedAt: string;
  /** The stored photo, when one was added on the form */
  photo: string;
}

export const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_PHOTO_BYTES = 2 * 1024 * 1024;

async function post(path: string, body: BodyInit, json = true) {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      ...(json ? { headers: { "Content-Type": "application/json" } } : {}),
      body,
    });
  } catch {
    throw new Error("We could not reach the server. Please check your connection and try again.");
  }
  return readJson(res);
}

export async function submitCareerApplication(form: ApplicationForm): Promise<SubmittedApplication> {
  const candidateData = {
    name: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    location: form.location.trim(),
    noticePeriod: form.noticePeriod,
    expectedCTC: form.expectedCTC.trim(),
    willingToRelocate: form.willingToRelocate,
  };
  const body = {
    candidateData,
    whyInterested: form.whyInterested.trim(),
    screeningAnswers: form.screeningAnswers.map((a) => a.trim()),
  };

  const draft = await post(
    "/careers/applications",
    JSON.stringify({ ...body, candidateId: form.candidateId || undefined, jobId: form.jobSlug, cvAnalysisId: form.analysisId || undefined })
  );
  const applicationId = String(draft?.applicationId ?? "");
  const candidateId = String(draft?.candidateId ?? form.candidateId ?? "");
  if (!applicationId) throw new Error("Your application could not be started. Please try again.");

  let photoUrl = "";
  if (form.photoFile && candidateId) {
    const photo = new FormData();
    photo.append("photo", form.photoFile);
    const saved = await post(`/careers/candidates/${encodeURIComponent(candidateId)}/photo`, photo, false);
    photoUrl = String(saved?.photo ?? "");
  }

  const extraSkills = form.extraSkills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const submitted = await post(
    `/careers/applications/${encodeURIComponent(applicationId)}/submit`,
    JSON.stringify({ ...body, candidateData: { ...candidateData, ...(extraSkills.length ? { extraSkills } : {}) } })
  );
  return {
    applicationId: String(submitted?.applicationId ?? applicationId),
    submittedAt: String(submitted?.submittedAt ?? new Date().toISOString()),
    photo: photoUrl,
  };
}
