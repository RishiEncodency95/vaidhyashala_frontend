/**
 * The 12 products the website ships with. Shown only when the backend has no products
 * or cannot be reached (Admin → Products → "Import website products" copies them into the database).
 * Plain data, so both server code (static page list) and client components can use it.
 */
export interface BuiltinProduct {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

export const slugify = (t: string) =>
  t.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export const builtinProducts: BuiltinProduct[] = [
  { id: "p1", title: "Ayurvedic Tablets", category: "Ayurvedic Preparations", description: "Classical Ayurvedic tablet formulations.", image: "/product/vaidhyashala_product_page_images/01_ayurvedic_tablets.webp" },
  { id: "p2", title: "Ayurvedic Syrup", category: "Ayurvedic Preparations", description: "Herbal syrup formulations in convenient liquid form.", image: "/product/vaidhyashala_product_page_images/02_ayurvedic_syrup.webp" },
  { id: "p3", title: "Herbal Capsules", category: "Ayurvedic Preparations", description: "Plant-based herbal capsule formulations.", image: "/product/vaidhyashala_product_page_images/03_herbal_capsules.webp" },
  { id: "p4", title: "Herbal Powder", category: "Herbal Powders", description: "Traditional herbal powders for everyday use.", image: "/product/vaidhyashala_product_page_images/04_herbal_powder.webp" },
  { id: "p5", title: "Ayurvedic Massage Oil", category: "Therapy Oils", description: "Traditional herbal oils for abhyanga and external use.", image: "/product/vaidhyashala_product_page_images/05_ayurvedic_massage_oil.webp" },
  { id: "p6", title: "Hair Care Oil", category: "Personal Care", description: "Herbal hair care oil formulations.", image: "/product/vaidhyashala_product_page_images/06_hair_care_oil.webp" },
  { id: "p7", title: "Herbal Skin Care Oil", category: "Personal Care", description: "Herbal oils for daily skin care.", image: "/product/vaidhyashala_product_page_images/07_herbal_skin_care_oil.webp" },
  { id: "p8", title: "Herbal Bath Powder", category: "Personal Care", description: "Herbal powder for cleansing and refreshing.", image: "/product/vaidhyashala_product_page_images/08_herbal_bath_powder.webp" },
  { id: "p9", title: "Herbal Face Care", category: "Personal Care", description: "Herbal formulations for daily face care.", image: "/product/vaidhyashala_product_page_images/09_herbal_face_care.webp" },
  { id: "p10", title: "Herbal Hair Cleanser", category: "Personal Care", description: "Gentle herbal cleanser for hair care.", image: "/product/vaidhyashala_product_page_images/10_herbal_hair_cleanser.webp" },
  { id: "p11", title: "Herbal Tea", category: "Wellness Essentials", description: "Aromatic herbal tea blends.", image: "/product/vaidhyashala_product_page_images/11_herbal_tea.webp" },
  { id: "p12", title: "Wellness Essentials", category: "Wellness Essentials", description: "Everyday wellness support products.", image: "/product/vaidhyashala_product_page_images/12_wellness_essentials.webp" },
];

export const builtinCategoryNames = ["Ayurvedic Preparations", "Therapy Oils", "Herbal Powders", "Personal Care", "Wellness Essentials"];
