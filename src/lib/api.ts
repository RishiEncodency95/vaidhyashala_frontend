/**
 * Backend API address and helpers shared by every page's content (Admin → Pages & CMS).
 */

export const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api").replace(/\/+$/, "");

/** Image paths from the CMS: uploads are full URLs, bundled ones are in /public */
export const assetUrl = (src?: string) => {
  if (!src) return "";
  if (/^(https?:)?\/\//.test(src) || src.startsWith("data:")) return src;
  return src.startsWith("/") ? src : `/${src}`;
};

/**
 * An image the admin has deleted comes back as "": put the website's own image for that spot back.
 * Walks live and default content together (lists match by position); only image fields are touched.
 */
export function withDefaultImages<T>(live: T, defaults: unknown): T {
  const walk = (l: unknown, d: unknown, key = ""): unknown => {
    if (Array.isArray(l)) {
      return l.map((item, i) => walk(item, Array.isArray(d) ? d[i] : undefined, key));
    }
    if (l && typeof l === "object") {
      const dObj = d && typeof d === "object" ? (d as Record<string, unknown>) : {};
      return Object.fromEntries(
        Object.entries(l as Record<string, unknown>).map(([k, v]) => [k, walk(v, dObj[k], k)]),
      );
    }
    const isImage = /image$/i.test(key) || key === "image";
    if (isImage && (l === "" || l == null) && typeof d === "string" && d) return d;
    return l;
  };
  return walk(live, defaults) as T;
}
