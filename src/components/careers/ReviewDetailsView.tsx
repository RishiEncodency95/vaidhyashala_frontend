"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Briefcase,
  BriefcaseBusiness,
  Camera,
  ChartColumn,
  Check,
  ChevronRight,
  FileText,
  GraduationCap,
  Home,
  Leaf,
  Lock,
  MapPin,
  Pencil,
  Settings,
  Star,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import CareersNavbar from "@/components/careers/CareersNavbar";
import Footer from "@/components/Footer";


interface ReviewDetailsViewProps {
  roleTitle?: string;
  fileName?: string;
  fileSize?: string;
  location?: string;
  employmentType?: string;
  qualification?: string;
  matchScore?: number;
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

function BarsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="13" width="4.5" height="8" rx="1" />
      <rect x="9.75" y="8" width="4.5" height="13" rx="1" />
      <rect x="16.5" y="3" width="4.5" height="18" rx="1" />
    </svg>
  );
}

function EditPill({ href = "#" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1 text-[13px] sm:text-[13.5px] font-semibold text-[#1877F2] hover:text-[#0D65D9] hover:underline transition-colors shrink-0"
    >
      <Pencil className="w-3.5 h-3.5" />
      <span>Edit</span>
    </Link>
  );
}

function CardHeader({ icon: Icon, title, editHref }: { icon: LucideIcon; title: string; editHref?: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-6.5 h-6.5 rounded-full bg-[#0D5B3A] flex items-center justify-center shrink-0">
          <Icon className="w-3.5 h-3.5 text-white stroke-[2.4]" />
        </div>
        <h3 className="font-sans font-bold text-[16px] sm:text-[17px] text-[#0D3226] leading-tight whitespace-nowrap">{title}</h3>
      </div>
      <EditPill href={editHref} />
    </div>
  );
}

const cardClass =
  "rounded-xl border border-[#ECE7DC] bg-white/90 shadow-[0_4px_18px_rgba(0,0,0,0.04)]";

export default function ReviewDetailsView({
  roleTitle = "Ayurvedic Doctor",
  fileName = "Resume.pdf",
  fileSize = "2.4 MB",
  location = "Delhi NCR",
  employmentType = "Full Time",
  qualification = "BAMS / MD (Ayurveda)",
  matchScore = 85,
}: ReviewDetailsViewProps) {
  const query = `role=${encodeURIComponent(roleTitle)}&fileName=${encodeURIComponent(fileName)}&fileSize=${encodeURIComponent(fileSize)}`;
  const applyHref = `/careers/apply?role=${encodeURIComponent(roleTitle)}`;

  const steps = [
    { label: "Upload CV", sub: "Completed", state: "done", left: "12.9%" },
    { label: "AI Analysis", sub: "Completed", state: "done", left: "37.4%" },
    { label: "Review Details", sub: "Current Step", state: "current", left: "60.8%" },
    { label: "Submit Application", sub: "Next", state: "next", left: "85.4%" },
  ];

  const profile = [
    ["Full Name", "Dr. Ananya Sharma"],
    ["Email Address", "ananya.sharma@gmail.com"],
    ["Mobile Number", "+91 98765 43210"],
    ["Date of Birth", "14 Nov 1995"],
    ["Gender", "Female"],
    ["Current Location", "Delhi NCR"],
    ["Permanent Address", "B-101, Green Park,\nNew Delhi – 110016"],
  ];

  const position = [
    ["Position Applied For", roleTitle, "Location Preference", location],
    ["Employment Type", employmentType, "Expected Joining", "Within 30 Days"],
    ["Expected Salary (CTC)", "As per company norms", "Notice Period", "30 Days"],
    ["How did you hear about us?", "Company Website", "Willing to Relocate?", "Yes"],
  ];

  const education = [
    ["BAMS", "Delhi University", "2014", "78%", "Ayurveda"],
    ["MD (Ayurveda)", "Banaras Hindu University", "2018", "82%", "Kayachikitsa"],
    ["Certification", "CCRAS", "2019", "-", "Panchkarma"],
  ];

  const experience = [
    ["Ayurveda Wellness Clinic", "Consultant Ayurvedic Doctor", "2022 – Present\n(2.5 Years)", "Ayurvedic consultation, Panchkarma therapies, patient management"],
    ["Swasthya Ayurved Center", "Ayurvedic Physician", "2019 – 2022\n(3 Years)", "OPD, Panchkarma, diet plan, lifestyle counselling"],
    ["Ayurveda Hospital", "Junior Ayurvedic Doctor", "2018 – 2019\n(1 Year)", "Patient consultation, case documentation"],
  ];

  const skills: [string, number][] = [
    ["Ayurvedic Consultation", 95],
    ["Panchkarma Therapies", 88],
    ["Patient Counselling", 90],
    ["Diet & Lifestyle Guidance", 85],
    ["Clinical Documentation", 80],
    ["Herbal Medicine Knowledge", 80],
    ["Yoga Therapy", 75],
    ["Communication Skills", 90],
  ];

  const certifications = [
    "BAMS – Delhi University",
    "MD (Ayurveda) – BHU",
    "Panchkarma Certification – CCRAS",
    "Ayush Medical Registration – Active",
    "Basic Life Support (BLS) – 2023",
  ];

  const documents = [
    `Resume.pdf (${fileSize})`,
    "Academic Certificates.pdf (3.1 MB)",
    "Experience Letter.pdf (1.8 MB)",
    "Medical Registration.pdf (1.2 MB)",
    "Panchkarma Certificate.pdf (1.5 MB)",
    "ID Proof (Aadhaar).pdf (0.8 MB)",
  ];

  const strengths = [
    "Relevant Ayurvedic qualification (BAMS/MD)",
    "Clinical experience in Ayurvedic consultation",
    "Knowledge of Panchkarma therapies",
    "Good patient communication skills",
    "Documentation and medical record keeping",
  ];

  const improvements = [
    "More experience in advanced Panchkarma procedures",
    "Exposure to research or publications",
    "Experience with hospital/clinic management",
  ];

  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (matchScore / 100) * circumference;

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#FAF7F2] text-[#22332A] flex flex-col font-sans">
      {/* 1. TOP NAVIGATION */}
      <CareersNavbar />

      {/* 2. HERO */}
      <section className="shrink-0 relative w-full overflow-hidden bg-[#FAF7F2] min-h-[110px] sm:min-h-[125px] lg:min-h-[135px] flex items-center z-10">
        <div className="absolute inset-0 select-none pointer-events-none">
          <Image src="/aisc/hei2.webp" alt="" fill priority unoptimized className="object-cover object-[65%_center] lg:object-[64%_center]" />
          <div className="absolute inset-y-0 left-0 w-full sm:w-[72%] lg:w-[60%] bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/95 via-60% to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-[1536px] px-4 sm:px-6 lg:pl-[122px] lg:pr-[60px] py-2.5 sm:py-3.5 z-20 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11.5px] sm:text-[12px] font-bold tracking-[0.14em] uppercase text-[#8C7A5B] mb-1">
              Careers at Vaidhyashala
            </p>
            <h1 className="font-sans text-[26px] sm:text-[30px] lg:text-[34px] font-bold leading-[1.1] tracking-[-0.015em] text-[#0F382B]">
              Review Your Details
            </h1>
            <p className="mt-1 text-[13.5px] sm:text-[14.5px] font-medium leading-[1.4] text-[#4A5950]">
              Please review your information below before submitting your application.
            </p>
          </div>

          <div className="hidden lg:flex flex-col items-center pr-2">
            <p className="font-sans italic text-[21px] xl:text-[24px] font-medium leading-[1.15] text-[#133D2D] tracking-tight">
              Healing
              <br />
              People
              <br />
              Enriching
              <br />
              Lives
            </p>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT */}
      <main className="relative w-full pb-6 pt-2.5 z-10">
        <div className="pointer-events-none absolute -left-2 sm:left-0 top-0 bottom-0 z-0 w-28 sm:w-40 lg:w-56 select-none">
          <Image src="/resumepage/s1.webp" alt="" fill unoptimized className="object-contain object-left mix-blend-multiply" />
        </div>
        <div className="pointer-events-none absolute -right-2 sm:right-0 top-0 bottom-0 z-0 w-28 sm:w-40 lg:w-56 select-none">
          <Image src="/resumepage/s2.webp" alt="" fill unoptimized className="object-contain object-right mix-blend-multiply" />
        </div>

        <div className="relative mx-auto w-full max-w-[1536px] px-4 sm:px-6 lg:pl-[62px] lg:pr-[46px] z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_408px] gap-2.5 items-start">
            {/* ================= LEFT COLUMN ================= */}
            <div className="flex flex-col gap-1.5 min-w-0">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[12.5px] sm:text-[13px] text-[#475569] pl-[58px]">
                <Link href="/" className="text-[#0F5E3C] hover:opacity-80">
                  <Home className="w-4 h-4 fill-[#0F5E3C]" />
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-[#4B5563]" />
                <Link href="/careers" className="hover:text-[#0F5E3C]">Careers</Link>
                <ChevronRight className="w-3.5 h-3.5 text-[#4B5563]" />
                <Link href={applyHref} className="hover:text-[#0F5E3C]">Apply for Position</Link>
                <ChevronRight className="w-3.5 h-3.5 text-[#4B5563]" />
                <Link href={`/careers/cv-analysis?${query}`} className="hover:text-[#0F5E3C]">CV Analysis</Link>
                <ChevronRight className="w-3.5 h-3.5 text-[#4B5563]" />
                <span aria-current="page" className="font-semibold text-[#0F5E3C]">Review Details</span>
              </nav>

              {/* Process Stepper */}
              <div className="relative h-[64px]">
                <div className="absolute top-[12px] left-[12.9%] right-[14.6%] h-[2px] bg-[#C9D0D8]">
                  <div className="h-full bg-[#1E8A4C] w-[66.3%]" />
                </div>
                {steps.map((step, idx) => (
                  <div
                    key={step.label}
                    className="absolute top-0 -translate-x-1/2 flex flex-col items-center text-center whitespace-nowrap"
                    style={{ left: step.left }}
                  >
                    {step.state === "next" ? (
                      <div className="w-7 h-7 rounded-full border-2 border-[#CBD5E1] bg-white flex items-center justify-center text-[#64748B] font-semibold text-[13px] sm:text-[14px]">
                        {idx + 1}
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-[#0D5B3A] flex items-center justify-center text-white font-bold text-[13px] sm:text-[14px] shadow-xs ring-3 ring-[#0D5B3A]/15">
                        {idx + 1}
                      </div>
                    )}
                    <span
                      className={`mt-0.5 text-[13px] sm:text-[13.5px] leading-tight ${
                        step.state === "current"
                          ? "font-bold text-[#0D3226]"
                          : step.state === "next"
                            ? "font-medium text-[#475569]"
                            : "font-bold text-[#0D3226]"
                      }`}
                    >
                      {step.label}
                    </span>
                    <span className={`text-[11.5px] sm:text-[12px] leading-tight ${step.state === "next" ? "font-normal text-[#94A3B8]" : step.state === "current" ? "font-semibold text-[#1E7F4E]" : "font-medium text-[#1E7F4E]"}`}>
                      {step.sub}
                    </span>
                  </div>
                ))}
              </div>

              {/* Row 1: Candidate Profile + Position Details */}
              <div className="grid grid-cols-1 md:grid-cols-[523fr_465fr] gap-1.5">
                <div className={`${cardClass} px-4 pt-3 pb-3.5`}>
                  <CardHeader icon={UserRound} title="Candidate Profile" editHref={applyHref} />
                  <div className="mt-2 flex flex-col sm:flex-row gap-4">
                    <div className="relative w-full sm:w-[172px] h-[172px] rounded-lg overflow-hidden shrink-0 bg-[#EDF2EE]">
                      <Image src="/aisc/ananya.webp" alt="Dr. Ananya Sharma" fill unoptimized className="object-cover object-top" />
                      <button
                        type="button"
                        className="absolute left-2 bottom-2 flex items-center gap-1.5 rounded-md bg-white/95 px-2 py-1 text-[11.5px] font-semibold text-[#112F24] shadow-sm hover:bg-white"
                      >
                        <Camera className="w-3.5 h-3.5 text-[#0F5E3C]" />
                        Change Photo
                      </button>
                    </div>
                    <dl className="flex-1 min-w-0 text-[12.5px] sm:text-[13px]">
                      {profile.map(([label, value], i) => (
                        <div
                          key={label}
                          className={`grid grid-cols-[138px_1fr] gap-2 py-[2.5px] leading-[1.45] ${i < profile.length - 1 ? "border-b border-[#EEEAE2]" : ""}`}
                        >
                          <dt className="text-[#41536F] font-normal">{label}</dt>
                          <dd className="font-semibold text-[#183153] whitespace-pre-line">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                <div className={`${cardClass} px-4 pt-3 pb-3.5`}>
                  <CardHeader icon={BriefcaseBusiness} title="Position Details" editHref={applyHref} />
                  <div className="mt-2">
                    {position.map(([l1, v1, l2, v2], i) => (
                      <div
                        key={l1}
                        className={`grid grid-cols-2 gap-4 py-[4.5px] ${i < position.length - 1 ? "border-b border-[#EEEAE2]" : ""}`}
                      >
                        <div>
                          <p className="text-[12px] sm:text-[12.5px] text-[#41536F]">{l1}</p>
                          <p className="text-[12.5px] sm:text-[13px] font-semibold text-[#183153]">{v1}</p>
                        </div>
                        <div>
                          <p className="text-[12px] sm:text-[12.5px] text-[#41536F]">{l2}</p>
                          <p className="text-[12.5px] sm:text-[13px] font-semibold text-[#183153]">{v2}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 2: Education + Work Experience */}
              <div className="grid grid-cols-1 md:grid-cols-[476fr_509fr] gap-1.5">
                <div className={`${cardClass} px-3 pt-3 pb-3.5`}>
                  <div className="px-1">
                    <CardHeader icon={GraduationCap} title="Education Details" editHref={applyHref} />
                  </div>
                  <div className="mt-2.5 overflow-x-auto">
                    <table className="w-full border border-[#E6E2D8] text-[12px] text-[#112F24]">
                      <thead className="bg-[#F6F4EF]">
                        <tr>
                          {["Qualification", "Institute / University", "Year", "Percentage", "Specialization"].map((h) => (
                            <th key={h} className="border border-[#E6E2D8] px-2.5 py-[7px] text-left font-bold whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {education.map((row) => (
                          <tr key={row[0]}>
                            {row.map((cell, i) => (
                              <td key={i} className={`border border-[#E6E2D8] px-2.5 py-[10px] text-[#495C51] font-medium whitespace-nowrap ${i === 1 ? "text-[11.5px] tracking-[-0.01em]" : ""} ${i === 3 ? "text-center" : ""}`}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className={`${cardClass} px-3 pt-3 pb-3.5`}>
                  <div className="px-1">
                    <CardHeader icon={Briefcase} title="Work Experience" editHref={applyHref} />
                  </div>
                  <div className="mt-2.5 overflow-x-auto">
                    <table className="w-full border border-[#E6E2D8] text-[12px] text-[#112F24]">
                      <thead className="bg-[#F6F4EF]">
                        <tr>
                          {["Organization", "Designation", "Duration", "Key Responsibilities"].map((h) => (
                            <th key={h} className="border border-[#E6E2D8] px-2.5 py-[7px] text-left font-bold whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {experience.map((row) => (
                          <tr key={row[0]}>
                            {row.map((cell, i) => (
                              <td key={i} className={`border border-[#E6E2D8] px-2 py-[3px] text-[#495C51] font-medium leading-[1.3] ${i === 2 ? "whitespace-pre" : "whitespace-pre-line"}`}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Row 3: Skills + Certifications + Additional Documents */}
              <div className="grid grid-cols-1 md:grid-cols-[356fr_305fr_317fr] gap-1.5">
                <div className={`${cardClass} px-4 pt-3 pb-3`}>
                  <CardHeader icon={Settings} title="Skills" editHref={applyHref} />
                  <ul className="mt-1.5 space-y-[1px]">
                    {skills.map(([name, value]) => (
                      <li key={name} className="grid grid-cols-[150px_1fr_34px] items-center gap-2 text-[12.5px] sm:text-[13px] font-medium text-[#3D5045]">
                        <span className="truncate">{name}</span>
                        <span className="h-[6px] rounded-full bg-[#E7EAE6] overflow-hidden">
                          <span
                            className="block h-full rounded-full"
                            style={{ width: `${value}%`, backgroundColor: value < 80 ? "#E3B23C" : "#1E7A45" }}
                          />
                        </span>
                        <span className="text-right">{value}%</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`${cardClass} px-4 pt-3 pb-3`}>
                  <CardHeader icon={Award} title="Certifications & Licenses" editHref={applyHref} />
                  <ul className="mt-1.5">
                    {certifications.map((c, i) => (
                      <li
                        key={c}
                        className={`flex items-center gap-3 py-[5px] text-[12.5px] sm:text-[13px] font-medium text-[#3D5045] ${i < certifications.length - 1 ? "border-b border-[#EEEAE2]" : ""}`}
                      >
                        <FileText className="w-4 h-4 text-[#0F5E3C] fill-[#0F5E3C]/15 shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`${cardClass} px-4 pt-3 pb-3`}>
                  <CardHeader icon={FileText} title="Additional Documents" editHref={applyHref} />
                  <ul className="mt-1.5 space-y-[3px]">
                    {documents.map((d) => (
                      <li key={d} className="flex items-center gap-3 py-[2px] text-[12.5px] sm:text-[13px] font-medium text-[#3D5045]">
                        <FileText className="w-4 h-4 text-[#0F5E3C] fill-[#0F5E3C]/15 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* ================= RIGHT COLUMN ================= */}
            <aside className={`${cardClass} overflow-hidden lg:mt-[5px]`}>
              {/* Banner */}
              <div className="h-[124px] relative overflow-hidden bg-[#0B3A26]">
                <Image src="/car2/02_dark_herbal_mortar_banner.webp" alt="" fill unoptimized priority className="object-cover object-right" />
                <div className="absolute inset-y-0 left-0 w-[62%] bg-gradient-to-r from-[#0A3322] via-[#0A3322]/80 to-transparent" />
                <div className={`absolute left-5 top-[14px] -rotate-[10deg] text-white text-[28px] font-semibold leading-[1.12]`}>
                  <span className="block pl-2">Together</span>
                  <span className="block">for a Healthier</span>
                  <span className="block pl-6">Tomorrow</span>
                </div>
              </div>

              <div className="px-4 pt-3 pb-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans font-bold text-[16px] sm:text-[17px] text-[#0D3226] leading-tight">Application Summary</h3>
                  <EditPill href={applyHref} />
                </div>

                {/* Position */}
                <div className="mt-2 flex items-start gap-3">
                  <DoctorIcon className="w-[48px] h-[48px] text-[#0F5E3C] shrink-0" />
                  <div className="min-w-0 pt-1">
                    <h4 className="font-sans font-bold text-[16.5px] sm:text-[17.5px] text-[#112F24] leading-tight">{roleTitle}</h4>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[#495C51] whitespace-nowrap">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#F29A1F] fill-[#F29A1F]/25" />
                        {location}
                      </span>
                      <span className="flex items-center gap-1">
                        <BriefcaseBusiness className="w-3.5 h-3.5 text-[#F29A1F] fill-[#F29A1F]/25" />
                        {employmentType}
                      </span>
                      <span className="flex items-center gap-1">
                        <BarsIcon className="w-3.5 h-3.5 text-[#F29A1F]" />
                        {qualification}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Profile Match */}
                <div className="mt-2.5 rounded-xl bg-[#EEF5EC] px-3 py-2.5 flex items-center gap-3.5">
                  <div className="relative w-[84px] h-[84px] shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 84 84">
                      <defs>
                        <linearGradient id="reviewMatchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#D8B03C" />
                          <stop offset="35%" stopColor="#4FA34F" />
                          <stop offset="100%" stopColor="#0F6B3E" />
                        </linearGradient>
                      </defs>
                      <circle cx="42" cy="42" r={radius} stroke="#DDE8DC" strokeWidth="8" fill="none" />
                      <circle
                        cx="42"
                        cy="42"
                        r={radius}
                        stroke="url(#reviewMatchGrad)"
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-sans font-extrabold text-[23px] text-[#0D3226] leading-none">
                        {matchScore}
                        <sup className="text-[12px] font-semibold">%</sup>
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <h4 className="font-sans font-bold text-[16px] sm:text-[17px] text-[#0D3226] leading-tight">Profile Match</h4>
                      <span className="flex items-center gap-1.5 rounded-md bg-white px-2 py-0.5 text-[12px] sm:text-[12.5px] font-bold text-[#0D3226] shadow-sm">
                        <Star className="w-3.5 h-3.5 text-[#F2A71B] fill-[#F2A71B]" />
                        Strong Match
                      </span>
                    </div>
                    <p className="mt-1 text-[12.5px] sm:text-[13px] text-[#495C51] leading-snug">
                      Your profile matches well with the job requirements.
                    </p>
                  </div>
                </div>

                {/* Key Strengths */}
                <div className="mt-2.5 rounded-xl border border-[#EEEAE2] bg-white/70 px-3 py-2 flex gap-3">
                  <Leaf className="w-6 h-6 text-[#0F5E3C] fill-[#0F5E3C] shrink-0 -rotate-12" />
                  <div>
                    <h4 className="font-sans font-bold text-[16px] sm:text-[17px] text-[#0D3226] leading-tight">Key Strengths Identified</h4>
                    <ul className="mt-1 space-y-[3px]">
                      {strengths.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-[12.5px] font-medium text-[#3D5045] whitespace-nowrap">
                          <span className="w-[14px] h-[14px] rounded-full bg-[#1E8A4C] flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
                          </span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Areas for Improvement */}
                <div className="mt-2.5 rounded-xl border border-[#EEEAE2] bg-white/70 px-3 py-2 flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FDF0DC] flex items-center justify-center shrink-0">
                    <ChartColumn className="w-5 h-5 text-[#E8901E] stroke-[2.8]" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-[16px] sm:text-[17px] text-[#0D3226] leading-tight">
                      Areas for Improvement <span className="font-sans font-normal text-[13px] text-[#495C51]">(Optional)</span>
                    </h4>
                    <ul className="mt-1 space-y-[3px]">
                      {improvements.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-[12.5px] font-medium text-[#3D5045] whitespace-nowrap">
                          <span className="w-[10px] h-[10px] rounded-full bg-[#F6B04A] ring-2 ring-[#FCE3BC] shrink-0" />
                                                    {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <Link
                  href={`/careers/complete-application?${query}`}
                  className="mt-3 w-full bg-[#0E5C3D] hover:bg-[#0A472E] text-white py-2 rounded-md font-bold text-[13.5px] sm:text-[14px] flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  Submit Application
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.4]" />
                </Link>
                <Link
                  href={`/careers/cv-analysis?${query}`}
                  className="mt-1.5 w-full border border-[#ECE5D8] bg-white hover:bg-[#FAF8F3] text-[#112F24] py-1.5 rounded-md font-semibold text-[12.5px] sm:text-[13px] flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5 stroke-[2.4]" />
                  Back to AI Analysis
                </Link>
                <p className="mt-2 flex items-center justify-center gap-1.5 text-[11.5px] sm:text-[12px] text-[#495C51]">
                  <Lock className="w-3.5 h-3.5 text-[#16233F] fill-[#16233F]" />
                  Your data is secure and will only be used for recruitment purposes.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* 4. FOOTER */}
      <Footer />
    </div>
  );
}
