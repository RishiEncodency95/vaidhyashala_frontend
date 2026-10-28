/**
 * Prepares every resized image before visitors ask for it.
 * Next.js creates each image size the first time it is requested, so right after a deploy the first
 * visitor waits for that. Run this once after `npm start` (or a deploy):
 *
 *   npm run warm-images                         -> http://localhost:3000
 *   npm run warm-images -- https://www.example.com
 *
 * It reads /sitemap.xml, opens each page and requests every image size the page offers.
 */
const site = (process.argv[2] || "http://localhost:3000").replace(/\/+$/, "");
const CONCURRENCY = 4;

const decode = (s) => s.replace(/&amp;/g, "&");

async function pagesFromSitemap() {
  try {
    const xml = await (await fetch(`${site}/sitemap.xml`)).text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
    return locs.length ? locs : ["/"];
  } catch {
    return ["/"];
  }
}

async function imageUrls(path) {
  const html = await (await fetch(site + path)).text();
  const urls = new Set();
  for (const m of html.matchAll(/(?:srcSet|srcset)="([^"]+)"/g)) {
    for (const part of decode(m[1]).split(",")) {
      const u = part.trim().split(/\s+/)[0];
      if (u.startsWith("/_next/image")) urls.add(u);
    }
  }
  for (const m of html.matchAll(/\ssrc="(\/_next\/image[^"]+)"/g)) urls.add(decode(m[1]));
  return [...urls];
}

const pages = await pagesFromSitemap();
const all = new Set();
for (const p of pages) for (const u of await imageUrls(p)) all.add(u);
// "/home" shares its images with "/", which the sitemap lists
console.log(`${pages.length} pages, ${all.size} image sizes to prepare...`);

const queue = [...all];
let done = 0, failed = 0;
const started = Date.now();
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) {
      const u = queue.shift();
      try {
        const res = await fetch(site + u, { headers: { Accept: "image/webp,image/*,*/*" } });
        await res.arrayBuffer();
        if (!res.ok) failed++;
      } catch {
        failed++;
      }
      done++;
    }
  })
);
console.log(`Done: ${done - failed} ready, ${failed} failed, in ${((Date.now() - started) / 1000).toFixed(1)}s`);
