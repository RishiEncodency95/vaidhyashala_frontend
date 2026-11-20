"use client";

import Link from "next/link";
import { useState, type CSSProperties, type ReactNode } from "react";
import { poppins } from "@/lib/fonts";
import PlanConsultationModal from "@/components/consultation/PlanConsultationModal";

/*
 * Desktop footer is laid out on the reference design's own coordinate grid.
 * The design's content spans 2447 units, mapped onto the same 1440px / lg:px-12
 * container the Navbar uses, so every position and font size scales together.
 * Horizontal positions below are design units from the content's left edge.
 */
const u = (n: number) => `calc(var(--fu) * ${n})`;
const box = (left: number, top: number, extra: CSSProperties = {}): CSSProperties => ({
  position: "absolute",
  left: u(left),
  top: u(top),
  ...extra,
});
/** A single text line whose glyphs are vertically centred on `cy` (Poppins sits high in its line box, hence the +3). */
const line = (left: number, cy: number, size: number, lh = size * 1.3): CSSProperties =>
  box(left, cy + 3 - lh / 2, { fontSize: u(size * 0.87), lineHeight: u(lh), whiteSpace: "nowrap" });

const TEXT = "#F6F8F5";
const GOLD = "#F8D65F";
const GOLD_LINE = "#F0C640";

const CONTAINER = "mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-12";
const STAGE: CSSProperties = { containerType: "inline-size" };
const FU = { "--fu": "calc(100cqw / 2447)" } as CSSProperties;

const features = [
  { icon: "/footer-v3/top1.png", x: 740, top: 28, w: 75, h: 64, tx: 838, a: "Personalised", b: "Treatment" },
  { icon: "/footer-v3/top2.png", x: 1055, top: 28, w: 85, h: 64, tx: 1161, a: "Traditional", b: "Wisdom" },
  { icon: "/footer-v3/top3.png", x: 1373, top: 26, w: 72, h: 68, tx: 1467, a: "Holistic", b: "Wellness" },
  { icon: "/footer-v3/top4.png", x: 1653, top: 26, w: 64, h: 68, tx: 1738, a: "Natural &", b: "Safe Care" },
];

const exploreLinks = [
  { label: "Home", href: "/", cy: 133 },
  { label: "About Us", href: "/about", cy: 189 },
  { label: "Treatments", href: "/treatments", cy: 245 },
  { label: "Our Products", href: "/products", cy: 301 },
  { label: "Patient Testimonials", href: "/testimonials", cy: 356 },
  { label: "Blog", href: "/blog", cy: 412 },
  { label: "Contact Us", href: "/contact", cy: 467 },
];

const services = [
  { label: "Doctor Consultation", href: "/treatments", cy: 132 },
  { label: "Panchakarma Therapies", href: "/panchakarma", cy: 189 },
  { label: "Ayurvedic Treatments", href: "/treatments", cy: 249 },
  { label: "Yoga & Lifestyle Care", href: "/treatments", cy: 307 },
  { label: "Ayurvedic Medicines", href: "/products", cy: 365 },
  { label: "Diet & Nutrition Guidance", href: "/treatments", cy: 423 },
  { label: "Wellness Programs", href: "/treatments", cy: 479 },
];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/vaidhyashala" },
  { label: "Facebook", href: "https://www.facebook.com/vaidhyashala" },
  { label: "YouTube", href: "https://www.youtube.com/@vaidhyashala" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/vaidhyashala" },
  { label: "WhatsApp", href: "https://wa.me/919654900525" },
];

const offices = [
  {
    title: "Head Office – Delhi-NCR, India",
    company: "Namo Gange Wellness Pvt. Ltd.",
    lines: ["Plot No. 12/29, Site II Industrial Area,", "Mohan Nagar, Ghaziabad – 201007, Uttar Pradesh, India."],
    email: "info@namogangewellness.com",
  },
  {
    title: "Regional Office – Visakhapatnam, India",
    company: "Namo Gange Wellness Pvt. Ltd.",
    lines: ["Door No. 36-46-51, 2nd Floor, Main Road,", "Kancharapalem, Visakhapatnam – 530008, Andhra Pradesh, India."],
  },
  {
    title: "Global Office – London (UK)",
    company: "Namo Gange Wellness Ltd.",
    lines: ["6 Liddel Close, Luton, Bedfordshire, LU3 1TW, UK."],
  },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy", x: 602, sep: 547 },
  { label: "Terms & Conditions", href: "/terms", x: 853, sep: 800 },
  { label: "Refund Policy", href: "/terms", x: 1172, sep: 1116 },
  { label: "Sitemap", href: "/sitemap.xml", x: 1424, sep: 1370 },
];

