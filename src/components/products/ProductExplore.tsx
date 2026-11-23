"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchProducts } from "@/lib/catalog";
import { slugify } from "@/lib/builtinProducts";
import { poppins } from "@/lib/fonts";

export interface ExploreItem {
  title: string;
  tag: string;
  /** Two lines of the short description under the title */
  lines: [string, string];
  image: string;
  tagIcon: string;
}

/**
 * Cards from the design. These products are not in the catalog yet: each card links to the
 * product's own page once a product with the same title exists, and to the product list until then.
 */
export const EXPLORE_ITEMS: ExploreItem[] = [
  { title: "Aloe Vera Juice", tag: "Immunity & Detox", lines: ["Supports Digestion, Detox &", "Healthy Skin."], image: "/explore-v2/prod1.png", tagIcon: "/explore-v2/tag1.png" },
  { title: "Ashwagandha Powder", tag: "Immunity & Vitality", lines: ["Helps Reduce Stress &", "Builds Stamina."], image: "/explore-v2/prod2.png", tagIcon: "/explore-v2/tag2.png" },
  { title: "Chyawanprash", tag: "Daily Wellness", lines: ["A Classical Ayurveda Rasayan", "for Overall Wellness."], image: "/explore-v2/prod3.png", tagIcon: "/explore-v2/tag3.png" },
  { title: "Tulsi Drops", tag: "Respiratory Care", lines: ["Supports Respiratory Health", "& Immunity."], image: "/explore-v2/prod4.png", tagIcon: "/explore-v2/tag4.png" },
  { title: "JointEase Tablets", tag: "Joint & Bone Care", lines: ["Supports Joint Flexibility", "& Mobility."], image: "/explore-v2/prod5.png", tagIcon: "/explore-v2/tag5.png" },
];

/* Design grid: the card row spans 1416 units, mapped onto the page container. */
const u = (n: number) => `calc(var(--eu) * ${n})`;
const at = (left: number, top: number, extra: CSSProperties = {}): CSSProperties => ({ position: "absolute", left: u(left), top: u(top), ...extra });
/** Text line whose glyphs are vertically centred on `cy` (Poppins sits high, hence +2). */
const line = (left: number, cy: number, size: number, extra: CSSProperties = {}): CSSProperties =>
  at(left, cy + 2 - size * 0.65, { fontSize: u(size * 0.87), lineHeight: u(size * 1.3), whiteSpace: "nowrap", ...extra });
const cline = (cx: number, cy: number, size: number, extra: CSSProperties = {}): CSSProperties =>
  line(cx, cy, size, { transform: "translateX(-50%)", textAlign: "center", ...extra });

const INK = "#042D18";
const GREEN = "#4C8A1F";
const CARD_X = [0, 287, 572, 859, 1145];
const CARD_W = 271;

/* eslint-disable @next/next/no-img-element -- fixed-size design crops */

function useCatalogLinks() {
  const [slugs, setSlugs] = useState<Record<string, string>>({});
  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(controller.signal).then((items) => {
      if (controller.signal.aborted || !items) return;
      setSlugs(Object.fromEntries(items.map((p) => [p.title.trim().toLowerCase(), p.slug || slugify(p.title)])));
    });
    return () => controller.abort();
  }, []);
  return (title: string) => {
    const slug = slugs[title.trim().toLowerCase()];
    return slug ? `/products/${slug}` : "/products";
  };
}

