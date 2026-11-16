"use client";

import { useEffect } from "react";
import { X, MapPin, Briefcase, BarChart2, GraduationCap, Check, Users, Wallet, CalendarDays } from "lucide-react";
import { experienceLabel, type CareerJob } from "@/lib/careers/job";

interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: CareerJob;
}

function Section({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="mt-5">
      <h4 className="font-sans text-[16px] font-bold text-[#0F3526]">{title}</h4>
      <ul className="mt-2 space-y-1.5">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-[14px] leading-[1.4] text-[#4A5950]">
            <span className="mt-0.5 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#0D4F34] text-white">
              <Check className="h-2 w-2 stroke-[3]" />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The whole job description, as published from the admin */
export default function JobDetailsModal({ isOpen, onClose, job }: JobDetailsModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const closing = job.applicationClosingDate ? new Date(job.applicationClosingDate) : null;
  const facts = [
    { icon: MapPin, value: [job.location, job.workplaceType].filter(Boolean).join(" · ") },
    { icon: Briefcase, value: job.employmentType },
    { icon: BarChart2, value: experienceLabel(job) },
    { icon: GraduationCap, value: job.educationRequirements },
    { icon: Users, value: job.totalOpenings > 1 ? `${job.totalOpenings} openings` : "" },
    { icon: Wallet, value: job.salary },
    {
      icon: CalendarDays,
      value: closing && !isNaN(closing.getTime()) ? `Apply by ${closing.toLocaleDateString("en-IN", { dateStyle: "medium" })}` : "",
    },
  ].filter((f) => f.value);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={job.title}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#DCD5C6] bg-[#FAF7F0] p-6 shadow-2xl sm:p-8"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-[#5A6B62] transition-colors hover:bg-[#EAE4D7]"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#8C713A]">
          {[job.company, job.department].filter(Boolean).join(" · ")}
        </span>
        <h3 className="mt-1 pr-8 font-sans text-[26px] font-bold leading-tight text-[#0D3226]">{job.title}</h3>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[13.5px] font-semibold text-[#1E2E25]">
          {facts.map(({ icon: Icon, value }) => (
            <span key={value} className="inline-flex items-center gap-1.5">
              <Icon className="h-3.5 w-3.5 text-[#B89658]" />
              {value}
            </span>
          ))}
        </div>

        {(job.roleObjective || job.description) && (
          <div className="mt-4 space-y-2 border-t border-[#E5DDCF] pt-4 text-[14.5px] leading-relaxed text-[#4E5D55]">
            {job.roleObjective && <p>{job.roleObjective}</p>}
            {job.description && job.description !== job.roleObjective && (
              <p className="whitespace-pre-line">{job.description}</p>
            )}
          </div>
        )}

        <Section title="Key Responsibilities" items={job.responsibilities} />
        <Section title="Requirements" items={job.requirements} />
        <Section title="Required Skills" items={job.skills} />
        <Section title="Preferred Skills" items={job.preferredSkills} />
        <Section title="Preferred Qualifications" items={job.preferredQualifications} />

        {job.reportingTo && (
          <p className="mt-5 text-[14px] text-[#4A5950]">
            <span className="font-bold text-[#0F3526]">Reports to:</span> {job.reportingTo}
          </p>
        )}

        {job.aboutCompany && (
          <div className="mt-5">
            <h4 className="font-sans text-[16px] font-bold text-[#0F3526]">About {job.company}</h4>
            <p className="mt-1.5 whitespace-pre-line text-[14px] leading-relaxed text-[#4A5950]">{job.aboutCompany}</p>
          </div>
        )}
      </div>
    </div>
  );
}
