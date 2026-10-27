"use client";

import { createCmsPage } from "@/lib/cmsPage";

/** Page texts for "/careers" (Admin → Pages & CMS → Careers). The job cards come from the open jobs. */
export interface CareersContent {
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    /** one word per line */
    tagline: string;
    image: string;
    imageAlt: string;
    badgesImage: string;
    badgesImageAlt: string;
  } | null;
  openings: {
    eyebrow: string;
    heading: string;
    description: string;
    buttonLabel: string;
    emptyHeading: string;
    emptyDescription: string;
    emptyButtonLabel: string;
  } | null;
  whyWork: {
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
    description: string;
    items: { iconImage: string; title: string; description: string }[];
  } | null;
  life: {
    eyebrow: string;
    heading: string;
    description: string;
    lastImage: string;
    lastImageAlt: string;
    /** one word per line */
    lastCaption: string;
    items: { image: string; imageAlt: string }[];
  } | null;
  shareProfile: { heading: string; description: string; buttonLabel: string } | null;
}

export const defaultCareers: CareersContent = {
  hero: {
    eyebrow: "Careers at Vaidhyashala",
    titleLine1: "Build a Purposeful",
    titleLine2: "Career in Ayurveda",
    description: "Be a part of a dedicated team committed to authentic Ayurvedic care, holistic healing and healthier lives.",
    tagline: "Ancient\nWisdom\nModern\nWellness",
    image: "/career/he1.webp",
    imageAlt: "Careers at Vaidhyashala",
    badgesImage: "/career/he2.webp",
    badgesImageAlt: "Meaningful Work, Collaborative Team, Growth Opportunities, Real Impact on Lives",
  },
  openings: {
    eyebrow: "Current Openings",
    heading: "Explore Opportunities",
    description: "Join our team and contribute to a healthier, happier tomorrow with the wisdom of Ayurveda.",
    buttonLabel: "View Details",
    emptyHeading: "No Open Positions at the Moment",
    emptyDescription: "We appreciate your interest in being part of Vaidhyashala. Please check back soon for new opportunities.",
    emptyButtonLabel: "Share Your Profile",
  },
  whyWork: {
    eyebrow: "Why Work With Vaidhyashala",
    headingLine1: "A Meaningful Career,",
    headingLine2: "A Healthier Tomorrow",
    description:
      "At Vaidhyashala, you will be part of a compassionate and professional environment that values traditional wisdom, continuous learning and the well-being of both our team and our patients.",
    items: [
      { iconImage: "", title: "Purpose-Driven Work", description: "Contribute to authentic Ayurveda and holistic wellness." },
      { iconImage: "", title: "Supportive Team Environment", description: "Work with experienced doctors and wellness professionals." },
      { iconImage: "", title: "Learning & Growth", description: "Enhance your skills with continuous learning and opportunities." },
      { iconImage: "", title: "Positive Impact", description: "Be a part of a mission that improves lives naturally." },
    ],
  },
  life: {
    eyebrow: "Life at Vaidhyashala",
    heading: "Work in a Culture of Care and Learning",
    description: "We foster a respectful, balanced and inspiring work environment where traditional knowledge meets modern wellness.",
    lastImage: "/career/06_wellness_interior.webp",
    lastImageAlt: "Healing People Enriching Lives wellness space",
    lastCaption: "Healing\nPeople\nEnriching\nLives",
    items: [
      { image: "/career/02_ayurvedic_herbal_tools.webp", imageAlt: "Authentic Ayurvedic preparation tools and herbs" },
      { image: "/career/03_doctor_patient_consultation.webp", imageAlt: "Ayurvedic doctor consulting with patient" },
      { image: "/career/04_clinic_team_collaboration.webp", imageAlt: "Healthcare professionals collaborating at Vaidhyashala" },
      { image: "/career/09_herbal_oils_and_ingredients.webp", imageAlt: "Traditional Ayurvedic herbal oils, turmeric and bronze vessels" },
    ],
  },
  shareProfile: {
    heading: "Don’t See the Right Role?",
    description:
      "We are always open to connecting with passionate and talented professionals. Share your profile with us and we will get in touch when a suitable opportunity arises.",
    buttonLabel: "Share Your Profile",
  },
};

export const { Provider: CareersProvider, usePage: useCareersPage } = createCmsPage<CareersContent>("careers", defaultCareers);
