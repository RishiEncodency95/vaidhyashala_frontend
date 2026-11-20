"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { MapPin, Star } from "lucide-react";
import { poppins } from "@/lib/fonts";

export interface ProductTestimonial {
  name: string;
  date: string;
  quote: string;
  city: string;
  /** Show the "Verified Buyer" tick only for reviews from a confirmed order */
  verified?: boolean;
  /** 1–5 */
  rating?: number;
}

/**
 * TODO: PLACEHOLDER copy taken from the design mock-up. These are not real customer reviews.
 * Replace with genuine reviews (pass them as `items`) before this page goes live:
 * publishing invented reviews or a false "Verified Buyer" label breaks India's consumer-protection
 * rules on fake reviews, and health claims in them need to be true.
 */
export const SAMPLE_TESTIMONIALS: ProductTestimonial[] = [
  { name: "Ritu Sharma", date: "12 Oct 2026", city: "Delhi", verified: true, rating: 5, quote: "The products are highly natural and effective. I use Triphala Churna daily, and my digestion has improved significantly." },
  { name: "Amit Kumar", date: "28 Sep 2026", city: "Noida", verified: true, rating: 5, quote: "I take Unka Herbal Juice (Amrit Tulsi) every morning. It has boosted my immunity and made me feel more active throughout the day." },
  { name: "Suman Pandey", date: "20 Sep 2026", city: "Lucknow", verified: true, rating: 5, quote: "I used their Ashwagandha Powder, and it has helped me manage stress better and improve my sleep. Highly recommended!" },
  { name: "Vikas Taneja", date: "15 Sep 2026", city: "Ghaziabad", verified: true, rating: 5, quote: "The product quality and packaging are excellent. I have been using it for 3 months, and the results have been very positive." },
  { name: "Neha Singh", date: "02 Sep 2026", city: "Kanpur", verified: true, rating: 5, quote: "The Aloe Vera Juice is great for my skin and overall wellness. The service was also timely and very satisfactory." },
];

/* Design grid: the card row spans 1344 units, mapped onto the page container. */
const u = (n: number) => `calc(var(--tu) * ${n})`;
const at = (left: number, top: number, extra: CSSProperties = {}): CSSProperties => ({ position: "absolute", left: u(left), top: u(top), ...extra });
/** Text line whose glyphs are vertically centred on `cy` (Poppins sits high, hence +2). */
const line = (left: number, cy: number, size: number, extra: CSSProperties = {}): CSSProperties =>
  at(left, cy + 2 - size * 0.65, { fontSize: u(size * 0.87), lineHeight: u(size * 1.3), whiteSpace: "nowrap", ...extra });
/** Decorations sit at the screen edges, outside the container: scale them with the viewport. */
const dv = (n: number) => `min(calc(100vw * ${n} / 1474), ${((n * 1440) / 1474).toFixed(1)}px)`;

/** Soft-fade a decoration's inner edges into the background. `a` fades along one axis, `b` along the other. */
const fade = (a: string, b: string): CSSProperties => {
  const m = `linear-gradient(${a}, #000 70%, transparent 100%), linear-gradient(${b}, #000 75%, transparent 100%)`;
  return { maskImage: m, WebkitMaskImage: m, maskComposite: "intersect", WebkitMaskComposite: "source-in" };
};

const GOLD = "#F8CD0F";
const LIME = "#B5D334";
const CARD_W = 260;
/** Card pitch on the design grid (card width 260 + gap 11) and cards visible in one row. */
const PITCH = 271;
const PER_ROW = 5;
/** Auto-slide interval and slide duration, in ms. */
const SLIDE_EVERY = 3500;
const SLIDE_MS = 700;

