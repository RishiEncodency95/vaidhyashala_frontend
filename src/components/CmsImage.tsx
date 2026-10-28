import Image, { type ImageProps } from "next/image";

/** Hosts next/image may resize: keep in step with images.remotePatterns in next.config.ts */
const OPTIMIZED_HOSTS = new Set(["res.cloudinary.com"]);

/** This site's own /public files and Cloudinary uploads are resized; any other link is shown as it is */
export function canOptimize(src: string) {
  if (src.startsWith("/") && !src.startsWith("//")) return true;
  try {
    return OPTIMIZED_HOSTS.has(new URL(src).hostname);
  } catch {
    return false;
  }
}

/**
 * next/image for an image that comes from the admin (a bundled /public path or an uploaded URL):
 * the browser gets a copy sized for the screen, in AVIF/WebP. A link to another website still works,
 * it is just not resized.
 */
export default function CmsImage({ src, unoptimized, ...props }: Omit<ImageProps, "src"> & { src: string }) {
  return <Image src={src} unoptimized={unoptimized ?? !canOptimize(src)} {...props} />;
}
