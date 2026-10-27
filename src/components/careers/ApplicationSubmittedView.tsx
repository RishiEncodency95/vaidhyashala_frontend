"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarCheck,
  CalendarDays,
  ChartColumn,
  Check,
  ChevronRight,
  ExternalLink,
  FileSearch,
  FileText,
  Headset,
  Heart,
  Home,
  Leaf,
  Mail,
  MapPin,
  Pencil,
  Phone,
  PhoneCall,
  Search,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";
import CareersNavbar from "@/components/careers/CareersNavbar";
import Footer from "@/components/Footer";

interface ApplicationSubmittedViewProps {
  roleTitle?: string;
  candidateName?: string;
  email?: string;
  phone?: string;
  location?: string;
  dob?: string;
  gender?: string;
  preferredLocations?: string;
  applicationId?: string;
  submittedOn?: string;
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

const cardClass = "rounded-xl border border-[#ECE7DC] bg-white/90 shadow-[0_4px_18px_rgba(0,0,0,0.04)]";

export default function ApplicationSubmittedView({
  roleTitle = "Ayurvedic Doctor",
  candidateName = "Dr. Ananya Sharma",
  email = "ananya.sharma@gmail.com",
  phone = "+91 98765 43210",
  location = "Delhi NCR",
  dob = "14 Nov 1995",
  gender = "Female",
  preferredLocations = "Delhi NCR, Kalkaji Clinic",
  applicationId = "VS-CAR-2026-00187",
  submittedOn = "17 Oct 2026, 10:24 AM",
  matchScore = 85,
}: ApplicationSubmittedViewProps) {
  // "Dr. Ananya Sharma" -> "Dr. Ananya"
  const nameParts = candidateName.split(" ");
  const greetingName = nameParts[0].endsWith(".") && nameParts.length > 1 ? `${nameParts[0]} ${nameParts[1]}` : nameParts[0];

  const candidateLetterUrl = `/candidate-application-submitted?role=${encodeURIComponent(roleTitle)}&candidateName=${encodeURIComponent(candidateName)}&email=${encodeURIComponent(email)}&locations=${encodeURIComponent(preferredLocations)}&id=${encodeURIComponent(applicationId)}&date=${encodeURIComponent(submittedOn)}&score=${matchScore}`;

  const steps = [
    { label: "Upload CV", left: "13.6%" },
    { label: "AI Analysis", left: "37.5%" },
    { label: "Review Details", left: "61.1%" },
    { label: "Submit Application", left: "84.2%" },
  ];

  const nextSteps: { icon: LucideIcon; title: string; desc: string; time: string }[] = [
    { icon: FileSearch, title: "Application Review", desc: "Our HR team will review your application and AI analysis report.", time: "1 – 3 Working Days" },
    { icon: Users, title: "Shortlisting", desc: "If your profile matches the requirements, you will be shortlisted.", time: "3 – 5 Working Days" },
    { icon: PhoneCall, title: "Interview Process", desc: "You will be contacted via email/phone for the next steps.", time: "5 – 10 Working Days" },
    { icon: Mail, title: "Final Update", desc: "You will receive the final status of your application by email.", time: "Within 2 Weeks" },
  ];

  const values: { icon: LucideIcon; label: string }[] = [
    { icon: Leaf, label: "Meaningful Work" },
    { icon: Users, label: "Supportive Team" },
    { icon: ChartColumn, label: "Learning Opportunities" },
    { icon: Heart, label: "Positive Impact" },
  ];

  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (matchScore / 100) * circumference;

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#FAF7F2] text-[#22332A] flex flex-col font-sans">
      {/* 1. TOP NAVIGATION */}
      <CareersNavbar />

      {/* 2. HERO: breadcrumb + completed stepper over the herbal banner */}
      <section className="shrink-0 relative w-full overflow-hidden bg-[#FAF7F2] z-10">
        <div className="absolute inset-0 select-none pointer-events-none">
          <Image src="/aisc/hei2.webp" alt="" fill priority unoptimized className="object-cover object-[65%_center] lg:object-[48%_center]" />
          <div className="absolute inset-y-0 left-0 w-full lg:w-[70%] bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2] via-75% to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-[1536px] px-4 sm:px-6 lg:pl-[45px] lg:pr-[46px] pt-4 pb-2 z-20">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_440px] gap-5">
            <div>
              <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[12.5px] sm:text-[13px] text-[#475569] pl-[35px]">
                <Link href="/" className="text-[#0F5E3C] hover:opacity-80">
                  <Home className="w-[17px] h-[17px] fill-[#0F5E3C]" />
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-[#4B5563]" />
                <Link href="/careers" className="hover:text-[#0F5E3C]">Careers</Link>
                <ChevronRight className="w-3.5 h-3.5 text-[#4B5563]" />
                <Link href={`/careers/apply?role=${encodeURIComponent(roleTitle)}`} className="hover:text-[#0F5E3C]">Apply for Position</Link>
                <ChevronRight className="w-3.5 h-3.5 text-[#4B5563]" />
                <span aria-current="page" className="font-semibold text-[#0F5E3C]">Application Submitted</span>
              </nav>

              <div className="relative h-[66px] mt-4 lg:w-[92%]">
                <div className="absolute top-[13px] left-[13.6%] right-[15.8%] h-[2px] bg-[#1E8A4C]" />
                {steps.map((step, idx) => {
                  const isSubmitStep = idx === 3;
                  return isSubmitStep ? (
                    <Link
                      key={step.label}
                      href={candidateLetterUrl}
                      title="Click circle to view Application Submission Template"
                      className="absolute top-0 -translate-x-1/2 flex flex-col items-center text-center whitespace-nowrap group cursor-pointer"
                      style={{ left: step.left }}
                    >
                      <div className="w-7 h-7 rounded-full bg-[#0D5B3A] flex items-center justify-center text-white font-bold text-[13px] sm:text-[14px] shadow-xs ring-3 ring-[#0D5B3A]/20 group-hover:scale-125 group-hover:ring-4 group-hover:ring-[#0D5B3A]/40 transition-all">
                        {idx + 1}
                      </div>
                      <span className="mt-0.5 text-[13px] sm:text-[13.5px] font-bold leading-tight text-[#0D3226] group-hover:text-[#0D5B3A] group-hover:underline">
                        {step.label}
                      </span>
                      <span className="text-[11.5px] sm:text-[12px] font-medium leading-tight text-[#1E7F4E]">Completed</span>
                    </Link>
                  ) : (
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
                      <span className="text-[11.5px] sm:text-[12px] font-medium leading-tight text-[#1E7F4E]">Completed</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="hidden lg:flex justify-end items-start">
              <div className="flex flex-col items-center -mt-3 mr-[-20px]">
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
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT */}
      <main className="relative w-full pb-5 pt-3 z-10">
        <div className="relative z-10 mx-auto w-full max-w-[1536px] px-4 sm:px-6 lg:pl-[45px] lg:pr-[56px]">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_440px] gap-3 items-stretch">
            {/* ================= LEFT COLUMN ================= */}
            <div className="flex flex-col gap-2 min-w-0">
              {/* Success banner */}
              <div className="relative overflow-hidden rounded-xl border border-[#DDEAD9] bg-[#EEF5EA] shadow-[0_4px_18px_rgba(0,0,0,0.04)] min-h-[206px] flex flex-col md:flex-row">
                <Image src="/submit/s1.webp" alt="" width={2168} height={725} priority unoptimized className="absolute left-[-40px] top-[-24px] w-[calc(100%+40px)] max-w-none h-auto pointer-events-none select-none" />
                <div className="hidden md:block absolute inset-y-0 left-[31%] right-0 bg-gradient-to-r from-transparent via-[#F4F9EF]/85 via-[14%] to-transparent to-[80%] pointer-events-none" />
                {/* Illustration */}
                <div className="relative w-full md:w-[33%] h-[220px] md:h-auto shrink-0">
                </div>

                {/* Message */}
                <div className="relative flex-1 px-4 md:pl-7 md:pr-4 py-2.5">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span className="inline-flex items-center gap-2.5 rounded-full bg-white px-1.5 pr-4 py-1 shadow-sm text-[12.5px] sm:text-[13px] font-bold text-[#0D5B3A]">
                      <span className="w-6 h-6 rounded-full bg-[#0F7A45] flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-white stroke-[3.5]" />
                      </span>
                      Application Submitted Successfully
                    </span>

                    {/* Dedicated Circle to open the new candidate application confirmation page */}
                    <Link
                      href={candidateLetterUrl}
                      title="Click circle to open Application Confirmation Template"
                      className="group flex items-center gap-2 pr-2"
                    >
                      <span className="text-[12px] font-bold text-[#0D5B3A] group-hover:underline hidden sm:inline">
                        View Template
                      </span>
                      <span className="w-8 h-8 rounded-full bg-[#0B6B44] text-white flex items-center justify-center shadow-md ring-2 ring-[#0B6B44]/25 group-hover:bg-[#0D3226] group-hover:scale-110 transition-all">
                        <ExternalLink className="w-4 h-4 stroke-[2.2]" />
                      </span>
                    </Link>
                  </div>
                  <h1 className="mt-1.5 font-sans font-extrabold text-[24px] sm:text-[28px] md:text-[30px] leading-[1.12] text-[#0D3226]">
                    Thank You, {greetingName}!
                  </h1>
                  <p className="mt-1 text-[13.5px] sm:text-[14px] font-medium leading-[1.45] text-[#4F6456]">
                    Your application for <span className="text-[#0F7A45]">{roleTitle}</span> has been submitted successfully.
                    <br className="hidden lg:block" /> Our team will review your profile and get back to you soon.
                  </p>

                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-[294fr_318fr] gap-2.5">
                    <div className="rounded-lg bg-white/90 shadow-[0_2px_10px_rgba(0,0,0,0.04)] px-3 py-1.5 flex gap-3">
                      <div className="w-[38px] h-[38px] rounded-lg bg-[#EEF5EE] flex items-center justify-center shrink-0">
                        <Mail className="w-7 h-7 text-[#0F5E3C] stroke-[2.2]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[12px] sm:text-[12.5px] text-[#41536F]">Application ID</p>
                        <p className="font-sans font-bold text-[16px] sm:text-[17px] text-[#0D3226] mt-0.5">{applicationId}</p>
                        <p className="text-[11.5px] sm:text-[12px] text-[#495C51] mt-1">Please keep this ID for future reference.</p>
                      </div>
                    </div>
                    <div className="rounded-lg bg-white/90 shadow-[0_2px_10px_rgba(0,0,0,0.04)] px-3 py-1.5 flex gap-3">
                      <div className="w-[38px] h-[38px] rounded-lg bg-[#EEF5EE] flex items-center justify-center shrink-0">
                        <CalendarCheck className="w-7 h-7 text-[#0F5E3C] stroke-[2.2]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[12px] sm:text-[12.5px] text-[#41536F]">Submitted On</p>
                        <p className="font-sans font-bold text-[16px] sm:text-[17px] text-[#0D3226] mt-0.5">{submittedOn}</p>
                        <p className="text-[11.5px] sm:text-[12px] text-[#495C51] mt-1 leading-snug">
                          A confirmation email has been sent to
                          <br />
                          <span className="text-[#16233F]">{email}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* What Happens Next */}
              <div className={`${cardClass} px-4 pt-2 pb-2.5`}>
                <h2 className="font-sans font-bold text-[16.5px] sm:text-[17.5px] text-[#0D3226] leading-tight">What Happens Next?</h2>
                <p className="text-[12px] sm:text-[12.5px] text-[#495C51] leading-tight mt-0.5">Here is what you can expect after submitting your application.</p>
                <div className="mt-1.5 h-px bg-[#EEEAE2]" />

                <div className="relative mt-2.5 grid grid-cols-2 md:grid-cols-4 gap-y-3">
                  <div className="hidden md:block absolute top-[18px] left-[12.5%] right-[12.5%] border-t-[1.5px] border-dashed border-[#9DBFA8]" />
                  {nextSteps.map(({ icon: Icon, title, desc, time }) => (
                    <div key={title} className="relative flex flex-col items-center text-center px-2">
                      <div className="w-9 h-9 rounded-lg bg-[#0F5E3C] border-[3px] border-[#DCEBDF] flex items-center justify-center shadow-sm">
                        <Icon className="w-6 h-6 text-white stroke-[2.2]" />
                      </div>
                      <h3 className="mt-1.5 font-sans font-bold text-[15px] sm:text-[16px] text-[#0D3226]">{title}</h3>
                      <p className="mt-0.5 text-[12.5px] sm:text-[13px] font-medium text-[#3D5045] leading-[1.35] max-w-[190px] min-h-[46px]">{desc}</p>
                      <span className="mt-1.5 rounded-md bg-[#EAF3EA] px-3 py-0.5 text-[12px] sm:text-[12.5px] font-semibold text-[#0D5B3A]">{time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Join Our Mission */}
              <div className="relative overflow-hidden rounded-xl border border-[#ECE7DC] bg-[#F8F1E3] shadow-[0_4px_18px_rgba(0,0,0,0.04)] min-h-[136px] flex-1 flex flex-col md:flex-row md:items-center gap-4 px-4 md:px-0 md:pr-3 py-3 md:py-2">
                <div className="absolute inset-0 hidden md:block pointer-events-none select-none overflow-hidden bg-gradient-to-b from-[#F8F1E3] to-[#F5ECD9]">
                  <Image src="/submit/s2.webp" alt="" width={2168} height={725} unoptimized className="absolute left-0 top-[-14px] h-[calc(100%+28px)] w-auto max-w-none [mask-image:linear-gradient(to_right,black_50%,transparent_92%)]" />
                </div>
                <div className="relative md:pl-[250px] flex-1 min-w-0">
                  <p className="font-sans font-bold text-[15px] sm:text-[16px] text-[#C08A2B]">Join Our Mission</p>
                  <h2 className="font-sans italic text-[23px] sm:text-[24px] text-[#16233F] leading-tight mt-1 lg:whitespace-nowrap">Together for a Healthier Tomorrow</h2>
                  <p className="mt-1.5 text-[12.5px] sm:text-[13px] text-[#4F6456] leading-[1.45] max-w-[380px]">
                    At Vaidhyashala, we believe in the power of Ayurveda to create healthier, happier communities. We are excited
                    about the possibility of having you on our team!
                  </p>
                  <div className="mt-2 h-[2px] w-12 bg-[#C99C4B] rounded-full" />
                </div>
                <div className="relative flex gap-1.5 shrink-0 md:pr-1">
                  {values.map(({ icon: Icon, label }) => (
                    <div key={label} className="w-[70px] h-[70px] shrink-0 aspect-square rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center px-1.5 pb-0.5">
                      <Icon className="w-[17px] h-[17px] text-[#0F5E3C] fill-[#0F5E3C]/80 stroke-[2]" />
                      <span className="mt-0.5 text-[8.8px] leading-[1.15] text-[#2B3445]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ================= RIGHT COLUMN ================= */}
            <aside className="rounded-xl bg-white/90 shadow-[0_4px_22px_rgba(0,0,0,0.05)] border border-[#ECE7DC] px-4 pt-2.5 pb-2.5">
              <div className="flex items-center justify-between">
                <h2 className="font-sans font-bold text-[16px] sm:text-[17px] text-[#0D3226] leading-tight">Your Application Summary</h2>
                <Link
                  href={`/careers/complete-application?role=${encodeURIComponent(roleTitle)}`}
                  className="flex items-center gap-1 text-[13px] sm:text-[13.5px] font-semibold text-[#1877F2] hover:text-[#0D65D9] hover:underline transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Edit Details
                </Link>
              </div>

              {/* Candidate */}
              <div className="mt-2 flex gap-5 pb-2.5 border-b border-[#EEEAE2]">
                <div className="relative w-[96px] h-[96px] rounded-md overflow-hidden shrink-0 bg-[#EDF2EE]">
                  <Image src="/aisc/ananya.webp" alt={candidateName} fill unoptimized className="object-cover object-top" />
                </div>
                <div className="min-w-0 pt-1.5">
                  <h3 className="font-sans font-bold text-[16.5px] sm:text-[17.5px] text-[#112F24] leading-tight">{candidateName}</h3>
                  <ul className="mt-1.5 space-y-[3px] text-[12.5px] sm:text-[13px] text-[#495C51]">
                    <li className="flex items-center gap-2.5 min-w-0">
                      <Mail className="w-4 h-4 text-[#0F5E3C] shrink-0" />
                      <span className="truncate">{email}</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#0F5E3C] fill-[#0F5E3C] shrink-0" />
                      {phone}
                    </li>
                    <li className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-[#0F5E3C] fill-[#0F5E3C] shrink-0 [&>circle]:fill-white" />
                      {location}
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CalendarDays className="w-4 h-4 text-[#0F5E3C] shrink-0" />
                      {dob}
                      <span className="text-[#C3C9D1] px-2">|</span>
                      {gender}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Position */}
              <div className="mt-2.5 flex gap-5 items-start">
                <DoctorIcon className="w-[48px] h-[48px] text-[#0F5E3C] shrink-0 mt-1" />
                <div className="min-w-0 pl-2">
                  <p className="text-[12px] sm:text-[12.5px] text-[#41536F]">Position Applied For</p>
                  <h3 className="font-sans font-bold text-[16.5px] sm:text-[17.5px] text-[#0D5B3A] leading-tight mt-0.5">{roleTitle}</h3>
                  <p className="mt-1.5 flex flex-wrap items-center gap-2 text-[12px] sm:text-[12.5px] text-[#495C51]">
                    <BriefcaseBusiness className="w-4 h-4 text-[#F29A1F]" />
                    Full Time
                    <span className="text-[#C3C9D1]">|</span>
                    <BriefcaseBusiness className="w-4 h-4 text-[#F29A1F]" />
                    BAMS / MD (Ayurveda)
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-[12px] sm:text-[12.5px] text-[#495C51]">
                    <MapPin className="w-4 h-4 text-[#F29A1F] fill-[#F29A1F] [&>circle]:fill-white" />
                    {preferredLocations}
                  </p>
                </div>
              </div>

              {/* AI Profile Match */}
              <div className="mt-2.5 rounded-xl bg-[#EEF5EC] px-3 py-2 flex items-center gap-4">
                <div className="relative w-[76px] h-[76px] shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 112 112">
                    <defs>
                      <linearGradient id="submittedMatchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#B8D35A" />
                        <stop offset="40%" stopColor="#2E9A4F" />
                        <stop offset="100%" stopColor="#0F6B3E" />
                      </linearGradient>
                    </defs>
                    <circle cx="56" cy="56" r={radius} stroke="#FFFFFF" strokeWidth="11" fill="none" />
                    <circle cx="56" cy="56" r={radius} stroke="url(#submittedMatchGrad)" strokeWidth="11" strokeDasharray={circumference} strokeDashoffset={dashOffset} fill="none" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center font-sans font-extrabold text-[23px] text-[#0D3226]">{matchScore}%</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-x-2.5 whitespace-nowrap">
                    <h3 className="font-sans font-bold text-[16px] sm:text-[17px] text-[#0D3226] leading-tight">AI Profile Match</h3>
                    <span className="flex items-center gap-1.5 rounded-md bg-white px-2 py-0.5 text-[12px] sm:text-[12.5px] font-bold text-[#0D3226] shadow-sm">
                      <Star className="w-3.5 h-3.5 text-[#F2A71B] fill-[#F2A71B]" />
                      Strong Match
                    </span>
                  </div>
                  <p className="mt-1 text-[12.5px] sm:text-[13px] text-[#495C51] leading-snug">
                    Your profile matches well with the job requirements based on skills, experience and qualifications derived from your CV.
                  </p>
                </div>
              </div>

              {/* Keep Exploring */}
              <div className={`${cardClass} mt-2 px-3 pt-2 pb-2`}>
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#FDF0D5] flex items-center justify-center shrink-0">
                    <Search className="w-6 h-6 text-[#16233F] stroke-[2.6]" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-[16px] sm:text-[17px] text-[#0D3226] leading-tight">Keep Exploring Opportunities</h3>
                    <p className="mt-1 text-[12.5px] sm:text-[13px] text-[#495C51] leading-snug">
                      Would you like to explore other suitable opportunities? We will notify you about relevant openings.
                    </p>
                  </div>
                </div>
                <Link
                  href="/careers"
                  className="mt-2 mx-auto w-[240px] border border-[#0E5C3D] bg-white hover:bg-[#F4F9F5] text-[#0E5C3D] py-1.5 rounded-md font-semibold text-[12.5px] sm:text-[13px] flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                >
                  View Other Opportunities
                  <ArrowRight className="w-5 h-5 stroke-[2.2]" />
                </Link>
              </div>

              {/* Need Help */}
              <div className={`${cardClass} mt-2 px-3 pt-2 pb-2`}>
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#0F5E3C] flex items-center justify-center shrink-0">
                    <Headset className="w-6 h-6 text-white stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-[16px] sm:text-[17px] text-[#0D3226] leading-tight">Need Help?</h3>
                    <p className="mt-1 text-[12.5px] sm:text-[13px] text-[#495C51] leading-snug">
                      If you have any questions regarding your application, feel free to reach us.
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2">
                  <Link
                    href={`/hr-notification?role=${encodeURIComponent(roleTitle)}&candidateName=${encodeURIComponent(candidateName)}&email=${encodeURIComponent(email)}&locations=${encodeURIComponent(preferredLocations)}`}
                    className="w-[170px] border border-[#0E5C3D] bg-white hover:bg-[#F4F9F5] text-[#0E5C3D] py-1.5 rounded-md font-semibold text-[12.5px] sm:text-[13px] flex items-center justify-center shadow-2xs transition-colors"
                  >
                    Contact HR Team
                  </Link>
                  <div className="space-y-1 text-[12.5px] sm:text-[13px] text-[#495C51]">
                    <a href="mailto:hr@vaidhyashala.com" className="flex items-center gap-2.5 hover:text-[#0F5E3C]">
                      <Mail className="w-4 h-4 text-[#0F5E3C]" />
                      hr@vaidhyashala.com
                    </a>
                    <a href="tel:+919876543210" className="flex items-center gap-2.5 hover:text-[#0F5E3C]">
                      <Phone className="w-4 h-4 text-[#0F5E3C]" />
                      +91 98765 43210
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* 4. FLOATING CIRCULAR BUTTON TO OPEN CANDIDATE APPLICATION SUBMISSION TEMPLATE */}
      <Link
        href={candidateLetterUrl}
        aria-label="Open Application Submission Page"
        title="Click circle to view Application Submission Page"
        className="fixed bottom-7 right-7 z-50 group flex items-center justify-center"
      >
        <div className="relative w-14 h-14 rounded-full bg-[#0B6B44] text-white flex items-center justify-center shadow-[0_8px_30px_rgba(11,107,68,0.45)] ring-4 ring-[#0B6B44]/30 hover:ring-[#0B6B44]/55 hover:bg-[#0D3226] hover:scale-110 active:scale-95 transition-all cursor-pointer">
          <FileText className="w-6 h-6 stroke-[2.2] group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E5A93C] ring-2 ring-white flex items-center justify-center text-[9px] font-extrabold text-[#0D3226]">
            ✓
          </span>
        </div>
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-[#0D3226] text-white text-[12px] font-semibold whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Click to View Application Submission Page
        </span>
      </Link>

      {/* 5. FOOTER */}
      <Footer />
    </div>
  );
}
