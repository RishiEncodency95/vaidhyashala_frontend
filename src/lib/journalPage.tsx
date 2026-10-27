"use client";

/**
 * Health Journal ("/blog") content from the backend (Admin → Pages & CMS → Home 1, plus the
 * article and category lists). Public, read-only: GET {API}/website/home1 — inactive sections
 * come back as null. The fallback below is what the page shipped with; it is used only if the
 * API cannot be reached.
 */
import React, { createContext, useContext, useEffect, useState } from "react";
import { API_BASE } from "@/lib/home2";
import { featuredArticle, initialArticles } from "@/data/articles";

export interface JournalCategory {
  _id?: string;
  name: string;
  slug: string;
}

export interface JournalArticle {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  category: JournalCategory;
  image: string;
  imageAlt: string;
  /** Where "Read Article" goes; empty = built from the slug */
  link: string;
}

export interface JournalContent {
  hero: {
    breadcrumbHomeLabel: string;
    breadcrumbHomeHref: string;
    breadcrumbCurrentLabel: string;
    titleLine1: string;
    titleLine2: string;
    titleAccent: string;
    subtitle: string;
    backgroundImage: string;
    backgroundImageAlt: string;
  } | null;
  searchFilter: {
    searchPlaceholder: string;
    allCategoryLabel: string;
    noResultsMessage: string;
    categories: JournalCategory[];
  } | null;
  featured: {
    eyebrow: string;
    buttonLabel: string;
    decorativeImage: string;
    decorativeImageAlt: string;
    article: JournalArticle;
  } | null;
  articlesSection: {
    eyebrow: string;
    heading: string;
    notice: string;
    readMoreLabel: string;
    loadMoreLabel: string;
    initialCount: number;
    loadMoreStep: number;
    articles: JournalArticle[];
  } | null;
  seo?: { metaTitle?: string };
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const fallbackArticle = (a: (typeof initialArticles)[number]): JournalArticle => ({
  title: a.title,
  slug: String(a.id),
  excerpt: a.excerpt,
  category: { name: a.category, slug: slugify(a.category) },
  image: a.imageSrc ?? "",
  imageAlt: a.imageAlt,
  link: "",
});

export const defaultJournal: JournalContent = {
  hero: {
    breadcrumbHomeLabel: "Home",
    breadcrumbHomeHref: "/home",
    breadcrumbCurrentLabel: "Health Journal",
    titleLine1: "The Vaidhyashala",
    titleLine2: "Health Journal",
    titleAccent: ".",
    subtitle: "Explore Ayurveda, therapies and thoughtful everyday routines.",
    backgroundImage: "/hero.webp",
    backgroundImageAlt: "The Vaidhyashala Health Journal - Ayurveda herbs, brass mortar, pestle, and journal",
  },
  searchFilter: {
    searchPlaceholder: "Search articles...",
    allCategoryLabel: "All",
    noResultsMessage: "No articles found matching your criteria.",
    categories: ["Ayurveda", "Panchakarma", "Yoga & Lifestyle", "Clinic Guidance"].map((name) => ({ name, slug: slugify(name) })),
  },
  featured: {
    eyebrow: "Featured Article",
    buttonLabel: "Read Article",
    decorativeImage: "/cont.webp",
    decorativeImageAlt: "Decorative leaves illustration",
    article: fallbackArticle(featuredArticle),
  },
  articlesSection: {
    eyebrow: "Explore the Journal",
    heading: "Articles for a more conscious, balanced life.",
    notice: "Illustrative article previews — editorial content to be finalised.",
    readMoreLabel: "Read Article",
    loadMoreLabel: "Load More Articles",
    initialCount: 6,
    loadMoreStep: 3,
    articles: initialArticles.map(fallbackArticle),
  },
};

export const articleHref = (article: JournalArticle) => article.link || `/#article-${article.slug}`;

async function fetchJournal(signal?: AbortSignal): Promise<JournalContent | null> {
  try {
    const res = await fetch(`${API_BASE}/website/home1`, { cache: "no-store", signal });
    if (!res.ok) return null;
    const json = await res.json();
    const data = json?.data;
    if (!data) return null;
    return { ...data, seo: data.seo } as JournalContent;
  } catch {
    return null;
  }
}

const JournalContext = createContext<JournalContent>(defaultJournal);

/** Loads the Health Journal content from the backend once, then shares it with the sections */
export function JournalProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<JournalContent>(defaultJournal);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetchJournal(controller.signal).then((live) => {
      if (controller.signal.aborted) return;
      if (live) {
        setContent(live);
        if (live.seo?.metaTitle) document.title = live.seo.metaTitle;
      }
      setReady(true);
    });
    return () => controller.abort();
  }, []);

  // Hold the page back until the CMS answers so default text never flashes before the real text
  return (
    <JournalContext.Provider value={content}>
      <div className={`flex flex-1 flex-col transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}>
        {children}
      </div>
    </JournalContext.Provider>
  );
}

export const useJournal = () => useContext(JournalContext);