/* eslint-disable @next/next/no-img-element -- fixed-size decorative crops; next/image adds nothing here */
function Img({ src, style, alt = "" }: { src: string; style: CSSProperties; alt?: string }) {
  return <img src={src} alt={alt} draggable={false} style={{ display: "block", mixBlendMode: "lighten", ...style }} />;
}

function Chevron({ double = false, style }: { double?: boolean; style: CSSProperties }) {
  return (
    <svg viewBox={double ? "0 0 24 24" : "0 0 14 24"} fill="none" stroke={GOLD} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden>
      {double ? (
        <>
          <path d="M4 5l7 7-7 7" />
          <path d="M13 5l7 7-7 7" />
        </>
      ) : (
        <path d="M4 5l7 7-7 7" />
      )}
    </svg>
  );
}

function HLine({ left, top, width, color = "rgba(140,165,150,0.22)" }: { left: number; top: number; width: number; color?: string }) {
  return <span aria-hidden style={box(left, top, { width: u(width), height: u(2), background: color })} />;
}

function VLine({ left, top, height, color }: { left: number; top: number; height: number; color: string }) {
  return <span aria-hidden style={box(left, top, { width: u(2), height: u(height), background: color })} />;
}

function Heading({ children, left, cy, size = 35.5 }: { children: ReactNode; left: number; cy: number; size?: number }) {
  return (
    <h3 className="font-bold" style={{ ...line(left, cy + 2, size), color: TEXT, margin: 0 }}>
      {children}
    </h3>
  );
}

function Underline({ left, top, width }: { left: number; top: number; width: number }) {
  return <span aria-hidden style={box(left, top, { width: u(width), height: u(5), background: GOLD_LINE, borderRadius: u(2) })} />;
}

const hoverGold = "transition-colors hover:!text-[#E3C55A]";

