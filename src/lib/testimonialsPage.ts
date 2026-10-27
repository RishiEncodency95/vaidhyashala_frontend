"use client";

import { createCmsPage } from "@/lib/cmsPage";

/** Page texts for "/testimonials" (Admin → Pages & CMS → Patient Testimonials). The testimonial cards are separate. */
export interface TestimonialsContent {
  hero: {
    breadcrumbHomeLabel: string;
    breadcrumbHomeHref: string;
    breadcrumbCurrentLabel: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    image: string;
    imageAlt: string;
    previewNote: string;
  } | null;
  featured: { heading: string; sideNote: string; sampleLabel: string; decorativeImage: string } | null;
  categoryFilter: { allLabel: string; items: { label: string; value: string }[] } | null;
  grid: {
    heading: string;
    description: string;
    loadMoreLabel: string;
    initialCount: number;
    loadMoreStep: number;
    emptyMessage: string;
  } | null;
  videoStories: {
    headingLine1: string;
    headingLine2: string;
    description: string;
    image: string;
    imageAlt: string;
  } | null;
  feedbackImpact: { heading: string; image: string; imageAlt: string } | null;
  feedbackForm: {
    heading: string;
    description: string;
    nameLabel: string;
    namePlaceholder: string;
    mobileLabel: string;
    mobilePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    serviceLabel: string;
    servicePlaceholder: string;
    experienceLabel: string;
    experiencePlaceholder: string;
    /** one option per line */
    experienceOptions: string;
    feedbackLabel: string;
    feedbackPlaceholder: string;
    uploadLabel: string;
    uploadHint: string;
    publicationNote: string;
    consentLabel: string;
    buttonLabel: string;
    successTitle: string;
    successMessage: string;
    decorativeImage: string;
    items: { label: string; value: string }[];
  } | null;
  faq: {
    headingLine1: string;
    headingLine2: string;
    description: string;
    items: { question: string; answer: string }[];
  } | null;
  cta: {
    heading: string;
    subtitle: string;
    buttonLabel: string;
    buttonLink: string;
    decorativeImage: string;
  } | null;
}

export const defaultTestimonials: TestimonialsContent = {
  hero: {
    breadcrumbHomeLabel: "Home",
    breadcrumbHomeHref: "/home",
    breadcrumbCurrentLabel: "Patient Testimonials",
    titleLine1: "Experiences that",
    titleLine2: "help us care better.",
    subtitle: "Feedback on consultation, communication and the clinic experience.",
    image: "/testimonial/clinic-reception-hero.webp",
    imageAlt: "Vaidhyashala Clinic Reception",
    previewNote: "Design preview — names, portraits, reviews and video previews are illustrative.",
  },
  featured: {
    heading: "Care begins with being heard.",
    sideNote: "Every conversation helps us understand your needs better and deliver more personalised, compassionate care.",
    sampleLabel: "Sample",
    decorativeImage: "/cont.webp",
  },
  categoryFilter: {
    allLabel: "All",
    items: [
      { label: "Consultation", value: "Consultation" },
      { label: "Panchakarma", value: "Panchakarma" },
      { label: "Yoga & Lifestyle", value: "Yoga & Lifestyle" },
      { label: "Products", value: "Products" },
    ],
  },
  grid: {
    heading: "Explore patient experiences",
    description: "Feedback on consultation, communication and the clinic experience.",
    loadMoreLabel: "Load More Experiences",
    initialCount: 6,
    loadMoreStep: 3,
    emptyMessage: "No experiences in this category yet.",
  },
  videoStories: {
    headingLine1: "Patient stories,",
    headingLine2: "in their own words.",
    description: "A space for consented patient video feedback.",
    image: "/testimonial/te2.webp",
    imageAlt: "Patient stories, in their own words - A space for consented patient video feedback",
  },
  feedbackImpact: {
    heading: "What your feedback helps us improve",
    image: "/testimonial/te1.webp",
    imageAlt: "What your feedback helps us improve: Care & communication, Clinic comfort, Coordination & follow-up",
  },
  feedbackForm: {
    heading: "Share your experience.",
    description:
      "Your feedback helps us understand what we are doing well and where we can serve you better. You can share your suggestions about consultations, therapies, products, clinic experience or anything else related to your journey with us.",
    nameLabel: "Full name *",
    namePlaceholder: "Enter your full name",
    mobileLabel: "Mobile number (private, optional)",
    mobilePlaceholder: "Enter your mobile number",
    emailLabel: "Email (optional)",
    emailPlaceholder: "Enter your email address",
    serviceLabel: "Service used *",
    servicePlaceholder: "Select a service",
    experienceLabel: "Overall experience (optional)",
    experiencePlaceholder: "Select an option",
    experienceOptions: "Excellent\nVery Good\nGood\nFair",
    feedbackLabel: "Your feedback *",
    feedbackPlaceholder: "Share your experience with us...",
    uploadLabel: "Add a photo or video (optional)",
    uploadHint: "JPG, PNG or MP4. Max 50 MB.",
    publicationNote: "Publication requires separate consent and review.",
    consentLabel: "I consent to publication of my feedback and display name. (optional)",
    buttonLabel: "Submit Feedback",
    successTitle: "Thank you for sharing your experience.",
    successMessage: "Your feedback has been received and helps us continuously enhance our care.",
    decorativeImage: "/leaf.webp",
    items: [
      { label: "Doctor Consultation", value: "Consultation" },
      { label: "Panchakarma Therapy", value: "Panchakarma" },
      { label: "Yoga & Lifestyle Care", value: "Yoga" },
      { label: "Ayurvedic Products", value: "Products" },
      { label: "General Clinic Experience", value: "General" },
    ],
  },
  faq: {
    headingLine1: "Frequently",
    headingLine2: "asked questions",
    description: "Find answers to common questions about patient testimonials.",
    items: [
      { question: "Will my contact details be published?", answer: "No. Your contact details are not displayed in a public testimonial." },
      {
        question: "Can I share feedback without agreeing to publication?",
        answer: "Yes, you can share feedback privately for our internal quality review without agreeing to public display on the website.",
      },
      {
        question: "How are testimonials selected for display?",
        answer:
          "Testimonials are selected to provide balanced and genuine reflections of patient care across different therapies and consultations, always with explicit consent.",
      },
    ],
  },
  cta: {
    heading: "Ready to discuss your care?",
    subtitle: "We are here to listen and guide you on your wellness journey.",
    buttonLabel: "Book a Consultation",
    buttonLink: "/#consultation",
    decorativeImage: "/cont.webp",
  },
};

export const { Provider: TestimonialsProvider, usePage: useTestimonialsPage } = createCmsPage<TestimonialsContent>(
  "testimonials",
  defaultTestimonials,
);
