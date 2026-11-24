"use client";

import type { CSSProperties, ReactNode } from "react";
import { ChevronRight, ClipboardList, Soup, Sprout, TriangleAlert } from "lucide-react";
import { DEFAULT_PRECAUTIONS, extractFromInfo, ingredients, netQuantity, productExtras, splitIngredient } from "@/lib/productExtras";

export interface ProductUsageGuideProps {
  title: string;
  category?: string;
  productInfo?: string;
  directions?: string;
  usageNotes?: string;
  productType?: string;
  packOptions?: string;
  description?: string;
  howToStep1?: string;
  howToStep2?: string;
  howToStep3?: string;
  keyIngredients?: string;
  precautionsText?: string;
  netQuantity?: string;
  formulationType?: string;
  manufacturer?: string;
  shelfLife?: string;
  batchExpiry?: string;
  countryOfOrigin?: string;
}

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

function Tab({ left, top, width, height, icon, label, size }: {
  left: number; top: number; width: number; height: number; icon: ReactNode; label: string; size: number; textLeft?: number;
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: u(10),
        paddingLeft: u(16),
        paddingRight: u(16),
      })}
    >
      <span style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>
        {icon}
      </span>
      <h3
        className="font-medium text-white"
        style={{
          fontSize: u(size * 0.87),
          lineHeight: 1,
          margin: 0,
          whiteSpace: "nowrap",
          letterSpacing: "-0.01em",
          textAlign: "center",
        }}
      >
        {label}
      </h3>
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

