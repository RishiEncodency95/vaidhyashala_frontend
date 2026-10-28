/**
 * Page SEO from the backend (Admin → Pages & CMS → <page> → SEO Information), rendered on the server
 * so search engines and social previews (WhatsApp, Facebook, LinkedIn) see it without running scripts.
 * Public, read-only: the same endpoints the pages already use for their content.
 */
import React from "react";
import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { API_BASE } from "@/lib/home2";

export interface SeoData {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  canonicalTag?: string;
  openGraphTags?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  schemaMarkup?: string;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
}

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");

/** "/treatments" or "treatments/x.webp" -> full URL on this site; full URLs are kept */
const absolute = (url?: string) => {
  const u = (url ?? "").trim();
  if (!u) return "";
  if (/^(https?:)?\/\//i.test(u)) return u;
  return `${SITE_URL}${u.startsWith("/") ? "" : "/"}${u}`;
};

/**
 * endpoint: "pages/treatments", "home2", "home1" -> GET {API}/website/<endpoint>; null if unreachable.
 * Cached, so the page can be prerendered: an admin change shows up on the website within about a minute.
 */
export async function fetchSeo(endpoint: string): Promise<SeoData | null> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 60, expire: 3600 });
  try {
    const res = await fetch(`${API_BASE}/website/${endpoint}`);
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.data?.seo ?? null) as SeoData | null;
  } catch {
    return null;
  }
}

/** <meta property="og:x" content="y"> pasted into "Open Graph Tags" -> { "og:x": "y" } */
function parseMetaTags(html?: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const tag of (html ?? "").match(/<meta\b[^>]*>/gi) ?? []) {
    const key = tag.match(/\b(?:property|name)\s*=\s*["']([^"']+)["']/i)?.[1];
    const content = tag.match(/\bcontent\s*=\s*["']([^"']*)["']/i)?.[1];
    if (key && content) out[key.toLowerCase()] = content;
  }
  return out;
}

/** href of a pasted <link rel="canonical" href="..."> */
const canonicalFromTag = (tag?: string) => (tag ?? "").match(/\bhref\s*=\s*["']([^"']+)["']/i)?.[1] ?? "";

/** Metadata for a page from its SEO fields; {} (keeps the site defaults) if the API cannot be reached */
export async function seoMetadata(endpoint: string): Promise<Metadata> {
  const seo = await fetchSeo(endpoint);
  if (!seo) return {};

  const og = parseMetaTags(seo.openGraphTags);
  const canonical = absolute(seo.canonicalUrl || canonicalFromTag(seo.canonicalTag));
  const title = seo.metaTitle?.trim() || undefined;
  const description = seo.metaDescription?.trim() || undefined;
  const ogImage = absolute(og["og:image"] || seo.ogImage);

  return {
    title: title ? { absolute: title } : undefined,
    description,
    keywords: seo.metaKeywords?.trim() || undefined,
    robots: { index: seo.robotsIndex !== false, follow: seo.robotsFollow !== false },
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: og["og:title"] || seo.ogTitle?.trim() || title,
      description: og["og:description"] || seo.ogDescription?.trim() || description,
      url: og["og:url"] || canonical || undefined,
      siteName: og["og:site_name"] || undefined,
      type: "website",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: og["og:title"] || seo.ogTitle?.trim() || title,
      description: og["og:description"] || seo.ogDescription?.trim() || description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

/** The page's own metadata, with whatever the admin has set in SEO Information on top */
export async function withSeo(fallback: Metadata, endpoint: string): Promise<Metadata> {
  const seo = await seoMetadata(endpoint);
  const set = Object.fromEntries(Object.entries(seo).filter(([, v]) => v !== undefined));
  return { ...fallback, ...set };
}

/**
 * Schema markup however it was pasted: plain JSON, inside <script type="application/ld+json">,
 * inside <script type="application/json">, or several scripts. Invalid JSON is skipped.
 */
export function parseSchema(raw?: string): object[] {
  const text = (raw ?? "").trim();
  if (!text) return [];
  const scripts = [...text.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  const chunks = scripts.length ? scripts : [text];
  const out: object[] = [];
  for (const chunk of chunks) {
    const body = chunk.trim().replace(/^<!\[CDATA\[|\]\]>$/g, "").trim();
    if (!body) continue;
    try {
      const parsed = JSON.parse(body);
      for (const item of Array.isArray(parsed) ? parsed : [parsed]) {
        if (item && typeof item === "object") out.push(item);
      }
    } catch {
      // not valid JSON: leave it out rather than break the page
    }
  }
  return out;
}

/** The page's schema markup as <script type="application/ld+json"> tags */
export async function JsonLd({ endpoint }: { endpoint: string }) {
  const seo = await fetchSeo(endpoint);
  return (
    <>
      {parseSchema(seo?.schemaMarkup).map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // "<" escaped so the JSON can never close the script tag
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