/* ------------------------------------------------------------------ */
/* Desktop (lg and up): replica of the reference footer               */
/* ------------------------------------------------------------------ */
function DesktopFooter({ onBook }: { onBook: () => void }) {
  return (
    <div className="hidden lg:block" style={{ color: TEXT }}>
      {/* ---------------- 1. Top bar ---------------- */}
      <div className="relative w-full" style={{ background: "linear-gradient(90deg,#001b0b 0%,#00250d 18%,#00200d 38%,#001d0c 55%,#001a0b 78%,#001a0b 100%)" }}>
        <div className={CONTAINER}>
          <div style={STAGE}>
            <div className="relative" style={{ ...FU, height: u(128) }}>
              <span aria-hidden style={box(10, 25, { width: u(5), height: u(73), background: GOLD_LINE, borderRadius: u(3) })} />
              <p style={{ ...line(40, 40, 38.5), color: TEXT, margin: 0 }}>Your Partner in</p>
              <p className="font-bold" style={{ ...line(40, 82, 44), color: GOLD, margin: 0 }}>
                Holistic Ayurvedic Wellness
              </p>

              {[698, 1015, 1330, 1613, 1897].map((x) => (
                <VLine key={x} left={x} top={25} height={73} color="rgba(79,102,100,0.9)" />
              ))}

              {features.map((f) => (
                <div key={f.a}>
                  <Img src={f.icon} alt={`${f.a} ${f.b}`} style={box(f.x, f.top, { width: u(f.w), height: u(f.h) })} />
                  <p style={{ ...line(f.tx, 43, 24.6, 33), color: TEXT, margin: 0 }}>{f.a}</p>
                  <p style={{ ...line(f.tx, 76, 24.6, 33), color: TEXT, margin: 0 }}>{f.b}</p>
                </div>
              ))}

              <button
                type="button"
                onClick={onBook}
                className="group cursor-pointer font-semibold transition-[filter] hover:brightness-110"
                style={box(1981, 26, {
                  width: u(404),
                  height: u(67),
                  borderRadius: u(12),
                  background: "linear-gradient(180deg,#F9D98C 0%,#F7CF6E 50%,#EBB64C 100%)",
                  boxShadow: `inset 0 ${u(1)} 0 rgba(255,245,210,0.55), 0 ${u(2)} ${u(6)} rgba(0,0,0,0.35)`,
                  color: "#0E1B0E",
                  border: "none",
                  padding: 0,
                  zIndex: 2,
                })}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={box(32, 16, { width: u(34), height: u(34) })}
                  aria-hidden
                >
                  <rect x="3" y="4.5" width="18" height="16.5" rx="1.5" />
                  <line x1="16" y1="2.5" x2="16" y2="6.5" />
                  <line x1="8" y1="2.5" x2="8" y2="6.5" />
                  <line x1="3" y1="9.5" x2="21" y2="9.5" />
                  <path d="M7 13h2M11 13h2M15 13h2M7 17h2M11 17h2M15 17h2" />
                </svg>
                <span style={{ ...line(86, 34, 28), textAlign: "left" }}>Book a Consultation</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:translate-x-0.5"
                  style={box(344, 20, { width: u(30), height: u(28) })}
                  aria-hidden
                >
                  <path d="M3 12h17M14 6l6 6-6 6" />
                </svg>
              </button>

              {/* Divider line + gold swoosh at the bar's right end */}
              <span
                aria-hidden
                style={box(-85, 126, {
                  width: u(2576),
                  height: u(2),
                  background: "linear-gradient(90deg,#2b5316 0%,#7f9a45 14%,#c5cc70 30%,#c9d5bc 50%,#a2bc64 72%,#5d6618 90%,#16360e 100%)", boxShadow: "0 0 6px rgba(190,205,120,0.35)",
                })}
              />
              <Img src="/footer-v3/topswoosh.png" style={box(1965, 97, { width: u(526), height: u(34), zIndex: 1 })} />
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- 2. Main five columns ---------------- */}
      <div
        className="relative w-full"
        style={{ background: "radial-gradient(ellipse 22% 60% at 0% 100%, rgba(0,58,16,0.75) 0%, rgba(0,58,16,0) 100%), radial-gradient(ellipse 22% 60% at 100% 100%, rgba(0,58,16,0.75) 0%, rgba(0,58,16,0) 100%), linear-gradient(90deg,#00210e 0%,#001d0c 14%,#001a0b 45%,#001c0c 70%,#00200d 100%)" }}
      >
        <div className={CONTAINER}>
          <div style={STAGE}>
            <div className="relative" style={{ ...FU, height: u(517) }}>
              {/* Column dividers */}
              {[495, 815, 1296, 1804].map((x) => (
                <span
                  key={x}
                  aria-hidden
                  style={box(x, 34, {
                    width: u(2),
                    height: u(478),
                    background: "linear-gradient(180deg, rgba(80,95,87,0) 0%, rgba(80,95,87,0.9) 12%, rgba(80,95,87,0.9) 88%, rgba(80,95,87,0) 100%)",
                  })}
                />
              ))}

              {/* Column 1: brand */}
              <Link href="/" aria-label="Vaidhyashala Home">
                <Img src="/footer-v3/logo.png?v=2" alt="Vaidhyashala – Innovative Healing" style={box(-5, 17, { width: u(455), height: u(300) })} />
              </Link>
              {["Authentic Ayurvedic care, personalised", "therapies and holistic wellness solutions", "for a healthier, balanced and happier you."].map(
                (t, i) => (
                  <p key={t} style={{ ...line(2, 344 + i * 33, 25.8, 33), color: TEXT, margin: 0 }}>
                    {t}
                  </p>
                ),
              )}
              {socials.map((s, i) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="transition-transform hover:scale-110"
                  style={box([46, 132, 219, 306, 393][i] - 33, 449, { width: u(66), height: u(66) })}
                >
                  <Img src={`/footer-v3/soc${i + 1}.png`} alt={s.label} style={{ width: "100%", height: "100%", borderRadius: "50%" }} />
                </a>
              ))}

              {/* Column 2: explore */}
              <Heading left={537} cy={57}>Explore</Heading>
              <Underline left={537} top={87} width={70} />
              {exploreLinks.map((l) => (
                <Link key={l.label} href={l.href} className={hoverGold} style={{ color: TEXT }}>
                  <span style={line(544, l.cy, 25)}>{l.label}</span>
                  <Chevron style={box(770, l.cy - 11, { width: u(13), height: u(22) })} />
                </Link>
              ))}

              {/* Column 3: services */}
              <Heading left={858} cy={54}>Our Services</Heading>
              <Underline left={858} top={86} width={67} />
              {services.map((s, i) => (
                <Link key={s.label} href={s.href} className={hoverGold} style={{ color: TEXT }}>
                  <Img src={`/footer-v3/svc${i + 1}.png`} style={box(856, s.cy - 24, { width: u(78), height: u(48) })} />
                  <span style={line(957, s.cy, 25.3)}>{s.label}</span>
                  {i === 0 ? (
                    <Chevron double style={box(1240, s.cy - 12, { width: u(24), height: u(24) })} />
                  ) : (
                    <Chevron style={box(1251, s.cy - 11, { width: u(13), height: u(22) })} />
                  )}
                </Link>
              ))}

              {/* Column 4: clinic */}
              <Heading left={1345} cy={50} size={36}>Clinic (Kalkaji, Delhi)</Heading>
              <Underline left={1345} top={84} width={68} />
              {[140, 270, 359, 458].map((cy, i) => (
                <Img key={cy} src={`/footer-v3/clinic${i + 1}.png`} style={box(1343, cy - 34, { width: u(74), height: u(68) })} />
              ))}
              <p className="font-semibold" style={{ ...line(1440, 115, 25), margin: 0 }}>Address</p>
              {["First Floor, E-1, Opposite KFC,", "Kalkaji Main Market, Kalkaji", "Delhi – 110019"].map((t, i) => (
                <p key={t} style={{ ...line(1440, 143 + i * 28.5, 23.2, 28.5), margin: 0 }}>{t}</p>
              ))}
              <HLine left={1415} top={227} width={345} />

              <p className="font-semibold" style={{ ...line(1440, 252, 25), margin: 0 }}>Phone</p>
              <HLine left={1560} top={245} width={215} />
              <a href="tel:+919654900525" className={hoverGold} style={{ ...line(1440, 280, 23.2), color: TEXT }}>
                +91 9654900525
              </a>
              <VLine left={1605} top={249} height={55} color="rgba(140,160,150,0.55)" />
              <a href="tel:+919811979147" className={hoverGold} style={{ ...line(1615, 280, 23.2), color: TEXT }}>
                +91 9811979147
              </a>

              <p className="font-semibold" style={{ ...line(1440, 332, 25), margin: 0 }}>Mail</p>
              <a href="mailto:kalka@theyogshala.com" className={hoverGold} style={{ ...line(1440, 360, 23.2, 28), color: TEXT }}>
                kalka@theyogshala.com
              </a>
              <a href="mailto:customercare@theyogshala.com" className={hoverGold} style={{ ...line(1440, 388, 23.2, 28), color: TEXT }}>
                customercare@theyogshala.com
              </a>
              <HLine left={1415} top={412} width={345} />

              <p className="font-semibold" style={{ ...line(1440, 438, 25), margin: 0 }}>Opening Hours</p>
              <p style={{ ...line(1440, 472, 25.6, 31), margin: 0 }}>Mon to Sat: 6am to 7pm</p>
              <p style={{ ...line(1440, 503, 25.6, 31), margin: 0 }}>Sun: Closed</p>

              {/* Column 5: global presence */}
              <Img src="/footer-v3/globe.png" style={box(1861, 29, { width: u(48), height: u(48) })} />
              <Heading left={1935} cy={50} size={35.4}>Our Global Presence</Heading>
              <Underline left={1935} top={81} width={75} />

              {offices.map((o, i) => {
                const base = [111, 279, 425][i];
                const pinCy = [132, 293, 440][i];
                const tx = i === 0 ? 1940 : 1942;
                return (
                  <div key={o.title}>
                    <Img src={`/footer-v3/pin${i + 1}.png`} style={box(1848, pinCy - 34, { width: u(69), height: u(68) })} />
                    <p className="font-semibold" style={{ ...line(tx, base, 24), color: GOLD, margin: 0 }}>{o.title}</p>
                    <p style={{ ...line(tx, base + 30, 21.5, 25.5), margin: 0 }}>{o.company}</p>
                    {o.lines.map((t, j) => (
                      <p
                        key={t}
                        style={{
                          ...line(tx, base + (i === 2 ? 59 : 55) + j * 26, 21, 25.5),
                          letterSpacing: i === 1 && j === 1 ? "-0.035em" : "-0.01em",
                          margin: 0,
                        }}
                      >
                        {t}
                      </p>
                    ))}
                    {o.email && (
                      <a href={`mailto:${o.email}`} className={hoverGold} style={{ color: TEXT }}>
                        <Img src="/footer-v3/mail.png" style={box(1941, base + 100, { width: u(28), height: u(20) })} />
                        <span style={line(1977, base + 110, 21.5)}>{o.email}</span>
                      </a>
                    )}
                  </div>
                );
              })}
              <HLine left={1910} top={249} width={535} />
              <HLine left={1910} top={394} width={535} />
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Gold ribbon ---------------- */}
      <div className={CONTAINER} style={{ maxWidth: "none", paddingLeft: 0, paddingRight: 0 }}>
        <div style={STAGE}>
          <div
            aria-hidden
            style={{
              height: "calc(100cqw / 2576 * 80)",
              maxHeight: "calc(1440px / 2576 * 80)",
              backgroundImage: "url(/footer-v3/ribbon.png?v=2)",
              backgroundSize: "100% 100%",
              backgroundColor: "#001d0c",
            }}
          />
        </div>
      </div>

      {/* ---------------- 3. Bottom bar ---------------- */}
      <div className="w-full" style={{ background: "linear-gradient(180deg,#00180a 0%,#001a0b 100%)" }}>
        <div className={CONTAINER}>
          <div style={STAGE}>
            <div className="relative" style={{ ...FU, height: u(130) }}>
              <span style={{ ...line(27, 56, 26.3), color: TEXT }}>&copy; 2026 Vaidhyashala. All Rights Reserved.</span>
              {legalLinks.map((l) => (
                <span key={l.label}>
                  <VLine left={l.sep} top={38} height={36} color="#8999A5" />
                  <Link href={l.href} className={hoverGold} style={{ ...line(l.x, 56, 26.3), color: TEXT }}>
                    {l.label}
                  </Link>
                </span>
              ))}
              <span style={{ ...line(1738, 56, 25), color: TEXT }}>Designed, Developed &amp; Maintained By:</span>
              <a
                href="https://encodency.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="enCodency Pvt. Ltd."
                className="font-bold transition-[filter] hover:brightness-110"
                style={box(2183, 27, {
                  width: u(202),
                  height: u(63),
                  borderRadius: u(10),
                  background: "linear-gradient(180deg,#D4161C 0%,#B80F14 55%,#A70C0F 100%)",
                  boxShadow: `0 ${u(2)} ${u(6)} rgba(0,0,0,0.4)`,
                  color: "#F1F3F6",
                })}
              >
                <span style={line(18, 32, 31.7)}>
                  enCodency
                  <sup style={{ fontSize: u(10.44), fontWeight: 400, verticalAlign: "top", position: "relative", top: u(-4), marginLeft: u(1) }}>®</sup>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile / tablet (below lg): same content, stacked                   */
