"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Mail, Phone } from "lucide-react";
import type { PolicySectionItem } from "@/lib/privacyPage";
import { useTermsPage } from "@/lib/termsPage";

interface SectionData {
  id: string;
  number: string;
  title: string;
  toBeConfirmed?: boolean;
  content: {
    bullets: string[];
    contactRow?: boolean;
    closingNote?: string;
  };
}

const fallbackSections: SectionData[] = [
  {
    id: "scope-operator",
    number: "01",
    title: "Scope & operator",
    toBeConfirmed: true,
    content: {
      bullets: [
        "These terms apply to your use of the Vaidhyashala website, including information, appointment and enquiry forms, and product information.",
        "This website is operated by Namo Gange Wellness Pvt. Ltd.",
        "Final operator contact details, including exact services and workflows, are to be confirmed.",
      ],
    },
  },
  {
    id: "website-information",
    number: "02",
    title: "Website information",
    toBeConfirmed: false,
    content: {
      bullets: [
        "Information about our Ayurveda services, treatments, Panchakarma therapies and products is provided for general information.",
        "Suitability for any treatment or product is assessed during a consultation with our qualified practitioners.",
        "Final content, service details and availability on this website are confirmed by the clinic.",
      ],
    },
  },
  {
    id: "consultations-care",
    number: "03",
    title: "Consultations & care",
    toBeConfirmed: false,
    content: {
      bullets: [
        "Website content does not replace an individual assessment or consultation with our practitioners.",
        "Our recommendations depend on your medical history, current condition and individual needs.",
        "Please continue any prescribed care unless your treating doctor advises otherwise.",
      ],
    },
  },
  {
    id: "appointment-requests",
    number: "04",
    title: "Appointment requests",
    toBeConfirmed: false,
    content: {
      bullets: [
        "Submitting an appointment form on this website is a request, not a confirmed booking.",
        "Date, time, doctor and service availability are subject to clinic confirmation.",
        "Our clinic team will contact you to coordinate and confirm your appointment.",
      ],
    },
  },
  {
    id: "changes-cancellations",
    number: "05",
    title: "Changes & cancellations",
    toBeConfirmed: true,
    content: {
      bullets: [
        "Please contact the clinic if you need to change or cancel an appointment request.",
        "Rescheduling is subject to doctor and clinic availability.",
        "Any fees or cancellation terms, if applicable, will be confirmed and communicated separately by the clinic.",
      ],
    },
  },
  {
    id: "product-catalogue",
    number: "06",
    title: "Product catalogue",
    toBeConfirmed: false,
    content: {
      bullets: [
        "Product information on this website is for general information and enquiries only.",
        "There is no online checkout or payment on this website.",
        "Pack sizes, formulations and product availability are confirmed by the clinic during your enquiry.",
      ],
    },
  },
  {
    id: "enquiries-user-details",
    number: "07",
    title: "Enquiries & user details",
    toBeConfirmed: false,
    content: {
      bullets: [
        "Please provide accurate and up-to-date contact information, including your name, mobile number and email address.",
        "Share only details relevant to your enquiry or appointment.",
        "Do not submit another person's details without their appropriate permission.",
      ],
    },
  },
  {
    id: "responsible-website-use",
    number: "08",
    title: "Responsible website use",
    toBeConfirmed: false,
    content: {
      bullets: [
        "Do not submit spam, false or misleading enquiries.",
        "Do not attempt unauthorised access to the website, systems or data.",
        "Respect the website content and other users.",
      ],
    },
  },
  {
    id: "external-services-updates",
    number: "09",
    title: "External services & updates",
    toBeConfirmed: false,
    content: {
      bullets: [
        "This website may include links to external services (e.g. maps, analytics or embedded tools) which may have their own terms.",
        "Service availability and website information may change from time to time.",
        "The final version of these terms will include an effective date.",
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
        "For questions about these terms or your use of the website, please contact:",
      ],
      contactRow: true,
      closingNote: "Final contact details and operational policies are to be confirmed by the clinic.",
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
      closingNote: item.note || undefined,
      contactRow: item.showContactRow,
    },
  }));

export default function TermsSections() {
  const { policySections } = useTermsPage();
  const sections = useMemo(() => (policySections ? toSections(policySections.items) : fallbackSections), [policySections]);
  const contentsLabel = policySections?.contentsLabel ?? "Contents";
  const toBeConfirmedLabel = policySections?.toBeConfirmedLabel ?? "To be confirmed";
  const contactEmail = policySections?.contactEmail ?? "[Confirmed clinic email]";
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

                    {/* Closing Note */}
                    {section.content.closingNote && (
                      <ul className="mt-2 text-[13.5px] sm:text-[14px] font-normal leading-[1.65] text-[#4A5950]">
                        <li className="flex items-start">
                          <span className="mr-2.5 text-[#8C988F] font-bold">•</span>
                          <span>{section.content.closingNote}</span>
                        </li>
                      </ul>
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
