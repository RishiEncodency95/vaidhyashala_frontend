"use client";

import { createCmsPage } from "@/lib/cmsPage";

export interface PanchakarmaContent {
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
  understanding: {
    heading: string;
    description: string;
    image: string;
    imageAlt: string;
    items: { image: string; number: string; title: string; description: string; iconImage: string; imageAlt: string }[];
  } | null;
  classicalProcedures: {
    heading: string;
    note: string;
    image: string;
    imageAlt: string;
    items: { iconImage: string; title: string; description: string }[];
  } | null;
  supportingTherapies: {
    heading: string;
    description: string;
    linkLabel: string;
    note: string;
    items: { image: string; title: string; description: string; imageAlt: string; link: string }[];
  } | null;
  therapyPlan: {
    headingLine1: string;
    headingLine2: string;
    description: string;
    image: string;
    imageAlt: string;
    items: { label: string }[];
  } | null;
  requestForm: {
    heading: string;
    description: string;
    nameLabel: string;
    namePlaceholder: string;
    mobileLabel: string;
    mobilePlaceholder: string;
    therapyLabel: string;
    therapyPlaceholder: string;
    dateLabel: string;
    buttonLabel: string;
    successTitle: string;
    successMessage: string;
    items: { label: string; value: string }[];
  } | null;
  faq: {
    heading: string;
    description: string;
    items: { question: string; answer: string }[];
  } | null;
  cta: {
    headingLine1: string;
    headingLine2: string;
    description: string;
    buttonLabel: string;
    buttonLink: string;
    backgroundImage: string;
    backgroundImageAlt: string;
  } | null;
}

const therapy = (image: string, title: string, description: string, imageAlt: string) => ({
  image: `/panchakarma/${image}`,
  title,
  description,
  imageAlt,
  link: "#consultation",
});

