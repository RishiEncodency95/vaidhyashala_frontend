import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // SEO from the admin is read on every request: put it in <head> for every visitor (browsers, Google,
  // WhatsApp/Facebook previews) instead of streaming it into <body> after the page.
  htmlLimitedBots: /.*/,
  images: {
    formats: ["image/avif", "image/webp"],
    // Admin uploads (Cloudinary) are resized too; keep in step with OPTIMIZED_HOSTS in components/CmsImage.tsx
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
