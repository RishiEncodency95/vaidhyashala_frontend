"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Mail, Phone } from "lucide-react";
import type { PolicySectionItem } from "@/lib/privacyPage";
import { usePrivacyPage } from "@/lib/privacyPage";

interface SectionData {
  id: string;
  number: string;
  title: string;
  toBeConfirmed?: boolean;
  content: {
    bullets: string[];
    note?: string;
    contactRow?: boolean;
  };
}

const fallbackSections: SectionData[] = [
  {
    id: "scope-responsibility",
    number: "01",
    title: "Scope & responsibility",
    toBeConfirmed: true,
    content: {
      bullets: [
        "This policy applies to information shared through the Vaidhyashala website, including appointment and enquiry forms.",
        "This website is operated by Namo Gange Wellness Pvt. Ltd.",
        "Final operational details, including exact services and workflows, are to be confirmed.",
      ],
    },
  },
  {
    id: "information-you-provide",
    number: "02",
    title: "Information you provide",
    toBeConfirmed: false,
    content: {
      bullets: [
        "Name, mobile number (optional) and email address (optional).",
        "Preferred service, visit date and type of consultation.",
        "Product selection and any other information or messages you submit through the website forms.",
      ],
    },
  },
  {
    id: "sensitive-health-information",
    number: "03",
    title: "Sensitive health information",
    toBeConfirmed: false,
    content: {
      bullets: [
        "Share only details needed for your enquiry or appointment request.",
        "Avoid uploading medical reports or sensitive health information through general enquiry forms.",
        "Clinical records or detailed health information, if required, will be shared through a separate process to be confirmed.",
      ],
    },
  },
  {
    id: "purpose-of-use",
    number: "04",
    title: "Purpose of use",
    toBeConfirmed: true,
    content: {
      bullets: [
        "To respond to your enquiries.",
        "To coordinate requested consultations and appointments.",
        "To provide information about products, services and availability.",
      ],
      note: "These are the intended uses, subject to final workflow confirmation.",
    },
  },
  {
    id: "cookies-website-tools",
    number: "05",
    title: "Cookies & website tools",
    toBeConfirmed: true,
    content: {
      bullets: [
        "The website may use cookies and third-party tools (e.g. analytics or embedded services) to understand website usage and improve functionality.",
        "Cookie preferences and details will depend on the specific tools used and will be documented in the final version.",
        "No claim is made that any specific trackers are currently installed.",
      ],
    },
  },
  {
    id: "access-sharing",
    number: "06",
    title: "Access & sharing",
    toBeConfirmed: true,
    content: {
      bullets: [
        "Access to information will be limited to authorised staff, and any service providers involved in website operations, to be confirmed.",
        "External services such as WhatsApp or map providers (if used) may have their own privacy policies.",
        "Final sharing arrangements, including categories of service providers, will be documented in the final version.",
      ],
    },
  },
  {
    id: "storage-security-retention",
    number: "07",
    title: "Storage, security & retention",
    toBeConfirmed: true,
    content: {
      bullets: [
        "Website hosting location, storage systems and access controls are to be confirmed.",
        "Retention periods for different types of information will be defined in the final version.",
        "While we aim to use reasonable security measures, no specific security guarantees are made at this stage.",
      ],
    },
  },
  {
    id: "choices-privacy-requests",
    number: "08",
    title: "Choices & privacy requests",
    toBeConfirmed: false,
    content: {
      bullets: [
        "Optional fields may be left blank.",
        "You can request correction or deletion of your information, where applicable.",
        "The contact process and response arrangements for privacy requests will be finalised and included in the final version.",
      ],
    },
  },
  {
    id: "children-updates",
    number: "09",
    title: "Children & updates",
    toBeConfirmed: false,
    content: {
      bullets: [
        "If an enquiry involves a child, guardian requirements and consent processes will be confirmed.",
        "Material updates to this policy will be dated and explained in the final version.",
      ],
    },
  },
  {
    id: "contact-questions",
    number: "10",
    title: "Contact & questions",
    toBeConfirmed: false,
    content: {
      bullets: [
        "For privacy-related questions or requests, please contact:",
      ],
      contactRow: true,
      note: "Response arrangements and expected timelines will be provided in the final version.",
    },
  },
];