export default function ProductExplore({ items = EXPLORE_ITEMS, currentTitle = "" }: { items?: ExploreItem[]; currentTitle?: string }) {
  const hrefFor = useCatalogLinks();
  const cards = items.filter((i) => i.title.toLowerCase() !== currentTitle.toLowerCase()).slice(0, 5);
  if (!cards.length) return null;

  const viewBtn: CSSProperties = {
    background: "linear-gradient(90deg,#6AA721 0%,#55901A 50%,#3D6F0A 100%)",
    boxShadow: "0 3px 6px rgba(61,111,10,0.3), inset 0 1px 0 rgba(255,255,255,0.25)",
  };

  return (
    <section aria-labelledby="explore-title" className={`${poppins.className} w-full bg-white`}>
      {/* ================= Desktop ================= */}
      <div className="mx-auto hidden max-w-[1440px] px-12 xl:block">
        <div style={{ containerType: "inline-size", width: "100%", margin: "0 auto" }}>
          <div className="relative" style={{ "--eu": "calc(100cqw / 1416)", height: u(486) } as CSSProperties}>
            {/* Heading */}
            <span aria-hidden style={at(616, 28, { width: u(57), height: u(2), background: "#B1CD7C" })} />
            <img src="/explore-v2/leaf.png" alt="" style={at(682, 6, { width: u(52), height: u(32) })} />
            <span aria-hidden style={at(744, 28, { width: u(54), height: u(2), background: "#B1CD7C" })} />
            <span aria-hidden style={at(258, 64, { width: u(80), height: u(2), background: "linear-gradient(90deg,rgba(177,205,124,0),#8DB64F)" })} />
            <span aria-hidden style={at(1078, 64, { width: u(80), height: u(2), background: "linear-gradient(90deg,#8DB64F,rgba(177,205,124,0))" })} />
            <h2 id="explore-title" className={`${poppins.className} font-semibold`} style={cline(708, 64, 32, { color: INK, margin: 0, letterSpacing: "-0.01em", fontSize: u(27) })}>
              Explore More <span style={{ color: GREEN }}>Ayurvedic Essentials</span>
            </h2>
            <p className="font-medium" style={cline(706, 96, 17, { color: "#444", margin: 0, fontSize: u(14.5) })}>
              Discover wellness products that complement your healing journey.
            </p>

            {cards.map((c, i) => {
              const x = CARD_X[i];
              const cx = CARD_W / 2;
              return (
                <article
                  key={c.title}
                  style={at(x, 140, {
                    width: u(CARD_W),
                    height: u(324),
                    borderRadius: u(18),
                    background: "linear-gradient(180deg,#FCFBF5 0%,#FBF9EF 55%,#FAF7ED 100%)",
                    boxShadow: `0 ${u(4)} ${u(12)} rgba(60,70,40,0.1), 0 ${u(1)} ${u(2)} rgba(60,70,40,0.05)`,
                  })}
                >
                  <span
                    className="font-medium"
                    style={at(13, 11, {
                      height: u(24),
                      display: "flex",
                      alignItems: "center",
                      gap: u(5),
                      paddingLeft: u(10),
                      paddingRight: u(12),
                      borderRadius: u(12),
                      background: "#E8F1D6",
                      fontSize: u(11.8),
                      color: "#1B4D12",
                      whiteSpace: "nowrap",
                    })}
                  >
                    <img src={c.tagIcon} alt="" className="mix-blend-multiply" style={{ width: u(16), height: u(16) }} />
                    <span>{c.tag}</span>
                  </span>
                  <img
                    src={c.image}
                    alt={c.title}
                    className="mix-blend-multiply"
                    style={at(12, 38, {
                      width: u(247),
                      height: u(155),
                      maskImage: "radial-gradient(ellipse 60% 62% at 50% 50%, #000 78%, transparent 100%)",
                      WebkitMaskImage: "radial-gradient(ellipse 60% 62% at 50% 50%, #000 78%, transparent 100%)",
                    })}
                  />
                  <h3 className="font-semibold" style={cline(cx, 206, 18, { color: INK, margin: 0, fontSize: u(16), letterSpacing: "-0.01em" })}>{c.title}</h3>
                  <div style={at(12, 226, { width: u(CARD_W - 24), textAlign: "center" })}>
                    <p className="font-medium" style={{ fontSize: u(12.5), lineHeight: u(17.5), color: "#4A4A4A", margin: 0 }}>
                      {c.lines[0]}
                      <br />
                      {c.lines[1]}
                    </p>
                  </div>
                  <Link
                    href={hrefFor(c.title)}
                    className="group font-medium text-white transition-[filter] hover:brightness-110"
                    style={at(53, 274, {
                      ...viewBtn,
                      width: u(165),
                      height: u(34),
                      borderRadius: u(17),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: u(6),
                      fontSize: u(13),
                    })}
                  >
                    <span>View Product</span>
                    <ArrowRight className="transition-transform group-hover:translate-x-0.5" style={{ width: u(14), height: u(14) }} strokeWidth={2.2} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= Mobile / tablet ================= */}
      <div className="px-4 py-6 sm:px-6 xl:hidden">
        <h2 className={`${poppins.className} text-center text-[22px] font-semibold leading-tight tracking-[-0.01em] sm:text-[26px]`} style={{ color: INK }}>
          Explore More <span style={{ color: GREEN }}>Ayurvedic Essentials</span>
        </h2>
        <p className="mt-1 text-center text-[13.5px] font-medium text-[#444] sm:text-[14.5px]">Discover wellness products that complement your healing journey.</p>
        <div className="mt-6 flex snap-x gap-4 overflow-x-auto pb-3 [scrollbar-width:none]">
          {cards.map((c) => (
            <article key={c.title} className="flex w-[240px] shrink-0 snap-start flex-col items-center rounded-[18px] bg-[linear-gradient(180deg,#FCFBF5,#FAF7ED)] p-3.5 text-center shadow-[0_4px_12px_rgba(60,70,40,0.1)]">
              <span className="flex items-center gap-1.5 self-start rounded-full bg-[#E8F1D6] py-0.5 pl-2 pr-2.5 text-[11.5px] font-medium text-[#1B4D12]">
                <img src={c.tagIcon} alt="" className="h-[16px] w-[16px] mix-blend-multiply" />
                {c.tag}
              </span>
              <img src={c.image} alt={c.title} className="mt-1 h-[145px] w-auto mix-blend-multiply" />
              <h3 className="mt-1 text-[16px] font-semibold tracking-[-0.01em]" style={{ color: INK }}>{c.title}</h3>
              <p className="mt-1 text-[12.5px] font-medium leading-[1.35] text-[#4A4A4A]">
                {c.lines[0]}
                <br />
                {c.lines[1]}
              </p>
              <Link href={hrefFor(c.title)} className="mt-3 flex h-[34px] w-[155px] items-center justify-center gap-1.5 rounded-full text-[13px] font-medium text-white shadow-sm" style={viewBtn}>
                View Product <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
