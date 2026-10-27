"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  FileText,
  Home,
  Lock,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Send,
  Star,
  UserRound,
  X,
} from "lucide-react";
import CareersNavbar from "./CareersNavbar";
import Footer from "@/components/Footer";

interface CompleteApplicationViewProps {
  jobTitle?: string;
  candidateName?: string;
  email?: string;
  phone?: string;
  location?: string;
  dob?: string;
  gender?: string;
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

const referenceInput =
  "w-full h-[24px] rounded-[4px] border border-[#E2DDD3] bg-white px-2 text-[12.5px] font-medium text-[#183153] outline-none focus:border-[#0F5E3C]";

export default function CompleteApplicationView({
  jobTitle = "Ayurvedic Doctor",
  candidateName = "Dr. Ananya Sharma",
  email = "ananya.sharma@gmail.com",
  phone = "+91 98765 43210",
  location = "Delhi NCR",
  dob = "14 Nov 1995",
  gender = "Female",
  matchScore = 85,
}: CompleteApplicationViewProps) {
  const router = useRouter();

  // Application details
  const [positionApplied, setPositionApplied] = useState(jobTitle);
  const [noticePeriod, setNoticePeriod] = useState("30 Days");
  const [expectedSalary, setExpectedSalary] = useState("As per company norms");
  const [joiningPreference, setJoiningPreference] = useState("Within 1 Month");
  const employmentType = "Full Time";

  const locationOptions = ["Delhi NCR", "Kalkaji Clinic", "Noida", "Gurugram", "Faridabad"];
  const [locations, setLocations] = useState(["Delhi NCR", "Kalkaji Clinic"]);
  const removeLocation = (loc: string) => setLocations((prev) => prev.filter((item) => item !== loc));
  const addLocation = (loc: string) => setLocations((prev) => (loc && !prev.includes(loc) ? [...prev, loc] : prev));

  // Additional information
  const whyJoinDefault =
    "I am passionate about Ayurveda and holistic healing. I wish to contribute to Vaidhyashala's mission of making authentic Ayurveda accessible to more people.";
  const skillsDefault = "Panchkarma therapies, patient counselling, wellness program design, yoga therapy.";
  const whyJoinMax = whyJoinDefault.length + 325;
  const skillsMax = skillsDefault.length + 300;
  const [whyJoin, setWhyJoin] = useState(whyJoinDefault);
  const [skills, setSkills] = useState(skillsDefault);

  const experienceAreas = [
    ["Panchkarma", "w-[176px]"],
    ["Yoga Therapy", "w-[186px]"],
    ["Patient Counselling", "w-[202px]"],
    ["Diet & Nutrition", "w-[146px]"],
    ["Research & Publication", "w-[192px]"],
    ["Hospital / Clinical Management", "w-[264px]"],
    ["Community Outreach", "w-[176px]"],
  ];
  const [workedWith, setWorkedWith] = useState<Record<string, boolean>>({
    Panchkarma: true,
    "Yoga Therapy": true,
    "Patient Counselling": true,
  });

  // References
  const [references, setReferences] = useState([
    {
      name: "Dr. Ramesh Gupta",
      designation: "Medical Director",
      organization: "Ayurveda Wellness Clinic",
      contact: "+91 98100 12345",
      email: "ramesh.gupta@mail.com",
    },
    {
      name: "Dr. Neha Singh",
      designation: "Senior Ayurvedic Consultant",
      organization: "Swasthya Ayurveda Center",
      contact: "+91 98765 43210",
      email: "neha.singh@mail.com",
    },
  ]);
  const updateReference = (index: number, field: keyof (typeof references)[number], value: string) =>
    setReferences((prev) => prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)));

  // Before submit
  const [terms, setTerms] = useState({ correct: true, authorize: true, contacted: true, privacy: true });

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (matchScore / 100) * circumference;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      role: positionApplied,
      candidateName,
      email,
      locations: locations.join(", "),
    });
    router.push(`/careers/application-submitted?${params.toString()}`);
  };

  const steps = [
    { label: "Upload CV", sub: "Completed", left: "14.5%" },
    { label: "AI Analysis", sub: "Completed", left: "40.5%" },
    { label: "Review Details", sub: "Completed", left: "63.8%" },
    { label: "Submit Application", sub: "Current Step", left: "86.2%" },
  ];

  const reviewHref = `/careers/review-details?role=${encodeURIComponent(jobTitle)}`;

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col font-sans selection:bg-[#0E5C3D] selection:text-white antialiased overflow-x-hidden">
      {/* 1. TOP NAVBAR */}
      <CareersNavbar />

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

        <div className="relative z-10 mx-auto w-full max-w-[1536px] px-4 sm:px-6 lg:pl-[66px] lg:pr-[56px]">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_460px] gap-3 lg:gap-2.5 items-start">
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
                {/* Application Details */}
                <SectionHeader icon={<UserRound className="w-5 h-5 stroke-[2.4]" />} title="Application Details" />

                <div className="mt-2.5 grid grid-cols-1 md:grid-cols-[296fr_261fr_288fr] gap-x-4 gap-y-2">
                  <label className="block">
                    <FieldLabel required>Position Applied For</FieldLabel>
                    <SelectField value={positionApplied} onChange={setPositionApplied} options={[jobTitle, "Panchakarma Therapist", "Ayurvedic Consultant"].filter((v, i, a) => a.indexOf(v) === i)} />
                  </label>

                  <div>
                    <FieldLabel required>Preferred Location(s)</FieldLabel>
                    <div className="relative h-[31px] rounded-md border border-[#DDD8CE] bg-white pl-1.5 pr-9 flex items-center gap-1.5 overflow-hidden">
                      {locations.map((loc) => (
                        <span key={loc} className="flex items-center gap-1.5 rounded-[4px] bg-[#EEF1EC] border border-[#E1E5DE] px-2 py-[3px] text-[12.5px] font-semibold text-[#183153] whitespace-nowrap">
                          {loc}
                          <button type="button" onClick={() => removeLocation(loc)} aria-label={`Remove ${loc}`} className="text-[#374151] hover:text-[#E0262B]">
                            <X className="w-3 h-3 stroke-[2.6]" />
                          </button>
                        </span>
                      ))}
                      <select
                        value=""
                        onChange={(e) => addLocation(e.target.value)}
                        aria-label="Add preferred location"
                        className="absolute right-0 top-0 h-full w-9 opacity-0 cursor-pointer"
                      >
                        <option value="">Add location</option>
                        {locationOptions
                          .filter((o) => !locations.includes(o))
                          .map((o) => (
                            <option key={o}>{o}</option>
                          ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#374151]" />
                    </div>
                  </div>

                  <label className="block">
                    <FieldLabel required>Notice Period</FieldLabel>
                    <SelectField value={noticePeriod} onChange={setNoticePeriod} options={["Immediate", "15 Days", "30 Days", "60 Days", "90 Days"]} />
                  </label>

                  <label className="block">
                    <FieldLabel required>Expected Salary (CTC)</FieldLabel>
                    <input
                      value={expectedSalary}
                      onChange={(e) => setExpectedSalary(e.target.value)}
                      className="w-full h-[31px] rounded-md border border-[#DDD8CE] bg-white px-3 text-[13px] font-semibold text-[#183153] outline-none focus:border-[#0F5E3C]"
                    />
                  </label>

                  <label className="block">
                    <FieldLabel required>Joining Preference</FieldLabel>
                    <SelectField value={joiningPreference} onChange={setJoiningPreference} options={["Immediately", "Within 15 Days", "Within 1 Month", "Within 2 Months"]} />
                  </label>

                  <label className="block">
                    <span className="block text-[12px] sm:text-[12.5px] font-semibold text-[#9AA1AB] mb-1">Employment Type</span>
                    <div className="relative">
                      <input value={employmentType} disabled className="w-full h-[31px] rounded-md border border-[#E6E3DC] bg-[#F3F3F1] px-3 text-[13px] text-[#9AA1AB]" />
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8BEC6]" />
                    </div>
                  </label>
                </div>

                {/* Additional Information */}
                <div className="mt-2.5">
                  <SectionHeader icon={<FileText className="w-5 h-5 stroke-[2.2]" />} title="Additional Information" />

                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                    <label className="block">
                      <FieldLabel required>Why do you want to join Vaidhyashala?</FieldLabel>
                      <textarea
                        value={whyJoin}
                        maxLength={whyJoinMax}
                        onChange={(e) => setWhyJoin(e.target.value)}
                        className="w-full h-[62px] resize-none rounded-md border border-[#DDD8CE] bg-white px-3 py-1.5 text-[12.5px] leading-[1.4] text-[#495C51] outline-none focus:border-[#0F5E3C]"
                      />
                      <span className="block text-right text-[11.5px] text-[#6B7280]">{whyJoinMax - whyJoin.length} characters left</span>
                    </label>

                    <label className="block">
                      <FieldLabel>Any additional skills or expertise?</FieldLabel>
                      <textarea
                        value={skills}
                        maxLength={skillsMax}
                        onChange={(e) => setSkills(e.target.value)}
                        className="w-full h-[62px] resize-none rounded-md border border-[#DDD8CE] bg-white px-3 py-1.5 text-[12.5px] leading-[1.4] text-[#495C51] outline-none focus:border-[#0F5E3C]"
                      />
                      <span className="block text-right text-[11.5px] text-[#6B7280]">{skillsMax - skills.length} characters left</span>
                    </label>
                  </div>

                  <p className="mt-0.5 text-[12.5px] sm:text-[13px] font-semibold text-[#41536F]">
                    Have you worked with any of these? <span className="text-[#6B7280]">(Optional)</span>
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-x-[14px] gap-y-1.5">
                    {experienceAreas.map(([area, width]) => (
                      <GreenCheckbox
                        key={area}
                        checked={!!workedWith[area]}
                        onChange={(v) => setWorkedWith((prev) => ({ ...prev, [area]: v }))}
                        className={`${width} h-[27px] rounded-md border border-[#E6E2D9] bg-white px-2.5 text-[12.5px] sm:text-[13px] font-medium text-[#3D5045]`}
                      >
                        {area}
                      </GreenCheckbox>
                    ))}
                  </div>
                </div>

                {/* References */}
                <div className="mt-2.5">
                  <SectionHeader icon={<UserRound className="w-5 h-5 stroke-[2.4]" />} title="References" note="(Optional)" />

                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {references.map((ref, i) => (
                      <div key={i} className="rounded-lg border border-[#ECE7DD] bg-[#FDFCF9] px-2 pt-1 pb-2">
                        <p className="text-[12.5px] font-bold text-[#0D5B3A]">Reference {i + 1}</p>
                        <div className="mt-0.5 grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-x-3 gap-y-1">
                          {(
                            [
                              ["Name", "name"],
                              ["Designation", "designation"],
                              ["Organization", "organization"],
                              ["Contact Number", "contact"],
                            ] as const
                          ).map(([label, field]) => (
                            <label key={field} className="block">
                              <span className="block text-[11px] text-[#8A919C] leading-tight mb-0.5">{label}</span>
                              <input value={ref[field]} onChange={(e) => updateReference(i, field, e.target.value)} className={referenceInput} />
                            </label>
                          ))}
                          <label className="block col-span-2">
                            <span className="block text-[11px] text-[#8A919C] leading-tight mb-0.5">Email Address</span>
                            <input value={ref.email} onChange={(e) => updateReference(i, "email", e.target.value)} className={referenceInput} />
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ================= RIGHT COLUMN ================= */}
            <div className="flex flex-col gap-1.5 lg:mt-[8px]">
              {/* Candidate */}
              <div className="rounded-xl border border-[#ECE7DC] bg-white/95 shadow-[0_4px_18px_rgba(0,0,0,0.04)] p-2 flex gap-3.5">
                <div className="relative w-[128px] h-[128px] rounded-lg overflow-hidden shrink-0 bg-[#EDF2EE]">
                  <Image src="/aisc/ananya.webp" alt={candidateName} fill unoptimized className="object-cover object-top" />
                </div>
                <div className="min-w-0 flex-1 pt-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-sans font-bold text-[16.5px] sm:text-[17.5px] text-[#112F24] leading-tight">{candidateName}</h3>
                    <Link href="/careers/apply" className="flex items-center gap-1 text-[13px] sm:text-[13.5px] font-semibold text-[#1877F2] hover:text-[#0D65D9] hover:underline transition-colors">
                      <Pencil className="w-3.5 h-3.5" />
                      Edit
                    </Link>
                  </div>
                  <ul className="mt-1 space-y-[1px] leading-[1.35] text-[12.5px] sm:text-[13px] text-[#495C51]">
                    <li className="flex items-center gap-2.5 min-w-0">
                      <Mail className="w-4 h-4 text-[#0F5E3C] shrink-0" />
                      <span className="truncate">{email}</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#0F5E3C] fill-[#0F5E3C] shrink-0" />
                      {phone}
                    </li>
                    <li className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-[#0F5E3C] fill-[#0F5E3C] stroke-[#0F5E3C] shrink-0 [&>circle]:fill-white" />
                      {location}
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CalendarDays className="w-4 h-4 text-[#0F5E3C] shrink-0" />
                      {dob}
                      <span className="text-[#C3C9D1] px-1.5">|</span>
                      {gender}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Position */}
              <div className="rounded-xl border border-[#ECE7DC] bg-white/95 shadow-[0_4px_18px_rgba(0,0,0,0.04)] px-3 py-2 flex items-center gap-3.5">
                <div className="w-[44px] h-[44px] rounded-lg bg-white border border-[#ECE7DC] shadow-sm flex items-center justify-center shrink-0">
                  <DoctorIcon className="w-8 h-8 text-[#0F5E3C]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-sans font-bold text-[16.5px] sm:text-[17.5px] text-[#112F24] leading-tight">{positionApplied}</h3>
                  <p className="text-[12.5px] sm:text-[13px] text-[#495C51] mt-0.5">
                    {employmentType}
                    <span className="text-[#C3C9D1] px-2">|</span>
                    BAMS / MD (Ayurveda)
                  </p>
                  <p className="flex items-center gap-1.5 text-[12px] sm:text-[12.5px] text-[#495C51] mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#F29A1F] fill-[#F29A1F] [&>circle]:fill-white" />
                    {locations.join(", ") || location}
                  </p>
                </div>
                <Link href="/careers/apply" className="self-start mt-1 flex items-center gap-1 text-[13px] sm:text-[13.5px] font-semibold text-[#1877F2] hover:text-[#0D65D9] hover:underline transition-colors">
                  <Pencil className="w-3.5 h-3.5" />
                  Edit
                </Link>
              </div>

              {/* Profile Match */}
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
                      Strong Match
                    </span>
                  </div>
                  <p className="mt-1 text-[12.5px] sm:text-[13px] text-[#495C51] leading-snug">Your profile matches well with the job requirements.</p>
                  <p className="mt-0.5 text-[12.5px] sm:text-[13px] text-[#495C51] leading-snug">Based on skills, experience and qualifications derived from your CV.</p>
                </div>
              </div>

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
                    I confirm that all the information provided is correct and complete.
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
                    </span>
                  </GreenCheckbox>
                </div>

                <button
                  type="submit"
                  className="mt-3 w-full bg-[#0E5C3D] hover:bg-[#0A472E] text-white py-2 rounded-md font-bold text-[13.5px] sm:text-[14px] flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 fill-white -rotate-12" />
                  Submit Application
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.4]" />
                </button>

                <Link
                  href={reviewHref}
                  className="mt-1.5 w-full border border-[#ECE5D8] bg-white hover:bg-[#FAF8F3] text-[#112F24] py-1.5 rounded-md font-semibold text-[12.5px] sm:text-[13px] flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5 stroke-[2.4]" />
                  Back to Review Details
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

      {/* 4. FOOTER */}
      <Footer />
    </div>
  );
}
