"use client";

import type { CSSProperties, ReactNode } from "react";
import { ChevronRight, ClipboardList, Soup, Sprout, TriangleAlert } from "lucide-react";
import { DEFAULT_PRECAUTIONS, ingredients, netQuantity, productExtras, splitIngredient } from "@/lib/productExtras";

/*
 * "Product Specifications & Usage Guide" block under the product details.
 * Desktop (xl+) is laid out on the reference design's own grid: 1430 units wide,
 * scaled to the page container with container-query units, so it keeps its proportions.
 */
const u = (n: number) => `calc(var(--gu) * ${n})`;
const at = (left: number, top: number, extra: CSSProperties = {}): CSSProperties => ({
  position: "absolute",
  left: u(left),
  top: u(top),
  ...extra,
});
/** One text line whose glyphs are vertically centred on `cy` (Poppins sits high, hence +2). */
const line = (left: number, cy: number, size: number, extra: CSSProperties = {}): CSSProperties =>
  at(left, cy + 2 - size * 0.65, { fontSize: u(size * 0.87), lineHeight: u(size * 1.3), whiteSpace: "nowrap", ...extra });
/** Same, centred horizontally on `cx`. */
const cline = (cx: number, cy: number, size: number, extra: CSSProperties = {}): CSSProperties =>
  line(cx, cy, size, { transform: "translateX(-50%)", textAlign: "center", ...extra });

const INK = "#002702";
const TAB_BG = "linear-gradient(180deg,#20790B 0%,#136409 50%,#034F04 100%)";
const CARD_BORDER = "#C3DFB7";
const ALT_ROW = "#E5F1DC";

/* eslint-disable @next/next/no-img-element -- small fixed-size design crops */

function Tab({ left, top, width, height, icon, label, size, textLeft }: {
  left: number; top: number; width: number; height: number; icon: ReactNode; label: string; size: number; textLeft: number;
}) {
  return (
    <div
      style={at(left, top, {
        width: u(width),
        height: u(height),
        background: TAB_BG,
        borderRadius: `${u(10)} ${u(height / 2)} ${u(height / 2)} ${u(10)}`,
        boxShadow: `0 ${u(2)} ${u(4)} rgba(3,79,4,0.25)`,
        zIndex: 2,
      })}
    >
      <span style={at(28, height / 2, { transform: "translateY(-50%)", display: "flex", color: "#fff" })}>{icon}</span>
      <h3 className="font-semibold text-white" style={line(textLeft - left, height / 2, size, { margin: 0 })}>{label}</h3>
    </div>
  );
}

function Card({ left, top, width, height }: { left: number; top: number; width: number; height: number }) {
  return (
    <div
      aria-hidden
      style={at(left, top, {
        width: u(width),
        height: u(height),
        border: `${u(1.5)} solid ${CARD_BORDER}`,
        borderBottomWidth: u(3),
        borderRadius: u(16),
        background: "#FDFEFD",
        boxShadow: `0 ${u(3)} ${u(8)} rgba(60,120,40,0.08)`,
      })}
    />
  );
}