/* ------------------------------------------------------------------ */
function MobileFooter({ onBook }: { onBook: () => void }) {
  const h = "text-[18px] font-bold leading-none";
  const ul = <span className="mt-2 mb-3 block h-[3px] w-[36px] rounded-sm" style={{ background: GOLD_LINE }} />;
  return (
    <div className="lg:hidden" style={{ color: TEXT, background: "#00170b" }}>
      <div className="border-b border-[#768C7D]/40 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="h-10 w-[3px] rounded-full" style={{ background: GOLD_LINE }} />
          <div className="leading-tight">
            <p className="text-[16px]">Your Partner in</p>
            <p className="text-[19px] font-bold" style={{ color: GOLD }}>Holistic Ayurvedic Wellness</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {features.map((f) => (
            <div key={f.a} className="flex items-center gap-2">
              <Img src={f.icon} alt="" style={{ height: 30, width: "auto" }} />
              <span className="text-[13px] leading-tight">
                {f.a}
                <br />
                {f.b}
              </span>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={onBook}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-[15px] font-semibold text-[#0E1B0E] sm:w-auto sm:px-6"
          style={{ background: "linear-gradient(180deg,#F9D98C 0%,#F7CF6E 50%,#EBB64C 100%)" }}
        >
          Book a Consultation →
        </button>
      </div>

      <div className="grid gap-8 px-4 py-8 sm:grid-cols-2 sm:px-6">
        <div>
          <Img src="/footer-v3/logo.png?v=2" alt="Vaidhyashala – Innovative Healing" style={{ width: 210, height: "auto" }} />
          <p className="mt-3 max-w-[300px] text-[14px] leading-relaxed">
            Authentic Ayurvedic care, personalised therapies and holistic wellness solutions for a healthier, balanced and happier you.
          </p>
          <div className="mt-4 flex gap-3">
            {socials.map((s, i) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                <Img src={`/footer-v3/soc${i + 1}.png`} alt={s.label} style={{ width: 36, height: 36, borderRadius: "50%" }} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className={h}>Explore</h3>
          {ul}
          {exploreLinks.map((l) => (
            <Link key={l.label} href={l.href} className="flex items-center justify-between py-1.5 text-[14px]">
              {l.label}
              <Chevron style={{ width: 8, height: 14 }} />
            </Link>
          ))}
        </div>
        <div>
          <h3 className={h}>Our Services</h3>
          {ul}
          {services.map((s, i) => (
            <Link key={s.label} href={s.href} className="flex items-center gap-3 py-1 text-[14px]">
              <Img src={`/footer-v3/svc${i + 1}.png`} style={{ width: 40, height: 25 }} />
              {s.label}
            </Link>
          ))}
        </div>
        <div className="space-y-3 text-[14px]">
          <h3 className={h}>Clinic (Kalkaji, Delhi)</h3>
          {ul}
          <p>
            <b>Address</b>
            <br />
            First Floor, E-1, Opposite KFC,
            <br />
            Kalkaji Main Market, Kalkaji
            <br />
            Delhi – 110019
          </p>
          <p>
            <b>Phone</b>
            <br />
            <a href="tel:+919654900525">+91 9654900525</a> | <a href="tel:+919811979147">+91 9811979147</a>
          </p>
          <p>
            <b>Mail</b>
            <br />
            <a href="mailto:kalka@theyogshala.com">kalka@theyogshala.com</a>
            <br />
            <a href="mailto:customercare@theyogshala.com">customercare@theyogshala.com</a>
          </p>
          <p>
            <b>Opening Hours</b>
            <br />
            Mon to Sat: 6am to 7pm
            <br />
            Sun: Closed
          </p>
        </div>
        <div className="space-y-4 text-[13px] sm:col-span-2">
          <h3 className={h}>Our Global Presence</h3>
          {ul}
          {offices.map((o) => (
            <div key={o.title}>
              <p className="text-[14px] font-semibold" style={{ color: GOLD }}>{o.title}</p>
              <p>{o.company}</p>
              {o.lines.map((t) => (
                <p key={t}>{t}</p>
              ))}
              {o.email && <a href={`mailto:${o.email}`}>{o.email}</a>}
            </div>
          ))}
        </div>
      </div>

      <div aria-hidden className="h-6 w-full" style={{ backgroundImage: "url(/footer-v3/ribbon.png?v=2)", backgroundSize: "100% 100%" }} />
      <div className="flex flex-col items-center gap-3 px-4 py-4 text-center text-[13px]" style={{ background: "#011108" }}>
        <p>&copy; 2026 Vaidhyashala. All Rights Reserved.</p>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
          {legalLinks.map((l) => (
            <Link key={l.label} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span>Designed, Developed &amp; Maintained By:</span>
          <a href="https://encodency.com" target="_blank" rel="noopener noreferrer" className="rounded-md px-2.5 py-1 font-bold text-white" style={{ background: "#B80F14" }}>
            enCodency<sup>®</sup>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const open = () => setIsConsultModalOpen(true);

  return (
    <>
      <footer className={`${poppins.className} relative w-full select-none overflow-hidden`} style={{ background: "#001a0b" }}>
        <DesktopFooter onBook={open} />
        <MobileFooter onBook={open} />
      </footer>
      <PlanConsultationModal isOpen={isConsultModalOpen} onClose={() => setIsConsultModalOpen(false)} />
    </>
  );
}
