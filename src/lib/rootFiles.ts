/**
 * Root files (/sitemap.xml, /robots.txt): built automatically from the website's pages, unless a file
 * with the same name was uploaded in Admin → Advanced SEO → "Static SEO & Root Files" — then that file
 * is served as it is. Deleting the upload brings the automatic one back.
 * Public, read-only: GET {API}/website/seo-settings/advanced lists the uploads, stored on the backend
 * under /seo-files/<name>.
 */
import { API_BASE } from "@/lib/home2";

/** Backend origin ("http://localhost:5001"), where uploaded root files are served from */
export const BACKEND_ORIGIN = new URL(API_BASE).origin;

/** The website's address: NEXT_PUBLIC_SITE_URL when set, otherwise the address this request came in on */
export const siteUrl = (request: Request) =>
  (process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin).replace(/\/+$/, "");

interface UploadedFile {
  fileName: string;
  filePath?: string;
}

/** The uploaded file's text, or null when nothing with that name was uploaded (or the backend is down) */
export async function uploadedRootFile(name: string): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE}/website/seo-settings/advanced`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    const files: UploadedFile[] = json?.data?.seoFiles ?? [];
    const file = files.find((f) => f.fileName?.toLowerCase() === name.toLowerCase());
    if (!file) return null;
    const content = await fetch(`${BACKEND_ORIGIN}${file.filePath || `/seo-files/${file.fileName}`}`, { cache: "no-store" });
    return content.ok ? await content.text() : null;
  } catch {
    return null;
  }
}

/** GET {API}/website/<endpoint> -> its data, or null */
export async function fetchWebsiteData<T>(endpoint: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}/website/${endpoint}`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.data ?? null) as T | null;
  } catch {
    return null;
  }
}
