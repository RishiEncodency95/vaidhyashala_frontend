"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Camera,
  Check,
  ChevronDown,
  ChevronRight,
  FileText,
  Home,
  Lock,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Send,
  Star,
  UserRound,
} from "lucide-react";
import { APPLICATION_CLOSED_MESSAGE, fetchCareerJob, type CareerJob } from "@/lib/careers/job";
import { loadScreeningResult, RESULT_PAGE, type ScreeningResult } from "@/lib/careers/screening";
import { MAX_PHOTO_BYTES, PHOTO_TYPES, submitCareerApplication } from "@/lib/careers/application";

interface CompleteApplicationFormProps {
  /** The job's slug: its admin settings decide the questions, photo rule and whether it is open */
  jobSlug?: string;
  /** The uploaded CV's candidate (empty when the job allows applying without a CV) */
  candidateId?: string;
  /** The AI screening of that CV (empty when the job has AI screening off) */
  analysisId?: string;
  /** The photo found in the CV, when there was no screening to read it from */
  cvPhoto?: string;
  roleTitle?: string;
}

function DoctorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 13a9 9 0 0 1 18 0v3c0 5-4 9-9 9s-9-4-9-9v-3z" />
      <path d="M15 14h18" />
      <path d="M17 18h14" strokeWidth="5" />
      <path d="M8 45v-6c0-6 5-10 11-10h10c6 0 11 4 11 10v6" />
      <path d="M18 29v6a5 5 0 0 0 10 0" />
      <circle cx="16" cy="39" r="3" />
      <path d="M30 29v5" />
      <circle cx="31" cy="38" r="3.4" />
    </svg>
  );
}

function SectionHeader({ icon, title, note }: { icon: React.ReactNode; title: string; note?: string }) {
  return (
    <div className="flex items-center gap-3 pb-2 border-b border-[#ECE7DD]">
      <div className="w-6.5 h-6.5 rounded-full bg-[#0D5B3A] flex items-center justify-center shrink-0 text-white [&>svg]:w-3.5 [&>svg]:h-3.5">
        {icon}
      </div>
      <h2 className="font-sans font-bold text-[16px] sm:text-[17px] text-[#0D3226] leading-tight">
        {title}
        {note && <span className="font-sans font-normal text-[13px] text-[#495C51] ml-1.5">{note}</span>}
      </h2>
    </div>
  );
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <span className="block text-[12px] sm:text-[12.5px] font-semibold text-[#41536F] mb-1">
      {children}
      {required && <span className="text-[#E0262B] ml-1">*</span>}
    </span>
  );
}

