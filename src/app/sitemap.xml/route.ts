import { fetchWebsiteData, siteUrl, uploadedRootFile } from "@/lib/rootFiles";

/**
 * /sitemap.xml — an uploaded sitemap.xml (Admin → Advanced SEO) is served as it is; otherwise it is
 * built on every request from the website's pages and the Health Journal (blog) articles, so a page
 * set to "noindex" or a new article shows up straight away.
 */

interface SeoInfo {
  robotsIndex?: boolean;
}

interface JournalArticle {
  slug: string;
  link?: string;
  updatedAt?: string;
}

interface PageData {
  seo?: SeoInfo;
  updatedAt?: string;
  featured?: { article?: JournalArticle } | null;
  articlesSection?: { articles?: JournalArticle[] } | null;
}

/** Public pages, with the backend endpoint that holds each one's SEO (for "noindex" and the last update) */
const PAGES: { path: string; endpoint: string; changefreq: string; priority: number }[] = [
  { path: "/", endpoint: "home2", changefreq: "weekly", priority: 1.0 },
  { path: "/treatments", endpoint: "pages/treatments", changefreq: "monthly", priority: 0.9 },
  { path: "/panchakarma", endpoint: "pages/panchakarma", changefreq: "monthly", priority: 0.9 },
  { path: "/about", endpoint: "pages/about-us", changefreq: "monthly", priority: 0.8 },
  { path: "/products", endpoint: "pages/products", changefreq: "weekly", priority: 0.8 },
  { path: "/blog", endpoint: "home1", changefreq: "weekly", priority: 0.8 },
  { path: "/contact", endpoint: "pages/contact", changefreq: "monthly", priority: 0.7 },
  { path: "/testimonials", endpoint: "pages/testimonials", changefreq: "monthly", priority: 0.6 },
  { path: "/careers", endpoint: "pages/careers", changefreq: "weekly", priority: 0.6 },
  { path: "/privacy", endpoint: "pages/privacy", changefreq: "yearly", priority: 0.3 },
  { path: "/terms", endpoint: "pages/terms", changefreq: "yearly", priority: 0.3 },
];

const escapeXml = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

const day = (iso?: string) => {
  const d = iso ? new Date(iso) : null;
  return d && !Number.isNaN(d.getTime()) ? d.toISOString().slice(0, 10) : undefined;
};

/**
 * An article's own page on this website, or null. Articles that only open their card on /blog
 * ("/blog#article-…") have no page of their own, and a sitemap cannot list "#" links.
 */
function articleUrl(article: JournalArticle, site: string): string | null {
  const link = (article.link ?? "").trim();
  if (!link || link.includes("#")) return null;
  if (link.startsWith("/")) return `${site}${link}`;
  try {
    const url = new URL(link);
    return url.origin === new URL(site).origin ? url.href : null;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const uploaded = await uploadedRootFile("sitemap.xml");
  if (uploaded !== null) {
    return new Response(uploaded, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "no-store" } });
  }

  const site = siteUrl(request);
  const pages = await Promise.all(PAGES.map(async (p) => ({ ...p, data: await fetchWebsiteData<PageData>(p.endpoint) })));

  const urls: { loc: string; lastmod?: string; changefreq: string; priority: number }[] = [];
  for (const page of pages) {
    // A page set to "noindex" in its SEO Information stays out of the sitemap
    if (page.data?.seo?.robotsIndex === false) continue;
    urls.push({ loc: `${site}${page.path === "/" ? "/" : page.path}`, lastmod: day(page.data?.updatedAt), changefreq: page.changefreq, priority: page.priority });
  }

  // Health Journal (blog) articles that have a page of their own
  const journal = pages.find((p) => p.endpoint === "home1")?.data;
  if (journal?.seo?.robotsIndex !== false) {
    const articles = [journal?.featured?.article, ...(journal?.articlesSection?.articles ?? [])].filter(Boolean) as JournalArticle[];
    const seen = new Set(urls.map((u) => u.loc));
    for (const article of articles) {
      const loc = articleUrl(article, site);
      if (!loc || seen.has(loc)) continue;
      seen.add(loc);
      urls.push({ loc, lastmod: day(article.updatedAt), changefreq: "monthly", priority: 0.7 });
    }
  }

  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${escapeXml(u.loc)}</loc>\n${u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : ""}    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority.toFixed(1)}</priority>\n  </url>`
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "no-store" } });
}
