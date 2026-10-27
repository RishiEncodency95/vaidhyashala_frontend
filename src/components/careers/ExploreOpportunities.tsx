"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Briefcase,
  ArrowRight,
  Stethoscope,
  Users,
  Flower2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import JobModal from "./JobModal";
import { useCareersPage } from "@/lib/careersPage";
import { API_BASE } from "@/lib/home2";

interface JobRole {
  title: string;
  location: string;
  type: string;
  description: string;
  imageSrc?: string;
  icon: React.ComponentType<{ className?: string }>;
}

// The photo and icon on a job card (jobs have none of their own), picked in turn
const CARD_LOOKS: { imageSrc: string; icon: JobRole["icon"] }[] = [
  { imageSrc: "/career/03_doctor_patient_consultation.webp", icon: Stethoscope },
  { imageSrc: "/career/05_meditation_garden.webp", icon: Sparkles },
  { imageSrc: "/career/cc.webp", icon: Flower2 },
  { imageSrc: "/career/cc2.webp", icon: Users },
  { imageSrc: "/career/02_ayurvedic_herbal_tools.webp", icon: Sparkles },
  { imageSrc: "/career/09_herbal_oils_and_ingredients.webp", icon: Flower2 },
];

/** Open jobs from the backend (Admin → Careers → Jobs). null while loading or if the API can't be reached. */
async function fetchOpenJobs(signal: AbortSignal): Promise<JobRole[] | null> {
  try {
    const res = await fetch(`${API_BASE}/careers/jobs`, { cache: "no-store", signal });
    if (!res.ok) return null;
    const json = await res.json();
    const rows: Array<Record<string, unknown>> = Array.isArray(json?.data) ? json.data : [];
    return rows.map((job, index) => {
      const look = CARD_LOOKS[index % CARD_LOOKS.length];
      return {
        title: String(job.title ?? ""),
        location: String(job.location ?? ""),
        type: String(job.employmentType ?? ""),
        description: String(job.description ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(),
        imageSrc: look.imageSrc,
        icon: look.icon,
      };
    });
  } catch {
    return null;
  }
}

export default function ExploreOpportunities() {
  const { openings } = useCareersPage();
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [jobs, setJobs] = useState<JobRole[]>([]);
  const hasJobs = jobs.length > 0;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchOpenJobs(controller.signal).then((live) => {
      if (!controller.signal.aborted && live) setJobs(live);
    });
    return () => controller.abort();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!openings) return null;

  return (
    <>
      <section className="relative w-full overflow-hidden bg-[#FAF8F3] py-5 sm:py-6 lg:py-8 border-b border-[#ECE6DB]">
        {/* Subtle decorative leaf silhouettes for empty state or general ambiance */}
        {!hasJobs && (
          <>
            <div className="pointer-events-none absolute -left-12 top-6 w-48 sm:w-64 opacity-25 mix-blend-multiply">
              <Image
                src="/leaf.webp"
                alt=""
                width={260}
                height={260}
                unoptimized
                className="rotate-[15deg] object-contain"
              />
            </div>
            <div className="pointer-events-none absolute -right-12 top-6 w-48 sm:w-64 opacity-25 mix-blend-multiply">
              <Image
                src="/leaf.webp"
                alt=""
                width={260}
                height={260}
                unoptimized
                className="-rotate-[25deg] scale-x-[-1] object-contain"
              />
            </div>
          </>
        )}

        <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-12 z-10">
          {/* Top Header Row with Title on Left, Toggle Button, and Quote on Right */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 pb-3 sm:pb-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-[12.5px] sm:text-[13px] font-bold tracking-[1.5px] uppercase text-[#A58351]">
                  {openings.eyebrow}
                </span>
              </div>

              <h2 className="mt-1 font-sans text-[32px] sm:text-[38px] lg:text-[42px] font-medium leading-[1.14] text-[#0D3226]">
                {openings.heading}
              </h2>
            </div>

            {/* Right Side: Description and Left-Right Scroll Navigation Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 self-start md:self-auto shrink-0 pt-1 md:pt-0 max-w-lg">
              <div className="flex items-center gap-2.5">
                <p className="text-[14.5px] sm:text-[15px] font-medium leading-[1.55] text-[#4A5950]">
                  {hasJobs ? openings.description : openings.emptyDescription}
                </p>
                {/* Outline Botanical Leaf SVG */}
                <svg
                  className="h-6 w-6 text-[#A58351] shrink-0 hidden sm:block"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
              </div>

              {/* Left / Right Scroll Buttons (visible when jobs are active) */}
              {hasJobs && (
                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => scroll("left")}
                    aria-label="Scroll left"
                    className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-[#D8B45D] bg-white text-[#0D3226] shadow-xs transition-colors hover:bg-[#FAF8F3] hover:text-[#A58351] cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scroll("right")}
                    aria-label="Scroll right"
                    className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-[#D8B45D] bg-white text-[#0D3226] shadow-xs transition-colors hover:bg-[#FAF8F3] hover:text-[#A58351] cursor-pointer"
                  >
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Conditional Rendering: Either Left-to-Right Scrolling Job Cards OR Empty State Card */}
          {hasJobs ? (
            /* Horizontal Left-to-Right Scrolling Container */
            <div
              ref={scrollContainerRef}
              className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth pb-3 pt-1 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:none"
            >
              {jobs.map((job, index) => {
                const IconComp = job.icon;
                return (
                  <div
                    key={`${job.title}-${index}`}
                    className="w-[285px] sm:w-[315px] lg:w-[330px] shrink-0 snap-start group flex flex-col justify-between overflow-hidden rounded-xl border border-[#E3DDCF] bg-[#FAF8F3] shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                  >
                    <div>
                      {/* Image Container */}
                      <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#EAE4D8]">
                        {job.imageSrc ? (
                          <Image
                            src={job.imageSrc}
                            alt={job.title}
                            fill
                            unoptimized
                            sizes="330px"
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="h-full w-full bg-[#EAE4D8]" />
                        )}

                        {/* Floating Circular Badge overlapping bottom left */}
                        <div className="absolute -bottom-3.5 left-4 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border-2 border-[#FAF8F3] bg-[#EAE2D5] text-[#0D3226] shadow-xs">
                          <IconComp className="h-5 w-5 stroke-[1.8]" />
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="pt-5 pb-3 px-4 sm:px-5">
                        <h3 className="font-sans text-[18px] sm:text-[18.5px] font-medium leading-[1.25] text-[#0D3226]">
                          {job.title}
                        </h3>

                        {/* Meta: Location & Employment Type */}
                        <div className="mt-1.5 flex items-center gap-3.5 text-[13px] sm:text-[13.5px] font-semibold">
                          <span className="flex items-center gap-1 text-[#A58351]">
                            <MapPin className="h-3.5 w-3.5" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1 text-[#4A5950] font-medium">
                            <Briefcase className="h-3.5 w-3.5" />
                            {job.type}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="mt-2 text-[13.5px] sm:text-[14px] font-medium leading-[1.5] text-[#4A5950]">
                          {job.description}
                        </p>
                      </div>
                    </div>

                    {/* Card Action Button */}
                    <div className="px-4 sm:px-5 pb-4 pt-1">
                      <Link
                        href={`/careers/apply?role=${encodeURIComponent(job.title)}`}
                        className="group/btn flex w-full items-center justify-center gap-2 rounded-md bg-[#0A3527] py-2.5 text-[14.5px] font-semibold text-white shadow-xs transition-colors hover:bg-[#124534] cursor-pointer"
                      >
                        <span>{openings.buttonLabel}</span>
                        <ArrowRight className="h-4 w-4 text-[#D8B45D] transition-transform duration-200 group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State Card Matching the Reference Image */
            <div className="relative mx-auto my-3 w-full rounded-2xl border border-[#E5DEC9] bg-white/90 backdrop-blur-xs p-8 sm:p-12 text-center shadow-xs">
              {/* Subtle background botanical leaf silhouette */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.06]">
                <Image
                  src="/leaf.webp"
                  alt=""
                  width={300}
                  height={300}
                  unoptimized
                  className="rotate-12 object-contain"
                />
              </div>

              {/* Circular Briefcase Badge */}
              <div className="relative mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border border-[#E3DDCF] bg-[#FAF5E8] text-[#2C5243] shadow-2xs">
                <Briefcase className="h-6 w-6 sm:h-7 sm:w-7 stroke-[1.6] text-[#3D5A49]" />
              </div>

              {/* Title */}
              <h3 className="relative font-sans text-[23px] sm:text-[27px] font-medium text-[#0D3226]">
                {openings.emptyHeading}
              </h3>

              {/* Subtext */}
              <p className="relative mt-2 text-[14.5px] sm:text-[15.5px] font-medium leading-[1.6] text-[#4A5950] max-w-md mx-auto">
                {openings.emptyDescription}
              </p>

              {/* Action Buttons: Share Profile & Restore Openings */}
              <div className="relative mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedJob("General Application")}
                  className="group inline-flex items-center justify-center gap-2 rounded-md bg-[#0A3527] px-5 py-2.5 text-[14.5px] font-semibold text-white shadow-xs transition-colors hover:bg-[#124534] cursor-pointer"
                >
                  <span>{openings.emptyButtonLabel}</span>
                  <ArrowRight className="h-4 w-4 text-[#D8B45D] transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Application / Details Modal */}
      <JobModal
        isOpen={Boolean(selectedJob)}
        onClose={() => setSelectedJob(null)}
        jobTitle={selectedJob || ""}
        isGeneralProfile={selectedJob === "General Application"}
      />
    </>
  );
}