const FEATURES = [
  { icon: "/testimonial-v2/feat1.png", l: 174, w: 60, h: 62, tl: 250, a: "Authentic", b: "Ayurvedic Formulations" },
  { icon: "/testimonial-v2/feat2.png", l: 504, w: 60, h: 60, tl: 586, a: "Quality", b: "Assured" },
  { icon: "/testimonial-v2/feat3.png", l: 740, w: 56, h: 62, tl: 818, a: "Safe &", b: "Effective" },
  { icon: "/testimonial-v2/feat4.png", l: 984, w: 62, h: 58, tl: 1070, a: "Trusted by", b: "Wellness Seekers" },
];

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

/* eslint-disable @next/next/no-img-element -- small fixed-size design crops */

function QuoteMark({ style }: { style: CSSProperties }) {
  return (
    <svg viewBox="0 0 26 20" style={style} aria-hidden>
      {[0, 14].map((x) => (
        <g key={x} fill={LIME}>
          <circle cx={x + 5.5} cy={6} r={5.5} />
          <path d={`M${x + 11} 6 Q${x + 11} 16.5 ${x + 2} 19.5 L${x + 1.2} 17.2 Q${x + 6.2} 14.6 ${x + 6.4} 10.8 Z`} />
        </g>
      ))}
    </svg>
  );
}

function VerifiedTick({ style }: { style: CSSProperties }) {
  return (
    <svg viewBox="0 0 12 12" style={style} aria-hidden>
      <circle cx="6" cy="6" r="6" fill="#43B649" />
      <path d="M3.3 6.2l1.8 1.8 3.6-3.8" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Card({ t, left, top = 136 }: { t: ProductTestimonial; left: number; top?: number }) {
  const stars = Math.round(t.rating ?? 0);
  return (
    <article
      style={at(left, top, {
        width: u(CARD_W),
        height: u(234),
        borderRadius: u(16),
        border: `${u(1.5)} solid rgba(190,225,180,0.78)`,
        background: "linear-gradient(180deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.015) 100%)",
        boxShadow: `0 0 ${u(14)} rgba(0,0,0,0.45)`,
      })}
    >
      <span
        className="font-bold"
        style={at(17, 13, {
          width: u(38),
          height: u(38),
          borderRadius: "50%",
          background: "#566704",
          color: "#fff",
          fontSize: u(14.79),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: u(2),
        })}
      >
        {initials(t.name)}
      </span>
      <p className="font-semibold" style={line(67, 22, 16, { color: "#fff", margin: 0 })}>{t.name}</p>
      <p style={{ ...line(0, 22, 11, { color: "#E8EEE6", margin: 0 }), left: "auto", right: u(14) }}>{t.date}</p>
      {t.verified && (
        <>
          <VerifiedTick style={at(67, 35, { width: u(12), height: u(12) })} />
          <p style={line(84, 41, 12.5, { color: "#E8EEE6", margin: 0 })}>Verified Buyer</p>
        </>
      )}
      {stars > 0 && (
        <span style={at(64, 53, { display: "flex", gap: u(1.5) })} aria-label={`${stars} out of 5 stars`}>
          {Array.from({ length: stars }, (_, i) => (
            <Star key={i} style={{ width: u(19), height: u(19) }} fill="#F5B400" color="#F5B400" strokeWidth={1} />
          ))}
        </span>
      )}
      <blockquote
        style={at(27, 81.4 + 2, {
          margin: 0,
          width: u(222),
          fontSize: u(15.75),
          lineHeight: u(19.2),
          color: "#fff",
          display: "-webkit-box",
          WebkitLineClamp: 5,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        })}
      >
        {t.quote}
      </blockquote>
      <span aria-hidden style={at(27, 188, { width: u(215), height: u(1), background: "rgba(255,255,255,0.28)" })} />
      <MapPin style={at(26, 199, { width: u(16), height: u(16), color: "#fff" })} fill="#fff" stroke="#00220B" strokeWidth={2} />
      <p style={line(52, 207, 16, { color: "#fff", margin: 0 })}>{t.city}</p>
      <QuoteMark style={at(CARD_W - 44, 198, { width: u(26), height: u(20) })} />
    </article>
  );
}

/**
 * Up to 5 reviews sit still in one row. With 6 or more the row slides right-to-left one card at a
 * time and loops: the first 5 cards are repeated after the last so the loop has no visible jump.
 * Hovering or focusing the row pauses it; it stays still for visitors who prefer reduced motion.
 */
function useAutoSlide(count: number) {
  const sliding = count > PER_ROW;
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!sliding || paused) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setAnimate(true);
      setIndex((i) => i + 1);
    }, SLIDE_EVERY);
    return () => window.clearInterval(id);
  }, [sliding, paused]);

  // After sliding onto the repeated copy of the first card, jump back to the real one without animation
  const onSlideEnd = () => {
    if (index < count) return;
    setAnimate(false);
    setIndex(0);
  };
  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  return { sliding, index, animate, onSlideEnd, pause: () => setPaused(true), resume: () => setPaused(false) };
}

