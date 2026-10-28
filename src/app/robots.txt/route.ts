import { siteUrl, uploadedRootFile } from "@/lib/rootFiles";

/**
 * /robots.txt — an uploaded robots.txt (Admin → Advanced SEO) is served as it is; otherwise this one is
 * generated: everything may be crawled except the API, the careers application steps and the email
 * template previews, and crawlers are pointed to /sitemap.xml.
 */

/** Pages that are steps of a form or email previews, not content worth showing in search */
const DISALLOW = [
  "/api/",
  "/careers/apply",
  "/careers/apply-for-position",
  "/careers/ai-screening-",
  "/careers/application-submitted",
  "/careers/complete-application",
  "/careers/cv-analysis",
  "/careers/eligibility-result",
  "/careers/not-eligible",
  "/careers/partial-match",
  "/careers/review-details",
  "/candidate-application-submitted",
  "/hr-notification",
];

export async function GET(request: Request) {
  const uploaded = await uploadedRootFile("robots.txt");
  if (uploaded !== null) {
    return new Response(uploaded, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
  }

  const site = siteUrl(request);
  const text = ["User-agent: *", "Allow: /", ...DISALLOW.map((p) => `Disallow: ${p}`), "", `Sitemap: ${site}/sitemap.xml`, ""].join("\n");

  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
}