const toSections = (items: PolicySectionItem[]): SectionData[] =>
  items.map((item, index) => ({
    id: item.anchorId || `section-${index + 1}`,
    number: item.number,
    title: item.title,
    toBeConfirmed: item.toBeConfirmed,
    content: {
      bullets: item.bullets.split("\n").map((b) => b.trim()).filter(Boolean),
      note: item.note || undefined,
      contactRow: item.showContactRow,
    },
  }));

export default function PrivacySections() {
  const { policySections } = usePrivacyPage();
  const sections = useMemo(() => (policySections ? toSections(policySections.items) : fallbackSections), [policySections]);
  const contentsLabel = policySections?.contentsLabel ?? "Contents";
  const toBeConfirmedLabel = policySections?.toBeConfirmedLabel ?? "To be confirmed";
  const contactEmail = policySections?.contactEmail ?? "[Confirmed privacy email]";
  const contactPhone = policySections?.contactPhone ?? "[Confirmed clinic phone]";
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#FAF8F3] py-8 sm:py-10">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Sticky Table of Contents */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-28 rounded-xl border border-[#ECE5D8] bg-[#FAF8F3] p-5 shadow-2xs">
              <span className="text-[11.5px] font-bold tracking-[1.5px] uppercase text-[#A58351]">
                {contentsLabel}
              </span>

              <nav className="mt-4 space-y-1.5" aria-label="Table of contents">
                {sections.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollTo(section.id)}
                      className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-1.5 text-left transition-colors duration-150 ${
                        isActive
                          ? "bg-[#EFE9DF] text-[#0D3226]"
                          : "text-[#5A6860] hover:bg-[#F3EDE2] hover:text-[#0D3226]"
                      }`}
                    >
                      <span
                        className={`flex h-6 w-7 flex-shrink-0 items-center justify-center rounded text-[11px] font-bold transition-colors ${
                          isActive
                            ? "bg-[#0D3226] text-white"
                            : "bg-[#EAE2D5] text-[#0D3226]"
                        }`}
                      >
                        {section.number}
                      </span>
                      <span className="text-[13px] font-medium leading-tight line-clamp-1">
                        {section.title}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Right Column: Detailed 10 Sections */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6 sm:space-y-7">
            {sections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="scroll-mt-28 rounded-xl border border-[#ECE6DB] bg-[#FAF8F3] p-6 sm:p-7 shadow-2xs transition-shadow hover:shadow-xs"
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  {/* Step Number Badge */}
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#EAE2D5] text-[13px] sm:text-[14px] font-bold text-[#0D3226]">
                    {section.number}
                  </div>

                  {/* Section Title & Content */}
                  <div className="flex-1 pt-0.5">
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                      <h2 className="font-serif text-[20px] sm:text-[22px] font-medium text-[#0D3226] leading-snug">
                        {section.title}
                      </h2>

                      {section.toBeConfirmed && (
                        <span className="inline-flex items-center rounded-full border border-[#EDE2CC] bg-[#F9F1E2] px-2.5 py-0.5 text-[11px] font-semibold text-[#8C6D39]">
                          {toBeConfirmedLabel}
                        </span>
                      )}
                    </div>

                    {/* Bullet Items */}
                    <ul className="mt-3.5 space-y-2 text-[13.5px] sm:text-[14px] font-normal leading-[1.65] text-[#4A5950]">
                      {section.content.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-2.5 text-[#8C988F] font-bold">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Contact Specific Row (Section 10) */}
                    {section.content.contactRow && (
                      <div className="mt-3.5 flex flex-wrap items-center gap-4 sm:gap-6 pl-4 text-[13.5px] font-medium text-[#0D3226]">
                        <div className="inline-flex items-center gap-2 rounded-md border border-[#E3DDCF] bg-[#FAF7F2] px-3.5 py-2">
                          <Mail className="h-4 w-4 text-[#A58351]" />
                          <span>{contactEmail}</span>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-md border border-[#E3DDCF] bg-[#FAF8F3] px-3.5 py-2">
                          <Phone className="h-4 w-4 text-[#A58351]" />
                          <span>{contactPhone}</span>
                        </div>
                      </div>
                    )}

                    {/* Special Note / Closing Statement */}
                    {section.content.note && (
                      <p className="mt-2.5 text-[13.5px] sm:text-[14px] font-normal leading-[1.6] text-[#4A5950] pl-4">
                        {section.content.note}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