export default function ProductUsageGuide({ title, productInfo }: { title: string; productInfo: string }) {
  const extras = productExtras(title);
  const subtitle = extras.guideSubtitle || "";
  const steps = extras.howToSteps ?? [];
  const precautions = extras.precautions ?? DEFAULT_PRECAUTIONS;
  const ingList = ingredients(productInfo).map(splitIngredient).slice(0, 3);
  const specs = [
    ["Product Name", title],
    ["Product Category", subtitle || "Ayurvedic Preparation"],
    ["Net Quantity", netQuantity(productInfo) || "As per product label"],
    ["Formulation Type", extras.formulationType || "Classical Ayurvedic Formulation"],
    ["Manufacturer / Marketer", "As per product label"],
    ["Shelf Life", "As per product label"],
    ["Batch No. / Mfg. / Expiry", "Available on bottle label"],
    ["Country of Origin", "India"],
  ];

  /* positions from the design */
  const stepX = [418, 597, 787];
  const stepBox = [
    { l: 384, t: 214, w: 68, h: 63 },
    { l: 563, t: 208, w: 68, h: 65 },
    { l: 752, t: 203, w: 70, h: 65 },
  ];
  const stepTextY = [[287, 303], [281, 297, 312], [277, 293, 309]];
  const ingX = [413, 604, 796];
  const ingImg = [
    { l: 370, t: 370, w: 90, h: 47 },
    { l: 556, t: 360, w: 94, h: 50 },
    { l: 752, t: 352, w: 86, h: 58 },
  ];
  const precIconY = [243, 296, 350, 400];
  const precTextY = [237, 287, 350, 391];
  const specY = [515, 538, 560, 582, 604, 626, 648, 669];

  return (
    <section aria-labelledby="usage-guide-title" className="py-2 lg:py-4">
      {/* ================= Desktop ================= */}
      <div className="hidden xl:block" style={{ containerType: "inline-size", width: "100%", margin: "0 auto" }}>
        <div className="relative" style={{ "--gu": "calc(100cqw / 1430)", height: u(683), marginTop: u(-14), color: INK } as CSSProperties}>
          {/* Heading */}
          <span aria-hidden style={at(545, 42, { width: u(77), height: u(2), background: "#4B754D" })} />
          <span aria-hidden style={at(864, 42, { width: u(68), height: u(2), background: "#4B754D" })} />
          <p className="font-semibold" style={cline(743, 43, 34, { color: INK, letterSpacing: "-0.01em", margin: 0 })}>{title}</p>
          {subtitle && (
            <>
              <span aria-hidden style={at(617, 73, { width: u(251), height: u(25), background: "#E3F3D2", borderRadius: u(13) })} />
              <p className="font-semibold" style={cline(742, 86, 16, { color: "#1B4D12", margin: 0 })}>{subtitle}</p>
            </>
          )}
          <h2 id="usage-guide-title" className="font-semibold" style={cline(744, 129, 32, { color: INK, letterSpacing: "-0.01em", margin: 0 })}>
            Product Specifications &amp; Usage Guide
          </h2>
          <span aria-hidden style={at(683, 158, { width: u(122), height: u(4), background: "#FBC408", borderRadius: u(2) })} />

          {/* Imagery */}
          <img
            src="/product-v2/guide-woman.png"
            alt=""
            className="mix-blend-multiply"
            style={at(0, 100, {
              width: u(296),
              height: u(422),
              filter: "brightness(1.06) contrast(1.04)",
              maskImage: "linear-gradient(90deg,#000 85%,transparent 100%), linear-gradient(180deg,#000 85%,transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskImage: "linear-gradient(90deg,#000 85%,transparent 100%), linear-gradient(180deg,#000 85%,transparent 100%)",
              WebkitMaskComposite: "source-in",
            })}
          />
          <img
            src="/product-v2/guide-herbs.png"
            alt=""
            className="mix-blend-multiply"
            style={at(0, 520, {
              width: u(300),
              height: u(185),
              filter: "brightness(1.06) contrast(1.04)",
              maskImage: "linear-gradient(180deg,transparent 0%,#000 18%)",
              WebkitMaskImage: "linear-gradient(180deg,transparent 0%,#000 18%)",
            })}
          />

          {/* How to use */}
          <Card left={305} top={195} width={587} height={133} />
          <Tab left={303} top={175} width={262} height={37} size={21} textLeft={392} label="How to Use" icon={<Soup style={{ width: u(34), height: u(30) }} strokeWidth={2.2} />} />
          {steps.length ? (
            steps.slice(0, 3).map((s, i) => (
              <div key={i}>
                <img src={`/product-v2/step${i + 1}.png?v=2`} alt="" style={at(stepBox[i].l, stepBox[i].t, { width: u(stepBox[i].w), height: u(stepBox[i].h) })} />
                {s.lines.map((t, j) => (
                  <p
                    key={t}
                    className={i === 2 && j === 2 ? "font-medium" : "font-semibold"}
                    style={cline(stepX[i] + 1, stepTextY[i][j] ?? stepTextY[i][0] + j * 16, 16.5, { color: "#111", margin: 0 })}
                  >
                    {t}
                  </p>
                ))}
                {i < Math.min(steps.length, 3) - 1 && (
                  <ChevronRight style={at([516, 690][i] - 11, 236, { width: u(22), height: u(22), color: "#1F6B12" })} strokeWidth={3.2} />
                )}
              </div>
            ))
          ) : (
            <p style={at(335, 225, { width: u(530), fontSize: u(13.92), lineHeight: u(22), color: "#222" })}>
              Use as directed on the product label or as advised by your treating doctor.
            </p>
          )}

          {/* Key ingredients */}
          <Card left={305} top={352} width={587} height={101} />
          <Tab left={305} top={337} width={265} height={33} size={18.5} textLeft={385} label="Key Ingredients" icon={<Sprout style={{ width: u(30), height: u(26) }} strokeWidth={2.2} />} />
          {ingList.length ? (
            ingList.map((ing, i) => (
              <div key={ing.name}>
                {ing.image && <img src={ing.image} alt="" className="mix-blend-multiply" style={at(ingImg[i].l, ingImg[i].t, { width: u(ingImg[i].w), height: u(ingImg[i].h) })} />}
                <p className="font-semibold" style={cline(ingX[i], 418, 16.5, { color: "#111", margin: 0 })}>{ing.name}</p>
                {ing.botanical && <p style={cline(ingX[i], 436, 15, { color: "#222", margin: 0 })}>({ing.botanical})</p>}
                {i > 0 && <span aria-hidden style={at([510, 698][i - 1], 380, { width: u(1.5), height: u(60), background: "#D9D9DA" })} />}
              </div>
            ))
          ) : (
            <p style={cline(598, 410, 16, { color: "#222", margin: 0 })}>Ingredients as printed on the product label.</p>
          )}

          {/* Precautions */}
          <Card left={910} top={205} width={520} height={250} />
          <Tab left={908} top={175} width={262} height={37} size={21} textLeft={998} label="Precautions" icon={<TriangleAlert style={{ width: u(36), height: u(32) }} strokeWidth={2.2} />} />
          {precautions.slice(0, 4).map((t, i) => (
            <div key={t}>
              <img src={`/product-v2/prec${i + 1}.png`} alt="" style={at(950, precIconY[i] - 26, { width: u(54), height: u(52) })} />
              <p style={at(1025, precTextY[i] - 12, { width: u(372), fontSize: u(14.36), lineHeight: u(20), color: "#111", margin: 0, paddingTop: u(2) })}>{t}</p>
              {i < 3 && <span aria-hidden style={at(1020, [272, 323, 375][i], { width: u(390), height: u(1), background: "#EDEDED" })} />}
            </div>
          ))}

          {/* Specifications */}
          <Card left={310} top={487} width={1118} height={201} />
          <Tab left={307} top={465} width={379} height={37} size={21} textLeft={388} label="Product Specifications" icon={<ClipboardList style={{ width: u(30), height: u(30) }} strokeWidth={2} />} />
          <dl style={{ margin: 0 }}>
            {specs.map(([k, v], i) => (
              <div key={k}>
                {i % 2 === 1 && <span aria-hidden style={at(315, specY[i] - 10.5, { width: u(1109), height: u(21), background: ALT_ROW })} />}
                <dt className="font-semibold" style={line(368, specY[i] + 1, 18, { color: "#111" })}>{k}</dt>
                <span aria-hidden style={line(750, specY[i], 18, { color: "#111" })}>:</span>
                <dd style={line(797, specY[i], 18, { color: "#111", margin: 0 })}>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* ================= Mobile / tablet ================= */}
      <div className="xl:hidden" style={{ color: INK }}>
        <div className="text-center">
          <p className="text-[26px] font-semibold leading-tight">{title}</p>
          {subtitle && <span className="mt-2 inline-block rounded-full bg-[#E3F3D2] px-4 py-0.5 text-[14px] font-semibold text-[#1B4D12]">{subtitle}</span>}
          <h2 className="mt-2 text-[22px] font-semibold leading-tight">Product Specifications &amp; Usage Guide</h2>
          <span className="mx-auto mt-2 block h-[4px] w-[100px] rounded bg-[#FBC408]" />
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <MobileCard title="How to Use" icon={<Soup className="h-6 w-6" />}>
            {steps.length ? (
              <div className="flex items-start justify-around gap-2">
                {steps.slice(0, 3).map((s, i) => (
                  <div key={i} className="flex flex-col items-center text-center text-[13px] font-semibold leading-tight text-[#111]">
                    <img src={`/product-v2/step${i + 1}.png?v=2`} alt="" className="mb-1 h-[54px] w-auto" />
                    {s.lines.map((t) => <span key={t}>{t}</span>)}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[15px]">Use as directed on the product label or as advised by your treating doctor.</p>
            )}
          </MobileCard>
          <MobileCard title="Precautions" icon={<TriangleAlert className="h-6 w-6" />}>
            <ul className="space-y-2">
              {precautions.map((t, i) => (
                <li key={t} className="flex items-center gap-3 text-[14px] text-[#111]">
                  <img src={`/product-v2/prec${(i % 4) + 1}.png`} alt="" className="h-[42px] w-[44px] shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </MobileCard>
          {ingList.length > 0 && (
            <MobileCard title="Key Ingredients" icon={<Sprout className="h-6 w-6" />}>
              <div className="grid grid-cols-3 gap-2 text-center text-[13px] text-[#222]">
                {ingList.map((ing) => (
                  <div key={ing.name} className="flex flex-col items-center">
                    {ing.image && <img src={ing.image} alt="" className="h-[42px] w-auto mix-blend-multiply" />}
                    <b className="text-[14px] text-[#111]">{ing.name}</b>
                    {ing.botanical && <span>({ing.botanical})</span>}
                  </div>
                ))}
              </div>
            </MobileCard>
          )}
          <MobileCard title="Product Specifications" icon={<ClipboardList className="h-6 w-6" />} wide>
            <dl className="text-[14px] text-[#111]">
              {specs.map(([k, v], i) => (
                <div key={k} className="grid grid-cols-[1fr_1fr] gap-2 px-2 py-1" style={i % 2 ? { background: ALT_ROW } : undefined}>
                  <dt className="font-semibold">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </MobileCard>
        </div>
      </div>
    </section>
  );
}

function MobileCard({ title, icon, children, wide = false }: { title: string; icon: ReactNode; children: ReactNode; wide?: boolean }) {
  return (
    <div className={`relative rounded-2xl border-[1.5px] border-b-[3px] bg-[#FDFEFD] px-4 pb-4 pt-9 ${wide ? "md:col-span-2" : ""}`} style={{ borderColor: CARD_BORDER }}>
      <div className="absolute -top-4 left-0 flex h-[36px] items-center gap-2 rounded-l-[10px] rounded-r-full pl-4 pr-6 text-[19px] font-semibold text-white" style={{ background: TAB_BG }}>
        {icon}
        <span className="translate-y-px">{title}</span>
      </div>
      {children}
    </div>
  );
}
