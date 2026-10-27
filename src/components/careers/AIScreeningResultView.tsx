"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Check,
  Download,
  Eye,
  RotateCw,
  Edit2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  Briefcase,
  GraduationCap,
  Bookmark,
  Lock,
  Leaf,
  Users,
  FileText,
  Target,
  Sparkles,
  BarChart2,
  CheckCircle2,
  User,
} from "lucide-react";
import CareersNavbar from "@/components/careers/CareersNavbar";
import Footer from "@/components/Footer";

interface AIScreeningResultViewProps {
  candidateName?: string;
  candidateRole?: string;
  email?: string;
  phone?: string;
  location?: string;
  dob?: string;
  gender?: string;
  linkedin?: string;
  fileName?: string;
  fileSize?: string;
  uploadDate?: string;
  jobTitle?: string;
  organization?: string;
  employmentType?: string;
  experienceRequired?: string;
  qualification?: string;
  joiningPreference?: string;
  matchScore?: number;
}

export default function AIScreeningResultView({
  candidateName = "Dr. Ananya Sharma",
  candidateRole = "Ayurvedic Doctor",
  email = "ananya.sharma@gmail.com",
  phone = "+91 98765 43210",
  location = "Delhi NCR",
  dob = "14 Nov 1995",
  gender = "Female",
  linkedin = "linkedin.com/in/ananya-sharma",
  fileName = "Vijay_Sharma_CV.pdf",
  fileSize = "842 KB",
  uploadDate = "17 Oct 2026, 10:24 AM",
  jobTitle = "Ayurvedic Doctor",
  organization = "Vaidhyashala Clinic",
  employmentType = "Full Time",
  experienceRequired = "2 – 5 Years",
  qualification = "BAMS / MD (Ayurveda)",
  joiningPreference = "Within 1 Month",
  matchScore = 85,
}: AIScreeningResultViewProps) {
  const [savedForLater, setSavedForLater] = useState(false);

  // SVG Gauge Calculations for compact 78px gauge (radius 32)
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * matchScore) / 100;

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#FAF7F2] text-[#22332A] flex flex-col font-sans">
      {/* 1. TOP NAVBAR (Matches Image2 with leaves & gold underline) */}
      <CareersNavbar />      {/* 2. COMPACT HERO BANNER: Crystal-clear re1.png banner matching Apply & CV Analysis Pages */}
      <section className="shrink-0 relative w-full overflow-hidden bg-[#FAF7F2] border-b border-[#ECE6DB] min-h-[110px] sm:min-h-[125px] lg:min-h-[135px] flex items-center z-10">
        <div className="absolute inset-0 select-none pointer-events-none">
          <Image
            src="/aisc/hei2.webp"
            alt="Careers at Vaidhyashala"
            fill
            priority
            unoptimized
            className="object-cover object-[65%_center] sm:object-[68%_center] lg:object-[70%_center]"
          />
          {/* Subtle gradient overlay to ensure text contrast */}
          <div className="absolute inset-y-0 left-0 w-full sm:w-[68%] lg:w-[56%] bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/95 via-45% to-transparent pointer-events-none" />
        </div>

        {/* Hero Content - Perfectly matched with Navbar */}
        <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-12 py-2.5 sm:py-3.5 z-20 flex items-center justify-between gap-4">
          <div className="max-w-xl lg:max-w-2xl">
            {/* Back to Job Details Link */}
            <Link
              href="/careers/apply"
              className="inline-flex items-center gap-1.5 text-[13px] sm:text-[13.5px] font-semibold text-[#4A5950] hover:text-[#0D3226] transition-colors mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>Back to Job Details</span>
            </Link>

            <h1 className="font-sans text-[26px] sm:text-[30px] lg:text-[34px] font-bold leading-[1.1] tracking-[-0.015em] text-[#0F382B]">
              AI Screening Result
            </h1>
            <p className="mt-1 text-[13.5px] sm:text-[14.5px] font-medium leading-[1.4] text-[#4A5950] max-w-lg">
              Here is your profile match and analysis for the applied position.
            </p>
          </div>

          {/* Right Calligraphic Accent: Healing People Enriching Lives */}
          <div className="hidden lg:flex flex-col items-start pr-6 xl:pr-12">
            <p className="font-sans italic text-[21px] xl:text-[24px] font-medium leading-[1.15] text-[#133D2D] tracking-tight">
              Healing<br />
              People<br />
              Enriching<br />
              Lives
            </p>
            <div className="mt-1.5 h-[2px] w-12 bg-[#C99C4B] rounded-full" />
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT: Framed with s1.png & s2.png side background botanicals */}
      <main className="relative w-full pb-2 sm:pb-3 pt-1 sm:pt-1.5 z-10 overflow-visible">
        {/* Left Side Botanical Background: s1.png */}
        <div className="pointer-events-none absolute -left-2 sm:left-0 top-0 bottom-0 z-0 w-28 sm:w-44 md:w-56 lg:w-72 xl:w-88 select-none flex items-center">
          <Image
            src="/resumepage/s1.webp"
            alt=""
            fill
            unoptimized
            className="object-contain object-left mix-blend-multiply opacity-85 lg:opacity-95"
          />
        </div>

        {/* Right Side Botanical Background: s2.png */}
        <div className="pointer-events-none absolute -right-2 sm:right-0 top-0 bottom-0 z-0 w-28 sm:w-44 md:w-56 lg:w-72 xl:w-88 select-none flex items-center">
          <Image
            src="/resumepage/s2.webp"
            alt=""
            fill
            unoptimized
            className="object-contain object-right mix-blend-multiply opacity-85 lg:opacity-95"
          />
        </div>

        <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-12 z-10 overflow-visible">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-1.5 items-stretch">
            {/* =================================================================
                LEFT COLUMN (8 cols):
                1. Process Stepper (Continuous line matching CV Analysis page)
                2. Eligibility Banner Card ("Great News, Dr. Ananya!" with ai3.png)
                3. Mid Row: Your Profile Match Card + Key Requirements Card
                4. Match Breakdown Card
                ================================================================= */}
            <div className="lg:col-span-8 flex flex-col gap-1.5">
              {/* Process Stepper: Compact height */}
              <div className="w-full relative py-0 px-2 sm:px-4">
                {/* Continuous Connecting Track Line directly through circle centers */}
                <div className="absolute top-[14px] sm:top-[15px] left-[12.5%] right-[12.5%] h-[2px] bg-[#CBD5E1] z-0">
                  {/* Step 1 to Step 3 active green segment (66.666% width) */}
                  <div className="h-full bg-[#0D5B3A] w-2/3" />
                </div>

                {/* 4 Steps evenly spaced across columns */}
                <div className="relative z-10 grid grid-cols-4 w-full">
                  {/* Step 1: Upload CV (Completed) */}
                  <Link
                    href={`/careers/apply?role=${encodeURIComponent(jobTitle)}`}
                    className="flex flex-col items-center text-center group cursor-pointer"
                  >
                    <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-[#0D5B3A] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div className="mt-0.5">
                      <span className="block font-bold text-[13px] sm:text-[13.5px] text-[#0D3226] group-hover:text-[#0D5B3A] leading-tight">
                        Upload CV
                      </span>
                      <span className="block text-[11.5px] sm:text-[12px] font-medium text-[#1E7F4E] leading-tight">
                        Completed
                      </span>
                    </div>
                  </Link>

                  {/* Step 2: AI Analysis (Completed) */}
                  <Link
                    href={`/careers/cv-analysis?role=${encodeURIComponent(jobTitle)}&fileName=${encodeURIComponent(fileName)}&fileSize=${encodeURIComponent(fileSize)}`}
                    className="flex flex-col items-center text-center group cursor-pointer"
                  >
                    <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-[#0D5B3A] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div className="mt-0.5">
                      <span className="block font-bold text-[13px] sm:text-[13.5px] text-[#0D3226] group-hover:text-[#0D5B3A] leading-tight">
                        AI Analysis
                      </span>
                      <span className="block text-[11.5px] sm:text-[12px] font-medium text-[#1E7F4E] leading-tight">
                        Completed
                      </span>
                    </div>
                  </Link>

                  {/* Step 3: Eligibility Result (Current Step - Active) */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-[#0D5B3A] flex items-center justify-center text-white font-bold text-[13px] sm:text-[14px] shadow-xs ring-3 ring-[#0D5B3A]/15">
                      3
                    </div>
                    <div className="mt-0.5">
                      <span className="block font-bold text-[13px] sm:text-[13.5px] text-[#0D3226] leading-tight">
                        Eligibility Result
                      </span>
                      <span className="block text-[11.5px] sm:text-[12px] font-semibold text-[#1E7F4E] leading-tight">
                        Current Step
                      </span>
                    </div>
                  </div>

                  {/* Step 4: Apply for Job (Next) */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full border-2 border-[#CBD5E1] bg-white flex items-center justify-center text-[#64748B] font-semibold text-[13px] sm:text-[14px]">
                      4
                    </div>
                    <div className="mt-0.5">
                      <span className="block font-medium text-[13px] sm:text-[13.5px] text-[#475569] leading-tight">
                        Apply for Job
                      </span>
                      <span className="block text-[11.5px] sm:text-[12px] font-normal text-[#94A3B8] leading-tight">
                        Next
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 1: Eligibility Banner ("Great News, Dr. Ananya!") - Wide middle section, single-row buttons */}
              <div className="rounded-md border-2 border-white bg-[#EDF4EC] shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden relative min-h-[175px] sm:min-h-[185px] flex items-center">
                {/* Right side artwork: ai3.png showing Together for a Healthier Tomorrow & Ayurvedic elements */}
                <div className="absolute right-0 top-0 bottom-0 w-[20%] sm:w-[18%] md:w-[16%] z-0 select-none pointer-events-none">
                  <Image
                    src="/aisc/ai3.webp"
                    alt="Together for a Healthier Tomorrow"
                    fill
                    priority
                    unoptimized
                    className="object-cover object-right"
                  />
                  {/* Subtle fade on the left edge of ai3.png matching the card's sage green tone */}
                  <div
                    className="absolute inset-y-0 left-0 w-16 select-none pointer-events-none"
                    style={{
                      background: "linear-gradient(to right, #EDF4EC 0%, rgba(237, 244, 236, 0) 100%)",
                    }}
                  />
                </div>

                {/* Dr. Ananya image on left side */}
                <div className="absolute inset-y-0 left-0 w-[24%] sm:w-[23%] md:w-[22%] z-10 select-none pointer-events-none overflow-hidden">
                  <Image
                    src="/aisc/ai2.webp"
                    alt="Dr. Ananya"
                    fill
                    priority
                    unoptimized
                    className="object-cover object-left"
                  />
                  {/* Seamless fade overlay blending Dr. Ananya into the card's sage green background */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to right, transparent 0%, transparent 68%, rgba(237, 244, 236, 0.7) 90%, #EDF4EC 100%)",
                    }}
                  />
                </div>

                {/* VERIFIED DOCTOR badge on bottom-left */}
                <div className="absolute bottom-2 left-2.5 sm:left-3 z-20">
                  <span className="inline-block bg-[#0E5C3D] text-white text-[10.5px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                    VERIFIED DOCTOR
                  </span>
                </div>

                {/* Middle Text Content - Generous width with single-row action buttons */}
                <div className="relative z-20 w-full py-1.5 sm:py-2 px-2.5 sm:px-3 flex flex-col justify-center ml-[24%] sm:ml-[23%] md:ml-[22%] mr-[18%] sm:mr-[16%] md:mr-[15%] min-w-0">
                  <h2 className="font-sans text-[24px] sm:text-[28px] md:text-[30px] font-extrabold text-[#0D3226] leading-[1.12]">
                    <span>Great News,</span>
                    <br />
                    <span>Dr. Ananya!</span>
                  </h2>

                  <p className="font-extrabold text-[14px] sm:text-[14.5px] text-[#0E5C3D] mt-0.5 tracking-tight leading-tight">
                    You are eligible to apply for this position.
                  </p>

                  <p className="text-[12.5px] sm:text-[13px] text-[#4F6456] leading-[1.35] mt-1 tracking-wide [word-spacing:0.16em] max-w-xl">
                    Your profile meets the key requirements for Ayurvedic Doctor at Vaidhyashala. We encourage you to complete your application and join our mission of making authentic Ayurveda accessible to more people.
                  </p>

                  {/* Buttons Row - Guaranteed single row */}
                  <div className="flex items-center gap-2 sm:gap-2.5 mt-2 flex-nowrap overflow-x-auto no-scrollbar">
                    <Link
                      href={`/careers/review-details?role=${encodeURIComponent(jobTitle)}&fileName=${encodeURIComponent(fileName)}&fileSize=${encodeURIComponent(fileSize)}`}
                      className="bg-[#0E5C3D] hover:bg-[#0A472E] text-white px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-md font-bold text-[12.5px] sm:text-[13px] flex items-center gap-1.5 shadow-xs transition-colors shrink-0 whitespace-nowrap"
                    >
                      <span>Continue &amp; Apply for This Job</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.4]" />
                    </Link>

                    <Link
                      href={`/careers/not-eligible?role=${encodeURIComponent(jobTitle)}&fileName=${encodeURIComponent(fileName)}&fileSize=${encodeURIComponent(fileSize)}&candidateName=${encodeURIComponent(candidateName)}`}
                      className="border border-[#CCD6D0] bg-white/95 hover:bg-white text-[#0D3226] px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md font-semibold text-[12px] sm:text-[12.5px] flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer shrink-0 whitespace-nowrap"
                    >
                      <Download className="w-3.5 h-3.5 text-[#0E5C3D] stroke-[2.2]" />
                      <span>Download Result (PDF)</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Card 2: Mid Row (Your Profile Match + Key Requirements) */}
              <div className="grid grid-cols-1 md:grid-cols-[1.38fr_1fr] gap-1.5">
                {/* 2A: Your Profile Match */}
                <div className="rounded-md border border-[#ECE5D8] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] pt-2 pb-2 px-3.5 sm:px-4 flex flex-col">
                  {/* Header: Solid dark green badge + Title */}
                  <div className="flex items-center gap-2">
                    <div className="w-6.5 h-6.5 rounded-full bg-[#0D5B3A] flex items-center justify-center text-white shrink-0 shadow-2xs">
                      <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 20 20">
                        <rect x="2" y="10" width="3.8" height="8" rx="1.4" />
                        <rect x="8.1" y="6" width="3.8" height="12" rx="1.4" />
                        <rect x="14.2" y="2" width="3.8" height="16" rx="1.4" />
                      </svg>
                    </div>
                    <h3 className="font-sans font-bold text-[16px] sm:text-[17px] text-[#0D3226] leading-tight">
                      Your Profile Match
                    </h3>
                  </div>

                  {/* Gauge and Legend - with left padding, no top/bottom padding */}
                  <div className="flex items-center justify-start gap-3 sm:gap-4.5 mt-1 py-0 pl-2 sm:pl-3 flex-wrap sm:flex-nowrap">
                    {/* Circular Score Gauge */}
                    <div className="relative w-[100px] h-[100px] sm:w-[108px] sm:h-[108px] shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 80 80">
                        <defs>
                          <linearGradient id="scoreGaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#10B981" />
                            <stop offset="50%" stopColor="#059669" />
                            <stop offset="100%" stopColor="#047857" />
                          </linearGradient>
                        </defs>
                        <circle
                          cx="40"
                          cy="40"
                          r={radius}
                          stroke="#E2E8F0"
                          strokeWidth="7"
                          fill="transparent"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r={radius}
                          stroke="url(#scoreGaugeGrad)"
                          strokeWidth="7"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          fill="transparent"
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="font-sans text-[28px] sm:text-[31px] font-extrabold text-[#0D3226] leading-none">
                          {matchScore}%
                        </span>
                        <span className="text-[11px] sm:text-[11.5px] font-bold text-[#55695D] mt-0.5 tracking-tight">
                          Match Score
                        </span>
                      </div>
                    </div>

                    {/* Legend - increased size with word & letter spacing */}
                    <div className="space-y-1.5 text-[13.5px] sm:text-[14px] tracking-wide">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#059669] shrink-0 shadow-2xs" />
                        <span className="text-[#112F24] font-bold min-w-[74px] tracking-wide">70 – 100%</span>
                        <span className="font-extrabold text-[#0D3226] tracking-wide">Strong Match</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shrink-0 shadow-2xs" />
                        <span className="text-[#334155] font-semibold min-w-[74px] tracking-wide">50 – 69%</span>
                        <span className="font-bold text-[#334155] tracking-wide">Moderate Match</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] shrink-0 shadow-2xs" />
                        <span className="text-[#334155] font-semibold min-w-[74px] tracking-wide">Below 50%</span>
                        <span className="font-bold text-[#334155] tracking-wide">Not Eligible</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2B: You Meet the Key Requirements (widened by ~20px) */}
                <div className="rounded-md border border-[#ECE5D8] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] py-2.5 sm:py-3 px-3.5 sm:px-4 flex flex-col">
                  <div className="flex items-center gap-2">
                    <div className="w-6.5 h-6.5 rounded-full bg-[#0D5B3A] flex items-center justify-center text-white shrink-0 shadow-2xs">
                      <Target className="w-3.5 h-3.5 stroke-[2.4]" />
                    </div>
                    <h3 className="font-sans font-bold text-[16px] sm:text-[17px] text-[#0D3226] leading-tight">
                      You Meet the Key Requirements
                    </h3>
                  </div>

                  {/* Checklist items with reduced left padding by ~1rem */}
                  <div className="flex flex-col gap-1 mt-2 pl-7 sm:pl-8 md:pl-9">
                    {[
                      "Relevant Ayurvedic clinical experience",
                      "Knowledge of Panchkarma therapies",
                      "Patient consultation and treatment planning skills",
                      "Good communication and counseling skills",
                      "Documentation and medical record keeping",
                      "Willing to work from Delhi NCR",
                    ].map((req, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-full bg-[#0E5C3D] flex items-center justify-center text-white shrink-0 shadow-2xs">
                          <Check className="w-2 h-2 stroke-[3.5]" />
                        </div>
                        <span className="text-[12.5px] sm:text-[13px] font-medium text-[#3D5045] leading-tight">
                          {req}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 3: Match Breakdown */}
              <div className="rounded-md border border-[#ECE5D8] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] py-2.5 sm:py-2.5 px-3.5 sm:px-4">
                {/* Header with reduced padding */}
                <div className="flex items-center gap-2 pb-1.5">
                  <div className="w-6.5 h-6.5 rounded-full bg-[#0D5B3A] flex items-center justify-center text-white shrink-0 shadow-2xs">
                    <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 20 20">
                      <rect x="2" y="10" width="3.8" height="8" rx="1.4" />
                      <rect x="8.1" y="6" width="3.8" height="12" rx="1.4" />
                      <rect x="14.2" y="2" width="3.8" height="16" rx="1.4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-[16.5px] sm:text-[17.5px] text-[#0D3226] leading-tight">
                      Match Breakdown
                    </h3>
                    <p className="text-[12px] sm:text-[12.5px] text-[#495C51] leading-tight mt-0.5">
                      Here&apos;s how your profile aligns with the job requirements:
                    </p>
                  </div>
                </div>

                {/* Two Separate Side-by-Side Containers with 3 Options Each */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2.5 pt-0.5">
                  {/* Container 1: Left 3 Options (Reduced top/bottom padding only) */}
                  <div className="rounded-md border border-[#ECE5D8] bg-[#FCFAF6]/60 py-1 sm:py-1.5 px-2.5 sm:px-3 flex flex-col justify-between">
                    {/* Item 1: Educational Qualification (100%) */}
                    <div className="flex items-center justify-between gap-2 py-0.5 sm:py-1">
                      <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                        <svg className="w-5.5 h-5.5 text-[#0E5C3D] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
                        </svg>
                        <div className="min-w-0">
                          <span className="font-bold text-[#112F24] text-[12.5px] sm:text-[13px] block leading-tight truncate">
                            Educational Qualification
                          </span>
                          <span className="text-[11px] sm:text-[11.5px] text-[#495C51] block leading-tight truncate mt-0.5">
                            BAMS / MD (Ayurveda)
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 ml-auto">
                        <div className="w-20 sm:w-28 md:w-32 lg:w-36 h-2 bg-[#E2E8E4] rounded-full overflow-hidden">
                          <div className="h-full bg-[#0E5C3D] rounded-full transition-all duration-500" style={{ width: "100%" }} />
                        </div>
                        <span className="font-bold text-[12.5px] sm:text-[13px] text-[#0E5C3D] w-8 sm:w-9 text-right tabular-nums">
                          100%
                        </span>
                      </div>
                    </div>

                    {/* Horizontal separator */}
                    <div className="border-b border-[#ECE5D8] my-0.5 sm:my-1" />

                    {/* Item 2: Relevant Experience (85%) */}
                    <div className="flex items-center justify-between gap-2 py-0.5 sm:py-1">
                      <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                        <svg className="w-5.5 h-5.5 text-[#0E5C3D] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 4.5C8 3.12 9.12 2 10.5 2h3c1.38 0 2.5 1.12 2.5 2.5V5h2V4.5C18 2.01 15.99 0 13.5 0h-3C8.01 0 6 2.01 6 4.5V5h2V4.5z" />
                          <path d="M4 5h16c1.1 0 2 .9 2 2v3H2V7c0-1.1.9-2 2-2z" />
                          <path d="M2 12h8.5v1.5h3V12H22v6.5c0 1.38-1.12 2.5-2.5 2.5h-15C3.12 21 2 19.88 2 18.5V12z" />
                          <rect x="10.5" y="9.5" width="3" height="3" rx="0.5" />
                        </svg>
                        <div className="min-w-0">
                          <span className="font-bold text-[#112F24] text-[12.5px] sm:text-[13px] block leading-tight truncate">
                            Relevant Experience
                          </span>
                          <span className="text-[11px] sm:text-[11.5px] text-[#495C51] block leading-tight truncate mt-0.5">
                            Ayurvedic Consultation &amp; Treatment
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 ml-auto">
                        <div className="w-20 sm:w-28 md:w-32 lg:w-36 h-2 bg-[#E2E8E4] rounded-full overflow-hidden">
                          <div className="h-full bg-[#0E5C3D] rounded-full transition-all duration-500" style={{ width: "85%" }} />
                        </div>
                        <span className="font-bold text-[12.5px] sm:text-[13px] text-[#0E5C3D] w-8 sm:w-9 text-right tabular-nums">
                          85%
                        </span>
                      </div>
                    </div>

                    {/* Horizontal separator */}
                    <div className="border-b border-[#ECE5D8] my-0.5 sm:my-1" />

                    {/* Item 3: Panchkarma Knowledge (80%) */}
                    <div className="flex items-center justify-between gap-2 py-0.5 sm:py-1">
                      <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                        <svg className="w-5.5 h-5.5 text-[#0E5C3D] shrink-0" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
                            fill="currentColor"
                          />
                          <path
                            d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"
                            stroke="#FCFAF6"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="min-w-0">
                          <span className="font-bold text-[#112F24] text-[12.5px] sm:text-[13px] block leading-tight truncate">
                            Panchkarma Knowledge
                          </span>
                          <span className="text-[11px] sm:text-[11.5px] text-[#495C51] block leading-tight truncate mt-0.5">
                            Therapies &amp; Procedures
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 ml-auto">
                        <div className="w-20 sm:w-28 md:w-32 lg:w-36 h-2 bg-[#E2E8E4] rounded-full overflow-hidden">
                          <div className="h-full bg-[#0E5C3D] rounded-full transition-all duration-500" style={{ width: "80%" }} />
                        </div>
                        <span className="font-bold text-[12.5px] sm:text-[13px] text-[#0E5C3D] w-8 sm:w-9 text-right tabular-nums">
                          80%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Container 2: Right 3 Options (Reduced top/bottom padding only) */}
                  <div className="rounded-md border border-[#ECE5D8] bg-[#FCFAF6]/60 py-1 sm:py-1.5 px-2.5 sm:px-3 flex flex-col justify-between">
                    {/* Item 4: Patient Counselling Skills (90%) */}
                    <div className="flex items-center justify-between gap-2 py-0.5 sm:py-1">
                      <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                        <svg className="w-5.5 h-5.5 text-[#0E5C3D] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                        </svg>
                        <div className="min-w-0">
                          <span className="font-bold text-[#112F24] text-[12.5px] sm:text-[13px] block leading-tight truncate">
                            Patient Counselling Skills
                          </span>
                          <span className="text-[11px] sm:text-[11.5px] text-[#495C51] block leading-tight truncate mt-0.5">
                            Lifestyle &amp; Diet Guidance
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 ml-auto">
                        <div className="w-20 sm:w-28 md:w-32 lg:w-36 h-2 bg-[#E2E8E4] rounded-full overflow-hidden">
                          <div className="h-full bg-[#0E5C3D] rounded-full transition-all duration-500" style={{ width: "90%" }} />
                        </div>
                        <span className="font-bold text-[12.5px] sm:text-[13px] text-[#0E5C3D] w-8 sm:w-9 text-right tabular-nums">
                          90%
                        </span>
                      </div>
                    </div>

                    {/* Horizontal separator */}
                    <div className="border-b border-[#ECE5D8] my-0.5 sm:my-1" />

                    {/* Item 5: Documentation (75%) */}
                    <div className="flex items-center justify-between gap-2 py-0.5 sm:py-1">
                      <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                        <svg className="w-5.5 h-5.5 text-[#0E5C3D] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 2v4.5h4.5L13 4zm3 15H8v-1.5h8V19zm0-3H8v-1.5h8V16zm0-3H8v-1.5h8V13z" />
                        </svg>
                        <div className="min-w-0">
                          <span className="font-bold text-[#112F24] text-[12.5px] sm:text-[13px] block leading-tight truncate">
                            Documentation
                          </span>
                          <span className="text-[11px] sm:text-[11.5px] text-[#495C51] block leading-tight truncate mt-0.5">
                            Medical Records &amp; Reporting
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 ml-auto">
                        <div className="w-20 sm:w-28 md:w-32 lg:w-36 h-2 bg-[#E2E8E4] rounded-full overflow-hidden">
                          <div className="h-full bg-[#0E5C3D] rounded-full transition-all duration-500" style={{ width: "75%" }} />
                        </div>
                        <span className="font-bold text-[12.5px] sm:text-[13px] text-[#0E5C3D] w-8 sm:w-9 text-right tabular-nums">
                          75%
                        </span>
                      </div>
                    </div>

                    {/* Horizontal separator */}
                    <div className="border-b border-[#ECE5D8] my-0.5 sm:my-1" />

                    {/* Item 6: Role Fit (80%) */}
                    <div className="flex items-center justify-between gap-2 py-0.5 sm:py-1">
                      <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                        <svg className="w-5.5 h-5.5 text-[#0E5C3D] shrink-0" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"
                            fill="currentColor"
                          />
                          <path
                            d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"
                            fill="currentColor"
                          />
                          <circle cx="12" cy="12" r="2.2" fill="currentColor" />
                          <path
                            d="M14.5 9.5L20 4m0 0h-3.5m3.5 0v3.5"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="min-w-0">
                          <span className="font-bold text-[#112F24] text-[12.5px] sm:text-[13px] block leading-tight truncate">
                            Role Fit
                          </span>
                          <span className="text-[11px] sm:text-[11.5px] text-[#495C51] block leading-tight truncate mt-0.5">
                            Clinical Knowledge, Empathy, Communication
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 ml-auto">
                        <div className="w-20 sm:w-28 md:w-32 lg:w-36 h-2 bg-[#E2E8E4] rounded-full overflow-hidden">
                          <div className="h-full bg-[#0E5C3D] rounded-full transition-all duration-500" style={{ width: "80%" }} />
                        </div>
                        <span className="font-bold text-[12.5px] sm:text-[13px] text-[#0E5C3D] w-8 sm:w-9 text-right tabular-nums">
                          80%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================================
                RIGHT COLUMN (4 cols):
                1. Your Profile Card (Photo + Contact Info)
                2. Your CV Card (File + View/Upload actions)
                3. Job Summary Card (Details + CTAs + Security lock footer)
                ================================================================= */}
            <div className="lg:col-span-4 flex flex-col gap-1.5">
              {/* Card 1: Your Profile */}
              <div className="rounded-md border border-[#ECE5D8] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-3 sm:p-3.5 px-3.5 sm:px-4">
                <div className="flex items-center justify-between pb-1.5">
                  <h3 className="font-sans font-bold text-[16px] sm:text-[17px] text-[#0D3226] leading-tight">
                    Your Profile
                  </h3>
                  <Link
                    href="/careers/apply"
                    className="flex items-center gap-1 text-[13px] sm:text-[13.5px] font-semibold text-[#1877F2] hover:text-[#0D65D9] hover:underline transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Link>
                </div>

                <div className="flex items-start gap-3 sm:gap-3.5 pt-1.5">
                  {/* Candidate Avatar in 4:3 (height 4, width 3) */}
                  <div className="w-[82px] sm:w-[92px] aspect-[3/4] rounded-md overflow-hidden bg-[#EDF5F0] shrink-0 border border-[#ECE5D8] relative shadow-2xs">
                    <Image
                      src="/aisc/ai1_profile.webp"
                      alt={candidateName}
                      fill
                      priority
                      unoptimized
                      className="object-cover object-top"
                    />
                  </div>

                  {/* Profile info fields */}
                  <div className="space-y-1 min-w-0 flex-1">
                    <h4 className="font-sans font-bold text-[16.5px] sm:text-[17.5px] text-[#112F24] leading-tight truncate">
                      {candidateName}
                    </h4>

                    <div className="space-y-1 text-[12px] sm:text-[12.5px] text-[#495C51] pt-0.5">
                      <p className="flex items-center gap-1.5 truncate">
                        <svg className="w-3.5 h-3.5 text-[#0E5C3D] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                        <span className="truncate">{email}</span>
                      </p>
                      <p className="flex items-center gap-1.5 truncate">
                        <svg className="w-3.5 h-3.5 text-[#0E5C3D] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                        <span>{phone}</span>
                      </p>
                      <p className="flex items-center gap-1.5 truncate">
                        <svg className="w-3.5 h-3.5 text-[#0E5C3D] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                          <path fillRule="evenodd" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 10a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                        <span>{location}</span>
                      </p>
                      <p className="flex items-center gap-1.5 truncate">
                        <svg className="w-3.5 h-3.5 text-[#0E5C3D] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
                        </svg>
                        <span>{dob}</span>
                        <span className="text-[#C5D0C9]">|</span>
                        <span>{gender}</span>
                      </p>
                      <p className="flex items-center gap-1.5 truncate">
                        <svg className="w-3.5 h-3.5 fill-[#0A66C2] shrink-0" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.738-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        <span className="truncate text-[#495C51]">{linkedin}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Your CV - Exact replica with compact height */}
              <div className="rounded-md border border-[#ECE5D8] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-2.5 sm:p-3 px-3.5 sm:px-4">
                <h3 className="font-sans font-bold text-[16px] sm:text-[16.5px] text-[#0D3226] mb-2 leading-tight">
                  Your CV
                </h3>

                <div className="rounded-md border border-[#ECE5D8] bg-transparent p-2 sm:p-2.5 flex items-center gap-3">
                  {/* Document icon with folded corner and checkmark badge */}
                  <div className="relative w-8.5 h-10 shrink-0 flex items-center justify-center">
                    <svg className="w-8 h-9.5" viewBox="0 0 32 38" fill="none">
                      <path
                        d="M3.5 5.5C3.5 3.567 5.067 2 7 2H19L28.5 11.5V32.5C28.5 34.433 26.933 36 25 36H7C5.067 36 3.5 34.433 3.5 32.5V5.5Z"
                        stroke="#0D4B32"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18.5 2V12H28.5"
                        stroke="#0D4B32"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 20H16"
                        stroke="#0D4B32"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                      />
                    </svg>
                    {/* Checkmark circle badge at bottom right */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-[#0D4B32] border-2 border-white flex items-center justify-center text-white shadow-2xs">
                      <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-[13.5px] sm:text-[14px] text-[#0A261D] truncate leading-tight">
                      {fileName}
                    </h4>
                    <p className="text-[11.5px] sm:text-[12px] text-[#5C6E64] mt-0.5 leading-tight">
                      {fileSize} &nbsp;|&nbsp; {uploadDate}
                    </p>

                    <div className="flex items-center gap-3 mt-1 text-[12px] sm:text-[12.5px] font-semibold text-[#1877F2]">
                      <button
                        type="button"
                        onClick={() => alert(`Opening ${fileName}`)}
                        className="flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 stroke-[2.2]" />
                        <span>View File</span>
                      </button>

                      <Link
                        href={`/careers/apply?role=${encodeURIComponent(jobTitle)}`}
                        className="flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <RotateCw className="w-3.5 h-3.5 stroke-[2.2]" />
                        <span>Upload Different CV</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Job Summary - Compact Height */}
              <div className="rounded-md border border-[#ECE5D8] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-2.5 sm:p-3 px-3 sm:px-3.5">
                {/* Header without separator line and with blue Edit button */}
                <div className="flex items-center justify-between pb-1">
                  <h3 className="font-sans font-bold text-[15.5px] sm:text-[16.5px] text-[#0D3226] leading-tight">
                    Job Summary
                  </h3>
                  <Link
                    href="/careers"
                    className="flex items-center gap-1 text-[12.5px] sm:text-[13px] font-semibold text-[#1877F2] hover:text-[#0D65D9] hover:underline"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </Link>
                </div>

                {/* Job meta fields - compact table rows */}
                <div className="text-[12.5px] sm:text-[13px]">
                  {/* Position */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 flex items-center justify-center shrink-0">
                      <svg className="w-4.5 h-4.5 text-[#0E5C3D]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 2H9c-1.1 0-2 .9-2 2v2H5c-1.1 0-2 .9-2 2v14h18V4c0-1.1-.9-2-2-2zM5 8h2v2H5V8zm0 4h2v2H5v-2zm0 4h2v2H5v-2zm8 4H9v-2h4v2zm0-4H9v-2h4v2zm0-4H9v-2h4v2zm0-4H9V6h4v2zm6 12h-4v-2h4v2zm0-4h-4v-2h4v2zm0-4h-4V8h4v2zm0-4h-4V4h4v2z" />
                      </svg>
                    </div>
                    <div className="flex-1 flex items-center gap-2.5 py-1 border-b border-[#E7ECF2]">
                      <span className="w-[125px] sm:w-[135px] shrink-0 text-[#41536F] font-normal">
                        Position
                      </span>
                      <span className="font-semibold text-[#183153] text-left truncate">
                        {jobTitle}
                      </span>
                    </div>
                  </div>

                  {/* Organization */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 flex items-center justify-center shrink-0">
                      <svg className="w-4.5 h-4.5 text-[#0E5C3D]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        <path d="M18.5 10c1.38 0 2.5-1.12 2.5-2.5S19.88 5 18.5 5c-.41 0-.79.11-1.13.29.39.67.63 1.44.63 2.21 0 .78-.24 1.54-.63 2.21.34.18.72.29 1.13.29zm.5 4c-.31 0-.68.04-1.07.12 1.48 1.05 2.07 2.26 2.07 3.88v2h4v-2c0-2.21-3.58-4-5-4zM5.5 10c.41 0 .79-.11 1.13-.29-.39-.67-.63-1.44-.63-2.21 0-.78.24-1.54.63-2.21C6.29 5.11 5.91 5 5.5 5 4.12 5 3 6.12 3 7.5S4.12 10 5.5 10zm-1 4c-1.42 0-5 1.79-5 4v2h4v-2c0-1.62.59-2.83 2.07-3.88-.39-.08-.76-.12-1.07-.12z" />
                      </svg>
                    </div>
                    <div className="flex-1 flex items-center gap-2.5 py-1 border-b border-[#E7ECF2]">
                      <span className="w-[125px] sm:w-[135px] shrink-0 text-[#41536F] font-normal">
                        Organization
                      </span>
                      <span className="font-semibold text-[#183153] text-left truncate">
                        {organization}
                      </span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 flex items-center justify-center shrink-0">
                      <svg className="w-4.5 h-4.5 text-[#0E5C3D]" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 10a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1 flex items-center gap-2.5 py-1 border-b border-[#E7ECF2]">
                      <span className="w-[125px] sm:w-[135px] shrink-0 text-[#41536F] font-normal">
                        Location
                      </span>
                      <span className="font-semibold text-[#183153] text-left truncate">
                        {location}
                      </span>
                    </div>
                  </div>

                  {/* Employment Type */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 flex items-center justify-center shrink-0">
                      <svg className="w-4.5 h-4.5 text-[#0E5C3D]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 2h4c1.1 0 2 .9 2 2v1h4c1.1 0 2 .9 2 2v3H2V7c0-1.1.9-2 2-2h4V4c0-1.1.9-2 2-2zm0 2v1h4V4h-4z" />
                        <path d="M2 12v6.5C2 19.88 3.12 21 4.5 21h15c1.38 0 2.5-1.12 2.5-2.5V12h-8v1.5c0 .55-.45 1-1 1h-2c-.55 0-1-.45-1-1V12H2z" />
                      </svg>
                    </div>
                    <div className="flex-1 flex items-center gap-2.5 py-1 border-b border-[#E7ECF2]">
                      <span className="w-[125px] sm:w-[135px] shrink-0 text-[#41536F] font-normal">
                        Employment Type
                      </span>
                      <span className="font-semibold text-[#183153] text-left truncate">
                        {employmentType}
                      </span>
                    </div>
                  </div>

                  {/* Experience Required */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 flex items-center justify-center shrink-0">
                      <svg className="w-4.5 h-4.5 text-[#0E5C3D]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 2h4c1.1 0 2 .9 2 2v1h4c1.1 0 2 .9 2 2v3H2V7c0-1.1.9-2 2-2h4V4c0-1.1.9-2 2-2zm0 2v1h4V4h-4z" />
                        <path d="M2 12v6.5C2 19.88 3.12 21 4.5 21h15c1.38 0 2.5-1.12 2.5-2.5V12h-8v1.5c0 .55-.45 1-1 1h-2c-.55 0-1-.45-1-1V12H2z" />
                      </svg>
                    </div>
                    <div className="flex-1 flex items-center gap-2.5 py-1 border-b border-[#E7ECF2]">
                      <span className="w-[125px] sm:w-[135px] shrink-0 text-[#41536F] font-normal">
                        Experience Required
                      </span>
                      <span className="font-semibold text-[#183153] text-left truncate">
                        {experienceRequired}
                      </span>
                    </div>
                  </div>

                  {/* Qualification */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 flex items-center justify-center shrink-0">
                      <svg className="w-4.5 h-4.5 text-[#0E5C3D]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                        <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
                      </svg>
                    </div>
                    <div className="flex-1 flex items-center gap-2.5 py-1 border-b border-[#E7ECF2]">
                      <span className="w-[125px] sm:w-[135px] shrink-0 text-[#41536F] font-normal">
                        Qualification
                      </span>
                      <span className="font-semibold text-[#183153] text-left truncate">
                        {qualification}
                      </span>
                    </div>
                  </div>

                  {/* Joining Preference */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 flex items-center justify-center shrink-0">
                      <svg className="w-4.5 h-4.5 text-[#0E5C3D]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                      </svg>
                    </div>
                    <div className="flex-1 flex items-center gap-2.5 py-1">
                      <span className="w-[125px] sm:w-[135px] shrink-0 text-[#41536F] font-normal">
                        Joining Preference
                      </span>
                      <span className="font-semibold text-[#183153] text-left truncate">
                        {joiningPreference}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-2 pt-0.5 space-y-1.5">
                  <Link
                    href={`/careers/review-details?role=${encodeURIComponent(jobTitle)}&fileName=${encodeURIComponent(fileName)}&fileSize=${encodeURIComponent(fileSize)}`}
                    className="w-full bg-[#0E5C3D] hover:bg-[#0A472E] text-white py-2 rounded-md font-bold text-[13.5px] sm:text-[14px] flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                  >
                    <span>Continue &amp; Apply for This Job</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.4]" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setSavedForLater(!savedForLater)}
                    className="w-full border border-[#ECE5D8] bg-white hover:bg-[#FAF8F3] text-[#112F24] py-1.5 rounded-md font-semibold text-[12.5px] sm:text-[13px] flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${
                        savedForLater ? "fill-[#0E5C3D] text-[#0E5C3D]" : "text-[#495C51]"
                      }`}
                    />
                    <span>{savedForLater ? "Saved to Applications" : "Save for Later"}</span>
                  </button>
                </div>

                {/* Security Disclaimer with larger filled-in lock icon */}
                <div className="flex items-center justify-center gap-1.5 text-[11.5px] sm:text-[12px] text-[#495C51] mt-2">
                  <svg className="w-4 h-4 text-[#0E5C3D] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                  </svg>
                  <span>Your data is secure and used only for recruitment purposes.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 5. FOOTER */}
      <Footer />
    </div>
  );
}
