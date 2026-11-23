/**
 * Marketing content for the product detail page that the admin product form does not hold yet
 * (tagline, benefit badges, rating, "About" copy). Matched by product title, case-insensitive.
 * Products without an entry fall back to wording that is true for every product.
 */

export type BenefitIcon = "digestion" | "bowel" | "detox" | "leaf" | "shield" | "doctor";

export interface ProductExtras {
  tagline?: string;
  benefits?: { label: string; icon: BenefitIcon }[];
  /**
   * Rating shown under the title. TODO: these Triphala figures come from the design mock-up;
   * replace them with real review numbers before going live (or delete them to hide the row).
   */
  rating?: number;
  reviewCount?: number;
  happyCustomers?: string;
  about?: string;
  aboutImage?: string;
  /** Pill under the title of the usage guide, e.g. "Ayurvedic Herbal Juice" */
  guideSubtitle?: string;
  /** "How to Use" steps; each line is one row of text under the step's icon */
  howToSteps?: { lines: string[] }[];
  precautions?: string[];
  formulationType?: string;
  netQuantity?: string;
}

const TRIPHALA_EXTRAS: ProductExtras = {
  tagline: "Supports healthy digestion, natural detox and gut balance.",
  benefits: [
    { label: "Healthy Digestion", icon: "digestion" },
    { label: "Bowel Regularity", icon: "bowel" },
    { label: "Natural Detox", icon: "detox" },
  ],
  rating: 4.8,
  reviewCount: 326,
  happyCustomers: "1,200+",
  about:
    "A classical Ayurvedic blend of Amla, Haritaki and Bibhitaki that supports digestive health, natural cleansing and overall gut wellness.",
  aboutImage: "/product-v2/about-art.png",
  guideSubtitle: "Ayurvedic Herbal Juice",
  netQuantity: "750 ml",
  howToSteps: [
    { lines: ["Take 20–30 ml", "(2–3 tablespoons)"] },
    { lines: ["Mix with", "100–150 ml", "of water"] },
    { lines: ["Consume", "twice daily", "(morning & evening)"] },
  ],
  precautions: [
    "Consult a healthcare professional if you are under any medication or have a medical condition.",
    "Pregnant or breastfeeding women should take advice from a healthcare professional before use.",
    "Do not exceed the recommended daily serving.",
    "Store in a cool, dry place away from direct sunlight and keep the bottle tightly closed after use.",
  ],
  formulationType: "Classical Ayurvedic Formulation",
};

const EXTRAS: Record<string, ProductExtras> = {
  "triphala juice": TRIPHALA_EXTRAS,
  "ayurvedic tablets": TRIPHALA_EXTRAS,
};

const DEFAULT_BENEFITS: NonNullable<ProductExtras["benefits"]> = [
  { label: "Authentic Ayurveda", icon: "leaf" },
  { label: "Doctor Guided", icon: "doctor" },
  { label: "Safe & Natural", icon: "shield" },
];

export const DEFAULT_PRECAUTIONS = [
  "Consult a healthcare professional if you are under any medication or have a medical condition.",
  "Pregnant or breastfeeding women should take advice from a healthcare professional before use.",
  "Do not exceed the recommended daily serving.",
  "Store in a cool, dry place away from direct sunlight and keep the pack tightly closed after use.",
];

/** Pictures for well-known ingredients, matched by the start of the ingredient's name. */
const INGREDIENT_IMAGES: Record<string, string> = {
  amla: "/product-v2/ing-amla.png",
  haritaki: "/product-v2/ing-haritaki.png",
  bibhitaki: "/product-v2/ing-bibhitaki.png",
};

/** "Amla (Emblica officinalis)" -> name, botanical name and picture (if we have one). */
export function splitIngredient(line: string): { name: string; botanical: string; image?: string } {
  const m = line.match(/^(.*?)\s*\((.*)\)\s*$/);
  const name = (m?.[1] ?? line).trim();
  return { name, botanical: m?.[2]?.trim() ?? "", image: INGREDIENT_IMAGES[name.toLowerCase().split(/\s+/)[0]] };
}

export function productExtras(title: string): Required<Pick<ProductExtras, "benefits">> & ProductExtras {
  const found = EXTRAS[title.trim().toLowerCase()] ?? {};
  return { ...found, benefits: found.benefits ?? DEFAULT_BENEFITS };
}

/** "Net Quantity: 750 ml" line from the admin's product information text. */
export function netQuantity(productInfo: string): string {
  return productInfo.match(/Net\s*Quantity\s*[:\-–]\s*(.+)/i)?.[1]?.trim() ?? "";
}

/** Bullet lines under the "Ingredients" heading of the product information text. */
export function ingredients(productInfo: string): string[] {
  const lines = productInfo.split("\n").map((l) => l.trim());
  const start = lines.findIndex((l) => /^ingredients/i.test(l));
  if (start < 0) return [];
  const out: string[] = [];
  for (const l of lines.slice(start + 1)) {
    if (!/^[•\-*]/.test(l)) break;
    out.push(l.replace(/^[•\-*]\s*/, ""));
  }
  return out;
}

/** First sentence of a paragraph, for a tagline when the product has none. */
export function firstSentence(text: string): string {
  return text.split(/(?<=\.)\s*/)[0]?.trim() ?? "";
}
