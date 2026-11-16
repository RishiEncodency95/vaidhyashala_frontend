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
  // Old and alternative addresses of pages, sent to the page's one real URL (query strings are kept)
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/faqs", destination: "/#faqs", permanent: true },
      { source: "/career", destination: "/careers", permanent: true },
      { source: "/patient-testimonials", destination: "/testimonials", permanent: true },
      { source: "/careers/apply-for-position", destination: "/careers/apply", permanent: true },
      { source: "/careers/:step(apply|apply-for-position)/cv-analysis", destination: "/careers/cv-analysis", permanent: true },
      {
        source: "/careers/:step(apply|apply-for-position)/:result(ai-screening-result|eligibility-result)",
        destination: "/careers/ai-screening-result",
        permanent: true,
      },
      { source: "/careers/eligibility-result", destination: "/careers/ai-screening-result", permanent: true },
      { source: "/careers/ai-screening-partial-match", destination: "/careers/partial-match", permanent: true },
      { source: "/careers/ai-screening-not-eligible", destination: "/careers/not-eligible", permanent: true },
    ];
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
