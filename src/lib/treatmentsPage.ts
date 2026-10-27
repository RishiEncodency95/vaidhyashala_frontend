/**
 * Treatments page ("/treatments") content from the backend (Admin → Pages & CMS → Treatments).
 * Public, read-only: GET {API}/website/pages/treatments — inactive sections come back as null.
 * The defaults below are the text/images the page shipped with; they are used
 * only if the API cannot be reached.
 */
import { API_BASE } from "@/lib/home2";

export interface TreatmentsContent {
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleHighlight: string;
    description: string;
    buttonLabel: string;
    buttonLink: string;
    image: string;
    imageAlt: string;
  } | null;
  highlights: { items: { label: string; link: string }[] } | null;
  careServices: {
    eyebrow: string;
    heading: string;
    description: string;
    linkLabel: string;
    items: { image: string; number: string; title: string; description: string; imageAlt: string; link: string }[];
  } | null;
  healthConcerns: {
    eyebrow: string;
    heading: string;
    description: string;
    image: string;
    imageAlt: string;
  } | null;
  approach: {
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
    headingHighlight: string;
    description: string;
    image: string;
    imageAlt: string;
    items: { number: string; title: string; description: string }[];
  } | null;
  preparation: {
    eyebrow: string;
    heading: string;
    description: string;
    items: { iconImage: string; title: string; description: string }[];
  } | null;
  faq: {
    eyebrow: string;
    heading: string;
    description: string;
    items: { question: string; answer: string }[];
  } | null;
  seo?: { metaTitle?: string };
}

export const defaultTreatments: TreatmentsContent = {
  hero: {
    eyebrow: "Ayurvedic Treatments",
    titleLine1: "Care tailored",
    titleHighlight: "to your needs.",
    description:
      "Explore consultation-led Ayurvedic care, traditional therapies and lifestyle guidance. Your doctor will recommend a plan after assessment.",
    buttonLabel: "Book a Consultation",
    buttonLink: "/#consultation",
    image: "/treatment/r1.webp",
    imageAlt: "Ayurvedic Treatments Consultation - Care tailored to your needs",
  },
  highlights: {
    items: [
      { label: "Consultation", link: "" },
      { label: "Panchakarma", link: "" },
      { label: "Yoga & Lifestyle", link: "" },
      { label: "Medicines", link: "" },
    ],
  },
  careServices: {
    eyebrow: "Our Treatments",
    heading: "Explore our care services.",
    description:
      "A combination of consultation, traditional therapies, lifestyle guidance and authentic Ayurvedic products, designed to support your unique health journey.",
    linkLabel: "Explore care",
    items: [
      {
        image: "/about/i3.webp",
        number: "01 /",
        title: "Ayurvedic Consultation",
        description: "A detailed discussion of your health concerns, lifestyle and medical history to understand your individual needs.",
        imageAlt: "Ayurvedic Doctor Consultation",
        link: "/#consultation",
      },
      {
        image: "/a1.webp",
        number: "02 /",
        title: "Panchakarma Therapies",
        description: "Personalised Panchakarma therapies planned as per your health condition and suitability.",
        imageAlt: "Panchakarma Shirodhara Therapy",
        link: "/panchakarma",
      },
      {
        image: "/a3.webp",
        number: "03 /",
        title: "Yoga & Lifestyle Care",
        description: "Guidance with yoga, meditation and daily routines to support long-term well-being.",
        imageAlt: "Yoga and Meditation Practice",
        link: "/#yoga",
      },
      {
        image: "/a5.webp",
        number: "04 /",
        title: "Ayurvedic Medicines",
        description: "Authentic Ayurvedic formulations and wellness products to support your treatment and daily health.",
        imageAlt: "Authentic Ayurvedic Medicines and Products",
        link: "/products",
      },
    ],
  },
  healthConcerns: {
    eyebrow: "Explore by Health Concern",
    heading: "Start with your health concern.",
    description: "Discuss your concerns with our doctor to understand suitable care options.",
    image: "/treatment/t1.webp",
    imageAlt: "Explore our approach to common health concerns with Ayurvedic care and lifestyle guidance",
  },
  approach: {
    eyebrow: "Our Approach",
    headingLine1: "A plan begins with",
    headingLine2: "understanding",
    headingHighlight: "you.",
    description:
      "We combine classical Ayurvedic wisdom with individualised care, supported by experienced doctors, therapies and ongoing guidance.",
    image: "/a1.webp",
    imageAlt: "Traditional Ayurvedic Therapy and Consultation Approach",
    items: [
      { number: "01", title: "Consultation & assessment", description: "Discuss your health concerns and lifestyle." },
      { number: "02", title: "Personalised care plan", description: "A treatment plan suited to your condition and needs." },
      { number: "03", title: "Follow-up & guidance", description: "Ongoing support to track your progress." },
    ],
  },
  preparation: {
    eyebrow: "For Your First Consultation",
    heading: "Prepare a few details.",
    description: "Having this information helps our doctor understand your health better.",
    items: [
      { iconImage: "", title: "Bring medical reports", description: "Previous test reports and relevant medical documents." },
      { iconImage: "", title: "List current medicines", description: "Share the medicines you are currently taking." },
      { iconImage: "", title: "Share your health history", description: "Tell us about your health concerns, lifestyle and daily routine." },
    ],
  },
  faq: {
    eyebrow: "FAQs",
    heading: "Before you choose a treatment.",
    description: "Find quick answers to common questions about our treatments and care approach.",
    items: [
      { question: "Do I need a consultation first?", answer: "Yes. An assessment helps your doctor advise appropriate care." },
      {
        question: "How is my care plan decided?",
        answer: "Your doctor considers your health history, constitution (Prakriti), and lifestyle before tailoring your care program.",
      },
      {
        question: "Can I continue my current medicines?",
        answer: "In most cases, yes. Our physicians review your existing prescriptions to ensure safe and compatible integration.",
      },
    ],
  },
};

/** Fetches the live Treatments content; returns null if the API is unreachable, errors or the page is a draft */
export async function fetchTreatments(signal?: AbortSignal): Promise<TreatmentsContent | null> {
  try {
    const res = await fetch(`${API_BASE}/website/pages/treatments`, { cache: "no-store", signal });
    if (!res.ok) return null;
    const json = await res.json();
    const data = json?.data;
    if (!data?.sections) return null;
    return { ...data.sections, seo: data.seo } as TreatmentsContent;
  } catch {
    return null;
  }
}
