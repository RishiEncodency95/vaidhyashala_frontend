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
            <span aria-hidden style={at(258, 65, { width: u(80), height: u(2), background: "linear-gradient(90deg,rgba(177,205,124,0),#8DB64F)" })} />
            <span aria-hidden style={at(1078, 65, { width: u(80), height: u(2), background: "linear-gradient(90deg,#8DB64F,rgba(177,205,124,0))" })} />
            <h2 id="explore-title" className={`${poppins.className} font-semibold`} style={cline(708, 66, 38, { color: INK, margin: 0 })}>
              Explore More <span style={{ color: GREEN }}>Ayurvedic Essentials</span>
            </h2>
            <p style={cline(706, 104, 21, { color: "#2B2B2B", margin: 0 })}>Discover wellness products that complement your healing journey.</p>

            {cards.map((c, i) => {
              const x = CARD_X[i];
              const cx = CARD_W / 2;
              return (
                <article
                  key={c.title}
                  style={at(x, 147, {
                    width: u(CARD_W),
                    height: u(330),
                    borderRadius: u(18),
                    background: "linear-gradient(180deg,#FCFBF5 0%,#FBF9EF 55%,#FAF7ED 100%)",
                    boxShadow: `0 ${u(4)} ${u(12)} rgba(60,70,40,0.12), 0 ${u(1)} ${u(2)} rgba(60,70,40,0.06)`,
                  })}
                >
                  <span
                    style={at(13, 11, {
                      height: u(26),
                      display: "flex",
                      alignItems: "center",
                      gap: u(6),
                      paddingLeft: u(12),
                      paddingRight: u(14),
                      borderRadius: u(13),
                      background: "#E8F1D6",
                      fontSize: u(12.62),
                      color: "#222",
                      whiteSpace: "nowrap",
                    })}
                  >
                    <img src={c.tagIcon} alt="" className="mix-blend-multiply" style={{ width: u(20), height: u(20) }} />
                    <span style={{ paddingTop: u(2) }}>{c.tag}</span>
                  </span>
                  <img
                    src={c.image}
                    alt={c.title}
                    className="mix-blend-multiply"
                    style={at(12, 39, {
                      width: u(247),
                      height: u(160),
                      maskImage: "radial-gradient(ellipse 60% 62% at 50% 50%, #000 78%, transparent 100%)",
                      WebkitMaskImage: "radial-gradient(ellipse 60% 62% at 50% 50%, #000 78%, transparent 100%)",
                    })}
                  />
                  <h3 className="font-bold" style={cline(cx, 213, 22, { color: INK, margin: 0 })}>{c.title}</h3>
                  <p style={cline(cx, 237, 16, { color: "#2E2E2E", margin: 0 })}>{c.lines[0]}</p>
                  <p style={cline(cx, 258, 16, { color: "#2E2E2E", margin: 0 })}>{c.lines[1]}</p>
                  <Link
                    href={hrefFor(c.title)}
                    className="group font-semibold text-white transition-[filter] hover:brightness-110"
                    style={at(48, 279, {
                      ...viewBtn,
                      width: u(177),
                      height: u(35),
                      borderRadius: u(18),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: u(6),
                      fontSize: u(13.92),
                    })}
                  >
                    <span style={{ paddingTop: u(2) }}>View Product</span>
                    <ArrowRight className="transition-transform group-hover:translate-x-0.5" style={{ width: u(16), height: u(16) }} strokeWidth={2.6} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= Mobile / tablet ================= */}
      <div className="px-4 py-4 sm:px-6 xl:hidden">
        <h2 className={`${poppins.className} text-center text-[26px] font-semibold leading-tight`} style={{ color: INK }}>
          Explore More <span style={{ color: GREEN }}>Ayurvedic Essentials</span>
        </h2>
        <p className="mt-1 text-center text-[16px] text-[#2B2B2B]">Discover wellness products that complement your healing journey.</p>
        <div className="mt-6 flex snap-x gap-4 overflow-x-auto pb-3 [scrollbar-width:none]">
          {cards.map((c) => (
            <article key={c.title} className="flex w-[250px] shrink-0 snap-start flex-col items-center rounded-[18px] bg-[linear-gradient(180deg,#FCFBF5,#FAF7ED)] p-3 text-center shadow-[0_4px_12px_rgba(60,70,40,0.12)]">
              <span className="flex items-center gap-1.5 self-start rounded-full bg-[#E8F1D6] py-1 pl-2.5 pr-3 text-[13px] text-[#222]">
                <img src={c.tagIcon} alt="" className="h-[18px] w-[18px] mix-blend-multiply" />
                {c.tag}
              </span>
              <img src={c.image} alt={c.title} className="mt-1 h-[150px] w-auto mix-blend-multiply" />
              <h3 className="text-[20px] font-bold" style={{ color: INK }}>{c.title}</h3>
              <p className="text-[15px] leading-tight text-[#2E2E2E]">
                {c.lines[0]}
                <br />
                {c.lines[1]}
              </p>
              <Link href={hrefFor(c.title)} className="mt-3 flex h-[36px] w-[170px] items-center justify-center gap-1.5 rounded-full text-[15px] font-semibold text-white" style={viewBtn}>
                View Product <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