function SelectField({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[31px] appearance-none rounded-md border border-[#DDD8CE] bg-white pl-3 pr-9 text-[13px] font-semibold text-[#183153] outline-none focus:border-[#0F5E3C] cursor-pointer"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#374151]" />
    </div>
  );
}

function GreenCheckbox({
  checked,
  onChange,
  children,
  className = "",
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex items-center gap-2.5 cursor-pointer select-none ${className}`}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only" />
      <span
        className={`w-[17px] h-[17px] rounded-[3px] flex items-center justify-center shrink-0 transition-colors ${
          checked ? "bg-[#0F7A45] text-white" : "border border-[#AEB5BF] bg-white"
        }`}
      >
        {checked && <Check className="w-3 h-3 stroke-[3.5]" />}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full h-[31px] rounded-md border border-[#DDD8CE] bg-white px-3 text-[13px] font-semibold text-[#183153] outline-none focus:border-[#0F5E3C]";
const textareaClass =
  "w-full resize-none rounded-md border border-[#DDD8CE] bg-white px-3 py-1.5 text-[12.5px] leading-[1.4] text-[#495C51] outline-none focus:border-[#0F5E3C]";

const WHY_MAX = 600;
const SKILLS_MAX = 400;
const ANSWER_MAX = 1000;

export default function CompleteApplicationForm({
  jobSlug = "",
  candidateId = "",
  analysisId = "",
  cvPhoto = "",
  roleTitle = "",
}: CompleteApplicationFormProps) {
  const router = useRouter();

  // The published job and (when the CV was screened) the AI result, both from the backend
  const [job, setJob] = useState<CareerJob | null | undefined>(jobSlug ? undefined : null);
  const [result, setResult] = useState<ScreeningResult | null | undefined>(analysisId ? undefined : null);
  useEffect(() => {
    let live = true;
    if (jobSlug) fetchCareerJob(jobSlug).then((j) => live && setJob(j));
    if (analysisId) loadScreeningResult(analysisId).then((r) => live && setResult(r));
    return () => {
      live = false;
    };
  }, [jobSlug, analysisId]);

  // Your details: filled from the CV when it was screened, editable
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  useEffect(() => {
    if (!result) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncs state from the browser / an async result
    setName((v) => v || result.candidateName);
    setEmail((v) => v || result.email);
    setPhone((v) => v || result.phone);
    setLocation((v) => v || result.location);
  }, [result]);

  // Application details
  const [noticePeriod, setNoticePeriod] = useState("Immediate");
  const [expectedCTC, setExpectedCTC] = useState("");
  const [willingToRelocate, setWillingToRelocate] = useState(false);
  const [whyJoin, setWhyJoin] = useState("");
  const [skills, setSkills] = useState("");

  // Application questions set on the job in the admin
  const questions = job?.screeningQuestions ?? [];
  const [answers, setAnswers] = useState<string[]>([]);
  const setAnswer = (i: number, value: string) =>
    setAnswers((prev) => {
      const next = [...prev];
      next[i] = value;
      return next;
    });

  // Photo: the one from the CV, or one the candidate adds ("Candidate Photo Mandatory")
  const existingPhoto = result?.photo || cvPhoto;
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const photoInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncs state from the browser / an async result
    if (!photoFile) return setPhotoPreview("");
    const url = URL.createObjectURL(photoFile);
    setPhotoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [photoFile]);
  const photoRequired = (job?.candidatePhotoMandatory ?? false) && !existingPhoto;
  const shownPhoto = photoPreview || existingPhoto;

  // Before submit
  const [terms, setTerms] = useState({ correct: false, authorize: false, contacted: false, privacy: false });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const pickPhoto = (file?: File) => {
    if (!file) return;
    if (!PHOTO_TYPES.includes(file.type)) return setError("Please choose a JPG, PNG or WEBP photo.");
    if (file.size > MAX_PHOTO_BYTES) return setError("Your photo is larger than 2 MB. Please choose a smaller one.");
    setError("");
    setPhotoFile(file);
  };

  const problem = (): string => {
    if (!name.trim() || !email.trim() || !phone.trim()) return "Please enter your name, email and phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Please enter a valid email address.";
    if (!whyJoin.trim()) return "Please tell us why you want to join Vaidhyashala.";
    const left = questions.filter((_, i) => !answers[i]?.trim()).length;
    if (left) return `Please answer all application questions (${left} left).`;
    if (photoRequired && !photoFile) return "Please add your photo. This position needs a photo with the application.";
    if (!terms.correct || !terms.privacy) return "Please confirm your details and accept the Privacy Policy and Terms.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const issue = problem();
    if (issue) return setError(issue);
    setError("");
    setSubmitting(true);
    try {
      const done = await submitCareerApplication({
        jobSlug,
        candidateId,
        analysisId,
        name,
        email,
        phone,
        location,
        noticePeriod,
        expectedCTC,
        willingToRelocate,
        whyInterested: whyJoin,
        extraSkills: skills,
        screeningAnswers: questions.map((_, i) => answers[i] ?? ""),
        photoFile,
      });
      const params = new URLSearchParams({
        role: title,
        candidateName: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        location: location.trim(),
        locations: job?.location || location.trim(),
        applicationId: done.applicationId,
        submittedAt: done.submittedAt,
        job: jobSlug,
      });
      if (done.photo || existingPhoto) params.set("photo", done.photo || existingPhoto);
      if (showScore) {
        params.set("score", String(result!.matchScore));
        params.set("verdict", result!.verdict);
      }
      router.push(`/careers/application-submitted?${params.toString()}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Your application could not be submitted. Please try again.");
      setSubmitting(false);
    }
  };

  const title = job?.title || roleTitle || "this position";
  const employmentType = job?.employmentType || "";
  const showScore = !!result && (job?.showScore ?? result.showScore);
  const matchScore = result?.matchScore ?? 0;
  const matchLabel = result?.verdict === "ELIGIBLE" ? "Strong Match" : result?.verdict === "PARTIAL" ? "Partial Match" : "Profile Match";

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (matchScore / 100) * circumference;

  const steps = [
    { label: "Upload CV", sub: candidateId ? "Completed" : "Not required", left: "14.5%" },
    { label: "AI Analysis", sub: result ? "Completed" : "Not required", left: "40.5%" },
    { label: "Review Details", sub: "Completed", left: "63.8%" },
    { label: "Submit Application", sub: "Current Step", left: "86.2%" },
  ];

  // Back to the screening result when there is one, otherwise to the job
  const backHref =
    result && analysisId
      ? `${RESULT_PAGE[result.verdict]}?${new URLSearchParams({ role: title, analysis: analysisId, job: jobSlug }).toString()}`
      : `/careers/apply?${new URLSearchParams({ role: title, job: jobSlug }).toString()}`;

  const loading = job === undefined || result === undefined;
  const closed = job && job.applicationStatus !== "OPEN";
  // "CV Upload Mandatory": the form is reached only after uploading a CV
  const needsCv = !!job && !closed && job.cvUploadMandatory && !candidateId;

  if (!loading && (!jobSlug || !job || closed || needsCv)) {
    return (
      <div className="flex-1 bg-[#FAF7F2] flex flex-col font-sans">
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-semibold text-[#0D3226]">
              {closed ? "Applications are closed" : needsCv ? "Please upload your CV first" : "Position not found"}
            </h1>
            <p className="mt-3 text-[#495C51]">
              {closed && job.applicationStatus !== "OPEN"
                ? APPLICATION_CLOSED_MESSAGE[job.applicationStatus]
                : needsCv
                  ? "This position needs your CV. Upload it on the job page to continue your application."
                  : "We could not find this position. Please choose a role from our open positions."}
            </p>
            <Link
              href={needsCv ? `/careers/apply?${new URLSearchParams({ role: title, job: jobSlug }).toString()}` : "/careers"}
              className="mt-6 inline-block rounded-full bg-[#0E5C3D] px-6 py-3 text-sm font-medium text-white"
            >
              {needsCv ? "Upload your CV" : "View open positions"}
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#FAF7F2] flex flex-col font-sans selection:bg-[#0E5C3D] selection:text-white antialiased overflow-x-hidden">
      {/* 2. HERO */}
      <section className="shrink-0 relative w-full bg-[#FAF7F2] overflow-hidden min-h-[110px] sm:min-h-[125px] lg:min-h-[135px] flex items-center">
        <div className="absolute inset-0 select-none pointer-events-none z-0">
          <Image src="/aisc/hei2.webp" alt="" fill priority unoptimized className="object-cover object-[65%_center] lg:object-[64%_center]" />
          <div className="absolute inset-y-0 left-0 w-full sm:w-[72%] lg:w-[60%] bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/95 via-60% to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1536px] px-4 sm:px-6 lg:pl-[120px] lg:pr-[24px] py-2.5 sm:py-3.5 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11.5px] sm:text-[12px] font-bold tracking-[0.14em] uppercase text-[#8C7A5B] mb-1">
              Careers at Vaidhyashala
            </p>
            <h1 className="font-sans text-[26px] sm:text-[30px] lg:text-[34px] font-bold leading-[1.1] tracking-[-0.015em] text-[#0F382B]">
              Complete Your Application
            </h1>
            <p className="mt-1 text-[13.5px] sm:text-[14.5px] font-medium leading-[1.4] text-[#4A5950]">
              You&apos;re almost there! Please review and confirm your details to submit your application.
            </p>
          </div>

          <div className="hidden lg:flex flex-col items-center">
            <p className="font-sans italic text-[21px] xl:text-[24px] font-medium leading-[1.15] text-[#133D2D] tracking-tight">
              Healing
              <br />
              People
              <br />
              Enriching
              <br />
              Lives
            </p>
            <div className="mt-1.5 h-[2px] w-14 bg-[#C99C4B] rounded-full" />
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT */}
      <main className="relative w-full pb-5 pt-2 z-10">
        <div className="pointer-events-none absolute -left-2 sm:left-0 top-0 bottom-0 z-0 w-28 sm:w-40 lg:w-60 select-none">
          <Image src="/resumepage/s1.webp" alt="" fill unoptimized className="object-contain object-left mix-blend-multiply" />
        </div>
        <div className="pointer-events-none absolute -right-2 sm:right-0 top-0 bottom-0 z-0 w-28 sm:w-40 lg:w-60 select-none">
          <Image src="/resumepage/s2.webp" alt="" fill unoptimized className="object-contain object-right mix-blend-multiply" />
        </div>

        <div
          className={`relative z-10 mx-auto w-full max-w-[1536px] px-4 sm:px-6 lg:pl-[66px] lg:pr-[56px] transition-opacity duration-150 ${loading ? "opacity-0" : "opacity-100"}`}
        >
          <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_460px] gap-3 lg:gap-2.5 items-start">
            {/* ================= LEFT COLUMN ================= */}
            <div className="flex flex-col min-w-0">
              {/* Stepper */}
              <div className="relative h-[66px]">
                <Link href="/" className="absolute left-[6%] top-[6px] flex items-center gap-1 text-[#0F5E3C] hover:opacity-80">
                  <Home className="w-[17px] h-[17px] fill-[#0F5E3C]" />
                  <ChevronRight className="w-3.5 h-3.5 text-[#374151]" />
                </Link>
                <div className="absolute top-[13px] left-[14.5%] right-[13.8%] h-[2px] bg-[#1E8A4C]" />
                {steps.map((step, idx) => {
                  const current = idx === steps.length - 1;
                  return (
                    <div
                      key={step.label}
                      className="absolute top-0 -translate-x-1/2 flex flex-col items-center text-center whitespace-nowrap"
                      style={{ left: step.left }}
                    >
                      <div className="w-7 h-7 rounded-full bg-[#0D5B3A] flex items-center justify-center text-white font-bold text-[13px] sm:text-[14px] shadow-xs ring-3 ring-[#0D5B3A]/15">
                        {idx + 1}
                      </div>
                      <span className="mt-0.5 text-[13px] sm:text-[13.5px] font-bold leading-tight text-[#0D3226]">
                        {step.label}
                      </span>
                      <span className={`text-[11.5px] sm:text-[12px] leading-tight text-[#1E7F4E] ${current ? "font-semibold" : "font-medium"}`}>{step.sub}</span>
                    </div>
                  );
                })}
              </div>

              {/* Main form card */}
              <div className="mt-2.5 rounded-2xl border border-[#ECE7DC] bg-white/90 shadow-[0_6px_26px_rgba(0,0,0,0.05)] px-4 pt-2.5 pb-3">
                {/* Your Details */}
                <SectionHeader icon={<UserRound className="w-5 h-5 stroke-[2.4]" />} title="Your Details" />
                <div className="mt-2.5 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                  <label className="block">
                    <FieldLabel required>Full Name</FieldLabel>
                    <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={inputClass} />
                  </label>
                  <label className="block">
                    <FieldLabel required>Email Address</FieldLabel>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className={inputClass} />
                  </label>
                  <label className="block">
                    <FieldLabel required>Mobile Number</FieldLabel>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" className={inputClass} />
                  </label>
                  <label className="block">
                    <FieldLabel>Current Location</FieldLabel>
                    <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. New Delhi" className={inputClass} />
                  </label>
                </div>

                {/* Application Details */}
                <div className="mt-2.5">
                  <SectionHeader icon={<BriefcaseBusiness className="w-5 h-5 stroke-[2.2]" />} title="Application Details" />
                  <div className="mt-2.5 grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2">
                    <label className="block">
                      <FieldLabel required>Notice Period</FieldLabel>
                      <SelectField value={noticePeriod} onChange={setNoticePeriod} options={["Immediate", "15 Days", "30 Days", "60 Days", "90 Days"]} />
                    </label>
                    <label className="block">
                      <FieldLabel>Expected Salary (CTC)</FieldLabel>
                      <input value={expectedCTC} onChange={(e) => setExpectedCTC(e.target.value)} placeholder="e.g. 4.5 LPA or As per company norms" className={inputClass} />
                    </label>
                    {employmentType && (
                      <label className="block">
                        <span className="block text-[12px] sm:text-[12.5px] font-semibold text-[#9AA1AB] mb-1">Employment Type</span>
                        <input value={employmentType} disabled className="w-full h-[31px] rounded-md border border-[#E6E3DC] bg-[#F3F3F1] px-3 text-[13px] text-[#9AA1AB]" />
                      </label>
                    )}
                  </div>
                  <GreenCheckbox checked={willingToRelocate} onChange={setWillingToRelocate} className="mt-2 text-[12.5px] sm:text-[13px] font-medium text-[#3D5045]">
                    I am willing to relocate{job?.location ? ` to ${job.location}` : ""} if needed.
                  </GreenCheckbox>
                </div>

                {/* Application Questions (from the admin) */}
                {questions.length > 0 && (
                  <div className="mt-2.5">
                    <SectionHeader icon={<MessageSquareText className="w-5 h-5 stroke-[2.2]" />} title="Application Questions" note="(All required)" />
                    <ol className="mt-2 space-y-2">
                      {questions.map((q, i) => (
                        <li key={i}>
                          <label className="block">
                            <FieldLabel required>{`${i + 1}. ${q}`}</FieldLabel>
                            <textarea
                              value={answers[i] ?? ""}
                              maxLength={ANSWER_MAX}
                              onChange={(e) => setAnswer(i, e.target.value)}
                              rows={2}
                              className={`${textareaClass} h-[52px]`}
                            />
                          </label>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Additional Information */}
                <div className="mt-2.5">
                  <SectionHeader icon={<FileText className="w-5 h-5 stroke-[2.2]" />} title="Additional Information" />

                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                    <label className="block">
                      <FieldLabel required>Why do you want to join Vaidhyashala?</FieldLabel>
                      <textarea
                        value={whyJoin}
                        maxLength={WHY_MAX}
                        onChange={(e) => setWhyJoin(e.target.value)}
                        className={`${textareaClass} h-[62px]`}
                      />
                      <span className="block text-right text-[11.5px] text-[#6B7280]">{WHY_MAX - whyJoin.length} characters left</span>
                    </label>

                    <label className="block">
                      <FieldLabel>Any additional skills or expertise?</FieldLabel>
                      <textarea
                        value={skills}
                        maxLength={SKILLS_MAX}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder="Separate skills with commas"
                        className={`${textareaClass} h-[62px]`}
                      />
                      <span className="block text-right text-[11.5px] text-[#6B7280]">{SKILLS_MAX - skills.length} characters left</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= RIGHT COLUMN ================= */}
            <div className="flex flex-col gap-1.5 lg:mt-[8px]">
              {/* Candidate */}
              <div className="rounded-xl border border-[#ECE7DC] bg-white/95 shadow-[0_4px_18px_rgba(0,0,0,0.04)] p-2 flex gap-3.5">
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <div className="relative w-[128px] h-[128px] rounded-lg overflow-hidden bg-[#EDF2EE] flex items-center justify-center">
                    {shownPhoto ? (
                      // A local preview (blob:) or the stored photo; plain img so both work
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={shownPhoto} alt={name || "Your photo"} className="absolute inset-0 w-full h-full object-cover object-top" />
                    ) : (
                      <UserRound className="w-14 h-14 text-[#9DB3A6]" />
                    )}
                  </div>
                  <input
                    ref={photoInput}
                    type="file"
                    accept={PHOTO_TYPES.join(",")}
                    className="hidden"
                    onChange={(e) => {
                      pickPhoto(e.target.files?.[0]);
                      e.target.value = "";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => photoInput.current?.click()}
                    className="flex items-center gap-1 text-[12px] font-semibold text-[#1877F2] hover:underline"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    {shownPhoto ? "Change photo" : "Add photo"}
                    {photoRequired && <span className="text-[#E0262B]">*</span>}
                  </button>
                </div>
                <div className="min-w-0 flex-1 pt-1.5">
                  <h3 className="font-sans font-bold text-[16.5px] sm:text-[17.5px] text-[#112F24] leading-tight break-words">
                    {name || "Your name"}
                  </h3>
                  <ul className="mt-1 space-y-[1px] leading-[1.35] text-[12.5px] sm:text-[13px] text-[#495C51]">
                    <li className="flex items-center gap-2.5 min-w-0">
                      <Mail className="w-4 h-4 text-[#0F5E3C] shrink-0" />
                      <span className="truncate">{email || "—"}</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#0F5E3C] fill-[#0F5E3C] shrink-0" />
                      {phone || "—"}
                    </li>
                    <li className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-[#0F5E3C] fill-[#0F5E3C] stroke-[#0F5E3C] shrink-0 [&>circle]:fill-white" />
                      {location || "—"}
                    </li>
                  </ul>
                  {photoRequired && !photoFile && (
                    <p className="mt-1.5 text-[11.5px] font-medium text-[#B45309]">A photo is required for this position.</p>
                  )}
                </div>
              </div>

              {/* Position */}
              <div className="rounded-xl border border-[#ECE7DC] bg-white/95 shadow-[0_4px_18px_rgba(0,0,0,0.04)] px-3 py-2 flex items-center gap-3.5">
                <div className="w-[44px] h-[44px] rounded-lg bg-white border border-[#ECE7DC] shadow-sm flex items-center justify-center shrink-0">
                  <DoctorIcon className="w-8 h-8 text-[#0F5E3C]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-sans font-bold text-[16.5px] sm:text-[17.5px] text-[#112F24] leading-tight">{title}</h3>
                  {(employmentType || job?.educationRequirements) && (
                    <p className="text-[12.5px] sm:text-[13px] text-[#495C51] mt-0.5">
                      {[employmentType, job?.educationRequirements].filter(Boolean).join("  |  ")}
                    </p>
                  )}
                  {job?.location && (
                    <p className="flex items-center gap-1.5 text-[12px] sm:text-[12.5px] text-[#495C51] mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#F29A1F] fill-[#F29A1F] [&>circle]:fill-white" />
                      {job.location}
                    </p>
                  )}
                </div>
              </div>

              {/* Profile Match (only when the CV was screened and the job shows scores) */}
              {showScore && (
                <div className="rounded-xl border border-[#ECE7DC] bg-white/95 shadow-[0_4px_18px_rgba(0,0,0,0.04)] px-2.5 py-2 flex items-center gap-4">
                  <div className="relative w-[96px] h-[96px] shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                      <defs>
                        <linearGradient id="completeMatchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#B8D35A" />
                          <stop offset="40%" stopColor="#2E9A4F" />
                          <stop offset="100%" stopColor="#0F6B3E" />
                        </linearGradient>
                      </defs>
                      <circle cx="60" cy="60" r={radius} stroke="#E6EFE6" strokeWidth="11" fill="none" />
                      <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        stroke="url(#completeMatchGrad)"
                        strokeWidth="11"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        fill="none"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center font-sans font-extrabold text-[23px] text-[#0D3226]">{matchScore}%</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
                      <h3 className="font-sans font-bold text-[16px] sm:text-[17px] text-[#0D3226] leading-tight">Profile Match</h3>
                      <span className="flex items-center gap-1.5 rounded-md bg-white border border-[#ECE7DC] px-2 py-0.5 text-[12px] sm:text-[12.5px] font-bold text-[#0D3226] shadow-sm">
                        <Star className="w-4 h-4 text-[#F2A71B] fill-[#F2A71B]" />
                        {matchLabel}
                      </span>
                    </div>
                    <p className="mt-1 text-[12.5px] sm:text-[13px] text-[#495C51] leading-snug">
                      Based on skills, experience and qualifications derived from your CV.
                    </p>
                  </div>
                </div>
              )}

              {/* Before You Submit + actions */}
              <div className="rounded-xl border border-[#ECE7DC] bg-white/95 shadow-[0_4px_18px_rgba(0,0,0,0.04)] px-3 pt-2.5 pb-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F7CD5E] flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-[#0F5E3C] fill-white stroke-[2.2]" />
                  </div>
                  <h3 className="font-sans font-bold text-[16px] sm:text-[17px] text-[#0D3226] leading-tight">Before You Submit</h3>
                </div>
                <div className="mt-1.5 pl-[44px] space-y-[5px] text-[12.5px] sm:text-[13px] font-medium text-[#3D5045]">
                  <GreenCheckbox checked={terms.correct} onChange={(v) => setTerms({ ...terms, correct: v })}>
                    <span>
                      I confirm that all the information provided is correct and complete.<span className="text-[#E0262B] ml-1">*</span>
                    </span>
                  </GreenCheckbox>
                  <GreenCheckbox checked={terms.authorize} onChange={(v) => setTerms({ ...terms, authorize: v })}>
                    I authorize Vaidhyashala to verify my information if required.
                  </GreenCheckbox>
                  <GreenCheckbox checked={terms.contacted} onChange={(v) => setTerms({ ...terms, contacted: v })}>
                    I agree to be contacted for future opportunities.
                  </GreenCheckbox>
                  <GreenCheckbox checked={terms.privacy} onChange={(v) => setTerms({ ...terms, privacy: v })}>
                    <span>
                      I have read and agree to the{" "}
                      <Link href="/privacy" className="text-[#1D6FD8] underline">Privacy Policy</Link> and{" "}
                      <Link href="/terms" className="text-[#1D6FD8] underline">Terms &amp; Conditions</Link>.
                      <span className="text-[#E0262B] ml-1">*</span>
                    </span>
                  </GreenCheckbox>
                </div>

                {error && (
                  <p role="alert" className="mt-2.5 rounded-md bg-[#FDECEC] px-3 py-2 text-[12.5px] font-semibold text-[#B3261E]">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting || loading}
                  className="mt-3 w-full bg-[#0E5C3D] hover:bg-[#0A472E] text-white py-2 rounded-md font-bold text-[13.5px] sm:text-[14px] flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send className="w-3.5 h-3.5 fill-white -rotate-12" />
                  {submitting ? "Submitting…" : "Submit Application"}
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.4]" />
                </button>

                <Link
                  href={backHref}
                  className="mt-1.5 w-full border border-[#ECE5D8] bg-white hover:bg-[#FAF8F3] text-[#112F24] py-1.5 rounded-md font-semibold text-[12.5px] sm:text-[13px] flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5 stroke-[2.4]" />
                  {result ? "Back to Screening Result" : "Back to Job Details"}
                </Link>

                <p className="mt-2 flex items-center justify-center gap-1.5 text-[11.5px] sm:text-[12px] text-[#495C51]">
                  <Lock className="w-3.5 h-3.5 text-[#16233F] fill-[#16233F]" />
                  Your data is secure and will only be used for recruitment purposes.
                </p>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
