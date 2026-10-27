"use client";

import { createCmsPage } from "@/lib/cmsPage";
import type { PolicySectionItem } from "@/lib/privacyPage";

/** Page texts for "/terms" (Admin → Pages & CMS → Terms of Use) */
export interface TermsContent {
  hero: {
    breadcrumbHomeLabel: string;
    breadcrumbHomeHref: string;
    breadcrumbCurrentLabel: string;
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
   * undefined = not loaded from the CMS (the page falls back to its built-in terms text),
   * null = hidden in the admin.
   */
  policySections?: {
    contentsLabel: string;
    toBeConfirmedLabel: string;
    contactEmail: string;
    contactPhone: string;
    items: PolicySectionItem[];
  } | null;
  beforeSubmitting: { heading: string; description: string; image: string; imageAlt: string } | null;
  relatedLinks: { label: string; items: { label: string; link: string }[] } | null;
}

export const defaultTerms: TermsContent = {
  hero: {
    breadcrumbHomeLabel: "Home",
    breadcrumbHomeHref: "/home",
    breadcrumbCurrentLabel: "Terms of Use",
    title: "Terms of Use",
    subtitle: "Guidelines for using the website and requesting clinic assistance.",
    statusBadge: "Draft for review",
    effectiveDate: "Effective date: To be confirmed",
    iconImage: "",
    image: "/panchakarma/p1.webp",
    imageAlt: "Vaidhyashala Terms of Use - Ayurvedic Clinic & Panchakarma Centre",
  },
  summaryCards: {
    image: "/privicy/03_website_appointment_product_cards.webp",
    imageAlt: "Website information, Appointment requests, Product catalogue",
  },
  beforeSubmitting: {
    heading: "Before submitting a request",
    description: "A few things to keep in mind when using our website forms.",
    image: "/privicy/01_before_submitting_request.webp",
    imageAlt: "Before submitting a request - A few things to keep in mind when using our website forms",
  },
  relatedLinks: {
    label: "Related Links",
    items: [{ label: "Privacy Policy", link: "/privacy" }],
  },
};

export const { Provider: TermsProvider, usePage: useTermsPage } = createCmsPage<TermsContent>("terms", defaultTerms);
