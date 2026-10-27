"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Clock,
  Home,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import CareersNavbar from "@/components/careers/CareersNavbar";
import Footer from "@/components/Footer";


interface CVAnalysisViewProps {
  fileName?: string;
  fileSize?: string;
  roleTitle?: string;
  location?: string;
  employmentType?: string;
  qualification?: string;
}

type TaskStatus = "done" | "active" | "pending";

/* ---------- Solid icons for the analysis tasks ---------- */

function DocIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6.5A2.5 2.5 0 0 0 4 4.5v15A2.5 2.5 0 0 0 6.5 22h11a2.5 2.5 0 0 0 2.5-2.5V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8M8 17h8M8 9h2" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
      <circle cx="10.5" cy="10.5" r="7" />
      <path d="M15.8 15.8L21 21" strokeWidth="3.4" />
      <path d="M7.6 10.6l2 2 3.6-3.8" strokeWidth="2.4" />
    </svg>
  );
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 3a2 2 0 0 0-2 2v1H4a2 2 0 0 0-2 2v3h20V8a2 2 0 0 0-2-2h-3V5a2 2 0 0 0-2-2H9zm0 2h6v1H9V5zM2 13v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6h-8v1.5a2 2 0 0 1-4 0V13H2z" />
    </svg>
  );
}

function CapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3L1 9l11 6 9-4.9V17h2V9L12 3z" />
      <path d="M5 13.2v3.9C5 18.7 8.1 21 12 21s7-2.3 7-3.9v-3.9L12 17l-7-3.8z" />
    </svg>
  );
}

function GearIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.4 13a7.6 7.6 0 0 0 0-2l2.1-1.6-2-3.5-2.5 1a7.4 7.4 0 0 0-1.7-1L15 3.3h-4l-.4 2.6a7.4 7.4 0 0 0-1.7 1l-2.5-1-2 3.5L6.6 11a7.6 7.6 0 0 0 0 2l-2.1 1.6 2 3.5 2.5-1c.5.4 1.1.7 1.7 1l.4 2.6h4l.4-2.6c.6-.3 1.2-.6 1.7-1l2.5 1 2-3.5L19.4 13zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" />
    </svg>
  );
}

function BarsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="13" width="4.5" height="8" rx="1" />
      <rect x="9.75" y="8" width="4.5" height="13" rx="1" />
      <rect x="16.5" y="3" width="4.5" height="18" rx="1" />
    </svg>
  );
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

interface AnalysisTask {
  icon: (props: { className?: string }) => React.ReactElement;
  title: string;
  desc: string;
}

const tasks: AnalysisTask[] = [
  { icon: DocIcon, title: "Reading Your CV", desc: "Extracting key information from your profile..." },
  { icon: SearchIcon, title: "Matching Skills", desc: "Comparing with job requirements..." },
  { icon: BriefcaseIcon, title: "Checking Experience", desc: "Analyzing relevant work experience..." },
  { icon: CapIcon, title: "Verifying Education", desc: "Checking qualifications and certifications..." },
  { icon: GearIcon, title: "Analyzing Competencies", desc: "Assessing role-specific skills and expertise..." },
  { icon: BarsIcon, title: "Calculating Match Score", desc: "Generating eligibility score..." },
];

function TaskRow({ task, status }: { task: AnalysisTask; status: TaskStatus }) {
  const Icon = task.icon;
  return (
    <div className="h-[60px] rounded-xl border border-[#ECEBE4] bg-white px-3 flex items-center gap-3 shadow-[0_3px_12px_rgba(0,0,0,0.04)]">
      <div className="w-[38px] h-[38px] rounded-full bg-[#EDF5EF] flex items-center justify-center shrink-0">
        <Icon className="w-[19px] h-[19px] text-[#0F5E3C]" />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="font-semibold text-[14px] text-[#16233F] leading-tight whitespace-nowrap">{task.title}</h4>
        <p className="text-[12.5px] text-[#4B5563] leading-[1.3] mt-0.5">{task.desc}</p>
      </div>
      {status === "done" && (
        <div className="w-[18px] h-[18px] rounded-full bg-[#0F7A45] flex items-center justify-center text-white shrink-0">
          <Check className="w-3 h-3 stroke-[3.5]" />
        </div>
      )}
      {status === "active" && (
        <div className="w-[18px] h-[18px] rounded-full border-[1.5px] border-[#8E98A4] border-t-transparent animate-spin shrink-0" />
      )}
      {status === "pending" && <div className="w-[18px] h-[18px] rounded-full border-[1.5px] border-[#A9B1BB] shrink-0" />}
    </div>
  );
}

