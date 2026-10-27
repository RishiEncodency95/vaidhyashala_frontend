"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { ArrowRight, ArrowUp, CalendarDays, ChevronRight, Phone } from "lucide-react";
import { useState } from "react";
import PlanConsultationModal from "@/components/consultation/PlanConsultationModal";

// The footer's text is set in Inter, the font of the Arogya Sangoshthi footer
const inter = Inter({ subsets: ["latin"], display: "swap" });

/**
 * Sizes are written in "design pixels" of a 1600px wide layout and scale with the screen
 * (--u = one design pixel), so the footer keeps the same proportions at every desktop width.
 */
const u = (n: number) => `calc(var(--u) * ${n})`;

type FooterLink = { label: string; href: string };
type TreatmentLink = FooterLink & { icon: string };

const quickLinks: FooterLink[] = [
  { label: "Home", href: "/home" },
  { label: "About Us", href: "/about" },
  { label: "Our Doctors", href: "/about" },
  { label: "Treatments", href: "/treatments" },
  { label: "Panchakarma", href: "/panchakarma" },
  { label: "Our Products", href: "/products" },
  { label: "Patient Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

const treatmentLinks: TreatmentLink[] = [
  { label: "Panchakarma Therapies", href: "/panchakarma", icon: "panchakarma" },
  { label: "Ayurvedic Consultation", href: "/treatments", icon: "consultation" },
  { label: "Pain Management", href: "/treatments", icon: "pain" },
  { label: "Stress Management", href: "/treatments", icon: "stress" },
  { label: "Skin & Hair Care", href: "/treatments", icon: "skin" },
  { label: "Lifestyle Disorders", href: "/treatments", icon: "lifestyle" },
  { label: "Women's Health", href: "/treatments", icon: "women" },
  { label: "Digestive Health", href: "/treatments", icon: "digestive" },
  { label: "Immunity & Wellness", href: "/treatments", icon: "immunity" },
];

// "Book an Appointment" opens the consultation window instead of a page
const supportLinks: (FooterLink | { label: string; action: "book" })[] = [
  { label: "Book an Appointment", action: "book" },
  { label: "FAQs", href: "/faqs" },
  { label: "Patient Guidelines", href: "/treatments" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Refund Policy", href: "/terms" },
  { label: "Disclaimer", href: "/terms" },
  { label: "Sitemap", href: "/home" },
];

const presence: { icon: string; title: string; lines: string[] }[] = [
  {
    icon: "pin",
    title: "Delhi Clinic (Kalkaji)",
    lines: ["Vaidhyashala Clinic, 1st Floor, E-1, Main Market,", "opposite KFC, Block E, Kalkaji, Delhi 110019, India."],
  },
  {
    icon: "head",
    title: "Head Office – Delhi-NCR, India",
    lines: [
      "Namo Gange Wellness Pvt. Ltd.",
      "Plot No. 12/29, Site II Industrial Area, Mohan Nagar,",
      "Ghaziabad 201007, Uttar Pradesh, India.",
      "Email: info@vaidhyashala.com",
    ],
  },
  {
    icon: "regional",
    title: "Regional Office – Visakhapatnam, India",
    lines: [
      "Namo Gange Wellness Pvt. Ltd.",
      "Door No. 36-46-51, 2nd Floor, Main Road, Kancharapalem,",
      "Visakhapatnam 530008, Andhra Pradesh, India.",
    ],
  },
  {
    icon: "london",
    title: "International Office – London, UK",
    lines: ["Namo Gange Wellness Ltd.", "6 Liddel Close, Luton, Bedfordshire LU3 1TW, UK."],
  },
];

/** Text size of an address line; the long Door No line is set a little smaller so it fits the column */
const lineSize = (line: string) => (line.startsWith("Door No") ? 12.3 : 12.8);

function FooterHeading({ children, className = "", size = 21 }: { children: React.ReactNode; className?: string; size?: number }) {
  return (
    <div className={className}>
      <h3
        className="font-semibold leading-none text-[#F6F3E8]"
        style={{ fontSize: u(size * 0.88), letterSpacing: "0.01em" }}
      >
        {children}
      </h3>
      <span className="block bg-[#E0A92E]" style={{ marginTop: u(8), height: u(2.5), width: u(33) }} />
    </div>
  );
}

/** Thin line between two columns (desktop only) */
function Divider() {
  return (
    <span
      aria-hidden="true"
      className="absolute left-0 hidden w-px bg-[#8E8A5A]/45 lg:block"
      style={{ top: u(36), bottom: u(24) }}
    />
  );
}

const rowLink = "group flex items-center justify-between text-[#EDEEE6] transition-colors hover:text-[#E0A92E]";

function Chevron() {
  return (
    <ChevronRight
      className="shrink-0 text-[#F3B71B] transition-transform duration-200 group-hover:translate-x-1"
      style={{ width: u(15), height: u(15) }}
      strokeWidth={2}
    />
  );
}

export default function Footer() {
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);

  return (
    <>
      <footer
        className={`${inter.className} relative w-full overflow-hidden text-[#F0EFE7] [--u:1px] lg:[--u:max(0.8px,calc(100vw/1600))]`}
      >
        {/* 1. Top Consultation Banner */}
        <section aria-label="Ayurvedic Consultation CTA" className="relative w-full overflow-hidden bg-[#F8F6F0]">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'url("/footer-ref/banner-bg-v3.png")', backgroundSize: "100% 100%", backgroundPosition: "center" }}
          />

          <div
            className="relative z-10 mx-auto flex max-w-[1920px] flex-col items-center gap-4 px-6 py-5 lg:flex-row lg:justify-start lg:gap-0 lg:px-0 lg:py-0 lg:pt-[calc(var(--u)*4)]"
            style={{ minHeight: u(77), height: undefined }}
          >
            <div className="text-center lg:text-left lg:ml-[calc(var(--u)*190)] lg:max-w-none">
              <h2
                className="font-bold leading-none text-[#112D23] lg:whitespace-nowrap"
                style={{ fontSize: u(23), letterSpacing: "0.005em" }}
              >
                Begin Your Healing Journey with Expert Ayurvedic Care
              </h2>
              <p
                className="font-semibold uppercase text-[#1E2B25]"
                style={{ marginTop: u(9), marginLeft: u(3), fontSize: u(12.6), letterSpacing: u(1.6) }}
              >
                Personalised Treatment <span className="font-normal text-[#E8B04A]" style={{ margin: `0 ${u(11)}`, fontSize: "0.9em" }}>|</span>
                Traditional Wisdom <span className="font-normal text-[#E8B04A]" style={{ margin: `0 ${u(11)}`, fontSize: "0.9em" }}>|</span>
                Holistic Wellness
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsConsultModalOpen(true)}
              className="group inline-flex shrink-0 items-center justify-center rounded-[6px] bg-[#0B3D29] font-medium text-white transition-colors duration-300 hover:bg-[#10523A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] cursor-pointer lg:ml-[calc(var(--u)*43)]"
              style={{ height: u(40), width: u(240), fontSize: u(16.8), gap: u(12) }}
            >
              <CalendarDays className="text-[#E0A92E] shrink-0" style={{ width: u(19), height: u(19) }} />
              <span>Book a Consultation</span>
              <ArrowRight
                className="text-[#E0A92E] shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                style={{ width: u(17), height: u(17) }}
              />
            </button>

            <p
              className="font-normal text-[#1F1F1B] lg:whitespace-nowrap lg:ml-[calc(var(--u)*21)]"
              style={{ fontSize: u(11.9) }}
            >
              Take the first step towards a healthier, happier you.
            </p>
          </div>
        </section>

        {/* 2. Main Footer Body */}
        <div
          className="relative w-full bg-[#002116]"
        >
          <div className="relative z-10 mx-auto max-w-[1920px] px-6 pb-7 sm:px-8 lg:px-0 lg:pb-[calc(var(--u)*6)]">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[23.75%_14.5%_18.25%_13.75%_29.75%] lg:gap-0">
              {/* Column 1: Brand */}
              <section className="flex flex-col items-center pt-8 lg:items-start lg:pt-0 lg:pl-[calc(var(--u)*78)] lg:pr-4" style={{ paddingTop: undefined }}>
                <div className="lg:pt-[calc(var(--u)*14)] flex flex-col items-center lg:items-start">
                  <Link href="/" aria-label="Vaidhyashala home" className="relative block lg:-ml-[calc(var(--u)*15)]">
                    {/* Soft white glows behind the lettering and the tree, as on the Design House footer logo */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute rounded-full bg-white/[0.08]"
                      style={{ left: "4%", top: "62%", width: "92%", height: "30%", filter: `blur(${u(24)})` }}
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute rounded-full bg-white/[0.025]"
                      style={{ left: "25%", top: "2%", width: "50%", height: "62%", filter: `blur(${u(40)})` }}
                    />
                    <img
                      src="/footerlogo-light-text.png"
                      alt="Vaidhyashala Innovative Healing"
                      className="relative block h-auto max-w-full select-none object-contain"
                      style={{ width: u(270), filter: "drop-shadow(0 0 4px rgba(255,255,255,0.12))" }}
                    />
                    {/* Shine sweep across the logo, masked to its shape */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 animate-[footer-logo-shine_4s_ease-in-out_infinite]"
                      style={{
                        background: "linear-gradient(110deg, transparent 38%, rgba(255,255,255,0.85) 50%, transparent 62%)",
                        backgroundSize: "260% 100%",
                        WebkitMaskImage: "url(/footerlogo-light-text.png)",
                        maskImage: "url(/footerlogo-light-text.png)",
                        WebkitMaskSize: "100% 100%",
                        maskSize: "100% 100%",
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                      }}
                    />
                  </Link>
                  <div className="text-center lg:-ml-[calc(var(--u)*15)]" style={{ width: u(270), marginTop: u(4) }}>
                    <p className="text-[#E4E3D8]" style={{ fontSize: u(13.25), lineHeight: u(16) }}>
                      A Brand of
                    </p>
                    <p className="font-normal text-[#F6F3E8]" style={{ fontSize: u(14.8), lineHeight: u(20), marginTop: u(1) }}>
                      Namo Gange Wellness Pvt. Ltd.
                    </p>
                  </div>

                  <p
                    className="text-left text-[#E4E5DC]"
                    style={{ marginTop: u(12), width: u(262), fontSize: u(13.3), lineHeight: u(19) }}
                  >
                    Vaidhyashala offers authentic Ayurvedic care, personalised therapies and holistic wellness solutions to
                    support a healthier, more balanced life.
                  </p>

                  <a
                    href="tel:+919811979147"
                    className="group flex items-center rounded-[12px] border-[#DDB540] transition-colors hover:bg-[#DDB540]/10"
                    style={{ borderWidth: u(2), borderStyle: "solid", marginTop: u(9), width: u(255), height: u(52), paddingLeft: u(9), gap: u(16) }}
                  >
                    <span
                      className="flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FFE9B3] to-[#FAB92E] text-[#1F1600]"
                      style={{ width: u(40), height: u(40) }}
                    >
                      <Phone className="fill-current" strokeWidth={1.2} style={{ width: u(19), height: u(19) }} />
                    </span>
                    <span>
                      <span className="block font-normal leading-none text-[#F6F3E8]" style={{ fontSize: u(16.5) }}>
                        Call Us
                      </span>
                      <span
                        className="block font-semibold leading-none text-white"
                        style={{ fontSize: u(19.2), marginTop: u(5), letterSpacing: "0.01em" }}
                      >
                        +91 98119 79147
                      </span>
                    </span>
                  </a>
                </div>
              </section>

              {/* Column 2: Quick Links */}
              <nav
                aria-label="Quick links"
                className="relative lg:pl-[calc(var(--u)*31)] lg:pr-[calc(var(--u)*20)] lg:pt-[calc(var(--u)*34)]"
              >
                <Divider />
                <FooterHeading>Quick Links</FooterHeading>
                <ul style={{ marginTop: u(6) }}>
                  {quickLinks.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className={rowLink} style={{ height: u(28.5), fontSize: u(13.3) }}>
                        <span>{link.label}</span>
                        <Chevron />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Column 3: Our Treatments */}
              <nav
                aria-label="Our treatments"
                className="relative lg:pl-[calc(var(--u)*28)] lg:pr-[calc(var(--u)*21)] lg:pt-[calc(var(--u)*34)]"
              >
                <Divider />
                <FooterHeading>Our Treatments</FooterHeading>
                <ul style={{ marginTop: u(5) }}>
                  {treatmentLinks.map(({ label, href, icon }) => (
                    <li key={label}>
                      <Link href={href} className={rowLink} style={{ height: u(32), fontSize: u(13.3) }}>
                        <img
                          src={`/footer-ref/${icon}.png`}
                          alt=""
                          className="shrink-0 object-contain transition-transform duration-200 group-hover:scale-110"
                          style={{ width: u(31), height: u(31), marginRight: u(26) }}
                        />
                        <span className="flex-1">{label}</span>
                        <Chevron />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Column 4: Patient Support */}
              <nav
                aria-label="Patient support"
                className="relative lg:pl-[calc(var(--u)*28)] lg:pr-[calc(var(--u)*20)] lg:pt-[calc(var(--u)*34)]"
              >
                <Divider />
                <FooterHeading>Patient Support</FooterHeading>
                <ul style={{ marginTop: u(6) }}>
                  {supportLinks.map((link) => (
                    <li key={link.label}>
                      {"action" in link ? (
                        <button
                          type="button"
                          onClick={() => setIsConsultModalOpen(true)}
                          className={`${rowLink} w-full cursor-pointer text-left`}
                          style={{ height: u(30.5), fontSize: u(13.3) }}
                        >
                          <span>{link.label}</span>
                          <Chevron />
                        </button>
                      ) : (
                        <Link href={link.href} className={rowLink} style={{ height: u(30.5), fontSize: u(13.3) }}>
                          <span>{link.label}</span>
                          <Chevron />
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Column 5: Our Global Presence */}
              <section
                aria-label="Our global presence"
                className="relative lg:pl-[calc(var(--u)*24)] lg:pr-0 lg:pt-[calc(var(--u)*7)]"
              >
                <Divider />
                <FooterHeading size={23} className="lg:ml-[calc(var(--u)*7)]">Our Global Presence</FooterHeading>
                <ol className="relative" style={{ marginTop: u(10) }}>
                  {/* vertical timeline through the icons */}
                  <span
                    aria-hidden="true"
                    className="absolute bg-[#D9A91A]"
                    style={{ left: u(24.5), width: u(1), top: u(34), bottom: u(36) }}
                  />
                  {presence.map(({ icon, title, lines }, index) => (
                    <li key={title} className="relative flex" style={{ gap: u(19.5), paddingBottom: u(index === 3 ? 0 : 7) }}>
                      <span
                        className="relative z-10 flex shrink-0 items-center justify-center rounded-full bg-[#002116]"
                        style={{ width: u(59), height: u(59), marginTop: u(-8.5), marginLeft: u(-4.5) }}
                      >
                        <span
                          className="flex items-center justify-center rounded-full"
                          style={{ width: u(47), height: u(47), border: `${u(1)} solid #D9A91A` }}
                        >
                          <img
                            src={`/footer-ref/disc-${icon}.png`}
                            alt=""
                            className="block rounded-full select-none"
                            style={{ width: u(32.6), height: u(32.6) }}
                          />
                        </span>
                      </span>
                      <div className="min-w-0" style={{ marginTop: u(-4) }}>
                        <h4 className="font-normal leading-none text-[#F3B71B]" style={{ fontSize: u(14.8), lineHeight: u(18.5) }}>
                          {title}
                        </h4>
                        <p className="text-[#EDEEE6]" style={{ marginTop: u(1.5), lineHeight: u(17), whiteSpace: "nowrap" }}>
                          {lines.map((line, i) => (
                            <span key={i} className="block" style={{ fontSize: u(lineSize(line)) }}>
                              {line}
                            </span>
                          ))}
                        </p>

                        {/* Clinic hours sit inside the Delhi Clinic entry */}
                        {index === 0 && (
                          <div className="flex items-start" style={{ marginTop: u(3), gap: u(15), marginLeft: u(1) }}>
                            <img
                              src="/footer-ref/clock.png"
                              alt=""
                              className="shrink-0 select-none"
                              style={{ width: u(36), height: u(36), marginTop: u(-3), marginLeft: u(-3) }}
                            />
                            <div>
                              <h5 className="font-normal text-[#F3B71B]" style={{ fontSize: u(14.8), lineHeight: u(18.5) }}>
                                Clinic Hours
                              </h5>
                              <p className="text-[#EDEEE6]" style={{ marginTop: u(1), fontSize: u(12.8), lineHeight: u(17), whiteSpace: "nowrap" }}>
                                <span className="block">Monday – Saturday &nbsp;|&nbsp; 9:00 AM – 6:00 PM</span>
                                <span className="block">Sunday: By Appointment Only</span>
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </div>

          {/* 3. Bottom Bar */}
          <div className="relative bg-[#002116]">
            {/* thin pale-gold line along the top of the bar */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0"
              style={{
                height: u(2),
                background:
                  "linear-gradient(90deg, #B8913C 0%, #F3EFD8 7%, #C9A23A 14%, #E9DFA8 25%, #FFFFFF 33%, #C9A23A 42%, #D9B64C 52%, #F5F0DA 62%, #C9A23A 71%, #EFE6B8 82%, #FFFFFF 90%, #B8913C 100%)",
              }}
            />
            {/* Corner leaves */}
            <img
              src="/footer-ref/leaf-left-v2.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 hidden h-full w-auto select-none lg:block"
            />
            <img
              src="/footer-ref/leaf-right-v2.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 right-0 hidden h-full w-auto select-none lg:block"
            />

            <div
              className="relative mx-auto flex max-w-[1920px] flex-col items-center gap-3 px-6 py-4 text-[#E4E5DC] lg:flex-row lg:justify-between lg:gap-[calc(var(--u)*20)] lg:px-[calc(var(--u)*55)] lg:py-[calc(var(--u)*8)]"
              style={{ fontSize: u(12.48), height: undefined }}
            >
              <div className="flex flex-wrap items-center justify-center lg:flex-nowrap">
                <span className="whitespace-nowrap">
                  <span style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>&copy;</span> 2026 Vaidhyashala
                </span>
                <span className="inline-block w-px bg-white/55" style={{ height: u(12), margin: `0 ${u(15)}` }} aria-hidden="true" />
                <span className="whitespace-nowrap">A Brand of Namo Gange Wellness Pvt. Ltd.</span>
                <span className="inline-block w-px bg-white/55" style={{ height: u(12), margin: `0 ${u(15)}` }} aria-hidden="true" />
                <span className="whitespace-nowrap">All Rights Reserved.</span>
              </div>

              <nav
                aria-label="Legal"
                className="flex flex-wrap items-center justify-center lg:flex-nowrap"
              >
                {[
                  { label: "Sitemap", href: "/home" },
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms & Conditions", href: "/terms" },
                  { label: "Refund Policy", href: "/terms" },
                  { label: "Disclaimer", href: "/terms" },
                ].map((link, i) => (
                  <span key={link.label} className="flex items-center">
                    {i > 0 && (
                      <span className="inline-block w-px bg-white/55" style={{ height: u(12), margin: `0 ${u(16)}` }} aria-hidden="true" />
                    )}
                    <Link href={link.href} className="whitespace-nowrap transition-colors hover:text-[#E0A92E]">
                      {link.label}
                    </Link>
                  </span>
                ))}
              </nav>

              <div className="flex shrink-0 items-center" style={{ gap: u(18) }}>
                <span className="whitespace-nowrap" style={{ fontSize: u(11.71) }}>Designed &amp; Developed by</span>
                <a
                  href="https://encodency.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="enCodency Pvt. Ltd."
                  className="shrink-0 transition-opacity hover:opacity-90"
                >
                  <Image
                    src="/encodency-logo.webp"
                    alt="enCodency Pvt. Ltd. - Raise the Bar"
                    width={1600}
                    height={473}
                    className="w-auto rounded-[3px]"
                    style={{ height: u(28) }}
                  />
                </a>
                <button
                  type="button"
                  aria-label="Back to top"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="flex shrink-0 cursor-pointer items-center justify-center rounded-full border-[#F3B71B] text-[#F3B71B] transition-colors hover:bg-[#F3B71B] hover:text-black"
                  style={{ width: u(32), height: u(32), borderWidth: u(2), borderStyle: "solid", marginLeft: u(6) }}
                >
                  <ArrowUp style={{ width: u(14), height: u(14) }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <PlanConsultationModal isOpen={isConsultModalOpen} onClose={() => setIsConsultModalOpen(false)} />
    </>
  );
}
