"use client";

import { useEffect } from "react";
import { loadContent } from "@/lib/content/contentCache";
import { fetchCmsPage } from "@/lib/content/createCmsPage";
import { fetchHome2 } from "@/lib/content/home";
import { fetchAbout } from "@/lib/content/about";
import { fetchTreatments } from "@/lib/content/treatments";
import { fetchJournal } from "@/lib/content/journal";

/** Pages managed with createCmsPage, by their CMS key */
const CMS_PAGES = ["panchakarma", "products", "contact", "careers", "testimonials", "privacy", "terms"];

/**
 * Once the first page has loaded, quietly fetches every other page's content (the same requests
 * those pages make), so the first visit to each of them shows instantly instead of waiting for it.
 */
export default function ContentPrefetch() {
  useEffect(() => {
    const start = () => {
      loadContent("home2", () => fetchHome2());
      loadContent("about-us", () => fetchAbout());
      loadContent("treatments", () => fetchTreatments());
      loadContent("home1", () => fetchJournal());
      for (const key of CMS_PAGES) loadContent(`cms:${key}`, () => fetchCmsPage(key));
    };
    // After the current page is done, so it never competes with what the visitor is looking at
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200));
    const handle = idle(start);
    return () => (window.cancelIdleCallback ?? window.clearTimeout)(handle);
  }, []);

  return null;
}
