/**
 * Home page ("/home") content from the backend (Admin → Pages & CMS → Home).
 * Public, read-only: GET {API}/website/home2 — inactive sections come back as null.
 * The defaults below are the text/images the page shipped with; they are used
 * only if the API cannot be reached.
 */

export const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api").replace(/\/+$/, "");

/** Image paths from the CMS: uploads are full URLs, bundled ones are in /public */
export const assetUrl = (src?: string) => {
  if (!src) return "";
  if (/^(https?:)?\/\//.test(src) || src.startsWith("data:")) return src;
  return src.startsWith("/") ? src : `/${src}`;
};

/**
 * An image the admin has deleted comes back as "": put the website's own image for that spot back.
 * Walks live and default content together (lists match by position); only image fields are touched.
 */
export function withDefaultImages<T>(live: T, defaults: unknown): T {
  const walk = (l: unknown, d: unknown, key = ""): unknown => {
    if (Array.isArray(l)) {
      return l.map((item, i) => walk(item, Array.isArray(d) ? d[i] : undefined, key));
    }
    if (l && typeof l === "object") {
      const dObj = d && typeof d === "object" ? (d as Record<string, unknown>) : {};
      return Object.fromEntries(
        Object.entries(l as Record<string, unknown>).map(([k, v]) => [k, walk(v, dObj[k], k)]),
      );
    }
    const isImage = /image$/i.test(key) || key === "image";
    if (isImage && (l === "" || l == null) && typeof d === "string" && d) return d;
    return l;
  };
  return walk(live, defaults) as T;
}

export interface Home2Content {
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    titleHighlight: string;
    subtitle: string;
    primaryButtonLabel: string;
    primaryButtonLink: string;
    secondaryButtonLabel: string;
    secondaryButtonLink: string;
    image: string;
    imageAlt: string;
  } | null;
  highlights: { items: { label: string }[] } | null;
  carePillars: {
    eyebrow: string;
    heading: string;
    description: string;
    linkLabel: string;
    items: { number: string; title: string; description: string; image: string; imageAlt: string; link: string }[];
  } | null;
  approach: {
    eyebrow: string;
    headingLine1: string;
    headingHighlight: string;
    description: string;
    image: string;
    imageAlt: string;
    items: { number: string; title: string; description: string }[];
  } | null;
  concerns: {
    eyebrow: string;
    heading: string;
    description: string;
    image: string;
    imageAlt: string;
    items: { label: string; iconImage: string; link: string }[];
  } | null;
  products: {
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
    description: string;
    buttonLabel: string;
    buttonLink: string;
    image: string;
    imageAlt: string;
  } | null;
  appointment: {
    eyebrow: string;
    heading: string;
    description: string;
    serviceLabel: string;
    servicePlaceholder: string;
    dateLabel: string;
    typeLabel: string;
    clinicLabel: string;
    onlineLabel: string;
    buttonLabel: string;
    successMessage: string;
    items: { label: string; value: string }[];
  } | null;
  faq: {
    eyebrow: string;
    heading: string;
    description: string;
    items: { question: string; answer: string }[];
  } | null;
  seo?: { metaTitle?: string };
}

