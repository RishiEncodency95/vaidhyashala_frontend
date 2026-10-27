/**
 * About Us page ("/about") content from the backend (Admin → Pages & CMS → About Us).
 * Public, read-only: GET {API}/website/pages/about-us — inactive sections come back as null.
 * The defaults below are the text/images the page shipped with; they are used
 * only if the API cannot be reached.
 */
import { API_BASE } from "@/lib/home2";

export interface AboutContent {
  hero: {
    breadcrumbHomeLabel: string;
    breadcrumbHomeHref: string;
    breadcrumbCurrentLabel: string;
    titleLine1: string;
    titleHighlight: string;
    subtitle: string;
    image: string;
    imageAlt: string;
  } | null;
  holisticCare: {
    eyebrow: string;
    heading: string;
    paragraph1: string;
    paragraph2: string;
    image: string;
    imageAlt: string;
    items: { iconImage: string; title: string; description: string }[];
  } | null;
  approach: {
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
    description: string;
    image: string;
    imageAlt: string;
    items: { number: string; title: string; description: string }[];
  } | null;
  services: {
    eyebrow: string;
    heading: string;
    description: string;
    items: { image: string; title: string; description: string; imageAlt: string; link: string }[];
  } | null;
  team: {
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
    description: string;
    image: string;
    imageAlt: string;
    imageNote: string;
  } | null;
  atmosphere: {
    eyebrow: string;
    heading: string;
    description: string;
    items: { image: string; imageAlt: string }[];
  } | null;
  seo?: { metaTitle?: string };
}

export const defaultAbout: AboutContent = {
  hero: {
    breadcrumbHomeLabel: "Home",
    breadcrumbHomeHref: "/home",
    breadcrumbCurrentLabel: "About Us",
    titleLine1: "Rooted in Ayurveda.",
    titleHighlight: "Dedicated to your care.",
    subtitle: "Get to know Vaidhyashala and our approach to personalised Ayurvedic care.",
    image: "/about/i1.webp",
    imageAlt: "Vaidhyashala Clinic - Rooted in Ayurveda. Dedicated to your care.",
  },
  holisticCare: {
    eyebrow: "About Vaidhyashala",
    heading: "Holistic care for a healthier, more balanced life.",
    paragraph1:
      "Vaidhyashala is an Ayurvedic clinic and Panchakarma centre dedicated to thoughtful, personalised care. We combine classical Ayurvedic wisdom with individualised consultations, Panchakarma therapies, yoga and lifestyle guidance to support your unique health journey.",
    paragraph2:
      "Our approach focuses on understanding your concerns, identifying the root causes and creating a care plan that is practical, sustainable and aligned with your lifestyle.",
    image: "/about/i7.webp",
    imageAlt: "Listen with care, Plan for the individual, Guide at every step",
    items: [],
  },
  approach: {
    eyebrow: "Our Approach",
    headingLine1: "Our approach to",
    headingLine2: "your well-being.",
    description:
      "We combine consultation, Panchakarma therapies, yoga and lifestyle guidance to support your overall well-being in a way that is personalised, practical and sustainable.",
    image: "/about/i2.webp",
    imageAlt: "Ayurvedic doctor in consultation with patient",
    items: [
      { number: "01", title: "Consultation & assessment", description: "A detailed discussion of your health concerns, lifestyle and medical history." },
      { number: "02", title: "Personalised care planning", description: "A treatment plan tailored to your individual condition, constitution and lifestyle." },
      { number: "03", title: "Follow-up & guidance", description: "Ongoing support to track your progress and make adjustments as needed." },
    ],
  },
  services: {
    eyebrow: "Our Services",
    heading: "A complete approach to your health journey.",
    description: "Explore our core services, designed to work together for your overall well-being.",
    items: [
      {
        image: "/about/i3.webp",
        title: "Ayurvedic Consultation",
        description: "A detailed discussion of your health concerns, lifestyle and medical history to understand your individual needs.",
        imageAlt: "Ayurvedic Doctor Consultation",
        link: "",
      },
      {
        image: "/a1.webp",
        title: "Panchakarma Therapies",
        description: "Personalised Panchakarma therapies planned as per your health condition and suitability.",
        imageAlt: "Panchakarma Shirodhara Therapy",
        link: "",
      },
      {
        image: "/a3.webp",
        title: "Yoga & Lifestyle Care",
        description: "Guidance with yoga, meditation and daily routines to support long-term well-being.",
        imageAlt: "Yoga and Meditation Practice",
        link: "",
      },
      {
        image: "/a5.webp",
        title: "Medicines & Products",
        description: "Authentic Ayurvedic formulations and wellness products to support your treatment and daily health.",
        imageAlt: "Authentic Ayurvedic Medicines and Products",
        link: "",
      },
    ],
  },
  team: {
    eyebrow: "The People Behind Your Care",
    headingLine1: "A dedicated team,",
    headingLine2: "by your side.",
    description:
      "Our team of Ayurvedic doctors, Panchakarma therapists and yoga & care professionals work together to provide integrated and compassionate care. We take time to understand your needs and support you at every step of your health journey.",
    image: "/about/i4.webp",
    imageAlt: "The Vaidhyashala Clinical Team of Ayurvedic Doctors and Practitioners",
    imageNote: "Illustrative imagery",
  },
  atmosphere: {
    eyebrow: "A Calm Space for Thoughtful Care",
    heading: "Our clinic atmosphere.",
    description: "A warm, peaceful and welcoming environment designed to support your healing journey.",
    items: [
      { image: "/about/i8.webp", imageAlt: "Vaidhyashala Clinic Reception and Lounge" },
      { image: "/about/i5.webp", imageAlt: "Vaidhyashala Panchakarma Therapy Suite" },
      { image: "/about/i6.webp", imageAlt: "Vaidhyashala Consultation Lounge" },
    ],
  },
};

/** Fetches the live About content; returns null if the API is unreachable, errors or the page is a draft */
export async function fetchAbout(signal?: AbortSignal): Promise<AboutContent | null> {
  try {
    const res = await fetch(`${API_BASE}/website/pages/about-us`, { cache: "no-store", signal });
    if (!res.ok) return null;
    const json = await res.json();
    const data = json?.data;
    if (!data?.sections) return null;
    return { ...data.sections, seo: data.seo } as AboutContent;
  } catch {
    return null;
  }
}
