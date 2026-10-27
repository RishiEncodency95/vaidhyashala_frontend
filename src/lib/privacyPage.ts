"use client";

import { createCmsPage } from "@/lib/cmsPage";

export interface PolicySectionItem {
  number: string;
  title: string;
  anchorId: string;
  /** one bullet per line */
  bullets: string;
  note: string;
  toBeConfirmed: boolean;
  showContactRow: boolean;
}

/** Page texts for "/privacy" (Admin → Pages & CMS → Privacy Policy) */
export interface PrivacyContent {
  hero: {
    title: string;
    subtitle: string;
    statusBadge: string;
    effectiveDate: string;
    iconImage: string;
    image: string;
    imageAlt: string;
  } | null;
  summaryCards: { image: string; imageAlt: string } | null;
  /**
   * undefined = not loaded from the CMS (the page falls back to its built-in policy text),
   * null = hidden in the admin.
   */
  policySections?: {
    contentsLabel: string;
    toBeConfirmedLabel: string;
    contactEmail: string;
    contactPhone: string;
    items: PolicySectionItem[];
  } | null;
  beforeSharing: { heading: string; description: string; image: string; imageAlt: string } | null;
  relatedLinks: { label: string; items: { label: string; link: string }[] } | null;
}

export const defaultPrivacy: PrivacyContent = {
  hero: {
    title: "Privacy Policy",
    subtitle: "How information shared through this website is handled.",
    statusBadge: "Draft for review",
    effectiveDate: "Effective date: To be confirmed",
    iconImage: "",
    image: "/panchakarma/p1.webp",
    imageAlt: "Vaidhyashala Privacy Policy - Ayurvedic Clinic & Panchakarma Centre",
  },
  summaryCards: {
    image: "/privicy/04_information_sharing_choices_cards.webp",
    imageAlt: "Information you share, Why it is requested, Your choices",
  },
  beforeSharing: {
    heading: "Before sharing information",
    description: "A few things to keep in mind when using our website forms.",
    image: "/privicy/02_before_sharing_information.webp",
    imageAlt: "Before sharing information - A few things to keep in mind when using our website forms",
  },
  relatedLinks: {
    label: "Related Links",
    items: [{ label: "Terms of Use", link: "/terms" }],
  },
};

export const { Provider: PrivacyProvider, usePage: usePrivacyPage } = createCmsPage<PrivacyContent>(
  "privacy",
  defaultPrivacy,
);