export default function ProductTestimonials({ items = SAMPLE_TESTIMONIALS }: { items?: ProductTestimonial[] }) {
  const cards = items;
  const slider = useAutoSlide(cards.length);
  if (!cards.length) return null;
  const track = slider.sliding ? [...cards, ...cards.slice(0, PER_ROW)] : cards;

  return (
    <section
      aria-labelledby="product-testimonials-title"
      className={`${poppins.className} relative mt-[16px] w-full overflow-hidden`}
      style={{ background: "radial-gradient(ellipse 70% 90% at 50% 25%, #00290E 0%, #00220B 55%, #001A08 100%)" }}
    >
      {/* Edge decorations (desktop) */}
      <img src="/testimonial-v2/decor-jar.png" alt="" aria-hidden className="pointer-events-none absolute left-0 hidden xl:block" style={{ top: dv(235), width: dv(68), height: dv(145), ...fade("90deg", "180deg") }} />
      <img src="/testimonial-v2/decor-mortar.png" alt="" aria-hidden className="pointer-events-none absolute bottom-0 left-0 hidden xl:block" style={{ width: dv(205), height: dv(123), ...fade("90deg", "0deg") }} />
      <img src="/testimonial-v2/decor-right.png" alt="" aria-hidden className="pointer-events-none absolute right-0 hidden xl:block" style={{ top: dv(230), width: dv(56), height: dv(206), ...fade("270deg", "180deg") }} />

      {/* ================= Desktop ================= */}
      <div className="mx-auto hidden max-w-[1440px] px-12 xl:block">
        <div style={{ containerType: "inline-size", width: "100%", margin: "0 auto" }}>
          <div className="relative" style={{ "--tu": "calc(100cqw / 1344)", height: u(458), marginTop: u(-20) } as CSSProperties}>
            <span aria-hidden style={at(255, 68, { width: u(133), height: u(2), background: "linear-gradient(90deg, rgba(248,205,15,0) 0%, #FFE504 100%)" })} />
            <span aria-hidden style={at(948, 68, { width: u(134), height: u(2), background: "linear-gradient(90deg, #FFE504 0%, rgba(248,205,15,0) 100%)" })} />
            <h2
              id="product-testimonials-title"
              className={`${poppins.className} font-semibold`}
              style={line(668, 55, 38, { transform: "translateX(-50%)", color: "#fff", margin: 0, letterSpacing: "0.005em" })}
            >
              Customer <span style={{ color: GOLD }}>Testimonials</span>
            </h2>
            <p style={line(666, 92, 22, { transform: "translateX(-50%)", color: "#fff", margin: 0 })}>Trusted by Our Wellness Community</p>
            <span aria-hidden style={at(657, 116, { width: u(50), height: u(3), background: GOLD, borderRadius: u(2) })} />

            {/* Card row: clipped window (with room for the cards' glow) around a sliding track */}
            <div
              onMouseEnter={slider.pause}
              onMouseLeave={slider.resume}
              onFocus={slider.pause}
              onBlur={slider.resume}
              aria-roledescription={slider.sliding ? "carousel" : undefined}
              style={at(-8, 122, { width: u(1344 + 16), height: u(262), overflow: "hidden" })}
            >
              <div
                onTransitionEnd={slider.onSlideEnd}
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: `translateX(calc(var(--tu) * ${-slider.index * PITCH}))`,
                  transition: slider.animate ? `transform ${SLIDE_MS}ms ease-in-out` : "none",
                }}
              >
                {track.map((t, i) => (
                  <Card key={t.name + i} t={t} left={8 + i * PITCH} top={14} />
                ))}
              </div>
            </div>

            {FEATURES.map((f, i) => (
              <div key={f.a}>
                <img src={f.icon} alt="" className="mix-blend-lighten" style={at(f.l, 390, { width: u(f.w), height: u(f.h) })} />
                <p style={line(f.tl, 409, 17.5, { color: "#fff", margin: 0 })}>{f.a}</p>
                <p style={line(f.tl, 431, 17.5, { color: "#fff", margin: 0 })}>{f.b}</p>
                {i < 3 && <span aria-hidden style={at([461, 702, 938][i], 400, { width: u(1.5), height: u(44), background: "#C9B53A" })} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= Mobile / tablet ================= */}
      <div className="px-4 py-6 text-white sm:px-6 xl:hidden">
        <h2 className={`${poppins.className} text-center text-[28px] font-semibold leading-tight`}>
          Customer <span style={{ color: GOLD }}>Testimonials</span>
        </h2>
        <p className="mt-1 text-center text-[17px]">Trusted by Our Wellness Community</p>
        <span className="mx-auto mt-2 block h-[3px] w-[50px] rounded" style={{ background: GOLD }} />
        <div className="mt-6 flex snap-x gap-4 overflow-x-auto pb-2 [scrollbar-width:none]">
          {cards.map((t, i) => (
            <article key={t.name + i} className="w-[260px] shrink-0 snap-start rounded-2xl border-[1.5px] border-[rgba(190,225,180,0.78)] p-4">
              <div className="flex items-start gap-3">
                <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#566704] pt-0.5 text-[16px] font-bold">{initials(t.name)}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <b className="truncate text-[16px]">{t.name}</b>
                    <span className="shrink-0 text-[11px] text-[#E8EEE6]">{t.date}</span>
                  </div>
                  {t.verified && (
                    <span className="flex items-center gap-1 text-[12.5px] text-[#E8EEE6]">
                      <VerifiedTick style={{ width: 12, height: 12 }} /> Verified Buyer
                    </span>
                  )}
                </div>
              </div>
              {(t.rating ?? 0) > 0 && (
                <div className="mt-1 flex gap-0.5 pl-[50px]">
                  {Array.from({ length: Math.round(t.rating ?? 0) }, (_, s) => (
                    <Star key={s} className="h-[18px] w-[18px]" fill="#F5B400" color="#F5B400" strokeWidth={1} />
                  ))}
                </div>
              )}
              <p className="mt-2 text-[16px] leading-[1.25]">{t.quote}</p>
              <div className="mt-3 flex items-center justify-between border-t border-white/25 pt-3">
                <span className="flex items-center gap-2 text-[15px]">
                  <MapPin className="h-4 w-4" fill="#fff" stroke="#00220B" strokeWidth={2} /> {t.city}
                </span>
                <QuoteMark style={{ width: 24, height: 18 }} />
              </div>
            </article>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          {FEATURES.map((f) => (
            <div key={f.a} className="flex items-center gap-3">
              <img src={f.icon} alt="" className="h-[44px] w-auto mix-blend-lighten" />
              <span className="text-[14px] leading-tight">
                {f.a}
                <br />
                {f.b}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