export const defaultPanchakarma: PanchakarmaContent = {
  hero: {
    breadcrumbHomeLabel: "Home",
    breadcrumbHomeHref: "/home",
    breadcrumbCurrentLabel: "Panchakarma",
    titleLine1: "Traditional therapies.",
    titleHighlight: "Personalised care.",
    description: "Explore Panchakarma and supporting Ayurvedic therapies, guided by a doctor's assessment.",
    buttonLabel: "Discuss Your Therapy Plan",
    buttonLink: "#consultation",
    image: "/panchakarma/i1.webp",
    imageAlt: "Traditional therapies. Personalised care. - Panchakarma at Vaidhyashala",
  },
  understanding: {
    heading: "Understanding Panchakarma",
    description:
      "Panchakarma refers to a group of classical Ayurvedic procedures. A doctor assesses whether any procedure is suitable for you; every patient does not need every procedure.",
    image: "/panchakarma/i2.webp",
    imageAlt: "Understanding Panchakarma: 01 Preparation, 02 Selected procedures, 03 Aftercare",
    items: [],
  },
  classicalProcedures: {
    heading: "The five classical procedures",
    note: "",
    image: "/panchakarma/i3.webp",
    imageAlt: "The five classical procedures: Vamana, Virechana, Basti, Nasya, Raktamokshana",
    items: [],
  },
  supportingTherapies: {
    heading: "Explore supporting Ayurvedic therapies",
    description:
      "A range of traditional therapies that may be suggested as part of your individual care plan, based on the doctor's assessment.",
    linkLabel: "Ask about suitability",
    note: "Therapy selection and availability are confirmed during consultation.",
    items: [
      therapy("01_Abhyanga_Oil_Massage.webp", "Abhyanga", "Ayurvedic oil massage.", "Abhyanga - Ayurvedic whole body oil massage"),
      therapy("02_Shirodhara.webp", "Shirodhara", "Steady flow of liquid over the forehead.", "Shirodhara - Steady flow of herbal oil over forehead"),
      therapy("03_Swedana_Steam_Therapy.webp", "Swedana", "Guided fomentation therapy.", "Swedana - Herbal steam box fomentation therapy"),
      therapy("04_Pizhichil_Warm_Oil_Therapy.webp", "Pizhichil", "Warm oil application with massage.", "Pizhichil - Medicated oil bath and synchronized massage"),
      therapy("05_Udvartana_Herbal_Powder_Massage.webp", "Udvartana", "Herbal powder massage.", "Udvartana - Herbal powder lymphatic scrub massage"),
      therapy("06_Patra_Pinda_Sweda.webp", "Patra Pinda Sweda", "Herbal leaf bolus fomentation.", "Patra Pinda Sweda - Medicinal leaf bolus massage"),
      therapy("07_Shashtika_Shali_Pinda_Sweda.webp", "Shashtika Shali Pinda Sweda", "Prepared rice bolus fomentation.", "Shashtika Shali Pinda Sweda - Cooked medicinal rice bolus massage"),
      therapy("08_Kati_Basti.webp", "Kati Basti", "Localised oil application around lower back.", "Kati Basti - Herbal oil reservoir for lower back support"),
      therapy("09_Shiro_Abhyanga_Head_Massage.webp", "Shiro Abhyanga", "Ayurvedic head massage.", "Shiro Abhyanga - Therapeutic Ayurvedic head and scalp massage"),
    ],
  },
  therapyPlan: {
    headingLine1: "Your therapy plan starts",
    headingLine2: "with a conversation.",
    description: "We take time to understand your health concerns and create a plan that is suitable for you.",
    image: "/panchakarma/p2.webp",
    imageAlt: "Ayurvedic doctor in consultation discussing therapy plan",
    items: [
      { label: "Health and medical history" },
      { label: "Individual suitability" },
      { label: "Therapy schedule and preparation" },
      { label: "Aftercare and review" },
    ],
  },
  requestForm: {
    heading: "Request a Consultation",
    description: "Share a few details and we'll get back to you to discuss your therapy plan.",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    mobileLabel: "Mobile Number",
    mobilePlaceholder: "Your mobile number",
    therapyLabel: "Therapy of interest",
    therapyPlaceholder: "Select a therapy",
    dateLabel: "Preferred date",
    buttonLabel: "Request a Consultation",
    successTitle: "Thank you for your request!",
    successMessage: "Our clinical coordinator will get back to you shortly to discuss your therapy plan.",
    items: [
      "Ayurvedic Consultation|Consultation",
      "Shirodhara",
      "Abhyanga",
      "Swedana",
      "Pizhichil",
      "Udvartana",
      "Patra Pinda Sweda",
      "Shashtika Shali Pinda Sweda",
      "Kati Basti",
      "Shiro Abhyanga",
      "Full Panchakarma Program",
    ].map((entry) => {
      const [label, value] = entry.split("|");
      return { label, value: value ?? label };
    }),
  },
  faq: {
    heading: "FAQs",
    description: "Find quick answers to common questions about Panchakarma and therapies.",
    items: [
      {
        question: "How is my therapy selected?",
        answer: "The doctor reviews your health concerns and medical history before recommending suitable care.",
      },
      {
        question: "Will I need all five procedures?",
        answer:
          "No. Every patient does not require all five procedures. Your Ayurvedic doctor evaluates your specific condition, constitution, and health status to recommend only the therapies that are safe and suitable for you.",
      },
      {
        question: "How long will my therapy plan take?",
        answer:
          "Therapy duration varies based on the recommended treatments. Individual sessions typically take 45 to 60 minutes, while comprehensive Panchakarma packages generally range between 7 to 21 days.",
      },
    ],
  },
  cta: {
    headingLine1: "Let us plan your care",
    headingLine2: "thoughtfully.",
    description: "Begin with a consultation and explore therapies that are suitable for you, with expert guidance.",
    buttonLabel: "Book a Consultation",
    buttonLink: "#consultation",
    backgroundImage: "/panchakarma/p1.webp",
    backgroundImageAlt: "Let us plan your care thoughtfully background",
  },
};

export const { Provider: PanchakarmaProvider, usePage: usePanchakarma } = createCmsPage<PanchakarmaContent>(
  "panchakarma",
  defaultPanchakarma,
);
