import { NextResponse, type NextRequest } from "next/server";

/**
 * Root files uploaded in Admin → Advanced SEO → "Static SEO & Root Files" (e.g. a Google verification
 * .html) are served from the website root: /<name> shows the uploaded file. A name nobody uploaded falls
 * through to the website's normal 404 page. /sitemap.xml and /robots.txt have their own routes, which
 * serve an upload with that name themselves.
 */

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api").replace(/\/+$/, "");
const BACKEND_ORIGIN = new URL(API_BASE).origin;
const OWN_ROUTES = new Set(["sitemap.xml", "robots.txt"]);

interface UploadedFile {
  fileName: string;
  filePath?: string;
}

export async function proxy(request: NextRequest) {
  const name = decodeURIComponent(request.nextUrl.pathname.slice(1));
  if (OWN_ROUTES.has(name.toLowerCase())) return NextResponse.next();

  try {
    const res = await fetch(`${API_BASE}/website/seo-settings/advanced`, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      const files: UploadedFile[] = json?.data?.seoFiles ?? [];
      const file = files.find((f) => f.fileName?.toLowerCase() === name.toLowerCase());
      if (file) return NextResponse.rewrite(new URL(file.filePath || `/seo-files/${file.fileName}`, BACKEND_ORIGIN));
    }
  } catch {
    // backend unreachable: carry on as if nothing was uploaded
  }
  return NextResponse.next();
}

export const config = {
  // Only single-segment .html / .txt / .xml paths, e.g. /google1234abcd.html
  matcher: ["/:file([^/]+\\.(?:html|txt|xml))"],
};