export default function ProductUsageGuide({
  title,
  category = "",
  productInfo = "",
  directions = "",
  usageNotes = "",
  productType = "",
  packOptions = "",
  howToStep1 = "",
  howToStep2 = "",
  howToStep3 = "",
  keyIngredients = "",
  precautionsText = "",
  netQuantity: netQuantityProp = "",
  formulationType: formulationTypeProp = "",
  manufacturer: manufacturerProp = "",
  shelfLife: shelfLifeProp = "",
  batchExpiry: batchExpiryProp = "",
  countryOfOrigin: countryOfOriginProp = "",
}: ProductUsageGuideProps) {
  const isTriphala = title.toLowerCase().includes("triphala");
  const extras = productExtras(title);
  const subtitle = category || productType || extras.guideSubtitle || "Classical Ayurvedic Formulation";

  // Steps
  const customStepStrings = [howToStep1, howToStep2, howToStep3].map((s) => s.trim()).filter(Boolean);
  const parseStepLines = (step: string): string[] => {
    if (step.includes("\n")) return step.split("\n").map((s) => s.trim()).filter(Boolean);
    const m = step.match(/^(.*?)\s*(\(.*?\))\s*$/);
    if (m) return [m[1].trim(), m[2].trim()];
    const m2 = step.match(/^(Mix with)\s+(.+)$/i);
    if (m2) return [m2[1], m2[2]];
    return [step];
  };
  const customSteps = customStepStrings.map((s) => ({ lines: parseStepLines(s) }));
  const steps = customSteps.length ? customSteps : (isTriphala && extras.howToSteps?.length ? extras.howToSteps : []);

  // Key Ingredients
  const ingRawLines = keyIngredients.trim()
    ? keyIngredients.split("\n").map((l) => l.trim()).filter(Boolean)
    : ingredients(productInfo);
  const ingList = ingRawLines.map(splitIngredient).slice(0, 3);

  // Precautions
  const customPrecautions = precautionsText.trim()
    ? precautionsText.split("\n").map((l) => l.trim()).filter(Boolean)
    : [];
  const precautions = customPrecautions.length ? customPrecautions : (extras.precautions ?? DEFAULT_PRECAUTIONS);

  // Specifications
  const netQty =
    netQuantityProp.trim() ||
    (packOptions && packOptions !== "Confirm with the clinic" ? packOptions : "") ||
    netQuantity(productInfo) ||
    extras.netQuantity ||
    "As per pack";
  const formType =
    formulationTypeProp.trim() ||
    productType ||
    extractFromInfo(productInfo, "Formulation Type") ||
    extras.formulationType ||
    "Classical Ayurvedic Formulation";
  const mfg =
    manufacturerProp.trim() ||
    extractFromInfo(productInfo, "Manufacturer / Marketer") ||
    extractFromInfo(productInfo, "Manufacturer") ||
    "As per product label";
  const shelfLife =
    shelfLifeProp.trim() ||
    extractFromInfo(productInfo, "Shelf Life") ||
    "As per product label";
  const batchInfo =
    batchExpiryProp.trim() ||
    extractFromInfo(productInfo, "Batch No. / Mfg. / Expiry") ||
    extractFromInfo(productInfo, "Batch") ||
    "Available on bottle label";
  const country =
    countryOfOriginProp.trim() ||
    extractFromInfo(productInfo, "Country of Origin") ||
    "India";

  const specs = [
    ["Product Name", title || "Ayurvedic Product"],
    ["Product Category", category || subtitle || "Ayurvedic Preparations"],
    ["Net Quantity", netQty],
    ["Formulation Type", formType],
    ["Manufacturer / Marketer", mfg],
    ["Shelf Life", shelfLife],
    ["Batch No. / Mfg. / Expiry", batchInfo],
    ["Country of Origin", country],
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
  const specY = [514, 537, 560, 583, 606, 629, 652, 674];

  return (
    <section aria-labelledby="usage-guide-title" className="py-2 lg:py-4">
      {/* ================= Desktop ================= */}
      <div className="hidden xl:block" style={{ containerType: "inline-size", width: "100%", margin: "0 auto" }}>
        <div className="relative" style={{ "--gu": "calc(100cqw / 1430)", height: u(700), marginTop: u(-14), color: INK } as CSSProperties}>
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
          <Tab left={303} top={175} width={262} height={37} size={18} textLeft={392} label="How to Use" icon={<Soup style={{ width: u(26), height: u(24) }} strokeWidth={2} />} />
          {steps.length ? (
            steps.slice(0, 3).map((s, i) => (
              <div key={i}>
                <img src={`/product-v2/step${i + 1}.png?v=2`} alt="" style={at(stepBox[i].l, stepBox[i].t, { width: u(stepBox[i].w), height: u(stepBox[i].h) })} />
                {s.lines.map((t, j) => (
                  <p
                    key={t}
                    className="font-medium"
                    style={cline(stepX[i] + 1, stepTextY[i][j] ?? stepTextY[i][0] + j * 16, 15, { color: "#111", margin: 0 })}
                  >
                    {t}
                  </p>
                ))}
                {i < Math.min(steps.length, 3) - 1 && (
                  <ChevronRight style={at([516, 690][i] - 11, 236, { width: u(20), height: u(20), color: "#1F6B12" })} strokeWidth={2.8} />
                )}
              </div>
            ))
          ) : (
            <div style={at(335, 222, { width: u(530), color: "#222" })}>
              <p className="font-medium" style={{ fontSize: u(13.5), lineHeight: u(20), margin: 0 }}>
                {directions || "Use as directed on the product label or as advised by your treating doctor."}
              </p>
            </div>
          )}

          {/* Key ingredients */}
          <Card left={305} top={352} width={587} height={101} />
          <Tab left={305} top={337} width={265} height={33} size={17} textLeft={385} label="Key Ingredients" icon={<Sprout style={{ width: u(24), height: u(22) }} strokeWidth={2} />} />
          {ingList.length ? (
            ingList.map((ing, i) => (
              <div key={ing.name}>
                {ing.image && <img src={ing.image} alt="" className="mix-blend-multiply" style={at(ingImg[i].l, ingImg[i].t, { width: u(ingImg[i].w), height: u(ingImg[i].h) })} />}
                <p className="font-medium" style={cline(ingX[i], 418, 15, { color: "#111", margin: 0 })}>{ing.name}</p>
                {ing.botanical && <p className="font-normal" style={cline(ingX[i], 436, 13.5, { color: "#555", margin: 0 })}>({ing.botanical})</p>}
                {i > 0 && <span aria-hidden style={at([510, 698][i - 1], 380, { width: u(1.5), height: u(60), background: "#D9D9DA" })} />}
              </div>
            ))
          ) : (
            <p className="font-medium" style={cline(598, 410, 14, { color: "#333", margin: 0 })}>
              Ingredients as printed on the product label. Ask our clinic team for complete details.
            </p>
          )}

          {/* Precautions */}
          <Card left={910} top={205} width={520} height={250} />
          <Tab left={908} top={175} width={262} height={37} size={18} textLeft={998} label="Precautions" icon={<TriangleAlert style={{ width: u(26), height: u(24) }} strokeWidth={2} />} />
          {precautions.slice(0, 4).map((t, i) => (
            <div key={t}>
              <img src={`/product-v2/prec${i + 1}.png`} alt="" style={at(950, precIconY[i] - 22, { width: u(44), height: u(42) })} />
              <p className="font-medium" style={at(1015, precTextY[i] - 10, { width: u(380), fontSize: u(13.5), lineHeight: u(19), color: "#222", margin: 0, paddingTop: u(2) })}>{t}</p>
              {i < Math.min(precautions.length, 4) - 1 && <span aria-hidden style={at(1020, [272, 323, 375][i], { width: u(390), height: u(1), background: "#EDEDED" })} />}
            </div>
          ))}

          {/* Specifications */}
          <Card left={310} top={487} width={1118} height={204} />
          <Tab left={307} top={465} width={379} height={37} size={19} textLeft={388} label="Product Specifications" icon={<ClipboardList style={{ width: u(24), height: u(24) }} strokeWidth={1.8} />} />
          <dl style={{ margin: 0 }}>
            {specs.map(([k, v], i) => (
              <div
                key={k}
                style={at(315, specY[i] - 10.5, {
                  width: u(1109),
                  height: u(21),
                  background: i % 2 === 1 ? ALT_ROW : "transparent",
                  borderRadius: u(4),
                })}
              >
                <dt
                  className="font-medium"
                  style={{
                    position: "absolute",
                    left: u(53),
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: u(14.5),
                    lineHeight: 1,
                    color: "#111",
                    margin: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  {k}
                </dt>
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: u(435),
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: u(14.5),
                    lineHeight: 1,
                    color: "#555",
                    fontWeight: 500,
                    margin: 0,
                    userSelect: "none",
                  }}
                >
                  :
                </span>
                <dd
                  className="font-medium"
                  style={{
                    position: "absolute",
                    left: u(482),
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: u(14.5),
                    lineHeight: 1,
                    color: "#222",
                    margin: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  {v}
                </dd>
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
          <MobileCard title="How to Use" icon={<Soup className="h-5 w-5" />}>
            {steps.length ? (
              <div className="flex items-start justify-around gap-2">
                {steps.slice(0, 3).map((s, i) => (
                  <div key={i} className="flex flex-col items-center text-center text-[12.5px] font-medium leading-tight text-[#111]">
                    <img src={`/product-v2/step${i + 1}.png?v=2`} alt="" className="mb-1 h-[46px] w-auto" />
                    {s.lines.map((t) => <span key={t}>{t}</span>)}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[13px] font-medium leading-[20px] text-[#222]">
                {directions || "Use as directed on the product label or as advised by your treating doctor."}
              </p>
            )}
          </MobileCard>
          <MobileCard title="Precautions" icon={<TriangleAlert className="h-5 w-5" />}>
            <ul className="space-y-2">
              {precautions.map((t, i) => (
                <li key={t} className="flex items-center gap-3 text-[13px] font-medium text-[#222]">
                  <img src={`/product-v2/prec${(i % 4) + 1}.png`} alt="" className="h-[36px] w-[38px] shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </MobileCard>
          {ingList.length > 0 ? (
            <MobileCard title="Key Ingredients" icon={<Sprout className="h-5 w-5" />}>
              <div className="grid grid-cols-3 gap-2 text-center text-[12.5px] text-[#333]">
                {ingList.map((ing) => (
                  <div key={ing.name} className="flex flex-col items-center">
                    {ing.image && <img src={ing.image} alt="" className="h-[38px] w-auto mix-blend-multiply" />}
                    <span className="text-[13px] font-medium text-[#111]">{ing.name}</span>
                    {ing.botanical && <span className="text-[11.5px] text-[#666]">({ing.botanical})</span>}
                  </div>
                ))}
              </div>
            </MobileCard>
          ) : (
            <MobileCard title="Key Ingredients" icon={<Sprout className="h-5 w-5" />}>
              <p className="text-[12.5px] font-medium leading-[19px] text-[#333]">
                Ingredients as printed on the product label. Ask our clinic team for complete details.
              </p>
            </MobileCard>
          )}
          <MobileCard title="Product Specifications" icon={<ClipboardList className="h-5 w-5" />} wide>
            <dl className="space-y-1.5 text-[13.5px] font-medium text-[#222]">
              {specs.map(([k, v], i) => (
                <div
                  key={k}
                  className="grid grid-cols-[1.1fr_auto_1fr] items-center gap-2 rounded-lg px-3 py-1.5"
                  style={i % 2 ? { background: ALT_ROW } : undefined}
                >
                  <dt className="font-medium text-[#111]">{k}</dt>
                  <span aria-hidden className="text-[#666]">:</span>
                  <dd className="font-medium text-[#333]">{v}</dd>
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
      <div className="absolute -top-4 left-4 flex h-[34px] items-center justify-center gap-2 rounded-full px-4 text-[15px] font-medium text-white shadow-sm" style={{ background: TAB_BG }}>
        {icon}
        <span className="translate-y-px">{title}</span>
      </div>
      {children}
    </div>
  );
}