function MetaItem({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5">
      <Icon className="w-[15px] h-[15px] text-[#F29A1F] fill-[#F29A1F]/25 stroke-[2.3]" />
      <span>{children}</span>
    </span>
  );
}

export default function CVAnalysisView({
  fileName = "Vijay_Sharma_CV.pdf",
  fileSize = "2.4 MB",
  roleTitle = "Ayurvedic Doctor",
  location = "Delhi NCR",
  employmentType = "Full Time",
  qualification = "BAMS / MD (Ayurveda)",
}: CVAnalysisViewProps) {
  const [progress, setProgress] = useState(8);

  const resultQuery = `role=${encodeURIComponent(roleTitle)}&fileName=${encodeURIComponent(
    fileName
  )}&fileSize=${encodeURIComponent(fileSize)}`;

  // Result pages are opened manually from the coloured dots; no automatic redirect.
  const resultLinks = [
    { label: "Eligible", color: "#1E8E4E", href: `/careers/ai-screening-result?${resultQuery}` },
    { label: "Partial Match", color: "#F7931E", href: `/careers/partial-match?${resultQuery}` },
    { label: "Not Eligible", color: "#E0262B", href: `/careers/not-eligible?${resultQuery}` },
  ];

  // Progress ticks up to 100% over roughly 15 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(100, prev + 2);
      });
    }, 320);

    return () => clearInterval(timer);
  }, []);

  // Each task completes once progress passes its share of the analysis
  const taskStatus = (index: number): TaskStatus => {
    const doneAt = ((index + 1) / tasks.length) * 100;
    if (progress >= doneAt) return "done";
    if (progress >= (index / tasks.length) * 100) return "active";
    return "pending";
  };

  const isComplete = progress >= 100;

  const radius = 66;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  const steps = [
    { label: "Upload CV", sub: "Completed", state: "done", left: "8.5%" },
    { label: "AI Analysis", sub: "In Progress", state: "current", left: "38.5%" },
    { label: "Review Details", sub: "Pending", state: "pending", left: "64.5%" },
    { label: "Submit Application", sub: "Pending", state: "pending", left: "89.5%" },
  ];

  const nextSteps = [
    { title: "AI Profile Analysis", desc: "We analyze your CV for relevant skills, qualifications and experience." },
    { title: "Review Your Details", desc: "You may be asked to verify or add additional information if required." },
    { title: "Application Submission", desc: "Once confirmed, your application will be submitted to our team." },
    { title: "Confirmation", desc: "You will receive a confirmation email with your application details." },
  ];

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#FAF7F2] text-[#22332A] flex flex-col font-sans">
      {/* 1. TOP NAVIGATION */}
      <CareersNavbar />

      {/* 2. HERO */}
      <section className="shrink-0 relative w-full overflow-hidden bg-[#FAF7F2] min-h-[190px] lg:min-h-[210px] flex items-center z-10">
        <div className="absolute inset-0 select-none pointer-events-none">
          <Image
            src="/aisc/hei2.webp"
            alt=""
            fill
            priority
            unoptimized
            className="object-cover object-[65%_center] lg:object-[64%_center]"
          />
          <div className="absolute inset-y-0 left-0 w-full sm:w-[72%] lg:w-[60%] bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/95 via-60% to-transparent" />
          {/* Curved green swoosh along the bottom edge */}
          <svg className="absolute bottom-0 right-0 w-[62%] h-[46px]" viewBox="0 0 900 46" preserveAspectRatio="none">
            <path d="M0 46 C 260 46, 520 36, 900 2 L 900 46 Z" fill="#FAF7F2" />
            <path d="M0 46 C 260 46, 520 36, 900 2" fill="none" stroke="#2F6B3F" strokeWidth="3" />
            <path d="M120 46 C 380 44, 600 32, 900 10" fill="none" stroke="#7FA86A" strokeWidth="1.5" opacity="0.7" />
          </svg>
        </div>

        <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-[70px] py-5 z-20 flex items-center justify-between gap-4">
          <div>
            <p className="text-[14px] sm:text-[16px] font-semibold tracking-[0.12em] uppercase text-[#8A6A3A]">
              Careers at Vaidhyashala
            </p>
            <h1 className="mt-1 font-sans text-[36px] sm:text-[46px] lg:text-[54px] font-bold leading-[1.08] text-[#151A17]">
              Application in Progress
            </h1>
            <p className="mt-2 text-[16px] sm:text-[19px] text-[#1F2A24]">
              We are analyzing your profile to find the best match for this position.
            </p>
          </div>

          <div className="hidden lg:flex flex-col items-center pr-2">
            <p className="font-sans italic text-[28px] font-medium leading-[1.2] text-[#1D2A22] text-center">
              Healing
              <br />
              People
              <br />
              Enriching
              <br />
              Lives
            </p>
            <div className="mt-2 h-[2px] w-12 bg-[#C99C4B] rounded-full" />
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT */}
      <main className="relative w-full pb-8 pt-3 z-10">
        <div className="pointer-events-none absolute -left-2 sm:left-0 top-0 bottom-0 z-0 w-36 sm:w-52 md:w-64 lg:w-80 select-none">
          <Image src="/resumepage/s1.webp" alt="" fill unoptimized className="object-contain object-left mix-blend-multiply" />
        </div>
        <div className="pointer-events-none absolute -right-2 sm:right-0 top-0 bottom-0 z-0 w-36 sm:w-52 md:w-64 lg:w-80 select-none">
          <Image src="/resumepage/s2.webp" alt="" fill unoptimized className="object-contain object-right mix-blend-multiply" />
        </div>

        <div className="relative mx-auto w-full max-w-[1536px] px-4 sm:px-6 lg:pl-[95px] lg:pr-[86px] z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_440px] gap-5 lg:gap-[22px] items-start">
            {/* ================= LEFT COLUMN ================= */}
            <div className="flex flex-col min-w-0">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-2.5 text-[15px] sm:text-[16px] text-[#1F2A44] pl-[23px]">
                <Link href="/" className="text-[#0F5E3C] hover:opacity-80">
                  <Home className="w-[18px] h-[18px] fill-[#0F5E3C]" />
                </Link>
                <ChevronRight className="w-4 h-4 text-[#4B5563]" />
                <Link href="/careers" className="hover:text-[#0F5E3C]">
                  Careers
                </Link>
                <ChevronRight className="w-4 h-4 text-[#4B5563]" />
                <Link href="/careers/apply" className="hover:text-[#0F5E3C]">
                  Apply for Position
                </Link>
                <ChevronRight className="w-4 h-4 text-[#0F5E3C] stroke-[3] ml-2" />
                <span aria-current="page">CV Analysis</span>
              </nav>

              {/* Process Stepper */}
              <div className="relative h-[72px] mt-3">
                <div className="absolute top-[13px] left-[8.5%] right-[10.5%] h-[2px] bg-[#C9D0D8]">
                  <div className="h-full bg-[#1E8A4C] w-[37.1%]" />
                </div>
                {steps.map((step, idx) => (
                  <div
                    key={step.label}
                    className="absolute top-0 -translate-x-1/2 flex flex-col items-center text-center whitespace-nowrap"
                    style={{ left: step.left }}
                  >
                    {step.state === "pending" ? (
                      <div className="w-7 h-7 rounded-full border-2 border-[#C3CAD3] bg-white flex items-center justify-center text-[#374151] font-semibold text-[15px]">
                        {idx + 1}
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-[#0F7A45] flex items-center justify-center text-white font-semibold text-[14px] ring-[3px] ring-[#0F7A45]/15">
                        {step.state === "done" ? <Check className="w-4 h-4 stroke-[3.5]" /> : idx + 1}
                      </div>
                    )}
                    <span
                      className={`mt-1.5 text-[14px] leading-tight ${
                        step.state === "pending" ? "font-medium text-[#4B5563]" : "font-semibold text-[#16233F]"
                      }`}
                    >
                      {step.label}
                    </span>
                    <span className={`text-[12.5px] mt-0.5 ${step.state === "pending" ? "text-[#8D96A3]" : "text-[#1E8A4C]"}`}>
                      {step.sub}
                    </span>
                  </div>
                ))}
              </div>

              {/* Analysis Card */}
              <div className="mt-2 rounded-2xl border border-[#EDE8DE] bg-white/90 shadow-[0_6px_28px_rgba(0,0,0,0.05)] px-[18px] pt-3.5 pb-3.5">
                {/* CV status row */}
                <div className="rounded-xl border border-[#EFEAE0] bg-[#FCFAF6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-1.5">
                  <div className="flex items-center gap-4 pl-1">
                    <div className="w-12 h-12 rounded-xl bg-[#FBEFDC] flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-[#0F5E3C]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                        <path d="M14 2v6h6" fill="#0A462C" opacity="0.45" />
                        <line x1="8" y1="12" x2="16" y2="12" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                        <line x1="8" y1="15.5" x2="16" y2="15.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                        <line x1="8" y1="19" x2="12.5" y2="19" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-sans font-bold text-[17px] text-[#16233F] truncate">{fileName}</h3>
                      <p className="text-[13.5px] text-[#374151] flex items-center gap-2.5 mt-0.5">
                        <span>Uploaded successfully</span>
                        <span className="text-[#C9D0D8]">|</span>
                        <span>PDF</span>
                        <span className="text-[#C9D0D8]">|</span>
                        <span>{fileSize}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 bg-[#EEF6EE] rounded-lg px-3 py-2 sm:w-[262px]">
                    <div className="w-[30px] h-[30px] rounded-full bg-[#0F7A45] flex items-center justify-center shrink-0 text-white">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div>
                      <span className="block font-semibold text-[15px] text-[#0F5E3C] leading-tight">CV Received</span>
                      <span className="block text-[12.5px] text-[#374151] mt-0.5 whitespace-nowrap">Our AI is now analysing your profile</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 h-px bg-[#ECE7DD]" />

                {/* Title row */}
                <div className="mt-3 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-[#F0A030] fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M12 0L14.4 9.6L24 12L14.4 14.4L12 24L9.6 14.4L0 12L9.6 9.6L12 0Z" />
                      </svg>
                      <h2 className="font-sans text-[21px] sm:text-[23px] font-bold text-[#16233F] leading-tight">
                        AI Analysis in Progress
                      </h2>
                    </div>
                    <p className="mt-0.5 sm:pl-9 text-[14px] text-[#374151]">
                      Please wait while we analyze your profile against the job requirements.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-[#374151] shrink-0 sm:pr-5">
                    <div className="w-8 h-8 rounded-full border border-[#E4E1D8] bg-white flex items-center justify-center">
                      <Clock className="w-4 h-4 text-[#374151] stroke-[2]" />
                    </div>
                    <span className="text-[13px] leading-[1.4]">
                      This usually takes
                      <br />
                      10 – 20 seconds
                    </span>
                  </div>
                </div>

                {/* Tasks + gauge */}
                <div className="mt-3 grid grid-cols-1 md:grid-cols-[minmax(0,268px)_1fr_minmax(0,268px)] gap-3 md:gap-0 items-center">
                  <div className="flex flex-col gap-2.5">
                    {tasks.slice(0, 3).map((task, i) => (
                      <TaskRow key={task.title} task={task} status={taskStatus(i)} />
                    ))}
                  </div>

                  {/* Gauge with dashed connectors */}
                  <div className="relative h-[200px] flex items-center justify-center">
                    <svg className="hidden md:block absolute left-0 top-0 h-full w-full pointer-events-none" viewBox="0 0 300 260" preserveAspectRatio="none" fill="none">
                      {[
                        "M2 38 C 22 38, 26 60, 40 72",
                        "M2 130 L 26 130",
                        "M2 222 C 22 222, 26 200, 40 188",
                        "M298 38 C 278 38, 274 60, 260 72",
                        "M298 130 L 274 130",
                        "M298 222 C 278 222, 274 200, 260 188",
                      ].map((d) => (
                        <path key={d} d={d} stroke="#8DBB9E" strokeWidth="1.2" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
                      ))}
                    </svg>

                    <div className="relative w-[184px] h-[184px]">
                      {/* Pale outer band */}
                      <div className="absolute inset-0 rounded-full bg-[#EAF3EA] shadow-[0_10px_30px_rgba(15,94,60,0.10)]" />
                      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 150 150">
                        <defs>
                          <linearGradient id="analysisGaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#D8B03C" />
                            <stop offset="30%" stopColor="#8DBE4E" />
                            <stop offset="65%" stopColor="#1E8A4C" />
                            <stop offset="100%" stopColor="#0F6B3E" />
                          </linearGradient>
                        </defs>
                        <circle cx="75" cy="75" r={radius} stroke="#DCEBDC" strokeWidth="6" fill="none" />
                        <circle
                          cx="75"
                          cy="75"
                          r={radius}
                          stroke="url(#analysisGaugeGrad)"
                          strokeWidth="6"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                          fill="none"
                          className="transition-all duration-500 ease-out"
                        />
                      </svg>
                      {/* White inner disc */}
                      <div className="absolute inset-[16px] rounded-full bg-white shadow-[inset_0_0_0_1px_#EEF3EE,0_2px_10px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center text-center px-4 select-none">
                        {isComplete ? (
                          <Check className="w-6 h-6 text-[#0F7A45] stroke-[3] mb-1" />
                        ) : (
                          <svg className="w-6 h-5 mb-0.5" viewBox="0 0 32 28" fill="none">
                            <path d="M6 22c0-8 5-13 13-14-1 8-6 13-13 14z" fill="#0F7A45" />
                            <path d="M6 22l7-7" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                            <path d="M17 12c3-4 7-5 10-5-1 4-4 7-9 7" fill="#2E9A57" />
                            <path d="M20 22l7-9M21 15l5 6" stroke="#0F7A45" strokeWidth="2.2" strokeLinecap="round" />
                          </svg>
                        )}
                        <span className={`font-bold text-[#16233F] leading-none ${isComplete ? "text-[29px]" : "text-[32px]"}`}>
                          {progress}%
                        </span>
                        <span className="font-semibold text-[15px] text-[#16233F] mt-1">
                          {isComplete ? "Analysis Complete!" : "Analyzing..."}
                        </span>
                        <span className="text-[11.5px] text-[#374151] leading-snug mt-1 max-w-[120px]">
                          {isComplete ? "Your result is ready" : "Extracting skills, experience and qualifications"}
                        </span>
                      </div>

                      {/* Leaves around the ring */}
                      <Image src="/career/leaf.webp" alt="" width={34} height={34} unoptimized className="absolute -top-2 right-0 w-[28px] h-[28px] -rotate-[20deg] pointer-events-none" />
                      <Image src="/career/leaf.webp" alt="" width={30} height={30} unoptimized className="absolute bottom-0 -left-2 w-[24px] h-[24px] rotate-[200deg] pointer-events-none" />
                      <Image src="/career/leaf.webp" alt="" width={32} height={32} unoptimized className="absolute bottom-1 -right-3 w-[26px] h-[26px] rotate-[100deg] pointer-events-none" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    {tasks.slice(3).map((task, i) => (
                      <TaskRow key={task.title} task={task} status={taskStatus(i + 3)} />
                    ))}
                  </div>
                </div>

                {/* Keep page open notice + result shortcuts */}
                <div className="mt-3.5 rounded-xl bg-gradient-to-r from-[#F1F7EE] to-[#E8F2E4] border border-[#DDEBDB] pl-5 pr-4 py-2.5 flex items-center justify-between gap-3 relative overflow-hidden">
                  <div className="flex items-center gap-3.5 z-10">
                    <div className="w-11 h-11 rounded-full bg-[#FFF6E2] flex items-center justify-center shrink-0 p-2 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                      <Image src="/aisc/bulb.webp" alt="" width={40} height={40} unoptimized className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[15.5px] text-[#0F6B3E]">
                        {isComplete ? "Analysis Complete!" : "Please keep this page open"}
                      </h4>
                      <p className="text-[13.5px] text-[#374151] leading-[1.4] max-w-[560px]">
                        {isComplete
                          ? "Your profile screening is ready. Choose a result to continue."
                          : "Do not refresh or close this page while the analysis is in progress. You will be automatically redirected to the next step once the analysis is complete."}
                      </p>
                    </div>
                  </div>

                  {/* Result shortcuts: eligible / partial / not eligible */}
                  <div className="z-10 flex items-center gap-2 shrink-0 mr-16 sm:mr-20">
                    {resultLinks.map((r) => (
                      <Link
                        key={r.label}
                        href={r.href}
                        title={r.label}
                        aria-label={r.label}
                        className="w-4 h-4 rounded-full ring-2 ring-white shadow-sm hover:scale-125 transition-transform"
                        style={{ backgroundColor: r.color }}
                      />
                    ))}
                  </div>

                  <div className="absolute -bottom-4 -right-3 w-20 sm:w-24 pointer-events-none select-none z-0">
                    <Image src="/resumepage/re2.webp" alt="" width={120} height={120} unoptimized className="w-full h-auto object-contain mix-blend-multiply" />
                  </div>
                </div>
              </div>
            </div>

            {/* ================= RIGHT COLUMN ================= */}
            <div className="lg:mt-[20px] relative">
              <div className="rounded-2xl border border-[#EDE8DE] bg-white/95 shadow-[0_6px_28px_rgba(0,0,0,0.05)] overflow-hidden relative">
                {/* Banner: Together for a Healthier Tomorrow */}
                <div className="h-[118px] w-full relative overflow-hidden bg-[#0B3A26]">
                  <Image
                    src="/car2/02_dark_herbal_mortar_banner.webp"
                    alt=""
                    fill
                    unoptimized
                    priority
                    className="object-cover object-right"
                  />
                  <div className="absolute inset-y-0 left-0 w-[62%] bg-gradient-to-r from-[#0A3322] via-[#0A3322]/85 to-transparent" />
                  <div className={`absolute left-5 top-[16px] -rotate-[10deg] text-white text-[24px] font-semibold leading-[1.12]`}>
                    <span className="block pl-2">Together</span>
                    <span className="block">for a Healthier</span>
                    <span className="block pl-6">Tomorrow</span>
                    <span className="block ml-12 mt-1 h-[2px] w-16 bg-[#D4AF37] rounded-full" />
                  </div>
                </div>

                {/* Position Applied For */}
                <div className="px-4 pt-3 pb-3 flex items-start gap-3">
                  <DoctorIcon className="w-[46px] h-[46px] text-[#0F5E3C] shrink-0 mt-1" />
                  <div className="min-w-0 pl-1">
                    <p className="text-[13px] text-[#16233F]">Position Applied For</p>
                    <h3 className="font-sans text-[22px] font-bold text-[#0F5E3C] leading-tight">{roleTitle}</h3>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-[#16233F] whitespace-nowrap">
                      <MetaItem icon={MapPin}>{location}</MetaItem>
                      <span className="text-[#D1D5DB]">|</span>
                      <MetaItem icon={BriefcaseBusiness}>{employmentType}</MetaItem>
                      <span className="text-[#D1D5DB]">|</span>
                      <span className="flex items-center gap-1.5">
                        <BarsIcon className="w-4 h-4 text-[#F29A1F]" />
                        <span>{qualification}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mx-4 h-px bg-[#ECE7DD]" />

                {/* What Happens Next? */}
                <div className="px-4 pt-3 pb-5 relative z-10">
                  <h3 className="font-sans text-[20px] font-bold text-[#16233F]">What Happens Next?</h3>

                  <ol className="mt-3 max-w-[300px]">
                    {nextSteps.map((step, idx) => {
                      const active = idx === 0;
                      const last = idx === nextSteps.length - 1;
                      return (
                        <li key={step.title} className="relative flex gap-3 pb-3.5 last:pb-0">
                          {!last && (
                            <span
                              className={`absolute left-[12px] top-[28px] bottom-[2px] border-l-2 border-dashed ${
                                active ? "border-[#1E8A4C]" : "border-[#CBD2D9]"
                              }`}
                            />
                          )}
                          <span
                            className={`w-[26px] h-[26px] rounded-full flex items-center justify-center shrink-0 text-white text-[13px] font-semibold ${
                              active ? "bg-[#1E8A4C] ring-4 ring-[#1E8A4C]/15" : "bg-[#BFC5CC]"
                            }`}
                          >
                            {idx + 1}
                          </span>
                          <div className="pt-0.5">
                            <h4 className={`text-[15px] font-semibold leading-tight ${active ? "text-[#1E8A4C]" : "text-[#16233F]"}`}>
                              {step.title}
                            </h4>
                            <p className="text-[13.5px] text-[#4B5563] leading-[1.35] mt-0.5">{step.desc}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>

              {/* Zen stones overlapping the card's bottom-right corner */}
              <div className="hidden lg:block absolute -bottom-10 -right-[80px] w-[150px] pointer-events-none select-none z-20">
                <Image
                  src="/car2/04_zen_stones_and_leaves.webp"
                  alt="Authentic Ayurveda for a Brighter Tomorrow"
                  width={190}
                  height={234}
                  unoptimized
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 4. FOOTER */}
      <Footer />
    </div>
  );
}
