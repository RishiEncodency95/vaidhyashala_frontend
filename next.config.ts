import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    // Tailwind's CSS is small: send it inside the HTML instead of as a render-blocking stylesheet request
    inlineCss: true,
  },
  images: {
    // In development, serve the files as they are: resizing every image on first view made pages
    // slow to show their pictures. Production builds still resize and convert them.
    unoptimized: process.env.NODE_ENV === "development",
    // WebP only: AVIF is a little smaller but much slower to create, so images appeared late on first view
    formats: ["image/webp"],
    // More widths than the defaults, so each image gets a copy close to its on-screen size
    // (imageSizes must stay below the smallest deviceSize)
    imageSizes: [16, 32, 48, 64, 96, 128, 160, 200, 240, 256, 320, 384, 480, 540],
    deviceSizes: [640, 750, 828, 1080, 1200, 1280, 1366, 1440, 1600, 1920, 2048, 3840],
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