export const defaultHome2: Home2Content = {
  hero: {
    eyebrow: "Rooted in Ayurveda. Focused on you.",
    titleLine1: "Your care.",
    titleLine2: "Our Ayurvedic",
    titleHighlight: "approach.",
    subtitle: "Doctor consultations, Panchakarma therapies and Ayurvedic medicines, with care tailored to you.",
    primaryButtonLabel: "Book a Consultation",
    primaryButtonLink: "/#consultation",
    secondaryButtonLabel: "Explore Therapies",
    secondaryButtonLink: "/treatments",
    image: "/home/h1.webp",
    imageAlt: "Vaidhyashala Clinic Reception and Lounge - Your care. Our Ayurvedic approach.",
  },
  highlights: {
    items: [
      { label: "Ayurvedic doctor consultation" },
      { label: "Panchakarma therapies" },
      { label: "Individual treatment plans" },
      { label: "Ayurvedic medicines & products" },
    ],
  },
  carePillars: {
    eyebrow: "Care at Vaidhyashala",
    heading: "Care that begins with understanding you.",
    description:
      "A thoughtful combination of consultation, therapies, lifestyle guidance and authentic Ayurvedic products, designed to support your unique health journey.",
    linkLabel: "Learn more",
    items: [
      {
        number: "01 /",
        title: "Ayurvedic Consultation",
        description:
          "A detailed discussion of your health concerns, lifestyle and medical history to understand your individual needs.",
        image: "/a2.webp",
        imageAlt: "Ayurvedic doctor consulting patient in clinic",
        link: "/#consultation",
      },
      {
        number: "02 /",
        title: "Panchakarma Therapies",
        description: "Personalised Panchakarma therapies planned as per your health condition and suitability.",
        image: "/a1.webp",
        imageAlt: "Traditional Panchakarma Shirodhara therapy",
        link: "/panchakarma",
      },
      {
        number: "03 /",
        title: "Yoga & Lifestyle Care",
        description: "Guidance with yoga, meditation and daily routines to support long-term well-being.",
        image: "/a3.webp",
        imageAlt: "Calm yoga and meditation guidance",
        link: "/#yoga",
      },
      {
        number: "04 /",
        title: "Medicines & Products",
        description: "Authentic Ayurvedic formulations and wellness products to support your treatment and daily health.",
        image: "/a5.webp",
        imageAlt: "Authentic Ayurvedic herbal formulations and oils",
        link: "/products",
      },
    ],
  },
  approach: {
    eyebrow: "Our Approach",
    headingLine1: "Traditional therapies.",
    headingHighlight: "Personal attention.",
    description:
      "We combine classical Ayurvedic wisdom with individualised care, supported by experienced doctors, therapies and ongoing guidance.",
    image: "/a1.webp",
    imageAlt: "Traditional Ayurvedic Shirodhara Therapy and Treatment",
    items: [
      { number: "01", title: "Consultation & assessment", description: "Discuss your health concerns and lifestyle." },
      { number: "02", title: "Individual care plan", description: "A personalised treatment plan suited to you." },
      { number: "03", title: "Follow-up & guidance", description: "Ongoing support to track your progress." },
    ],
  },
  concerns: {
    eyebrow: "Explore Care by Concern",
    heading: "Find support for what matters to you.",
    description: "Explore our approach to common health concerns with Ayurvedic care and lifestyle guidance.",
    image: "/treatment/t1.webp",
    imageAlt: "Explore our approach to common health concerns with Ayurvedic care and lifestyle guidance",
    items: [],
  },
  products: {
    eyebrow: "Authentic Ayurvedic Products",
    headingLine1: "Ayurveda beyond",
    headingLine2: "your consultation.",
    description: "A range of authentic Ayurvedic medicines, therapy oils and wellness products to support your health journey.",
    buttonLabel: "Explore Products",
    buttonLink: "/products",
    image: "/home/i2.webp",
    imageAlt: "Authentic Ayurvedic medicines, therapy oils and wellness formulations",
  },
  appointment: {
    eyebrow: "Appointment",
    heading: "Plan your first visit.",
    description:
      "Choose a service, pick a date and let us know if you'd prefer to visit the clinic or consult online. We'll get back to you to confirm your appointment.",
    serviceLabel: "Service",
    servicePlaceholder: "Select a service",
    dateLabel: "Preferred date",
    typeLabel: "Consultation type",
    clinicLabel: "Clinic visit",
    onlineLabel: "Online consultation",
    buttonLabel: "Request Appointment",
    successMessage: "Thank you! Your appointment request has been received. Our team will contact you shortly.",
    items: [
      { label: "Ayurvedic Consultation", value: "consultation" },
      { label: "Panchakarma Therapy", value: "panchakarma" },
      { label: "Yoga & Lifestyle Session", value: "yoga" },
      { label: "Follow-up Consultation", value: "followup" },
    ],
  },
  faq: {
    eyebrow: "FAQs",
    heading: "Before your consultation.",
    description: "Find quick answers to common questions about our consultations, therapies and products.",
    items: [
      {
        question: "Do I need a consultation before starting treatment?",
        answer:
          "Yes, an initial doctor consultation is essential. It enables our physicians to assess your unique constitution (Prakriti), current imbalances (Vikriti), lifestyle, and medical history to create an effective and safe treatment plan.",
      },
      {
        question: "Are the treatments suitable for all age groups?",
        answer:
          "Yes, Ayurvedic therapies and wellness guidance are individually tailored. Treatments for seniors, adults, and younger individuals are carefully adjusted in intensity, duration, and formulation according to individual suitability.",
      },
      {
        question: "How long does a typical treatment plan take?",
        answer:
          "Treatment plans vary based on individual health objectives. Single rejuvenation or stress-relief therapies can be experienced in one session, while structured therapeutic programs and Panchakarma typically span 7, 14, or 21 days.",
      },
      {
        question: "Can I take Ayurvedic medicines along with my current medication?",
        answer:
          "In most cases, yes. Our Ayurvedic doctors carefully review your existing prescriptions and treatments to ensure full compatibility and prevent any herb-drug interactions.",
      },
    ],
  },
};

/** Fetches the live Home content; returns null if the API is unreachable or errors */
export async function fetchHome2(signal?: AbortSignal): Promise<Home2Content | null> {
  try {
    const res = await fetch(`${API_BASE}/website/home2`, { cache: "no-store", signal });
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.data ?? null) as Home2Content | null;
  } catch {
    return null;
  }
}

export interface AppointmentPayload {
  name: string;
  phone: string;
  service: string;
  preferredDate: string;
  consultationType: "clinic" | "online";
}

export interface ConsultationPayload {
  consultationType: "clinic" | "online";
  name: string;
  phone: string;
  email?: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  consent: boolean;
}

/** POST {API}/website/home2/consultations ("Plan your consultation" popup). Throws Error(message) on failure. */
export async function submitConsultation(payload: ConsultationPayload): Promise<void> {
  await postJson(`${API_BASE}/website/home2/consultations`, payload);
}

async function postJson(url: string, payload: unknown): Promise<void> {
  let res: Response;
  try {
    res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  } catch {
    throw new Error("We could not reach the server. Please try again.");
  }
  if (!res.ok) {
    const json = await res.json().catch(() => null);
    const detail = Array.isArray(json?.errors) && json.errors.length ? String(json.errors[0]) : "";
    throw new Error(detail || json?.message || "Something went wrong. Please try again.");
  }
}

/** POST {API}/website/home2/appointments. Throws Error(message) on failure. */
export async function submitAppointment(payload: AppointmentPayload): Promise<void> {
  await postJson(`${API_BASE}/website/home2/appointments`, payload);
}
