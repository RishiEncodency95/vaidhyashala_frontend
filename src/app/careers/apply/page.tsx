"use client";

import React, { useState, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Home,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Briefcase,
  BarChart2,
  GraduationCap,
  CheckCircle2,
  Check,
  UploadCloud,
  Lock,
  Sparkles,
  Leaf,
} from "lucide-react";
import CareersNavbar from "@/components/careers/CareersNavbar";
import JobModal from "@/components/careers/JobModal";
import Footer from "@/components/Footer";


function CareerApplyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleTitle = searchParams.get("role") || "Ayurvedic Doctor";

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setIsAnalyzing(true);
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1) + " MB";
      setTimeout(() => {
        router.push(
          `/careers/apply/cv-analysis?role=${encodeURIComponent(roleTitle)}&fileName=${encodeURIComponent(file.name)}&fileSize=${encodeURIComponent(sizeMB)}`
        );
      }, 500);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setIsAnalyzing(true);
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1) + " MB";
      setTimeout(() => {
        router.push(
          `/careers/apply/cv-analysis?role=${encodeURIComponent(roleTitle)}&fileName=${encodeURIComponent(file.name)}&fileSize=${encodeURIComponent(sizeMB)}`
        );
      }, 500);
    }
  };

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-clip bg-[#FAF7F2] text-[#22332A] flex flex-col font-sans">


      {/* 1. Top Navigation */}
      <header className="shrink-0 relative z-30">
        <CareersNavbar />
      </header>

      {/* 2. Hero Banner */}
      <section className="shrink-0 relative w-full overflow-hidden bg-[#FAF7F2] border-b border-[#ECE6DB] min-h-[140px] sm:min-h-[155px] lg:min-h-[170px] flex items-center z-10">
        <div className="absolute inset-0 select-none pointer-events-none">
          <Image
            src="/aisc/hei2.webp"
            alt="Careers at Vaidhyashala"
            fill
            priority
            unoptimized
            className="object-cover object-[65%_center] sm:object-[68%_center] lg:object-[70%_center]"
          />
          {/* White/Cream gradient overlay behind text for 100% clarity, matching reference image */}
          <div className="absolute inset-y-0 left-0 w-full sm:w-[68%] lg:w-[56%] bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/95 via-45% to-transparent pointer-events-none" />
        </div>

        {/* Hero Content - Exactly matching reference image structure */}
        <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-12 py-3.5 sm:py-4.5 z-20 flex items-center justify-between gap-4">
          <div className="max-w-xl lg:max-w-2xl">
            <h1 className="font-sans text-[23px] sm:text-[27px] lg:text-[30px] font-bold leading-[1.15] tracking-[0.04em] [word-spacing:0.16em] text-[#0F382B]">
              Careers at Vaidhyashala
            </h1>
            <p className="mt-2 text-[14px] sm:text-[15px] font-normal leading-[1.5] text-[#3E4F45] tracking-[0.02em] [word-spacing:0.06em] max-w-xl">
              Be a part of a purpose-driven team dedicated to authentic
              <br />
              Ayurvedic care, holistic healing and healthier lives.
            </p>
          </div>

          {/* Right Calligraphic Accent: Healing People Enriching Lives with gold bar */}
          <div className="hidden lg:flex flex-col items-start pr-4 xl:pr-8 -translate-y-3.5 xl:-translate-y-4">
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

      {/* 3. Breadcrumbs - Perfectly aligned with Navbar */}
      <div className="shrink-0 relative w-full z-10 bg-[#FAF7F2]">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-12 py-1.5 sm:py-2">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-[13px] font-medium text-[#4A5950]">
            <Link
              href="/"
              className="text-[#3F4F45] transition-colors hover:text-[#0E3528] flex items-center gap-1"
            >
              <Home className="h-3.5 w-3.5" />
            </Link>
            <span className="text-[#8B988F] text-[12px]">&gt;</span>
            <Link
              href="/careers"
              className="text-[#4A5950] transition-colors hover:text-[#0E3528]"
            >
              Careers
            </Link>
            <span className="text-[#8B988F] text-[12px]">&gt;</span>
            <span className="text-[#133D2D] font-bold" aria-current="page">
              Apply for Position
            </span>
          </nav>
        </div>
      </div>

      {/* 4. Main Section - Perfectly aligned with Navbar */}
      <main className="relative w-full pb-2 sm:pb-3 pt-1 sm:pt-1.5 z-10 overflow-visible">
        {/* Left Side Botanical Background */}
        <div className="pointer-events-none absolute -left-2 sm:left-0 top-0 bottom-0 z-0 w-36 sm:w-52 md:w-64 lg:w-80 xl:w-96 select-none flex items-center">
          <Image
            src="/resumepage/s1.webp"
            alt=""
            fill
            unoptimized
            className="object-contain object-left mix-blend-multiply opacity-90 lg:opacity-100"
          />
        </div>

        {/* Right Side Botanical Background */}
        <div className="pointer-events-none absolute -right-2 sm:right-0 top-0 bottom-0 z-0 w-36 sm:w-52 md:w-64 lg:w-80 xl:w-96 select-none flex items-center">
          <Image
            src="/resumepage/s2.webp"
            alt=""
            fill
            unoptimized
            className="object-contain object-right mix-blend-multiply opacity-90 lg:opacity-100"
          />
        </div>

        <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-12 z-10 overflow-visible">
          <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-[7.4fr_4.6fr] lg:gap-4 xl:gap-5 items-stretch">
            
            {/* LEFT CARD: Job Details + Vertical Poster in a Flex */}
            <div className="w-full rounded-[20px] border border-[#ECE5D8] bg-white pl-6 pr-4 pt-3.5 pb-4 sm:pl-7 sm:pr-5 sm:pt-4 sm:pb-4.5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between relative">
              <div>
                {/* FLEX CONTAINER: Left details + Right Poster & 3 Icons */}
                <div className="flex flex-col md:flex-row gap-4 lg:gap-6 xl:gap-7 items-stretch">
                  
                  {/* Left Column: Back to Careers + Role Details, Responsibilities, Qualifications */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      {/* Back to Careers Link */}
                      <div className="mb-2 sm:mb-2.5">
                        <Link
                          href="/careers"
                          className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#2F3E35] hover:text-[#0D3226] transition-colors"
                        >
                          <ArrowLeft className="h-3.5 w-3.5" />
                          <span>Back to Careers</span>
                        </Link>
                      </div>

                      {/* Full Time Badge */}
                      <div className="mb-1.5">
                        <span className="inline-block rounded-md bg-[#EDF5F0] px-2.5 py-0.5 text-[11.5px] font-extrabold tracking-[1.3px] uppercase text-[#145334]">
                          FULL TIME
                        </span>
                      </div>

                      {/* Role Title */}
                      <h2 className="font-sans text-[26px] sm:text-[29px] lg:text-[31px] font-bold leading-[1.12] text-[#112F24]">
                        {roleTitle}
                      </h2>

                      {/* Meta Badges */}
                      <div className="mt-2.5 flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-1.5 text-[13.5px] sm:text-[14px] font-semibold text-[#1E2E25]">
                        {/* Location */}
                        <span className="inline-flex items-center gap-1.5">
                          <svg className="w-[15px] h-[15px] shrink-0" viewBox="0 0 24 24" fill="#C49535" stroke="#C49535" strokeWidth="0.8">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                          </svg>
                          <span>Delhi NCR</span>
                        </span>

                        {/* Full Time */}
                        <span className="inline-flex items-center gap-1.5">
                          <svg className="w-[15px] h-[15px] shrink-0 text-[#A67A38]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="7" width="20" height="14" rx="2" />
                            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                            <path d="M2 13h20" />
                          </svg>
                          <span>Full Time</span>
                        </span>

                        {/* 2-5 Years */}
                        <span className="inline-flex items-center gap-1.5">
                          <svg className="w-[15px] h-[15px] shrink-0" viewBox="0 0 20 20" fill="#C49535">
                            <rect x="2" y="10" width="3.2" height="8" rx="1.6" />
                            <rect x="7.4" y="6" width="3.2" height="12" rx="1.6" />
                            <rect x="12.8" y="2" width="3.2" height="16" rx="1.6" />
                          </svg>
                          <span>2 - 5 Years</span>
                        </span>

                        {/* Qualification */}
                        <span className="inline-flex items-center gap-1.5">
                          <svg className="w-[17px] h-[17px] shrink-0 text-[#1E6540]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                            <path d="M6 12v5c3 3 9 3 12 0v-5" />
                          </svg>
                          <span>BAMS / MD (Ayurveda)</span>
                        </span>
                      </div>

                      {/* Separator Line */}
                      <div className="border-b border-[#ECE5D8] my-3 sm:my-3.5" />

                      {/* Summary Paragraph */}
                      <p className="text-[14px] sm:text-[14.5px] font-normal leading-[1.5] text-[#4A5950] mb-3.5">
                        Join Vaidhyashala as an {roleTitle} and be part of our mission to make authentic Ayurveda accessible for healthier, happier lives.
                      </p>

                      {/* Key Responsibilities */}
                      <div className="mb-5.5 sm:mb-7">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Image
                            src="/career/leaf.webp"
                            alt=""
                            width={22}
                            height={22}
                            unoptimized
                            className="w-[20px] h-[20px] shrink-0 object-contain mix-blend-multiply"
                          />
                          <h3 className="font-sans text-[16px] sm:text-[17px] font-bold leading-tight text-[#0F3526]">
                            Key Responsibilities
                          </h3>
                        </div>
                        <ul className="space-y-[3px] pl-3.5 sm:pl-4">
                          {[
                            "Consult patients and understand their health concerns.",
                            "Prepare personalised Ayurvedic treatment plans.",
                            "Guide patients on diet, lifestyle and wellness practices.",
                            "Maintain accurate patient records and follow-up care.",
                          ].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-[13.5px] sm:text-[14px] text-[#4A5950] leading-[1.28]">
                              <span className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#0D4F34] text-white h-3.5 w-3.5 mt-0.5">
                                <Check className="h-2 w-2 stroke-[3]" />
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Qualifications & Experience */}
                      <div className="mb-3.5 sm:mb-4">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Image
                            src="/career/leaf.webp"
                            alt=""
                            width={22}
                            height={22}
                            unoptimized
                            className="w-[20px] h-[20px] shrink-0 object-contain mix-blend-multiply"
                          />
                          <h3 className="font-sans text-[16px] sm:text-[17px] font-bold leading-tight text-[#0F3526]">
                            Qualifications & Experience
                          </h3>
                        </div>
                        <ul className="space-y-[3px] pl-3.5 sm:pl-4">
                          <li className="flex items-start gap-2 text-[13.5px] sm:text-[14px] text-[#4A5950] leading-[1.28]">
                            <span className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#0D4F34] text-white h-3.5 w-3.5 mt-0.5">
                              <Check className="h-2 w-2 stroke-[3]" />
                            </span>
                            <span>BAMS or equivalent recognised degree.</span>
                          </li>
                          <li className="flex items-start gap-2 text-[13.5px] sm:text-[14px] text-[#4A5950] leading-[1.28]">
                            <span className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#0D4F34] text-white h-3.5 w-3.5 mt-0.5">
                              <Check className="h-2 w-2 stroke-[3]" />
                            </span>
                            <span>
                              Minimum 2–5 years of clinical experience (freshers with strong knowledge may also apply).
                            </span>
                          </li>
                          <li className="flex items-start gap-2 text-[13.5px] sm:text-[14px] text-[#4A5950] leading-[1.28]">
                            <span className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#0D4F34] text-white h-3.5 w-3.5 mt-0.5">
                              <Check className="h-2 w-2 stroke-[3]" />
                            </span>
                            <span>Good communication and counselling skills.</span>
                          </li>
                          <li className="flex items-start gap-2 text-[13.5px] sm:text-[14px] text-[#4A5950] leading-[1.28]">
                            <span className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#0D4F34] text-white h-3.5 w-3.5 mt-0.5">
                              <Check className="h-2 w-2 stroke-[3]" />
                            </span>
                            <span>Passion for holistic and preventive healthcare.</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* View Full Job Details CTA Button */}
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => setIsJobModalOpen(true)}
                        className="group inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#052F20] px-5 py-2.5 text-[14px] font-semibold text-white shadow-xs transition-colors hover:bg-[#0c4430] cursor-pointer"
                      >
                        <span>View Full Job Details</span>
                        <ArrowRight className="h-3.5 w-3.5 text-[#E2BD5A] transition-transform duration-200 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column in Flex: Poster touching top + Three Icons just below */}
                  <div className="shrink-0 w-full md:w-[180px] lg:w-[192px] xl:w-[200px] flex flex-col items-center justify-start gap-4">
                    {/* Vertical Poster touching top - reduced width, balanced height */}
                    <div className="relative w-full h-[315px] sm:h-[348px] lg:h-[372px] xl:h-[388px] overflow-hidden rounded-[16px] border border-[#E3DDCF] bg-[#FAF8F3] shadow-xs">
                      <Image
                        src="/car2/02_ayurvedic_mortar_pestle_portrait.webp"
                        alt="Together for a Healthier Tomorrow"
                        fill
                        unoptimized
                        priority
                        className="object-cover"
                      />
                    </div>

                    {/* People, Ideas, Partnerships */}
                    <div className="shrink-0 w-full flex flex-col items-center justify-center pt-0 px-0">
                      {/* Three Circular Icons - enlarged with reduced gap */}
                      <div className="flex items-start justify-between w-full px-0">
                        {/* People */}
                        <div className="flex flex-col items-center text-center">
                          <div className="w-[44px] h-[44px] sm:w-[46px] sm:h-[46px] rounded-full border-[1.5px] border-[#C59B46] bg-[#FCFAF5] flex items-center justify-center shadow-xs">
                            <svg className="w-[22px] h-[22px] sm:w-[24px] sm:h-[24px] text-[#B8852B]" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M19.8 4.2C13.2 4.2 7.5 8.2 4.8 13.5C2.8 17.5 3 20.8 3 20.8C3 20.8 6.8 20.8 11.2 18.5C16.8 15.5 20.5 9.8 19.8 4.2Z"
                                fill="#B8852B"
                              />
                              <path
                                d="M4.2 19.8C8.5 15.5 13.8 10.2 19.8 4.2"
                                stroke="#FCFAF5"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>
                          <span className="mt-1 text-[12px] sm:text-[12.5px] font-semibold text-[#203128]">
                            People
                          </span>
                        </div>

                        {/* Ideas */}
                        <div className="flex flex-col items-center text-center">
                          <div className="w-[44px] h-[44px] sm:w-[46px] sm:h-[46px] rounded-full border-[1.5px] border-[#C59B46] bg-[#FCFAF5] flex items-center justify-center shadow-xs">
                            <svg className="w-[22px] h-[22px] sm:w-[24px] sm:h-[24px]" viewBox="0 0 24 24" fill="#B8852B">
                              <circle cx="12" cy="7.2" r="3.2" />
                              <path d="M12 11.2C9.2 11.2 6.8 12.8 6.8 15.2V17.8H17.2V15.2C17.2 12.8 14.8 11.2 12 11.2Z" />
                              <circle cx="5.8" cy="8.8" r="2.5" />
                              <path d="M5.8 12.4C3.8 12.4 2.4 13.8 2.4 15.5V17.8H5.8V15C5.8 13.8 6.3 12.9 7 12.4C6.6 12.4 6.2 12.4 5.8 12.4Z" />
                              <circle cx="18.2" cy="8.8" r="2.5" />
                              <path d="M18.2 12.4C17.8 12.4 17.4 12.4 17 12.4C17.7 12.9 18.2 13.8 18.2 15V17.8H21.6V15.5C21.6 13.8 20.2 12.4 18.2 12.4Z" />
                            </svg>
                          </div>
                          <span className="mt-1 text-[12px] sm:text-[12.5px] font-semibold text-[#203128]">
                            Ideas
                          </span>
                        </div>

                        {/* Partnerships */}
                        <div className="flex flex-col items-center text-center">
                          <div className="w-[44px] h-[44px] sm:w-[46px] sm:h-[46px] rounded-full border-[1.5px] border-[#C59B46] bg-[#FCFAF5] flex items-center justify-center shadow-xs">
                            <svg className="w-[22px] h-[22px] sm:w-[24px] sm:h-[24px]" viewBox="0 0 24 24" fill="#B8852B">
                              <rect x="3.5" y="13" width="3" height="7.5" rx="1.5" />
                              <rect x="8" y="9.5" width="3" height="11" rx="1.5" />
                              <rect x="12.5" y="6.5" width="3" height="14" rx="1.5" />
                              <rect x="17" y="7.5" width="3" height="13" rx="1.5" />
                              <circle cx="18.5" cy="3.5" r="1.8" />
                            </svg>
                          </div>
                          <span className="mt-1 text-[12px] sm:text-[12.5px] font-semibold text-[#203128]">
                            Partnerships
                          </span>
                        </div>
                      </div>

                      {/* Tagline */}
                      <p className="mt-1.5 text-[11px] sm:text-[11.5px] font-semibold tracking-[0.14em] text-[#4F6057] uppercase text-center">
                        For a Greener Tomorrow
                      </p>

                      {/* Two-tone Horizontal Separator Line */}
                      <div className="mt-2.5 sm:mt-3 flex h-[2px] w-14 sm:w-16 overflow-hidden rounded-full">
                        <div className="w-1/2 h-full bg-[#E5CA85]" />
                        <div className="w-1/2 h-full bg-[#A8741F]" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Floating Leaf Cluster on Bottom Edge of Left Card */}
              <div className="pointer-events-none absolute -bottom-7 sm:-bottom-8 md:-bottom-9 left-[50%] sm:left-[51%] md:left-[52%] -translate-x-1/2 z-20 w-32 sm:w-38 md:w-44 select-none">
                <Image
                  src="/leaf.webp"
                  alt=""
                  width={180}
                  height={180}
                  unoptimized
                  className="w-full h-auto object-contain opacity-100 drop-shadow-md"
                />
              </div>
            </div>

            {/* RIGHT CARD: Check Your Eligibility with AI */}
            <div className="w-full rounded-[20px] border border-[#ECE5D8] bg-white px-5 sm:px-6 py-3 sm:py-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col justify-between gap-1.5">
              <div>
                {/* Header text */}
                <div className="relative">
                  {/* Top Eyebrow */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11.5px] sm:text-[12px] font-extrabold tracking-[1.4px] uppercase text-[#1C5139]">
                      LET AI HELP YOU
                    </span>
                    <span className="text-[#D97706] text-xs leading-none font-bold">✦</span>
                  </div>

                  {/* Title */}
                  <h2 className="mt-1 font-sans text-[20px] sm:text-[22px] lg:text-[24px] font-bold leading-[1.18] text-[#0C2D20]">
                    Check Your Eligibility<br />with AI
                  </h2>

                  {/* Description */}
                  <p className="mt-1 text-[13px] sm:text-[13.5px] font-normal leading-[1.4] text-[#495C51] max-w-[260px]">
                    Upload your CV and get an instant analysis of how well your profile matches this position.
                  </p>
                </div>

                {/* CV Upload Dropzone Box (with robot sitting directly on its top border) */}
                <div className="relative mt-2.5">
                  {/* 3D AI Robot Mascot + Chat bubble anchored directly to touch the top dashed border */}
                  <div className="absolute right-0 sm:right-1 bottom-full translate-y-[2px] flex items-start select-none pointer-events-none z-10">
                    <div className="w-[100px] sm:w-[112px] lg:w-[122px] xl:w-[128px] -mr-1.5">
                      <Image
                        src="/car2/03_ai_wellness_assistant_robot_trans.webp"
                        alt="AI Wellness Assistant"
                        width={150}
                        height={150}
                        unoptimized
                        className="w-full h-auto object-contain block align-bottom"
                      />
                    </div>
                    {/* Mint Speech bubble with 3 lines */}
                    <div className="relative mt-2.5 sm:mt-3 -ml-2 rounded-[6px] border border-[#BCE1CD] bg-[#DCEDE3] px-1.5 py-1 shadow-2xs">
                      <div className="flex flex-col gap-[2.5px]">
                        <div className="h-[2px] w-3.5 rounded-full bg-[#1A573B]" />
                        <div className="h-[2px] w-3.5 rounded-full bg-[#1A573B]" />
                        <div className="h-[2px] w-3.5 rounded-full bg-[#1A573B]" />
                      </div>
                      {/* Tail pointing towards robot */}
                      <div className="absolute -bottom-1 left-1.5 h-1.5 w-1.5 rotate-45 border-b border-r border-[#BCE1CD] bg-[#DCEDE3]" />
                    </div>
                  </div>

                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-[14px] border-[1.5px] border-dashed border-[#B4D7C5] bg-[#FCFDFC] px-3.5 py-2.5 sm:py-3 text-center cursor-pointer transition-colors hover:border-[#1E5C41] hover:bg-[#F4F9F6]"
                  >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />

                  {/* Clean standalone green upload cloud icon */}
                  <div className="mx-auto flex justify-center text-[#0E5434]">
                    <svg
                      className="h-8 w-8 text-[#0E5434]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7.5 19H6a4 4 0 0 1-.8-7.9A5.5 5.5 0 0 1 15.6 8a4.5 4.5 0 0 1 4.4 5.2A4 4 0 0 1 18 19h-1.5" />
                      <polyline points="8.5 14.5 12 11 15.5 14.5" />
                      <line x1="12" y1="11" x2="12" y2="20" />
                    </svg>
                  </div>

                  <p className="mt-1.5 text-[15px] sm:text-[15.5px] font-bold text-[#0D2E22] leading-tight">
                    {selectedFile ? selectedFile.name : "Upload Your CV"}
                  </p>

                  <p className="mt-0.5 text-[12.5px] sm:text-[13px] font-medium text-[#44564D] leading-tight">
                    Drag & drop your file here or click to browse
                  </p>
                  <p className="text-[12px] font-medium text-[#44564D] leading-tight mt-0.5">
                    PDF, DOC or DOCX (Max 5 MB)
                  </p>

                  <div className="mt-2.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="inline-flex items-center justify-center min-w-[170px] sm:min-w-[190px] rounded-[8px] bg-[#073623] px-8 py-2.5 text-[13.5px] sm:text-[14px] font-semibold text-white shadow-2xs transition-colors hover:bg-[#0c4730] cursor-pointer"
                    >
                      Choose File
                    </button>
                  </div>
                </div>
              </div>

                {/* Simulated Loading State */}
                {isAnalyzing && (
                  <div className="mt-1.5 flex items-center justify-center gap-1.5 text-[12px] font-semibold text-[#1E5C41] animate-pulse">
                    <Sparkles className="h-3 w-3" />
                    <span>AI is analyzing your CV against role criteria...</span>
                  </div>
                )}

                {/* AI will check: list */}
                <div className="mt-2">
                  <p className="text-[14.5px] sm:text-[15px] font-bold text-[#0D3023]">
                    AI will check:
                  </p>
                  <ul className="mt-1.5 space-y-1">
                    {[
                      "Relevant clinical experience",
                      "Ayurvedic qualification (BAMS/MD)",
                      "Key skills (patient consultation, treatment planning)",
                      "Communication & counselling skills",
                      "Overall profile match",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[13px] sm:text-[13.5px] font-medium leading-[1.15] text-[#2C3E34]">
                        <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#0D4F34] text-white">
                          <Check className="h-2 w-2 stroke-[3.2]" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Your Profile Match Result Card with reduced padding */}
                <div className="mt-2.5 flex items-center gap-3 rounded-[14px] border border-[#CFE7DA] bg-[#EEF7F2] px-3 py-2 sm:px-3.5 sm:py-2">
                  {/* Circular 85% Progress Indicator */}
                  <div className="relative shrink-0 flex h-[64px] w-[64px] sm:h-[70px] sm:w-[70px] items-center justify-center">
                    <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                      {/* Background track ring with solid white center */}
                      <circle
                        cx="50"
                        cy="50"
                        r="39"
                        stroke="#BEE0CE"
                        strokeWidth="11"
                        fill="#FFFFFF"
                      />
                      {/* 85% Progress arc with flat butt caps */}
                      <circle
                        cx="50"
                        cy="50"
                        r="39"
                        stroke="#086838"
                        strokeWidth="11"
                        strokeDasharray="245.04"
                        strokeDashoffset="36.76"
                        strokeLinecap="butt"
                        fill="none"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-sans font-bold text-[#0D241C] text-[21px] sm:text-[23px] tracking-tight leading-none flex items-baseline">
                        85<span className="text-[13px] sm:text-[14px] font-bold ml-[1px] -translate-y-1">%</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h4 className="font-sans text-[15px] sm:text-[15.5px] font-bold leading-tight text-[#0D3023]">
                      Your Profile Match
                    </h4>
                    <p className="mt-0.5 text-[13px] sm:text-[13.5px] font-medium leading-[1.38] text-[#44564D] max-w-[85%]">
                      Based on your experience, skills and qualification, you are a strong match for this position.
                    </p>
                  </div>
                </div>
              </div>

              {/* Security Privacy Notice */}
              <div className="flex items-center gap-1.5 text-[12px] sm:text-[12.5px] font-medium text-[#4D6055] pt-0.5">
                <Lock className="h-3.5 w-3.5 shrink-0 text-[#0E5B37] fill-[#0E5B37]" />
                <p className="leading-tight">
                  Your data is secure and will only be used for recruitment purposes.
                </p>
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* 5. Footer (matching Home and other pages) */}
      <Footer />

      {/* Interactive Application Modal */}
      <JobModal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        jobTitle={roleTitle}
      />
    </div>
  );
}

export default function CareerApplyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2]" />}>
      <CareerApplyContent />
    </Suspense>
  );
}
