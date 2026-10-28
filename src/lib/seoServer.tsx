/**
 * Page SEO from the backend (Admin → Pages & CMS → <page> → SEO Information), rendered on the server
 * so search engines and social previews (WhatsApp, Facebook, LinkedIn) see it without running scripts.
 * Public, read-only: the same endpoints the pages already use for their content.
 */
import React, { Suspense, cache } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
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
 * Never cached, so whatever is saved in the admin is on the very next page load. Fetched once per
 * request (React cache), shared by the metadata and the schema script.
 */
export const fetchSeo = cache(async (endpoint: string): Promise<SeoData | null> => {
  try {
    const res = await fetch(`${API_BASE}/website/${endpoint}`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.data?.seo ?? null) as SeoData | null;
  } catch {
    return null;
  }
});

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

/** The website path an SEO endpoint belongs to, for the automatic canonical URL */
const pagePath = (endpoint: string) =>
  ({ home2: "/", home1: "/blog", "pages/about-us": "/about" } as Record<string, string>)[endpoint] ??
  `/${endpoint.replace(/^pages\//, "")}`;

/** href of a pasted <link rel="canonical" href="..."> */
const canonicalFromTag = (tag?: string) => (tag ?? "").match(/\bhref\s*=\s*["']([^"']+)["']/i)?.[1] ?? "";

/** Metadata for a page from its SEO fields; {} (keeps the site defaults) if the API cannot be reached */
export async function seoMetadata(endpoint: string): Promise<Metadata> {
  const seo = await fetchSeo(endpoint);
  if (!seo) return {};

  const og = parseMetaTags(seo.openGraphTags);
  // Left empty in the admin: the page's own address on this website
  const canonical = absolute(seo.canonicalUrl || canonicalFromTag(seo.canonicalTag) || pagePath(endpoint));
  const title = seo.metaTitle?.trim() || undefined;
  const description = seo.metaDescription?.trim() || undefined;
  // What the admin can see wins: the "Open Graph Tags" box, then Meta Title / Description
  const ogTitle = og["og:title"] || title || seo.ogTitle?.trim() || undefined;
  const ogDescription = og["og:description"] || description || seo.ogDescription?.trim() || undefined;
  // The "OG Image" upload first, then an og:image in the "Open Graph Tags" box
  const ogImage = absolute(seo.ogImage || og["og:image"]);

  return {
    title: title ? { absolute: title } : undefined,
    description,
    keywords: seo.metaKeywords?.trim() || undefined,
    robots: { index: seo.robotsIndex !== false, follow: seo.robotsFollow !== false },
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: absolute(og["og:url"]) || canonical || undefined,
      siteName: og["og:site_name"] || "Vaidhyashala",
      locale: og["og:locale"] || undefined,
      type: "website",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: ogTitle,
      description: ogDescription,
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

/**
 * The page's schema markup as <script type="application/ld+json"> tags. Read at request time, so it
 * sits in a Suspense boundary (Cache Components): the rest of the page does not wait for it.
 */
export function JsonLd({ endpoint }: { endpoint: string }) {
  return (
    <Suspense fallback={null}>
      <JsonLdScripts endpoint={endpoint} />
    </Suspense>
  );
}

async function JsonLdScripts({ endpoint }: { endpoint: string }) {
  // Marks the page as read at request time on purpose (Cache Components), so the uncached SEO fetch in
  // generateMetadata is allowed and the rest of the page still prerenders
  await connection();
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
