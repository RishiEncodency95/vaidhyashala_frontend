"use client";

import { createCmsPage } from "@/lib/cmsPage";

/** Page texts for "/contact" (Admin → Pages & CMS → Contact Us) */
export interface ContactContent {
  hero: {
    breadcrumbHomeLabel: string;
    breadcrumbHomeHref: string;
    breadcrumbCurrentLabel: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    image: string;
    imageAlt: string;
  } | null;
  contactMethods: {
    eyebrow: string;
    heading: string;
    description: string;
    items: { iconImage: string; title: string; description: string; value: string; buttonLabel: string; link: string }[];
  } | null;
  enquiryForm: {
    eyebrow: string;
    heading: string;
    description: string;
    nameLabel: string;
    namePlaceholder: string;
    mobileLabel: string;
    mobilePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    enquiryAboutLabel: string;
    enquiryAboutPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    consentLabel: string;
    buttonLabel: string;
    successTitle: string;
    successMessage: string;
    items: { label: string; value: string }[];
  } | null;
  planVisit: {
    eyebrow: string;
    heading: string;
    description: string;
    note: string;
    image: string;
    imageAlt: string;
    items: { iconImage: string; title: string; description: string }[];
  } | null;
  location: {
    eyebrow: string;
    heading: string;
    description: string;
    mapEmbedUrl: string;
    mapImage: string;
    mapImageAlt: string;
    mapNote: string;
    directionsUrl: string;
    clinicImage: string;
    clinicImageAlt: string;
    clinicHeading: string;
    clinicDescription: string;
  } | null;
  faq: {
    eyebrow: string;
    heading: string;
    description: string;
    items: { question: string; answer: string }[];
  } | null;
  cta: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    buttonLabel: string;
    buttonLink: string;
    decorativeImage: string;
  } | null;
}

export const defaultContact: ContactContent = {
  hero: {
    breadcrumbHomeLabel: "Home",
    breadcrumbHomeHref: "/home",
    breadcrumbCurrentLabel: "Contact Us",
    titleLine1: "Let’s begin with",
    titleLine2: "a conversation.",
    subtitle: "Connect with our team for consultations, therapies and product enquiries.",
    image: "/contct/ct.webp",
    imageAlt: "Vaidhyashala Clinic Reception - Let's begin with a conversation",
  },
  contactMethods: {
    eyebrow: "Get in Touch",
    heading: "How can we help you?",
    description: "Choose the best way to reach us. Our team is here to support you.",
    items: [
      {
        iconImage: "",
        title: "Phone",
        description: "Speak with our team for consultations, therapies and general enquiries.",
        value: "[Clinic phone]",
        buttonLabel: "Call the Clinic",
        link: "tel:+910000000000",
      },
      {
        iconImage: "",
        title: "WhatsApp",
        description: "Get in touch on WhatsApp for quick assistance.",
        value: "[WhatsApp number]",
        buttonLabel: "Start a Chat",
        link: "https://wa.me/",
      },
      {
        iconImage: "",
        title: "Email",
        description: "Write to us for detailed enquiries about consultations, therapies or products.",
        value: "[Clinic email]",
        buttonLabel: "Email Us",
        link: "mailto:care@vaidhyashala.com",
      },
      {
        iconImage: "",
        title: "Visit the Clinic",
        description: "We welcome you to our clinic for consultations and therapies.",
        value: "[Clinic address]",
        buttonLabel: "Get Directions",
        link: "#location",
      },
    ],
  },
  enquiryForm: {
    eyebrow: "Send Us an Enquiry",
    heading: "Send us an enquiry.",
    description: "Share a few details and our team will get back to you.",
    nameLabel: "Full name",
    namePlaceholder: "Your full name",
    mobileLabel: "Mobile number",
    mobilePlaceholder: "Your mobile number",
    emailLabel: "Email (optional)",
    emailPlaceholder: "Your email address",
    enquiryAboutLabel: "Enquiry about",
    enquiryAboutPlaceholder: "Select an option",
    messageLabel: "Your message",
    messagePlaceholder: "How can we help you?",
    consentLabel: "I agree to be contacted about my enquiry.",
    buttonLabel: "Send Enquiry",
    successTitle: "Thank you for your enquiry!",
    successMessage: "Our team has received your message and will get back to you promptly.",
    items: [
      { label: "Doctor Consultation", value: "Consultation" },
      { label: "Panchakarma Therapies", value: "Panchakarma" },
      { label: "Ayurvedic Medicines & Products", value: "Products" },
      { label: "General Enquiry", value: "General" },
    ],
  },
  planVisit: {
    eyebrow: "Plan Your Visit",
    heading: "Plan your visit.",
    description: "Here's what you need to know before coming to the clinic.",
    note: "Please contact the clinic before visiting to confirm doctor availability.",
    image: "/contct/c3.webp",
    imageAlt: "Plan your visit - Here's what you need to know before coming to the clinic",
    items: [
      { iconImage: "", title: "Clinic address", description: "[Confirmed clinic address]" },
      { iconImage: "", title: "Clinic timings", description: "Days and consultation hours to be confirmed." },
    ],
  },
  location: {
    eyebrow: "Location",
    heading: "Find our clinic.",
    description: "Our clinic is conveniently located for easy access. The map below will show the exact location.",
    mapEmbedUrl: "",
    mapImage: "/contct/c4.webp",
    mapImageAlt: "Vaidhyashala Clinic Location Map",
    mapNote: "Map will show the confirmed clinic location.",
    directionsUrl: "",
    clinicImage: "/contct/c2.webp",
    clinicImageAlt: "A welcoming space for your care at Vaidhyashala",
    clinicHeading: "A welcoming space for your care.",
    clinicDescription: "Experience a calm and healing environment designed to support your Ayurvedic journey.",
  },
  faq: {
    eyebrow: "Frequently Asked Questions",
    heading: "Common questions.",
    description: "Find quick answers to help you get in touch with us.",
    items: [
      {
        question: "How can I request an appointment?",
        answer: "Use the appointment form or contact our team. The clinic will confirm your request and available timings.",
      },
      {
        question: "Can I enquire about therapy availability?",
        answer:
          "Yes, you can enquire about specific therapies such as Panchakarma, Shirodhara, or Abhyanga directly through WhatsApp, phone, or our enquiry form.",
      },
      {
        question: "Can I ask about a product?",
        answer:
          "Yes, our team can guide you on authentic Ayurvedic medicines, wellness formulations, dosage recommendations, and availability at our clinic counter.",
      },
    ],
  },
  cta: {
    eyebrow: "Get Started",
    heading: "Ready to plan your first visit?",
    subtitle: "Our team is here to answer your questions and help you take the next step.",
    buttonLabel: "Request an Appointment",
    buttonLink: "/#appointment",
    decorativeImage: "/cont.webp",
  },
};

export const { Provider: ContactProvider, usePage: useContactPage } = createCmsPage<ContactContent>(
  "contact",
  defaultContact,
);
