"use client";

import { createCmsPage } from "@/lib/cmsPage";

/** Page texts for "/products" (Admin → Pages & CMS → Products). The product list itself is separate. */
export interface ProductsContent {
  hero: {
    breadcrumbHomeLabel: string;
    breadcrumbHomeHref: string;
    breadcrumbCurrentLabel: string;
    titleLine1: string;
    titleHighlight: string;
    description: string;
    buttonLabel: string;
    buttonLink: string;
    image: string;
    imageAlt: string;
  } | null;
  categoryFilter: { allLabel: string; searchPlaceholder: string; note: string } | null;
  catalog: {
    heading: string;
    description: string;
    viewDetailsLabel: string;
    loadMoreLabel: string;
    initialCount: number;
    loadMoreStep: number;
    emptyMessage: string;
    footnote: string;
  } | null;
  guidance: {
    headingLine1: string;
    headingHighlight: string;
    description: string;
    image: string;
    imageAlt: string;
    badgeTitle: string;
    badgeSubtitle: string;
    pointsImage: string;
    pointsImageAlt: string;
  } | null;
  enquiryForm: {
    heading: string;
    description: string;
    nameLabel: string;
    namePlaceholder: string;
    mobileLabel: string;
    mobilePlaceholder: string;
    productLabel: string;
    productPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    buttonLabel: string;
    contactLabel: string;
    contactLink: string;
    successTitle: string;
    successMessage: string;
  } | null;
  faq: {
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
    items: { question: string; answer: string }[];
  } | null;
  cta: { heading: string; subtitle: string; buttonLabel: string; buttonLink: string } | null;
}

const IMG = "/product/vaidhyashala_product_page_images";

export const defaultProducts: ProductsContent = {
  hero: {
    breadcrumbHomeLabel: "Home",
    breadcrumbHomeHref: "/home",
    breadcrumbCurrentLabel: "Products",
    titleLine1: "Ayurveda for your",
    titleHighlight: "everyday care.",
    description: "Explore Ayurvedic preparations, therapy oils and wellness essentials. Ask our team about product details and availability.",
    buttonLabel: "Explore the Catalogue",
    buttonLink: "#catalogue",
    image: `${IMG}/13_product_page_hero.webp`,
    imageAlt: "Ayurveda for your everyday care - Vaidhyashala product collection",
  },
  categoryFilter: {
    allLabel: "All Products",
    searchPlaceholder: "Search products or categories",
    note: "Illustrative catalogue — product names, packs and availability to be confirmed.",
  },
  catalog: {
    heading: "Explore our product range.",
    description: "A curated selection of Ayurvedic preparations, therapy oils and wellness essentials to complement your health journey.",
    viewDetailsLabel: "View Details",
    loadMoreLabel: "Load More Products",
    initialCount: 12,
    loadMoreStep: 4,
    emptyMessage: "No products found matching your criteria.",
    footnote: "Product selection and suitability depend on individual needs and doctor guidance.",
  },
  guidance: {
    headingLine1: "Choose with the right",
    headingHighlight: "guidance.",
    description: "Our team can help with product information, availability and appropriate consultation.",
    image: `${IMG}/14_product_guidance_consultation.webp`,
    imageAlt: "Doctor consultation for Ayurvedic medicine",
    badgeTitle: "Ayurvedic Consultation",
    badgeSubtitle: "Qualified Ayurvedic Doctors & Practitioners",
    pointsImage: `${IMG}/pr1.webp`,
    pointsImageAlt: "Product information, Pack & availability, Doctor guidance",
  },
  enquiryForm: {
    heading: "Enquire about a product.",
    description: "Share your details and our team will get back to you with information about the product, packs and availability.",
    nameLabel: "Your name *",
    namePlaceholder: "Enter your name",
    mobileLabel: "Mobile number *",
    mobilePlaceholder: "Enter your mobile number",
    productLabel: "Product of interest *",
    productPlaceholder: "e.g. Ayurvedic Tablets, Hair Care Oil",
    messageLabel: "Message (optional)",
    messagePlaceholder: "Tell us what you would like to know...",
    buttonLabel: "Send Product Enquiry",
    contactLabel: "Contact the Clinic",
    contactLink: "/contact",
    successTitle: "Thank you for your enquiry.",
    successMessage: "Our team will contact you shortly with product information and availability.",
  },
  faq: {
    eyebrow: "FAQs",
    headingLine1: "Common questions",
    headingLine2: "about our products.",
    items: [
      {
        question: "Are all products available at the clinic?",
        answer: "Contact our team to confirm the current product range and availability.",
      },
      {
        question: "How can I get product information?",
        answer: "Our Ayurvedic doctors and clinic staff can provide detailed formulation information, usage, and dosage guidance.",
      },
      {
        question: "Do I need advice before using Ayurvedic medicines?",
        answer: "Yes, we always recommend consulting an Ayurvedic physician before beginning any classical medicines or treatments.",
      },
    ],
  },
  cta: {
    heading: "Looking for a specific product?",
    subtitle: "Ask our team for information on availability and suitability.",
    buttonLabel: "Ask Our Team",
    buttonLink: "/contact",
  },
};

export const { Provider: ProductsProvider, usePage: useProductsPage } = createCmsPage<ProductsContent>(
  "products",
  defaultProducts,
);
